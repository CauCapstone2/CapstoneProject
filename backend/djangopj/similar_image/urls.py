from django.urls import path
from similar_image import views


urlpatterns = [
    path('', views.SimilarImage.as_view())
]
