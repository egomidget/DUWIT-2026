from django.db import models

class Studyspaces(models.Model): 

    temp_choices = [
        ("Artic", "Artic"), 
        ("Intense aircon", "Intense aircon"), 
        ("Just right", "Just right"),
        ("Nice and toasty", "Nice and toasty"),   
        ("Sahara Desert", "Sahara Desert"), 
    ]

    window_choices = [
        ("Bat cave", "Bat cave"), 
        ("Airplane window", "Airplane window"), 
        ("Have to go on a bear hunt to find", "Have to go on a bear hunt to find"),
        ("Green house", "Green house"),
    ]

    sound_choices = [
        ("Pin drop", "Pin drop"),
        ("Social space", "Social space"),
        ("Mothers meeting", "Mothers meeting"),
        
    ]

    ambience_choices = [
        ("Dark academia", "Dark academia"),
        ("warm and cosy", "warm and cosy"),
        ("corporate", "Corporate "),
        ("Millennium core", "Millennium core"),
        ("Bare bones", "Bare bones"),
        ("Brutalistic", "Brutslistic"),
    ]

    rating_choices = [
    (1, "1"),
    (2, "2"),
    (3, "3"),
    (4, "4"),
    (5, "5"),
]

    
    name = models.CharField(max_length=100)
    indoors = models.BooleanField(default = False, blank=True, null = True)
    wifi = models.BooleanField(default = False, blank=True, null = True)
    temperature = models.CharField(
        max_length = 1000,
        choices = temp_choices,
        blank=True,
        null = True
)
    plugsockets = models.BooleanField(default = False)
    windows = models.CharField(
        max_length = 1000,
        choices = window_choices,
        blank=True, 
        null = True 
)
    sound = models.CharField(
        max_length = 1000, 
        choices = sound_choices,
        blank=True, 
        null = True
)
    description = models.CharField(max_length= 1000) 
    ambience = models.CharField(
    max_length=1000,
    choices=ambience_choices,
    blank=True, 
    null = True
)
    
    in_house_food = models.BooleanField(default = False, blank=True, null = True)
    pay_to_enter = models.BooleanField(default = False, blank=True, null = True)
    public = models.BooleanField(default = False, blank=True, null = True)
    accessibility = models.BooleanField(default = False, blank=True, null = True)
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)
    rating = models.IntegerField(
        choices=rating_choices,
        null=True, blank=True)
    
class Facilities(models.Model): 
    name =models.CharField(max_length = 1000, null=True)
    
    def __str__(self):
        return self.name