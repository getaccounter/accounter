import graphene
from graphene_django import DjangoObjectType

from ..utils import signin_required
from .models import Service, SlackIntegration


class ServiceType(DjangoObjectType):
    class Meta:
        model = Service
        fields = ("name",)

    oauth_url = graphene.String(source="oauth_url", required=True)
    logo = graphene.String(required=True)

    @classmethod
    def resolve_logo(cls, instance, info):
        return instance.logo and instance.logo.url


class IntegrationInterface(graphene.Interface):
    service = graphene.Field(ServiceType)

    @classmethod
    def resolve_type(cls, instance, info):
        return SlackIntegrationType


class HandleCallback(graphene.Mutation):
    class Arguments:
        code = graphene.String(required=True)
        state = graphene.String(required=True)

    status = graphene.String(required=True)

    @signin_required
    def mutate(self, info, code: str, state: str):
        organization = info.context.user.admin.organization
        slack_service = Service.objects.get(name=Service.Types.SLACK)
        token = slack_service.handle_callback(code, state)
        slack_integration = SlackIntegration.objects.create(
            organization=organization, token=token
        )
        slack_integration.save()
        return HandleCallback(status="success")


class SlackCallbackType(graphene.ObjectType):
    handleCallback = HandleCallback.Field()


class SlackIntegrationType(DjangoObjectType):
    class Meta:
        interfaces = (IntegrationInterface,)
        model = SlackIntegration


class Oauth(graphene.ObjectType):
    slack = graphene.Field(SlackCallbackType, default_value={})
