from rest_framework import serializers
from recreation.models import Recreation
from recreation.models import RecreationImage

class RecreationSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, data) :
        image = RecreationImage.objects.filter(recreationID=data.id)
        recreation_image = RecreationImageSerializer(
            image, many=True, read_only=True, context=self.context).data
        if recreation_image :
            return recreation_image[0]['image']

    class Meta : 
        model = Recreation
        fields = ('id', 'userID', 'username', 'artifactID', 'title', 'image', 'description')

class RecreationImageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = RecreationImage
        fields = ('id', 'recreationID', 'image')

class RecreationDetailSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, data) :
        image = RecreationImage.objects.filter(recreationID=data.id)
        recreation_image = RecreationImageSerializer(
            image, many=True, read_only=True, context=self.context).data
        if recreation_image :
            return recreation_image

    class Meta :
        model = Recreation
        fields = ('id', 'userID', 'username')