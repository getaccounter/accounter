from django.conf import settings
from slack_scim import SCIMClient, Users
from slack_sdk.oauth import AuthorizeUrlGenerator
from slack_sdk.oauth.state_store import FileOAuthStateStore
from slack_sdk.web import WebClient

REDIRECT_URI_SHOULD_BE_ENV_VAR = "http://localhost:8080/slack/oauth/callback"


class _Slack:
    def __init__(self):
        self._redirect_uri = REDIRECT_URI_SHOULD_BE_ENV_VAR
        self._state_store = FileOAuthStateStore(
            expiration_seconds=300, base_dir="./data"
        )
        self._authorize_url_generator = AuthorizeUrlGenerator(
            client_id=settings.INTEGRATIONS["SLACK"]["CLIENT_ID"],
            # probably needs to be more granular
            redirect_uri=self._redirect_uri,
            # scopes=["admin"],
            user_scopes=["admin"],
        )

    def get_url(self) -> str:
        state = self._state_store.issue()
        return self._authorize_url_generator.generate(state)

    def handle_callback(self, code: str, state: str):
        if self._state_store.consume(state):
            client = WebClient()  # no prepared token needed for this
            # Complete the installation by calling oauth.v2.access API method
            oauth_response = client.oauth_v2_access(
                client_id=settings.INTEGRATIONS["SLACK"]["CLIENT_ID"],
                client_secret=settings.INTEGRATIONS["SLACK"]["CLIENT_SECRET"],
                redirect_uri=self._redirect_uri,
                code=code,
            )
            print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            print(oauth_response)
            # installed_enterprise = oauth_response.get("enterprise") or {}
            # installed_team = oauth_response.get("team") or {}
            # installer = oauth_response.get("authed_user") or {}
            # incoming_webhook = oauth_response.get("incoming_webhook") or {}
            # bot_token = oauth_response.get("access_token")
            # # NOTE: As oauth.v2.access doesn't include bot_id in response,
            # # we call bots.info for storing the installation data along with bot_id.
            authed_user = oauth_response.get("authed_user")
            token = authed_user.get("access_token")
            print(authed_user)
            print(token)
            client = SCIMClient(token=token)

            search_result: Users = client.search_users(count=3)
            print("???????????????????????????????")
            print(search_result)

        else:
            raise ValueError("the state value is expired")


slack = _Slack()
