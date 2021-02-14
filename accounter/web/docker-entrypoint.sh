#!/bin/sh

./dev-setup.sh

./wait-for-it.sh -s $SERVER_HOST:$SERVER_PORT -t 60 -- echo "Server accepts connections"

if [[ -z "${VERSION}"] ]; then
    find /build -type f -exec sed -i "s/VERSION_DO_REPLACE_ME_BEFORE_DEPLOY/$VERSION/g" {} +
fi

exec "$@"
