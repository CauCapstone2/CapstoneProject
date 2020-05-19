from django.urls import path, include
from django.conf.urls import url
from recreation.views import RecreationViewSet
from recreation.views import RecreationCreateView
from recreation.views import RecreationDetailViewSet
from recreation.views import RecreationImageViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', RecreationViewSet, basename='recreate')
router.register(r'detail', RecreationDetailViewSet, basename='recreatedetail')
router.register(r'image', RecreationImageViewSet, basename='image')
urlpatterns = [
    url(r'^create/$', RecreationCreateView.as_view(), name='recreatecreate'),
    url(r'', include(router.urls))
]