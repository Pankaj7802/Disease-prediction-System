import React from 'react';
import { Activity, Moon, Sun, Shield, LogOut, User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1.1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '0.6rem',
            borderRadius: '12px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <Activity size={24} />
          </div>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Medi<span className="text-gradient">Predict</span>
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-links">
            <a href="#" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Dashboard</a>
            
            <a 
              href="http://127.0.0.1:8000/admin/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'none', 
                color: 'var(--text-secondary)', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.95rem'
              }}
            >
              <Shield size={18} />
              Admin
            </a>
            
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                        <User size={16} color="var(--primary)" />
                        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{user.username}</span>
                    </div>
                    {user.date_joined && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                            <Calendar size={12} />
                            <span>Member since {formatDate(user.date_joined)}</span>
                        </div>
                    )}
                </div>
                <button onClick={logout} className="btn-icon" style={{ 
                  color: 'rgba(239, 68, 68, 0.8)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '10px'
                }} title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className="btn-icon" style={{ borderRadius: '10px' }} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
