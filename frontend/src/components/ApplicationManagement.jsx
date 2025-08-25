import React, { useState, useEffect } from 'react';
import { candidatureService, utilisateurService } from '../services/api';
import { toast } from 'react-toastify';
import './ApplicationManagement.css';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [formData, setFormData] = useState({
    statut: 'EN_ATTENTE',
    suivi: '',
    etudiantId: '',
    programmeId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [applicationsData, usersData] = await Promise.all([
        candidatureService.getAll(),
        utilisateurService.getAll()
      ]);
      setApplications(applicationsData);
      setUsers(usersData.filter(user => user.role === 'ETUDIANT'));
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      statut: 'EN_ATTENTE',
      suivi: '',
      etudiantId: '',
      programmeId: ''
    });
    setEditingApplication(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingApplication) {
        await candidatureService.update(editingApplication.id, formData);
        toast.success('Candidature mise à jour avec succès');
      } else {
        await candidatureService.create(formData);
        toast.success('Candidature créée avec succès');
      }
      
      resetForm();
      loadData();
    } catch (error) {
      toast.error(editingApplication ? 'Erreur lors de la mise à jour' : 'Erreur lors de la création');
      console.error('Error saving application:', error);
    }
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
    setFormData({
      statut: application.statut || 'EN_ATTENTE',
      suivi: application.suivi || '',
      etudiantId: application.etudiantId || '',
      programmeId: application.programmeId || ''
    });
    setShowForm(true);
  };

  // NOUVELLE FONCTION : Modification rapide du statut
  const handleQuickStatusChange = async (applicationId, newStatus) => {
    try {
      const application = applications.find(app => app.id === applicationId);
      if (application) {
        const updatedApplication = { ...application, statut: newStatus };
        await candidatureService.update(applicationId, updatedApplication);
        toast.success(`Statut mis à jour : ${getStatusLabel(newStatus)}`);
        loadData(); // Recharger les données
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
      console.error('Error updating status:', error);
    }
  };

  // NOUVELLE FONCTION : Modification rapide du suivi
  const handleQuickSuiviChange = async (applicationId, newSuivi) => {
    try {
      const application = applications.find(app => app.id === applicationId);
      if (application) {
        const updatedApplication = { ...application, suivi: newSuivi };
        await candidatureService.update(applicationId, updatedApplication);
        toast.success('Suivi mis à jour');
        loadData(); // Recharger les données
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du suivi');
      console.error('Error updating suivi:', error);
    }
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      try {
        await candidatureService.delete(applicationId);
        toast.success('Candidature supprimée avec succès');
        loadData();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error('Error deleting application:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusLabel = (status) => {
    const statuses = {
      'EN_ATTENTE': 'En attente',
      'ACCEPTEE': 'Acceptée',
      'REFUSEE': 'Refusée',
      'EN_COURS': 'En cours',
      'TERMINEE': 'Terminée'
    };
    return statuses[status] || status;
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      'EN_ATTENTE': 'pending',
      'ACCEPTEE': 'accepted',
      'REFUSEE': 'rejected',
      'EN_COURS': 'in-progress',
      'TERMINEE': 'completed'
    };
    return statusClasses[status] || 'default';
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.prenom} ${user.nom}` : 'N/A';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des candidatures...</p>
      </div>
    );
  }

  return (
    <div className="application-management">
      <div className="application-management-header">
        <h2>Gestion des Candidatures</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Nouvelle Candidature
        </button>
      </div>

      {showForm && (
        <div className="application-form-overlay">
          <div className="application-form">
            <div className="form-header">
              <h3>{editingApplication ? 'Modifier la candidature' : 'Nouvelle candidature'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Étudiant *</label>
                  <select
                    name="etudiantId"
                    value={formData.etudiantId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionner un étudiant</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.prenom} {user.nom} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Programme ID *</label>
                  <input
                    type="number"
                    name="programmeId"
                    value={formData.programmeId}
                    onChange={handleInputChange}
                    placeholder="ID du programme"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Statut *</label>
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="ACCEPTEE">Acceptée</option>
                    <option value="REFUSEE">Refusée</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINEE">Terminée</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date de soumission</label>
                  <input
                    type="date"
                    name="dateSoumission"
                    value={formData.dateSoumission || new Date().toISOString().split('T')[0]}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Suivi</label>
                <textarea
                  name="suivi"
                  value={formData.suivi}
                  onChange={handleInputChange}
                  placeholder="Notes de suivi..."
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingApplication ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="applications-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Étudiant</th>
              <th>Programme ID</th>
              <th>Statut</th>
              <th>Date soumission</th>
              <th>Suivi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{getUserName(application.etudiantId)}</td>
                <td>{application.programmeId || 'N/A'}</td>
                <td>
                  {/* MODIFICATION RAPIDE DU STATUT */}
                  <select
                    className={`status-select-quick ${getStatusClass(application.statut)}`}
                    value={application.statut || 'EN_ATTENTE'}
                    onChange={(e) => handleQuickStatusChange(application.id, e.target.value)}
                    title="Cliquez pour modifier le statut rapidement"
                  >
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="ACCEPTEE">Acceptée</option>
                    <option value="REFUSEE">Refusée</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINEE">Terminée</option>
                  </select>
                </td>
                <td>{formatDate(application.dateSoumission)}</td>
                <td>
                  {/* MODIFICATION RAPIDE DU SUIVI */}
                  <div className="suivi-quick-edit">
                    <textarea
                      className="suivi-textarea-quick"
                      value={application.suivi || ''}
                      onChange={(e) => handleQuickSuiviChange(application.id, e.target.value)}
                      placeholder="Ajouter/modifier le suivi..."
                      rows="2"
                      title="Cliquez pour modifier le suivi rapidement"
                    />
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(application)}
                      title="Modifier la candidature complète"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(application.id)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {applications.length === 0 && (
          <div className="no-data">
            <p>Aucune candidature trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationManagement;
