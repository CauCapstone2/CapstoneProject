from rest_framework import serializers
from artifacts.models import ArtifactImage
from recreation.models import RecreationImage
from artifacts.api.serializers import ArtifactImageSerializer


class SimilarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtifactImage
        fields = ('artifactId', 'image',)

class SimilarImageRecreationSerializer(serializers.ModelSerializer) :
    class Meta :
        model = RecreationImage
        fields = ('recreationID', 'image',)