from django.shortcuts import render
from django.contrib.auth.models import User
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
    queryset = User.profile.object.all()
    filter_backends = (filters.DjangoFilterBackend, )
    filterset_fields = ('user')


class CreditUpdateViewSet(APIView):
    def post(self, request, format=None):
        req = request.data
        user_id = req['userID']
        increase_credit = req['increase_credit']

        user = User.objects.get(pk=user_id)
        current_credit = user.profile.credit

        update_credit = increase_credit + current_credit

        profile_with_updated_credit = {
            'user': user_id, 'credit': update_credit}
        
        serializer_credit = CreditSerializer(data=profile_with_updated_credit)
        if serializer_credit.is_valid() :
            credit_obj = serializer_credit.save()
        else :
            print("credit updating error : ", serializer_credit.errors)
            return Response(serializer_credit.errors, status=400)
        
        return Response("success", status=201)