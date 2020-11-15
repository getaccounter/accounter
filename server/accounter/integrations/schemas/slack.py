import graphene

from ..utils.oauth import slack


class StartOAuth(graphene.Mutation):
    class Arguments:
        pass

    url = graphene.String()

    @classmethod
    def mutate(cls, root, info):
        url = slack.get_url()
        return cls(url=url)


class HandleCallback(graphene.Mutation):
    class Arguments:
        code = graphene.String()
        state = graphene.String()

    status = graphene.String()

    @classmethod
    def mutate(cls, root, info, code: str, state: str):
        slack.handle_callback(code, state)
        return HandleCallback(status="success")


class SlackType(graphene.ObjectType):
    startOAuth = StartOAuth.Field()
    handleCallback = HandleCallback.Field()
