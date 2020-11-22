import graphene
from graphene_django import DjangoObjectType

from ..models import Service
from .slack import SlackType


class Integrations(graphene.ObjectType):
    slack = graphene.Field(SlackType, default_value={})


class ServiceType(DjangoObjectType):
    class Meta:
        model = Service
