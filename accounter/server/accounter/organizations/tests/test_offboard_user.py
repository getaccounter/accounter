import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_relay.node.node import from_global_id, to_global_id
from model_bakery import baker

from ..models import Organization, Profile
from ..schemas import ProfileNode

User = get_user_model()


class OrganizationOffboardProfileTestCase(GraphQLTestCase):
    def setUp(self):
        owner_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        admin_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=False,
            organization=owner_profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        user_profile = baker.make(
            Profile,
            is_admin=False,
            is_owner=False,
            organization=owner_profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        self.profiles = [user_profile]
        self.owner = owner_profile.user
        self.admin = admin_profile.user
        self.user = user_profile.user

    def test_offboard_user(self):
        self.client.force_login(self.admin)
        user_profile_to_offboard = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_offboard.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["offboardUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.is_offboarded is True

    def test_offboard_user_only_admins(self):
        self.client.force_login(self.user)
        user_profile_to_offboard = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_offboard.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_offboard_user_admins_cannot_offboard_admins(self):
        self.client.force_login(self.admin)
        user_profile_to_offboard = baker.make(
            Profile,
            is_admin=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_offboard.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_offboard_user_owners_can_offboard_admins(self):
        self.client.force_login(self.owner)
        user_profile_to_offboard = baker.make(
            Profile,
            is_admin=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_offboard.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["offboardUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))
        user_profile_to_offboard.refresh_from_db()

        assert profile.is_offboarded is user_profile_to_offboard.is_offboarded is True
        assert profile.is_admin is user_profile_to_offboard.is_admin is False

    def test_offboard_user_owners_cannot_be_offboarded(self):
        self.client.force_login(self.owner)
        user_profile_to_offboard = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_offboard.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "Owner cannot be offboarded"

    def test_offboard_user_cannot_offboard_themselves(self):
        self.client.force_login(self.admin)

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, self.admin.profile.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "You cannot offboard yourself"

    def test_offboard_user_cannot_offboard_people_from_other_orgs(self):
        self.client.force_login(self.admin)

        other_organization = baker.make(Organization)
        user_from_other_organization = baker.make(
            Profile,
            organization=other_organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation OffboardUser (
            $id: ID!
          ) {
            offboardUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                isOffboarded
              }
            }
          }

          """,
            variables={
                "id": to_global_id(
                    ProfileNode._meta.name, user_from_other_organization.pk
                ),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "Profile matching query does not exist."
