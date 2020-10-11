#!/bin/sh

./wait-for-it.sh -s $SERVER_URL:$SERVER_PORT -- echo "Server accepts connections"

exec "$@"