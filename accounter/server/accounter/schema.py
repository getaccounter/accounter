import graphene

from .integrations.models import Service
from .integrations.schemas import IntegrationNode, Oauth, ServiceNode
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

    integrations = graphene.List(graphene.NonNull(IntegrationNode), required=True)

    @staticmethod
    @admin_required
    def resolve_integrations(parent, info, **kwargs):
        organization = info.context.user.profile.organization
        integrations = organization.integrations.all()

        for integration in integrations:
            integration.refresh_accounts()

        return integrations


schema = graphene.Schema(query=Query, mutation=Mutation)
