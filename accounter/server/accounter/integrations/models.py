from datetime import timedelta
from typing import Optional

import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

from ..organizations.models import Organization, Profile

User = get_user_model()


class Service(models.Model):
    class CallbackResult:
        integration_id: str
        token: str
        name: str
        management_url: str
        refresh_token: Optional[str]

        def __init__(
            self,
            integration_id: str,
            token: str,
            name: str,
            management_url: str,
            refresh_token: Optional[str],
        ):
            self.integration_id = integration_id
            self.token = token
            self.name = name
            self.management_url = management_url
            self.refresh_token = refresh_token

    name = models.CharField("Type", max_length=50, unique=True)
    logo = models.FileField(upload_to="services/logos")
    logo_large = models.FileField(upload_to="services/logos_large")

    @property
    def oauth_url(self):
        response = requests.get(
            self.connector_url + "/oauth",
            params={"redirectUri": self.redirect_uri},
        )
        payload = response.json()
        return payload["url"]

    def handle_callback(self, code: str, state: str):
        response = requests.get(
            self.connector_url + "/oauth/handleCallback",
            params={"code": code, "state": state, "redirectUri": self.redirect_uri},
        )
        payload = response.json()

        if response.status_code == 400:
            raise ValueError(response.text)

        return Service.CallbackResult(
            integration_id=payload["integrationId"],
            name=payload["integrationName"],
            token=payload["token"],
            management_url=payload["managementUrl"],
            refresh_token=payload.get("refreshToken", None),
        )

    @property
    def redirect_uri(self):
        # should be passed by the frontend
        return settings.BASE_URL + f"/{self.name.lower()}/oauth/callback"

    @property
    def connector_url(self):
        return settings.CONNECTOR_URL + f"/{self.name.lower()}"

    @property
    def _oauth_expiration_seconds(self):
        # should be env var
        return 300

    def __str__(self):
        return self.name


# Slack
class Integration(models.Model):
    REFRESH_INTERVAL_SECONDS = 60

    id = models.TextField(primary_key=True)
    token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    organization = models.ForeignKey(
        Organization, related_name="integrations", on_delete=models.CASCADE
    )
    last_refresh = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=100)
    service = models.ForeignKey(
        Service,
        on_delete=models.RESTRICT,
    )
    management_url = models.URLField()
    has_valid_token = models.BooleanField(default=True)

    @property
    def are_accounts_fresh(self):
        # TODO refactor to check account.is_fresh on all accounts
        if not self.last_refresh:
            return False
        return timezone.now() < self.last_refresh + timedelta(
            seconds=self.REFRESH_INTERVAL_SECONDS
        )

    def create_account_from_response(self, profile: Profile, response):
        account = Account.objects.create(
            id=response["id"],
            profile=profile,
            integration=self,
            email=response["email"],
            username=response["username"],
            role=response["role"],
            external_profile=response["externalProfile"],
            is_disabled=response["isDisabled"],
        )
        if response["image"]["small"]:
            account.image_small = response["image"]["small"]
        if response["image"]["big"]:
            account.image_big = response["image"]["big"]
        return account

    def refresh_auth_token(self):
        if not self.refresh_token:
            return

        response = requests.get(
            self.service.connector_url + "/oauth/refresh",
            params={"token": self.refresh_token},
        )
        if response.status_code == 401:
            self.refresh_token = None
            self.save()
            return

        self.token = response.json().get("token")
        self.save()

    def refresh_accounts(self, force=False):
        if not force and self.are_accounts_fresh:
            return
        if not self.has_valid_token:
            return

        endpoint = self.service.connector_url + "/accounts/list"

        response = requests.get(endpoint, params={"token": self.token})
        if response.status_code == 401:
            self.refresh_auth_token()
            response = requests.get(endpoint, params={"token": self.token})

        if response.status_code == 401:
            self.has_valid_token = False
            self.save()
            return

        payload = response.json()
        for user_info in payload:
            email = user_info["email"]

            account = None
            try:
                account = Account.objects.get(
                    pk=user_info["id"], profile__organization=self.organization
                )
                account.update_from_response(user_info)
            except Account.DoesNotExist:
                pass

            profile = None
            try:
                profile = Profile.objects.get(
                    user__email=email, organization=self.organization
                )
            except Profile.DoesNotExist:
                pass

            if not profile:
                user = User.objects.create(
                    username=email,
                    email=email,
                    first_name=user_info["firstName"],
                    last_name=user_info["lastName"],
                    is_active=False,
                )
                user.save()
                profile = Profile.objects.create(
                    user=user,
                    organization=self.organization,
                )
                profile.save()

            if not account:
                account = self.create_account_from_response(profile, user_info)

            account.save()

        self.last_refresh = timezone.now()
        self.save()


class Account(models.Model):
    class Roles(models.TextChoices):
        USER = "USER", "User"
        ADMIN = "ADMIN", "Admin"
        OWNER = "OWNER", "Owner"

    username = models.CharField(max_length=150)
    email = models.EmailField()

    REFRESH_INTERVAL_SECONDS = 60

    id = models.CharField(primary_key=True, max_length=100)
    profile = models.ForeignKey(
        Profile, related_name="accounts", on_delete=models.CASCADE
    )
    last_refresh = models.DateTimeField(auto_now_add=True)
    image_small = models.URLField(
        default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    )
    image_big = models.URLField(
        default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    )
    role = models.CharField(
        "Type", max_length=10, choices=Roles.choices, default=Roles.USER
    )
    integration = models.ForeignKey(
        Integration, related_name="accounts", on_delete=models.CASCADE
    )
    external_profile = models.URLField()
    is_disabled = models.BooleanField(default=False)

    @property
    def is_fresh(self):
        return timezone.now() < self.last_refresh + timedelta(
            seconds=self.REFRESH_INTERVAL_SECONDS
        )

    def update_from_response(self, response):
        self.username = response["username"]
        self.email = response["email"]
        self.last_refresh = timezone.now()
        self.role = response["role"]
        self.external_profile = response["externalProfile"]
        self.is_disabled = response["isDisabled"]
        if response["image"]["small"]:
            self.image_small = response["image"]["small"]
        if response["image"]["big"]:
            self.image_big = response["image"]["big"]

    def refresh(self, force=False):
        if not force and self.is_fresh:
            return
        if not self.integration.has_valid_token:
            return

        endpoint = self.integration.service.connector_url + "/accounts/getById"

        response = requests.get(
            endpoint, params={"token": self.integration.token, "id": self.id}
        )
        if response.status_code == 401:
            self.integration.refresh_auth_token()
            response = requests.get(
                endpoint, params={"token": self.integration.token, "id": self.id}
            )

        if response.status_code == 401:
            self.integration.has_valid_token = False
            self.integration.save()
            return

        payload = response.json()

        if not payload["found"]:
            # TODO deactivate account
            return

        self.update_from_response(payload["account"])
        self.save()
