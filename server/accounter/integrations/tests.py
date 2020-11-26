import json

from graphene_django.utils.testing import GraphQLTestCase

from .models import Service


class ServiceTestCase(GraphQLTestCase):
    def test_some_query(self):
        name = "my-service"
        logo = "/path/to/some/logo.svg"
        Service.objects.create(name=name, logo=logo).save()
        response = self.query(
            """
            {
                services {
                    id
                    name
                    logo
                }
            }
            """,
        )

        services = json.loads(response.content)["data"]["services"]
        assert len(services) == 1
        assert services[0]["name"] == name
        assert services[0]["logo"] == logo
        self.assertResponseNoErrors(response)
