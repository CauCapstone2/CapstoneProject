from django.db import models
from artifacts import models as artifactModel
from django.conf import settings


class Report(models.Model):
    userID = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artifactID = models.ForeignKey(
        artifactModel.Artifact, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = (("userID", "artifactID"),)
