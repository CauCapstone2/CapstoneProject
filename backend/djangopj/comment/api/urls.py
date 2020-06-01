from django.urls import path, include
from comment.api.views import CommentViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

router = DefaultRouter()
router.register(r'', CommentViewSet, basename='comments')
urlpatterns = router.urls
