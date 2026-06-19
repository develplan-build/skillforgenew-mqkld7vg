import React from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Gen', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'Mag', value: 6000 },
  { name: 'Giu', value: 7000 },
];

const completionData = [
  { name: 'Corso React', completati: 85, inCorso: 40 },
  { name: 'Node.js', completati: 65, inCorso: 55 },
  { name: 'UI/UX', completati: 45, inCorso: 30 },
  { name: 'Marketing', completati: 90, inCorso: 20 },
];

export function Dashboard() {
  return (
    <div>
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Studenti Attivi</span>
            <Users size={20} color="var(--accent)" />
          </div>
          <div className="kpi-value">1,248</div>
          <div className="kpi-trend trend-up">
            <ArrowUpRight size={16} />
            <span>+12% questo mese</span>
          </div>
        </div>
        
        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Corsi Completati</span>
            <GraduationCap size={20} color="var(--accent)" />
          </div>
          <div className="kpi-value">856</div>
          <div className="kpi-trend trend-up">
            <ArrowUpRight size={16} />
            <span>+5% questo mese</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Clienti B2B</span>
            <BookOpen size={20} color="var(--accent)" />
          </div>
          <div className="kpi-value">24</div>
          <div className="kpi-trend trend-up">
            <ArrowUpRight size={16} />
            <span>+2 nuovi clienti</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span>Ricavi Mensili</span>
            <TrendingUp size={20} color="var(--accent)" />
          </div>
          <div className="kpi-value">€12.450</div>
          <div className="kpi-trend trend-down">
            <ArrowDownRight size={16} />
            <span>-2% rispetto a ieri</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Andamento Iscrizioni</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Completamento Corsi</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  cursor={{ fill: 'var(--bg-hover)' }}
                />
                <Bar dataKey="completati" name="Completati" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inCorso" name="In Corso" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}