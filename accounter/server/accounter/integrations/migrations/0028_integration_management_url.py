# Generated by Django 3.1.6 on 2021-02-07 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('integrations', '0027_account_external_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='integration',
            name='management_url',
            field=models.URLField(default='https://app.accounter.io'),
            preserve_default=False,
        ),
    ]
