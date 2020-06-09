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
        # 해당 사용자의 평가받은 점수의 평균값 계산
        userId = int(request.GET.get('userId'))
        evaluations = Evaluation.objects.filter(artifactID__userID=userId)

        average = [0, 0, 0, 0, 0]
        for eval in evaluations:
            average[0] += eval.Creative
            average[1] += eval.Expressive
            average[2] += eval.Quality
            average[3] += eval.Popularity
            average[4] += eval.Workability

        try:
            average = [round(x / len(evaluations), 2) for x in average]
        except ZeroDivisionError:
            average = average

        result = {'average': average, 'length': len(evaluations)}
        return Response(result)
