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


class HandleCallback(graphene.Mutation):
    class Arguments:
        code = graphene.String(required=True)
        state = graphene.String(required=True)

    status = graphene.String(required=True)

    @admin_required
    def mutate(self, info, code: str, state: str):
        organization = info.context.user.profile.organization
        slack_service = Service.objects.get(name=Service.Types.SLACK)
        callback_result = slack_service.handle_callback(code, state)
        slack_integration, _ = Integration.objects.get_or_create(
            service=slack_service,
            id=callback_result.integration_id,
            organization=organization,
        )
        slack_integration.name = callback_result.name
        slack_integration.token = callback_result.token
        slack_integration.save()
        return HandleCallback(status="success")


class SlackCallbackType(graphene.ObjectType):
    handleCallback = HandleCallback.Field()


class IntegrationNode(DjangoObjectType):
    service = graphene.Field(ServiceNode, required=True)

    class Meta:
        interfaces = (relay.Node,)
        model = Integration
        fields = ("id", "name", "accounts")


class AccountNode(DjangoObjectType):
    id = graphene.ID(required=True)
    integration = graphene.Field(IntegrationNode, required=True)
    profile = graphene.Field(
        "accounter.organizations.schemas.ProfileNode", required=True
    )
    email = graphene.String(required=True)
    username = graphene.String(required=True)
    role = graphene.String(required=True)
    image_small = graphene.String(required=True)

    class Meta:
        model = Account
        filter_fields = ["profile"]


class Oauth(graphene.ObjectType):
    slack = graphene.Field(SlackCallbackType, default_value={})
