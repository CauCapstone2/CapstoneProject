from django.db import models
from django.conf import settings
from artifacts.models import Artifact

# class Recreation(models.Model) :
#     userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
#     title = models.CharField(max_length=50)
#     description = models.CharField(max_length=500)
#     artifactID = models.ForeignKey(artifactModel.Artifact, on_delete = models.CASCADE)

# class RecreationImage(models.Model) :
#     recreationID = models.ForeignKey(Recreation, on_delete = models.CASCADE)
#     image = models.ImageField(upload_to='recreation/')

#     def __str__(self) :
#         return str(self.recreationID)


class ArtifactRecreation(models.Model):
    artifactId = models.ForeignKey(
        Artifact, on_delete=models.CASCADE)
    recreationId = models.ForeignKey(
        Artifact, on_delete=models.CASCADE, primary_key=True, related_name='artifact_recreate')

    def __str__(self):
        return str(self.recreationId)
