from django.urls import path
from artifacts.api.views import ArtifactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ArtifactViewSet, basename='artifacts')
urlpatterns = router.urls
