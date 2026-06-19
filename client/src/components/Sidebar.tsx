import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, GraduationCap, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { path: '/app', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/courses', icon: <BookOpen size={20} />, label: 'Corsi' },
    { path: '/app/clients', icon: <Users size={20} />, label: 'Clienti B2B' },
    { path: '/app/students', icon: <GraduationCap size={20} />, label: 'Studenti' },
    { path: '/app/settings', icon: <Settings size={20} />, label: 'Impostazioni' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GraduationCap size={28} />
          <span>SkillForge</span>
        </div>
        {isOpen && (
          <button className="btn-icon mobile-menu-btn" onClick={onClose} style={{ marginLeft: 'auto' }}>
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) onClose();
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}