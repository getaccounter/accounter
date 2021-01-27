#!/bin/sh

# Temporary, until heroicons library is stable and transpiled
# The copying is already done in the dockerfile, but here we do it again
# since the folder will be overwritten with volumes
echo "Copying icons from node_modules to components"
cp -R node_modules/heroicons/react/ src/components/icons

exec "$@"
