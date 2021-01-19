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
from .users.schemas import (
    Query as UserQuery,
    Mutation as UserMutation,
)
from .utils import signin_required


class Mutation(UserMutation, OrganizationMutation, graphene.ObjectType):
    oauth = graphene.Field(Oauth, default_value={})


class Query(UserQuery, OrganizationQuery, graphene.ObjectType):
    node = graphene.relay.Node.Field()

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
