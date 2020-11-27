from django.db import models

from ..organizations.models import Organization, Profile


class Service(models.Model):
    class Types(models.TextChoices):
        SLACK = "SLACK", "Slack"

    name = models.CharField("Type", max_length=50, choices=Types.choices, unique=True)
    logo = models.FileField(upload_to="services/logos")


# Abstract Classes
class Integration(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)

    class Meta:
        abstract = True


class Account(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.RESTRICT)

    class Meta:
        abstract = True


# Slack
class SlackIntegration(Integration):
    pass


class SlackAccount(Account):
    integration = models.ForeignKey(SlackIntegration, on_delete=models.RESTRICT)
    pass
