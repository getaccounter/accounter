import json

from django.contrib.auth import authenticate, get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from graphql_relay.node.node import from_global_id, to_global_id

from .models import Organization, Profile, Department
from .schemas import DepartmentNode, ProfileNode

User = get_user_model()


class OrganizationTestCase(GraphQLTestCase):
    def setUp(self):
        admin_profile = baker.make(
            Profile,
            is_admin=True,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        user_profile = baker.make(
            Profile,
            is_admin=False,
            organization=admin_profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )
        self.profiles = [user_profile]
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

    def test_get_organization(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
            {
              currentUser {
                organization {
                  name
                  profiles {
                    edges {
                      node {
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
                }
              }
            }
            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        organization = content["data"]["currentUser"]["organization"]
        assert organization["name"] == self.admin.profile.organization.name
        assert len(organization["profiles"]["edges"]) == 2
        response_profile = organization["profiles"]["edges"][1]["node"]
        assert response_profile["email"] == self.profiles[0].user.email
        assert response_profile["firstName"] == self.profiles[0].user.first_name
        assert response_profile["lastName"] == self.profiles[0].user.last_name
        assert response_profile["title"] == self.profiles[0].title
        assert response_profile["isActive"] == self.profiles[0].is_active
        assert (
            response_profile["department"]["name"] == self.profiles[0].department.name
        )

    def test_get_current_user(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
            {
              currentUser{
                email
              }
            }

            """,
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        assert content["data"]["currentUser"]["email"] == self.admin.email

    def test_create_user(self):
        self.client.force_login(self.admin)
        email = "user@internet.cat"
        first_name = "somefirstname"
        last_name = "somelastname"
        title = "some title"
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
            $department: ID
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
                department: $department
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "title": title,
                "department": to_global_id(
                    DepartmentNode._meta.name, self.admin.profile.department.pk
                ),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["createUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.user.first_name == returned_profile["firstName"] == first_name
        assert profile.user.last_name == returned_profile["lastName"] == last_name
        assert profile.user.email == returned_profile["email"] == email
        assert profile.title == returned_profile["title"] == title
        assert (
            profile.department.name
            == returned_profile["department"]["name"]
            == self.admin.profile.department.name
        )

    def test_create_user_without_optional_fields(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["createUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))
        assert profile.title is None
        assert returned_profile["title"] is None

    def test_create_user_requires_admin(self):
        self.client.force_login(self.user)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        email = "user@internet.cat"
        first_name = "somefirstname"
        last_name = "somelastname"
        title = "some title"
        department = baker.make(Department)

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
            $email: String
            $firstName: String
            $lastName: String
            $title: String
            $department: ID
          ) {
            updateUser(
              input: {
                id: $id
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
                department: $department
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
                "email": email,
                "firstName": first_name,
                "lastName": last_name,
                "title": title,
                "department": to_global_id(DepartmentNode._meta.name, department.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])
        profile = Profile.objects.get(id=int(db_pk))

        assert profile.user.first_name == returned_profile["firstName"] == first_name
        assert profile.user.last_name == returned_profile["lastName"] == last_name
        assert profile.user.email == returned_profile["email"] == email
        assert profile.title == returned_profile["title"] == title
        assert (
            profile.department.name
            == returned_profile["department"]["name"]
            == department.name
        )

    def test_update_user_without_optional_fields(self):
        self.client.force_login(self.admin)
        user_profile_to_update = baker.make(
            Profile,
            is_admin=False,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
                email
                firstName
                lastName
                title
                department {
                  name
                }
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        returned_profile = content["data"]["updateUser"]["profile"]
        _, db_pk = from_global_id(returned_profile["id"])

        # Assert that nothing changed and the return type is correct
        profile = Profile.objects.get(id=int(db_pk))
        assert (
            user_profile_to_update.user.first_name
            == profile.user.first_name
            == returned_profile["firstName"]
        )
        assert (
            user_profile_to_update.user.last_name
            == profile.user.last_name
            == returned_profile["lastName"]
        )
        assert (
            user_profile_to_update.user.email
            == profile.user.email
            == returned_profile["email"]
        )
        assert (
            user_profile_to_update.title == profile.title == returned_profile["title"]
        )
        assert (
            user_profile_to_update.department.name
            == profile.department.name
            == returned_profile["department"]["name"]
        )

    def test_update_user_has_to_be_admin(self):
        self.client.force_login(self.user)
        user_profile_to_update = baker.make(
            Profile,
            organization=self.admin.profile.organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(ProfileNode._meta.name, user_profile_to_update.pk),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_update_user_can_only_edit_users_from_same_organization(self):
        self.client.force_login(self.admin)
        other_organization = baker.make(Organization)
        user_from_other_organization = baker.make(
            Profile,
            organization=other_organization,
            user=baker.make(User, _fill_optional=True),
            _fill_optional=True,
        )

        response = self.query(
            """
          mutation UpdateUser (
            $id: ID!
          ) {
            updateUser(
              input: {
                id: $id
              }
            ) {
              profile {
                id
              }
            }
          }

          """,
            variables={
                "id": to_global_id(
                    ProfileNode._meta.name, user_from_other_organization.pk
                ),
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert errors[0]["message"] == "Profile matching query does not exist."
