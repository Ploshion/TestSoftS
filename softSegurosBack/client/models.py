# Este es un modelo de Django para un cliente con campos para su nombre, correo electrónico, número de
# identificación, fecha de nacimiento y fecha de creación.
from django.db import models

# Create your models here.
class client(models.Model):
    id = models.AutoField(primary_key=True )
    fullName = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    numeroId = models.IntegerField()
    fechaNacimiento = models.DateTimeField()
    fechaCreacion = models.DateTimeField()

    def __str__(self):
        return self.fullName