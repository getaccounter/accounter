import graphene
from django.contrib.auth import get_user_model
from django.db import transaction
from graphene_django import DjangoObjectType
from ..utils import signin_required

from .models import Admin, Department, Organization, Profile


class Signup(graphene.Mutation):
    class Arguments:
        org_name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    status = graphene.String(required=True)

    @transaction.atomic
    def mutate(self, info, org_name: str, email: str, password: str):
        User = get_user_model()
        org = Organization.objects.create(name=org_name)
        org.save()
        user = User.objects.create(username=email, email=email)
        user.set_password(password)
        user.save()
        admin = Admin.objects.create(user=user, organization=org)
        admin.save()

        return Signup(status="success")


class OrganizationNode(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("name", "profiles")
        interfaces = (graphene.relay.Node, )

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
        )
        interfaces = (graphene.relay.Node, )

    email = graphene.String(required=True)
    first_name = graphene.String()
    last_name = graphene.String()

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

class Query(graphene.ObjectType):
    organization = graphene.Field(OrganizationNode)

    @staticmethod
    @signin_required
    def resolve_organization(parent, info, **kwargs):
        return info.context.user.admin.organization

    # organization = graphene.relay.Node.Field(OrganizationNode)
    # all_categories = DjangoFilterConnectionField(CategoryNode)

    profile = graphene.relay.Node.Field(ProfileNode)
    # all_categories = DjangoFilterConnectionField(CategoryNode)