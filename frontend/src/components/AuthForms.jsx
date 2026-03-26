import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, UserPlus, LogIn, AlertCircle, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const LoginForm = ({ onSwitch }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                login(data.access);
            } else {
                setError(data.detail || 'Invalid username or password');
            }
        } catch (err) {
            setError('System connection failure');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card glass animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ 
                    background: 'var(--gradient-primary)', 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '22px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1.5rem', 
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                    transform: 'rotate(-5deg)'
                }}>
                    <LogIn size={32} />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Enter credentials to access analysis</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>USERNAME</label>
                    <input 
                        type="text" 
                        className="input-field"
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="john_doe" 
                        required 
                    />
                    <User className="input-icon" size={20} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>PASSWORD</label>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="input-field"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                        />
                        <Lock className="input-icon" size={20} />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="animate-fade-in" style={{ 
                        color: 'var(--danger)', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-md)', 
                        marginBottom: '2rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <button type="submit" disabled={loading} className="btn btn-premium" style={{ width: '100%', display: 'flex', gap: '0.75rem' }}>
                    {loading ? 'Authenticating...' : (
                        <>
                            Secure Login
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                New to MediPredict? <span onClick={onSwitch} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}>Create Account</span>
            </div>
        </div>
    );
};

export const RegisterForm = ({ onSwitch }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm) return setError("Passwords don't match");
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password })
            });
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => onSwitch(), 2000);
            } else {
                const data = await response.json();
                setError(Object.values(data).flat().join(' '));
            }
        } catch (err) {
            setError('Connection failure');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-card glass animate-fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ background: 'var(--accent)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white' }}>
                    <UserPlus size={40} />
                </div>
                <h2 style={{ color: 'white', fontSize: '2rem' }}>Account Created!</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Redirecting to login portal...</p>
            </div>
        );
    }

    return (
        <div className="auth-card glass animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ 
                    background: 'var(--gradient-primary)', 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '22px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1.5rem', 
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                    transform: 'rotate(5deg)'
                }}>
                    <UserPlus size={32} />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join Us</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Start your health journey today</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>USERNAME</label>
                    <input type="text" className="input-field" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="Unique identifier" required />
                    <User className="input-icon" size={20} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>EMAIL ADDRESS</label>
                    <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@email.com" required />
                    <Mail className="input-icon" size={20} />
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>PASSWORD</label>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="input-field" 
                            value={formData.password} 
                            onChange={e => setFormData({...formData, password: e.target.value})} 
                            placeholder="••••••••" 
                            required 
                        />
                        <Lock className="input-icon" size={20} />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>CONFIRM PASSWORD</label>
                    <input type="password" className="input-field" value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})} placeholder="••••••••" required />
                    <Lock className="input-icon" size={20} />
                </div>

                {error && (
                    <div style={{ color: 'var(--danger)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <button type="submit" disabled={loading} className="btn btn-premium" style={{ width: '100%' }}>
                    {loading ? 'Processing...' : 'Register Account'}
                </button>
            </form>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Already have an account? <span onClick={onSwitch} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}>Login</span>
            </div>
        </div>
    );
};
