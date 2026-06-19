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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              SF
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>SkillForge</span>
          </div>
          {window.innerWidth <= 768 && (
            <button className="btn-icon" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Exact match for dashboard, startsWith for others to keep active state on sub-routes
            const isActive = item.path === '/app' ? location.pathname === '/app' : location.pathname.startsWith(item.path);
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

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              AD
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Admin Demo</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>admin@skillforge.demo</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!isSidebarOpen && (
              <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
              </button>
            )}
            <div className="search-bar" style={{ display: window.innerWidth <= 768 ? 'none' : 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem', width: '300px' }}>
              <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
              <input type="text" placeholder="Cerca ovunque..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <button className="btn-icon" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
              </button>
              
              {isNotificationsOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, width: '300px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, marginTop: '0.5rem' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Notifiche</div>
                  <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 500 }}>Nuovo studente iscritto</div>
                      <div style={{ color: 'var(--text-muted)' }}>Marco Rossi si è iscritto a React per Principianti</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>2 ore fa</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>Corso completato</div>
                      <div style={{ color: 'var(--text-muted)' }}>Laura Bianchi ha completato Node.js Master</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>5 ore fa</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                  AD
                </div>
              </button>

              {isProfileMenuOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, width: '200px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, marginTop: '0.5rem', padding: '0.5rem' }}>
                  <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', color: 'var(--text-primary)', marginBottom: '0.25rem' }} onClick={() => { navigate('/app/settings'); setIsProfileMenuOpen(false); }}>
                    <SettingsIcon size={16} style={{ marginRight: '0.5rem' }} /> Impostazioni
                  </button>
                  <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
                  <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', color: '#ef4444' }} onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Esci
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Demo Banner */}
        {!HAS_BACKEND && (
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.75rem 1.5rem', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
            <span><strong>Modalità Demo:</strong> I dati sono salvati localmente nel browser. Configura il backend per salvare i dati in modo permanente.</span>
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
