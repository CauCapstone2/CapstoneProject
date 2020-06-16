from comment.models import Comment
from .serializers import CommentDetailSerializer
from rest_framework import viewsets
from django_filters import rest_framework as filters


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID',)