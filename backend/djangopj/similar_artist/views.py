from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from .kmeans_ensemble import ensemble
# from .serializers import SimilarArtistSerializer
from artifacts.models import ArtifactImage, Artifact
import json


class SimilarArtistView(APIView):
    def get(self, request):
        # serializer_class = SimilarArtistSerializer
        user_id = request.GET.get('userID')
        image_in_user = ArtifactImage.objects.filter(
            artifactId__userID=user_id)

        for el in image_in_user:
            tendency = el.tendency
            print(tendency)

        res = {'artist': image_in_user}
        return JsonResponse(res)
