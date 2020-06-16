from django.urls import path, include
from django.conf.urls import url
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', PurchaseHistoryViewSet, basename='credit')

urlpatterns = [
    url(r'', include(router.urls))
]
