import json
import time
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.test import override_settings
from graphene_django.utils.testing import GraphQLTestCase
from slack_sdk.web import WebClient

from ..organizations.models import Admin, Organization
from .models import Service, SlackIntegration

validateURL = URLValidator(message="not a valid url")


class ServiceTestCase(GraphQLTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username="test", password="somepass"
        )

    def test_services_query(self):
        self._client.force_login(self.user)
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
        assert services[0]["logo"] == service.logo
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
        assert content["data"]["services"] is None

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
        self._client.force_login(self.user)
        organization = Organization.objects.create(name="some org")
        organization.save()
        admin = Admin.objects.create(user=self.user, organization=organization)
        admin.save()

        code = "somecode"
        state = "somestate"
        token = "some token"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time()
        service.save()
        oauth_call_mock.return_value = {"authed_user": {"access_token": token}}
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
        slack_integration = SlackIntegration.objects.filter(organization=organization)
        assert len(slack_integration) == 1
        assert slack_integration.first().token == token

    def test_handle_callback_expired_state(self):
        self._client.force_login(self.user)
        organization = Organization.objects.create(name="some org")
        organization.save()
        admin = Admin.objects.create(user=self.user, organization=organization)
        admin.save()

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

        self._client.force_login(self.user)
        organization = Organization.objects.create(name="some org")
        organization.save()
        admin = Admin.objects.create(user=self.user, organization=organization)
        admin.save()

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
        self._client.force_login(self.user)
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
        assert content["data"]["integrations"] is None

    def test_get_integrations_only_of_own_organization(self):
        # integration of this org
        SlackIntegration.objects.create(
            organization=self.other_user.admin.organization, token="some_other_token"
        ).save()

        # integration of other org
        SlackIntegration.objects.create(
            organization=self.user.admin.organization, token="some_token"
        ).save()
        self._client.force_login(self.user)
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
