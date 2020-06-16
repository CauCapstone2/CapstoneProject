from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from artifacts.models import ArtifactImage
from artifacts.api.serializers import ArtifactImageSerializer
from .serializers import SimilarImageSerializer
from rest_framework import status
import cv2
from djangopj import settings
import os


class SimilarImage(APIView):
    def get_similarity(self, src_path, dst_path, method):
        img1 = cv2.imread(src_path, 0)
        img2 = cv2.imread(dst_path, 0)

        if method == "sift":
            detect = cv2.xfeatures2d.SIFT_create()
            kp1, des1 = detect.detectAndCompute(img1, None)
            kp2, des2 = detect.detectAndCompute(img2, None)
            FLANN_INDEX_KDTREE = 0
            index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
            search_params = dict(checks=50)
            flann = cv2.FlannBasedMatcher(index_params, search_params)
            matches = flann.knnMatch(des1, des2, k=2)
        else:
            detect = cv2.ORB_create()
            kp1, des1 = detect.detectAndCompute(img1, None)
            kp2, des2 = detect.detectAndCompute(img2, None)
            bf = cv2.BFMatcher()
            matches = bf.knnMatch(des1, des2, k=2)

        good_points = []
        ratio = 0.7

        for m, n in matches:
            if m.distance < ratio * n.distance:
                good_points.append([m])

        number_keypoints = 0
        if len(kp1) <= len(kp2):
            number_keypoints = len(kp1)
        else:
            number_keypoints = len(kp2)

        return len(good_points) / number_keypoints

    def get_absolute_url(self, base, url):
        return '%s%s' % (base, url)

    def get(self, request):
        user_id = int(request.GET.get('imageId'))
        base_url = settings.BASE_DIR
        src_image = ArtifactImage.objects.get(id=user_id).image

        image_query_set = ArtifactImage.objects.all()
        similar_list = []

        for image in image_query_set:
            method = "orb"
            if image.image == src_image:
                continue
            src_url = self.get_absolute_url(base_url, src_image.url)
            dst_url = self.get_absolute_url(base_url, image.image.url)

            sim = self.get_similarity(src_url, dst_url, method)
            similar_list.append([image, sim])

        serializer = SimilarImageSerializer(
            [el[0] for el in similar_list], many=True, read_only=True, context={"request": request})

        res = [{"artifactId": serializer.data[i]["artifactId"], "image": serializer.data[i]["image"], "sim": el[1]}
               for i, el in enumerate(similar_list)]

        res = sorted(res, reverse=True, key=lambda k: k["sim"])[:8]

        return JsonResponse(res, safe=False)
