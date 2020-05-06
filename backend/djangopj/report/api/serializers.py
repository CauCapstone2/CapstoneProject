from rest_framework import serializers
from report.models import Report
from django.conf import settings

class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ('userID','artifactID')