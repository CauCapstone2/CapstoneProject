from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from . import views
from artifacts.api.views import ArtifactImageViewSet
from rest_framework.routers import DefaultRouter

image_router = DefaultRouter()
image_router.register(r'', ArtifactImageViewSet, basename='artifactsimage')

urlpatterns = [
        path('', views.artifact, name="artifacts"),
        path('<int:artifact_id>', views.detail, name="detail"),
        path('register/', views.register, name="register"),
        url(r'^update/', include(image_router.urls)),
]