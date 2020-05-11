from django.urls import path
from search.views import SearchViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', SearchViewSet, basename='Search')
urlpatterns = router.urls
