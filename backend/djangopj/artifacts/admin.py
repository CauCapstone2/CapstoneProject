from django.contrib import admin
from .models import Artifact
from .models import ArtifactImage

admin.site.register(Artifact)
admin.site.register(ArtifactImage)
