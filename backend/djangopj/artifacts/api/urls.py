from django.urls import path, include
from django.conf.urls import url
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', ArtifactViewSet, basename='artifacts')
router.register(r'detail', ArtifactDetailViewSet, basename='artifactdetail')

urlpatterns = [
    url(r'^create/$', ArtifactCreateView.as_view(), name='artifactcreate'),
    url(r'^list/$', ArtifactList.as_view(), name='artifactlist'),
    url(r'', include(router.urls))
]
