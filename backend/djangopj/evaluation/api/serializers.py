from rest_framework import serializers
from evaluation.models import Evaluation
from django.conf import settings


class EvaluationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evaluation
        fields = ('id', 'userID', 'artifactID', 'Creative',
                  'Expressive', 'Quality', 'Popularity', 'Workability')


class EvaluationDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)

    class Meta:
        model = Evaluation
        fields = ('id', 'userID', 'username', 'artifactID', 'Creative',
                  'Expressive', 'Quality', 'Popularity', 'Workability')
