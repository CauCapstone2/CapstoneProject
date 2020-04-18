from artifacts.models import Artifact
from .serializers import ArtifactSerializer
from .ArtifactsPagenation import ArtifactsPagenation
from rest_framework import viewsets


class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    pagination_class = ArtifactsPagenation
    queryset = Artifact.objects.all()
