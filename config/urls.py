from django.contrib import admin
from django.urls import path, include
from projectApp.views import study_spaces_api_dumby, study_sapce_api_dumby
from map_app.views import prizes
from map_app.views import prizes, log_winner

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dumby-endpoint/', study_spaces_api_dumby, name="dumby"),
    path('api/dumby-endpoint-space/1/',study_sapce_api_dumby, name="dumby-sapce"),

    path('api/map/', include('map_app.urls')),
    path('api/studyspaces/', include("projectApp.urls")),

    #path for the prizes from the wheel 
    path('api/prizes', prizes, name='prizes'),

    path('api/log-winner/', log_winner, name='log-winner'),
    

    
]