"""
Django settings for accounter project.

Generated by 'django-admin startproject' using Django 3.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured


def get_env_value(env_variable):
    """
    Getting environment variables
    """
    try:
        return os.environ[env_variable]
    except KeyError as key_error:
        error_msg = "Set the {} environment variable".format(env_variable)
        raise ImproperlyConfigured(error_msg) from key_error


def get_bool_env_value(env_variable):
    valid_boolean_values = ["True", "False"]
    string_value = get_env_value(env_variable)
    if string_value not in valid_boolean_values:
        error_msg = "The {} environment variable must be in [{}]".format(
            env_variable, ", ".join(valid_boolean_values)
        )
        raise ImproperlyConfigured(error_msg)
    return string_value == "True"


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "-7k-e#5^w@00zsxi$0+i!n$&4w#m-i@x4+i@(lp$e1q3m#0p$-"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_bool_env_value("DEBUG")

ALLOWED_HOSTS = [
    "localhost",
    "server",  # docker-compose setup
    "server.production",  # docker-compose setup
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.postgres",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "graphene_django",
    "accounter.organizations",
    "accounter.integrations",
    "accounter.users",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "accounter.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": get_env_value("POSTGRES_DB"),
        "USER": get_env_value("POSTGRES_USER"),
        "PASSWORD": get_env_value("POSTGRES_PASSWORD"),
        "HOST": get_env_value("POSTGRES_URL"),
        "PORT": get_env_value("POSTGRES_PORT"),
        "OPTIONS": {"sslmode": "prefer"},
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = "/static/"

GRAPHENE = {
    "SCHEMA": "accounter.schema.schema",
}

INTEGRATIONS = {
    "SLACK": {
        "CLIENT_ID": get_env_value("SLACK_CLIENT_ID"),
        "CLIENT_SECRET": get_env_value("SLACK_CLIENT_SECRET"),
    }
}

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

AWS_ACCESS_KEY_ID = get_env_value("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = get_env_value("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = get_env_value("AWS_STORAGE_BUCKET_NAME")
AWS_S3_ENDPOINT_URL = get_env_value("AWS_S3_ENDPOINT_URL")
AWS_LOCATIAWS_DEFAULT_REGIONON = get_env_value("AWS_DEFAULT_REGION")