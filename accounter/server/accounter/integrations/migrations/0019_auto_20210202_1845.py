# Generated by Django 3.1.6 on 2021-02-02 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0018_remove_service_state_store"),
    ]

    operations = [
        migrations.AlterField(
            model_name="slackintegration",
            name="token",
            field=models.TextField(),
        ),
    ]