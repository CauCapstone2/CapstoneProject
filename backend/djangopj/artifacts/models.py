from django.db import models
from django.conf import settings
from jsonfield import JSONField



class Artifact(models.Model):
    userID = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='artifact')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.title


class ArtifactImage(models.Model):
    artifactId = models.ForeignKey(
        Artifact, on_delete=models.CASCADE, related_name='artifact_image')
    image = models.ImageField(upload_to='image/')
    predict = models.IntegerField(default=-1)
    tendency = JSONField(null=True)

    def __str__(self):
        return str(self.artifactId)
