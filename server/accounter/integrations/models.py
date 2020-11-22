from django.conf import settings
from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=16)
    logo = models.FileField(upload_to="services/logos")


class Integration(models.Model):
    # Add timestamps
    service = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
