from django.db import models

TODO_INTEGRATIONS_GENERATE_FROM_SOMETHING_ELSE = [("slack", "Slack")]


class Integration(models.Model):
    service = models.CharField(
        max_length=8,
        choices=TODO_INTEGRATIONS_GENERATE_FROM_SOMETHING_ELSE,
    )


class SlackIntegration(Integration):
    pass
