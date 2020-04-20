from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
        path('', views.artifact, name="artifacts"),
        path('<int:artifact_id>', views.detail, name="detail"),
        path('register/', views.register, name="register")
]