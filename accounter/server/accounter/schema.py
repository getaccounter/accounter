import graphene

from .integrations.models import Service, SlackIntegration
from .integrations.schemas import (
    IntegrationInterface,
    Oauth,
    ServiceType,
    SlackIntegrationType,
)
from .organizations.schemas import (
    Query as OrganizationQuery,
    Mutation as OrganizationMutation,
)
from .users.schemas import SessionInfoQuery, Signin
from .utils import signin_required


class Mutation(OrganizationMutation, graphene.ObjectType):
    signin = Signin.Field()
    oauth = graphene.Field(Oauth, default_value={})


class Query(OrganizationQuery, graphene.ObjectType):
    node = graphene.relay.Node.Field()

    session_info = graphene.Field(SessionInfoQuery, default_value={})

    services = graphene.List(graphene.NonNull(ServiceType), required=True)

    @staticmethod
    @signin_required
    def resolve_services(parent, info, **kwargs):
        return Service.objects.all()

    integrations = graphene.List(graphene.NonNull(IntegrationInterface), required=True)

    @staticmethod
    @signin_required
    def resolve_integrations(parent, info, **kwargs):
        organization = info.context.user.profile.organization
        slack_integrations = SlackIntegration.objects.filter(organization=organization)
        return slack_integrations


schema = graphene.Schema(query=Query, mutation=Mutation, types=[SlackIntegrationType])
