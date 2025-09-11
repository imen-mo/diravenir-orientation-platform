import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaEye,
  FaDownload,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUser,
  FaChartLine,
  FaTrophy,
  FaStar,
  FaPlay,
  FaPause,
  FaStop,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCopy,
  FaShare
} from 'react-icons/fa';
import './TestApplicationCards.css';

const TestApplicationCards = ({ applications = [], testResults = [], onTestDetailsClick }) => {
  const [activeTab, setActiveTab] = useState('applications');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Données de démonstration pour les tests si aucune donnée réelle
  const mockTestResults = testResults.length > 0 ? testResults : [
    {
      id: 1,
      testName: 'Test d\'Orientation Académique',
      testType: 'Orientation',
      score: 85,
      maxScore: 100,
      status: 'COMPLETED',
      completedAt: '2024-04-15T14:30:00',
      duration: '45 minutes',
      category: 'Académique',
      attempts: 1,
      recommendations: [
        'Sciences et Technologies',
        'Ingénierie',
        'Informatique'
      ],
      details: {
        totalQuestions: 14,
        answeredQuestions: 14,
        correctAnswers: 12,
        timeSpent: 45
      }
    },
    {
      id: 2,
      testName: 'Évaluation des Compétences Linguistiques',
      testType: 'Langues',
      score: 92,
      maxScore: 100,
      status: 'COMPLETED',
      completedAt: '2024-04-12T10:15:00',
      duration: '60 minutes',
      category: 'Langues',
      attempts: 2,
      recommendations: [
        'Programmes en anglais',
        'Études internationales',
        'Échanges universitaires'
      ],
      details: {
        totalQuestions: 20,
        answeredQuestions: 20,
        correctAnswers: 18,
        timeSpent: 60
      }
    },
    {
      id: 3,
      testName: 'Test de Motivation et Projet',
      testType: 'Motivation',
      score: 78,
      maxScore: 100,
      status: 'COMPLETED',
      completedAt: '2024-04-10T16:45:00',
      duration: '30 minutes',
      category: 'Personnel',
      attempts: 1,
      recommendations: [
        'Développement personnel',
        'Leadership',
        'Gestion de projet'
      ],
      details: {
        totalQuestions: 15,
        answeredQuestions: 15,
        correctAnswers: 12,
        timeSpent: 30
      }
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'needs-improvement';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Bon';
    if (score >= 70) return 'Moyen';
    return 'À améliorer';
  };

  const getStatusColor = (status) => {
    const colors = {
      'DRAFT': '#f39c12',
      'IN_PROGRESS': '#3498db',
      'SUBMITTED': '#2ecc71',
      'APPROVED': '#27ae60',
      'REJECTED': '#e74c3c',
      'UNDER_REVIEW': '#f39c12',
      'COMPLETED': '#27ae60'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'DRAFT': 'Brouillon',
      'IN_PROGRESS': 'En cours',
      'SUBMITTED': 'Soumis',
      'APPROVED': 'Approuvé',
      'REJECTED': 'Rejeté',
      'UNDER_REVIEW': 'En révision',
      'COMPLETED': 'Terminé'
    };
    return labels[status] || status;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Académique':
        return <FaGraduationCap />;
      case 'Langues':
        return <FaUser />;
      case 'Personnel':
        return <FaStar />;
      default:
        return <FaFileAlt />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredApplications = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const filteredTests = mockTestResults.filter(test => {
    if (filterStatus === 'all') return true;
    return test.status === filterStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt || b.submittedAt) - new Date(a.createdAt || a.submittedAt);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'name':
        return a.programName?.localeCompare(b.programName) || 0;
      default:
        return 0;
    }
  });

  const sortedTests = [...filteredTests].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.completedAt) - new Date(a.completedAt);
      case 'score':
        return b.score - a.score;
      case 'name':
        return a.testName.localeCompare(b.testName);
      default:
        return 0;
    }
  });

  return (
    <div className="test-application-cards">
      {/* En-tête avec onglets et filtres */}
      <div className="cards-header">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <FaFileAlt className="tab-icon" />
            Candidatures ({applications.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <FaGraduationCap className="tab-icon" />
            Tests ({mockTestResults.length})
          </button>
        </div>

        <div className="filters-container">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="DRAFT">Brouillon</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="SUBMITTED">Soumis</option>
            <option value="APPROVED">Approuvé</option>
            <option value="COMPLETED">Terminé</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Par date</option>
            <option value="status">Par statut</option>
            <option value="name">Par nom</option>
            {activeTab === 'tests' && <option value="score">Par score</option>}
          </select>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="cards-content">
        {activeTab === 'applications' && (
          <div className="applications-grid">
            {sortedApplications.length > 0 ? (
              sortedApplications.map((application) => (
                <div key={application.id} className="application-card">
                  <div className="card-header">
                    <div className="card-title">
                      <h3>{application.programName || 'Programme d\'études'}</h3>
                      <p className="university">{application.university || 'Université'}</p>
                    </div>
                    <div className="card-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(application.status) }}
                      >
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="application-details">
                      <div className="detail-item">
                        <FaCalendarAlt className="detail-icon" />
                        <span>Créé le {formatDate(application.createdAt || application.submittedAt)}</span>
                      </div>
                      {application.deadline && (
                        <div className="detail-item">
                          <FaClock className="detail-icon" />
                          <span>Échéance: {formatDate(application.deadline)}</span>
                        </div>
                      )}
                      <div className="detail-item">
                        <FaUser className="detail-icon" />
                        <span>{application.firstName} {application.lastName}</span>
                      </div>
                    </div>

                    {application.status === 'IN_PROGRESS' && (
                      <div className="progress-section">
                        <div className="progress-header">
                          <span>Progression</span>
                          <span>{application.completionPercentage || 0}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${application.completionPercentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="card-actions">
                      <button className="action-btn view">
                        <FaEye />
                        Voir
                      </button>
                      {application.status === 'DRAFT' && (
                        <button className="action-btn edit">
                          <FaEdit />
                          Continuer
                        </button>
                      )}
                      {application.status === 'SUBMITTED' && (
                        <button className="action-btn download">
                          <FaDownload />
                          Télécharger
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <FaFileAlt className="empty-icon" />
                <h3>Aucune candidature</h3>
                <p>Vous n'avez pas encore de candidatures. Commencez par explorer les programmes disponibles.</p>
                <button className="empty-action-btn">
                  <FaArrowRight />
                  Explorer les programmes
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="tests-grid">
            {sortedTests.length > 0 ? (
              sortedTests.map((test) => (
                <div key={test.id} className="test-card">
                  <div className="card-header">
                    <div className="card-title">
                      <div className="test-icon">
                        {getCategoryIcon(test.category)}
                      </div>
                      <div className="title-content">
                        <h3>{test.testName}</h3>
                        <p className="test-type">{test.testType}</p>
                      </div>
                    </div>
                    <div className="card-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(test.status) }}
                      >
                        {getStatusLabel(test.status)}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="score-section">
                      <div className={`score-circle ${getScoreColor(test.score)}`}>
                        <div className="score-number">{test.score}</div>
                        <div className="score-max">/{test.maxScore}</div>
                      </div>
                      <div className="score-info">
                        <div className="score-label">{getScoreLabel(test.score)}</div>
                        <div className="score-details">
                          <span>{test.details?.correctAnswers || 0}/{test.details?.totalQuestions || 0} bonnes réponses</span>
                        </div>
                      </div>
                    </div>

                    <div className="test-details">
                      <div className="detail-item">
                        <FaCalendarAlt className="detail-icon" />
                        <span>Terminé le {formatDate(test.completedAt)}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span>Durée: {test.duration}</span>
                      </div>
                      <div className="detail-item">
                        <FaChartLine className="detail-icon" />
                        <span>Tentative #{test.attempts}</span>
                      </div>
                    </div>

                    {test.recommendations && test.recommendations.length > 0 && (
                      <div className="recommendations-section">
                        <h4>Recommandations</h4>
                        <div className="recommendations-list">
                          {test.recommendations.slice(0, 3).map((rec, index) => (
                            <span key={index} className="recommendation-tag">
                              {rec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="card-actions">
                      <button className="action-btn view" onClick={onTestDetailsClick}>
                        <FaEye />
                        Détails
                      </button>
                      <button className="action-btn download">
                        <FaDownload />
                        Rapport
                      </button>
                      <button className="action-btn retake">
                        <FaPlay />
                        Repasser
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <FaGraduationCap className="empty-icon" />
                <h3>Aucun test complété</h3>
                <p>Vous n'avez pas encore complété de tests. Commencez par passer un test d'orientation.</p>
                <button className="empty-action-btn" onClick={onTestDetailsClick}>
                  <FaArrowRight />
                  Passer un test
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApplicationCards;
