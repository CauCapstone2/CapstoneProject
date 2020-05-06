from django.db import models
from django.conf import settings
from artifacts import models as artifactModel
from comment import models as commentModel

# Create your models here.

class Mypage(models.Model) :
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    myArtifact = models.ForeignKey(artifactModel.Artifact, on_delete = models.CASCADE)
    myContent = models.ForeignKey(commentModel.Comment, on_delete = models.CASCADE)
