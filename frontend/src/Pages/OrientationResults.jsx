import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orientationService from '../services/orientationService';
import ApiTestComponent from '../components/ApiTestComponent';
import SimpleApiTest from '../components/SimpleApiTest';
import './OrientationResults.css';

const OrientationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        // Debug: Afficher les données reçues
        console.log('🔍 Location state reçu:', location.state);
        console.log('🔍 Location pathname:', location.pathname);
        
        // Récupérer les données depuis le state de navigation
        const { backendResponse, userAnswers } = location.state || {};
        
        console.log('🔍 BackendResponse:', backendResponse);
        console.log('🔍 UserAnswers:', userAnswers);
        
        if (backendResponse) {
          console.log('✅ Utilisation de la réponse backend directe');
          setResults(backendResponse);
        } else if (userAnswers) {
          console.log('🔄 Envoi des réponses au backend pour calcul');
          // Envoyer les réponses au backend pour calcul via le service
          const response = await orientationService.calculateOrientation(userAnswers);
          console.log('✅ Réponse du service d\'orientation:', response);
          setResults(response);
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

  // Debug: Afficher l'état actuel
  console.log('🔍 État actuel - Loading:', loading, 'Error:', error, 'Results:', results);

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Calcul de votre profil en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="error-message">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/orientation')} className="retry-button">
            Réessayer le test
          </button>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-container">
      <div className="no-results">
          <h2>Aucun résultat disponible</h2>
          <p>Veuillez compléter le test d'orientation pour voir vos résultats.</p>
          <button onClick={() => navigate('/orientation')} className="start-test-button">
            Commencer le test
          </button>
        </div>
      </div>
    );
  }

  // Debug: Afficher la structure des résultats
  console.log('🔍 Structure des résultats:', {
    hasSummary: !!results.summary,
    hasTop3: !!results.top3Recommendations,
    top3Length: results.top3Recommendations?.length,
    hasAll: !!results.allRecommendations,
    allLength: results.allRecommendations?.length
  });

  return (
      <div className="results-container">
      {/* Test simple de l'API en haut de page */}
      <SimpleApiTest />
      
      {/* En-tête des résultats */}
        <div className="results-header">
        <h1>🎯 Découvrez les majeures qui vous correspondent le mieux !</h1>
        <p className="results-subtitle">
          Basé sur vos réponses, voici notre analyse de votre profil et nos recommandations
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
          <h2>🥇 Top 3 des recommandations</h2>
          <div className="recommendations-grid">
            {results.top3Recommendations.map((recommendation, index) => (
              <div key={index} className={`recommendation-card rank-${index + 1}`}>
                <div className="rank-badge">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <h3 className="major-name">{recommendation.name}</h3>
                  <div className="matching-score">
                  <span className="score-value">{recommendation.matchingScore}%</span>
                    <span className="score-label">de correspondance</span>
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

      {/* Toutes les recommandations */}
      {results.allRecommendations && results.allRecommendations.length > 0 && (
        <div className="all-recommendations">
          <h2>📋 Toutes les recommandations</h2>
          <div className="recommendations-list">
            {results.allRecommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <div className="item-header">
                  <span className="item-rank">#{index + 1}</span>
                  <h3 className="major-name">{recommendation.name}</h3>
                  <span className="item-score">{recommendation.matchingScore}%</span>
                </div>
                {recommendation.description && (
                  <p className="item-description">{recommendation.description}</p>
                )}
              </div>
            ))}
              </div>
            </div>
      )}

      {/* Debug: Afficher les données brutes si pas de résultats */}
      {(!results.top3Recommendations || results.top3Recommendations.length === 0) && (
        <div className="debug-info" style={{background: '#f0f0f0', padding: '20px', margin: '20px', borderRadius: '8px'}}>
          <h3>🐛 Informations de débogage</h3>
          <p><strong>Type de results:</strong> {typeof results}</p>
          <p><strong>Clés disponibles:</strong> {Object.keys(results || {}).join(', ')}</p>
          
          {/* Bouton de test pour vérifier l'API */}
          <div style={{marginTop: '20px'}}>
            <button 
              onClick={async () => {
                try {
                  console.log('🧪 Test de l\'API avec des données d\'exemple...');
                  const testResponse = await orientationService.testWithExampleAnswers();
                  console.log('✅ Test API réussi:', testResponse);
                  setResults(testResponse);
                } catch (err) {
                  console.error('❌ Test API échoué:', err);
                  setError('Test API échoué: ' + err.message);
                }
              }}
              style={{
                background: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              🧪 Tester l'API avec des données d'exemple
            </button>
            </div>

          <pre style={{background: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto', marginTop: '20px'}}>
            {JSON.stringify(results, null, 2)}
          </pre>
                </div>
      )}

      {/* Composant de test de l'API */}
      <ApiTestComponent />

      {/* Actions */}
      <div className="results-actions">
        <button onClick={() => navigate('/orientation')} className="retake-test-button">
          🔄 Reprendre le test
        </button>
        <button onClick={() => navigate('/')} className="go-home-button">
          🏠 Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default OrientationResults;
