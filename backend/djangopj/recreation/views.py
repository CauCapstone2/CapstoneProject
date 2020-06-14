from recreation.models import Recreation
from recreation.models import RecreationImage
from .serializers import RecreationSerializer
from .serializers import RecreationImageSerializer
from .serializers import RecreationDetailSerializer
# pagination 구현하기
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
import json
from django_filters import rest_framework as filters

class RecreationViewSet(viewsets.ModelViewSet) :
    serializer_class = RecreationSerializer
    queryset = Recreation.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['artifactID', ]

class RecreationImageViewSet(viewsets.ModelViewSet) :
    serializer_class = RecreationImageSerializer
    queryset = RecreationImage.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('recreationID', )

class RecreationDetailViewSet(viewsets.ModelViewSet) :
    serializer_class = RecreationDetailSerializer
    queryset = Recreation.objects.all()

class RecreationCreateView(APIView) :
    def post(self, request, format=None):
        req = request.data
        images = dict(req.lists())['images']
        recreation = {'userID': req['userID'],
                    'title': req['title'], 'description': req['description'],
                    'artifactID': req['artifactID']}
        serializer_recreation = RecreationSerializer(data=recreation)

        with transaction.atomic():
            sid = transaction.savepoint()
            if serializer_recreation.is_valid():
                recreation_obj = serializer_recreation.save()
            else:
                transaction.savepoint_rollback(sid)
                return Response(serializer_recreation.errors, status=400)

            for img_name in images:
                image_file = {'recreationID': recreation_obj.id, 'image': img_name}
                serializer_image = RecreationImageSerializer(data=image_file)
                if serializer_image.is_valid():
                    serializer_image.save()
                    # transaction.savepoint_commit(sid)
                else:
                    transaction.savepoint_rollback(sid)
                    return Response(serializer_image.errors, status=400)

        return Response("success", status=201)