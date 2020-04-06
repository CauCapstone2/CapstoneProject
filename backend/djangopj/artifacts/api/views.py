from artifacts.models import Artifact
from .serializers import ArtifactSerializer
from rest_framework import viewsets

class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    queryset = Artifact.objects.all()