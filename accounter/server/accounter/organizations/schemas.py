import graphene
from django.contrib.auth import get_user_model
from django.db import transaction
from graphene_django import DjangoObjectType
from ..utils import signin_required

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
        fields = ("name", "profiles")
        interfaces = (graphene.relay.Node,)


class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("name", "id")


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        fields = (
            "email",
            "first_name",
            "last_name",
            "title",
            "is_active",
            "department",
            "organization",
        )
        interfaces = (graphene.relay.Node,)

    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)

    @staticmethod
    def resolve_email(profile, info, **kwargs):
        return profile.user.email

    @staticmethod
    def resolve_first_name(profile, info, **kwargs):
        first_name = profile.user.first_name
        if len(first_name) > 0:
            return first_name
        print("!!!!!")
        print(profile.user.__dict__)
        print(len(first_name))
        return None

    @staticmethod
    def resolve_last_name(profile, info, **kwargs):
        last_name = profile.user.last_name
        if len(last_name) > 0:
            return last_name
        return None


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
