import React, { useState } from 'react';
import './ApplicationManagement.css';

const ApplicationManagement = ({ 
    applications, 
    loading, 
    onApplicationSelect, 
    onStatusChange, 
    onRefresh 
}) => {
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    // ===== FILTRAGE ET RECHERCHE =====
    const filteredApplications = applications.filter(app => {
        const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
        const matchesSearch = 
            app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesSearch;
    });

    // ===== TRI =====
    const sortedApplications = [...filteredApplications].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            aValue = new Date(aValue || 0);
            bValue = new Date(bValue || 0);
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // ===== GESTION DES ACTIONS =====
    const handleStatusChange = (application, newStatus) => {
        onApplicationSelect(application);
    };

    const handleViewHistory = (application) => {
        // Ouvrir le modal d'historique
        console.log('Voir l\'historique de:', application.applicationId);
    };

    const handleViewDetails = (application) => {
        // Ouvrir le modal de détails
        console.log('Voir les détails de:', application.applicationId);
    };

    // ===== RENDU DES STATUTS =====
    const renderStatus = (status) => {
        const statusConfig = {
            'DRAFT': { label: '📝 Brouillon', color: '#6c757d', bgColor: '#f8f9fa' },
            'IN_PROGRESS': { label: '🔄 En cours', color: '#007bff', bgColor: '#e3f2fd' },
            'SUBMITTED': { label: '📤 Soumise', color: '#28a745', bgColor: '#e8f5e8' },
            'UNDER_REVIEW': { label: '🔍 En révision', color: '#ffc107', bgColor: '#fff8e1' },
            'APPROVED': { label: '✅ Approuvée', color: '#28a745', bgColor: '#e8f5e8' },
            'REJECTED': { label: '❌ Rejetée', color: '#dc3545', bgColor: '#ffebee' },
            'COMPLETED': { label: '🎉 Terminée', color: '#6f42c1', bgColor: '#f3e5f5' }
        };

        const config = statusConfig[status] || { label: status, color: '#6c757d', bgColor: '#f8f9fa' };

        return (
            <span 
                className="status-badge"
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

    // ===== RENDU DES ÉTAPES =====
    const renderProgress = (currentStep) => {
        const steps = ['Info', 'Famille', 'Déclarations', 'Documents', 'Paiement'];
        const progress = (currentStep / 5) * 100;

        return (
            <div className="progress-container">
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="progress-text">{currentStep}/5</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">🔄</div>
                <p>Chargement des applications...</p>
            </div>
        );
    }

    return (
        <div className="application-management">
            {/* Header avec filtres et recherche */}
            <div className="management-header">
                <div className="header-left">
                    <h2>📋 Gestion des Applications</h2>
                    <span className="application-count">
                        {sortedApplications.length} application(s) trouvée(s)
                    </span>
                </div>
                
                <div className="header-right">
                    <button className="btn-refresh" onClick={onRefresh}>
                        🔄 Actualiser
                    </button>
                </div>
            </div>

            {/* Filtres et recherche */}
            <div className="filters-section">
                <div className="filter-group">
                    <label>Statut:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">Tous les statuts</option>
                        <option value="DRAFT">📝 Brouillon</option>
                        <option value="IN_PROGRESS">🔄 En cours</option>
                        <option value="SUBMITTED">📤 Soumise</option>
                        <option value="UNDER_REVIEW">🔍 En révision</option>
                        <option value="APPROVED">✅ Approuvée</option>
                        <option value="REJECTED">❌ Rejetée</option>
                        <option value="COMPLETED">🎉 Terminée</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Trier par:</label>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="createdAt">Date de création</option>
                        <option value="updatedAt">Dernière modification</option>
                        <option value="firstName">Prénom</option>
                        <option value="lastName">Nom</option>
                        <option value="status">Statut</option>
                    </select>
                    <button 
                        className="sort-order-btn"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Tableau des applications */}
            <div className="applications-table-container">
                {sortedApplications.length > 0 ? (
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Application ID</th>
                                <th>Étudiant</th>
                                <th>Contact</th>
                                <th>Programme</th>
                                <th>Statut</th>
                                <th>Progression</th>
                                <th>Date création</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedApplications.map((app) => (
                                <tr key={app.id} className="application-row">
                                    <td className="application-id">
                                        <strong>{app.applicationId}</strong>
                                    </td>
                                    
                                    <td className="student-info">
                                        <div className="student-name">
                                            {app.firstName} {app.lastName}
                                        </div>
                                        <div className="student-details">
                                            {app.dateOfBirth && (
                                                <span>Né(e) le: {new Date(app.dateOfBirth).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    <td className="contact-info">
                                        <div className="email">{app.email}</div>
                                        {app.phone && <div className="phone">{app.phone}</div>}
                                    </td>
                                    
                                    <td className="program-info">
                                        <div className="program-name">{app.programName || 'Non spécifié'}</div>
                                        <div className="university">{app.universityName || 'Non spécifié'}</div>
                                    </td>
                                    
                                    <td className="status-cell">
                                        {renderStatus(app.status)}
                                    </td>
                                    
                                    <td className="progress-cell">
                                        {renderProgress(app.currentStep || 1)}
                                    </td>
                                    
                                    <td className="date-cell">
                                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    
                                    <td className="actions-cell">
                                        <div className="action-buttons">
                                            <button 
                                                className="btn-action btn-status"
                                                onClick={() => handleStatusChange(app)}
                                                title="Changer le statut"
                                            >
                                                🔄
                                            </button>
                                            
                                            <button 
                                                className="btn-action btn-history"
                                                onClick={() => handleViewHistory(app)}
                                                title="Voir l'historique"
                                            >
                                                🕒
                                            </button>
                                            
                                            <button 
                                                className="btn-action btn-details"
                                                onClick={() => handleViewDetails(app)}
                                                title="Voir les détails"
                                            >
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-applications">
                        <div className="no-applications-icon">📭</div>
                        <h3>Aucune application trouvée</h3>
                        <p>
                            {searchTerm || filterStatus !== 'ALL' 
                                ? 'Essayez de modifier vos critères de recherche ou de filtrage.'
                                : 'Aucune application n\'a encore été créée.'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination (optionnel) */}
            {sortedApplications.length > 10 && (
                <div className="pagination">
                    <button className="btn-page">← Précédent</button>
                    <span className="page-info">Page 1 sur 1</span>
                    <button className="btn-page">Suivant →</button>
                </div>
            )}
        </div>
    );
};

export default ApplicationManagement;
