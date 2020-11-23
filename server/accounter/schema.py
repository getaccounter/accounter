import graphene
import graphql_jwt

from .integrations.models import Service
from .integrations.schemas import Integrations, ServiceType
from .users.schemas import UserType


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Mutation(graphene.ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    integrations = graphene.Field(Integrations, default_value={})


class Query(graphene.ObjectType):
    services = graphene.List(ServiceType)

    @classmethod
    def resolve_services(cls, root, info, **kwargs):
        # TODO require login
        return Service.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)
