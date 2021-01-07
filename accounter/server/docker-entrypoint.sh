#!/bin/sh

./wait-for-it.sh -s $POSTGRES_URL:$POSTGRES_PORT -t 180 -- echo "Database accepts connections"

python manage.py migrate

echo "Create super user if not existing"
cat <<EOF | python manage.py shell
from django.contrib.auth import get_user_model

username = 'admin@getaccounter.io'

User = get_user_model()

User.objects.filter(username=username).exists() or \
    User.objects.create_superuser(username, username, 'password')
EOF

if [ "$USE_MOCK_PROXY" = "True" ]; then
    echo "Adding mockserver certificates"
    cp mockserver.crt /usr/local/share/ca-certificates/mockserver.crt
    update-ca-certificates
else
    echo "Will NOT add mockserver certificates"
fi


exec "$@"