import React, { useState, useEffect } from 'react';
import { FaChartBar, FaDownload, FaEye, FaCalendarAlt, FaClock, FaTrophy, FaSpinner } from 'react-icons/fa';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import apiService from '../services/api';
import './StudentTestResults.css';

const StudentTestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);

  // Charger les données réelles depuis l'API uniquement

  useEffect(() => {
    loadTestResults();
  }, []);

  const loadTestResults = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📊 Chargement des résultats de tests depuis la base de données...');
      
      const response = await apiService.getStudentTestResults();
      if (response && response.testResults) {
        setTestResults(response.testResults);
        console.log('✅ Résultats de tests chargés:', response.testResults.length);
      } else {
        setTestResults([]);
        console.log('ℹ️ Aucun résultat de test trouvé');
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement résultats tests:', error);
      setError('Erreur lors du chargement des résultats des tests depuis la base de données');
      setTestResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#10B981'; // Vert
    if (score >= 80) return '#F59E0B'; // Orange
    if (score >= 70) return '#3B82F6'; // Bleu
    return '#EF4444'; // Rouge
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Très bien';
    if (score >= 70) return 'Bien';
    return 'À améliorer';
  };

  const handleDownloadResults = (testId) => {
    // Simulation du téléchargement
    console.log('Téléchargement des résultats pour le test:', testId);
  };

  if (loading) {
    return (
      <StudentLayoutFinal>
        <div className="test-results-loading">
          <FaSpinner className="animate-spin" />
          <span>Chargement de vos résultats de tests...</span>
        </div>
      </StudentLayoutFinal>
    );
  }

  return (
    <StudentLayoutFinal>
      <div className="student-test-results-container">
        <div className="test-results-header">
          <h1>Résultats des Tests</h1>
          <p>Consultez vos performances et découvrez vos recommandations</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="test-results-stats">
          <div className="stat-item">
            <span className="stat-number">{testResults.length}</span>
            <span className="stat-label">Tests complétés</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Math.round(testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length) || 0}
            </span>
            <span className="stat-label">Score moyen</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {testResults.filter(test => test.score >= 80).length}
            </span>
            <span className="stat-label">Tests réussis</span>
          </div>
        </div>

        {testResults.length === 0 ? (
          <div className="no-test-results">
            <div className="no-results-icon">
              <FaChartBar />
            </div>
            <h3>Aucun résultat de test disponible</h3>
            <p>Vous n'avez pas encore passé de tests. Commencez par explorer les tests d'orientation disponibles.</p>
            <button className="primary-btn">
              Passer un test
            </button>
          </div>
        ) : (
          <div className="test-results-grid">
            {testResults.map(test => (
            <div key={test.id} className="test-result-card">
              <div className="test-header">
                <div className="test-title">
                  <h3>{test.testName}</h3>
                  <p className="test-category">{test.category}</p>
                </div>
                <div className="test-score">
                  <div 
                    className="score-circle"
                    style={{ 
                      background: `conic-gradient(${getScoreColor(test.score)} ${test.score * 3.6}deg, #E5E7EB 0deg)` 
                    }}
                  >
                    <div className="score-inner">
                      <span className="score-number">{test.score}</span>
                      <span className="score-max">/{test.maxScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="test-info">
                <div className="info-item">
                  <FaCalendarAlt />
                  <span>{new Date(test.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="info-item">
                  <FaClock />
                  <span>{test.duration}</span>
                </div>
                <div className="info-item">
                  <FaTrophy />
                  <span style={{ color: getScoreColor(test.score) }}>
                    {getScoreLabel(test.score)}
                  </span>
                </div>
              </div>

              <div className="test-description">
                <p>{test.description}</p>
              </div>

              <div className="test-results-summary">
                <div className="result-section">
                  <h4>Points forts</h4>
                  <div className="strengths-list">
                    {test.results.strengths.map((strength, index) => (
                      <span key={index} className="strength-tag">{strength}</span>
                    ))}
                  </div>
                </div>

                <div className="result-section">
                  <h4>Recommandations</h4>
                  <div className="recommendations-list">
                    {test.results.recommendations.map((rec, index) => (
                      <span key={index} className="recommendation-tag">{rec}</span>
                    ))}
                  </div>
                </div>

                <div className="result-section">
                  <h4>Profil de personnalité</h4>
                  <p className="personality-text">{test.results.personality}</p>
                </div>
              </div>

              <div className="test-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedTest(test)}
                >
                  <FaEye />
                  Voir le détail
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleDownloadResults(test.id)}
                >
                  <FaDownload />
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        {testResults.length === 0 && (
          <div className="no-test-results">
            <div className="no-results-icon">
              <FaChartBar />
            </div>
            <h3>Aucun résultat de test disponible</h3>
            <p>Vous n'avez pas encore passé de tests. Commencez par explorer les tests d'orientation disponibles.</p>
            <button className="primary-btn">
              Passer un test
            </button>
          </div>
        )}

        {/* Modal de détail du test */}
        {selectedTest && (
          <div className="test-detail-modal">
            <div className="modal-overlay" onClick={() => setSelectedTest(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{selectedTest.testName}</h2>
                  <button 
                    className="modal-close"
                    onClick={() => setSelectedTest(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="detail-score">
                    <div className="score-display">
                      <span className="score-number">{selectedTest.score}</span>
                      <span className="score-max">/{selectedTest.maxScore}</span>
                    </div>
                    <p className="score-label">{getScoreLabel(selectedTest.score)}</p>
                  </div>
                  
                  <div className="detail-results">
                    <h3>Analyse détaillée</h3>
                    <div className="result-section">
                      <h4>Points forts identifiés</h4>
                      <ul>
                        {selectedTest.results.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="result-section">
                      <h4>Recommandations de carrière</h4>
                      <ul>
                        {selectedTest.results.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="result-section">
                      <h4>Profil de personnalité</h4>
                      <p>{selectedTest.results.personality}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        )}
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentTestResults;
