from django.urls import path
from search.api.views import SearchViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', SearchViewSet, basename='search')
urlpatterns = router.urls
