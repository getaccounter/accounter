# Generated by Django 3.1.6 on 2021-02-14 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('integrations', '0032_add_google_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='integration',
            name='refresh_token',
            field=models.TextField(blank=True, null=True),
        ),
    ]
