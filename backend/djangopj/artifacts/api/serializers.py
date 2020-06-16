from rest_framework import serializers
from artifacts.models import Artifact
from artifacts.models import ArtifactImage
from home.models import Profile


class ArtifactImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtifactImage
        fields = ('id', 'artifactId', 'image', 'predict', 'tendency')


class ArtifactSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, data):
        image = ArtifactImage.objects.filter(artifactId=data.id)
        artifact_image = ArtifactImageSerializer(
            image, many=True, read_only=True, context=self.context).data
        if artifact_image:
            return artifact_image[0]['image']

    class Meta:
        model = Artifact
        fields = ('__all__')


class ArtifactDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, data):
        image = ArtifactImage.objects.filter(artifactId=data.id)
        artifact_image = ArtifactImageSerializer(
            image, many=True, read_only=True, context=self.context).data
        if artifact_image:
            return artifact_image

    class Meta:
        model = Artifact
        fields = ('id', 'userID', 'username', 'title',
                  'image', 'description', 'recreation')
