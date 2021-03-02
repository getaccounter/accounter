# Generated by Django 3.1.6 on 2021-02-03 19:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0023_auto_20210203_1735"),
    ]

    operations = [
        migrations.AddField(
            model_name="integration",
            name="service",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.RESTRICT,
                to="integrations.service",
            ),
        ),
    ]