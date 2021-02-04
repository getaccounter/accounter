import json
from unittest.mock import patch

import requests
import requests_mock
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.test import override_settings
from faker import Faker
from freezegun import freeze_time
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from ..organizations.models import Profile
from .models import Account, Integration, Service

fake = Faker()

validateURL = URLValidator(message="not a valid url")


class ServiceTestCase(GraphQLTestCase):
    def setUp(self):
        self.admin = baker.make(Profile, is_admin=True).user
        self.non_admin_user = baker.make(
            Profile, organization=self.admin.profile.organization, is_admin=False
        ).user

    @override_settings(CONNECTOR_URL="http://some-connector.internet")
    @requests_mock.Mocker()
    def test_services_query(self, mock_request):
        self.client.force_login(self.admin)
        oauthUrl = "https://some.url"
        mock_request.get(
            settings.CONNECTOR_URL
            + "/slack/oauth?redirectUri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Foauth%2Fcallback",
            json={
                "url": oauthUrl,
            },
        )
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
        assert services[0]["oauthUrl"] == oauthUrl

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

    @override_settings(CONNECTOR_URL="http://some-connector.internet")
    @requests_mock.Mocker()
    def test_handle_callback(self, mock_request):
        self.client.force_login(self.admin)

        code = "somecode"
        state = "somestate"
        token = "some token"
        integration_name = "myworkspace"
        integration_id = "abc"
        mock_request.get(
            settings.CONNECTOR_URL
            + f"/slack/oauth/handleCallback?code={code}&state={state}",
            json={
                "token": token,
                "integrationName": integration_name,
                "integrationId": integration_id,
            },
        )
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
        slack_integration = Integration.objects.filter(
            organization=self.admin.profile.organization
        )
        assert len(slack_integration) == 1
        assert slack_integration.first().token == token
        assert slack_integration.first().id == integration_id
        assert slack_integration.first().name == integration_name

    def test_handle_callback_requires_admin(self):
        self.client.force_login(self.non_admin_user)

        state = "somestate"

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

    @requests_mock.Mocker()
    def test_handle_callback_duplicates_only_updates_token(self, mock_request):
        self.client.force_login(self.admin)
        first_state = "someFirstState"
        original_token = "some token"
        integration_id = "abc"
        mock_request.get(
            settings.CONNECTOR_URL + "/slack/oauth/handleCallback",
            json={
                "token": original_token,
                "integrationName": "someteam",
                "integrationId": integration_id,
            },
        )
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
        assert Integration.objects.count() == 1
        slack_integration = Integration.objects.first()
        assert slack_integration.token == original_token

        updated_token = "updated token"
        second_state = "some other state"
        mock_request.get(
            settings.CONNECTOR_URL + "/slack/oauth/handleCallback",
            json={
                "token": updated_token,
                "integrationName": "someteam",
                "integrationId": integration_id,
            },
        )
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
        assert Integration.objects.count() == 1
        slack_integration.refresh_from_db()
        assert slack_integration.token == updated_token


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

    @patch.object(requests, "get")
    def test_get_integrations(self, _):
        slack_integration = Integration.objects.create(
            service=Service.objects.get(name=Service.Types.SLACK),
            organization=self.admin.profile.organization,
            token="some_token",
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
        auto_tick_seconds=Integration.REFRESH_INTERVAL_SECONDS,
    )
    @requests_mock.Mocker()
    def test_get_integrations_slack_creates_accounts_if_email_matches(
        self, mock_request
    ):
        token = "some_token"
        image_small = fake.image_url()
        image_big = fake.image_url()
        mock_request.get(
            settings.CONNECTOR_URL + f"/slack/accounts/list?token={token}",
            json=[
                {
                    "id": "someid",
                    "username": self.admin.first_name,
                    "email": self.admin.email,
                    "image": {"small": image_small, "big": image_big},
                    "role": "USER",
                }
            ],
        )
        slack_integration = Integration.objects.create(
            service=Service.objects.get(name=Service.Types.SLACK),
            organization=self.admin.profile.organization,
            token=token,
        )
        slack_integration.save()
        self.client.force_login(self.admin)
        response = self.query(
            """
            query {
                integrations {
                    accounts {
                        username
                        email
                        imageSmall
                        imageBig
                    }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        accounts = content["data"]["integrations"][0]["accounts"]
        assert len(accounts) == 1
        assert accounts[0]["username"] == self.admin.first_name
        assert accounts[0]["email"] == self.admin.email
        assert accounts[0]["imageSmall"] == image_small
        assert accounts[0]["imageBig"] == image_big

    @freeze_time(
        auto_tick_seconds=Integration.REFRESH_INTERVAL_SECONDS,
    )
    @requests_mock.Mocker()
    def test_get_integrations_slack_updates_existing_accounts(self, mock_request):
        token = "some_token"
        integration_id = fake.uuid4()
        new_email = fake.company_email()
        new_small_image = fake.image_url()
        new_big_image = fake.image_url()
        new_username = fake.user_name()
        external_profile = fake.url()
        mock_request.get(
            settings.CONNECTOR_URL + f"/slack/accounts/list?token={token}",
            json=[
                {
                    "id": integration_id,
                    "username": new_username,
                    "email": new_email,
                    "image": {"small": new_small_image, "big": new_big_image},
                    "role": "USER",
                    "externalProfile": external_profile,
                }
            ],
        )
        slack_integration = Integration.objects.create(
            service=Service.objects.get(name=Service.Types.SLACK),
            organization=self.admin.profile.organization,
            token=token,
        )
        account = Account.objects.create(
            id=integration_id,
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
                        accounts {
                            username
                            email
                            imageSmall
                            imageBig
                            externalProfile
                        }
                }
            }
            """
        )
        content = json.loads(response.content)
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        account.refresh_from_db()
        accounts = content["data"]["integrations"][0]["accounts"]
        assert len(accounts) == 1
        assert accounts[0]["username"] == account.username == new_username
        assert accounts[0]["email"] == account.email == new_email
        assert accounts[0]["imageSmall"] == account.image_small == new_small_image
        assert accounts[0]["imageBig"] == account.image_big == new_big_image
        assert (
            accounts[0]["externalProfile"]
            == account.external_profile
            == external_profile
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

    @patch.object(requests, "get")
    def test_get_integrations_only_of_own_organization(self, _):
        # integration of this org
        Integration.objects.create(
            service=Service.objects.get(name=Service.Types.SLACK),
            id="1",
            organization=self.other_company_admin.profile.organization,
            token="some_other_token",
        ).save()

        # integration of other org
        Integration.objects.create(
            service=Service.objects.get(name=Service.Types.SLACK),
            id="2",
            organization=self.admin.profile.organization,
            token="some_token",
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
