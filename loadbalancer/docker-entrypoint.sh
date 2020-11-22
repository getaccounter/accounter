#!/bin/sh
set -eu

envsubst '${PORT} ${PROTOCOL} ${WEB_HOST} ${WEB_PORT} ${SERVER_HOST} ${SERVER_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

./wait-for-it.sh -s $SERVER_HOST:$SERVER_PORT -- echo "Server accepts connections"
./wait-for-it.sh -s $WEB_HOST:$WEB_PORT -t 30 -- echo "Web accepts connections"

exec "$@"