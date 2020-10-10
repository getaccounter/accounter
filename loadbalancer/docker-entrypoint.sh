#!/bin/sh
set -eu

envsubst '${PORT} ${WEB_HOST} ${WEB_PORT} ${SERVER_HOST} ${SERVER_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"