from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-8408gm)!htg5aekxukou&d8jr8g^rig5^0tye6uc2pt_yfuooy'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'coreapi',
    'client'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'SsegurosApi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'SsegurosApi.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# Este bloque de código configura los ajustes de la base de datos para el proyecto Django. Está
# utilizando el motor `djongo` para conectarse a una base de datos MongoDB llamada `softClientes` que
# se ejecuta en `localhost` en el puerto `27017`. El diccionario `CLIENTE` contiene los detalles de
# autenticación para la conexión a la base de datos, incluidos el nombre de usuario, la contraseña y
# el mecanismo de autenticación.
# CONEXION A LOCAL CON CONTENEDER DE MONGODB
# DATABASES = {
#     'default': {
#         'ENGINE': 'djongo',
#         'NAME': 'softClientes', 
#         'CLIENT': {
#             'host': 'mongodb://localhost:27017/',  
#             'username': 'sadmin',  
#             'password': 'Test123..',  
#             'authMechanism': 'SCRAM-SHA-1',
#         },
#     }
# }


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'softtest',
        'USER': 'admindbsofttest',
        'PASSWORD': 'Test123..',
        'HOST': 'db4free.net',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

IMPORT_EXPORT_USE_TRANSACTIONS = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_ALLOW_ALL = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'apidnter.azurewebsites.net', 'softclient.000webhostapp.com']

CORS_ORIGIN_WHITELIST = [
    'https://apidnter.azurewebsites.net', 'http://localhost:8000', 'http://localhost:27017', 'http://localhost:5173' , 'https://softclient.000webhostapp.com'
]

CSRF_TRUSTED_ORIGINS = ['https://apidnter.azurewebsites.net','https://*.127.0.0.1']

#CORS AUTORIZACION
# `CORS_ALLOWED_ORIGINS` es una configuración en Django que permite el uso compartido de recursos
# entre orígenes (CORS) para orígenes específicos. En este caso, permite solicitudes de tres orígenes
# diferentes: `http://localhost:8000`, `http://localhost:27017` y `http://localhost:5173`. Esto es
# útil cuando se desarrollan aplicaciones web que necesitan realizar solicitudes a las API alojadas en
# diferentes dominios.
CORS_ALLOWED_ORIGINS = [ "http://localhost:8000", "http://localhost:27017", "http://localhost:5173", "https://apidnter.azurewebsites.net", "https://softclient.000webhostapp.com"]


# Este código está configurando Django REST Framework para usar la autenticación JSON Web Token (JWT).
# Establece `DEFAULT_AUTHENTICATION_CLASSES` para incluir
# `rest_framework_simplejwt.authentication.JWTAuthentication`, que es una clase que proporciona
# autenticación JWT para REST Framework. Esto significa que cualquier vista o punto final que requiera
# autenticación utilizará tokens JWT para autenticar a los usuarios.
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    
),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}
# `SIMPLE_JWT` es un diccionario que contiene ajustes de configuración para el paquete
# `rest_framework_simplejwt`, que proporciona autenticación JSON Web Token (JWT) para Django REST
# Framework.

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

