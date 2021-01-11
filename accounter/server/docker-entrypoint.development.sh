#!/bin/sh

./docker-entrypoint.sh

./manage.py graphql_schema --out schema.graphql --watch &

exec "$@"