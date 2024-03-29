# Generated by Django 3.1.6 on 2021-02-03 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0025_auto_20210203_1958"),
    ]

    operations = [
        migrations.RenameField(
            model_name="account",
            old_name="image",
            new_name="image_big",
        ),
        migrations.AddField(
            model_name="account",
            name="image_small",
            field=models.URLField(
                default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            ),
        ),
    ]
