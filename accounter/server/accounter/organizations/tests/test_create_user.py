import json

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from model_bakery import baker
from graphql_relay.node.node import from_global_id, to_global_id

from ..models import Profile
from ..schemas import DepartmentNode

User = get_user_model()


class OrganizationCreateProfileTestCase(GraphQLTestCase):
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

    def test_create_user_admin_cannot_create_admin(self):
        self.client.force_login(self.admin)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
            $isAdmin: Boolean
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
                isAdmin: $isAdmin
              }
            ) {
              profile {
                id
                isAdmin
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
                "isAdmin": True,
            },
        )
        self.assertResponseHasErrors(response)
        content = json.loads(response.content)
        errors = content["errors"]
        assert (len(errors)) == 1
        assert (
            errors[0]["message"] == "You do not have permission to perform this action"
        )

    def test_create_user_owner_create_admin(self):
        self.client.force_login(self.owner)
        response = self.query(
            """
          mutation CreateUser (
            $email: String!
            $firstName: String!
            $lastName: String!
            $title: String!
            $isAdmin: Boolean
          ) {
            createUser(
              input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                title: $title
                isAdmin: $isAdmin
              }
            ) {
              profile {
                id
                isAdmin
              }
            }
          }

          """,
            variables={
                "email": "user@internet.cat",
                "firstName": "firstname",
                "lastName": "lastname",
                "title": "some title",
                "isAdmin": True,
            },
        )
        self.assertResponseNoErrors(response)
        content = json.loads(response.content)
        content = json.loads(response.content)
        returned_profile = content["data"]["createUser"]["profile"]
        assert returned_profile["isAdmin"] is True
