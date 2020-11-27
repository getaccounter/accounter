from django.conf import settings
from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=100)


class Admin(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)


class Profile(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.RESTRICT)
