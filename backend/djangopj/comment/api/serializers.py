from rest_framework import serializers
from comment.models import Comment
from django.conf import settings


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'userID', 'artifactID', 'content', 'date')


class CommentDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'userID', 'username', 'artifactID', 'content', 'date')
