from rest_framework import serializers
# from mypage.models import Mypage
from comment.models import Comment
from artifacts.models import Artifact
from django.contrib.auth.models import User
from django.conf import settings

class SearchSerializer(serializers.ModelSerializer) :
    username = serializers.CharField(source='userID.username', read_only = True)
    class Meta :
        model = Artifact
        fields = ('id', 'userID', 'username', 'title', 'image', 'description')