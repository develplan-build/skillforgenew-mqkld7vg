import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, BookOpen } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Course {
  id: string;
  title: string;
  category: string;
  students: number;
  price: number;
  status: 'active' | 'draft';
}

const initialCourses: Course[] = [
  { id: '1', title: 'React per Principianti', category: 'Sviluppo Web', students: 1250, price: 49, status: 'active' },
  { id: '2', title: 'Master in Node.js', category: 'Sviluppo Backend', students: 850, price: 89, status: 'active' },
  { id: '3', title: 'UI/UX Design Avanzato', category: 'Design', students: 420, price: 69, status: 'draft' },
];

export function Courses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // Form state
  const [formData, setFormData] = useState<Partial<Course>>({});

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({ status: 'draft', students: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingCourse(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.price) {
      addToast('error', 'Compila tutti i campi obbligatori');
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } as Course : c));
      addToast('success', 'Corso aggiornato con successo');
    } else {
      const newCourse: Course = {
        ...formData as Course,
        id: Math.random().toString(36).substr(2, 9),
        students: 0
      };
      setCourses([...courses, newCourse]);
      addToast('success', 'Nuovo corso creato');
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo corso?')) {
      setCourses(courses.filter(c => c.id !== id));
      addToast('info', 'Corso eliminato');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Gestione Corsi</h1>
          <p className="text-muted">Crea e gestisci il tuo catalogo formativo</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Nuovo Corso
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cerca per titolo o categoria..."
              style={{ paddingLeft: '3rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={20} /> Filtra
          </button>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <BookOpen className="empty-state-icon" />
            <h3>Nessun corso trovato</h3>
            <p>Prova a cambiare i termini di ricerca o crea un nuovo corso.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Titolo</th>
                  <th>Categoria</th>
                  <th>Prezzo</th>
                  <th>Studenti</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id}>
                    <td style={{ fontWeight: 500 }}>{course.title}</td>
                    <td>{course.category}</td>
                    <td>€{course.price}</td>
                    <td>{course.students}</td>
                    <td>
                      <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {course.status === 'active' ? 'Attivo' : 'Bozza'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon" onClick={() => handleOpenModal(course)} title="Modifica">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon" onClick={() => handleDelete(course.id)} title="Elimina" style={{ color: '#ef4444' }}>
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
        title={editingCourse ? 'Modifica Corso' : 'Nuovo Corso'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSave}>Salva Corso</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Titolo del Corso *</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.title || ''}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="es. React per Principianti"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Categoria *</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.category || ''}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            placeholder="es. Sviluppo Web"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Prezzo (€) *</label>
            <input 
              type="number" 
              className="form-input" 
              value={formData.price || ''}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Stato</label>
            <select 
              className="form-select"
              value={formData.status || 'draft'}
              onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'draft'})}
            >
              <option value="draft">Bozza</option>
              <option value="active">Attivo</option>
            </select>
          </div>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}