from django.db import models
from django.conf import settings
from artifacts import models as artifactModel

class Recreation(models.Model) :
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    artifactID = models.ForeignKey(artifactModel.Artifact, on_delete = models.CASCADE)

class RecreationImage(models.Model) :
    recreationID = models.ForeignKey(Recreation, on_delete = models.CASCADE)
    image = models.ImageField(upload_to='recreation/')

    def __str__(self) :
        return str(self.recreationID)