from django.shortcuts import render
from .apps import PredictorConfig
from django.http import JsonResponse
from rest_framework.views import APIView
import tensorflow as tf
import numpy as np


class call_picture_age_model(APIView):
    def get(self, request):
        model = PredictorConfig.picture_age_model
        channels = 3
        img_size = 224
        if request.method == 'GET':
            image_path = request.GET.get('image')
            image_string = tf.io.read_file(image_path)
            image_decoded = tf.image.decode_jpeg(
                image_string, channels=channels)
            image_resized = tf.image.resize(
                image_decoded, [img_size, img_size])
            image_normalized = image_resized / 255.0
            pred_probs = model.predict(image_normalized[np.newaxis, ...])
            result = model.predict_classes(image_normalized[np.newaxis, ...])
            print(pred_probs)
            print(result)

            response = {'pred_probs': pred_probs.tolist(),
                        'result': result.tolist()}
            return JsonResponse(response)
