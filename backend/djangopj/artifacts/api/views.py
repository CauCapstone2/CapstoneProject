from artifacts.models import Artifact
from artifacts.models import ArtifactImage
from .serializers import *
from django.contrib.auth.models import User
from .artifacts_pagination import ArtifactsPagination
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


class ArtifactViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer
    pagination_class = ArtifactsPagination
    queryset = Artifact.objects.all().order_by('-time')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('userID',)


class ArtifactImageViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactImageSerializer
    queryset = ArtifactImage.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('artifactId',)


class ArtifactCreateView(APIView):
    def get_mean_tendency(self, user_id, new_tendency):
        image_in_user = ArtifactImage.objects.filter(
            artifactId__userID=user_id)
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
        artifact = {'userID': user_id,
                    'title': req['title'],
                    'description': req['description']}
        serializer_artifact = ArtifactSerializer(data=artifact)
        channels = 3
        img_size = 224

        with transaction.atomic():
            sid = transaction.savepoint()
            if serializer_artifact.is_valid():
                artifact_obj = serializer_artifact.save()
            else:
                transaction.savepoint_rollback(sid)
                print("artifact error:", serializer_artifact.errors)
                return Response(serializer_artifact.errors, status=400)

            for img_name in images:
                temp_img_file = copy.deepcopy(img_name)
                predictor = PredictorConfig.picture_age_model
                image = temp_img_file.read()
                image_decoded = tf.io.decode_image(
                    image, channels=channels)
                image_resized = tf.image.resize(
                    image_decoded, [img_size, img_size])
                image_normalized = image_resized / 255.0
                tendency = predictor.predict(
                    image_normalized[np.newaxis, ...])[0].tolist()
                pred = predictor.predict_classes(
                    image_normalized[np.newaxis, ...])[0]
                tendency_json = json.dumps(tendency)

                image_file = {'artifactId': artifact_obj.id,
                              'image': img_name, 'predict': pred, 'tendency': tendency_json}
                serializer_image = ArtifactImageSerializer(data=image_file)

                mean_tendency = self.get_mean_tendency(user_id, tendency)

                user = User.objects.get(pk=user_id)
                user.profile.tendency = json.dumps(mean_tendency.tolist())

                if serializer_image.is_valid():
                    serializer_image.save()
                    user.save()
                else:
                    transaction.savepoint_rollback(sid)
                    print("image error:", serializer_image.errors)
                    return Response(serializer_image.errors, status=400)

        return Response("success", status=201)


class ArtifactDetailViewSet(viewsets.ModelViewSet):
    serializer_class = ArtifactDetailSerializer
    queryset = Artifact.objects.all()
