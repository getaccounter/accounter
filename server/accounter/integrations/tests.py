import json

from graphene_django.utils.testing import GraphQLTestCase

from .models import Service


class ServiceTestCase(GraphQLTestCase):
    def test_some_query(self):
        service = Service.objects.create(
            name="my-service", logo="/path/to/some/logo.svg"
        )
        service.save()
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
        content = json.loads(response.content)
        print(content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
