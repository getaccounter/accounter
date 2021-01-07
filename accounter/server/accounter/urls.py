from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.views.decorators.csrf import ensure_csrf_cookie
from graphene_django.views import GraphQLView


@ensure_csrf_cookie
def get_csrf_cookie(request):
    return HttpResponse()


urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", GraphQLView.as_view(graphiql=settings.DEBUG)),
    path("get_csrf_cookie", get_csrf_cookie),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
