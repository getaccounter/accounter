#!/bin/sh

./docker-entrypoint.sh

./manage.py graphql_schema --out shared-graphql/schema.graphql --watch &

exec "$@"
