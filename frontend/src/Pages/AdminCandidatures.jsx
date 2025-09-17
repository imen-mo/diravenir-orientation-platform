import React, { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaPlus,
  FaDownload,
  FaCheck, 
  FaTimes, 
  FaClock,
  FaFileAlt,
  FaUser,
  FaCalendar,
  FaUniversity,
  FaGraduationCap
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';

const AdminCandidatures = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadCandidatures();
  }, [currentPage, statusFilter, searchTerm]);

  const loadCandidatures = async () => {
    try {
    setLoading(true);
      setError(null);
      
      console.log('📝 Chargement des candidatures...');
      
      const params = {
        page: currentPage,
        size: itemsPerPage,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        searchTerm: searchTerm || undefined
      };
      
      const data = await adminApiService.getApplications(params);
      
      setCandidatures(data.applications || data.items || []);
      setTotalPages(data.totalPages || Math.ceil((data.totalElements || 0) / itemsPerPage));
      
      console.log('✅ Candidatures chargées:', data);
    } catch (err) {
      console.error('❌ Erreur chargement candidatures:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(0);
  };

  const handleViewDetails = (candidature) => {
    setSelectedCandidature(candidature);
    setShowDetailsModal(true);
  };

  const handleEdit = (candidature) => {
    setSelectedCandidature(candidature);
    setShowEditModal(true);
  };

  const handleDelete = (candidature) => {
    setSelectedCandidature(candidature);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await adminApiService.deleteApplication(selectedCandidature.id);
      setShowDeleteModal(false);
      setSelectedCandidature(null);
        loadCandidatures();
    } catch (err) {
      console.error('❌ Erreur suppression candidature:', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'DRAFT': { label: 'Brouillon', color: 'admin-badge-secondary', icon: FaFileAlt },
      'SUBMITTED': { label: 'Soumise', color: 'admin-badge-info', icon: FaClock },
      'PENDING': { label: 'En cours', color: 'admin-badge-warning', icon: FaClock },
      'APPROVED': { label: 'Approuvée', color: 'admin-badge-success', icon: FaCheck },
      'REJECTED': { label: 'Rejetée', color: 'admin-badge-error', icon: FaTimes },
      'DOCUMENTS_REQUIRED': { label: 'Documents requis', color: 'admin-badge-warning', icon: FaFileAlt }
    };

    const config = statusConfig[status] || { label: status, color: 'admin-badge-secondary', icon: FaFileAlt };
    const IconComponent = config.icon;

    return (
      <span className={`admin-badge ${config.color}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
  return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-loading-spinner"></div>
          <p>Chargement des candidatures...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
  return (
      <AdminLayout>
        <div className="admin-error">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button className="admin-btn admin-btn-primary" onClick={loadCandidatures}>
            Réessayer
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        {/* En-tête */}
        <div className="admin-header">
          <h1 className="admin-title">Gestion des Candidatures</h1>
          <div className="admin-header-actions">
            <button className="admin-btn admin-btn-primary">
              <FaPlus /> Nouvelle candidature
            </button>
            <button className="admin-btn admin-btn-secondary">
              <FaDownload /> Exporter
          </button>
        </div>
      </div>

        {/* Statistiques rapides */}
        <div className="admin-stats-grid">
          <div className="admin-card admin-stat-card">
            <div className="admin-card-content">
              <div className="admin-stat-header">
                <div className="admin-stat-icon total">
            <FaFileAlt />
          </div>
                <div className="admin-stat-info">
                  <h3 className="admin-stat-title">Total</h3>
                  <p className="admin-stat-value">{candidatures.length}</p>
                </div>
              </div>
          </div>
        </div>
          
          <div className="admin-card admin-stat-card">
            <div className="admin-card-content">
              <div className="admin-stat-header">
                <div className="admin-stat-icon pending">
            <FaClock />
          </div>
                <div className="admin-stat-info">
                  <h3 className="admin-stat-title">En cours</h3>
                  <p className="admin-stat-value">
                    {candidatures.filter(c => c.status === 'PENDING').length}
                  </p>
          </div>
        </div>
          </div>
        </div>
          
          <div className="admin-card admin-stat-card">
            <div className="admin-card-content">
              <div className="admin-stat-header">
                <div className="admin-stat-icon approved">
            <FaCheck />
          </div>
                <div className="admin-stat-info">
                  <h3 className="admin-stat-title">Approuvées</h3>
                  <p className="admin-stat-value">
                    {candidatures.filter(c => c.status === 'APPROVED').length}
                  </p>
                </div>
          </div>
          </div>
        </div>
          
          <div className="admin-card admin-stat-card">
            <div className="admin-card-content">
              <div className="admin-stat-header">
                <div className="admin-stat-icon rejected">
            <FaTimes />
          </div>
                <div className="admin-stat-info">
                  <h3 className="admin-stat-title">Rejetées</h3>
                  <p className="admin-stat-value">
                    {candidatures.filter(c => c.status === 'REJECTED').length}
                  </p>
          </div>
        </div>
          </div>
        </div>
      </div>

        {/* Filtres et recherche */}
        <div className="admin-filters-section">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, programme..."
              value={searchTerm}
              onChange={handleSearch}
              className="admin-search-input"
            />
          </div>
          
          <div className="admin-filter-tabs">
            <button 
              className={`admin-filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('all')}
            >
              Toutes
            </button>
            <button 
              className={`admin-filter-tab ${statusFilter === 'PENDING' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('PENDING')}
            >
              En cours
            </button>
            <button 
              className={`admin-filter-tab ${statusFilter === 'APPROVED' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('APPROVED')}
            >
              Approuvées
            </button>
            <button 
              className={`admin-filter-tab ${statusFilter === 'REJECTED' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('REJECTED')}
            >
              Rejetées
            </button>
            <button 
              className={`admin-filter-tab ${statusFilter === 'DRAFT' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('DRAFT')}
            >
              Brouillons
          </button>
        </div>
      </div>

      {/* Tableau des candidatures */}
        <div className="admin-table-container">
          <table className="admin-table">
          <thead>
            <tr>
                <th>Candidat</th>
              <th>Programme</th>
                <th>Université</th>
              <th>Statut</th>
                <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {candidatures.map((candidature) => (
                <tr key={candidature.id}>
                  <td>
                    <div className="admin-user-cell">
                      <div className="admin-user-avatar">
                        <FaUser />
                      </div>
                      <div className="admin-user-info">
                        <div className="admin-user-name">
                          {candidature.firstName} {candidature.lastName}
                        </div>
                        <div className="admin-user-email">
                          {candidature.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-program-cell">
                      <div className="admin-program-name">
                        <FaGraduationCap size={14} />
                        {candidature.programName || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-university-cell">
                      <div className="admin-university-name">
                        <FaUniversity size={14} />
                        {candidature.universityName || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(candidature.status)}
                  </td>
                  <td>
                    <div className="admin-date-cell">
                      <FaCalendar size={12} />
                      {formatDate(candidature.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-secondary"
                        onClick={() => handleViewDetails(candidature)}
                        title="Voir les détails"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-primary"
                        onClick={() => handleEdit(candidature)}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-danger"
                        onClick={() => handleDelete(candidature)}
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
          
          {candidatures.length === 0 && (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">📝</div>
              <h3 className="admin-empty-state-title">Aucune candidature</h3>
              <p className="admin-empty-state-description">
                Aucune candidature ne correspond aux critères sélectionnés
              </p>
            </div>
          )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Page {currentPage + 1} sur {totalPages} - {candidatures.length} candidatures
            </div>
            <div className="admin-pagination-controls">
          <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Précédent
          </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                if (page >= totalPages) return null;
                
                return (
                  <button
                    key={page}
                    className={`admin-btn ${currentPage === page ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page + 1}
                  </button>
                );
              })}
              
          <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
          >
            Suivant
          </button>
            </div>
        </div>
      )}

        {/* Modales */}
        {showDetailsModal && selectedCandidature && (
          <div className="admin-modal-overlay" onClick={() => setShowDetailsModal(false)}>
            <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Détails de la candidature</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowDetailsModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="candidature-details">
                  <div className="detail-section">
                    <h4>Informations du candidat</h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Nom complet:</label>
                        <span>{selectedCandidature.firstName} {selectedCandidature.lastName}</span>
                      </div>
                      <div className="detail-item">
                        <label>Email:</label>
                        <span>{selectedCandidature.email}</span>
                      </div>
                      <div className="detail-item">
                        <label>Téléphone:</label>
                        <span>{selectedCandidature.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Informations du programme</h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Programme:</label>
                        <span>{selectedCandidature.programName || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <label>Université:</label>
                        <span>{selectedCandidature.universityName || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <label>Statut:</label>
                        <span>{getStatusBadge(selectedCandidature.status)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Dates importantes</h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Date de création:</label>
                        <span>{formatDate(selectedCandidature.createdAt)}</span>
                      </div>
                      <div className="detail-item">
                        <label>Dernière modification:</label>
                        <span>{formatDate(selectedCandidature.updatedAt)}</span>
                      </div>
            </div>
              </div>
              </div>
            </div>
              <div className="admin-modal-footer">
              <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowDetailsModal(false)}
              >
                  Fermer
              </button>
              <button 
                  className="admin-btn admin-btn-primary"
                onClick={() => {
                    setShowDetailsModal(false);
                    handleEdit(selectedCandidature);
                  }}
                >
                  Modifier
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Modal de suppression */}
        {showDeleteModal && selectedCandidature && (
          <div className="admin-modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Confirmer la suppression</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ×
                </button>
                </div>
              <div className="admin-modal-body">
                <p>Êtes-vous sûr de vouloir supprimer cette candidature ?</p>
                <div className="confirmation-details">
                  <strong>{selectedCandidature.firstName} {selectedCandidature.lastName}</strong>
                  <br />
                  <small>{selectedCandidature.programName}</small>
              </div>
            </div>
              <div className="admin-modal-footer">
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
              <button 
                  className="admin-btn admin-btn-danger"
                  onClick={confirmDelete}
              >
                  Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminCandidatures;
