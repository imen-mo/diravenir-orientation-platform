import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaClock, FaSearch, FaFilter, FaFileAlt, FaUser, FaCalendar, FaGraduationCap, FaSpinner } from 'react-icons/fa';
import { applicationService, apiUtils } from '../services/apiService';

const ApplicationsManagement = ({ applications = [], onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicationsData, setApplicationsData] = useState([]);

  // Charger les candidatures depuis l'API
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.getAllApplications();
      const formattedApplications = response.map(app => apiUtils.formatApplicationData(app));
      setApplicationsData(formattedApplications);
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
      setError(apiUtils.handleApiError(error));
      // Utiliser les données mock en cas d'erreur
      setApplicationsData([
        {
          id: 1,
          studentName: 'Ahmed Benali',
          studentEmail: 'ahmed.benali@email.com',
          programName: 'Master en Informatique',
          status: 'pending',
          submittedAt: '2024-01-15',
          testScore: 85,
          motivation: 'Passionné par les nouvelles technologies...'
        },
        {
          id: 2,
          studentName: 'Fatima Zahra',
          studentEmail: 'fatima.zahra@email.com',
          programName: 'MBA Business',
          status: 'approved',
          submittedAt: '2024-01-10',
          testScore: 92,
          motivation: 'Souhaite développer mes compétences en management...'
        },
        {
          id: 3,
          studentName: 'Omar Hassan',
          studentEmail: 'omar.hassan@email.com',
          programName: 'Design Graphique',
          status: 'rejected',
          submittedAt: '2024-01-08',
          testScore: 78,
          motivation: 'Créatif et passionné par le design...'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applicationsData.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoading(true);
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      if (onUpdateStatus) {
        onUpdateStatus(applicationId, newStatus);
      }
      // Mise à jour locale pour l'affichage
      setApplicationsData(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
      console.log('Application status updated:', { applicationId, newStatus });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      setError(apiUtils.handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheck />;
      case 'rejected': return <FaTimes />;
      case 'pending': return <FaClock />;
      default: return <FaClock />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      case 'pending': return 'En Attente';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="applications-management">
      {/* Header avec statistiques */}
      <div className="management-header">
        <div className="header-left">
          <h2>Gestion des Candidatures</h2>
          <p>Gérez toutes les candidatures des étudiants</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-number">{applicationsData.length}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{applicationsData.filter(app => app.status === 'pending').length}</div>
            <div className="stat-label">En Attente</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{applicationsData.filter(app => app.status === 'approved').length}</div>
            <div className="stat-label">Approuvées</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{applicationsData.filter(app => app.status === 'rejected').length}</div>
            <div className="stat-label">Rejetées</div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="management-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une candidature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En Attente</option>
            <option value="approved">Approuvées</option>
            <option value="rejected">Rejetées</option>
          </select>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="applications-grid">
        {filteredApplications.map((application) => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="application-info">
                <div className="student-avatar">
                  <FaUser />
                </div>
                <div className="student-details">
                  <h3>{application.studentName}</h3>
                  <p>{application.studentEmail}</p>
                </div>
              </div>
              <div className={`status-badge ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                {getStatusText(application.status)}
              </div>
            </div>

            <div className="application-content">
              <div className="program-info">
                <FaGraduationCap className="program-icon" />
                <div>
                  <h4>{application.programName}</h4>
                  <p>Programme demandé</p>
                </div>
              </div>

              <div className="application-details">
                <div className="detail-item">
                  <FaCalendar className="detail-icon" />
                  <span>Soumise le {new Date(application.submittedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="detail-item">
                  <FaFileAlt className="detail-icon" />
                  <span>Score: {application.testScore}/100</span>
                </div>
              </div>

              <div className="motivation-preview">
                <p>{application.motivation.substring(0, 100)}...</p>
              </div>
            </div>

            <div className="application-actions">
              <button 
                className="btn-action view"
                onClick={() => setSelectedApplication(application)}
                title="Voir les détails"
              >
                <FaEye />
                Voir
              </button>
              
              {application.status === 'pending' && (
                <>
                  <button 
                    className="btn-action approve"
                    onClick={() => handleStatusChange(application.id, 'approved')}
                    title="Approuver"
                  >
                    <FaCheck />
                    Approuver
                  </button>
                  <button 
                    className="btn-action reject"
                    onClick={() => handleStatusChange(application.id, 'rejected')}
                    title="Rejeter"
                  >
                    <FaTimes />
                    Rejeter
                  </button>
                </>
              )}

              {application.status === 'approved' && (
                <button 
                  className="btn-action reject"
                  onClick={() => handleStatusChange(application.id, 'rejected')}
                  title="Rejeter"
                >
                  <FaTimes />
                  Rejeter
                </button>
              )}

              {application.status === 'rejected' && (
                <button 
                  className="btn-action approve"
                  onClick={() => handleStatusChange(application.id, 'approved')}
                  title="Approuver"
                >
                  <FaCheck />
                  Approuver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>Détails de la candidature</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedApplication(null)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="application-details-full">
                <div className="detail-section">
                  <h4>Informations étudiant</h4>
                  <p><strong>Nom:</strong> {selectedApplication.studentName}</p>
                  <p><strong>Email:</strong> {selectedApplication.studentEmail}</p>
                </div>
                <div className="detail-section">
                  <h4>Programme demandé</h4>
                  <p><strong>Programme:</strong> {selectedApplication.programName}</p>
                  <p><strong>Score du test:</strong> {selectedApplication.testScore}/100</p>
                </div>
                <div className="detail-section">
                  <h4>Lettre de motivation</h4>
                  <p>{selectedApplication.motivation}</p>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setSelectedApplication(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;
