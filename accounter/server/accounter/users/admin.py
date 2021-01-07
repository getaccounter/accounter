from django.contrib import admin
from django.contrib.auth.models import Group

# groups are not needed for the moment
admin.site.unregister(Group)
