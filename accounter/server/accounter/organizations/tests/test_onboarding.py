from django.contrib.auth import get_user_model
from faker import Faker
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from ..models import Lead, Profile

User = get_user_model()
fake = Faker()


class OnboardingTestCase(GraphQLTestCase):
    def setUp(self):
        owner_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            user=baker.make(User),
            _fill_optional=True,
        )
        self.owner = owner_profile.user

    def test_onboarding_basic(self):
        requesting_user = self.owner
        self.client.force_login(requesting_user)
        first_name = fake.first_name()
        last_name = fake.last_name()
        role = list(map(lambda role: role.value, Lead.Role))[0]
        organizationSize = list(map(lambda size: size.value, Lead.Size))[0]

        response = self.query(
            """
            mutation onboardBasic(
                $firstName: String!,
                $lastName: String!,
                $organizationSize: Size!,
                $role: Role!
            ) {
                onboardBasic(
                    firstName: $firstName,
                    lastName: $lastName,
                    organizationSize: $organizationSize,
                    role: $role
                ) {
                    status
                }
            }
            """,
            variables={
                "firstName": first_name,
                "lastName": last_name,
                "organizationSize": organizationSize,
                "role": role,
            },
        )
        self.assertResponseNoErrors(response)
        requesting_user.refresh_from_db()
        assert requesting_user.first_name == first_name
        assert requesting_user.last_name == last_name
        assert requesting_user.profile.lead.organization_size == organizationSize
        assert requesting_user.profile.lead.role == role

    def test_onboarding_apps(self):
        self.client.force_login(self.owner)

        response = self.query(
            """
            mutation OnboardApps($apps: [Type!]!) {
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
    #         mutation OnboardApps($apps: [Type!]!) {
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
    #         mutation OnboardApps($apps: [Type!]!) {
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
