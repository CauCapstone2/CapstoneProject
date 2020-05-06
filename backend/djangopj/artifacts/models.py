from django.db import models
from django.conf import settings

class Artifact(models.Model):
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    title = models.CharField(max_length = 50)
    image = models.ImageField(upload_to = 'image/')
    description = models.CharField(max_length = 500)

    def __str__(self):
        return self.title