#!/bin/sh

./dev-setup.sh

./wait-for-it.sh -s $SERVER_HOST:$SERVER_PORT -- echo "Server accepts connections"

exec "$@"