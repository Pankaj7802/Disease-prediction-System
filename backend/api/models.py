from django.db import models
from django.contrib.auth.models import User

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='predictions', null=True, blank=True)
    symptoms = models.TextField()
    predicted_disease = models.CharField(max_length=200)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.predicted_disease} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
