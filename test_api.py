import requests
import json

base_url = "http://127.0.0.1:8000/api"
login_data = {"username": "admin_test", "password": "admin123"}

try:
    response = requests.post(f"{base_url}/login/", json=login_data)
    response.raise_for_status()
    token = response.json()["access"]
    print(f"Token obtained: {token[:10]}...")

    predict_data = {
        "symptoms": ["itching", "skin_rash", "nodal_skin_eruptions"]
    }
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    predict_response = requests.post(f"{base_url}/predict/", json=predict_data, headers=headers)
    predict_response.raise_for_status()
    print("Prediction Response:")
    print(json.dumps(predict_response.json(), indent=2))

except Exception as e:
    print(f"Error: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"Response Content: {e.response.text}")
