from artifacts.models import Artifact
from .serializers import SearchSerializer
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import generics
from .search_pagination import SearchPagination


class SearchViewSet(viewsets.ModelViewSet):
    serializer_class = SearchSerializer
    pagination_class = SearchPagination
    queryset = Artifact.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']
