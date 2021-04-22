# Generated by Django 3.1.3 on 2020-11-27 19:00

import os.path

from django.core.files import File
from django.db import migrations

current_path = os.path.abspath(os.path.dirname(__file__))


def add_large_logos(apps, schema_editor):
    Service = apps.get_model("integrations", "Service")
    service_logo_pairs = [
        (
            Service.objects.get(name="SLACK"),
            "./0041_add_large_logos_slack.svg",
            "slack.svg",
        ),
        (
            Service.objects.get(name="Google"),
            "./0041_add_large_logos_google.png",
            "google.png",
        ),
        (
            Service.objects.get(name="Zoom"),
            "./0041_add_large_logos_zoom.svg",
            "zoom.svg",
        ),
        (
            Service.objects.get(name="GitHub"),
            "./0041_add_large_logos_github.png",
            "github.png",
        ),
    ]

    for service, img_path, fileName in service_logo_pairs:
        with open(os.path.join(current_path, img_path), "rb") as logo:
            service.logo_large.save(fileName, File(logo), save=True)
        service.save()


class Migration(migrations.Migration):

    dependencies = [("integrations", "0040_service_logo_large")]

    operations = [migrations.RunPython(add_large_logos)]
