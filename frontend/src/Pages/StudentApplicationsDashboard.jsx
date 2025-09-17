import React, { useState, useEffect } from 'react';
import { 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSpinner,
  FaEye,
  FaDownload,
  FaCalendar,
  FaUniversity,
  FaGraduationCap,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaPlus,
  FaSearch,
  FaFilter,
  FaRefresh,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaFilePdf,
  FaEdit,
  FaTrash,
  FaInfoCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import apiService from '../services/api';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import './StudentApplicationsDashboard.css';

const StudentApplicationsDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filtres
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
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
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📋 Chargement des applications de l\'étudiant...');
      
      const response = await apiService.getStudentApplications();
      
      if (response && response.applications) {
        setApplications(response.applications);
        calculateStats(response.applications);
        console.log('✅ Applications chargées:', response.applications.length);
      } else {
        console.error('❌ Format de réponse invalide:', response);
        setApplications([]);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement des applications:', error);
      setError('Impossible de charger vos applications');
      setApplications([]);
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

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.programName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.universityName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
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

  const getStatusText = (status) => {
    switch (status) {
      case 'DRAFT': return 'Brouillon';
      case 'SUBMITTED': return 'Soumise';
      case 'IN_PROGRESS': return 'En Cours';
      case 'APPROVED': return 'Approuvée';
      case 'REJECTED': return 'Rejetée';
      default: return 'Inconnu';
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

  const getStatusMessage = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'Votre candidature est en cours de rédaction. Vous pouvez la modifier et la soumettre quand vous êtes prêt.';
      case 'SUBMITTED':
        return 'Votre candidature a été soumise avec succès. Elle est maintenant en attente de traitement par notre équipe.';
      case 'IN_PROGRESS':
        return 'Votre candidature est en cours de traitement par notre équipe. Nous vous tiendrons informé de l\'avancement.';
      case 'APPROVED':
        return 'Félicitations ! Votre candidature a été approuvée. Vous recevrez bientôt les instructions pour la suite.';
      case 'REJECTED':
        return 'Votre candidature n\'a pas été retenue cette fois. Vous pouvez consulter les notes de l\'administrateur pour plus de détails.';
      default:
        return 'Statut inconnu.';
    }
  };

  return (
    <StudentLayoutFinal>
      <div className="student-applications-container">
        {/* Header */}
        <div className="applications-header">
          <div className="header-content">
            <h1>📋 Mes Candidatures</h1>
            <p>Suivez l'état de vos candidatures universitaires</p>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn-refresh"
              onClick={loadApplications}
              disabled={loading}
            >
              <FaRefresh className={loading ? 'spinning' : ''} />
              Actualiser
            </button>
            
            <button 
              className="btn-new-application"
              onClick={() => window.location.href = '/apply'}
            >
              <FaPlus />
              Nouvelle Candidature
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
              <p>Total Candidatures</p>
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
              placeholder="Rechercher par programme, université..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="DRAFT">Brouillon</option>
              <option value="SUBMITTED">Soumise</option>
              <option value="IN_PROGRESS">En Cours</option>
              <option value="APPROVED">Approuvée</option>
              <option value="REJECTED">Rejetée</option>
            </select>
          </div>
        </div>

        {/* Liste des Applications */}
        <div className="applications-list">
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinning" />
              <p>Chargement de vos candidatures...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <FaExclamationTriangle />
              <p>{error}</p>
              <button className="btn-retry" onClick={loadApplications}>
                Réessayer
              </button>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="empty-state">
              <FaFileAlt />
              <h3>Aucune candidature trouvée</h3>
              <p>
                {searchTerm || statusFilter !== 'ALL' 
                  ? 'Aucune candidature ne correspond à vos critères de recherche.'
                  : 'Vous n\'avez pas encore de candidatures. Commencez par créer votre première candidature !'
                }
              </p>
              <button 
                className="btn-primary"
                onClick={() => window.location.href = '/apply'}
              >
                <FaPlus />
                Créer une Candidature
              </button>
            </div>
          ) : (
            <div className="applications-grid">
              {filteredApplications.map((app) => (
                <div key={app.applicationId} className="application-card">
                  <div className="card-header">
                    <div className="application-id">
                      <span className="id-badge">{app.applicationId}</span>
                    </div>
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {getStatusIcon(app.status)}
                      <span>{getStatusText(app.status)}</span>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="program-info">
                      <div className="program-name">
                        <FaGraduationCap className="icon" />
                        {app.programName || 'Programme non spécifié'}
                      </div>
                      <div className="university-name">
                        <FaUniversity className="icon" />
                        {app.universityName || 'Université non spécifiée'}
                      </div>
                    </div>
                    
                    <div className="application-details">
                      <div className="detail-item">
                        <FaCalendar className="icon" />
                        <span>Créée: {formatDate(app.createdAt)}</span>
                      </div>
                      {app.submittedAt && (
                        <div className="detail-item">
                          <FaClock className="icon" />
                          <span>Soumise: {formatDate(app.submittedAt)}</span>
                        </div>
                      )}
                      <div className="detail-item">
                        <FaMoneyBillWave className="icon" />
                        <span>Paiement: {app.paymentStatus || 'PENDING'}</span>
                      </div>
                    </div>
                    
                    <div className="status-message">
                      <FaInfoCircle className="icon" />
                      <span>{getStatusMessage(app.status)}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <button
                      className="btn-action btn-view"
                      onClick={() => handleViewApplication(app)}
                      title="Voir les détails"
                    >
                      <FaEye />
                      Détails
                    </button>
                    
                    <button
                      className="btn-action btn-pdf"
                      onClick={() => downloadApplicationPDF(app.applicationId)}
                      title="Télécharger PDF"
                    >
                      <FaFilePdf />
                      PDF
                    </button>
                    
                    {app.status === 'DRAFT' && (
                      <button
                        className="btn-action btn-edit"
                        onClick={() => window.location.href = `/apply?id=${app.applicationId}`}
                        title="Continuer l'édition"
                      >
                        <FaEdit />
                        Continuer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Détails */}
        {showModal && selectedApplication && (
          <div className="modal-overlay">
            <div className="modal-content application-details-modal">
              <div className="modal-header">
                <h2>📋 Détails de la Candidature</h2>
                <button 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="application-details">
                  {/* Informations Générales */}
                  <div className="detail-section">
                    <h3>📋 Informations Générales</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>ID de candidature:</label>
                        <span>{selectedApplication.applicationId}</span>
                      </div>
                      <div className="detail-item">
                        <label>Statut:</label>
                        <span 
                          className="status-text"
                          style={{ color: getStatusColor(selectedApplication.status) }}
                        >
                          {getStatusText(selectedApplication.status)}
                        </span>
                      </div>
                      <div className="detail-item">
                        <label>Date de création:</label>
                        <span>{formatDate(selectedApplication.createdAt)}</span>
                      </div>
                      {selectedApplication.submittedAt && (
                        <div className="detail-item">
                          <label>Date de soumission:</label>
                          <span>{formatDate(selectedApplication.submittedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Programme */}
                  <div className="detail-section">
                    <h3>🎓 Programme</h3>
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
                        <label>Frais d'application:</label>
                        <span>{formatCurrency(selectedApplication.applicationFees)}</span>
                      </div>
                      <div className="detail-item">
                        <label>Frais de service:</label>
                        <span>{formatCurrency(selectedApplication.serviceFees)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Paiement */}
                  <div className="detail-section">
                    <h3>💳 Paiement</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>Statut du paiement:</label>
                        <span>{selectedApplication.paymentStatus || 'PENDING'}</span>
                      </div>
                      <div className="detail-item">
                        <label>Montant:</label>
                        <span>{formatCurrency(selectedApplication.paymentAmount)}</span>
                      </div>
                      <div className="detail-item">
                        <label>Méthode:</label>
                        <span>{selectedApplication.paymentMethod || 'N/A'}</span>
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
                      {selectedApplication.photoPath && (
                        <div className="document-item">
                          <FaFileAlt className="doc-icon" />
                          <span>Photo</span>
                        </div>
                      )}
                      {selectedApplication.resumePath && (
                        <div className="document-item">
                          <FaFileAlt className="doc-icon" />
                          <span>CV</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes Admin */}
                  {selectedApplication.adminNotes && (
                    <div className="detail-section">
                      <h3>📝 Notes de l'Administrateur</h3>
                      <div className="admin-notes">
                        <p>{selectedApplication.adminNotes}</p>
                      </div>
                    </div>
                  )}

                  {/* Message de Statut */}
                  <div className="detail-section">
                    <h3>ℹ️ Information sur le Statut</h3>
                    <div className="status-info">
                      <div className="status-icon-large">
                        {getStatusIcon(selectedApplication.status)}
                      </div>
                      <div className="status-message-large">
                        <h4>{getStatusText(selectedApplication.status)}</h4>
                        <p>{getStatusMessage(selectedApplication.status)}</p>
                      </div>
                    </div>
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
                  onClick={() => downloadApplicationPDF(selectedApplication.applicationId)}
                >
                  <FaFilePdf />
                  Télécharger PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentApplicationsDashboard;
