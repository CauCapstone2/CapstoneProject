from rest_framework import viewsets
from purchase_check.models import PurchaseHistory
from .serializers import PurchaseHistorySerializer
from django_filters import rest_framework as filters
from rest_framework.views import APIView

class PurchaseHistoryViewSet(viewsets.ModelViewSet) :
    serializer_class = PurchaseHistorySerializer
    queryset = PurchaseHistory.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('userID',)