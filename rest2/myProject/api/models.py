from django.db import models

class Car(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'car'
    
    def __str__(self):
        return self.name