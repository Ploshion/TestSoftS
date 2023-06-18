# Esta es una clase de serializador para el modelo de cliente que incluye todos los campos.
from rest_framework import serializers
from .models import client

class CLientSerializer(serializers.ModelSerializer):
    class Meta:
        model = client
        fields = '__all__'     