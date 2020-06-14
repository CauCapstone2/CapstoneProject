from django.db import models
from django.conf import settings
from artifacts.models import Artifact


class ArtifactRecreation(models.Model):
    artifactId = models.ForeignKey(
        Artifact, on_delete=models.CASCADE)
    recreationId = models.ForeignKey(
        Artifact, on_delete=models.CASCADE, primary_key=True, related_name='artifact_recreate')

    def __str__(self):
        return str(self.recreationId)
