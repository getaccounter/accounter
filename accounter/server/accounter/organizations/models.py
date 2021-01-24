from django.conf import settings
from django.db import models
from typing import Type
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.exceptions import PermissionDenied


token_generator = PasswordResetTokenGenerator()


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
    is_offboarded = models.BooleanField(default=False)

    def can_be_edited_by(self, editor: Type["Profile"]):
        if self.pk == editor.pk:
            # user can always edit themselves
            return True

        if self.is_owner and self.pk != editor.pk:
            # nobody can edit owners but themselves
            return False

        if self.is_admin and not editor.is_owner:
            # admins can only be edited by owners
            return False

        return True

    def send_invite_email(self, inviter: Type["Profile"]):
        token = token_generator.make_token(self.user)
        organization_name = self.organization.name
        subject = f"{inviter.user.first_name} invited you to join {organization_name} on accounter.io"
        html_message = render_to_string(
            "admin_email.html",
            {
                "invitee_first_name": self.user.first_name,
                "inviter_first_name": inviter.user.first_name,
                "organization_name": organization_name,
                "registration_link": settings.BASE_URL
                + f"/reset-password?username={self.user.username}&token={token}",
            },
        )
        plain_message = strip_tags(html_message)
        from_email = "accounter.io <noreply@accounter.io>"
        to = self.user.email

        send_mail(subject, plain_message, from_email, [to], html_message=html_message)

    def reset_password(self, token: str, password: str):
        is_token_valid = token_generator.check_token(self.user, token)
        if not is_token_valid:
            raise PermissionDenied("Token is not valid")

        if not self.user.is_active:
            raise PermissionDenied("User is not active")

        self.user.set_password(password)
        self.user.save()
        self.save()

    def setupLogin(self, granted_by):
        self.user.is_active = True
        self.user.save()
        self.send_invite_email(granted_by)

    def removeLogin(self):
        self.user.is_active = False
        self.user.set_unusable_password()
        self.user.save()

    def offboard(self):
        self.is_offboarded = True
        self.is_admin = False
        self.is_owner = False
        self.save()

    def reactivate(self):
        self.is_offboarded = False
        self.save()

    def promote_to_admin(self, promoted_by: Type["Profile"]):
        if not promoted_by.is_owner:
            raise PermissionDenied("You do not have permission to perform this action")
        if self.is_admin:
            raise ValueError("User is already admin")

        self.is_admin = True

        self.setupLogin(promoted_by)

        self.user.save()
        self.save()

    def demote_to_regular_user(self, demoted_by: Type["Profile"]):
        if not demoted_by.is_owner:
            raise PermissionDenied("You do not have permission to perform this action")
        if not self.is_admin:
            raise ValueError("User is already regular user")
        if self.is_owner:
            raise ValueError("Cannot demote owner")
        self.is_admin = False
        self.removeLogin()
        self.save()

    def save(self, *args, **kwargs):
        if self.is_owner:
            # owners are always admins
            self.is_admin = True

        super(Profile, self).save(*args, **kwargs)
