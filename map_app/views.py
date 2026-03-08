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
from projectApp.serializers import SpacesSerializer
from django.forms.models import model_to_dict
import math
from django.db import transaction
from projectApp.models import Studyspaces

# GET !!!
#all the combo study spots 
@api_view(['GET'])
def get_combined_study_spots(request):
    study_locations = Locations.objects.filter(location_type='study').select_related('study_info')
    combined_list = []
    for spot in study_locations:
        combined_obj = model_to_dict(spot)

        if hasattr(spot, 'study_info'):
            friend_data = model_to_dict(spot.study_info)
            
            # getting rid of their id we only want mine
            friend_data.pop('id', None)
            friend_data.pop('location', None) 
            
            #merges the objects
            combined_obj = {**combined_obj, **friend_data}

        combined_list.append(combined_obj)

    return Response({'study_spots': combined_list})

#filtered study location
#reuqest thing should look like http://127.0.0.1:8000/api/map/study-spots/nearby/?lat=54.773&lng=-1.576
@api_view(['GET'])
def get_filtered_study_spots(request):
    full_response = get_combined_study_spots(request._request)
    all_spots = full_response.data.get('study_spots', [])

    # getting the points from the url
    try:
        user_lat = float(request.GET.get('lat'))
        user_lng = float(request.GET.get('lng'))
    except (TypeError, ValueError):
        return Response({"error": "Missing or invalid lat/lng parameters"}, status=400)

    la_offset, lo_offset = get_lat_lng_offsets(user_lat)

    filtered_list = []
    for spot in all_spots:
        is_inside_lat = (user_lat - la_offset) <= spot['latitude'] <= (user_lat + la_offset)
        is_inside_lng = (user_lng - lo_offset) <= spot['longitude'] <= (user_lng + lo_offset)

        if is_inside_lat and is_inside_lng:
            filtered_list.append(spot)

    return Response({'study_spots': filtered_list})

#the location filtered sweet treats!
def get_sweet_treats(request):
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
   
    #getting the parameters tho with a default set to billy b
    #this is how itll be fetched fetch(`http://127.0.0.1:8000/api/map/treats/?lat=${insert lat variable here}&lng=${insert longitude variable here}&radius=1500`)
    lat = float(request.GET.get('lat', '54.7651'))
    lng = float(request.GET.get('lng', '-1.5772'))
    radius = request.GET.get('radius', '3000') # Default 3km
    
    treat_spots = [] #to populate
    
    #check db presence
    if checkDbPresence(lat, lng, SearchedCoordinates) is not None:  #checking if it was returned
        #if nearby searched coordinate present, populate from the db here
        print("🟢 CACHE HIT! Loading from DB...")
        in_radius_locations = checkDbPresence(lat,lng, Locations)

        for spot in in_radius_locations:
            treat_spots.append({
                'name': spot.name,
                'lat': spot.latitude,
                'lng': spot.longitude,
                'type': spot.location_type,
                'address': spot.address
            })
    else:
        #else: and then write to the other model
        print("🔴 CACHE MISS! Hitting Google API...")


        #request to google
        keywords = "bakery|dessert|ice cream|gelato|sweets|pastry|cake|cookies|confectionary|Pâtisserie|Patisserie|sorbet|frozen yoghurt"
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&keyword={keywords}&key={api_key}"
        response = requests.get(url)
        data = response.json()

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

            #update the searched coords db
            new_search = SearchedCoordinates.objects.create(lati =lat, longi=lng)
            print(f"SUCCESS: Saved search ID {new_search.id} to the logbook!")
                
    return JsonResponse({'treats': treat_spots}) #sending to front end

def checkDbPresence(latitude, longitude, placeToCheck):
    #here i am going to test whether the locations around here are already cached in the db

    #1.5km offset:
    la_offset, lo_offset = get_lat_lng_offsets(latitude)
    #add check if there is a value in the db which is in the +- square offset range. 
    #for that above will have 2 filters, one for long one for lat and we have an AND in between!!
    if placeToCheck.__name__ == 'SearchedCoordinates':
        in_search_area = placeToCheck.objects.filter(
            lati__gte=latitude - la_offset,
            lati__lte=latitude + la_offset,
            longi__gte=longitude - lo_offset,
            longi__lte=longitude + lo_offset
        )
    # Otherwise, we are searching the 'Locations' model (uses latitude/longitude)
    else:
        in_search_area = placeToCheck.objects.filter(
            latitude__gte=latitude - la_offset,
            latitude__lte=latitude + la_offset,
            longitude__gte=longitude - lo_offset,
            longitude__lte=longitude + lo_offset,
            location_type='sweet_treat' #we only wanna return the sweet treatzies here
        )

    if in_search_area.exists():
        return in_search_area
    return None

#calculating the latitude longitude difference:
def get_lat_lng_offsets(lat, distance_km=1.5):
    R = 6371.0 #earth radius (km)
    
    #offset latitude is constant
    lat_offset = (distance_km / R) * (180 / math.pi)
    
    lat_radians = math.radians(lat) #convert to radians bc the math.cos
    lng_offset = (distance_km / (R * math.cos(lat_radians))) * (180 / math.pi)
    
    return lat_offset, lng_offset

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
            "id": location_obj.id,
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    print("DEBUG errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#post combo new study place
@api_view(['POST']) 
def create_study_spot(request):
    raw_data = request.data
    
    #try = if one fails both do
    try:
        with transaction.atomic():
            
            #mapping latitude and longitude
            loc_input = {
                'name': raw_data.get('name', 'New Study Space'),
                'latitude': raw_data.get('lat'),
                'longitude': raw_data.get('long'), 
                'location_type': 'study'
            }
            
            loc_serializer = LocationSerializer(data=loc_input)
            if loc_serializer.is_valid(raise_exception=True):
                location_obj = loc_serializer.save()
            
            
            amenities_input = raw_data.copy()
            amenities_input['location'] = location_obj.id 
            
            amenities_serializer = SpacesSerializer(data=amenities_input)
            if amenities_serializer.is_valid(raise_exception=True):
                amenities_serializer.save()

            return Response({
                "status": "Happy yay",
                "message": "Location and Amenities tied together!",
                "id": location_obj.id
            }, status=201)

    except Exception as e:
        # if smth goes wrong then nothing is saved to the db
        return Response({"error": str(e)}, status=400)
    
