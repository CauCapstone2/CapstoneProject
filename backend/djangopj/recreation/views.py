# pagination 구현하기
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
import json
from django_filters import rest_framework as filters


class RecreationView(APIView):
    def get(self, request):
        return Response({"result": 1})
