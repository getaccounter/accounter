#!/bin/sh
set -eu

./wait-for-it.sh -s $LOADBALANCER_HOST:$LOADBALANCER_PORT -- echo "App is ready"

exec "$@"