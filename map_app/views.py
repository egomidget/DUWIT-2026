from django.shortcuts import render
import os
import requests
from django.http import JsonResponse
from django.conf import settings
from .models import Locations

# Create your views here.
def get_sweet_treats(request):
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
   
    #getting the parameters tho with a default set to billy b
    #this is how itll be fetched fetch(`http://127.0.0.1:8000/api/map/treats/?lat=${insert lat variable here}&lng=${insert longitude variable here}&radius=1500`)
    lat = request.GET.get('lat', '54.7651')
    lng = request.GET.get('lng', '-1.5772')
    radius = request.GET.get('radius', '1500') # Default 1.5km

    #request to google
    keywords = "bakery|dessert|ice cream|gelato|sweets|pastry|cake|cookies|confectionary|Pâtisserie|Patisserie|sorbet|frozen yoghurt"
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&keyword={keywords}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    
    treat_spots = [] #to populate
    
    if data.get('status') == 'OK': #populating here
        for place in data.get('results', []):
            #this is to save to db or get it from there
            obj, created = Locations.objects.get_or_create(
                google_place_id=place['place_id'], # The unique fingerprint
                defaults={
                    'name': place.get('name'),
                    'latitude': place['geometry']['location']['lat'],
                    'longitude': place['geometry']['location']['lng'],
                    'address': place.get('vicinity'),
                    'location_type': 'sweet_treat' # Ensuring it's tagged correctly!
                }
            )
            #adding to return list
            treat_spots.append({
                'name': obj.name,
                'lat': obj.latitude,
                'lng': obj.longitude,
                'type': obj.location_type,
                'address': obj.address
            })
            
    return JsonResponse({'treats': treat_spots}) #sending to front end

def checkDbPresence(latitude, longitude):
    #here i am going to test whether the locations around here are already cached in the db
    pass

