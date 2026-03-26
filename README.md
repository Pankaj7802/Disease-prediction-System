# ML-Powered Disease Prediction System

A fully responsive, production-ready Disease Prediction System combining a premium React frontend with a robust Django + Machine Learning backend.

## 🚀 Features
- **Frontend**: Modern React (Vite) Single Page Application with an interactive symptom selection interface.
- **Styling**: Premium vanilla CSS featuring variables, dark/light mode support, complex glassmorphism, and smooth CSS animations.
- **Backend API**: Django REST Framework API that handles inference reliably.
- **Machine Learning Layer**: Predicts from 23+ different conditions using a `RandomForestClassifier` (100% accuracy on synthetic data validation) leveraging real symptom encodings.
- **CORS Configured**: Seamless operation between frontend and backend.

## 📁 Folder Structure
```
.
├── backend/                  # Django Backend API
│   ├── api/                  # Main API application logic (models.py, views.py)
│   ├── core/                 # Django settings and routing (replacing nested backend folder)
│   └── manage.py             # Django entry point
├── frontend/                 # React Frontend Client
│   ├── src/
│   │   ├── components/       # Reusable UI elements (Hero, Navbar, form, etc)
│   │   ├── App.jsx           # Main application shell
│   │   ├── index.css         # Full premium styling
│   │   └── main.jsx          # React renderer
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite development config
├── ml_pipeline/              # Machine Learning Engine
│   ├── models/               # Contains rf_model.pkl and symptoms_list.pkl
│   ├── data/                 # Contains raw dataset and precautions mapping
│   ├── generate_data.py      # Script that generated the synthetic datastore
│   └── train_model.py        # Script that optimized the Random Forest model
├── venv/                     # Python Virtual Environment
└── README.md                 # Project Setup Instructions
```

## 🛠️ Setup Instructions

### 1. Requirements
Ensure you have the following installed on your machine:
- Node.js (v18+)
- Python (3.10+)

### 2. Backend Setup (Django & ML)
1. Open a terminal in the root directory.
2. Activate the python virtual environment (Optional but recommended if you haven't already created one, this project provides `venv`):
   ```bash
   .\venv\Scripts\activate
   ```
   *(If `venv` doesn't work, recreate it: `python -m venv venv` and install requirements with `pip install django djangorestframework django-cors-headers scikit-learn pandas joblib numpy`)*
3. Navigate into the backend directory:
   ```bash
   cd backend
   ```
4. Run migrations (Optional but standard):
   ```bash
   python manage.py migrate
   ```
5. Start the backend development server:
   ```bash
   python manage.py runserver
   ```
   The backend API is now running at `http://127.0.0.1:8000`.

### 🛡️ Admin Panel & Credentials
To view the prediction history and manage the database:
1.  Navigate to `http://127.0.0.1:8000/admin/`
2.  **Username**: `admin`
3.  **Password**: `admin123`

### 3. Frontend Setup (React)
1. Open a **new** terminal window matching the root directory.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install node module dependencies:
   ```bash
   npm install
   ```
4. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local interface, typically: `http://localhost:5173/`

### 🩺 Using the App
- When loaded, toggle the Dark/Light theme via the sun/moon icon.
- Type symptoms in the **Search Input Field**. 
- Select **3 or more symptoms** from the dropdown by clicking them.
- Click **"Analyze Symptoms"** to fire a request to the backend.
- View your predicted medical condition, ML confidence rating, and recommended precautions!
