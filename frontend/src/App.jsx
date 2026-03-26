import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SymptomForm from './components/SymptomForm';
import ResultCard from './components/ResultCard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm, RegisterForm } from './components/AuthForms';

function MainContent() {
  const { user, token, loading } = useAuth();
  const [theme, setTheme] = useState('dark');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handlePredict = async (dims) => {
    setIsLoading(true);
    setPredictionResult(null);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dims),
      });
      
      if (!response.ok) {
        throw new Error('Prediction failed. Ensure the server is running and you are logged in.');
      }
      
      const responseData = await response.json();
      setTimeout(() => {
        setPredictionResult(responseData);
        setIsLoading(false);
      }, 800);
      
    } catch (err) {
      setTimeout(() => {
        setError(err.message || "An error occurred during prediction.");
        setIsLoading(false);
      }, 500);
    }
  };

  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}><h2>Loading MediPredict...</h2></div>;

  if (!user) {
    return (
      <div className="auth-page">
        <div className="mesh-gradient"></div>
        <nav style={{ position: 'absolute', top: '2rem', textAlign: 'center', width: '100%', zIndex: 20 }}>
            <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>
              Medi<span className="text-gradient">Predict</span>
            </h2>
        </nav>
        <main style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            {showRegister ? (
                <RegisterForm onSwitch={() => setShowRegister(false)} />
            ) : (
                <LoginForm onSwitch={() => setShowRegister(true)} />
            )}
        </main>
        <footer style={{ position: 'absolute', bottom: '2rem', textAlign: 'center', width: '100%', color: 'var(--text-secondary)', zIndex: 20 }}>
            <p>© 2026 MediPredict AI • Advanced Diagnosis System</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        
        <div id="predict" className="container animate-fade-in animate-delay-1" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '2rem',
          paddingBottom: '4rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%'
          }}>
            <SymptomForm onSubmit={handlePredict} isLoading={isLoading} />
            
            {(isLoading || predictionResult || error) && (
              <ResultCard 
                result={predictionResult} 
                isLoading={isLoading} 
                error={error} 
              />
            )}
          </div>
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto'
      }}>
        <div className="container">
          <p>© 2026 MediPredict. AI Disease Prediction System.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
