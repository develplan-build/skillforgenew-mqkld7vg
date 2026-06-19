import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Play } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate('/app');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            SF
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>SkillForge</span>
        </div>
        
        <div style={{ display: window.innerWidth <= 768 ? 'none' : 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => scrollToSection('features')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>Funzionalità</button>
          <button onClick={() => scrollToSection('pricing')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>Prezzi</button>
          <button onClick={() => scrollToSection('faq')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>FAQ</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleEnterApp} style={{ display: window.innerWidth <= 768 ? 'none' : 'flex' }}>Accedi</button>
          <button className="btn btn-primary" onClick={handleEnterApp}>Inizia Gratis</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', flex: 1 }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' }}>
          🚀 La nuova era della formazione aziendale
        </div>
        <h1 style={{ fontSize: window.innerWidth <= 768 ? '2.5rem' : '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Gestisci i tuoi corsi e clienti B2B in un'unica piattaforma.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          SkillForge è la soluzione all-in-one per creatori di corsi e aziende di formazione. Vendi, gestisci e monitora i progressi dei tuoi studenti con facilità.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }} onClick={handleEnterApp}>
            Apri la Dashboard <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
          <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }} onClick={() => scrollToSection('features')}>
            <Play size={20} style={{ marginRight: '0.5rem' }} /> Scopri come funziona
          </button>
        </div>
        
        {/* Hero Image/Mockup Placeholder */}
        <div style={{ marginTop: '4rem', position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <LayoutDashboard size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>Dashboard Preview</h3>
              <p>Clicca su "Apri la Dashboard" per esplorare l'app interattiva</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tutto ciò che ti serve per crescere</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Strumenti potenti progettati per semplificare la gestione della tua accademia online.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={24} color="var(--accent)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Gestione Corsi</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Crea, organizza e vendi i tuoi corsi con un'interfaccia intuitiva. Imposta prezzi, categorie e monitora le iscrizioni.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Users size={24} color="var(--accent)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Clienti B2B</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Gestisci le aziende clienti, assegna licenze in blocco e monitora i progressi dei loro dipendenti da un'unica dashboard.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <TrendingUp size={24} color="var(--accent)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Analisi Avanzate</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Prendi decisioni basate sui dati. Visualizza ricavi, tassi di completamento e metriche di engagement in tempo reale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Piani semplici e trasparenti</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Scegli il piano perfetto per le tue esigenze. Nessun costo nascosto.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Starter Plan */}
            <div className="card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Per chi sta iniziando</p>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>
                €49<span style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/mese</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Fino a 5 corsi</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> 500 studenti attivi</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Supporto via email</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '1rem' }} onClick={handleEnterApp}>Inizia con Starter</button>
            </div>

            {/* Pro Plan */}
            <div className="card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', border: '2px solid var(--accent)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600 }}>
                Più Popolare
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Per accademie in crescita</p>
              <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>
                €149<span style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/mese</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Corsi illimitati</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Studenti illimitati</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Gestione Clienti B2B</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><CheckCircle size={20} color="var(--accent)" /> Analisi avanzate</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={handleEnterApp}>Inizia con Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '4rem 2rem 2rem 2rem', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '2fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                SF
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>SkillForge</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px' }}>
              La piattaforma definitiva per creare, gestire e vendere i tuoi corsi online ad aziende e professionisti.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Prodotto</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><button onClick={() => scrollToSection('features')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Funzionalità</button></li>
              <li><button onClick={() => scrollToSection('pricing')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Prezzi</button></li>
              <li><button onClick={handleEnterApp} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>Accedi all'App</button></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Legale</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Termini di Servizio</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          © {new Date().getFullYear()} SkillForge. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
