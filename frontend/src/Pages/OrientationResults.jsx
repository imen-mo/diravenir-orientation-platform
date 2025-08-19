import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orientationService from '../services/orientationService';
import './OrientationResults.css';

const OrientationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMajors, setShowAllMajors] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        console.log('🔍 Location state reçu:', location.state);
        
        // Récupérer les données depuis le state de navigation
        const { backendResponse, userAnswers, error: errorState } = location.state || {};
        
        if (errorState) {
          console.log('❌ Erreur dans le state:', errorState);
          setError(errorState);
          setLoading(false);
          return;
        }
        
        if (backendResponse) {
          console.log('✅ Utilisation de la réponse backend directe');
          setResults(backendResponse);
        } else if (userAnswers) {
          console.log('🔄 Envoi des réponses au backend pour calcul');
          try {
            const response = await orientationService.calculateOrientation(userAnswers);
            console.log('✅ Réponse du service d\'orientation:', response);
            setResults(response);
          } catch (err) {
            console.error('❌ Erreur lors du calcul:', err);
            setError('Erreur lors du calcul de l\'orientation: ' + err.message);
          }
        } else {
          console.log('❌ Aucune donnée disponible');
          setError('Aucune donnée disponible pour afficher les résultats');
        }
      } catch (err) {
        console.error('❌ Erreur lors de la récupération des résultats:', err);
        setError('Erreur lors de la récupération des résultats: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.state]);

  // Fonction pour tester l'API avec des données d'exemple
  const testWithExampleData = async () => {
    try {
      setLoading(true);
      console.log('🧪 Test de l\'API avec des données d\'exemple...');
      const testResponse = await orientationService.testWithExampleAnswers();
      console.log('✅ Test API réussi:', testResponse);
      setResults(testResponse);
      setError(null);
    } catch (err) {
      console.error('❌ Test API échoué:', err);
      setError('Test API échoué: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>🧠 Calcul de votre profil en cours...</p>
          <p className="loading-subtitle">Notre algorithme hybride évolutif analyse vos réponses</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="error-message">
          <h2>❌ Erreur de Connexion</h2>
          <p>{error}</p>
          <div className="error-details">
            <p>🔍 <strong>Diagnostic :</strong></p>
            <ul>
              <li>Vérifiez que le serveur backend est démarré sur le port 8084</li>
              <li>Vérifiez votre connexion internet</li>
              <li>Essayez de recharger la page</li>
            </ul>
          </div>
          <div className="error-actions">
            <button onClick={testWithExampleData} className="test-api-button">
              🧪 Tester l'API avec des données d'exemple
            </button>
            <button onClick={() => navigate('/orientation')} className="retry-button">
              🔄 Retour à l'orientation
            </button>
            <button onClick={() => window.location.reload()} className="reload-button">
              🔄 Recharger la page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-container">
        <div className="no-results">
          <h2>📋 Aucun résultat disponible</h2>
          <p>Veuillez compléter le test d'orientation pour voir vos résultats.</p>
          <div className="no-results-actions">
            <button onClick={testWithExampleData} className="test-api-button">
              🧪 Tester l'API avec des données d'exemple
            </button>
            <button onClick={() => navigate('/orientation')} className="start-test-button">
              🚀 Commencer le test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fonction pour obtenir la couleur du score
  const getScoreColor = (score) => {
    if (score >= 85) return '#22c55e'; // Vert pour excellent
    if (score >= 70) return '#16a34a'; // Vert foncé pour très bon
    if (score >= 55) return '#eab308'; // Jaune pour bon
    if (score >= 40) return '#f97316'; // Orange pour moyen
    return '#ef4444'; // Rouge pour faible
  };

  // Fonction pour obtenir l'émoji du rang
  const getRankEmoji = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  // Fonction pour obtenir la classe CSS du score
  const getScoreClass = (score) => {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-very-good';
    if (score >= 55) return 'score-good';
    if (score >= 40) return 'score-average';
    return 'score-low';
  };

  return (
    <div className="results-container">
      {/* En-tête des résultats */}
      <div className="results-header">
        <h1>🎯 Découvrez les majeures qui vous correspondent le mieux !</h1>
        <p className="results-subtitle">
          Basé sur notre algorithme hybride évolutif et vos réponses personnalisées
        </p>
      </div>

      {/* Résumé du profil */}
      {results.summary && (
        <div className="profile-summary">
          <h2>📊 Résumé de votre profil</h2>
          <p>{results.summary}</p>
        </div>
      )}

      {/* Top 3 des recommandations */}
      {results.top3Recommendations && results.top3Recommendations.length > 0 && (
        <div className="top-recommendations">
          <h2>🏆 Top 3 des recommandations</h2>
          <div className="recommendations-grid">
            {results.top3Recommendations.map((recommendation, index) => (
              <div key={index} className={`recommendation-card rank-${index + 1}`}>
                <div className="rank-badge">
                  {getRankEmoji(index)}
                </div>
                <h3 className="major-name">{recommendation.name}</h3>
                <div className="matching-score">
                  <span 
                    className={`score-value ${getScoreClass(recommendation.matchingScore)}`}
                    style={{ color: getScoreColor(recommendation.matchingScore) }}
                  >
                    {recommendation.matchingScore}%
                  </span>
                  <span className="score-label">de correspondance</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ 
                        width: `${recommendation.matchingScore}%`,
                        backgroundColor: getScoreColor(recommendation.matchingScore)
                      }}
                    ></div>
                  </div>
                </div>
                {recommendation.description && (
                  <p className="major-description">{recommendation.description}</p>
                )}
                {recommendation.explanation && (
                  <div className="why-this-major">
                    <h4>✨ Pourquoi cette majeure est faite pour vous</h4>
                    <p>{recommendation.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton pour afficher toutes les recommandations */}
      {results.allRecommendations && results.allRecommendations.length > 0 && (
        <div className="all-recommendations-section">
          <button 
            onClick={() => setShowAllMajors(!showAllMajors)} 
            className="toggle-all-majors-button"
          >
            {showAllMajors ? '📋 Masquer' : '📋 Voir'} toutes les recommandations ({results.allRecommendations.length})
          </button>
          
          {showAllMajors && (
            <div className="all-recommendations">
              <h2>📚 Toutes les recommandations</h2>
              <div className="recommendations-list">
                {results.allRecommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="item-header">
                      <span className="item-rank">#{index + 1}</span>
                      <h3 className="major-name">{recommendation.name}</h3>
                      <span 
                        className="item-score"
                        style={{ color: getScoreColor(recommendation.matchingScore) }}
                      >
                        {recommendation.matchingScore}%
                      </span>
                    </div>
                    {recommendation.description && (
                      <p className="item-description">{recommendation.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Informations de débogage (seulement en développement) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <h3>🐛 Informations de débogage (Développement)</h3>
          <p><strong>Type de results:</strong> {typeof results}</p>
          <p><strong>Clés disponibles:</strong> {Object.keys(results || {}).join(', ')}</p>
          <p><strong>Top 3 count:</strong> {results.top3Recommendations?.length || 0}</p>
          <p><strong>All count:</strong> {results.allRecommendations?.length || 0}</p>
          
          <button onClick={testWithExampleData} className="test-api-button">
            🧪 Tester l'API avec des données d'exemple
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="results-actions">
        <button onClick={() => navigate('/orientation/test')} className="retake-test-button">
          🔄 Reprendre le test
        </button>
        <button onClick={() => navigate('/orientation')} className="go-orientation-button">
          🎯 Retour à l'orientation
        </button>
        <button onClick={() => navigate('/')} className="go-home-button">
          🏠 Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default OrientationResults;
