import React, { useState, useEffect } from 'react';
import { Menu, Bell, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h2 className="header-title">{title}</h2>
      </div>

      <div className="header-actions">
        <button className="btn-icon" onClick={toggleTheme} title="Cambia tema">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="btn-icon" title="Notifiche" onClick={() => alert('Nessuna nuova notifica')}>
          <Bell size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <button 
            className="btn-icon" 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            <User size={20} />
          </button>

          {showProfileMenu && (
            <div 
              className="card" 
              style={{ 
                position: 'absolute', 
                top: '100%', 
                right: 0, 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                minWidth: '200px', 
                zIndex: 1000 
              }}
            >
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Admin Demo</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@skillforge.demo</div>
              </div>
              <button 
                className="btn" 
                style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', color: 'var(--text-primary)' }}
                onClick={() => { setShowProfileMenu(false); navigate('/app/settings'); }}
              >
                <Settings size={16} /> Impostazioni
              </button>
              <button 
                className="btn" 
                style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', color: '#ef4444' }}
                onClick={() => { setShowProfileMenu(false); navigate('/'); }}
              >
                <LogOut size={16} /> Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}