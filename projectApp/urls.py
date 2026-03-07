from django.urls import path
from .views import studyspaces_list

urlpatterns = [
    path("studyspaces/", studyspaces_list),
]