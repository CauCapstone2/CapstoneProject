from django.db import models
from artifacts import models as artifactModel
from django.conf import settings


class Evaluation(models.Model):
    userID = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artifactID = models.ForeignKey(
        artifactModel.Artifact, on_delete=models.CASCADE, null=True, blank=True)
    Creative = models.IntegerField()
    Expressive = models.IntegerField()
    Quality = models.IntegerField()
    Popularity = models.IntegerField()
    Workability = models.IntegerField()

    class Meta:
        unique_together = (("userID", "artifactID"),)
