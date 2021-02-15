# Generated by Django 3.1.3 on 2020-11-27 19:00

import os.path

from django.core.files import File
from django.db import migrations

current_path = os.path.abspath(os.path.dirname(__file__))


def add_services(apps, schema_editor):
    Service = apps.get_model("integrations", "Service")
    service = Service.objects.create(name="Zoom")
    with open(
        os.path.join(current_path, "./0035_add_zoom_service_logo.png"), "rb"
    ) as logo:
        service.logo.save("zoom.png", File(logo), save=True)
    service.save()


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0034_auto_20210215_1124"),
    ]

    operations = [
        migrations.RunPython(add_services),
    ]