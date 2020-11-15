# Generated by Django 3.1.3 on 2020-11-15 17:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SlackIntegration",
            fields=[
                (
                    "integration_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="integrations.integration",
                    ),
                ),
            ],
            bases=("integrations.integration",),
        ),
        migrations.AlterField(
            model_name="integration",
            name="service",
            field=models.CharField(choices=[("slack", "Slack")], max_length=8),
        ),
    ]
