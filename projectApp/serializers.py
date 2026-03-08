from rest_framework import serializers
from .models import Studyspaces

class SpacesSerializer(serializers.ModelSerializer):
    opening_hours = serializers.SerializerMethodField()

    class Meta:
        model = Studyspaces
        fields = "__all__"

    def get_opening_hours(self, obj):
        return obj.get_opening_hours()
    

