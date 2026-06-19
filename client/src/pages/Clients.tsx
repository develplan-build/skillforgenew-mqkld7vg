import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Building2 } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  employees: number;
  status: 'active' | 'inactive';
}

const initialClients: Client[] = [
  { id: '1', name: 'TechCorp S.p.A.', contact: 'Mario Rossi', email: 'mario@techcorp.it', employees: 45, status: 'active' },
  { id: '2', name: 'Innovate S.r.l.', contact: 'Laura Bianchi', email: 'laura@innovate.it', employees: 12, status: 'active' },
  { id: '3', name: 'Global Services', contact: 'Giuseppe Verdi', email: 'g.verdi@globalservices.com', employees: 120, status: 'inactive' },
];

export function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const [formData, setFormData] = useState<Partial<Client>>({});

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData(client);
    } else {
      setEditingClient(null);
      setFormData({ status: 'active', employees: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingClient(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      addToast('error', 'Compila tutti i campi obbligatori');
      return;
    }

    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...formData } as Client : c));
      addToast('success', 'Cliente aggiornato con successo');
    } else {
      const newClient: Client = {
        ...formData as Client,
        id: Math.random().toString(36).substr(2, 9),
        employees: 0
      };
      setClients([...clients, newClient]);
      addToast('success', 'Nuovo cliente aggiunto');
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
      setClients(clients.filter(c => c.id !== id));
      addToast('info', 'Cliente eliminato');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Clienti B2B</h1>
          <p className="text-muted">Gestisci le aziende clienti e i loro dipendenti</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Nuovo Cliente
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cerca per nome azienda o email..."
              style={{ paddingLeft: '3rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={20} /> Filtra
          </button>
        </div>

        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <Building2 className="empty-state-icon" />
            <h3>Nessun cliente trovato</h3>
            <p>Prova a cambiare i termini di ricerca o aggiungi un nuovo cliente.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Azienda</th>
                  <th>Contatto</th>
                  <th>Email</th>
                  <th>Dipendenti</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td style={{ fontWeight: 500 }}>{client.name}</td>
                    <td>{client.contact}</td>
                    <td>{client.email}</td>
                    <td>{client.employees}</td>
                    <td>
                      <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {client.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon" onClick={() => handleOpenModal(client)} title="Modifica">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon" onClick={() => handleDelete(client.id)} title="Elimina" style={{ color: '#ef4444' }}>
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
        title={editingClient ? 'Modifica Cliente' : 'Nuovo Cliente'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSave}>Salva Cliente</button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Nome Azienda *</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="es. TechCorp S.p.A."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Referente</label>
          <input 
            type="text" 
            className="form-input" 
            value={formData.contact || ''}
            onChange={(e) => setFormData({...formData, contact: e.target.value})}
            placeholder="es. Mario Rossi"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input 
            type="email" 
            className="form-input" 
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="es. mario@techcorp.it"
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