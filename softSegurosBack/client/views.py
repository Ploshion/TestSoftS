# Esta es una clase de conjunto de vistas para el modelo de "cliente" que requiere autenticación y usa
# un serializador para manejar datos.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializer import CLientSerializer
from .models import client

# Create your views here.
class clientView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CLientSerializer
    queryset = client.objects.all()

