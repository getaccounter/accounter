import graphene
from django.contrib.auth import authenticate, login


class Signin(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    status = graphene.String()
    message = graphene.String()

    def mutate(self, info, email: str, password: str):
        user = authenticate(request=info.context, username=email, password=password)
        if user:
            login(info.context, user)
            return Signin(status="success", message="Successfully signed in.")
        else:
            return Signin(status="error", message="Please enter valid credentials.")


class SessionInfoQuery(graphene.ObjectType):
    signed_in = graphene.Boolean()

    def resolve_signed_in(root, info, **kwargs):
        return info.context.user.is_authenticated
