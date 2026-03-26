from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from .models import Prediction
import joblib
import json
import os
import pandas as pd

# Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# User Profile View
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# Load Model and Encoders
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_DIR = os.path.join(os.path.dirname(BASE_DIR), 'ml_pipeline')
MODEL_PATH = os.path.join(ML_DIR, 'models', 'rf_model.pkl')
SYMPTOMS_PATH = os.path.join(ML_DIR, 'models', 'symptoms_list.pkl')
PRECAUTIONS_PATH = os.path.join(ML_DIR, 'data', 'precautions.json')

try:
    model = joblib.load(MODEL_PATH)
    symptoms_list = joblib.load(SYMPTOMS_PATH)
    with open(PRECAUTIONS_PATH, 'r') as f:
        precautions_dict = json.load(f)
except Exception as e:
    model = None
    symptoms_list = []
    precautions_dict = {}
    print(f"Error loading model: {e}")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_disease(request):
    if not model:
        return Response({'error': 'Model not loaded. Please train the model.'}, status=500)
    
    selected_symptoms = request.data.get('symptoms', [])
    
    if not selected_symptoms:
         return Response({'error': 'No symptoms provided.'}, status=400)
         
    # Prepare input vector array exactly matching symptoms list
    input_data = {}
    for s in symptoms_list:
        input_data[s] = 1 if s in selected_symptoms else 0
        
    df = pd.DataFrame([input_data])
    
    # Predict
    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]
    confidence = float(max(probabilities))
    
    # Save to Database (linked to user)
    Prediction.objects.create(
        user=request.user,
        symptoms=", ".join(selected_symptoms),
        predicted_disease=prediction,
        confidence=confidence
    )
    
    precautions = precautions_dict.get(prediction, [])
    
    return Response({
        'disease': prediction,
        'probability': confidence,
        'precautions': precautions
    })
