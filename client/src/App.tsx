import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Building2, Settings as SettingsIcon, Menu, X, LogOut, Bell, Search } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { Students } from './pages/Students';
import { Clients } from './pages/Clients';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { HAS_BACKEND } from './config';

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginTop: '10vh' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Si è verificato un problema</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              C'è stato un errore nel caricamento di questa sezione. 
              {this.state.error?.message && <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}>{this.state.error.message}</span>}
            </p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Ricarica l'applicazione
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/courses', label: 'Corsi', icon: BookOpen },
    { path: '/app/students', label: 'Studenti', icon: Users },
    { path: '/app/clients', label: 'Clienti B2B', icon: Building2 },
    { path: '/app/settings', label: 'Impostazioni', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">SF</div>
            <span className="logo-text">SkillForge</span>
          </div>
          {window.innerWidth <= 768 && (
            <button className="icon-btn" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">MR</div>
            <div className="user-info">
              <span className="user-name">Marco Rossi</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            {window.innerWidth <= 768 && (
              <button className="icon-btn" onClick={() => setIsSidebarOpen(true)} style={{ marginRight: '1rem' }}>
                <Menu size={20} />
              </button>
            )}
            <div className="search-bar">
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Cerca..." />
            </div>
          </div>

          <div className="header-right">
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                <Bell size={20} />
                <span className="notification-badge"></span>
              </button>
              {isNotificationsOpen && (
                <div className="dropdown-menu" style={{ right: 0, top: '100%', marginTop: '0.5rem', width: '300px' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Notifiche</div>
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Nessuna nuova notifica
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button 
                className="avatar" 
                style={{ cursor: 'pointer', border: 'none' }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                MR
              </button>
              {isProfileMenuOpen && (
                <div className="dropdown-menu" style={{ right: 0, top: '100%', marginTop: '0.5rem' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600 }}>Marco Rossi</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>marco@skillforge.com</div>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    <button 
                      className="dropdown-item" 
                      onClick={() => { navigate('/app/settings'); setIsProfileMenuOpen(false); }}
                    >
                      <SettingsIcon size={16} /> Impostazioni
                    </button>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                      style={{ color: '#ef4444' }}
                    >
                      <LogOut size={16} /> Esci
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Demo Banner */}
        {!HAS_BACKEND && (
          <div className="demo-banner">
            <span>Modalità demo - i dati sono locali. Scarica il codice e segui il README per attivare backend e database reali.</span>
          </div>
        )}

        {/* Page Content */}
        <div className="page-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/students" element={<Students />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/*" element={<AppLayout />} />
      </Routes>
    </ErrorBoundary>
  );
}
