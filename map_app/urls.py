from django.urls import path
from . import views

urlpatterns = [
    path('treats/', views.get_sweet_treats, name='get_treats'),
    path('add-location/', views.create_location, name='add_location'),
    path('study-spots/', views.get_combined_study_spots, name='study_spots')
]