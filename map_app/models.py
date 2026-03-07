from django.db import models

# Create your models here.
class StudyLocations(models.Model):
    name = models.CharField(max_length=120)
    latitude = models.FloatField()
    longitude = models.FloatField()
