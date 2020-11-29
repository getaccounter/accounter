import graphene
from graphql_jwt.decorators import login_required

from ..models import Service, SlackIntegration


class HandleCallback(graphene.Mutation):
    class Arguments:
        code = graphene.String()
        state = graphene.String()

    status = graphene.String()

    @login_required
    def mutate(self, info, code: str, state: str):
        organization = info.context.user.admin.organization
        slack_service = Service.objects.get(name=Service.Types.SLACK)
        token = slack_service.handle_callback(code, state)
        slack_integration = SlackIntegration.objects.create(
            organization=organization, token=token
        )
        slack_integration.save()
        return HandleCallback(status="success")


class SlackType(graphene.ObjectType):
    handleCallback = HandleCallback.Field()
