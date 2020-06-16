from django.shortcuts import render
from django.contrib.auth.models import User
from home.models import Profile
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from django_filters import rest_framework as filters
from credit.serializers import CreditSerializer


class CreditViewSet(viewsets.ModelViewSet):
    serializer_class = CreditSerializer
    queryset = Profile.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('user',)


class CreditUpdateViewSet(APIView):
    def post(self, request, format=None):
        user_id = request.data.get('user')
        increase_credit = int(request.data.get('increase_credit'))
        current_user = Profile.objects.get(user=user_id)
        current_credit = current_user.credit

        update_credit = increase_credit + current_credit
        profile_with_updated_credit = {
            'user': user_id, 'credit': update_credit}
        serializer_credit = CreditSerializer(current_user, data=profile_with_updated_credit)
        if serializer_credit.is_valid(raise_exception=True) :
            serializer_credit.save()
        return Response("success", status=200)