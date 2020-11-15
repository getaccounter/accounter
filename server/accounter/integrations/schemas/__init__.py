import graphene

from .slack import SlackType


class Integrations(graphene.ObjectType):
    slack = graphene.Field(SlackType, default_value={})
