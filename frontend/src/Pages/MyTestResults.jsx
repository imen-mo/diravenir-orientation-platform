import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaDownload, FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import './MyTestResults.css';

const MyTestResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Récupérer l'email depuis localStorage ou demander à l'utilisateur
    const savedEmail = localStorage.getItem('userEmail') || '';
    if (savedEmail) {
      setUserEmail(savedEmail);
      loadUserResults(savedEmail);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserResults = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/orientation/results/email/${encodeURIComponent(email)}`);
      
      if (response.ok) {
        const userResults = await response.json();
        setResults(userResults);
        console.log('✅ Résultats chargés:', userResults);
      } else if (response.status === 404) {
        setResults([]);
        console.log('ℹ️ Aucun résultat trouvé pour cet email');
      } else {
        throw new Error('Erreur lors du chargement des résultats');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger vos résultats. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim()) {
      localStorage.setItem('userEmail', userEmail.trim());
      loadUserResults(userEmail.trim());
    }
  };

  const handleViewDetails = (result) => {
    // Naviguer vers la page de résultats détaillés
    navigate('/orientation/results', { 
      state: { 
        results: result,
        fromHistory: true 
      } 
    });
  };

  const handleDownloadReport = (result) => {
    // Générer et télécharger un rapport PDF
    const reportData = {
      userName: result.userName,
      userEmail: result.userEmail,
      completedAt: result.completedAt,
      topRecommendations: result.top3Recommendations,
      userProfile: result.userProfile
    };
    
    // Ici vous pouvez implémenter la génération de PDF
    console.log('📄 Génération du rapport pour:', reportData);
    alert('Fonctionnalité de téléchargement en cours de développement');
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

  if (loading) {
    return (
      <div className="my-test-results">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de vos résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-test-results">
      <div className="results-header">
        <h1>📊 Mes Résultats de Tests d'Orientation</h1>
        <p>Consultez l'historique de vos tests d'orientation et leurs recommandations</p>
      </div>

      {!userEmail && (
        <div className="email-form-section">
          <div className="email-form-card">
            <h2>🔍 Rechercher vos résultats</h2>
            <p>Entrez votre adresse email pour retrouver vos tests d'orientation précédents</p>
            
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope />
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              <button type="submit" className="search-btn">
                🔍 Rechercher mes résultats
              </button>
            </form>
          </div>
        </div>
      )}

      {userEmail && (
        <>
          <div className="user-info">
            <div className="user-card">
              <div className="user-icon">
                <FaUser />
              </div>
              <div className="user-details">
                <h3>Profil Utilisateur</h3>
                <p><FaEnvelope /> {userEmail}</p>
                <button 
                  className="change-email-btn"
                  onClick={() => {
                    setUserEmail('');
                    setResults([]);
                    localStorage.removeItem('userEmail');
                  }}
                >
                  Changer d'email
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
              <button onClick={() => loadUserResults(userEmail)}>
                Réessayer
              </button>
            </div>
          )}

          {results.length === 0 && !loading && (
            <div className="no-results">
              <div className="no-results-icon">📝</div>
              <h3>Aucun résultat trouvé</h3>
              <p>Vous n'avez pas encore passé de test d'orientation avec cette adresse email.</p>
              <button 
                className="take-test-btn"
                onClick={() => navigate('/orientation')}
              >
                🎯 Passer un test d'orientation
              </button>
            </div>
          )}

          {results.length > 0 && (
            <>
              <div className="results-summary">
                <div className="summary-card">
                  <div className="summary-icon">📊</div>
                  <div className="summary-content">
                    <h3>{results.length}</h3>
                    <p>Tests complétés</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">⭐</div>
                  <div className="summary-content">
                    <h3>
                      {Math.round(
                        results.reduce((acc, r) => {
                          const avgScore = r.averageMatchingScore || 0;
                          return acc + avgScore;
                        }, 0) / results.length
                      )}%
                    </h3>
                    <p>Score moyen</p>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">📅</div>
                  <div className="summary-content">
                    <h3>
                      {new Date(Math.max(...results.map(r => new Date(r.completedAt).getTime()))).toLocaleDateString()}
                    </h3>
                    <p>Dernier test</p>
                  </div>
                </div>
              </div>

              <div className="results-list">
                <h2>📋 Historique de vos tests</h2>
                
                {results.map((result, index) => (
                  <div key={result.id || index} className="result-card">
                    <div className="result-header">
                      <div className="result-info">
                        <h3>Test d'Orientation #{result.id || index + 1}</h3>
                        <div className="result-meta">
                          <span className="test-date">
                            <FaCalendarAlt />
                            {formatDate(result.completedAt)}
                          </span>
                          {result.testCompletionTimeMinutes && (
                            <span className="test-duration">
                              <FaClock />
                              {result.testCompletionTimeMinutes} minutes
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="result-score">
                        <div className={`score-circle ${getScoreColor(result.averageMatchingScore || 0)}`}>
                          <span className="score-number">
                            {Math.round(result.averageMatchingScore || 0)}
                          </span>
                          <span className="score-max">%</span>
                        </div>
                        <span className={`score-label ${getScoreColor(result.averageMatchingScore || 0)}`}>
                          {getScoreLabel(result.averageMatchingScore || 0)}
                        </span>
                      </div>
                    </div>

                    {result.top3Recommendations && result.top3Recommendations.length > 0 && (
                      <div className="result-recommendations">
                        <h4>🏆 Top 3 Recommandations:</h4>
                        <div className="recommendations-list">
                          {result.top3Recommendations.slice(0, 3).map((rec, idx) => (
                            <div key={idx} className="recommendation-item">
                              <span className="recommendation-rank">#{idx + 1}</span>
                              <span className="recommendation-name">
                                {rec.name || rec.majorName || 'Majeure'}
                              </span>
                              <span className="recommendation-score">
                                {Math.round(rec.score || rec.matchingScore || 0)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="result-actions">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewDetails(result)}
                        title="Voir les détails complets"
                      >
                        <FaEye />
                        Voir détails
                      </button>
                      <button 
                        className="action-btn download"
                        onClick={() => handleDownloadReport(result)}
                        title="Télécharger le rapport"
                      >
                        <FaDownload />
                        Rapport PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <div className="results-footer">
        <button 
          className="back-btn"
          onClick={() => navigate('/student-dashboard')}
        >
          ← Retour au tableau de bord
        </button>
        <button 
          className="new-test-btn"
          onClick={() => navigate('/orientation')}
        >
          🎯 Passer un nouveau test
        </button>
      </div>
    </div>
  );
};

export default MyTestResults;
