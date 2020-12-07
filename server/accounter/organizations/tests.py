from django.contrib.auth import authenticate, get_user_model
from graphene_django.utils.testing import GraphQLTestCase

from .models import Organization

User = get_user_model()


class OrganizationTestCase(GraphQLTestCase):
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
