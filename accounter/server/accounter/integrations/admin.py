from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        # Services should only be added in data migration, not in django admin
        return False
