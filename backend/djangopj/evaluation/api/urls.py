from django.urls import path
from evaluation.api.views import EvaluationViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from django.urls import path, include
from .views import EvaluationView


router = DefaultRouter()
router.register(r'', EvaluationViewSet, basename='evaluation')

urlpatterns = [
    url(r'^average/$', EvaluationView.as_view(), name='evaluation average'),
    url(r'', include(router.urls))
]
