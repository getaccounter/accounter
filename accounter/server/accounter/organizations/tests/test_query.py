import json
from unittest.mock import patch

from django.contrib.auth import get_user_model
from freezegun import freeze_time
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from slack_sdk.web import WebClient

from accounter.integrations.models import SlackAccount, SlackIntegration

from ...test_utils import create_slack_user_fixture
from ..models import Profile

User = get_user_model()


class OrganizationQueryTestCase(GraphQLTestCase):
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

    def test_get_organization(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
            {
              currentUser {
                organization {
                  name
                  profiles {
                    edges {
                      node {
                        email
                        firstName
                        lastName
                        title
                        isOffboarded
                        isCurrentUser
                        isAdmin
                        isOwner
                        currentUserCanEdit
                        department {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        organization = content["data"]["currentUser"]["organization"]
        assert organization["name"] == self.admin.profile.organization.name
        assert len(organization["profiles"]["edges"]) == 3

        response_owner_profile = organization["profiles"]["edges"][0]["node"]
        response_admin_profile = organization["profiles"]["edges"][1]["node"]
        response_user_profile = organization["profiles"]["edges"][2]["node"]

        assert response_user_profile["email"] == self.profiles[0].user.email
        assert response_user_profile["firstName"] == self.profiles[0].user.first_name
        assert response_user_profile["lastName"] == self.profiles[0].user.last_name
        assert response_user_profile["title"] == self.profiles[0].title
        assert response_user_profile["isOffboarded"] == self.profiles[0].is_offboarded
        assert (
            response_user_profile["department"]["name"]
            == self.profiles[0].department.name
        )
        assert response_owner_profile["isCurrentUser"] is False
        assert response_owner_profile["isAdmin"] is True
        assert response_owner_profile["isOwner"] is True
        assert response_owner_profile["currentUserCanEdit"] is False

        assert response_admin_profile["isCurrentUser"] is True
        assert response_admin_profile["isAdmin"] is True
        assert response_admin_profile["isOwner"] is False
        assert response_admin_profile["currentUserCanEdit"] is True

        assert response_user_profile["isCurrentUser"] is False
        assert response_user_profile["isAdmin"] is False
        assert response_user_profile["isOwner"] is False
        assert response_user_profile["currentUserCanEdit"] is True

    def test_get_current_user(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
            {
              currentUser{
                email
              }
            }

            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        assert content["data"]["currentUser"]["email"] == self.admin.email

    @freeze_time(
        auto_tick_seconds=SlackAccount.REFRESH_INTERVAL_SECONDS,
    )
    @patch.object(WebClient, "users_info")
    def test_get_profiles_accounts_slack(self, users_info_mock):
        user_fixture = create_slack_user_fixture(self.admin.profile)
        users_info_mock.return_value = {
            "ok": True,
            "cache_ts": 1611515141,
            "response_metadata": {"next_cursor": ""},
            "user": user_fixture,
        }
        self.client.force_login(self.admin)
        integration = baker.make(
            SlackIntegration,
            organization=self.admin.profile.organization,
            token="sometoken",
            _fill_optional=True,
        )
        account = baker.make(
            SlackAccount,
            profile=self.admin.profile,
            integration=integration,
            _fill_optional=True,
        )
        account.save()
        integration.save()
        response = self.query(
            """
            {
              currentUser {
                organization {
                  profiles {
                    edges {
                      node {
                        accounts {
                          id
                          image
                          integration {
                            service {
                              name
                            }
                          }
                          ... on SlackAccountNode {
                            username
                            email
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        organization = content["data"]["currentUser"]["organization"]

        response_admin_profile = organization["profiles"]["edges"][1]["node"]

        updated_admin_account = response_admin_profile["accounts"][0]
        assert updated_admin_account["username"] == self.admin.first_name
        assert updated_admin_account["email"] == self.admin.email
        assert (
            updated_admin_account["integration"]["service"]["name"]
            == integration.service.name
        )

        assert updated_admin_account["username"] == self.admin.first_name
        assert updated_admin_account["email"] == self.admin.email
        assert (
            updated_admin_account["integration"]["service"]["name"]
            == integration.service.name
        )
        assert updated_admin_account["image"] == user_fixture["profile"]["image_48"]
