import graphene
from django.contrib.auth import get_user_model, login
from django.core.exceptions import PermissionDenied
from django.db import transaction
from graphene_django import DjangoObjectType
from graphql_relay.node.node import from_global_id

from accounter.integrations.models import Account, Service
from accounter.integrations.schemas import AccountNode

from ..utils import ExtendedConnection, admin_required
from .models import Lead, Organization, Profile


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
        profile = Profile.objects.create(
            user=user, organization=org, is_admin=True, is_owner=True
        )
        profile.save()

        login(info.context, user)
        return Signup(status="success")


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
    has_active_accounts = graphene.Boolean(required=True)

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
            account = Account.objects.filter(
                profile=profile,
                integration__service=Service.objects.get(name=Service.Types.SLACK),
            ).first()
            return account.image_big
        except Account.DoesNotExist:
            return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        except AttributeError:
            return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"

    @staticmethod
    def resolve_has_active_accounts(profile, info, **kwargs):
        active_accounts_number = profile.accounts.filter(is_disabled=False).count()
        return active_accounts_number > 0


class OrganizationNode(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("name", "profiles")
        interfaces = (graphene.relay.Node,)

    profile = graphene.Field(ProfileNode, id=graphene.ID(required=True))

    def resolve_profile(root, info, id: str):
        organization = info.context.user.profile.organization
        profile_pk = from_global_id(id)[1]
        return organization.profiles.get(pk=profile_pk)


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

        profile = organization.create_profile(email, first_name, last_name, title=title)

        return CreateUser(profile=profile)


class UpdateUser(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        title = graphene.String()
        is_admin = graphene.Boolean()
        merge_with = graphene.ID()

    profiles = graphene.List(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        updated_profiles = [profile]

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

        if input.get("merge_with") is not None:
            node_id = input.get("merge_with")
            profile_to_merge_with_pk = from_global_id(node_id)[1]
            profile_to_merge_with = Profile.objects.get(pk=profile_to_merge_with_pk)
            profile.merge_with(profile_to_merge_with)
            updated_profiles.append(profile_to_merge_with)

        profile.user.save()
        profile.save()

        return UpdateUser(profiles=updated_profiles)


class OnboardBasic(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        role = graphene.String(required=True)
        organization_size = graphene.String(required=True)

    status = graphene.String(required=True)

    @transaction.atomic
    def mutate(
        self, info, first_name: str, last_name: str, role: str, organization_size: str
    ):
        user = info.context.user
        user.first_name = first_name
        user.last_name = last_name

        lead = Lead.objects.create(
            profile=user.profile,
            first_name=first_name,
            last_name=last_name,
            email=user.email,
            organization_size=organization_size,
            role=role,
        )

        user.save()
        lead.save()

        return OnboardBasic(status="success")


class ValueLabelPair(graphene.ObjectType):
    value = graphene.String(required=True)
    label = graphene.String(required=True)


class LeadNode(graphene.ObjectType):
    roles = graphene.List(graphene.NonNull(ValueLabelPair), required=True)
    organization_sizes = graphene.List(graphene.NonNull(ValueLabelPair), required=True)

    @staticmethod
    def resolve_roles(_, info, **kwargs):
        return list(
            map(lambda role: {"value": role.value, "label": role.label}, Lead.Roles)
        )

    @staticmethod
    def resolve_organization_sizes(_, info, **kwargs):
        return list(
            map(lambda size: {"value": size.value, "label": size.label}, Lead.Sizes)
        )


class Query(graphene.ObjectType):
    current_user = graphene.Field(ProfileNode, required=True)

    @staticmethod
    @admin_required
    def resolve_current_user(_, info, **kwargs):
        return info.context.user.profile

    leads = graphene.Field(LeadNode, required=True, default_value={})


class Mutation(graphene.ObjectType):
    signup = Signup.Field()
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    onboard_basic = OnboardBasic.Field()
