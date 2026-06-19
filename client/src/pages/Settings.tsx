import React, { useState } from 'react';
import { Save, User, Bell, Shield, CreditCard, CheckCircle } from 'lucide-react';
import { useToast, ToastContainer } from '../components/Toast';

export function Settings() {
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: 'Admin Demo',
    email: 'admin@skillforge.demo',
    company: 'SkillForge Inc.',
    role: 'Amministratore'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newStudents: true,
    courseCompletion: false,
    marketing: false
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Profilo aggiornato con successo');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Preferenze di notifica salvate');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('error', 'Le nuove password non coincidono');
      return;
    }
    if (passwords.new.length < 8) {
      addToast('error', 'La password deve contenere almeno 8 caratteri');
      return;
    }
    addToast('success', 'Password aggiornata con successo');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleUpgradePlan = () => {
    addToast('success', 'Richiesta di upgrade inviata. Un nostro consulente ti contatterà a breve.');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Impostazioni</h1>
        <p className="text-muted">Gestisci il tuo account e le preferenze dell'applicazione</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
        <div style={{ width: window.innerWidth <= 768 ? '100%' : '250px' }}>
          <div className="card" style={{ padding: '0.5rem' }}>
            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : ''}`} 
              style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem', background: activeTab === 'profile' ? 'var(--accent)' : 'transparent', color: activeTab === 'profile' ? 'white' : 'var(--text-primary)' }}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profilo
            </button>
            <button 
              className={`btn ${activeTab === 'notifications' ? 'btn-primary' : ''}`} 
              style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem', background: activeTab === 'notifications' ? 'var(--accent)' : 'transparent', color: activeTab === 'notifications' ? 'white' : 'var(--text-primary)' }}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifiche
            </button>
            <button 
              className={`btn ${activeTab === 'security' ? 'btn-primary' : ''}`} 
              style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem', background: activeTab === 'security' ? 'var(--accent)' : 'transparent', color: activeTab === 'security' ? 'white' : 'var(--text-primary)' }}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Sicurezza
            </button>
            <button 
              className={`btn ${activeTab === 'billing' ? 'btn-primary' : ''}`} 
              style={{ width: '100%', justifyContent: 'flex-start', background: activeTab === 'billing' ? 'var(--accent)' : 'transparent', color: activeTab === 'billing' ? 'white' : 'var(--text-primary)' }}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> Fatturazione
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>Informazioni Profilo</h3>
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={profileData.name}
                    onChange={e => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={profileData.email}
                    onChange={e => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Azienda</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={profileData.company}
                    onChange={e => setProfileData({...profileData, company: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ruolo</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={profileData.role}
                    disabled
                    style={{ opacity: 0.7 }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <Save size={18} /> Salva Modifiche
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>Preferenze Notifiche</h3>
              <form onSubmit={handleSaveNotifications}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={notifications.emailAlerts}
                      onChange={e => setNotifications({...notifications, emailAlerts: e.target.checked})}
                      style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent)' }}
                    />
                    <span>Ricevi alert via email per errori di sistema</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={notifications.newStudents}
                      onChange={e => setNotifications({...notifications, newStudents: e.target.checked})}
                      style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent)' }}
                    />
                    <span>Notificami quando un nuovo studente si iscrive</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={notifications.courseCompletion}
                      onChange={e => setNotifications({...notifications, courseCompletion: e.target.checked})}
                      style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent)' }}
                    />
                    <span>Notificami quando uno studente completa un corso</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={notifications.marketing}
                      onChange={e => setNotifications({...notifications, marketing: e.target.checked})}
                      style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent)' }}
                    />
                    <span>Ricevi comunicazioni di marketing e novità</span>
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <Save size={18} /> Salva Preferenze
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>Cambio Password</h3>
              <form onSubmit={handleUpdatePassword}>
                <div className="form-group">
                  <label className="form-label">Password Attuale</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={passwords.current}
                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nuova Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={passwords.new}
                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Conferma Nuova Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <Shield size={18} /> Aggiorna Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>Piano Attuale</h3>
              <div style={{ padding: '1.5rem', border: '1px solid var(--accent)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--accent-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--accent)' }}>Piano Pro</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Fatturazione mensile</p>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>€149/mese</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> Studenti illimitati</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> Clienti B2B illimitati</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> Analisi avanzate</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> API e integrazioni</li>
                </ul>
              </div>
              
              <h3 style={{ marginBottom: '1rem' }}>Metodo di Pagamento</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '2rem' }}>
                <CreditCard size={24} color="var(--text-muted)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>Visa terminante in 4242</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Scade il 12/2025</div>
                </div>
                <button className="btn btn-secondary" onClick={() => addToast('info', 'Funzionalità di modifica carta simulata')}>Modifica</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Hai bisogno di più risorse?</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Passa al piano Enterprise per supporto dedicato.</div>
                </div>
                <button className="btn btn-primary" onClick={handleUpgradePlan}>Richiedi Upgrade</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}