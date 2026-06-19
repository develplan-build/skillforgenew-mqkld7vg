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
          Gestisci i tuoi corsi e clienti B2B in un'unica piattaforma
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          SkillForge ti permette di creare, vendere e monitorare corsi di formazione per le aziende. Tutto il necessario per scalare il tuo business formativo.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleEnterApp} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Apri la Dashboard <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToSection('features')} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Scopri le funzionalità <Play size={20} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Tutto ciò che ti serve</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>Strumenti potenti progettati per formatori professionisti e agenzie.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Gestione Corsi</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Crea percorsi formativi, organizza moduli e lezioni, e monitora i progressi degli studenti in tempo reale.</p>
            </div>
            
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Clienti B2B</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Gestisci le aziende clienti, assegna licenze in blocco e fornisci report dettagliati ai referenti HR.</p>
            </div>
            
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Analisi Avanzate</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Dashboard intuitive per monitorare ricavi, tassi di completamento e l'engagement degli studenti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Piani Semplici e Trasparenti</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Inizia gratis, passa a pro quando cresci.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '350px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Starter</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>€0<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mese</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> Fino a 50 studenti</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> 3 corsi attivi</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> Supporto email</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleEnterApp}>Inizia Gratis</button>
            </div>
            
            <div className="card" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '350px', textAlign: 'left', border: '2px solid var(--accent)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600 }}>Popolare</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>€49<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mese</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> Studenti illimitati</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> Corsi illimitati</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> Gestione clienti B2B</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="var(--accent)" /> API e integrazioni</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleEnterApp}>Prova Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: 'var(--accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
              SF
            </div>
            <span style={{ fontWeight: 600 }}>SkillForge</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} SkillForge. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
