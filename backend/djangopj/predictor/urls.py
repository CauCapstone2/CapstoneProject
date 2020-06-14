from django.urls import path
from predictor import views


urlpatterns = [
    path('classify/', views.call_picture_age_model.as_view())
]
