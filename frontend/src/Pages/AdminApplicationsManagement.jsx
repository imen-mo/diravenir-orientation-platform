import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFilePdf,
  FaUser,
  FaCalendar,
  FaUniversity,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaFileAlt,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import apiService from '../services/api';
import './AdminApplicationsManagement.css';

const AdminApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  
  // Filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [programFilter, setProgramFilter] = useState('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Statistiques
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    inProgress: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    loadApplications();
  }, [currentPage, statusFilter, searchTerm]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      console.log('📊 Chargement des applications...');
      
      const response = await apiService.getAdminApplications({
        page: currentPage - 1,
        size: itemsPerPage,
        status: statusFilter === 'ALL' ? null : statusFilter,
        searchTerm: searchTerm || null
      });
      
      if (response && response.applications) {
        setApplications(response.applications);
        setFilteredApplications(response.applications);
        setTotalPages(response.totalPages || 1);
        
        // Calculer les statistiques
        calculateStats(response.applications);
        
        console.log('✅ Applications chargées:', response.applications.length);
      } else {
        console.error('❌ Format de réponse invalide:', response);
        setApplications([]);
        setFilteredApplications([]);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement des applications:', error);
      toast.error('Erreur lors du chargement des applications');
      setApplications([]);
      setFilteredApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (apps) => {
    const newStats = {
      total: apps.length,
      draft: apps.filter(app => app.status === 'DRAFT').length,
      submitted: apps.filter(app => app.status === 'SUBMITTED').length,
      inProgress: apps.filter(app => app.status === 'IN_PROGRESS').length,
      approved: apps.filter(app => app.status === 'APPROVED').length,
      rejected: apps.filter(app => app.status === 'REJECTED').length
    };
    setStats(newStats);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setAdminNotes(application.adminNotes || '');
    setShowModal(true);
  };

  const handleStatusChange = (application) => {
    setSelectedApplication(application);
    setShowStatusModal(true);
  };

  const updateApplicationStatus = async (newStatus) => {
    try {
      if (!selectedApplication) return;
      
      const response = await apiService.updateApplicationStatus(
        selectedApplication.applicationId, 
        newStatus,
        adminNotes
      );
      
      if (response.success) {
        toast.success(`Statut mis à jour: ${newStatus}`);
        
        // Mettre à jour l'application dans la liste
        setApplications(prev => 
          prev.map(app => 
            app.applicationId === selectedApplication.applicationId 
              ? { ...app, status: newStatus, adminNotes }
              : app
          )
        );
        
        setShowStatusModal(false);
        setSelectedApplication(null);
        loadApplications(); // Recharger pour avoir les données à jour
      } else {
        toast.error('Erreur lors de la mise à jour du statut');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const downloadApplicationPDF = async (applicationId) => {
    try {
      const response = await apiService.downloadApplicationPDF(applicationId);
      
      if (response) {
        // Créer un blob et télécharger
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `application_${applicationId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('PDF téléchargé avec succès');
      }
    } catch (error) {
      console.error('❌ Erreur lors du téléchargement PDF:', error);
      toast.error('Erreur lors du téléchargement du PDF');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DRAFT': return <FaEdit className="status-icon draft" />;
      case 'SUBMITTED': return <FaClock className="status-icon submitted" />;
      case 'IN_PROGRESS': return <FaSpinner className="status-icon in-progress" />;
      case 'APPROVED': return <FaCheckCircle className="status-icon approved" />;
      case 'REJECTED': return <FaTimesCircle className="status-icon rejected" />;
      default: return <FaExclamationTriangle className="status-icon unknown" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return '#6b7280';
      case 'SUBMITTED': return '#3b82f6';
      case 'IN_PROGRESS': return '#f59e0b';
      case 'APPROVED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
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

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return `${amount} MAD`;
  };

  return (
    <div className="admin-applications-container">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1>📋 Gestion des Applications</h1>
          <p>Gérez toutes les candidatures étudiantes</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn-refresh"
            onClick={loadApplications}
            disabled={loading}
          >
            <FaSpinner className={loading ? 'spinning' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon draft">
            <FaEdit />
          </div>
          <div className="stat-content">
            <h3>{stats.draft}</h3>
            <p>Brouillons</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon submitted">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{stats.submitted}</h3>
            <p>Soumises</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon in-progress">
            <FaSpinner />
          </div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>En Cours</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon approved">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.approved}</h3>
            <p>Approuvées</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon rejected">
            <FaTimesCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.rejected}</h3>
            <p>Rejetées</p>
          </div>
        </div>
      </div>

      {/* Filtres et Recherche */}
      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, ID..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filters">
          <select 
            value={statusFilter} 
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="DRAFT">Brouillon</option>
            <option value="SUBMITTED">Soumise</option>
            <option value="IN_PROGRESS">En Cours</option>
            <option value="APPROVED">Approuvée</option>
            <option value="REJECTED">Rejetée</option>
          </select>
          
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">Toutes les dates</option>
            <option value="TODAY">Aujourd'hui</option>
            <option value="WEEK">Cette semaine</option>
            <option value="MONTH">Ce mois</option>
          </select>
        </div>
      </div>

      {/* Tableau des Applications */}
      <div className="applications-table-container">
        {loading ? (
          <div className="loading-state">
            <FaSpinner className="spinning" />
            <p>Chargement des applications...</p>
          </div>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Étudiant</th>
                <th>Programme</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Paiement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.applicationId}>
                  <td className="app-id">
                    <span className="id-badge">{app.applicationId}</span>
                  </td>
                  <td className="student-info">
                    <div className="student-details">
                      <div className="student-name">
                        <FaUser className="icon" />
                        {app.firstName} {app.lastName}
                      </div>
                      <div className="student-contact">
                        <FaEnvelope className="icon" />
                        {app.email}
                      </div>
                    </div>
                  </td>
                  <td className="program-info">
                    <div className="program-details">
                      <div className="program-name">
                        <FaGraduationCap className="icon" />
                        {app.programName || 'N/A'}
                      </div>
                      <div className="university-name">
                        <FaUniversity className="icon" />
                        {app.universityName || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="status-cell">
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {getStatusIcon(app.status)}
                      <span>{app.status}</span>
                    </div>
                  </td>
                  <td className="date-cell">
                    <div className="date-info">
                      <div className="created-date">
                        <FaCalendar className="icon" />
                        {formatDate(app.createdAt)}
                      </div>
                      {app.submittedAt && (
                        <div className="submitted-date">
                          Soumis: {formatDate(app.submittedAt)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="payment-cell">
                    <div className="payment-info">
                      <div className="payment-status">
                        <FaMoneyBillWave className="icon" />
                        {app.paymentStatus || 'PENDING'}
                      </div>
                      <div className="payment-amount">
                        {formatCurrency(app.paymentAmount)}
                      </div>
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => handleViewApplication(app)}
                        title="Voir les détails"
                      >
                        <FaEye />
                      </button>
                      
                      <button
                        className="btn-action btn-status"
                        onClick={() => handleStatusChange(app)}
                        title="Changer le statut"
                      >
                        <FaEdit />
                      </button>
                      
                      <button
                        className="btn-action btn-pdf"
                        onClick={() => downloadApplicationPDF(app.applicationId)}
                        title="Télécharger PDF"
                      >
                        <FaFilePdf />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-pagination"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          
          <span className="page-info">
            Page {currentPage} sur {totalPages}
          </span>
          
          <button
            className="btn-pagination"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modal de Détails */}
      {showModal && selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content application-details-modal">
            <div className="modal-header">
              <h2>📋 Détails de l'Application</h2>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="application-details">
                {/* Informations Personnelles */}
                <div className="detail-section">
                  <h3>👤 Informations Personnelles</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Nom complet:</label>
                      <span>{selectedApplication.firstName} {selectedApplication.lastName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedApplication.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Téléphone:</label>
                      <span>{selectedApplication.phone || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Date de naissance:</label>
                      <span>{selectedApplication.dateOfBirth || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Passeport:</label>
                      <span>{selectedApplication.passportNumber || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Adresse:</label>
                      <span>{selectedApplication.fullAddress || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Informations Académiques */}
                <div className="detail-section">
                  <h3>🎓 Informations Académiques</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Programme:</label>
                      <span>{selectedApplication.programName || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Université:</label>
                      <span>{selectedApplication.universityName || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Niveau d'anglais:</label>
                      <span>{selectedApplication.englishLevel || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Certificat anglais:</label>
                      <span>{selectedApplication.englishCertificate || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="detail-section">
                  <h3>📄 Documents</h3>
                  <div className="documents-list">
                    {selectedApplication.passportPath && (
                      <div className="document-item">
                        <FaIdCard className="doc-icon" />
                        <span>Passeport</span>
                      </div>
                    )}
                    {selectedApplication.academicCertificatePath && (
                      <div className="document-item">
                        <FaFileAlt className="doc-icon" />
                        <span>Certificat académique</span>
                      </div>
                    )}
                    {selectedApplication.languageCertificatePath && (
                      <div className="document-item">
                        <FaFileAlt className="doc-icon" />
                        <span>Certificat de langue</span>
                      </div>
                    )}
                    {/* Ajouter d'autres documents selon les champs disponibles */}
                  </div>
                </div>

                {/* Notes Admin */}
                <div className="detail-section">
                  <h3>📝 Notes Administrateur</h3>
                  <textarea
                    className="admin-notes-textarea"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Ajouter des notes pour cette application..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Fermer
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  // Sauvegarder les notes admin
                  setShowModal(false);
                }}
              >
                Sauvegarder les Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Changement de Statut */}
      {showStatusModal && selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content status-modal">
            <div className="modal-header">
              <h2>🔄 Changer le Statut</h2>
              <button 
                className="btn-close"
                onClick={() => setShowStatusModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="current-status">
                <h3>Application: {selectedApplication.applicationId}</h3>
                <p>Étudiant: {selectedApplication.firstName} {selectedApplication.lastName}</p>
                <p>Statut actuel: <span className="current-status-badge">{selectedApplication.status}</span></p>
              </div>
              
              <div className="status-options">
                <h3>Nouveau statut:</h3>
                <div className="status-buttons">
                  <button
                    className="status-btn in-progress"
                    onClick={() => updateApplicationStatus('IN_PROGRESS')}
                  >
                    <FaSpinner />
                    En Cours
                  </button>
                  
                  <button
                    className="status-btn approved"
                    onClick={() => updateApplicationStatus('APPROVED')}
                  >
                    <FaCheckCircle />
                    Approuver
                  </button>
                  
                  <button
                    className="status-btn rejected"
                    onClick={() => updateApplicationStatus('REJECTED')}
                  >
                    <FaTimesCircle />
                    Rejeter
                  </button>
                </div>
              </div>
              
              <div className="admin-notes-section">
                <label>Notes (optionnel):</label>
                <textarea
                  className="admin-notes-textarea"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajouter des notes pour ce changement de statut..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowStatusModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplicationsManagement;
