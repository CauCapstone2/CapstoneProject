from report.models import Report
from .serializers import ReportSerializer
from rest_framework import viewsets
from django_filters import rest_framework as filters

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID',)
    lookup_field = 'userID'