from django.urls import path
from .views import ArtifactListView, ArtifactDetailView

urlpatterns = [
    path('', ArtifactListView.as_view()),
    path('<pk>', ArtifactDetailView.as_view()),
]