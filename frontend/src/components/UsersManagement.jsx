import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch, FaFilter, FaUser, FaEnvelope, FaCalendar, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { userService, apiUtils } from '../services/apiService';

const UsersManagement = ({ users = [], onUpdateUser, onDeleteUser, onCreateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student',
    status: 'active'
  });

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAllUsers();
      const formattedUsers = response.map(user => apiUtils.formatUserData(user));
      setUsersData(formattedUsers);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setError(apiUtils.handleApiError(error));
      // Utiliser les données mock en cas d'erreur
      setUsersData([
        {
          id: 1,
          firstName: 'Ahmed',
          lastName: 'Benali',
          email: 'ahmed.benali@email.com',
          role: 'student',
          status: 'active',
          createdAt: '2024-01-15',
          lastLogin: '2024-01-20'
        },
        {
          id: 2,
          firstName: 'Fatima',
          lastName: 'Zahra',
          email: 'fatima.zahra@email.com',
          role: 'student',
          status: 'active',
          createdAt: '2024-01-10',
          lastLogin: '2024-01-19'
        },
        {
          id: 3,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@diravenir.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          lastLogin: '2024-01-20'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'student',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData);
        if (onUpdateUser) onUpdateUser(editingUser.id, formData);
      } else {
        await userService.createUser(formData);
        if (onCreateUser) onCreateUser(formData);
      }
      setShowModal(false);
      loadUsers(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError(apiUtils.handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setLoading(true);
      try {
        await userService.deleteUser(userId);
        if (onDeleteUser) onDeleteUser(userId);
        loadUsers(); // Recharger la liste
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError(apiUtils.handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'counselor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="users-management">
      {/* Header avec actions */}
      <div className="management-header">
        <div className="header-left">
          <h2>Gestion des Utilisateurs</h2>
          <p>Gérez tous les utilisateurs du système</p>
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleCreate} disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : <FaPlus />} 
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="management-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les rôles</option>
            <option value="student">Étudiants</option>
            <option value="admin">Administrateurs</option>
            <option value="counselor">Conseillers</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="data-table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">Utilisateur</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Rôle</div>
            <div className="table-cell">Statut</div>
            <div className="table-cell">Créé le</div>
            <div className="table-cell">Actions</div>
          </div>
        </div>
        <div className="table-body">
          {loading ? (
            <div className="loading-row">
              <div className="loading-spinner">
                <FaSpinner className="spinner" />
                <span>Chargement des utilisateurs...</span>
              </div>
            </div>
          ) : (
            filteredUsers.map((user) => (
            <div key={user.id} className="table-row">
              <div className="table-cell">
                <div className="user-info">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.firstName} {user.lastName}</div>
                    <div className="user-id">ID: {user.id}</div>
                  </div>
                </div>
              </div>
              <div className="table-cell">
                <div className="email-cell">
                  <FaEnvelope className="email-icon" />
                  {user.email}
                </div>
              </div>
              <div className="table-cell">
                <span className={`role-badge ${getRoleColor(user.role)}`}>
                  {user.role === 'student' ? 'Étudiant' : 
                   user.role === 'admin' ? 'Admin' : 
                   user.role === 'counselor' ? 'Conseiller' : user.role}
                </span>
              </div>
              <div className="table-cell">
                <span className={`status-badge ${getStatusColor(user.status)}`}>
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="table-cell">
                <div className="date-cell">
                  <FaCalendar className="date-icon" />
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <div className="table-cell">
                <div className="action-buttons">
                  <button 
                    className="btn-action view"
                    onClick={() => handleEdit(user)}
                    title="Voir/Modifier"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="btn-action edit"
                    onClick={() => handleEdit(user)}
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-action delete"
                    onClick={() => handleDelete(user.id)}
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de création/édition */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student">Étudiant</option>
                  <option value="admin">Administrateur</option>
                  <option value="counselor">Conseiller</option>
                </select>
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
