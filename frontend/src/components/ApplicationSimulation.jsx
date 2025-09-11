import React, { useState, useEffect } from 'react';
import { 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaDownload,
  FaShare,
  FaTrash,
  FaPlus,
  FaUniversity,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe
} from 'react-icons/fa';
import './ApplicationSimulation.css';

const ApplicationSimulation = ({ applications, onEditApplication, onViewApplication, onCreateApplication }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedApplication, setSelectedApplication] = useState(null);

  // États simulés des applications
  const [simulatedApplications, setSimulatedApplications] = useState([]);

  useEffect(() => {
    // Simuler des applications avec des états dynamiques
    const simulated = applications.map(app => ({
      ...app,
      // Ajouter des données simulées
      progress: Math.floor(Math.random() * 100),
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      documentsUploaded: Math.floor(Math.random() * 5) + 1,
      totalDocuments: 8,
      paymentAmount: Math.floor(Math.random() * 500) + 50,
      estimatedProcessingTime: Math.floor(Math.random() * 30) + 7,
      nextDeadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    }));
    
    setSimulatedApplications(simulated);
  }, [applications]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'SUBMITTED': return 'green';
      case 'UNDER_REVIEW': return 'orange';
      case 'APPROVED': return 'emerald';
      case 'REJECTED': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DRAFT': return FaEdit;
      case 'IN_PROGRESS': return FaClock;
      case 'SUBMITTED': return FaCheckCircle;
      case 'UNDER_REVIEW': return FaEye;
      case 'APPROVED': return FaCheckCircle;
      case 'REJECTED': return FaTrash;
      default: return FaFileAlt;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'DRAFT': return '📝 Brouillon';
      case 'IN_PROGRESS': return '🔄 En cours';
      case 'SUBMITTED': return '📤 Soumise';
      case 'UNDER_REVIEW': return '🔍 En révision';
      case 'APPROVED': return '✅ Approuvée';
      case 'REJECTED': return '❌ Rejetée';
      default: return '📝 Brouillon';
    }
  };

  const filteredApplications = simulatedApplications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'progress':
        return b.progress - a.progress;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const statusFilters = [
    { value: 'all', label: 'Toutes', count: simulatedApplications.length },
    { value: 'DRAFT', label: 'Brouillons', count: simulatedApplications.filter(app => app.status === 'DRAFT').length },
    { value: 'IN_PROGRESS', label: 'En cours', count: simulatedApplications.filter(app => app.status === 'IN_PROGRESS').length },
    { value: 'SUBMITTED', label: 'Soumises', count: simulatedApplications.filter(app => app.status === 'SUBMITTED').length },
    { value: 'APPROVED', label: 'Approuvées', count: simulatedApplications.filter(app => app.status === 'APPROVED').length }
  ];

  const ApplicationCard = ({ application }) => {
    const StatusIcon = getStatusIcon(application.status);
    const statusColor = getStatusColor(application.status);
    
    return (
      <div className={`application-card ${statusColor}`}>
        <div className="card-header">
          <div className="application-info">
            <h4>{application.programName}</h4>
            <p className="university">
              <FaUniversity />
              {application.universityName}
            </p>
            <div className="application-meta">
              <span className="application-id">#{application.applicationId}</span>
              <span className="created-date">
                Créée le {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="application-status">
            <div className={`status-badge ${statusColor}`}>
              <StatusIcon />
              {getStatusText(application.status)}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="progress-section">
            <div className="progress-header">
              <span>Progression</span>
              <span>{application.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${application.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="application-details">
            <div className="detail-row">
              <div className="detail-item">
                <FaCalendarAlt />
                <span>Échéance: {new Date(application.deadline).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <FaFileAlt />
                <span>{application.documentsUploaded}/{application.totalDocuments} documents</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <FaDollarSign />
                <span>Frais: {application.paymentAmount}€</span>
              </div>
              <div className="detail-item">
                <FaClock />
                <span>Traitement: {application.estimatedProcessingTime} jours</span>
              </div>
            </div>
          </div>

          {application.status === 'SUBMITTED' && (
            <div className="submission-info">
              <div className="submission-date">
                <FaCheckCircle />
                <span>Soumise le {new Date(application.submittedAt).toLocaleDateString()}</span>
              </div>
              <div className="next-deadline">
                <FaCalendarAlt />
                <span>Prochaine étape: {new Date(application.nextDeadline).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="card-footer">
          <div className="application-actions">
            {application.status === 'DRAFT' || application.status === 'IN_PROGRESS' ? (
              <button 
                className="action-btn primary"
                onClick={() => onEditApplication && onEditApplication(application)}
              >
                <FaEdit />
                Continuer
              </button>
            ) : (
              <button 
                className="action-btn secondary"
                onClick={() => onViewApplication && onViewApplication(application)}
              >
                <FaEye />
                Voir
              </button>
            )}
            
            <div className="secondary-actions">
              <button className="action-btn-icon" title="Télécharger">
                <FaDownload />
              </button>
              <button className="action-btn-icon" title="Partager">
                <FaShare />
              </button>
              {application.status === 'DRAFT' && (
                <button className="action-btn-icon danger" title="Supprimer">
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ApplicationListItem = ({ application }) => {
    const StatusIcon = getStatusIcon(application.status);
    const statusColor = getStatusColor(application.status);
    
    return (
      <div className={`application-list-item ${statusColor}`}>
        <div className="list-item-header">
          <div className="application-main-info">
            <h4>{application.programName}</h4>
            <p className="university">{application.universityName}</p>
          </div>
          <div className="application-status">
            <div className={`status-badge ${statusColor}`}>
              <StatusIcon />
              {getStatusText(application.status)}
            </div>
          </div>
        </div>

        <div className="list-item-body">
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${application.progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{application.progress}%</span>
          </div>

          <div className="application-meta">
            <span>Échéance: {new Date(application.deadline).toLocaleDateString()}</span>
            <span>Documents: {application.documentsUploaded}/{application.totalDocuments}</span>
            <span>Frais: {application.paymentAmount}€</span>
          </div>
        </div>

        <div className="list-item-actions">
          {application.status === 'DRAFT' || application.status === 'IN_PROGRESS' ? (
            <button 
              className="action-btn primary"
              onClick={() => onEditApplication && onEditApplication(application)}
            >
              <FaEdit />
              Continuer
            </button>
          ) : (
            <button 
              className="action-btn secondary"
              onClick={() => onViewApplication && onViewApplication(application)}
            >
              <FaEye />
              Voir
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="application-simulation">
      <div className="simulation-header">
        <div className="header-content">
          <h3>📋 Simulation des Candidatures</h3>
          <p>Gérez vos candidatures avec des données en temps réel</p>
        </div>
        <button 
          className="create-btn"
          onClick={() => onCreateApplication && onCreateApplication()}
        >
          <FaPlus />
          Nouvelle Candidature
        </button>
      </div>

      <div className="simulation-controls">
        <div className="filters-section">
          <div className="status-filters">
            {statusFilters.map(filter => (
              <button
                key={filter.value}
                className={`filter-btn ${filterStatus === filter.value ? 'active' : ''}`}
                onClick={() => setFilterStatus(filter.value)}
              >
                {filter.label}
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="controls-section">
          <div className="sort-controls">
            <label>Trier par:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Date de création</option>
              <option value="deadline">Échéance</option>
              <option value="progress">Progression</option>
              <option value="status">Statut</option>
            </select>
          </div>

          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grille
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              Liste
            </button>
          </div>
        </div>
      </div>

      <div className="applications-container">
        {sortedApplications.length > 0 ? (
          <div className={`applications-${viewMode}`}>
            {sortedApplications.map((application) => (
              viewMode === 'grid' ? (
                <ApplicationCard key={application.id} application={application} />
              ) : (
                <ApplicationListItem key={application.id} application={application} />
              )
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FaFileAlt />
            </div>
            <h4>Aucune candidature trouvée</h4>
            <p>Aucune candidature ne correspond aux filtres sélectionnés.</p>
            <button 
              className="empty-action-btn"
              onClick={() => setFilterStatus('all')}
            >
              Voir toutes les candidatures
            </button>
          </div>
        )}
      </div>

      <div className="simulation-summary">
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">Total Candidatures</span>
            <span className="summary-value">{simulatedApplications.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">En Cours</span>
            <span className="summary-value">
              {simulatedApplications.filter(app => app.status === 'IN_PROGRESS').length}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Soumises</span>
            <span className="summary-value">
              {simulatedApplications.filter(app => app.status === 'SUBMITTED').length}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Taux de Complétion</span>
            <span className="summary-value">
              {simulatedApplications.length > 0 
                ? Math.round(simulatedApplications.reduce((sum, app) => sum + app.progress, 0) / simulatedApplications.length)
                : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSimulation;
