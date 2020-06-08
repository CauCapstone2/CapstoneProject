from evaluation.models import Evaluation
from .serializers import EvaluationDetailSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from django_filters import rest_framework as filters
from ..models import Evaluation
from rest_framework.response import Response


class EvaluationViewSet(viewsets.ModelViewSet):
    serializer_class = EvaluationDetailSerializer
    queryset = Evaluation.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID', 'userID',)


class EvaluationView(APIView):
    def get(self, request):
        userId = int(request.GET.get('userId'))
        evaluations = Evaluation.objects.filter(artifactID__userID=userId)
        print(evaluations)

        # artifactId = int(request.GET.get('artifactID'))
        # evaluations = Evaluation.objects.filter(artifactID=artifactId)

        average = [0, 0, 0, 0, 0]
        for eval in evaluations:
            average[0] += eval.Creative
            average[1] += eval.Expressive
            average[2] += eval.Quality
            average[3] += eval.Popularity
            average[4] += eval.Workability
        average = [x / len(evaluations) for x in average]

        result = {'average': average, 'length': len(evaluations)}

        return Response(result)
