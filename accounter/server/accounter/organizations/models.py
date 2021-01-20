from django.conf import settings
from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=100)


class Department(models.Model):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(
        Organization, related_name="departments", on_delete=models.RESTRICT
    )


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    organization = models.ForeignKey(
        Organization, related_name="profiles", on_delete=models.RESTRICT
    )
    title = models.CharField(max_length=100, blank=True, null=True)
    department = models.ForeignKey(
        Department,
        related_name="profiles",
        on_delete=models.RESTRICT,
        blank=True,
        null=True,
    )
    is_admin = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.is_owner:
            # owners are always admins
            self.is_admin = True
        super(Profile, self).save(*args, **kwargs)
