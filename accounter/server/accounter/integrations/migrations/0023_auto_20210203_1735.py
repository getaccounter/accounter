# Generated by Django 3.1.6 on 2021-02-03 17:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0007_auto_20210202_2220"),
        ("integrations", "0022_auto_20210203_1053"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="SlackIntegration",
            new_name="Integration",
        ),
    ]