#!/bin/sh

# I dont know why, but this has to be done for CRA to work
chmod -R 0777 node_modules/

exec "$@"
