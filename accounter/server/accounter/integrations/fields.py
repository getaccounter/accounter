from cryptography.fernet import Fernet
from django.conf import settings
from django.db import models


# SHOULD PROBABLY BE BYTES
class TokenField(models.TextField):
    def pre_save(self, model_instance, add):
        value = super(TokenField, self).pre_save(model_instance, add)
        decrypted_bytestring = value.encode("utf-8")

        encrypted_bytestring = Fernet(settings.ENCRYPTION_KEY).encrypt(
            decrypted_bytestring
        )

        return encrypted_bytestring.decode("utf-8")

    def from_db_value(self, encrypted_string, expression, connection):
        encrypted_bytestring = encrypted_string.encode("utf-8")
        decrypted_bytestring = Fernet(settings.ENCRYPTION_KEY).decrypt(
            encrypted_bytestring
        )
        value = decrypted_bytestring.decode("utf-8")
        return value
