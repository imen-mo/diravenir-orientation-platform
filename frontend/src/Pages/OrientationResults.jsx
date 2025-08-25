import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orientationService from '../services/orientationService';
import GlobalLayout from '../components/GlobalLayout';
import './OrientationResults.css';

const OrientationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Location state reçu:', location.state);
        
        // Récupérer les données depuis le state de navigation
        const { results: backendResults, userAnswers, error: errorState, timestamp } = location.state || {};
        
        if (errorState) {
          console.log('❌ Erreur dans le state:', errorState);
          setError(errorState);
          setLoading(false);
          return;
        }
        
        if (backendResults && backendResults.topRecommendations && backendResults.topRecommendations.length > 0) {
          console.log('✅ Utilisation de la réponse backend directe');
          console.log('📊 Nombre de recommandations:', backendResults.topRecommendations.length);
          setResults(backendResults);
          
          // Afficher un message de succès
          if (timestamp) {
            console.log('⏰ Test complété à:', new Date(timestamp).toLocaleString());
          }
        } else if (userAnswers) {
          console.log('🔄 Envoi des réponses au backend pour calcul');
          try {
            const response = await orientationService.calculateOrientation(userAnswers);
            console.log('✅ Réponse du service d\'orientation:', response);
            
            if (response && response.topRecommendations) {
              setResults(response);
              console.log('🎯 Résultats calculés avec succès');
            } else {
              throw new Error('Réponse invalide du backend: pas de recommandations');
            }
          } catch (err) {
            console.error('❌ Erreur lors du calcul:', err);
            setError('Erreur lors du calcul de l\'orientation: ' + err.message);
          }
        } else {
          console.log('❌ Aucune donnée disponible');
          setError('Aucune donnée disponible pour afficher les résultats. Veuillez compléter le test d\'orientation.');
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
      setError(null);
      console.log('🧪 Test de l\'API avec des données d\'exemple...');
      
      const testResponse = await orientationService.testWithExampleAnswers();
      console.log('✅ Test API réussi:', testResponse);
      
      if (testResponse && testResponse.top3Recommendations) {
        setResults(testResponse);
        setError(null);
      } else {
        throw new Error('Réponse de test invalide');
      }
    } catch (err) {
      console.error('❌ Test API échoué:', err);
      setError('Test API échoué: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour réessayer avec les réponses originales
  const retryWithOriginalAnswers = async () => {
    try {
      setLoading(true);
      setError(null);
      setRetryCount(prev => prev + 1);
      
      const { answers } = location.state || {};
      if (!answers) {
        throw new Error('Aucune réponse disponible pour réessayer');
      }
      
      console.log('🔄 Nouvelle tentative avec les réponses originales...');
      const response = await orientationService.calculateOrientation(answers);
      
      if (response && response.topRecommendations) {
        setResults(response);
        setError(null);
      } else {
        throw new Error('Réponse invalide du backend');
      }
    } catch (err) {
      console.error('❌ Nouvelle tentative échouée:', err);
      setError('Nouvelle tentative échouée: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">🧠 Calcul de votre profil en cours...</p>
          <p className="loading-subtitle">Notre algorithme hybride évolutif analyse vos réponses</p>
          {retryCount > 0 && (
            <p className="loading-retry">Tentative {retryCount}...</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-page">
        <div className="error-container">
          <h2 className="error-title">❌ Erreur de Connexion</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button onClick={retryWithOriginalAnswers} className="retry-btn">
              �� Réessayer avec mes réponses
            </button>
            <button onClick={testWithExampleData} className="test-api-btn">
              🧪 Tester l'API avec des données d'exemple
            </button>
            <button onClick={() => navigate('/orientation/test')} className="back-btn">
              🔄 Retour au test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!results || !results.topRecommendations || results.topRecommendations.length === 0) {
    return (
      <div className="results-page">
        <div className="no-results-container">
          <h2 className="no-results-title">📋 Aucun résultat disponible</h2>
          <p className="no-results-message">Veuillez compléter le test d'orientation pour voir vos résultats.</p>
          <div className="no-results-actions">
            <button onClick={testWithExampleData} className="test-api-btn">
              🧪 Tester l'API avec des données d'exemple
            </button>
            <button onClick={() => navigate('/orientation/test')} className="start-test-btn">
              🚀 Commencer le test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GlobalLayout activePage="orientation">
      <div className="results-page">
        {/* En-tête avec icône et titre */}
        <div className="results-header">
          <div className="header-icon">💎</div>
          <h1 className="header-title">
            <span className="title-text">Great, this is your</span>
            <span className="title-highlight">major match</span>
          </h1>
          
          {/* Indicateur de mode test */}
          {location.state?.isTestMode && (
            <div className="test-mode-indicator">
              🧪 Mode Test - Navigation fonctionnelle
            </div>
          )}
        </div>

      {/* Cartes des programmes recommandés */}
      <div className="recommendations-container">
        {results.topRecommendations.map((recommendation, index) => (
          <div key={index} className="recommendation-card">
            {/* Cercle de pourcentage de correspondance */}
            <div className="match-percentage-circle">
              <div className="percentage-value">{Math.round(recommendation.matchingScore)}%</div>
              <div className="percentage-label">match with</div>
              <div className="program-name-highlight">{recommendation.program}</div>
            </div>
            
            {/* Titre du programme */}
            <h2 className="program-title">{recommendation.program}</h2>
            
            {/* Texte de compatibilité */}
            <p className="compatibility-text">Your compatibility is high</p>
            
            {/* Description du programme */}
            <p className="program-description">
              {recommendation.description || 'A well-structured program designed to provide students with strong academic and professional foundations.'}
            </p>
            
            {/* Explication personnalisée si disponible */}
            {recommendation.explanation && (
              <div className="personalized-explanation">
                <h4>💡 Pourquoi ce programme vous convient :</h4>
                <p>{recommendation.explanation}</p>
              </div>
            )}
            
            {/* Liste des caractéristiques clés */}
            <ul className="key-features">
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Focuses on solving real-world problems</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Prepares students for diverse career opportunities</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Theories build a strong social impact</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Résumé du profil si disponible */}
      {results.summary && (
        <div className="profile-summary">
          <h3>📊 Résumé de votre profil</h3>
          <p>{results.summary}</p>
        </div>
      )}

      {/* Section d'appel à l'action */}
      <div className="cta-section">
        <div className="cta-container">
          <p className="cta-text">Interested in these programs and ready to get started?</p>
          <button className="cta-button">Apply Now</button>
        </div>
      </div>

      {/* Actions de navigation */}
      <div className="navigation-actions">
        <button onClick={() => navigate('/orientation/test')} className="nav-btn retake-btn">
          🔄 Reprendre le test
        </button>
        <button onClick={() => navigate('/orientation')} className="nav-btn back-btn">
          🎯 Retour à l'orientation
        </button>
        <button onClick={() => navigate('/')} className="nav-btn home-btn">
          🏠 Retour à l'accueil
        </button>
      </div>

      {/* Informations de débogage (seulement en développement) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <h3>🐛 Informations de débogage (Développement)</h3>
          <p><strong>Type de results:</strong> {typeof results}</p>
          <p><strong>Clés disponibles:</strong> {Object.keys(results || {}).join(', ')}</p>
          <p><strong>Top 3 count:</strong> {results.top3Recommendations?.length || 0}</p>
          <p><strong>All count:</strong> {results.allRecommendations?.length || 0}</p>
          <p><strong>Profil utilisateur:</strong> {results.userProfile ? 'Disponible' : 'Non disponible'}</p>
          <p><strong>Mode test:</strong> {location.state?.isTestMode ? 'Oui' : 'Non'}</p>
          <p><strong>Timestamp:</strong> {location.state?.timestamp ? new Date(location.state.timestamp).toLocaleString() : 'Non disponible'}</p>
          
          <button onClick={testWithExampleData} className="test-api-btn">
            🧪 Tester l'API avec des données d'exemple
          </button>
        </div>
      )}
      </div>
    </GlobalLayout>
  );
};

export default OrientationResults;
