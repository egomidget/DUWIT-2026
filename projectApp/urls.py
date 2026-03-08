from django.urls import path
from .views import studyspaces_list, space_options, studyspace_detail, Studypace_create

urlpatterns = [
    path("", studyspaces_list),
    path("options/", space_options),
    path("<int:id>/", studyspace_detail),
    path("studyspaces/create/", Studypace_create),

    # TODO pls
    # path("add/") i need a post endpoint for the study spaces, use serializer again
]