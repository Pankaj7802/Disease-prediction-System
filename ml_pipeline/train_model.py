import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

print("Loading dataset...")
df = pd.read_csv("data/disease_symptoms_dataset.csv")

X = df.drop(columns=["disease"])
y = df["disease"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Random Forest Classifier...")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {acc*100:.2f}%")

# Save model and symptom names
os.makedirs("models", exist_ok=True)
joblib.dump(clf, "models/rf_model.pkl")
joblib.dump(list(X.columns), "models/symptoms_list.pkl")

print("Model and symptoms list saved in 'models/' directory.")
