from django.contrib import admin
from .models import Prediction

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('predicted_disease', 'confidence', 'created_at')
    list_filter = ('predicted_disease', 'created_at')
    search_fields = ('symptoms', 'predicted_disease')
