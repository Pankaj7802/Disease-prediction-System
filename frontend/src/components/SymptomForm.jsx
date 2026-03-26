import React, { useState } from 'react';
import { Search, Plus, X, AlertCircle } from 'lucide-react';

const commonSymptoms = [
  "itching", "skin_rash", "continuous_sneezing", "shivering", "chills", "joint_pain",
  "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition",
  "spotting_ urination", "fatigue", "weight_loss", "restlessness", "lethargy", "patches_in_throat",
  "irregular_sugar_level", "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating",
  "dehydration", "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea",
  "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea",
  "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload",
  "swelling_of_stomach", "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm",
  "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain",
  "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
  "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising", "obesity", "swollen_legs",
  "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
  "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain",
  "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness",
  "spinning_movements", "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell",
  "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching",
  "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
  "belly_pain", "abnormal_menstruation", "dischromic_patches", "watering_from_eyes", "increased_appetite",
  "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances",
  "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
  "history_of_alcohol_consumption", "fluid_overload", "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
  "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting",
  "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

// Formatting helper
const formatSymptom = (s) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const SymptomForm = ({ onSubmit, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [error, setError] = useState('');
  
  // Filter symptoms based on search term
  const filteredSymptoms = commonSymptoms.filter(s => 
    s.replace(/_/g, ' ').toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedSymptoms.includes(s)
  ).slice(0, 10); // Show max 10 suggestions

  const addSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSearchTerm('');
      setError('');
    }
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length < 3) {
      setError('Please select at least 3 symptoms for an accurate prediction.');
      return;
    }
    onSubmit({ symptoms: selectedSymptoms });
  };

  return (
    <div className="glass" style={{
      padding: '2rem',
      borderRadius: 'var(--radius-lg)'
    }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Enter Your Details</h3>
      
      <form onSubmit={handleSubmit}>
      
        {/* Search Input Container */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 1rem',
            transition: 'all 0.2s ease',
          }}>
            <Search size={20} color="var(--text-secondary)" style={{ marginRight: '0.75rem' }} />
            <input 
              type="text" 
              placeholder="Search symptoms (e.g., headache, fever)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                padding: '0.5rem 0'
              }}
            />
          </div>
          
          {/* Suggestions Dropdown */}
          {searchTerm && filteredSymptoms.length > 0 && (
            <div className="glass animate-fade-in" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              maxHeight: '250px',
              overflowY: 'auto',
              borderRadius: 'var(--radius-md)',
              zIndex: 10,
              boxShadow: 'var(--shadow-lg)'
            }}>
              {filteredSymptoms.map((s) => (
                <div 
                  key={s} 
                  onClick={() => addSymptom(s)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  {formatSymptom(s)}
                  <Plus size={16} color="var(--primary)" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Symptoms Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {selectedSymptoms.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              No symptoms selected yet.
            </p>
          )}
          {selectedSymptoms.map((s) => (
            <div key={s} className="animate-fade-in" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.15)',
              color: 'var(--primary)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}>
              {formatSymptom(s)}
              <X 
                size={16} 
                style={{ cursor: 'pointer' }} 
                onClick={() => removeSymptom(s)} 
              />
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="animate-fade-in" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--danger)',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
             fontSize: '0.9rem',
             fontWeight: 500
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading || selectedSymptoms.length === 0}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.125rem',
            opacity: (isLoading || selectedSymptoms.length === 0) ? 0.7 : 1,
            cursor: (isLoading || selectedSymptoms.length === 0) ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Predicting...
            </>
          ) : (
            'Analyze Symptoms'
          )}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
