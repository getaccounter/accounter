from django.contrib.auth import get_user_model
from graphql_jwt.testcases import JSONWebTokenTestCase

from .models import Service


class ServiceTestCase(JSONWebTokenTestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(username="test")

    def test_services_query(self):
        self.client.authenticate(self.user)
        logo = "/path/to/some/logo.svg"
        Service.objects.create(name=Service.Types.SLACK, logo=logo).save()
        response = self.client.execute(
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
        assert response.errors is None
        services = response.data["services"]
        assert len(services) == 1
        assert services[0]["name"] == Service.Types.SLACK
        assert services[0]["logo"] == logo

    def test_services_query_requires_authenticated_users(self):
        response = self.client.execute(
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
        assert response.data["services"] is None
        assert (
            response.errors[0].message
            == "You do not have permission to perform this action"
        )
