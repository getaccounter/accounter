import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from graphql_relay.node.node import from_global_id, to_global_id

from ..models import Organization, Profile, Department
from ..schemas import DepartmentNode, ProfileNode
from django.core import mail

User = get_user_model()


class OrganizationUpdateProfileTestCase(GraphQLTestCase):
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

    def test_update_user(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        email = "user@internet.cat"
        first_name = "somefirstname"
        last_name = "somelastname"
        title = "some title"
        department = baker.make(Department)

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
            $firstName: String
            $lastName: String
            $title: String
            $department: ID
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
                department: $department
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "title": title,
                "department": to_global_id(DepartmentNode._meta.name, department.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.user.first_name == returned_profile["firstName"] == first_name
        assert profile.user.last_name == returned_profile["lastName"] == last_name
        assert profile.user.email == returned_profile["email"] == email
        assert profile.title == returned_profile["title"] == title
        assert (
            profile.department.name
            == returned_profile["department"]["name"]
            == department.name
        )

    def test_update_user_cannot_update_user_from_other_org(self):
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
          mutation UpdateUser (
            $id: ID!
            $email: String
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(
                    ProfileNode._meta.name, user_from_other_organization.pk
                ),
                "email": "some@email.internet",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "Profile matching query does not exist."

    def test_update_user_without_optional_fields(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])

        # Assert that nothing changed and the return type is correct
        profile = Profile.objects.get(id=int(db_pk))
        assert (
            user_profile_to_update.user.first_name
            == profile.user.first_name
            == returned_profile["firstName"]
        )
        assert (
            user_profile_to_update.user.last_name
            == profile.user.last_name
            == returned_profile["lastName"]
        )
        assert (
            user_profile_to_update.user.email
            == profile.user.email
            == returned_profile["email"]
        )
        assert (
            user_profile_to_update.title == profile.title == returned_profile["title"]
        )
        assert (
            user_profile_to_update.department.name
            == profile.department.name
            == returned_profile["department"]["name"]
        )

    def test_update_user_has_to_be_admin(self):
        self.client.force_login(self.user)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user_can_only_edit_users_from_same_organization(self):
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
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
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

    def test_update_user_owner_cannot_edit_other_owner(self):
        self.client.force_login(self.owner)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "email": "some@email.internet",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user_admin_cannot_edit_other_admins(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "email": "some@email.internet",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user_admin_cannot_promote_other_admins(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $isAdmin: Boolean
          ) {
            updateUser(
              input: {
                id: $id
                isAdmin: $isAdmin
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "isAdmin": True,
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user_owner_can_promote_other_admins(self):
        self.client.force_login(self.owner)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $isAdmin: Boolean
          ) {
            updateUser(
              input: {
                id: $id
                isAdmin: $isAdmin
              }
            ) {
              profile {
                id
                isAdmin
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "isAdmin": True,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])

        profile = Profile.objects.get(id=int(db_pk))
        assert profile.is_admin == returned_profile["isAdmin"] is True
        assert profile.user.is_active is True
        assert len(mail.outbox) == 1
        assert (
            mail.outbox[0].subject
            == f"{self.owner.first_name} invited you to join {self.owner.profile.organization.name} on accounter.io"
        )
        assert mail.outbox[0].to[0] == user_profile_to_update.user.email

    def test_update_user_owner_can_demote_other_admins(self):
        self.client.force_login(self.owner)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=True,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $isAdmin: Boolean
          ) {
            updateUser(
              input: {
                id: $id
                isAdmin: $isAdmin
              }
            ) {
              profile {
                id
                isAdmin
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "isAdmin": False,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])

        profile = Profile.objects.get(id=int(db_pk))
        assert profile.is_admin == returned_profile["isAdmin"] is False
        assert profile.user.is_active is False

    def test_update_owners_can_edit_themselves(self):
        self.client.force_login(self.owner)
        email = "some@email.internet"

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
              }
            ) {
              profile {
                id
                email
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, self.owner.profile.pk),
                "email": email,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        self.owner.refresh_from_db()
        assert self.owner.email == returned_profile["email"] == email

    def test_update_user_can_edit_themselves(self):
        self.client.force_login(self.admin)
        email = "some@email.internet"

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
              }
            ) {
              profile {
                id
                email
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, self.admin.profile.pk),
                "email": email,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        self.admin.refresh_from_db()
        assert self.admin.email == returned_profile["email"] == email
