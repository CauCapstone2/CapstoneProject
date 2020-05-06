from django.urls import path
from evaluation.api.views import EvaluationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', EvaluationViewSet, basename='evaluation')
urlpatterns = router.urls
