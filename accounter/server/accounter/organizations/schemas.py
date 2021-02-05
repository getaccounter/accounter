import graphene
from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied
from django.db import transaction
from graphene_django import DjangoObjectType
from graphql_relay.node.node import from_global_id

from accounter.integrations.models import Account, Service
from accounter.integrations.schemas import AccountNode

from ..utils import ExtendedConnection, admin_required
from .models import Organization, Profile


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
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        profile = Profile.objects.create(
            user=user, organization=org, is_admin=True, is_owner=True
        )
        profile.save()

        return Signup(status="success")


class OrganizationNode(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("name", "profiles")
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
            "organization",
            "is_admin",
            "is_owner",
        )
        interfaces = (graphene.relay.Node,)

    email = graphene.String(required=True)
    first_name = graphene.String()
    last_name = graphene.String()
    is_current_user = graphene.Boolean(required=True)
    current_user_can_edit = graphene.Boolean(required=True)
    accounts = graphene.List(graphene.NonNull(AccountNode), required=True)
    image = graphene.String(required=True)

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

    @staticmethod
    def resolve_current_user_can_edit(profile, info, **kwargs):
        user = info.context.user
        return profile.can_be_edited_by(user.profile)

    @staticmethod
    def resolve_accounts(profile, info, **kwargs):
        accounts = Account.objects.filter(profile=profile)
        for account in accounts:
            account.refresh()

        return accounts

    @staticmethod
    def resolve_image(profile, info, **kwargs):
        try:
            account = Account.objects.get(
                profile=profile,
                integration__service=Service.objects.get(name=Service.Types.SLACK),
            )
            return account.image_big
        except Account.DoesNotExist:
            return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"


class CreateUser(graphene.relay.ClientIDMutation):
    class Input:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        title = graphene.String()

    profile = graphene.Field(ProfileNode, required=True)

    @transaction.atomic
    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        organization = info.context.user.profile.organization

        first_name = input.get("first_name")
        last_name = input.get("last_name")
        email = input.get("email")
        title = input.get("title")

        profile = organization.create_profile(
            email,
            first_name,
            last_name,
            title=title,
        )

        return CreateUser(profile=profile)


class UpdateUser(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        title = graphene.String()
        is_admin = graphene.Boolean()

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        if not profile.can_be_edited_by(info.context.user.profile):
            raise PermissionDenied("You do not have permission to perform this action")

        if input.get("is_admin", None) is not None:
            if info.context.user.profile.is_owner is False:
                raise PermissionDenied(
                    "You do not have permission to perform this action"
                )

            is_admin = input.get("is_admin")
            is_admin_changed = is_admin != profile.is_admin

            if is_admin_changed and is_admin:
                profile.promote_to_admin(info.context.user.profile)

            if is_admin_changed and not is_admin:
                profile.demote_to_regular_user(info.context.user.profile)

        if input.get("first_name") is not None:
            profile.user.first_name = input.get("first_name")

        if input.get("last_name") is not None:
            profile.user.last_name = input.get("last_name")

        if input.get("email") is not None:
            profile.user.email = input.get("email")

        if input.get("title") is not None:
            profile.title = input.get("title")

        profile.save()
        profile.user.save()

        return UpdateUser(profile=profile)


class Query(graphene.ObjectType):
    current_user = graphene.Field(ProfileNode, required=True)

    @staticmethod
    @admin_required
    def resolve_current_user(parent, info, **kwargs):
        return info.context.user.profile


class Mutation(graphene.ObjectType):
    signup = Signup.Field()
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
