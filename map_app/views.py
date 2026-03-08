from django.shortcuts import render
import os
import requests
from django.http import JsonResponse
from django.conf import settings
from .models import Locations
from .models import SearchedCoordinates
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationSerializer

# GET !!!
def get_sweet_treats(request):
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
   
    #getting the parameters tho with a default set to billy b
    #this is how itll be fetched fetch(`http://127.0.0.1:8000/api/map/treats/?lat=${insert lat variable here}&lng=${insert longitude variable here}&radius=1500`)
    lat = request.GET.get('lat', '54.7651')
    lng = request.GET.get('lng', '-1.5772')
    radius = request.GET.get('radius', '3000') # Default 3km

    #request to google
    keywords = "bakery|dessert|ice cream|gelato|sweets|pastry|cake|cookies|confectionary|Pâtisserie|Patisserie|sorbet|frozen yoghurt"
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&keyword={keywords}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    
    treat_spots = [] #to populate
    #check db presence
    #if presence, populate from the db here
    #else: and then write to the other model
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
        #update the searched coords
        new_search = SearchedCoordinates.objects.create(lati =lat, longi=lng)
        print(f"SUCCESS: Saved search ID {new_search.id} to the logbook!")
            
    return JsonResponse({'treats': treat_spots}) #sending to front end

def checkDbPresence(latitude, longitude):
    #here i am going to test whether the locations around here are already cached in the db
    pass
    #decide what very small offset ill be using. im thinking i want to have atleast sweet treats within 15min walk showing so lets have a think how that relates. should i extend the radius of the original searches to help this?
    #add check if there is a value in the db which is in the += square offset range. 
    #for that above will have 2 filters, one for long one for lat and we have an AND in between!!
    #if smth appears then return true


def updateSearchedDb():
    #here i will add the just searched coordinated to the SearchedCoordinates model
    pass

#Post !!!
#post new study location
@api_view(['POST']) 
def create_location(request):
    custom_data = request.data.copy()
    custom_data['name'] = "Study Space" 
    custom_data['location_type'] = "study"
    custom_data['address'] = None
    serializer = LocationSerializer(data=custom_data)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response({
            "message": "Study space successfully added!", 
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    print("DEBUG errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
