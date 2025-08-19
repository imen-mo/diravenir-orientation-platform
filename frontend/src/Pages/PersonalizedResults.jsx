import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PersonalizedResults.css';

const PersonalizedResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setPersonalInfo(location.state.personalInfo);
      setResults(location.state.results);
      setLoading(false);
    } else {
      // Rediriger vers le test si pas de données
      navigate('/orientation-test');
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement de vos résultats personnalisés...</p>
      </div>
    );
  }

  if (!personalInfo || !results) {
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>Aucune donnée trouvée. Veuillez refaire le test d'orientation.</p>
        <button onClick={() => navigate('/orientation-test')} className="retry-button">
          Refaire le test
        </button>
      </div>
    );
  }

  return (
    <div className="personalized-results">
      {/* En-tête personnalisé avec le nom */}
      <div className="results-header">
        <div className="welcome-message">
          <h1>🎉 Félicitations, {personalInfo.nom} !</h1>
          <p>Votre test d'orientation est terminé. Voici vos résultats personnalisés :</p>
        </div>
        
        <div className="user-info-card">
          <div className="user-avatar">
            <span className="avatar-text">{personalInfo.nom.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h3>{personalInfo.nom}</h3>
            <p>📧 {personalInfo.email}</p>
            <p>📱 {personalInfo.telephone}</p>
          </div>
        </div>
      </div>

      {/* Résultats du test */}
      <div className="results-content">
        <div className="results-section">
          <h2>📊 Votre Profil d'Orientation</h2>
          
          {results.profilUtilisateur && (
            <div className="profile-summary">
              <h3>Profil Généré : {results.profilUtilisateur}</h3>
              <p>Ce profil reflète vos réponses au test et vos préférences personnelles.</p>
            </div>
          )}

          {results.top3Recommendations && results.top3Recommendations.length > 0 && (
            <div className="recommendations-section">
              <h3>🎯 Nos Recommandations pour Vous</h3>
              <div className="recommendations-grid">
                {results.top3Recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-rank">#{index + 1}</div>
                    <div className="recommendation-content">
                      <h4>{rec.majorName}</h4>
                      <p className="university">{rec.universityName}</p>
                      <p className="description">{rec.description}</p>
                      <div className="recommendation-details">
                        <span className="degree-type">{rec.degreeType}</span>
                        <span className="duration">{rec.duration} ans</span>
                        <span className="language">{rec.language}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.score && (
            <div className="score-section">
              <h3>📈 Votre Score</h3>
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-number">{Math.round(results.score)}</span>
                  <span className="score-label">/100</span>
                </div>
                <p className="score-description">
                  Ce score reflète la correspondance entre vos réponses et nos programmes recommandés.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions recommandées */}
        <div className="actions-section">
          <h3>🚀 Prochaines Étapes Recommandées</h3>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">📚</div>
              <h4>Explorer les Programmes</h4>
              <p>Découvrez en détail les programmes qui correspondent à votre profil.</p>
              <button onClick={() => navigate('/programs')} className="action-button">
                Voir les Programmes
              </button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">🎓</div>
              <h4>Contacter un Conseiller</h4>
              <p>Parlez avec nos experts pour affiner votre choix et planifier votre parcours.</p>
              <button onClick={() => navigate('/contact')} className="action-button">
                Contacter un Conseiller
              </button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">💼</div>
              <h4>Préparer votre Candidature</h4>
              <p>Commencez à préparer les documents nécessaires pour votre candidature.</p>
              <button onClick={() => navigate('/candidature')} className="action-button">
                Préparer ma Candidature
              </button>
            </div>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="contact-section">
          <h3>📞 Besoin d'Aide ?</h3>
          <p>
            Notre équipe est là pour vous accompagner dans votre parcours d'orientation. 
            N'hésitez pas à nous contacter pour toute question.
          </p>
          <div className="contact-buttons">
            <button onClick={() => navigate('/contact')} className="contact-button primary">
              📧 Nous Contacter
            </button>
            <button onClick={() => navigate('/faq')} className="contact-button secondary">
              ❓ FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Bouton de retour */}
      <div className="navigation-section">
        <button onClick={() => navigate('/orientation-test')} className="back-button">
          ← Refaire le Test
        </button>
        <button onClick={() => navigate('/')} className="home-button">
          🏠 Retour à l'Accueil
        </button>
      </div>
    </div>
  );
};

export default PersonalizedResults;
