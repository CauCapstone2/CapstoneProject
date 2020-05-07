from artifacts.models import Artifact
from artifacts.models import ArtifactImage
from .serializers import ArtifactSerializer
from .serializers import ArtifactImageSerializer
from .ArtifactsPagenation import ArtifactsPagenation
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
import json


class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    pagination_class = ArtifactsPagenation
    queryset = Artifact.objects.all()


class ArtifactImageViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactImageSerializer
    queryset = ArtifactImage.objects.all()


class ArtifactCreateView(APIView):
    def post(self, request, format=None):
        req = request.data
        images = dict((request.data).lists())['images']
        artifact = {'userID': req['userID'],
                    'title': req['title'], 'description': req['description']}

        serializer_artifact = ArtifactSerializer(data=artifact)

        with transaction.atomic():
            sid = transaction.savepoint()
            if serializer_artifact.is_valid():
                artifact_obj = serializer_artifact.save()
            else:
                transaction.savepoint_rollback(sid)
                return Response(serializer_artifact.errors, status=400)

            for img_name in images:
                image_file = {'artifactId': artifact_obj.id, 'image': img_name}
                serializer_image = ArtifactImageSerializer(data=image_file)
                if serializer_image.is_valid():
                    serializer_image.save()
                    # transaction.savepoint_commit(sid)
                else:
                    transaction.savepoint_rollback(sid)
                    return Response(serializer_image.errors, status=400)

        return Response("success", status=201)
