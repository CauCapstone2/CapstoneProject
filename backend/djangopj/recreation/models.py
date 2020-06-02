from django.db import models
from django.conf import settings
from artifacts import models as artifactModel
from jsonfield import JSONField

class Recreation(models.Model) :
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name='recreation')
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    time = models.DateTimeField(auto_now=True)
    artifactID = models.ForeignKey(artifactModel.Artifact, on_delete = models.CASCADE)

    def __str__(self) :
        return self.title

class RecreationImage(models.Model) :
    recreationID = models.ForeignKey(Recreation, on_delete = models.CASCADE, related_name='recreation_image')
    image = models.ImageField(upload_to='recreation/')
    predict = models.IntegerField(default=-1)
    tendency = JSONField(null=True)

    def __str__(self) :
        return str(self.recreationID)