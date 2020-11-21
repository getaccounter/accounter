import graphene
import graphql_jwt

from .integrations.schemas import Integrations
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
    placeholder = graphene.String(default_value="Placeholder")


schema = graphene.Schema(query=Query, mutation=Mutation)
