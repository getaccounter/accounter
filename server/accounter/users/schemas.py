import graphene
from django.contrib.auth import authenticate, login
from django.core.exceptions import PermissionDenied


class Signin(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    status = graphene.String()
    message = graphene.String()

    def mutate(self, info, email: str, password: str):
        user = authenticate(request=info.context, username=email, password=password)
        if not user:
            raise PermissionDenied("Please enter valid credentials.")
        elif user.is_staff or user.is_superuser:
            raise PermissionDenied("Access denied.")
        else:
            login(info.context, user)
            return Signin(status="success", message="Successfully signed in.")


class SessionInfoQuery(graphene.ObjectType):
    signed_in = graphene.Boolean()

    @staticmethod
    def resolve_signed_in(parent, info, **kwargs):
        return info.context.user.is_authenticated
