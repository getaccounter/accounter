import json

import requests_mock
from django.conf import settings
from django.contrib.auth import get_user_model
from faker import Faker
from freezegun import freeze_time
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from accounter.integrations.models import Account, Integration, Service

from ..models import Profile

User = get_user_model()
fake = Faker()


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
                        isCurrentUser
                        isAdmin
                        isOwner
                        currentUserCanEdit
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
        auto_tick_seconds=Account.REFRESH_INTERVAL_SECONDS,
    )
    @requests_mock.Mocker()
    def test_get_profiles_accounts(self, mock_request):
        image_small = fake.image_url()
        image_big = fake.image_url()
        token = fake.uuid4()
        account_id = fake.uuid4()
        external_profile = fake.url()
        role = "ADMIN"
        is_disabled = False
        mock_request.get(
            settings.CONNECTOR_URL
            + f"/slack/accounts/getById?token={token}&id={account_id}",
            json={
                "found": True,
                "account": {
                    "id": account_id,
                    "username": self.admin.first_name,
                    "email": self.admin.email,
                    "image": {"small": image_small, "big": image_big},
                    "role": role,
                    "externalProfile": external_profile,
                    "isDisabled": is_disabled,
                },
            },
        )
        self.client.force_login(self.admin)
        integration = baker.make(
            Integration,
            service=Service.objects.get(name="Slack"),
            organization=self.admin.profile.organization,
            token=token,
            has_valid_token=True,
            _fill_optional=True,
        )
        account = baker.make(
            Account,
            id=account_id,
            role="USER",
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
                          imageSmall
                          imageBig
                          integration {
                            service {
                              name
                            }
                          }
                          username
                          email
                          role
                          externalProfile
                          isDisabled
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
        assert updated_admin_account["imageSmall"] == image_small
        assert updated_admin_account["imageBig"] == image_big
        assert updated_admin_account["role"] == role
        assert updated_admin_account["externalProfile"] == external_profile
        assert updated_admin_account["isDisabled"] == is_disabled
