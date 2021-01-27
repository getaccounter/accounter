# Generated by Django 3.1.5 on 2021-01-25 14:30

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0011_auto_20210124_1911"),
    ]

    operations = [
        migrations.AddField(
            model_name="slackintegration",
            name="last_refresh",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
