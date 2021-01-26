from django.contrib.auth import get_user_model
from model_bakery import baker
from accounter.organizations.models import Profile


def create_slack_user_fixture(
    profile: Profile = baker.make(
        Profile,
        user=baker.make(get_user_model(), _fill_optional=True),
        _fill_optional=True,
    )
):
    real_name = f"{profile.user.first_name} {profile.user.last_name}"
    return {
        "id": "ASDASD123123",
        "team_id": "XYZXYZ789789",
        "name": "slack1",
        "deleted": False,
        "color": "9f69e7",
        "real_name": real_name,
        "tz": "Europe/Amsterdam",
        "tz_label": "Central European Time",
        "tz_offset": 3600,
        "profile": {
            "title": "",
            "phone": "",
            "skype": "",
            "real_name": real_name,
            "real_name_normalized": real_name,
            "display_name": profile.user.first_name,
            "display_name_normalized": profile.user.first_name,
            "fields": None,
            "status_text": "",
            "status_emoji": "",
            "status_expiration": 0,
            "avatar_hash": "g3307d47b80c",
            "email": profile.user.email,
            "first_name": profile.user.first_name,
            "last_name": profile.user.last_name,
            "image_24": "https://secure.gravatar.com/",
            "image_32": "https://secure.gravatar.com/",
            "image_48": "https://secure.gravatar.com/avatar/mock",
            "image_72": "https://secure.gravatar.com/avatar/mock",
            "image_192": "https://secure.gravatar.com/avatar/mock",
            "image_512": "https://secure.gravatar.com/avatar/mock",
            "status_text_canonical": "",
            "team": "EOEOEOEOE",
        },
        "is_admin": True,
        "is_owner": True,
        "is_primary_owner": True,
        "is_restricted": False,
        "is_ultra_restricted": False,
        "is_bot": False,
        "is_app_user": False,
        "updated": 1607524353,
        "has_2fa": False,
    }
