import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaDownload,
  FaUserPlus,
  FaUserEdit,
  FaUserTimes
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [page, searchTerm, filterRole]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('👥 Chargement des utilisateurs...');
      
      const params = {
        page: page - 1,
        limit: 10,
        filter: searchTerm,
        role: filterRole !== 'all' ? filterRole : undefined
      };
      
      const response = await adminApiService.getUsers(params);
      setUsers(response.items || []);
      setTotalPages(Math.ceil((response.total || 0) / 10));
      
      console.log('✅ Utilisateurs chargés:', response);
    } catch (err) {
      console.error('❌ Erreur chargement utilisateurs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      console.log('➕ Création utilisateur...', userData);
      await adminApiService.createUser(userData);
      setShowCreateModal(false);
      loadUsers(); // Recharger la liste
    } catch (err) {
      console.error('❌ Erreur création utilisateur:', err);
      setError(err.message);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      console.log('✏️ Modification utilisateur...', id, userData);
      await adminApiService.updateUser(id, userData);
      setShowEditModal(false);
      setSelectedUser(null);
      loadUsers(); // Recharger la liste
    } catch (err) {
      console.error('❌ Erreur modification utilisateur:', err);
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        console.log('🗑️ Suppression utilisateur...', id);
        await adminApiService.deleteUser(id);
        loadUsers(); // Recharger la liste
      } catch (err) {
        console.error('❌ Erreur suppression utilisateur:', err);
        setError(err.message);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  const handleFilterChange = (newFilter) => {
    setFilterRole(newFilter);
    setPage(1);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">⏳</div>
          <h3 className="admin-empty-state-title">Chargement...</h3>
          <p className="admin-empty-state-description">Récupération des utilisateurs</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">❌</div>
          <h3 className="admin-empty-state-title">Erreur de connexion</h3>
          <p className="admin-empty-state-description">{error}</p>
          <button className="admin-btn admin-btn-primary admin-mt-lg" onClick={loadUsers}>
            Réessayer
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="admin-flex admin-justify-between admin-items-center admin-mb-xl">
          <div>
            <h1 className="admin-page-title">Gestion des Utilisateurs</h1>
            <p style={{ color: 'var(--gray-600)', marginTop: 'var(--spacing-sm)' }}>
              Gérez les utilisateurs de la plateforme DirAvenir
            </p>
          </div>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus />
            <span>Nouvel Utilisateur</span>
          </button>
        </div>

        {/* Filtres et Recherche */}
        <div className="admin-card admin-mb-xl">
          <div className="admin-card-content">
            <div className="admin-flex admin-gap-lg admin-items-center">
              <form onSubmit={handleSearch} className="admin-flex admin-gap-md admin-items-center" style={{ flex: 1 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <FaSearch style={{ 
                    position: 'absolute', 
                    left: 'var(--spacing-md)', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--gray-400)'
                  }} />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <button type="submit" className="admin-btn admin-btn-secondary">
                  Rechercher
                </button>
              </form>

              <select 
                value={filterRole} 
                onChange={(e) => handleFilterChange(e.target.value)}
                className="admin-form-select"
                style={{ width: '200px' }}
              >
                <option value="all">Tous les rôles</option>
                <option value="ADMIN">Administrateurs</option>
                <option value="USER">Utilisateurs</option>
                <option value="STUDENT">Étudiants</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau des Utilisateurs */}
        <div className="admin-card">
          <div className="admin-card-content">
            {users.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">👥</div>
                <h3 className="admin-empty-state-title">Aucun utilisateur trouvé</h3>
                <p className="admin-empty-state-description">
                  Aucun utilisateur ne correspond à vos critères de recherche
                </p>
                <button 
                  className="admin-btn admin-btn-primary admin-mt-lg"
                  onClick={() => setShowCreateModal(true)}
                >
                  Créer un utilisateur
                </button>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                      <th>Date de création</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="admin-flex admin-items-center admin-gap-md">
                            <div className="admin-user-avatar" style={{ width: '32px', height: '32px', fontSize: 'var(--font-size-sm)' }}>
                              {user.prenom?.charAt(0) || user.firstName?.charAt(0) || 'U'}
                            </div>
                            <span>
                              {user.prenom || user.firstName} {user.nom || user.lastName}
                            </span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`admin-badge ${user.role?.toLowerCase() === 'admin' ? 'admin-badge-violet' : 'admin-badge-info'}`}>
                            {user.role || 'USER'}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge ${user.compteActif ? 'admin-badge-success' : 'admin-badge-error'}`}>
                            {user.compteActif ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td>
                          {user.dateCreation ? 
                            new Date(user.dateCreation).toLocaleDateString('fr-FR') : 
                            'N/A'
                          }
                        </td>
                        <td>
                          <div className="admin-flex admin-gap-sm">
                            <button 
                              className="admin-btn admin-btn-sm admin-btn-secondary"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                              title="Modifier"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="admin-btn admin-btn-sm admin-btn-error"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Supprimer"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {users.length > 0 && (
          <div className="admin-pagination admin-mt-xl">
            <button 
              className="admin-pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </button>
            <span className="admin-pagination-info">
              Page {page} sur {totalPages}
            </span>
            <button 
              className="admin-pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Modales */}
        {showCreateModal && (
          <UserFormModal
            mode="create"
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateUser}
          />
        )}

        {showEditModal && selectedUser && (
          <UserFormModal
            mode="edit"
            user={selectedUser}
            onClose={() => {
              setShowEditModal(false);
              setSelectedUser(null);
            }}
            onSubmit={(data) => handleUpdateUser(selectedUser.id, data)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Composant Modal pour le formulaire utilisateur
const UserFormModal = ({ mode, user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    prenom: user?.prenom || user?.firstName || '',
    nom: user?.nom || user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'USER',
    compteActif: user?.compteActif !== undefined ? user.compteActif : true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {mode === 'create' ? 'Nouvel Utilisateur' : 'Modifier Utilisateur'}
          </h2>
          <button className="admin-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-content">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="role">Rôle</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="admin-form-select"
              >
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
                <option value="STUDENT">Étudiant</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <input
                  type="checkbox"
                  name="compteActif"
                  checked={formData.compteActif}
                  onChange={handleChange}
                />
                <span>Compte actif</span>
              </label>
            </div>
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              {mode === 'create' ? 'Créer' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUsers;
