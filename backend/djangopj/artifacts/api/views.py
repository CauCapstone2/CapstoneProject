from rest_framework.generics import ListAPIView, RetrieveAPIView
from artifacts.models import Artifact
from .serializers import ArtifactSerializer

class ArtifactListView(ListAPIView):
    queryset = Artifact.objects.all()
    serializer_class = ArtifactSerializer

class ArtifactDetailView(RetrieveAPIView):
    queryset = Artifact.objects.all()
    serializer_class = ArtifactSerializer