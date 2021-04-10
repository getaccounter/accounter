from __future__ import annotations

from typing import Type

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import PermissionDenied
from django.core.mail import send_mail
from django.db import models
from django.template.loader import render_to_string
from django.utils.html import strip_tags

token_generator = PasswordResetTokenGenerator()
User = get_user_model()


class Organization(models.Model):
    name = models.CharField(max_length=100)

    def create_profile(
        self, email: str, first_name: str, last_name: str, title: str = None
    ):

        user = User.objects.create(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_active=False,
        )
        user.save()
        profile = Profile.objects.create(user=user, organization=self, title=title)
        profile.save()

        return profile


class Lead(models.Model):
    class Roles(models.TextChoices):
        it_manager = "it_manager", "IT Manager"
        hr = "hr", "Human Resources"

    class Sizes(models.TextChoices):
        gt1 = "1-20", "1 - 20 employees"
        gt20 = "21-50", "21 - 50 employees"
        gt50 = "51-100", "51 - 100 employees"
        gt100 = "101-200", "101 - 200 employees"
        gt200 = ">200", "> 200 employees"

    organization_size = models.CharField(
        max_length=50, choices=Sizes.choices, blank=True, null=True
    )

    role = models.CharField(max_length=50, choices=Roles.choices, blank=True, null=True)

    first_name = models.CharField(max_length=150, blank=True, null=True)

    last_name = models.CharField(max_length=150, blank=True, null=True)

    email = models.EmailField()


class Profile(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    organization = models.ForeignKey(
        Organization, related_name="profiles", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100, blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)

    def merge_with(self, profile_to_merge_with: Type["Profile"]):
        for account in self.accounts.all():
            account.profile = profile_to_merge_with
            account.save()

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

    def setup_login(self, granted_by):
        self.user.is_active = True
        self.user.save()
        self.send_invite_email(granted_by)

    def remove_login(self):
        self.user.is_active = False
        self.user.set_unusable_password()
        self.user.save()

    def promote_to_admin(self, promoted_by: Type["Profile"]):
        if not promoted_by.is_owner:
            raise PermissionDenied("You do not have permission to perform this action")
        if self.is_admin:
            raise ValueError("User is already admin")

        self.is_admin = True

        self.setup_login(promoted_by)

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
        self.remove_login()
        self.save()

    def save(self, *args, **kwargs):
        if self.is_owner:
            # owners are always admins
            self.is_admin = True

        super(Profile, self).save(*args, **kwargs)
