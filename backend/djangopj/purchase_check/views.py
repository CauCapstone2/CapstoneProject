from rest_framework import viewsets
from purchase_check.models import PurchaseHistory
from .serializers import PurchaseHistorySerializer
from django_filters import rest_framework as filters
from rest_framework.views import APIView

class PurchaseHistoryViewSet(viewsets.ModelViewSet) :
    serializer_class = PurchaseHistorySerializer
    queryset = PurchaseHistory.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID', 'userID',)

# class PurchaseHistoryCreateView(APIView) :
#     def post(self, request, format=None):
#         user_id = request.data.get('user_id')
#         artifact_id = request.data.get('artifact_id')

#         purchase_new_added = { 'userID' : user_id, 'artifactID' : artifact_id}

#         purchase_serializer = PurchaseHistorySerializer(data=purchase_new_added)
#         if purchase_serializer.is_valid(raise_exception=True) :
#             purchase_serializer.save()
#         return Response("success", status=200)