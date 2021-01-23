import graphene
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

User = get_user_model()


class Signin(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    status = graphene.String(required=True)
    message = graphene.String(required=True)

    def mutate(self, info, email: str, password: str):
        user = authenticate(request=info.context, username=email, password=password)
        if not user:
            raise PermissionDenied("Please enter valid credentials.")
        elif user.is_staff or user.is_superuser:
            raise PermissionDenied("Access denied.")
        if user.profile.is_offboarded:
            raise PermissionDenied("User was offboarded.")
        else:
            login(info.context, user)
            return Signin(status="success", message="Successfully signed in.")


class ResetPassword(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        token = graphene.String(required=True)
        password = graphene.String(required=True)

    status = graphene.String(required=True)
    message = graphene.String(required=True)

    def mutate(self, info, username: str, token: str, password: str):
        user = User.objects.get(username=username)
        try:
            user.profile.reset_password(token, password)
        except PermissionDenied as e:
            if str(e) == "User is not active":
                raise PermissionDenied(
                    "You do not have permission to perform this action"
                )
            else:
                raise PermissionDenied("Link is expired")

        return Signin(status="success", message="Successfully signed in.")


class Signout(graphene.Mutation):
    status = graphene.String(required=True)
    message = graphene.String(required=True)

    def mutate(self, info):
        logout(info.context)
        return Signin(status="success", message="Successfully signed out.")


class SessionInfoQuery(graphene.ObjectType):
    signed_in = graphene.Boolean(required=True)

    @staticmethod
    def resolve_signed_in(parent, info, **kwargs):
        return info.context.user.is_authenticated


class Query(graphene.ObjectType):
    session_info = graphene.Field(SessionInfoQuery, default_value={})


class Mutation(graphene.ObjectType):
    signin = Signin.Field()
    signout = Signout.Field()
    reset_password = ResetPassword.Field()
