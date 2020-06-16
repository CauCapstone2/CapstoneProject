from django.db import models
from django.conf import settings
from artifacts import models as artifactModel

class PurchaseHistory(models.Model) :
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchase')
    imageID = models.ForeignKey(artifactModel.ArtifactImage, on_delete=models.CASCADE)

    class meta:
        unique_together = (('userID', 'imageID'),)