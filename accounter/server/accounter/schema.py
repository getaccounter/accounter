import graphene

from .integrations.models import Service, SlackIntegration
from .integrations.schemas import (
    IntegrationInterface,
    Oauth,
    ServiceNode,
    SlackAccountNode,
    SlackIntegrationNode,
)
from .organizations.schemas import Mutation as OrganizationMutation
from .organizations.schemas import Query as OrganizationQuery
from .users.schemas import Mutation as UserMutation
from .users.schemas import Query as UserQuery
from .utils import admin_required


class Mutation(UserMutation, OrganizationMutation, graphene.ObjectType):
    oauth = graphene.Field(Oauth, default_value={})


class Query(UserQuery, OrganizationQuery, graphene.ObjectType):
    node = graphene.relay.Node.Field()

    services = graphene.List(graphene.NonNull(ServiceNode), required=True)

    @staticmethod
    @admin_required
    def resolve_services(parent, info, **kwargs):
        return Service.objects.all()

    integrations = graphene.List(graphene.NonNull(IntegrationInterface), required=True)

    @staticmethod
    @admin_required
    def resolve_integrations(parent, info, **kwargs):
        organization = info.context.user.profile.organization
        integrations = SlackIntegration.objects.filter(organization=organization)

        for integration in integrations:
            integration.refresh()

        return integrations


schema = graphene.Schema(
    query=Query, mutation=Mutation, types=[SlackIntegrationNode, SlackAccountNode]
)
