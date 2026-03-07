from django.contrib import admin
from django.urls import path, include
from projectApp.views import study_spaces_api_dumby, study_sapce_api_dumby

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("projectApp.urls")),
    path('api/dumby-endpoint/', study_spaces_api_dumby, name="dumby"),
    path('api/dumby-endpoint-space/1/',study_sapce_api_dumby, name="dumby-sapce"),

    path('api/map/', include('map_app.urls')),
]