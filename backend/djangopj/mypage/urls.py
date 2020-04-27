from django.urls import path
from mypage.views import MypageArtifactViewSet
from mypage.views import MypageCommentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'artifacts', MypageArtifactViewSet, basename='mypageArtifact')
router.register(r'comments', MypageCommentViewSet, basename='mypageComment')
urlpatterns = router.urls
