import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');

    // ===== ÉTATS DU FORMULAIRE =====
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        role: 'ETUDIANT',
        compteActif: true
    });

    // ===== CHARGEMENT DES UTILISATEURS =====
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.warn('⚠️ Erreur API:', response.status, response.statusText);
                // Données de test en mode développement
                if (process.env.NODE_ENV === 'development') {
                    setUsers([
        {
            id: 1,
            nom: 'Dupont',
            prenom: 'Jean',
                            email: 'jean.dupont@example.com',
            role: 'ETUDIANT',
                            compteActif: true,
                            dateCreation: new Date().toISOString()
        },
        {
            id: 2,
            nom: 'Martin',
            prenom: 'Marie',
                            email: 'marie.martin@example.com',
            role: 'ADMIN',
                            compteActif: true,
                            dateCreation: new Date().toISOString()
                        }
                    ]);
                }
            }
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des utilisateurs:', error);
            // Données de test en cas d'erreur
            if (process.env.NODE_ENV === 'development') {
                setUsers([
                    {
                        id: 1,
                        nom: 'Test User',
                        prenom: 'Error',
                        email: 'test@example.com',
            role: 'ETUDIANT',
                        compteActif: true,
                        dateCreation: new Date().toISOString()
                    }
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ===== FILTRAGE ET RECHERCHE =====
    const filteredUsers = users.filter(user => {
        const matchesRole = filterRole === 'ALL' || user.role === filterRole;
        const matchesSearch = 
            user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesRole && matchesSearch;
    });

    // ===== GESTION DES ACTIONS =====
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newUser = await response.json();
                setUsers([...users, newUser]);
                setShowCreateModal(false);
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    role: 'ETUDIANT',
                    compteActif: true
                });
                alert('✅ Utilisateur créé avec succès !');
            } else {
                throw new Error('Erreur lors de la création');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la création de l\'utilisateur: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
                setShowEditModal(false);
                setSelectedUser(null);
                alert('✅ Utilisateur mis à jour avec succès !');
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la mise à jour: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
                alert('✅ Utilisateur supprimé avec succès !');
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('❌ Erreur lors de la suppression: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormData({
            nom: user.nom || '',
            prenom: user.prenom || '',
            email: user.email || '',
            role: user.role || 'ETUDIANT',
            compteActif: user.compteActif !== undefined ? user.compteActif : true
        });
        setShowEditModal(true);
    };

    // ===== RENDU DES RÔLES =====
    const renderRole = (role) => {
        const roleConfig = {
            'ADMIN': { label: '🛡️ Admin', color: '#dc3545', bgColor: '#ffebee' },
            'CONSEILLER': { label: '👨‍💼 Conseiller', color: '#007bff', bgColor: '#e3f2fd' },
            'ETUDIANT': { label: '🎓 Étudiant', color: '#28a745', bgColor: '#e8f5e8' }
        };

        const config = roleConfig[role] || { label: role, color: '#6c757d', bgColor: '#f8f9fa' };

        return (
            <span 
                className="role-badge"
                style={{ 
                    color: config.color, 
                    backgroundColor: config.bgColor,
                    border: `1px solid ${config.color}`
                }}
            >
                {config.label}
            </span>
        );
    };

    // ===== RENDU DU STATUT =====
    const renderStatus = (compteActif) => {
        return (
            <span 
                className={`status-badge ${compteActif ? 'active' : 'inactive'}`}
            >
                {compteActif ? '✅ Actif' : '❌ Inactif'}
            </span>
        );
    };

    if (loading && users.length === 0) {
        return (
            <div className="user-management">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Chargement des utilisateurs...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="user-management">
            {/* Header */}
            <div className="user-management-header">
                <div className="header-content">
                <h2>👥 Gestion des Utilisateurs</h2>
                    <p>Gérez les comptes utilisateurs et leurs rôles</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="btn-create"
                        onClick={() => setShowCreateModal(true)}
                    >
                        ➕ Nouvel Utilisateur
                    </button>
                    <button 
                        className="btn-refresh"
                        onClick={fetchUsers}
                        disabled={loading}
                    >
                        {loading ? '🔄' : '🔄'} Actualiser
                    </button>
                </div>
            </div>

            {/* Filtres et recherche */}
            <div className="filters-section">
                <div className="filter-group">
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">Tous les rôles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="CONSEILLER">Conseiller</option>
                        <option value="ETUDIANT">Étudiant</option>
                    </select>
                </div>

                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, prénom ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Tableau des utilisateurs */}
            <div className="users-table-container">
                {filteredUsers.length > 0 ? (
                <table className="users-table">
                    <thead>
                        <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Statut</th>
                            <th>Date création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {filteredUsers.map((user) => (
                            <tr key={user.id} className="user-row">
                                    <td className="user-id">
                                        <strong>#{user.id}</strong>
                                    </td>
                                    
                                    <td className="user-name">
                                        {user.nom}
                                    </td>
                                    
                                    <td className="user-firstname">
                                        {user.prenom}
                                    </td>
                                    
                                    <td className="user-email">
                                        {user.email}
                                    </td>
                                    
                                    <td className="user-role">
                                        {renderRole(user.role)}
                                </td>
                                    
                                    <td className="user-status">
                                        {renderStatus(user.compteActif)}
                                </td>
                                    
                                    <td className="user-date">
                                        {user.dateCreation ? new Date(user.dateCreation).toLocaleDateString() : 'N/A'}
                                </td>
                                    
                                <td className="user-actions">
                                    <button
                                            className="btn-edit"
                                            onClick={() => handleEditUser(user)}
                                        title="Modifier"
                                    >
                                        ✏️
                                    </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteUser(user.id)}
                                        title="Supprimer"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <div className="no-users">
                        <h3>📭 Aucun utilisateur trouvé</h3>
                        <p>
                            {searchTerm || filterRole !== 'ALL' 
                                ? 'Essayez de modifier vos critères de recherche ou de filtrage.'
                                : 'Aucun utilisateur n\'a encore été créé.'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Modal de création */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>➕ Créer un Utilisateur</h3>
                            <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleCreateUser} className="modal-body">
                            <div className="form-group">
                                <label>Nom *</label>
                                <input
                                    type="text"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Prénom *</label>
                                <input
                                    type="text"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Rôle *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    required
                                >
                                    <option value="ETUDIANT">Étudiant</option>
                                    <option value="CONSEILLER">Conseiller</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.compteActif}
                                        onChange={(e) => setFormData({...formData, compteActif: e.target.checked})}
                                    />
                                    Compte actif
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)}>
                                    Annuler
                                </button>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de modification */}
            {showEditModal && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>✏️ Modifier l'Utilisateur</h3>
                            <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleUpdateUser} className="modal-body">
                            <div className="form-group">
                                <label>Nom *</label>
                                <input
                                    type="text"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Prénom *</label>
                                <input
                                    type="text"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                                    required
                                />
                    </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                </div>
                            <div className="form-group">
                                <label>Rôle *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    required
                                >
                                    <option value="ETUDIANT">Étudiant</option>
                                    <option value="CONSEILLER">Conseiller</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                    </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.compteActif}
                                        onChange={(e) => setFormData({...formData, compteActif: e.target.checked})}
                                    />
                                    Compte actif
                                </label>
                </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowEditModal(false)}>
                                    Annuler
                                </button>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Mise à jour...' : 'Mettre à jour'}
                                </button>
                    </div>
                        </form>
                </div>
            </div>
            )}
        </div>
    );
};

export default UserManagement;
