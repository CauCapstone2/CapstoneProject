from artifacts.models import Artifact
from django.contrib.auth.models import User
from .serializers import SearchSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class SearchViewSet(viewsets.ModelViewSet) :
    serializer_class = SearchSerializer
    queryset = Artifact.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']