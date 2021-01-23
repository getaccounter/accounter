import graphene
from django.contrib.auth import get_user_model
from django.db import transaction
from graphene_django import DjangoObjectType
from graphql_relay.node.node import from_global_id
from django.core.exceptions import PermissionDenied

from .models import Department, Organization, Profile
from ..utils import admin_required, ExtendedConnection


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
        fields = ("name", "profiles", "departments")
        interfaces = (graphene.relay.Node,)


class DepartmentNode(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("name", "id")
        interfaces = (graphene.relay.Node,)


def can_user_edit_other_user(user_to_be_edited, editor):
    if user_to_be_edited.pk == editor.pk:
        # user can always edit themselves
        return True

    if user_to_be_edited.profile.is_owner and user_to_be_edited.pk != editor.pk:
        # nobody can edit owners but themselves
        return False

    if user_to_be_edited.profile.is_admin and not editor.profile.is_owner:
        # admins can only be edited by owners
        return False

    return True


class ProfileNode(DjangoObjectType):
    class Meta:
        connection_class = ExtendedConnection
        model = Profile
        fields = (
            "email",
            "first_name",
            "last_name",
            "title",
            "is_offboarded",
            "department",
            "organization",
            "is_admin",
            "is_owner",
        )
        interfaces = (graphene.relay.Node,)

    email = graphene.String(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    is_current_user = graphene.Boolean(required=True)
    current_user_can_edit = graphene.Boolean(required=True)

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
        return can_user_edit_other_user(profile.user, user)


class CreateUser(graphene.relay.ClientIDMutation):
    class Input:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        title = graphene.String()
        department = graphene.ID()
        is_admin = graphene.Boolean()

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        organization = info.context.user.profile.organization

        if input.get("is_admin") is True:
            if info.context.user.profile.is_owner is False:
                raise PermissionDenied(
                    "You do not have permission to perform this action"
                )

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
            is_active=False,
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            organization=organization,
            title=input.get("title", None),
            is_admin=input.get("is_admin", False),
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
        is_admin = graphene.Boolean()

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        if not can_user_edit_other_user(profile.user, info.context.user):
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

        if input.get("department") is not None:
            department_relay_id = input.get("department")
            _, db_pk = from_global_id(department_relay_id)
            department = Department.objects.get(pk=int(db_pk))
            profile.department = department

        profile.save()
        profile.user.save()

        return UpdateUser(profile=profile)


class OffboardUser(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        if profile.is_owner:
            raise PermissionDenied("Owner cannot be offboarded")

        if profile.user.pk == info.context.user.pk:
            raise PermissionDenied("You cannot offboard yourself")

        if not can_user_edit_other_user(profile.user, info.context.user):
            raise PermissionDenied("You do not have permission to perform this action")

        profile.offboard()

        return OffboardUser(profile=profile)


class ReactivateUser(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    profile = graphene.Field(ProfileNode, required=True)

    @admin_required
    def mutate_and_get_payload(root, info, *args, **input):
        profile_pk = from_global_id(input.get("id"))[1]
        organization = info.context.user.profile.organization
        profile = Profile.objects.get(pk=profile_pk, organization=organization)

        if profile.is_owner:
            # Should be an edge case, but disallowing it for now
            raise PermissionDenied("Owner cannot be reactivated")

        if profile.user.pk == info.context.user.pk:
            # Should be impossible to arrive here, but just in case ...
            raise PermissionDenied("You cannot reactivate yourself")

        if not can_user_edit_other_user(profile.user, info.context.user):
            raise PermissionDenied("You do not have permission to perform this action")

        profile.reactivate()

        return OffboardUser(profile=profile)


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
    offboard_user = OffboardUser.Field()
    reactivate_user = ReactivateUser.Field()
