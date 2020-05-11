from django.urls import path, include
from django.conf.urls import url
from artifacts.api.views import ArtifactViewSet
from artifacts.api.views import ArtifactCreateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ArtifactViewSet, basename='artifacts')
urlpatterns = [
    url(r'^create/$', ArtifactCreateView.as_view(), name='artifactcreate'),
    url(r'', include(router.urls))
]
