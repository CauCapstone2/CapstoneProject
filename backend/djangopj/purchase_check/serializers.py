from rest_framework import serializers
from purchase_check.models import PurchaseHistory
from django.conf import settings


class PurchaseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = ('userID', 'imageID')