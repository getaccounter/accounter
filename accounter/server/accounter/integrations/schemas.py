import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from ..utils import admin_required
from .models import Account, Service, SlackIntegration


class ServiceNode(DjangoObjectType):
    class Meta:
        model = Service
        fields = ("name",)

    oauth_url = graphene.String(source="oauth_url", required=True)
    logo = graphene.String(required=True)

    @classmethod
    def resolve_logo(cls, instance, info):
        return instance.logo and instance.logo.url


class IntegrationInterface(graphene.Interface):
    id = graphene.ID(required=True)
    service = graphene.Field(ServiceNode, required=True)
    name = graphene.String(required=True)

    @classmethod
    def resolve_type(cls, instance, info):
        return SlackIntegrationNode


class AccountInterface(graphene.Interface):
    id = graphene.ID(required=True)
    integration = graphene.Field(IntegrationInterface, required=True)
    profile = graphene.Field(
        "accounter.organizations.schemas.ProfileNode", required=True
    )
    image = graphene.String(required=True)
    email = graphene.String(required=True)
    username = graphene.String(required=True)
    role = graphene.String(required=True)

    @classmethod
    def resolve_type(cls, instance, info):
        return SlackAccountNode


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
        slack_integration, _ = SlackIntegration.objects.get_or_create(
            id=callback_result.integration_id,
            organization=organization,
        )
        slack_integration.name = callback_result.name
        slack_integration.token = callback_result.token
        slack_integration.save()
        return HandleCallback(status="success")


class SlackCallbackType(graphene.ObjectType):
    handleCallback = HandleCallback.Field()


class SlackAccountNode(DjangoObjectType):
    class Meta:
        interfaces = (relay.Node, AccountInterface)
        model = Account
        filter_fields = ["profile"]


class SlackIntegrationNode(DjangoObjectType):
    class Meta:
        interfaces = (IntegrationInterface,)
        model = SlackIntegration
        fields = ("id", "service")

    accounts = graphene.List(graphene.NonNull(SlackAccountNode), required=True)

    @staticmethod
    def resolve_accounts(slackIntegration, info, **kwargs):
        return slackIntegration.accounts.all()


class Oauth(graphene.ObjectType):
    slack = graphene.Field(SlackCallbackType, default_value={})
