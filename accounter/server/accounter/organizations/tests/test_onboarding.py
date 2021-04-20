from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from ..models import Profile

User = get_user_model()


class OnboardingTestCase(GraphQLTestCase):
    def setUp(self):
        owner_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        self.owner = owner_profile.user

    def test_onboarding_apps(self):
        self.client.force_login(self.owner)

        response = self.query(
            """
            mutation OnboardApps($apps: [Types!]!) {
                onboardApps(apps: $apps) {
                    status
                }
            }
            """,
            variables={"apps": []},
        )
        self.assertResponseNoErrors(response)

    # def test_onboarding_apps_only_by_admin(self):
    #     self.client.force_login(self.owner)

    #     response = self.query(
    #         """
    #         mutation OnboardApps($apps: [Types!]!) {
    #             onboardApps(apps: $apps) {
    #                 status
    #             }
    #         }
    #         """,
    #         variables={
    #             "apps": []
    #         },
    #     )
    #     self.assertResponseNoErrors(response)

    # def test_onboarding_apps_only_by_not_onboarded_companies(self):
    #     self.client.force_login(self.owner)

    #     response = self.query(
    #         """
    #         mutation OnboardApps($apps: [Types!]!) {
    #             onboardApps(apps: $apps) {
    #                 status
    #             }
    #         }
    #         """,
    #         variables={
    #             "apps": []
    #         },
    #     )
    #     self.assertResponseNoErrors(response)
