from django.urls import path, include
from django.conf.urls import url
from artifacts.api.views import ArtifactViewSet
from artifacts.api.views import ArtifactCreateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ArtifactViewSet, basename='artifacts')
# urlpatterns = router.urls
urlpatterns = [
    url(r'^create/$', ArtifactCreateView.as_view(), name='artifactcreate'),
    # path('create/', ArtifactCreateView.as_view()),
    url(r'', include(router.urls))
]

# from django.contrib import admin
# from django.urls import path
# from artifacts.api.views import ArtifactViewSet

# urlpatterns = [
#     path('', ArtifactViewSet, name='artifacts')
# ]
