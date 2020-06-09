from rest_framework import serializers
from artifacts.models import ArtifactImage
from artifacts.api.serializers import ArtifactImageSerializer


class SimilarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtifactImage
        fields = ('artifactId', 'image',)
