import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, GraduationCap } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Student {
  id: string;
  name: string;
  email: string;
  company: string;
  progress: number;
  status: 'active' | 'inactive';
}

const initialStudents: Student[] = [
  { id: '1', name: 'Alessandro Neri', email: 'a.neri@techcorp.it', company: 'TechCorp S.p.A.', progress: 75, status: 'active' },
  { id: '2', name: 'Martina Gialli', email: 'm.gialli@innovate.it', company: 'Innovate S.r.l.', progress: 100, status: 'active' },
  { id: '3', name: 'Luca Marrone', email: 'l.marrone@globalservices.com', company: 'Global Services', progress: 30, status: 'inactive' },
];

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const [formData, setFormData] = useState<Partial<Student>>({});

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({ status: 'active', progress: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingStudent(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.company) {
      addToast('error', 'Compila tutti i campi obbligatori');
      return;
    }

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData } as Student : s));
      addToast('success', 'Studente aggiornato con successo');
    } else {
      const newStudent: Student = {
        ...formData as Student,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0
      };
      setStudents([...students, newStudent]);
      addToast('success', 'Nuovo studente aggiunto');
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo studente?')) {
      setStudents(students.filter(s => s.id !== id));
      addToast('info', 'Studente eliminato');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Studenti</h1>
          <p className="text-muted">Monitora i progressi degli iscritti ai corsi</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Nuovo Studente
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cerca per nome, email o azienda..."
              style={{ paddingLeft: '3rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={20} /> Filtra
          </button>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <GraduationCap className="empty-state-icon" />
            <h3>Nessun studente trovato</h3>
            <p>Prova a cambiare i termini di ricerca o aggiungi un nuovo studente.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Azienda</th>
                  <th>Progresso</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: 500 }}>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.company}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${student.progress}%`, background: student.progress === 100 ? '#10b981' : 'var(--accent)' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{student.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {student.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon" onClick={() => handleOpenModal(student)} title="Modifica">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon" onClick={() => handleDelete(student.id)} title="Elimina" style={{ color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={editingStudent ? 'Modifica Studente' : 'Nuovo Studente'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSave}>Salva Studente</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Nome Completo *</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="es. Alessandro Neri"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input 
            type="email" 
            className="form-input" 
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="es. a.neri@techcorp.it"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Azienda (Cliente B2B) *</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.company || ''}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            placeholder="es. TechCorp S.p.A."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stato</label>
          <select 
            className="form-select"
            value={formData.status || 'active'}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
          >
            <option value="active">Attivo</option>
            <option value="inactive">Inattivo</option>
          </select>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}