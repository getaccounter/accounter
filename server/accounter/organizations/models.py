from django.conf import settings
from django.db import models

from ..integrations.models import Integration


class Organization(models.Model):
    name = models.CharField(max_length=100)
    integrations = models.ManyToManyField(Integration)


class Admin(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)


class Profile(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)


class Account(models.Model):
    integration = models.ForeignKey(Integration, on_delete=models.RESTRICT)
    profile = models.ForeignKey(Profile, on_delete=models.RESTRICT)
