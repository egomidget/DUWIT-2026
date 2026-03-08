from django.urls import path
from . import views

urlpatterns = [
    path('treats/', views.get_sweet_treats, name='get_treats'),
    path('add-location/', views.create_location, name='add_location'),
    path('study-spots/', views.get_combined_study_spots, name='study_spots'),
    path('study-spots/nearby/', views.get_filtered_study_spots, name='filter_study_spots'),
    path('add-study-spot/', views.create_study_spot, name='create_study_spot')
]