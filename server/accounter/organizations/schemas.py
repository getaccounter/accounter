import graphene
from django.contrib.auth import get_user_model
from django.db import transaction
from graphene_django import DjangoObjectType

from .models import Admin, Organization


class Signup(graphene.Mutation):
    class Arguments:
        org_name = graphene.String()
        email = graphene.String()
        password = graphene.String()

    status = graphene.String()

    @transaction.atomic
    def mutate(self, info, org_name: str, email: str, password: str):
        User = get_user_model()
        org = Organization.objects.create(name=org_name)
        org.save()
        user = User.objects.create(username=email, email=email)
        user.set_password(password)
        user.save()
        admin = Admin.objects.create(user=user, organization=org)
        admin.save()

        return Signup(status="success")


class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("name",)
