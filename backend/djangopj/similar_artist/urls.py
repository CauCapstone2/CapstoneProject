from django.urls import path
from similar_artist import views


urlpatterns = [
    path('', views.SimilarArtistView.as_view())
]
