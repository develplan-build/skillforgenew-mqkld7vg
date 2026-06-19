import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { HAS_BACKEND } from '../config';
import { AlertTriangle, X } from 'lucide-react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(!HAS_BACKEND);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app') return 'Dashboard';
    if (path.includes('/courses')) return 'Gestione Corsi';
    if (path.includes('/clients')) return 'Clienti B2B';
    if (path.includes('/students')) return 'Studenti';
    if (path.includes('/settings')) return 'Impostazioni';
    return 'SkillForge';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-main)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {showDemoBanner && (
          <div className="demo-banner">
            <AlertTriangle size={16} />
            <span>Modalità Demo: i dati sono salvati localmente. Configura il backend per abilitare il database reale.</span>
            <button className="btn-icon" onClick={() => setShowDemoBanner(false)} style={{ padding: 0, color: 'inherit' }}>
              <X size={16} />
            </button>
          </div>
        )}
        
        <Header onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
        
        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}