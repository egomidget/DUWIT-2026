from django.db import models

# Create your models here.
class Locations(models.Model):
    TYPE_CHOICES = [
    ('study', 'Study Space'), 
    ('sweet_treat', 'Sweet Treat')
]
    name = models.CharField(max_length=120)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=255, blank=True, null=True)
    
    # This field tells the map which icon to show
    location_type = models.CharField(
        max_length=20, 
        choices=TYPE_CHOICES, 
        default='study'
    )

    # for the treats to not rewrite the same cafe 
    google_place_id = models.CharField(max_length=255, unique=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.location_type})"


