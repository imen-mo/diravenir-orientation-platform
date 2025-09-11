import React, { useState } from 'react';
import { FaEye, FaSearch, FaFilter, FaUser, FaCalendar, FaChartBar, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const TestsManagement = ({ tests = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);

  // Données de test si pas de données réelles
  const mockTests = tests.length > 0 ? tests : [
    {
      id: 1,
      studentName: 'Ahmed Benali',
      studentEmail: 'ahmed.benali@email.com',
      testType: 'Orientation Professionnelle',
      status: 'completed',
      score: 85,
      completedAt: '2024-01-20',
      duration: '45 minutes',
      answers: [
        { question: 'Quel est votre domaine d\'intérêt principal ?', answer: 'Technologie et innovation' },
        { question: 'Préférez-vous travailler en équipe ou seul ?', answer: 'En équipe' },
        { question: 'Quel type d\'environnement de travail préférez-vous ?', answer: 'Bureau moderne' }
      ]
    },
    {
      id: 2,
      studentName: 'Fatima Zahra',
      studentEmail: 'fatima.zahra@email.com',
      testType: 'Aptitudes Cognitives',
      status: 'completed',
      score: 92,
      completedAt: '2024-01-19',
      duration: '60 minutes',
      answers: [
        { question: 'Résolvez cette équation: 2x + 5 = 15', answer: 'x = 5' },
        { question: 'Quelle est la capitale du Japon ?', answer: 'Tokyo' },
        { question: 'Si A = 3 et B = 7, que vaut A + B ?', answer: '10' }
      ]
    },
    {
      id: 3,
      studentName: 'Omar Hassan',
      studentEmail: 'omar.hassan@email.com',
      testType: 'Personnalité',
      status: 'in_progress',
      score: null,
      completedAt: null,
      duration: '30 minutes',
      answers: []
    }
  ];

  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not_started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheck />;
      case 'in_progress': return <FaClock />;
      case 'not_started': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En Cours';
      case 'not_started': return 'Non Commencé';
      default: return 'Inconnu';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="tests-management">
      {/* Header avec statistiques */}
      <div className="management-header">
        <div className="header-left">
          <h2>Gestion des Tests</h2>
          <p>Consultez tous les tests effectués par les étudiants</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-number">{mockTests.length}</div>
            <div className="stat-label">Total Tests</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{mockTests.filter(test => test.status === 'completed').length}</div>
            <div className="stat-label">Terminés</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{mockTests.filter(test => test.status === 'in_progress').length}</div>
            <div className="stat-label">En Cours</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{Math.round(mockTests.filter(test => test.score).reduce((acc, test) => acc + test.score, 0) / mockTests.filter(test => test.score).length) || 0}</div>
            <div className="stat-label">Score Moyen</div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="management-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un test..."
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
            <option value="completed">Terminés</option>
            <option value="in_progress">En Cours</option>
            <option value="not_started">Non Commencés</option>
          </select>
        </div>
      </div>

      {/* Liste des tests */}
      <div className="tests-grid">
        {filteredTests.map((test) => (
          <div key={test.id} className="test-card">
            <div className="test-header">
              <div className="test-info">
                <div className="student-avatar">
                  <FaUser />
                </div>
                <div className="student-details">
                  <h3>{test.studentName}</h3>
                  <p>{test.studentEmail}</p>
                </div>
              </div>
              <div className={`status-badge ${getStatusColor(test.status)}`}>
                {getStatusIcon(test.status)}
                {getStatusText(test.status)}
              </div>
            </div>

            <div className="test-content">
              <div className="test-type">
                <FaChartBar className="test-icon" />
                <div>
                  <h4>{test.testType}</h4>
                  <p>Type de test</p>
                </div>
              </div>

              <div className="test-details">
                <div className="detail-item">
                  <FaCalendar className="detail-icon" />
                  <span>
                    {test.completedAt 
                      ? `Terminé le ${new Date(test.completedAt).toLocaleDateString('fr-FR')}`
                      : 'Non terminé'
                    }
                  </span>
                </div>
                <div className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>Durée: {test.duration}</span>
                </div>
                {test.score && (
                  <div className="detail-item">
                    <FaChartBar className="detail-icon" />
                    <span className={`score ${getScoreColor(test.score)}`}>
                      Score: {test.score}/100
                    </span>
                  </div>
                )}
              </div>

              {test.answers.length > 0 && (
                <div className="answers-preview">
                  <h4>Réponses:</h4>
                  <div className="answers-list">
                    {test.answers.slice(0, 2).map((answer, index) => (
                      <div key={index} className="answer-item">
                        <p><strong>Q:</strong> {answer.question}</p>
                        <p><strong>R:</strong> {answer.answer}</p>
                      </div>
                    ))}
                    {test.answers.length > 2 && (
                      <p className="more-answers">+{test.answers.length - 2} autres réponses...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="test-actions">
              <button 
                className="btn-action view"
                onClick={() => setSelectedTest(test)}
                title="Voir les détails"
              >
                <FaEye />
                Voir Détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedTest && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>Détails du test</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedTest(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="test-details-full">
                <div className="detail-section">
                  <h4>Informations étudiant</h4>
                  <p><strong>Nom:</strong> {selectedTest.studentName}</p>
                  <p><strong>Email:</strong> {selectedTest.studentEmail}</p>
                </div>
                <div className="detail-section">
                  <h4>Informations test</h4>
                  <p><strong>Type:</strong> {selectedTest.testType}</p>
                  <p><strong>Statut:</strong> {getStatusText(selectedTest.status)}</p>
                  <p><strong>Durée:</strong> {selectedTest.duration}</p>
                  {selectedTest.score && (
                    <p><strong>Score:</strong> <span className={getScoreColor(selectedTest.score)}>{selectedTest.score}/100</span></p>
                  )}
                  {selectedTest.completedAt && (
                    <p><strong>Terminé le:</strong> {new Date(selectedTest.completedAt).toLocaleDateString('fr-FR')}</p>
                  )}
                </div>
                {selectedTest.answers.length > 0 && (
                  <div className="detail-section">
                    <h4>Toutes les réponses</h4>
                    <div className="answers-full">
                      {selectedTest.answers.map((answer, index) => (
                        <div key={index} className="answer-full">
                          <h5>Question {index + 1}:</h5>
                          <p>{answer.question}</p>
                          <h5>Réponse:</h5>
                          <p className="answer-text">{answer.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setSelectedTest(null)}
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

export default TestsManagement;
