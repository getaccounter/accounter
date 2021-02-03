from datetime import timedelta

import requests
from django.conf import settings
from django.db import models
from django.utils import timezone

from ..organizations.models import Organization, Profile


class Service(models.Model):
    class CallbackResult:
        integration_id: str
        token: str
        name: str

        def __init__(self, integration_id: str, token: str, name: str):
            self.integration_id = integration_id
            self.token = token
            self.name = name

    class Types(models.TextChoices):
        SLACK = "SLACK", "Slack"

    name = models.CharField("Type", max_length=50, choices=Types.choices, unique=True)
    logo = models.FileField(upload_to="services/logos")

    @property
    def oauth_url(self):
        response = requests.get(
            settings.CONNECTOR_URL + "/slack/oauth",
            params={"redirectUri": self._redirect_uri},
        )
        payload = response.json()
        return payload["url"]

    def handle_callback(self, code: str, state: str):
        response = requests.get(
            settings.CONNECTOR_URL + "/slack/oauth/handleCallback",
            params={
                "code": code,
                "state": state,
            },
        )
        payload = response.json()

        if response.status_code == 400:
            raise ValueError(response.text)

        return Service.CallbackResult(
            integration_id=payload["integrationId"],
            name=payload["integrationName"],
            token=payload["token"],
        )

    @property
    def _redirect_uri(self):
        # base url should be env var
        return settings.BASE_URL + "/slack/oauth/callback"

    @property
    def _oauth_expiration_seconds(self):
        # should be env var
        return 300

    def __str__(self):
        return self.name


# Abstract Classes
class AbstractIntegration(models.Model):
    class Meta:
        abstract = True

    REFRESH_INTERVAL_SECONDS = 60

    id = models.TextField(primary_key=True)
    token = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    last_refresh = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=100)

    @property
    def is_fresh(self):
        if not self.last_refresh:
            return False
        return timezone.now() < self.last_refresh + timedelta(
            seconds=self.REFRESH_INTERVAL_SECONDS
        )

    @property
    def service(self):
        raise NotImplementedError()

    def check_for_existing_account(self, profile):
        raise NotImplementedError()

    def refresh(self, force=False):
        raise NotImplementedError()


class AbstractAccount(models.Model):
    class Meta:
        abstract = True

    username = models.CharField(max_length=150)
    email = models.EmailField()

    REFRESH_INTERVAL_SECONDS = 60

    id = models.CharField(primary_key=True, max_length=100)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    last_refresh = models.DateTimeField(auto_now_add=True)
    image = models.URLField(
        default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    )

    class Roles(models.TextChoices):
        USER = "USER", "User"
        ADMIN = "ADMIN", "Admin"
        OWNER = "OWNER", "Owner"

    role = models.CharField(
        "Type", max_length=10, choices=Roles.choices, default=Roles.USER
    )

    @property
    def is_fresh(self):
        return timezone.now() < self.last_refresh + timedelta(
            seconds=self.REFRESH_INTERVAL_SECONDS
        )

    def refresh(self, force=False):
        raise NotImplementedError()

    @property
    def integration(self):
        raise NotImplementedError()


# Slack
class SlackIntegration(AbstractIntegration):
    @property
    def service(self):
        return Service.objects.get(name=Service.Types.SLACK)

    def create_account_from_response(self, profile: Profile, response):
        email = response["email"]
        username = response["username"]
        slack_id = response["id"]
        image = response["image"]["small"]
        role = response["role"]
        account = SlackAccount.objects.create(
            id=slack_id,
            profile=profile,
            integration=self,
            email=email,
            username=username,
            image=image,
            role=role,
        )
        return account

    def check_for_existing_account(self, profile):
        response = requests.get(
            settings.CONNECTOR_URL + "/slack/accounts/getByEmail",
            params={"token": self.token, "email": profile.user.email},
        )
        payload = response.json()
        account = None
        if not payload["found"]:
            return account

        account_data = payload["account"]
        try:
            account = SlackAccount.objects.get(
                pk=account_data["id"], profile__organization=self.organization
            )
            account.update_from_response(account_data)
        except SlackAccount.DoesNotExist:
            account = self.create_account_from_response(profile, account_data)

        return account

    def refresh(self, force=False):
        # TODO disable a.io accounts that are disabled in slack
        if not force and self.is_fresh:
            return

        response = requests.get(
            settings.CONNECTOR_URL + "/slack/accounts/list",
            params={"token": self.token},
        )
        payload = response.json()
        for user_info in payload:
            email = user_info["email"]

            account = None
            try:
                account = SlackAccount.objects.get(
                    pk=user_info["id"], profile__organization=self.organization
                )
                account.update_from_response(user_info)
            except SlackAccount.DoesNotExist:
                pass

            if not account:
                try:
                    profile = Profile.objects.get(
                        user__email=email, organization=self.organization
                    )
                    account = self.create_account_from_response(profile, user_info)
                except Profile.DoesNotExist:
                    pass

            if account:
                account.save()

        self.last_refresh = timezone.now()
        self.save()


class SlackAccount(AbstractAccount):
    integration = models.ForeignKey(
        SlackIntegration, related_name="accounts", on_delete=models.CASCADE
    )

    def update_from_response(self, response):
        email = response["email"]
        username = response["username"]
        image = response["image"]["small"]
        role = response["role"]
        self.username = username
        self.email = email
        self.image = image
        self.last_refresh = timezone.now()
        self.role = role

    def refresh(self, force=False):
        if not force and self.is_fresh:
            return
        response = requests.get(
            settings.CONNECTOR_URL + "/slack/accounts/getById",
            params={"token": self.integration.token, "id": self.id},
        )
        payload = response.json()

        if not payload["found"]:
            # TODO deactivate account
            return

        self.update_from_response(payload["account"])
        self.save()
