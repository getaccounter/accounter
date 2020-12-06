import graphene

from .integrations.models import Service
from .integrations.schemas import Integrations, ServiceType
from .organizations.schemas import Signup
from .users.schemas import SessionInfoQuery, Signin
from .utils import signin_required


class Mutation(graphene.ObjectType):
    signin = Signin.Field()
    integrations = graphene.Field(Integrations, default_value={})
    signup = Signup.Field()


class Query(graphene.ObjectType):
    services = graphene.List(ServiceType)
    session_info = graphene.Field(SessionInfoQuery, default_value={})

    @signin_required
    def resolve_services(root, info, **kwargs):
        if info.context.user.is_authenticated:
            return Service.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)
