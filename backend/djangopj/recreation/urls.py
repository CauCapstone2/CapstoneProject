from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('', views.RecreationView.as_view(), name='recreation')
]
