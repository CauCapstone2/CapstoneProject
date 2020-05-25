from evaluation.models import Evaluation
from .serializers import EvaluationDetailSerializer
from rest_framework import viewsets
from django_filters import rest_framework as filters

class EvaluationViewSet(viewsets.ModelViewSet):
    serializer_class = EvaluationDetailSerializer
    queryset = Evaluation.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID', 'userID','recreationID',)