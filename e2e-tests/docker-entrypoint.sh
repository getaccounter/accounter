#!/bin/sh
set -eu

./wait-for-it.sh -s $LOADBALANCER_HOST:$LOADBALANCER_PORT -t 300 -- echo "App is ready"

exec "$@"