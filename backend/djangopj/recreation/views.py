from recreation.models import Recreation
from recreation.models import RecreationImage
from .serializers import RecreationSerializer
from .serializers import RecreationImageSerializer
from .serializers import RecreationDetailSerializer
from django.contrib.auth.models import User
# pagination 구현하기
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
import json
from django_filters import rest_framework as filters
from predictor.apps import PredictorConfig
import tensorflow as tf
import numpy as np
import tempfile
import json
import copy

class RecreationViewSet(viewsets.ModelViewSet) :
    serializer_class = RecreationSerializer
    queryset = Recreation.objects.all().order_by('-time')
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
    def get_mean_tendency(self, user_id, new_tendency) :
        image_in_user = RecreationImage.objects.filter(
            recreationID__userID=user_id)
        tendencies = [np.array(json.loads(el.tendency))
                      for el in image_in_user]
        tendencies.append(new_tendency)
        tendencies = np.array(tendencies)
        result = tendencies.mean(axis=0)
        return result

    def post(self, request, format=None):
        req = request.data
        user_id = req['userID']
        images = dict(req.lists())['images']
        recreation = {'userID': user_id,
                    'title': req['title'], 'description': req['description'],
                    'artifactID': req['artifactID']}
        serializer_recreation = RecreationSerializer(data=recreation)
        channels = 3
        img_size = 224

        with transaction.atomic():
            sid = transaction.savepoint()
            if serializer_recreation.is_valid():
                recreation_obj = serializer_recreation.save()
            else:
                transaction.savepoint_rollback(sid)
                return Response(serializer_recreation.errors, status=400)

            for img_name in images:
                temp_img_file = copy.deepcopy(img_name)
                predictor = PredictorConfig.picture_age_model
                image = temp_img_file.read()
                image_decoded = tf.io.decode_image(
                    image, channels = channels
                )
                image_resized = tf.image.resize(
                    image_decoded, [img_size, img_size]
                )
                image_normalized = image_resized / 255.0
                tendency = predictor.predict(
                    image_normalized[np.newaxis, ...]
                )[0].tolist()
                pred = predictor.predict_classes(
                    image_normalized[np.newaxis, ...]
                )[0]
                tendency_json = json.dumps(tendency)

                image_file = {'recreationID': recreation_obj.id, 'image': img_name, 'predict' : pred, 'tendency' : tendency_json}
                serializer_image = RecreationImageSerializer(data=image_file)

                mean_tendency = self.get_mean_tendency(user_id, tendency)

                user = User.objects.get(pk=user_id)
                user.profile.tendency = json.dumps(mean_tendency.tolist())

                if serializer_image.is_valid():
                    serializer_image.save()
                    user.save()
                else:
                    transaction.savepoint_rollback(sid)
                    return Response(serializer_image.errors, status=400)

        return Response("success", status=201)