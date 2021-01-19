import graphene
from django.contrib.auth import get_user_model
from django.db import transaction
from graphene_django import DjangoObjectType
from ..utils import signin_required, ExtendedConnection
from ..utils import admin_required
from graphql_relay.node.node import from_global_id

from .models import Department, Organization, Profile


class Signup(graphene.Mutation):
    class Arguments:
        org_name = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    status = graphene.String(required=True)

    @transaction.atomic
    def mutate(
        self,
        info,
        org_name: str,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
    ):
        User = get_user_model()
        org = Organization.objects.create(name=org_name)
        org.save()
        user = User.objects.create(
            username=email, email=email, first_name=first_name, last_name=last_name
        )
        user.set_password(password)
        user.save()
        admin = Profile.objects.create(user=user, organization=org, is_admin=True)
        admin.save()

        return Signup(status="success")


class OrganizationNode(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("name", "profiles", "departments")
        interfaces = (graphene.relay.Node,)


class DepartmentNode(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("name", "id")
        interfaces = (graphene.relay.Node,)


class ProfileNode(DjangoObjectType):
    class Meta:
        connection_class = ExtendedConnection
        model = Profile
        fields = (
            "email",
            "first_name",
            "last_name",
            "title",
            "is_active",
            "department",
            "organization",
            "is_admin",
        )
        interfaces = (graphene.relay.Node,)

    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    is_current_user = graphene.Boolean(required=True)

    @staticmethod
    def resolve_email(profile, info, **kwargs):
        return profile.user.email

    @staticmethod
    def resolve_first_name(profile, info, **kwargs):
        first_name = profile.user.first_name
        if len(first_name) > 0:
            return first_name
        return None

    @staticmethod
    def resolve_last_name(profile, info, **kwargs):
        last_name = profile.user.last_name
        if len(last_name) > 0:
            return last_name
        return None

    @staticmethod
    def resolve_is_current_user(profile, info, **kwargs):
        user = info.context.user
        return profile.user == user


class CreateUser(graphene.relay.ClientIDMutation):
    class Input:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        title = graphene.String()
        department = graphene.ID()

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        organization = info.context.user.profile.organization

        department = None
        if input.get("department") is not None:
            department_relay_id = input.get("department")
            _, db_pk = from_global_id(department_relay_id)
            department = Department.objects.get(pk=int(db_pk))

        User = get_user_model()
        user = User.objects.create(
            username=input.get("email"),
            email=input.get("email"),
            first_name=input.get("first_name"),
            last_name=input.get("last_name"),
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            organization=organization,
            title=input.get("title", None),
            is_admin=False,
            department=department,
        )
        profile.save()

        return CreateUser(profile=profile)


class UpdateUser(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        title = graphene.String()
        department = graphene.ID()

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        if input.get("first_name") is not None:
            profile.user.first_name = input.get("first_name")

        if input.get("last_name") is not None:
            profile.user.last_name = input.get("last_name")

        if input.get("email") is not None:
            profile.user.email = input.get("email")

        if input.get("title") is not None:
            profile.title = input.get("title")

        if input.get("department") is not None:
            department_relay_id = input.get("department")
            _, db_pk = from_global_id(department_relay_id)
            department = Department.objects.get(pk=int(db_pk))
            profile.department = department

        profile.save()
        profile.user.save()

        return UpdateUser(profile=profile)


class Query(graphene.ObjectType):
    @staticmethod
    @signin_required
    def resolve_organization(parent, info, **kwargs):
        return info.context.user.profile.organization

    current_user = graphene.Field(ProfileNode, required=True)

    @staticmethod
    @signin_required
    def resolve_current_user(parent, info, **kwargs):
        return info.context.user.profile


class Mutation(graphene.ObjectType):
    signup = Signup.Field()
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
