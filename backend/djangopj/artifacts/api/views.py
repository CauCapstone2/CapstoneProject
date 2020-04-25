from artifacts.models import Artifact
from .serializers import ArtifactSerializer
from .ArtifactsPagenation import ArtifactsPagenation
from rest_framework import viewsets


class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    pagination_class = ArtifactsPagenation
    queryset = Artifact.objects.all()


    # @action()
    # def func() ...

    # def get_queryset(self) :
    #     qs = super().get_queryset()
    #     qs = qs.filter(id = self.request.user)
    #     return qs