import React, { useState } from 'react';
import { 
  FaGraduationCap,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaClock,
  FaCalendarAlt,
  FaTrophy,
  FaStar,
  FaDownload,
  FaShare,
  FaEye,
  FaPlay,
  FaHistory,
  FaBookmark,
  FaArrowLeft,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaFileAlt,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaLightbulb,
  FaBullseye,
  FaRocket
} from 'react-icons/fa';
import './DetailedTestResults.css';

const DetailedTestResults = ({ testResults = [], onBack, onRetakeTest }) => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Données de démonstration si aucune donnée réelle
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
        {
          majorName: 'Sciences et Technologies',
          majorCode: 'ST001',
          matchingScore: 92,
          description: 'Parfait pour votre profil analytique et logique'
        },
        {
          majorName: 'Ingénierie',
          majorCode: 'ENG002',
          matchingScore: 88,
          description: 'Excellent choix pour votre créativité technique'
        },
        {
          majorName: 'Informatique',
          majorCode: 'CS003',
          matchingScore: 85,
          description: 'Idéal pour votre passion pour la technologie'
        }
      ],
      details: {
        totalQuestions: 14,
        answeredQuestions: 14,
        correctAnswers: 12,
        timeSpent: 45,
        averageTimePerQuestion: 3.2
      },
      pillarScores: {
        'Analytique': 88,
        'Créatif': 75,
        'Social': 82,
        'Pratique': 90,
        'Théorique': 85
      },
      questionAnalysis: [
        {
          questionId: 1,
          question: 'Quel type d\'activité préférez-vous ?',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          timeSpent: 2.5
        },
        {
          questionId: 2,
          question: 'Comment abordez-vous les problèmes ?',
          userAnswer: 'B',
          correctAnswer: 'C',
          isCorrect: false,
          timeSpent: 4.1
        }
      ],
      insights: [
        'Vous excellez dans la résolution de problèmes complexes',
        'Votre approche analytique est remarquable',
        'Vous pourriez développer davantage vos compétences créatives'
      ]
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
        {
          majorName: 'Programmes en anglais',
          majorCode: 'ENG001',
          matchingScore: 95,
          description: 'Votre niveau d\'anglais est excellent'
        },
        {
          majorName: 'Études internationales',
          majorCode: 'INT002',
          matchingScore: 90,
          description: 'Parfait pour un profil international'
        }
      ],
      details: {
        totalQuestions: 20,
        answeredQuestions: 20,
        correctAnswers: 18,
        timeSpent: 60,
        averageTimePerQuestion: 3.0
      },
      pillarScores: {
        'Compréhension': 95,
        'Expression': 88,
        'Grammaire': 92,
        'Vocabulaire': 90
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredResults = mockTestResults.filter(test => {
    if (filterCategory === 'all') return true;
    return test.category === filterCategory;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
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

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: FaChartLine },
    { id: 'detailed', label: 'Analyse détaillée', icon: FaChartBar },
    { id: 'recommendations', label: 'Recommandations', icon: FaBullseye },
    { id: 'history', label: 'Historique', icon: FaHistory }
  ];

  if (selectedTest) {
    return (
      <div className="detailed-test-results">
        {/* En-tête du test sélectionné */}
        <div className="test-header">
          <button className="back-btn" onClick={() => setSelectedTest(null)}>
            <FaArrowLeft />
            Retour
          </button>
          <div className="test-info">
            <div className="test-icon">
              {getCategoryIcon(selectedTest.category)}
            </div>
            <div className="test-details">
              <h2>{selectedTest.testName}</h2>
              <p>Complété le {formatDate(selectedTest.completedAt)}</p>
            </div>
          </div>
          <div className="test-score">
            <div className={`score-circle ${getScoreColor(selectedTest.score)}`}>
              <div className="score-number">{selectedTest.score}</div>
              <div className="score-max">/{selectedTest.maxScore}</div>
            </div>
            <div className="score-label">{getScoreLabel(selectedTest.score)}</div>
          </div>
        </div>

        {/* Onglets du test détaillé */}
        <div className="test-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="tab-icon" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        <div className="test-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCheckCircle />
                  </div>
                  <div className="stat-content">
                    <h3>{selectedTest.details.correctAnswers}</h3>
                    <p>Bonnes réponses</p>
                    <span className="stat-detail">sur {selectedTest.details.totalQuestions}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-content">
                    <h3>{selectedTest.details.timeSpent}</h3>
                    <p>Minutes</p>
                    <span className="stat-detail">temps total</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaTrophy />
                  </div>
                  <div className="stat-content">
                    <h3>{selectedTest.attempts}</h3>
                    <p>Tentative(s)</p>
                    <span className="stat-detail">au total</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaBullseye />
                  </div>
                  <div className="stat-content">
                    <h3>{selectedTest.recommendations.length}</h3>
                    <p>Recommandations</p>
                    <span className="stat-detail">générées</span>
                  </div>
                </div>
              </div>

              {selectedTest.pillarScores && (
                <div className="pillar-scores">
                  <h3>Analyse par Piliers</h3>
                  <div className="pillars-grid">
                    {Object.entries(selectedTest.pillarScores).map(([pillar, score]) => (
                      <div key={pillar} className="pillar-item">
                        <div className="pillar-header">
                          <span className="pillar-name">{pillar}</span>
                          <span className="pillar-score">{score}%</span>
                        </div>
                        <div className="pillar-bar">
                          <div 
                            className="pillar-fill"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'detailed' && (
            <div className="detailed-tab">
              {selectedTest.questionAnalysis && (
                <div className="question-analysis">
                  <h3>Analyse par Question</h3>
                  <div className="questions-list">
                    {selectedTest.questionAnalysis.map((question, index) => (
                      <div key={index} className="question-item">
                        <div className="question-header">
                          <span className="question-number">Q{question.questionId}</span>
                          <div className="question-status">
                            {question.isCorrect ? (
                              <FaCheckCircle className="correct" />
                            ) : (
                              <FaTimesCircle className="incorrect" />
                            )}
                          </div>
                          <span className="question-time">{question.timeSpent}s</span>
                        </div>
                        <div className="question-content">
                          <p>{question.question}</p>
                          <div className="question-answers">
                            <div className="answer-item">
                              <span className="answer-label">Votre réponse:</span>
                              <span className="answer-value">{question.userAnswer}</span>
                            </div>
                            {!question.isCorrect && (
                              <div className="answer-item">
                                <span className="answer-label">Bonne réponse:</span>
                                <span className="answer-value correct">{question.correctAnswer}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTest.insights && (
                <div className="insights-section">
                  <h3>
                    <FaLightbulb className="section-icon" />
                    Insights et Recommandations
                  </h3>
                  <div className="insights-list">
                    {selectedTest.insights.map((insight, index) => (
                      <div key={index} className="insight-item">
                        <FaRocket className="insight-icon" />
                        <p>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="recommendations-tab">
              <div className="recommendations-header">
                <h3>
                  <FaBullseye className="section-icon" />
                  Recommandations Personnalisées
                </h3>
                <p>Basées sur vos réponses et votre profil</p>
              </div>

              <div className="recommendations-grid">
                {selectedTest.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-header">
                      <div className="recommendation-rank">#{index + 1}</div>
                      <div className="recommendation-score">
                        <span className="score-value">{rec.matchingScore}%</span>
                        <span className="score-label">Correspondance</span>
                      </div>
                    </div>
                    <div className="recommendation-content">
                      <h4>{rec.majorName}</h4>
                      <p className="major-code">{rec.majorCode}</p>
                      <p className="recommendation-description">{rec.description}</p>
                    </div>
                    <div className="recommendation-actions">
                      <button className="action-btn primary">
                        <FaEye />
                        En savoir plus
                      </button>
                      <button className="action-btn secondary">
                        <FaBookmark />
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="history-header">
                <h3>
                  <FaHistory className="section-icon" />
                  Historique des Tentatives
                </h3>
                <p>Vos performances au fil du temps</p>
              </div>

              <div className="history-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker current"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>Tentative #{selectedTest.attempts}</h4>
                      <span className="timeline-date">{formatDate(selectedTest.completedAt)}</span>
                    </div>
                    <div className="timeline-score">
                      <span className="score-value">{selectedTest.score}%</span>
                      <span className="score-label">{getScoreLabel(selectedTest.score)}</span>
                    </div>
                    <div className="timeline-details">
                      <span>{selectedTest.details.correctAnswers}/{selectedTest.details.totalQuestions} bonnes réponses</span>
                      <span>{selectedTest.details.timeSpent} minutes</span>
                    </div>
                  </div>
                </div>

                {/* Simulation d'historique précédent */}
                <div className="timeline-item">
                  <div className="timeline-marker previous"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>Tentative #{selectedTest.attempts - 1}</h4>
                      <span className="timeline-date">12 avril 2024, 10:15</span>
                    </div>
                    <div className="timeline-score">
                      <span className="score-value">78%</span>
                      <span className="score-label">Moyen</span>
                    </div>
                    <div className="timeline-details">
                      <span>11/14 bonnes réponses</span>
                      <span>52 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions du test */}
        <div className="test-actions">
          <button className="action-btn primary" onClick={() => onRetakeTest && onRetakeTest(selectedTest.id)}>
            <FaPlay />
            Repasser le test
          </button>
          <button className="action-btn secondary">
            <FaDownload />
            Télécharger le rapport
          </button>
          <button className="action-btn secondary">
            <FaShare />
            Partager les résultats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detailed-test-results">
      {/* En-tête */}
      <div className="results-header">
        <div className="header-content">
          <h2>
            <FaGraduationCap className="header-icon" />
            Résultats Détaillés des Tests
          </h2>
          <p>Analysez vos performances et découvrez vos recommandations personnalisées</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary" onClick={onBack}>
            <FaArrowLeft />
            Retour au tableau de bord
          </button>
        </div>
      </div>

      {/* Filtres et tri */}
      <div className="results-filters">
        <div className="filter-group">
          <label>Catégorie:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Académique">Académique</option>
            <option value="Langues">Langues</option>
            <option value="Personnel">Personnel</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Trier par:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="date">Date</option>
            <option value="score">Score</option>
            <option value="name">Nom</option>
          </select>
        </div>
      </div>

      {/* Liste des tests */}
      <div className="results-list">
        {sortedResults.length > 0 ? (
          sortedResults.map((test) => (
            <div key={test.id} className="result-card" onClick={() => setSelectedTest(test)}>
              <div className="card-header">
                <div className="test-info">
                  <div className="test-icon">
                    {getCategoryIcon(test.category)}
                  </div>
                  <div className="test-details">
                    <h3>{test.testName}</h3>
                    <p className="test-type">{test.testType}</p>
                    <p className="test-date">Complété le {formatDate(test.completedAt)}</p>
                  </div>
                </div>
                <div className="test-score">
                  <div className={`score-circle ${getScoreColor(test.score)}`}>
                    <div className="score-number">{test.score}</div>
                    <div className="score-max">/{test.maxScore}</div>
                  </div>
                  <div className="score-label">{getScoreLabel(test.score)}</div>
                </div>
              </div>

              <div className="card-body">
                <div className="test-stats">
                  <div className="stat-item">
                    <FaCheckCircle className="stat-icon" />
                    <span>{test.details.correctAnswers}/{test.details.totalQuestions} bonnes réponses</span>
                  </div>
                  <div className="stat-item">
                    <FaClock className="stat-icon" />
                    <span>{test.details.timeSpent} minutes</span>
                  </div>
                  <div className="stat-item">
                    <FaTrophy className="stat-icon" />
                    <span>Tentative #{test.attempts}</span>
                  </div>
                </div>

                {test.recommendations && test.recommendations.length > 0 && (
                  <div className="recommendations-preview">
                    <h4>Top Recommandations:</h4>
                    <div className="recommendations-tags">
                      {test.recommendations.slice(0, 3).map((rec, index) => (
                        <span key={index} className="recommendation-tag">
                          {rec.majorName} ({rec.matchingScore}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button className="view-details-btn">
                  <FaEye />
                  Voir les détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaGraduationCap className="empty-icon" />
            <h3>Aucun test complété</h3>
            <p>Vous n'avez pas encore complété de tests. Commencez par passer un test d'orientation.</p>
            <button className="empty-action-btn">
              <FaPlay />
              Passer un test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedTestResults;
