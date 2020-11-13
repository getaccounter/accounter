from django.conf import settings
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    # TODO need to figure out a way how to do this without `csrf_exempt`
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=settings.DEBUG))),
]
