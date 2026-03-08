from rest_framework import serializers
from .models import Studyspaces

from map_app.serializers import LocationSerializer
from map_app.models import Locations

class SpacesSerializer(serializers.ModelSerializer):
    opening_hours = serializers.SerializerMethodField()
    location = LocationSerializer()

    class Meta:
        model = Studyspaces
        fields = '__all__'
        extra_kwargs = {
            'ambience': {'required': False, 'allow_null': True},
            'temperature': {'required': False, 'allow_null': True},
            'windows': {'required': False, 'allow_null': True},
            'sound': {'required': False, 'allow_null': True},
        }

    def get_opening_hours(self, obj):
        return obj.get_opening_hours()
    
    def create(self, validated_data):
        location_data = validated_data.pop('location')
        location_instance = Locations.objects.create(**location_data)
        studyspace = Studyspaces.objects.create(
            location=location_instance, 
            **validated_data
        )
        
        return studyspace
