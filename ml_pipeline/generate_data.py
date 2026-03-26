import pandas as pd
import random
import os
import json

disease_data = {
    "Fungal infection": {
        "symptoms": ["itching", "skin_rash", "nodal_skin_eruptions", "dischromic_patches"],
        "precautions": ["bathe twice", "use dettol or neem in bathing water", "keep infected area dry", "use clean cloths"]
    },
    "Allergy": {
        "symptoms": ["continuous_sneezing", "shivering", "chills", "watering_from_eyes"],
        "precautions": ["apply calamine", "cover area with bandage", "use ice to compress itching", "avoid scratching"]
    },
    "GERD": {
        "symptoms": ["stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough", "chest_pain"],
        "precautions": ["avoid fatty spicy food", "avoid lying down after eating", "maintain healthy weight", "exercise"]
    },
    "Chronic cholestasis": {
        "symptoms": ["itching", "vomiting", "yellowish_skin", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes"],
        "precautions": ["cold baths", "anti itch medicine", "consult doctor", "eat healthy"]
    },
    "Drug Reaction": {
        "symptoms": ["itching", "skin_rash", "stomach_pain", "burning_micturition", "spotting_ urination"],
        "precautions": ["stop irritation", "consult nearest hospital", "stop taking drug", "follow up"]
    },
    "Peptic ulcer disease": {
        "symptoms": ["vomiting", "loss_of_appetite", "abdominal_pain", "passage_of_gases", "internal_itching"],
        "precautions": ["avoid fatty spicy food", "consume probiotic food", "eliminate milk", "limit alcohol"]
    },
    "AIDS": {
        "symptoms": ["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"],
        "precautions": ["avoid open cuts", "wear ppe if possible", "consult doctor", "safe sex"]
    },
    "Diabetes ": {
        "symptoms": ["fatigue", "weight_loss", "restlessness", "lethargy", "irregular_sugar_level", "blurred_and_distorted_vision", "obesity", "excessive_hunger", "increased_appetite", "polyuria"],
        "precautions": ["have balanced diet", "exercise", "consult doctor", "follow up"]
    },
    "Gastroenteritis": {
        "symptoms": ["vomiting", "sunken_eyes", "dehydration", "diarrhoea"],
        "precautions": ["stop eating solid food for while", "try taking small sips of water", "rest", "ease back into eating"]
    },
    "Bronchial Asthma": {
        "symptoms": ["fatigue", "cough", "high_fever", "breathlessness", "family_history", "mucoid_sputum"],
        "precautions": ["switch to loose clothing", "take deep breaths", "get away from trigger", "seek help"]
    },
    "Hypertension ": {
        "symptoms": ["headache", "chest_pain", "dizziness", "loss_of_balance", "lack_of_concentration"],
        "precautions": ["meditation", "salt baths", "reduce stress", "get proper sleep"]
    },
    "Migraine": {
        "symptoms": ["acidity", "indigestion", "headache", "blurred_and_distorted_vision", "excessive_hunger", "stiff_neck", "depression", "irritability", "visual_disturbances"],
        "precautions": ["meditation", "reduce stress", "use polaroid glasses in sun", "consult doctor"]
    },
    "Cervical spondylosis": {
        "symptoms": ["back_pain", "weakness_in_limbs", "neck_pain", "dizziness", "loss_of_balance"],
        "precautions": ["use heating pad or cold pack", "exercise", "take otc pain reliver", "consult doctor"]
    },
    "Jaundice": {
        "symptoms": ["itching", "vomiting", "fatigue", "weight_loss", "high_fever", "yellowish_skin", "dark_urine", "abdominal_pain"],
        "precautions": ["drink plenty of water", "consume milk thistle", "eat fruits and high fiberous food", "medication"]
    },
    "Malaria": {
        "symptoms": ["chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "muscle_pain"],
        "precautions": ["Consult nearest hospital", "avoid oily food", "avoid non veg food", "keep mosquitos out"]
    },
    "Chicken pox": {
        "symptoms": ["itching", "skin_rash", "fatigue", "lethargy", "high_fever", "headache", "loss_of_appetite", "mild_fever", "swelled_lymph_nodes", "malaise", "red_spots_over_body"],
        "precautions": ["use neem in bathing water", "consume neem leaves", "take vaccine", "avoid public places"]
    },
    "Dengue": {
        "symptoms": ["skin_rash", "chills", "joint_pain", "vomiting", "fatigue", "high_fever", "headache", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "malaise", "muscle_pain", "red_spots_over_body"],
        "precautions": ["drink papaya leaf juice", "avoid fatty spicy food", "keep mosquitos away", "keep hydrated"]
    },
    "Typhoid": {
        "symptoms": ["chills", "vomiting", "fatigue", "high_fever", "headache", "nausea", "constipation", "abdominal_pain", "diarrhoea", "toxic_look_(typhos)", "belly_pain"],
        "precautions": ["eat high calorie vegitables", "antiboitic therapy", "consult doctor", "medication"]
    },
    "Tuberculosis": {
        "symptoms": ["chills", "vomiting", "fatigue", "weight_loss", "cough", "high_fever", "breathlessness", "sweating", "loss_of_appetite", "mild_fever", "yellowing_of_eyes", "swelled_lymph_nodes", "malaise", "phlegm", "chest_pain", "blood_in_sputum"],
        "precautions": ["cover mouth", "consult doctor", "medication", "rest"]
    },
    "Common Cold": {
        "symptoms": ["continuous_sneezing", "chills", "fatigue", "cough", "high_fever", "headache", "swelled_lymph_nodes", "malaise", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "loss_of_smell", "muscle_pain"],
        "precautions": ["drink vitamin c rich drinks", "take vapour", "avoid cold food", "keep fever in check"]
    },
    "Pneumonia": {
        "symptoms": ["chills", "fatigue", "cough", "high_fever", "breathlessness", "sweating", "malaise", "phlegm", "chest_pain", "fast_heart_rate", "rusty_sputum"],
        "precautions": ["consult doctor", "medication", "rest", "follow up"]
    },
    "Heart attack": {
        "symptoms": ["vomiting", "breathlessness", "sweating", "chest_pain"],
        "precautions": ["call ambulance", "chew or swallow asprin", "keep calm", "rest"]
    },
    "Covid": {
        "symptoms": ["fever", "cough", "loss_of_taste", "loss_of_smell", "breathlessness", "fatigue", "sore_throat"],
        "precautions": ["isolate yourself", "wear mask", "consult doctor", "rest"]
    }
}

dataset = []
all_symptoms = set()
for d, info in disease_data.items():
    for s in info["symptoms"]:
        all_symptoms.add(s)

all_symptoms = sorted(list(all_symptoms))

# Create 150 samples per disease
for disease, info in disease_data.items():
    symptoms_list = info["symptoms"]
    for _ in range(150):
        # randomly drop 0-2 symptoms to create variation
        num_drop = random.randint(0, min(2, len(symptoms_list)-1))
        dropped_symptoms = random.sample(symptoms_list, len(symptoms_list) - num_drop)
        
        row = {"disease": disease}
        for s in all_symptoms:
            if s in dropped_symptoms:
                row[s] = 1
            else:
                row[s] = 0
        dataset.append(row)

df = pd.DataFrame(dataset)

os.makedirs("data", exist_ok=True)
df.to_csv("data/disease_symptoms_dataset.csv", index=False)

precautions_data = {k: v["precautions"] for k, v in disease_data.items()}
with open("data/precautions.json", "w") as f:
    json.dump(precautions_data, f, indent=4)
    
print("Dataset generated successfully with", len(df), "records.")
