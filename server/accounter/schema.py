import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required

from .integrations.models import Service
from .integrations.schemas import Integrations, ServiceType
from .organizations.schemas import Signup


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    integrations = graphene.Field(Integrations, default_value={})
    signup = Signup.Field()


class Query(graphene.ObjectType):
    services = graphene.List(ServiceType)

    @classmethod
    @login_required
    def resolve_services(cls, root, info, **kwargs):
        return Service.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)
