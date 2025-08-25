import React, { useState, useEffect } from 'react';
import { utilisateurService } from '../services/api';
import { toast } from 'react-toastify';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: 'ETUDIANT',
    languePreferee: 'FR',
    compteActif: true
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await utilisateurService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs');
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      role: 'ETUDIANT',
      languePreferee: 'FR',
      compteActif: true
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        await utilisateurService.update(editingUser.id, formData);
        toast.success('Utilisateur mis à jour avec succès');
      } else {
        await utilisateurService.create(formData);
        toast.success('Utilisateur créé avec succès');
      }
      
      resetForm();
      loadUsers();
    } catch (error) {
      toast.error(editingUser ? 'Erreur lors de la mise à jour' : 'Erreur lors de la création');
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nom: user.nom || '',
      prenom: user.prenom || '',
      email: user.email || '',
      role: user.role || 'ETUDIANT',
      languePreferee: user.languePreferee || 'FR',
      compteActif: user.compteActif !== undefined ? user.compteActif : true
    });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await utilisateurService.delete(userId);
        toast.success('Utilisateur supprimé avec succès');
        loadUsers();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error('Error deleting user:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getRoleLabel = (role) => {
    const roles = {
      'ETUDIANT': 'Étudiant',
      'CONSEILLER': 'Conseiller',
      'ADMIN': 'Administrateur'
    };
    return roles[role] || role;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>Gestion des Utilisateurs</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Nouvel Utilisateur
        </button>
      </div>

      {showForm && (
        <div className="user-form-overlay">
          <div className="user-form">
            <div className="form-header">
              <h3>{editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rôle *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="ETUDIANT">Étudiant</option>
                    <option value="CONSEILLER">Conseiller</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Langue préférée</label>
                  <select
                    name="languePreferee"
                    value={formData.languePreferee}
                    onChange={handleInputChange}
                  >
                    <option value="FR">Français</option>
                    <option value="EN">English</option>
                    <option value="AR">العربية</option>
                  </select>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="compteActif"
                      checked={formData.compteActif}
                      onChange={handleInputChange}
                    />
                    Compte actif
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Langue</th>
              <th>Statut</th>
              <th>Date création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role?.toLowerCase()}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td>{user.languePreferee || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${user.compteActif ? 'active' : 'inactive'}`}>
                    {user.compteActif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>{formatDate(user.dateCreation)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
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
        
        {users.length === 0 && (
          <div className="no-data">
            <p>Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
