# Generated by Django 3.1.6 on 2021-02-02 22:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0006_profile_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="department",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="departments",
                to="organizations.organization",
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="department",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="profiles",
                to="organizations.department",
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="profiles",
                to="organizations.organization",
            ),
        ),
    ]
