# Generated by Django 3.1.5 on 2021-01-29 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0005_auto_20210123_1150"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="image",
            field=models.URLField(
                default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            ),
        ),
    ]
