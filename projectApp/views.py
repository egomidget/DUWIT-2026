from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Studyspaces
from .serializers import SpacesSerializer


@api_view(['GET'])
def studyspaces_list(request):
    spaces = Studyspaces.objects.all()
    serializer = SpacesSerializer(spaces, many=True)
    return Response(serializer.data)

def study_sapce_api_dumby(request):
    data = {
            "id": 1,
            "name": "The Marshmallow Lounge",
            "location": "Sector 4, Candy County",
            "lat": "55.95581036002576",
            "long": "-3.1930274625920156",
            "image_url": "https://images.unsplash.com/photo-1497366216548-37526070297c",
            "rating": 4.8,
            "sugar_level": "Quiet",
            "nitro_boost": "900 Mbps",
            "outlets": "Plenty",
            "description": "A super-soft spot for high-speed coding sessions. Features ergonomic gumdrop chairs.",
            "is_open": True,
            "facilities": ["wifi", "power", "quiet", "coffee"],
    }
    return JsonResponse(data, safe=False)

def study_spaces_api_dumby(request):
    data = [
        {
            "id": 1,
            "name": "The Marshmallow Lounge",
            "location": "Sector 4, Candy County",
            "image_url": "https://images.unsplash.com/photo-1497366216548-37526070297c",
            "rating": 4.8,
            "sugar_level": "Quiet",
            "nitro_boost": "900 Mbps",
            "outlets": "Plenty",
            "description": "A super-soft spot for high-speed coding sessions. Features ergonomic gumdrop chairs.",
            "is_open": True,
        },
        {
            "id": 2,
            "name": "Sour Patch Pitstop",
            "location": "Neon Grotto",
            "image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            "rating": 4.2,
            "sugar_level": "Loud",
            "nitro_boost": "150 Mbps",
            "outlets": "Minimal",
            "description": "Zesty atmosphere for those who need a little kick to finish their sprints.",
            "is_open": False,
        },
        {
            "id": 3,
            "name": "Diet Cola Hot Springs",
            "location": "Mentos Mountain",
            "image_url": "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
            "rating": 4.9,
            "sugar_level": "Library Quiet",
            "nitro_boost": "1 Gbps",
            "outlets": "Universal",
            "description": "The elite racer's choice for deep focus. No fizz, just productivity.",
            "is_open": True,
        }
    ]
    return JsonResponse(data, safe=False)