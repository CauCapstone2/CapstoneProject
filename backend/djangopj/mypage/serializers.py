from rest_framework import serializers
# from mypage.models import Mypage
from comment.models import Comment
from artifacts.models import Artifact
from django.conf import settings
from comment.api.serializers import CommentDetailSerializer
from artifacts.api.serializers import ArtifactSerializer

class MypageCommentSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only = True)
    # Comment = CommentDetailSerializer(read_only = True)
    artifactID = ArtifactSerializer(read_only = True)
    class Meta :
        model = Comment
        fields = ('id', 'userID', 'username', 'content', 'artifactID')

class MypageArtifactSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only = True)
    class Meta :
        model = Artifact
        #fields = ('id', 'username', 'myArtifact')
        fields = ('id', 'userID', 'username', 'title', 'image', 'description')