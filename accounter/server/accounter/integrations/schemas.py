import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from ..utils import admin_required
from .models import Account, Integration, Service


class ServiceNode(DjangoObjectType):
    class Meta:
        model = Service
        fields = ("name",)

    oauth_url = graphene.String(source="oauth_url", required=True)
    logo = graphene.String(required=True)

    @classmethod
    def resolve_logo(cls, instance, info):
        return instance.logo and instance.logo.url


ServiceType = graphene.Enum.from_enum(Service.Type)


class HandleCallback(graphene.Mutation):
    class Arguments:
        service = ServiceType(required=True)
        code = graphene.String(required=True)
        state = graphene.String(required=True)

    status = graphene.String(required=True)

    @admin_required
    def mutate(self, info, service: Service.Type, code: str, state: str):
        organization = info.context.user.profile.organization
        service = Service.objects.get(name=service)
        callback_result = service.handle_callback(code, state)
        integration, _ = Integration.objects.get_or_create(
            service=service,
            id=callback_result.integration_id,
            organization=organization,
        )
        integration.name = callback_result.name
        integration.token = callback_result.token
        integration.refresh_token = callback_result.refresh_token
        integration.has_valid_token = True
        integration.management_url = callback_result.management_url
        integration.save()
        return HandleCallback(status="success")


class SlackCallbackType(graphene.ObjectType):
    handleCallback = HandleCallback.Field()


class IntegrationNode(DjangoObjectType):
    service = graphene.Field(ServiceNode, required=True)

    class Meta:
        interfaces = (relay.Node,)
        model = Integration
        fields = ("id", "name", "accounts", "management_url", "has_valid_token")


class AccountNode(DjangoObjectType):
    integration = graphene.Field(IntegrationNode, required=True)
    profile = graphene.Field(
        "accounter.organizations.schemas.ProfileNode", required=True
    )

    class Meta:
        model = Account
        fields = (
            "email",
            "username",
            "role",
            "image_small",
            "image_big",
            "is_disabled",
            "id",
            "external_profile",
        )


class Oauth(graphene.ObjectType):
    slack = graphene.Field(SlackCallbackType, default_value={})
