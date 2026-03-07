from django.shortcuts import render
import os
import requests
from django.http import JsonResponse
from django.conf import settings

# Create your views here.
def get_sweet_treats(reuqest):
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    print(f"DEBUG: My key is {api_key}") # This will show up in your TERMINAL, not the browser

    #centering in durham for now
    lat = "54.7651"
    lng = "-1.5772"
    
    #2km from durham center search radius for now
    radius = 5000 

    #request to google
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=2{radius}&type=cafe&keyword=bakery|dessert|sweets&key={api_key}"
    response = requests.get(url)
    data = response.json()
    
    treat_spots = [] #to populate
    
    if data.get('status') == 'OK': #populating here
        for place in data.get('results', []):
            treat_spots.append({
                'name': place.get('name'),
                'lat': place['geometry']['location']['lat'],
                'lng': place['geometry']['location']['lng'],
                'type': 'sweet_treat', # so React knows what pin color to use
                'address': place.get('vicinity') # Gets the street name
            })
            
    return JsonResponse({'treats': treat_spots}) #sending to front end