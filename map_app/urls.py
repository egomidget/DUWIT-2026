from django.urls import path
from . import views

urlpatterns = [
    path('api/treats/', views.get_sweet_treats, name='get_treats'),
]