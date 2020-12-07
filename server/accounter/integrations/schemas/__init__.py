import graphene
from graphene_django import DjangoObjectType

from ..models import Service
from .slack import SlackType


class Oauth(graphene.ObjectType):
    slack = graphene.Field(SlackType, default_value={})


class ServiceType(DjangoObjectType):
    oauth_url = graphene.String(source="oauth_url")

    class Meta:
        model = Service
