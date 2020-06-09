from comment.models import Comment
from artifacts.models import Artifact
from django.contrib.auth.models import User
from .serializers import MypageCommentSerializer
from .serializers import MypageArtifactSerializer
from .serializers import MypageUserSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


class MypageCommentViewSet(viewsets.ModelViewSet):
    serializer_class = MypageCommentSerializer
    queryset = Comment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['userID']


class MypageArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = MypageArtifactSerializer
    queryset = Artifact.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['userID']


class MypageUserViewSet(viewsets.ModelViewSet):
    serializer_class = MypageUserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']
