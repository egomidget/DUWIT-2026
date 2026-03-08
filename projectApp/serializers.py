from rest_framework import serializers
from .models import Studyspaces

class SpacesSerializer(serializers.ModelSerializer):
    opening_hours = serializers.SerializerMethodField()

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
    

