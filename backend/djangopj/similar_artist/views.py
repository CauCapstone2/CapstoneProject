from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from .kmeans_ensemble import KMeansEnsemble
from artifacts.models import ArtifactImage, Artifact
from django.contrib.auth.models import User
import json
import numpy as np


class SimilarArtistView(APIView):
    def get(self, request):
        tendencies = []
        user_list = []
        similar_artist = []
        n_clusters = 2
        n_ensembles = 50
        n_units = 2
        user_id = int(request.GET.get('userID'))
        user_query_set = User.objects.all()
        idx = -1
        cnt = 0

        for user in user_query_set:
            tendency = user.profile.tendency
            if user.pk == user_id:
                idx = cnt
                if tendency is None:
                    # target user의 tendency가 None
                    return JsonResponse({"result": 2})
            if tendency:
                tendency = np.array(json.loads(tendency))
                tendencies.append(tendency)
                user_list.append(int(user.pk))
                cnt += 1

        tendencies = np.array(tendencies)
        kmeans_ensemble = KMeansEnsemble(n_clusters, n_ensembles, n_units)
        predict = kmeans_ensemble.fit_predict(tendencies).tolist()

        if idx == -1:
            return JsonResponse({"result": 1})  # error

        target = predict[idx]
        for i, user in enumerate(user_list):
            if target == predict[i]:
                similar_artist.append(user)

        res = {"result": predict, "idx": idx}
        return JsonResponse(res)
