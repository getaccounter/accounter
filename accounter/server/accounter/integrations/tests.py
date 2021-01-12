import json
import time
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.test import override_settings
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from slack_sdk.web import WebClient

from ..organizations.models import Admin
from .models import Service, SlackIntegration

validateURL = URLValidator(message="not a valid url")


class ServiceTestCase(GraphQLTestCase):
    def setUp(self):
        admin = baker.make(Admin)
        self.user = admin.user

    def test_services_query(self):
        self.client.force_login(self.user)
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
        self.client.force_login(self.user)

        code = "somecode"
        state = "somestate"
        token = "some token"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {
            "authed_user": {"access_token": token},
            "team": {"id": "abc"},
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
            organization=self.user.admin.organization
        )
        assert len(slack_integration) == 1
        assert slack_integration.first().token == token

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
        self.client.force_login(self.user)
        first_state = "someFirstState"
        original_token = "some token"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{first_state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {
            "authed_user": {"access_token": original_token},
            "team": {"id": "abc"},
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
            "team": {"id": "abc"},
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
        self.client.force_login(self.user)

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

        self.client.force_login(self.user)

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
        email = "somerandomemail@internet.internet"
        self.query(
            """
              mutation SignUp($email: String!, $orgName: String!, $password: String!) {
                signup(email: $email, orgName: $orgName, password: $password) {
                  status
                }
              }
            """,
            variables={
                "email": email,
                "password": "somepassword",
                "orgName": "some_org",
            },
        )
        self.user = get_user_model().objects.get(username=email)

        email_other_user = "different@dude.internet"
        self.query(
            """
              mutation SignUp($email: String!, $orgName: String!, $password: String!) {
                signup(email: $email, orgName: $orgName, password: $password) {
                  status
                }
              }
            """,
            variables={
                "email": email_other_user,
                "password": "somepassword",
                "orgName": "some_other_org",
            },
        )
        self.other_user = get_user_model().objects.get(username=email_other_user)

    def test_get_integrations(self):
        slack_integration = SlackIntegration.objects.create(
            organization=self.user.admin.organization, token="some_token"
        )
        slack_integration.save()
        self.client.force_login(self.user)
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

    def test_get_integrations_only_of_own_organization(self):
        # integration of this org
        SlackIntegration.objects.create(
            id="1",
            organization=self.other_user.admin.organization,
            token="some_other_token",
        ).save()

        # integration of other org
        SlackIntegration.objects.create(
            id="2", organization=self.user.admin.organization, token="some_token"
        ).save()
        self.client.force_login(self.user)
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
