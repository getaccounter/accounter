import time
from typing import Optional
from uuid import uuid4

from django.conf import settings
from django.contrib.postgres.fields import HStoreField
from django.db import models
from slack_sdk.oauth import AuthorizeUrlGenerator
from slack_sdk.web import WebClient, SlackResponse
from .fields import TokenField
from django.utils import timezone
from datetime import timedelta
from ..organizations.models import Organization, Profile


class Service(models.Model):
    class CallbackResult:
        integration_id: str
        token: str

        def __init__(self, integration_id: str, token: str):
            self.integration_id = integration_id
            self.token = token

    # Has a lot of slack specific logic, once we add a second service, lets fix this
    class Types(models.TextChoices):
        SLACK = "SLACK", "Slack"

    name = models.CharField("Type", max_length=50, choices=Types.choices, unique=True)
    logo = models.FileField(upload_to="services/logos")
    state_store = HStoreField(default=dict)

    @property
    def oauth_url(self):
        state = str(uuid4())
        key = f"{self._client_id}/{state}"
        value = str(time.time())
        self.state_store[key] = value
        self.save()
        authorize_url_generator = AuthorizeUrlGenerator(
            client_id=self._client_id,
            redirect_uri=self._redirect_uri,
            user_scopes=["users:read", "users:read.email"],
        )
        return authorize_url_generator.generate(state)

    def handle_callback(self, code: str, state: str):
        is_still_valid = self._is_callback_still_valid(state)
        if not is_still_valid:
            raise ValueError("the state value is expired")

        client = WebClient()
        oauth_response = client.oauth_v2_access(
            client_id=self._client_id,
            client_secret=self._client_secret(),
            redirect_uri=self._redirect_uri,
            code=code,
        )
        authed_user = oauth_response.get("authed_user")
        team = oauth_response.get("team")
        token = authed_user.get("access_token")
        return Service.CallbackResult(integration_id=team.get("id"), token=token)

    def _is_callback_still_valid(self, state: str):
        key = f"{self._client_id}/{state}"
        value = None
        try:
            value: Optional[str] = self.state_store[key]
        except Exception:
            pass

        if not value:
            return False

        created = float(value)
        expiration = created + self._oauth_expiration_seconds
        return time.time() < expiration

    @property
    def _client_id(self):
        return settings.INTEGRATIONS["SLACK"]["CLIENT_ID"]

    def _client_secret(self):
        return settings.INTEGRATIONS["SLACK"]["CLIENT_SECRET"]

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
    token = TokenField()
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)
    last_refresh = models.DateTimeField(auto_now_add=True)

    @property
    def is_fresh(self):
        return (
            timezone.now() - timedelta(seconds=self.REFRESH_INTERVAL_SECONDS)
            > self.last_refresh
        )

    @property
    def service(self):
        raise NotImplementedError()

    def refresh(self, force=False):
        raise NotImplementedError()


class AbstractAccount(models.Model):
    class Meta:
        abstract = True

    REFRESH_INTERVAL_SECONDS = 60

    id = models.CharField(primary_key=True, max_length=100)
    profile = models.ForeignKey(Profile, on_delete=models.RESTRICT)
    last_refresh = models.DateTimeField(auto_now_add=True)

    @property
    def is_fresh(self):
        return (
            timezone.now() - timedelta(seconds=self.REFRESH_INTERVAL_SECONDS)
            > self.last_refresh
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

    @property
    def client(self):
        return WebClient(token=self.token)

    def create_account_from_response(
        self, profile: Profile, slack_user_info: SlackResponse
    ):
        email = slack_user_info["profile"]["email"]
        display_name = slack_user_info["profile"]["display_name"]
        slack_id = slack_user_info["id"]
        account = SlackAccount.objects.create(
            id=slack_id,
            profile=profile,
            integration=self,
            email=email,
            username=display_name,
        )
        return account

    def refresh(self, force=False):
        if not force and self.is_fresh:
            return

        slack_response = self.client.users_list()
        members = slack_response["members"]
        members_without_slackbot = list(
            filter(lambda m: m["id"] != "USLACKBOT", members)
        )
        members_without_any_bots = list(
            filter(lambda m: not m["is_bot"], members_without_slackbot)
        )
        for user_info in members_without_any_bots:
            email = user_info["profile"]["email"]

            account = None
            try:
                account = SlackAccount.objects.get(
                    pk=user_info["id"], profile__organization=self.organization
                )
            except SlackAccount.DoesNotExist:
                pass

            if account:
                account.update_from_response(user_info)
            else:
                profile = None
                try:
                    profile = Profile.objects.get(
                        user__email=email, organization=self.organization
                    )
                except Profile.DoesNotExist:
                    pass

                if profile:
                    account = self.create_account_from_response(profile, user_info)

            if account:
                account.save()

        self.last_refresh = timezone.now()
        self.save()


class SlackAccount(AbstractAccount):
    username = models.CharField(max_length=150)
    email = models.EmailField()
    integration = models.ForeignKey(
        SlackIntegration, related_name="accounts", on_delete=models.RESTRICT
    )

    def update_from_response(self, slack_user_info: SlackResponse):
        email = slack_user_info["profile"]["email"]
        display_name = slack_user_info["profile"]["display_name"]
        self.username = display_name
        self.email = email
        self.last_refresh = timezone.now()

    def refresh(self, force=False):
        if not force and self.is_fresh:
            return
        response = self.integration.client.users_info(user=self.id)
        self.update_from_response(response["user"])
        self.save()
