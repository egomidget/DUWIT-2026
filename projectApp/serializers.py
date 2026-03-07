from rest_framework import serializers
from .models import Studyspaces


class SpacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studyspaces
        fields = '__all__'