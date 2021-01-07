import json

from django.contrib.auth import authenticate, get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from .models import Admin, Organization, Profile

User = get_user_model()


class OrganizationTestCase(GraphQLTestCase):
    def setUp(self):
        admin = baker.make(Admin)
        self.profiles = [
            baker.make(
                Profile,
                organization=admin.organization,
                user=baker.make(User, _fill_optional=True),
                _fill_optional=True,
            )
        ]
        self.user = admin.user

    def test_signup_mutation(self):
        email = "user@internet.cat"
        password = "some password"
        org_name = "SuperOrg"
        response = self.query(
            """
              mutation SignUp($email: String!, $orgName: String!, $password: String!) {
                signup(email: $email, orgName: $orgName, password: $password) {
                  status
                }
              }
            """,
            variables={"email": email, "password": password, "orgName": org_name},
        )
        self.assertResponseNoErrors(response)
        user = authenticate(username=email, password=password)
        assert user is not None
        assert user.admin is not None
        assert user.admin.organization is not None
        assert user.admin.organization.name == org_name

    def test_signup_is_atomic(self):
        email = "duplicated email"
        org_name = "some org"
        # create user, so other user cannot be created because of duplication
        User.objects.create(username=email, email=email, password="somepassword")
        response = self.query(
            """
              mutation SignUp($email: String!, $orgName: String!, $password: String!) {
                signup(email: $email, orgName: $orgName, password: $password) {
                  status
                }
              }
            """,
            variables={"email": email, "password": "short", "orgName": org_name},
        )
        self.assertResponseHasErrors(response)
        users = User.objects.filter(email=email)
        orgs = Organization.objects.filter(name=org_name)

        assert len(users) == 1
        assert len(orgs) == 0

    def test_get_organization(self):
        self._client.force_login(self.user)
        response = self.query(
            """
              {
                organization {
                  name
                  profiles {
                    email
                    firstName
                    lastName
                    title
                    isActive
                    department {
                      name
                    }
                  }
                }
              }
            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        organization = content["data"]["organization"]
        assert organization["name"] == self.user.admin.organization.name
        assert len(organization["profiles"]) == 1
        response_profile = organization["profiles"][0]
        assert response_profile["email"] == self.profiles[0].user.email
        assert response_profile["firstName"] == self.profiles[0].user.first_name
        assert response_profile["lastName"] == self.profiles[0].user.last_name
        assert response_profile["title"] == self.profiles[0].title
        assert response_profile["isActive"] == self.profiles[0].is_active
        assert (
            response_profile["department"]["name"] == self.profiles[0].department.name
        )
