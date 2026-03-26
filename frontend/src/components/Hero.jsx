import React from 'react';
import { Stethoscope } from 'lucide-react';

const Hero = () => {
  return (
    <section className="container animate-fade-in" style={{
      textAlign: 'center',
      padding: '4rem 0 3rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(59, 130, 246, 0.1)',
        color: 'var(--primary)',
        borderRadius: '50px',
        fontWeight: 600,
        fontSize: '0.875rem',
        marginBottom: '1rem'
      }}>
        <Stethoscope size={16} />
        <span>AI-Powered Health Assistant</span>
      </div>
      
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: 1.1
      }}>
        Predict Your Disease With <br/>
        <span className="text-gradient">Machine Learning</span>
      </h1>
      
      <p style={{
        fontSize: '1.125rem',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Enter your symptoms below to get instant insights into potential underlying conditions,
        along with AI-recommended precautions and steps to take.
      </p>
    </section>
  );
};

export default Hero;
