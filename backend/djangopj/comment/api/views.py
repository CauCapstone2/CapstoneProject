from comment.models import Comment
from .serializers import CommentDetailSerializer
from rest_framework import viewsets
from django_filters import rest_framework as filters


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactID',)

# class CommentCountViewSet(viewsets.ModelViewSet) :
#     serializer_class = CommentSerializer
#     queryset = Comment.objects.all().
#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_fields = ('userID',)
