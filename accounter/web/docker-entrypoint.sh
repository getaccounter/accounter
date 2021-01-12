#!/bin/sh

./dev-setup.sh

./wait-for-it.sh -s $SERVER_HOST:$SERVER_PORT -t 60 -- echo "Server accepts connections"

exec "$@"