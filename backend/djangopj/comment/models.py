from django.db import models
from artifacts import models as artifactModel
from recreation import models as recreationModel
from django.conf import settings

class Comment(models.Model):
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    artifactID = models.ForeignKey(artifactModel.Artifact , on_delete = models.CASCADE, blank = True, null = True)
    recreationID = models.ForeignKey(recreationModel.Recreation, on_delete = models.CASCADE, blank = True, null = True)
    content = models.CharField(max_length = 500)
    date = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.content
