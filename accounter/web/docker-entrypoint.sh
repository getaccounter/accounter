#!/bin/sh

./dev-setup.sh

./wait-for-it.sh -s $SERVER_HOST:$SERVER_PORT -t 60 -- echo "Server accepts connections"

# Changing of file is needed until this is fixed https://github.com/graphql-python/graphene/issues/1263
sed -i 's/Node\, AccountInterface/Node \& AccountInterface/g' ./shared-graphql/schema.graphql

exec "$@"
