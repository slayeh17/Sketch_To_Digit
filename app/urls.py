from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("predict_digit/", views.predict_digit, name="predict_digit")
]