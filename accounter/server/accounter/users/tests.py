import json

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker

from accounter.organizations.models import Organization, Profile

User = get_user_model()


class UserTestCase(GraphQLTestCase):
    def setUp(self):
        owner_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=True,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        admin_profile = baker.make(
            Profile,
            is_admin=True,
            is_owner=False,
            organization=owner_profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        user_profile = baker.make(
            Profile,
            is_admin=False,
            is_owner=False,
            organization=owner_profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        self.profiles = [user_profile]
        self.owner = owner_profile.user
        self.admin = admin_profile.user
        self.user = user_profile.user

    def test_signup_mutation(self):
        email = "user@internet.cat"
        first_name = "firstname"
        last_name = "lastname"
        password = "some password"
        org_name = "SuperOrg"
        response = self.query(
            """
          mutation SignUp(
            $orgName: String!
            $firstName: String!
            $lastName: String!
            $email: String!
            $password: String!
          ) {
            signup(
              orgName: $orgName
              firstName: $firstName
              lastName: $lastName
              email: $email
              password: $password
            ) {
              status
            }
          }

          """,
            variables={
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "password": password,
                "orgName": org_name,
            },
        )
        self.assertResponseNoErrors(response)
        user = authenticate(username=email, password=password)
        assert user is not None
        assert user.first_name == first_name
        assert user.last_name == last_name
        assert user.profile is not None
        assert user.profile.organization is not None
        assert user.profile.organization.name == org_name

    def test_signup_is_atomic(self):
        email = "duplicated email"
        org_name = "some org"
        # create user, so other user cannot be created because of duplication
        User.objects.create(username=email, email=email, password="somepassword")
        response = self.query(
            """
            mutation SignUp(
              $orgName: String!
              $firstName: String!
              $lastName: String!
              $email: String!
              $password: String!
            ) {
              signup(
                orgName: $orgName
                firstName: $firstName
                lastName: $lastName
                email: $email
                password: $password
              ) {
                status
              }
            }
            """,
            variables={
                "email": email,
                "firstName": "firstname",
                "lastName": "lastname",
                "password": "some password",
                "orgName": org_name,
            },
        )
        self.assertResponseHasErrors(response)
        users = User.objects.filter(email=email)
        orgs = Organization.objects.filter(name=org_name)

        assert len(users) == 1
        assert len(orgs) == 0

    def test_reset_password(self):
        user_profile = baker.make(
            Profile,
            is_admin=False,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user_profile.user)
        new_password = "mypassword"

        response = self.query(
            """
          mutation ResetPassword(
            $username: String!
            $token: String!
            $password: String!
          ) {
            resetPassword(
              username: $username
              token: $token
              password: $password
            ) {
              status
            }
          }

          """,
            variables={
                "username": user_profile.user.username,
                "token": token,
                "password": new_password,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)

        assert content["data"]["resetPassword"]["status"] == "success"

        user = authenticate(username=user_profile.user.username, password=new_password)
        assert user is not None

    def test_reset_password_token_expires_if_login_is_removed(self):
        user_profile = baker.make(
            Profile,
            is_admin=False,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        user_profile.removeLogin()
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user_profile.user)
        new_password = "mypassword"

        response = self.query(
            """
          mutation ResetPassword(
            $username: String!
            $token: String!
            $password: String!
          ) {
            resetPassword(
              username: $username
              token: $token
              password: $password
            ) {
              status
            }
          }

          """,
            variables={
                "username": user_profile.user.username,
                "token": token,
                "password": new_password,
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_reset_password_invalid_token(self):
        user_profile = baker.make(
            Profile,
            is_admin=False,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        response = self.query(
            """
          mutation ResetPassword(
            $username: String!
            $token: String!
            $password: String!
          ) {
            resetPassword(
              username: $username
              token: $token
              password: $password
            ) {
              status
            }
          }

          """,
            variables={
                "username": user_profile.user.username,
                "token": "invalid-token",
                "password": "my-new-password",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "Link is expired"
