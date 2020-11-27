from django.db import models

from ..organizations.models import Organization, Profile


class Service(models.Model):
    class Types(models.TextChoices):
        SLACK = "SLACK", "Slack"

    name = models.CharField("Type", max_length=50, choices=Types.choices, unique=True)
    logo = models.FileField(upload_to="services/logos")


# Abstract Classes
class AbstractIntegration(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)

    @property
    def service(self):
        raise NotImplementedError()

    class Meta:
        abstract = True


class AbstractAccount(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.RESTRICT)

    @property
    def integration(self):
        raise NotImplementedError()

    class Meta:
        abstract = True


# Slack
class SlackIntegration(AbstractIntegration):
    @property
    def service(self):
        return Service.objects.get(name=Service.Types.SLACK)


class SlackAccount(AbstractAccount):
    integration = models.ForeignKey(SlackIntegration, on_delete=models.RESTRICT)
