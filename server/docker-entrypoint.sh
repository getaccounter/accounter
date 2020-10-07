#!/bin/sh

python manage.py migrate

echo "Create super user if not existing"
cat <<EOF | python manage.py shell
from django.contrib.auth import get_user_model

User = get_user_model()

User.objects.filter(username='admin').exists() or \
    User.objects.create_superuser('admin', 'admin@example.com', 'pass')
EOF


exec "$@"