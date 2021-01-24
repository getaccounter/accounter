import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from graphql_relay.node.node import from_global_id, to_global_id

from ..models import Profile
from ..schemas import ProfileNode

User = get_user_model()


class OrganizationReactivateProfileTestCase(GraphQLTestCase):
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

    def test_reactivate_user(self):
        self.client.force_login(self.admin)
        user_profile_to_reactivate = baker.make(
            Profile,
            is_offboarded=True,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation ReactivateUser (
            $id: ID!
          ) {
            reactivateUser(
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
                    ProfileNode._meta.name, user_profile_to_reactivate.pk
                ),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["reactivateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.is_offboarded is False

    def test_reactivate_user_only_admins(self):
        self.client.force_login(self.user)
        user_profile_to_reactivate = baker.make(
            Profile,
            is_offboarded=True,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation ReactivateUser (
            $id: ID!
          ) {
            reactivateUser(
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
                    ProfileNode._meta.name, user_profile_to_reactivate.pk
                ),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )
