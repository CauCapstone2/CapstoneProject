from django.db import models

class Artifact(models.Model):
    title = models.CharField(max_length = 50)
    image = models.ImageField(upload_to = 'image/')
    description = models.CharField(max_length = 500)

    def __str__(self):
        return self.title