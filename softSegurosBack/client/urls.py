# Este código está configurando el enrutamiento de URL para una API REST Framework de Django. Importa
# los módulos necesarios como `path` e `include` de `django.urls`, `include_docs_urls` de
# `rest_framework.documentation` y `routers` de `rest_framework`. También importa el módulo `views`
# desde la aplicación `cliente`.
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from client import views

router = routers.DefaultRouter()
router.register(r'client', views.clientView, 'client')

# api versioning
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Clientes Api"))
]