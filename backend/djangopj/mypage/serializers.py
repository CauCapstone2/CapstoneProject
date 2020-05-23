from rest_framework import serializers
# from mypage.models import Mypage
from comment.models import Comment
from artifacts.models import Artifact
from django.contrib.auth.models import User
from django.conf import settings
from comment.api.serializers import CommentDetailSerializer
from artifacts.api.serializers import ArtifactSerializer
from recreation.serializers import RecreationSerializer
from artifacts.models import ArtifactImage
from artifacts.api.serializers import ArtifactImageSerializer

class MypageCommentSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only = True)
    # Comment = CommentDetailSerializer(read_only = True)
    artifactID = ArtifactSerializer(read_only = True)
    recreationID = RecreationSerializer(read_only=True)
    class Meta :
        model = Comment
        fields = ('id', 'userID', 'username', 'date', 'content', 'artifactID', 'recreationID')

class MypageArtifactSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, data):
        image = ArtifactImage.objects.filter(artifactId=data.id)
        artifact_image = ArtifactImageSerializer(image, many=True, read_only=True, context=self.context).data
        if artifact_image:
            return artifact_image[0]['image']

    class Meta:
        model = Artifact
        fields = ('id', 'userID', 'username', 'title', 'image', 'description')

class MypageUserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = '__all__'