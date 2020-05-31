from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from artifacts.models import ArtifactImage
from artifacts.api.serializers import ArtifactImageSerializer
from .serializers import SimilarImageSerializer
from rest_framework import status


class SimilarImage(APIView):
    def get(self, request):
        user_id = int(request.GET.get('imageId'))
        image_query_set = ArtifactImage.objects.all()
        for image in image_query_set:
            print(image.image.url)

        serializer = SimilarImageSerializer(
            image_query_set, many=True, read_only=True, context={"request": request})
        return Response(serializer.data[:5])
