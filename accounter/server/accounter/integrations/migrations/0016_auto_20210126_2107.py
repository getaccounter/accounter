# Generated by Django 3.1.5 on 2021-01-26 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('integrations', '0015_slackintegration_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slackintegration',
            name='last_refresh',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
