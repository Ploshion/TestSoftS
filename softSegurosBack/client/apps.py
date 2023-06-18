# La clase `ClientConfig` es una clase de configuración de la aplicación Django que establece el campo
# automático predeterminado en `BigAutoField` y especifica el nombre de la aplicación como `cliente`.
from django.apps import AppConfig


class ClientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'client'
