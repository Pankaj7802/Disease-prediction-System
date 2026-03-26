import React from 'react';
import { Activity, Thermometer, ShieldCheck, AlertCircle } from 'lucide-react';

const ResultCard = ({ result, isLoading, error }) => {
  
  if (isLoading) {
    return (
      <div className="glass animate-fade-in" style={{
        padding: '3rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '4px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '50%',
          }}></div>
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '4px solid var(--primary)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <Activity size={32} color="var(--primary)" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Analyzing Medical Data...</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Our AI is evaluating your symptoms against medical records.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass animate-fade-in" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--danger)',
        background: 'rgba(239, 68, 68, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--danger)', marginBottom: '1rem' }}>
          <AlertCircle size={28} />
          <h3 style={{ margin: 0 }}>Analysis Failed</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="glass animate-fade-in animate-delay-2" style={{
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--primary)'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--gradient-primary)',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.2)',
          padding: '0.75rem',
          borderRadius: '50%',
          marginBottom: '1rem'
        }}>
          <Thermometer size={32} />
        </div>
        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
          Predicted Condition
        </p>
        <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800 }}>
          {result.disease}
        </h2>
        
        {result.probability && (
          <div style={{
            marginTop: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            Confidence Score: {(result.probability * 100).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Precautions Body */}
      {result.precautions && result.precautions.length > 0 && (
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <ShieldCheck size={24} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Recommended Precautions</h3>
          </div>
          
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {result.precautions.map((precaution, index) => precaution && (
              <li key={index} className="animate-fade-in" style={{
                animationDelay: `${0.1 * (index + 1)}s`,
                background: 'var(--bg-color)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid var(--border-color)',
                fontWeight: 500
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700
                }}>
                  {index + 1}
                </div>
                {precaution.charAt(0).toUpperCase() + precaution.slice(1)}
              </li>
            ))}
          </ul>
          
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.05)',
            borderLeft: '4px solid var(--danger)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            <strong>Disclaimer:</strong> This prediction is based on machine learning models and is not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
