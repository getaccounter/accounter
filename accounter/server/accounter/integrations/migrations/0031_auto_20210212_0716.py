# Generated by Django 3.1.6 on 2021-02-12 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0030_integration_has_valid_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="service",
            name="name",
            field=models.CharField(
                choices=[("SLACK", "Slack"), ("Google", "Google")],
                max_length=50,
                unique=True,
                verbose_name="Type",
            ),
        ),
    ]
