from django.urls import path
from report.api.views import ReportViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ReportViewSet, basename='report')
urlpatterns = router.urls
