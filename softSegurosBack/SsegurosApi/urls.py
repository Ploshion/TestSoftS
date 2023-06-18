# Este código define los patrones de URL para un proyecto de Django. Importa los módulos y vistas
# necesarios, incluido el módulo de administración, la ruta e incluye funciones del módulo urls, y las
# vistas TokenObtainPairView y TokenRefreshView del módulo rest_framework_simplejwt. Luego configura
# los patrones de URL para el proyecto, incluida la URL de administrador, la URL del cliente y los
# patrones de URL de token para obtener y actualizar tokens JWT.
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('client/', include('client.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
