from django.urls import path
from .views import studyspaces_list, StudySpaceOptions

urlpatterns = [
    path("", studyspaces_list),
    path("options/", StudySpaceOptions.as_view()),
]