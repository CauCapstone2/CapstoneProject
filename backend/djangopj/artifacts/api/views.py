from artifacts.models import Artifact
from artifacts.models import ArtifactImage
from .serializers import ArtifactSerializer
from .serializers import ArtifactImageSerializer
from .ArtifactsPagenation import ArtifactsPagenation
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction


class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    pagination_class = ArtifactsPagenation
    queryset = Artifact.objects.all()


class ArtifactImageViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactImageSerializer
    queryset = ArtifactImage.objects.all()


class ArtifactCreateView(APIView):
    def post(self, request, format=None):
        print(request.data['userID'])
        req = request.data
        artifact = {'userID': req['userID'],
                    'title': req['title'], 'description': req['description']}

        serializer_artifact = ArtifactSerializer(data=artifact)

        with transaction.atomic():
            sid = transaction.savepoint()
            if serializer_artifact.is_valid():
                artifact_obj = serializer_artifact.save()
                print("save artifact")
            else:
                transaction.savepoint_rollback(sid)
                return Response(serializer_artifact.errors, status=400)

            print("aaaaa")
            for image_src in req['images']:
                print("bbbbb")
                image = {'artifactId': artifact_obj.id, 'image': image_src}
                print("ccccc")
                serializer_image = ArtifactImageSerializer(data=image)
                print(type(image_src))
                if serializer_image.is_valid():
                    print("eeeee")
                    serializer_image.save()
                    print("save image")
                    transaction.savepoint_commit(sid)
                else:
                    print(serializer_image.errors)
                    transaction.savepoint_rollback(sid)
                    return Response(serializer_image.errors, status=400)
        
        return Response(request.data, status=201)
