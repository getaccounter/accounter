# Generated by Django 3.1.5 on 2021-01-18 17:11
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0007_auto_20210110_1810"),
    ]

    operations = [
        migrations.AlterField(
            model_name="slackintegration",
            name="token",
            field=models.TextField(),
        ),
    ]