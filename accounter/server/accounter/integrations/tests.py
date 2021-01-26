import json
import time
from unittest.mock import patch
from faker import Faker

from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.test import override_settings
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from slack_sdk.web import WebClient
from freezegun import freeze_time

from ..organizations.models import Profile
from .models import Service, SlackIntegration, SlackAccount

from ..test_utils import create_slack_user_fixture

fake = Faker()

validateURL = URLValidator(message="not a valid url")


class ServiceTestCase(GraphQLTestCase):
    def setUp(self):
        self.admin = baker.make(Profile, is_admin=True).user
        self.non_admin_user = baker.make(
            Profile, organization=self.admin.profile.organization, is_admin=False
        ).user

    def test_services_query(self):
        self.client.force_login(self.admin)
        service = Service.objects.get(name=Service.Types.SLACK)
        response = self.query(
            """
            {
                services {
                    name
                    logo
                    oauthUrl
                }
            }
            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        services = content["data"]["services"]
        service.refresh_from_db()
        assert len(services) == 1
        assert services[0]["name"] == service.name
        assert services[0]["logo"] == service.logo.url
        validateURL(services[0]["oauthUrl"])

    def test_services_query_requires_authenticated_users(self):
        response = self.query(
            """
            {
                services {
                    name
                }
            }
            """,
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        assert content["data"] is None

    @override_settings(
        INTEGRATIONS={
            "SLACK": {
                "CLIENT_ID": "SOME_CLIENT_ID",
                "CLIENT_SECRET": "SOME_SECRET_KEY",
            }
        }
    )
    @patch.object(WebClient, "oauth_v2_access")
    def test_handle_callback(self, oauth_call_mock):
        self.client.force_login(self.admin)

        code = "somecode"
        state = "somestate"
        token = "some token"
        workspace_name = "myworkspace"
        workspace_id = "abc"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {
            "authed_user": {"access_token": token},
            "team": {"id": workspace_id, "name": workspace_name},
        }
        response = self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": code, "state": state},
        )
        self.assertResponseNoErrors(response)
        oauth_call_mock.assert_called_with(
            client_id="SOME_CLIENT_ID",
            client_secret="SOME_SECRET_KEY",
            redirect_uri="http://localhost:8080/slack/oauth/callback",
            code=code,
        )
        slack_integration = SlackIntegration.objects.filter(
            organization=self.admin.profile.organization
        )
        assert len(slack_integration) == 1
        assert slack_integration.first().token == token
        assert slack_integration.first().id == workspace_id
        assert slack_integration.first().name == workspace_name

    def test_handle_callback_requires_admin(self):
        self.client.force_login(self.non_admin_user)

        state = "somestate"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time() - 1000
        service.save()

        response = self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": "somecode", "state": state},
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    @override_settings(
        INTEGRATIONS={
            "SLACK": {
                "CLIENT_ID": "SOME_CLIENT_ID",
                "CLIENT_SECRET": "SOME_SECRET_KEY",
            }
        }
    )
    @patch.object(WebClient, "oauth_v2_access")
    def test_handle_callback_duplicates_only_updates_token(self, oauth_call_mock):
        self.client.force_login(self.admin)
        first_state = "someFirstState"
        original_token = "some token"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{first_state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {
            "authed_user": {"access_token": original_token},
            "team": {"id": "abc", "name": "someteam"},
        }
        # Calling endpoint twice
        self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": "someFirstCode", "state": first_state},
        )
        assert SlackIntegration.objects.count() == 1
        slack_integration = SlackIntegration.objects.first()
        assert slack_integration.token == original_token

        updated_token = "updated token"
        second_state = "some other state"
        service.state_store[f"{service._client_id}/{second_state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {
            "authed_user": {"access_token": updated_token},
            "team": {"id": "abc", "name": "someteam"},
        }
        self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": "someSecondCode", "state": second_state},
        )
        assert SlackIntegration.objects.count() == 1
        slack_integration.refresh_from_db()
        assert slack_integration.token == updated_token

    def test_handle_callback_expired_state(self):
        self.client.force_login(self.admin)

        state = "somestate"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time() - 1000
        service.save()

        response = self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": "somecode", "state": state},
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "the state value is expired"

    def test_handle_callback_state_unknown(self):

        self.client.force_login(self.admin)

        response = self.query(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                oauth {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            variables={"code": "somecode", "state": "unknown state"},
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "the state value is expired"


class IntegrationTestCase(GraphQLTestCase):
    def setUp(self):
        self.admin = self._signup_user(org_name="some company")
        self.other_company_admin = self._signup_user(org_name="other company")

    def _signup_user(self, **kwargs):
        email = kwargs.get("email", fake.company_email())
        first_name = kwargs.get("first_name", fake.first_name())
        last_name = kwargs.get("last_name", fake.last_name())
        password = kwargs.get("password", fake.password())
        org_name = kwargs.get("org_name", fake.company())
        self.query(
            """
            mutation SignUp(
                $orgName: String!
                $firstName: String!
                $lastName: String!
                $email: String!
                $password: String!
            ) {
                signup(
                    orgName: $orgName
                    firstName: $firstName
                    lastName: $lastName
                    email: $email
                    password: $password
                ) {
                status
                }
            }
            """,
            variables={
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "password": password,
                "orgName": org_name,
            },
        )

        return get_user_model().objects.get(username=email)

    @patch.object(WebClient, "users_list")
    def test_get_integrations(self, slack_users_list_mock):
        slack_integration = SlackIntegration.objects.create(
            organization=self.admin.profile.organization, token="some_token"
        )
        slack_integration.save()
        self.client.force_login(self.admin)
        response = self.query(
            """
            query {
                integrations {
                    service {
                        name
                    }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        assert len(content["data"]["integrations"]) == 1
        assert (
            content["data"]["integrations"][0]["service"]["name"]
            == slack_integration.service.name
        )

    @freeze_time(
        auto_tick_seconds=SlackIntegration.REFRESH_INTERVAL_SECONDS,
    )
    @patch.object(WebClient, "users_list")
    def test_get_integrations_slack_creates_accounts_if_email_matches(
        self, slack_users_list_mock
    ):
        slack_users_list_mock.return_value = {
            "ok": True,
            "cache_ts": 1611515141,
            "response_metadata": {"next_cursor": ""},
            "members": [create_slack_user_fixture(self.admin.profile)],
        }
        slack_integration = SlackIntegration.objects.create(
            organization=self.admin.profile.organization, token="some_token"
        )
        slack_integration.save()
        self.client.force_login(self.admin)
        response = self.query(
            """
            query {
                integrations {
                    ... on SlackIntegrationNode {
                        accounts {
                            edges {
                                node {
                                    username
                                    email
                                }
                            }
                        }
                    }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        account_edges = content["data"]["integrations"][0]["accounts"]["edges"]
        assert len(account_edges) == 1
        assert account_edges[0]["node"]["username"] == self.admin.first_name
        assert account_edges[0]["node"]["email"] == self.admin.email

    @freeze_time(
        auto_tick_seconds=SlackIntegration.REFRESH_INTERVAL_SECONDS,
    )
    @patch.object(WebClient, "users_list")
    def test_get_integrations_slack_updates_existing_accounts(
        self, slack_users_list_mock
    ):
        user_fixture = create_slack_user_fixture(self.admin.profile)
        slack_users_list_mock.return_value = {
            "ok": True,
            "cache_ts": 1611515141,
            "response_metadata": {"next_cursor": ""},
            "members": [user_fixture],
        }
        slack_integration = SlackIntegration.objects.create(
            organization=self.admin.profile.organization, token="some_token"
        )
        account = SlackAccount.objects.create(
            id=user_fixture["id"],
            profile=self.admin.profile,
            integration=slack_integration,
            email="old@email.internet",
            username="old displayname",
        )
        account.save()
        slack_integration.save()
        self.client.force_login(self.admin)
        response = self.query(
            """
            query {
                integrations {
                    ... on SlackIntegrationNode {
                        accounts {
                            edges {
                                node {
                                    username
                                    email
                                }
                            }
                        }
                    }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        account.refresh_from_db()
        account_edges = content["data"]["integrations"][0]["accounts"]["edges"]
        assert len(account_edges) == 1
        assert (
            account_edges[0]["node"]["username"]
            == self.admin.first_name
            == account.username
        )
        assert account_edges[0]["node"]["email"] == self.admin.email == account.email

    def test_get_integrations_requires_authenticated_users(self):
        response = self.query(
            """
            query {
                integrations {
                    service {
                        name
                    }
                }
            }
            """
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        assert content["data"] is None

    @patch.object(WebClient, "users_list")
    def test_get_integrations_only_of_own_organization(self, slack_users_list_mock):
        # integration of this org
        SlackIntegration.objects.create(
            id="1",
            organization=self.other_company_admin.profile.organization,
            token="some_other_token",
        ).save()

        # integration of other org
        SlackIntegration.objects.create(
            id="2", organization=self.admin.profile.organization, token="some_token"
        ).save()
        self.client.force_login(self.admin)
        response = self.query(
            """
            query {
                integrations {
                    service {
                        name
                    }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        assert len(content["data"]["integrations"]) == 1
