# Generated by Django 3.1.5 on 2021-01-23 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0004_profile_is_owner"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="is_active",
        ),
        migrations.AddField(
            model_name="profile",
            name="is_offboarded",
            field=models.BooleanField(default=False),
        ),
    ]
