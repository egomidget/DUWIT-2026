from django.urls import path
from .views import studyspaces_list, space_options

urlpatterns = [
    path("", studyspaces_list),
    path("options/", space_options),
]