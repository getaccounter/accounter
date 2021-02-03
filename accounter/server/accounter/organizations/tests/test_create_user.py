import json

import requests_mock
from django.conf import settings
from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_relay.node.node import from_global_id, to_global_id
from model_bakery import baker

from accounter.integrations.models import Integration

from ..models import Profile
from ..schemas import DepartmentNode

DEFAULT_PROFILE_IMAGE = (
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
)

User = get_user_model()


class OrganizationCreateProfileTestCase(GraphQLTestCase):
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

    def test_create_user(self):
        self.client.force_login(self.admin)
        email = "user@internet.cat"
        first_name = "somefirstname"
        last_name = "somelastname"
        title = "some title"
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
            $department: ID
          ) {
            createUser(
              input: {
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
                image
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "title": title,
                "department": to_global_id(
                    DepartmentNode._meta.name, self.admin.profile.department.pk
                ),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["createUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.user.first_name == returned_profile["firstName"] == first_name
        assert profile.user.last_name == returned_profile["lastName"] == last_name
        assert profile.user.email == returned_profile["email"] == email
        assert profile.title == returned_profile["title"] == title
        assert profile.image == returned_profile["image"] == DEFAULT_PROFILE_IMAGE
        assert (
            profile.department.name
            == returned_profile["department"]["name"]
            == self.admin.profile.department.name
        )

    @requests_mock.Mocker()
    def test_create_user_pulls_accounts(self, mock_request):
        email = "user@internet.cat"
        first_name = "somefirstname"
        last_name = "somelastname"
        token = "sometoken"
        username = "someusername"
        image = "small.image.url"

        mock_request.get(
            settings.CONNECTOR_URL
            + f"/slack/accounts/getByEmail?token={token}&email={email}",
            json={
                "found": True,
                "account": {
                    "id": "someid",
                    "username": username,
                    "email": email,
                    "image": {"small": image},
                    "role": "USER",
                },
            },
        )

        self.client.force_login(self.admin)

        slack_integration = baker.make(
            Integration,
            organization=self.admin.profile.organization,
            token=token,
        )
        slack_integration.save()

        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
              }
            ) {
              profile {
                accounts {
                  image
                  username
                  email
                  role
                }
              }
            }
          }

          """,
            variables={
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
            },
        )
        slack_integration.refresh_from_db()
        slack_account = slack_integration.accounts.first()
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        account_response = content["data"]["createUser"]["profile"]["accounts"][0]
        assert account_response["username"] == slack_account.username == username
        assert account_response["email"] == slack_account.email == email
        assert account_response["image"] == slack_account.image == image
        assert account_response["role"] == slack_account.role == "USER"

    @requests_mock.Mocker()
    def test_create_user_pulls_accounts_not_found(self, mock_request):
        email = "user@internet.cat"
        token = "sometoken"

        mock_request.get(
            settings.CONNECTOR_URL
            + f"/slack/accounts/getByEmail?token={token}&email={email}",
            json={"found": False, "account": None},
        )

        self.client.force_login(self.admin)

        slack_integration = baker.make(
            Integration,
            organization=self.admin.profile.organization,
            token=token,
        )
        slack_integration.save()

        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
              }
            ) {
              profile {
                accounts {
                  image
                  username
                  email
                }
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "somefirstname",
                "lastName": "somelastname",
            },
        )
        slack_integration.refresh_from_db()
        self.assertResponseNoErrors(response)

    def test_create_user_without_optional_fields(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
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
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["createUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))
        assert profile.title is None
        assert returned_profile["title"] is None

    def test_create_user_requires_admin(self):
        self.client.force_login(self.user)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )
