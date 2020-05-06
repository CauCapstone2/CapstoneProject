from rest_framework import serializers
from artifacts.models import Artifact

class ArtifactSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only = True)
    class Meta:
        model = Artifact
        fields = ('id', 'userID', 'username', 'title','image','description')
