from comment.models import Comment
from artifacts.models import Artifact
from .serializers import MypageCommentSerializer
from .serializers import MypageArtifactSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

class MypageCommentViewSet(viewsets.ModelViewSet) :
    serializer_class = MypageCommentSerializer
    queryset = Comment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['userID']

class MypageArtifactViewSet(viewsets.ModelViewSet) :
    serializer_class = MypageArtifactSerializer
    queryset = Artifact.objects.all() # here is the problem I think.
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['userID']