import time
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.test import override_settings
from graphql_jwt.testcases import JSONWebTokenTestCase
from slack_sdk.web import WebClient

from ..organizations.models import Admin, Organization
from .models import Service, SlackIntegration

validateURL = URLValidator(message="not a valid url")


class ServiceTestCase(JSONWebTokenTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(username="test")

    def test_services_query(self):
        self.client.authenticate(self.user)
        service = Service.objects.get(name=Service.Types.SLACK)
        response = self.client.execute(
            """
            {
                services {
                    id
                    name
                    logo
                    oauthUrl
                }
            }
            """,
        )
        assert response.errors is None
        services = response.data["services"]
        service.refresh_from_db()
        assert len(services) == 1
        assert services[0]["name"] == service.name
        assert services[0]["logo"] == service.logo
        validateURL(services[0]["oauthUrl"])

    def test_services_query_requires_authenticated_users(self):
        response = self.client.execute(
            """
            {
                services {
                    id
                }
            }
            """,
        )
        assert response.data["services"] is None
        assert (
            response.errors[0].message
            == "You do not have permission to perform this action"
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
    def test_handle_callback(self, oauth_call_mock):

        self.client.authenticate(self.user)
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

        response = self.client.execute(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                integrations {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            {"code": code, "state": state},
        )
        assert response.errors is None
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

        self.client.authenticate(self.user)
        organization = Organization.objects.create(name="some org")
        organization.save()
        admin = Admin.objects.create(user=self.user, organization=organization)
        admin.save()

        state = "somestate"
        service = Service.objects.get(name=Service.Types.SLACK)
        service.state_store[f"{service._client_id}/{state}"] = time.time() - 1000
        service.save()

        response = self.client.execute(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                integrations {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            {"code": "somecode", "state": state},
        )
        print(response.errors)
        assert response.errors[0].message == "the state value is expired"

    def test_handle_callback_not_state_saved(self):

        self.client.authenticate(self.user)
        organization = Organization.objects.create(name="some org")
        organization.save()
        admin = Admin.objects.create(user=self.user, organization=organization)
        admin.save()

        response = self.client.execute(
            """
            mutation SlackMutation($code: String!, $state: String!) {
                integrations {
                    slack {
                        handleCallback(code: $code, state: $state) {
                            status
                        }
                    }
                }
            }
            """,
            {"code": "somecode", "state": "unknown state"},
        )
        print(response.errors)
        assert response.errors[0].message == "the state value is expired"
