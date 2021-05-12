# Generated by Django 3.1.3 on 2020-11-27 19:00

import os.path

from django.core.files import File
from django.db import migrations

current_path = os.path.abspath(os.path.dirname(__file__))


def add_services(apps, schema_editor):
    Service = apps.get_model("integrations", "Service")
    services_to_add = [
        (
            "Aircall",
            "./0046_add_more_services_aircall_small.png",
            "./0046_add_more_services_aircall_large.png",
        ),
        (
            "Asana",
            "./0046_add_more_services_asana_small.svg",
            "./0046_add_more_services_asana_large.svg",
        ),
        (
            "AWS",
            "./0046_add_more_services_aws_small.png",
            "./0046_add_more_services_aws_large.png",
        ),
        (
            "BambooHR",
            "./0046_add_more_services_bamboohr_small.png",
            "./0046_add_more_services_bamboohr_large.png",
        ),
        (
            "Zendesk",
            "./0046_add_more_services_zendesk_small.svg",
            "./0046_add_more_services_zendesk_large.svg",
        ),
    ]

    for serviceName, img_path_small, img_path_large in services_to_add:
        service = Service.objects.create(name=serviceName)
        with open(os.path.join(current_path, img_path_small), "rb") as logo:
            _, file_extension = os.path.splitext(img_path_small)
            service.logo.save(f"{serviceName}{file_extension}", File(logo), save=True)

        with open(os.path.join(current_path, img_path_large), "rb") as logo_large:
            _, file_extension = os.path.splitext(img_path_large)
            service.logo_large.save(
                f"{serviceName}_large{file_extension}", File(logo_large), save=True
            )

        service.save()


class Migration(migrations.Migration):

    dependencies = [
        ("integrations", "0045_add_more_services"),
    ]

    operations = [
        migrations.RunPython(add_services),
    ]
