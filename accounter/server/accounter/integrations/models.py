import time
from typing import Optional
from uuid import uuid4

from django.conf import settings
from django.contrib.postgres.fields import HStoreField
from django.db import models
from slack_sdk.oauth import AuthorizeUrlGenerator
from slack_sdk.web import WebClient
from .fields import TokenField

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
            user_scopes=["admin"],
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
    id = models.TextField(primary_key=True)
    token = TokenField()
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)

    @property
    def service(self):
        raise NotImplementedError()

    class Meta:
        abstract = True


class AbstractAccount(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.RESTRICT)

    @property
    def integration(self):
        raise NotImplementedError()

    class Meta:
        abstract = True


# Slack
class SlackIntegration(AbstractIntegration):
    @property
    def service(self):
        return Service.objects.get(name=Service.Types.SLACK)


class SlackAccount(AbstractAccount):
    integration = models.ForeignKey(SlackIntegration, on_delete=models.RESTRICT)
