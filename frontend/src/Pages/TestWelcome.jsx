import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestWelcome.css';

const TestWelcome = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    // Animation de chargement avant de naviguer vers le test
    setTimeout(() => {
      navigate('/orientation/test');
    }, 2000);
  };

  return (
    <div className="test-welcome-container">
      <div className="welcome-background">
        <div className="gradient-overlay"></div>
        <div className="floating-elements">
          <div className="element element-1">🎯</div>
          <div className="element element-2">⚡</div>
          <div className="element element-3">🔬</div>
          <div className="element element-4">💡</div>
          <div className="element element-5">🚀</div>
          <div className="element element-6">🌟</div>
          <div className="element element-7">🎨</div>
          <div className="element element-8">🧠</div>
        </div>
      </div>

      <div className="welcome-content">
        <div className="welcome-header">
          <div className="welcome-badge">
            <span>🧠 Test d'Orientation Scientifique</span>
          </div>
          <h1 className="welcome-title">
            Bienvenue dans votre <span className="highlight">voyage de découverte</span>
          </h1>
          <p className="welcome-subtitle">
            Préparez-vous à explorer les profondeurs de votre personnalité et à découvrir 
            les filières qui correspondent parfaitement à votre profil unique grâce à notre 
            <strong> algorithme hybride évolutif</strong>
          </p>
        </div>

        <div className="test-overview">
          <div className="overview-card">
            <div className="overview-icon">📝</div>
            <h3>14 Questions Intelligentes</h3>
            <p>Un parcours personnalisé pour comprendre vos motivations profondes</p>
          </div>
          <div className="overview-card">
            <div className="overview-icon">⏱️</div>
            <h3>5-7 Minutes</h3>
            <p>Un test rapide mais complet pour des résultats précis et proportionnels</p>
          </div>
          <div className="overview-card">
            <div className="overview-icon">🎯</div>
            <h3>Résultats Immédiats</h3>
            <p>Vos recommandations personnalisées avec scores de correspondance réalistes</p>
          </div>
        </div>

        <div className="start-section">
          <div className="start-button-wrapper">
            <button 
              className={`start-test-btn ${isStarting ? 'starting' : ''}`}
              onClick={handleStartTest}
              disabled={isStarting}
            >
              {isStarting ? (
                <>
                  <div className="loading-animation">
                    <div className="loading-circle"></div>
                    <div className="loading-text">Préparation de l'algorithme...</div>
                  </div>
                </>
              ) : (
                <>
                  <span>🚀 Démarrer le Test</span>
                  <div className="btn-arrow">→</div>
                </>
              )}
            </button>
          </div>
          
          {!isStarting && (
            <div className="start-info">
              <p className="start-note">
                Cliquez pour commencer votre exploration personnalisée
              </p>
              <div className="confidence-indicators">
                <div className="indicator">
                  <span className="indicator-dot"></span>
                  <span>🔒 Confidentiel</span>
                </div>
                <div className="indicator">
                  <span className="indicator-dot"></span>
                  <span>✅ Sans engagement</span>
                </div>
                <div className="indicator">
                  <span className="indicator-dot"></span>
                  <span>🎁 Gratuit</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="motivation-section">
          <div className="motivation-content">
            <h2>✨ Pourquoi ce test est unique et révolutionnaire ?</h2>
            <div className="motivation-grid">
              <div className="motivation-item">
                <div className="motivation-icon">🧠</div>
                <h3>Algorithme Hybride Évolutif</h3>
                <p>Basé sur 17 piliers de compétences validés par des experts en orientation et psychologie cognitive</p>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">🎨</div>
                <h3>Personnalisation Avancée</h3>
                <p>Chaque question s'adapte à votre profil unique avec des scores proportionnels et réalistes</p>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">🌍</div>
                <h3>Perspectives Internationales</h3>
                <p>Découvrez des opportunités dans 44 majeures disponibles dans le monde entier</p>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">📊</div>
                <h3>Analyse Scientifique</h3>
                <p>Résultats basés sur des algorithmes de machine learning et d'analyse comportementale</p>
              </div>
            </div>
          </div>
        </div>

        <div className="test-tips">
          <h3>💡 Conseils pour un test optimal et des résultats précis</h3>
          <ul className="tips-list">
            <li>🎯 <strong>Répondez spontanément</strong> - Ne réfléchissez pas trop longtemps, votre première intuition est souvent la meilleure</li>
            <li>🤝 <strong>Soyez honnête avec vous-même</strong> - Il n'y a pas de bonnes ou mauvaises réponses, seulement votre vérité</li>
            <li>💭 <strong>Choisissez l'option qui vous ressemble le plus</strong> - Pas celle que vous pensez être la "bonne"</li>
            <li>🌟 <strong>Faites confiance à notre algorithme</strong> - Il a été conçu pour vous donner des résultats proportionnels et réalistes</li>
          </ul>
        </div>

        <div className="scientific-background">
          <h3>🔬 Fondements Scientifiques de Notre Test</h3>
          <div className="scientific-grid">
            <div className="scientific-item">
              <h4>Psychologie Cognitive</h4>
              <p>Basé sur les théories de Gardner, Holland et les modèles de personnalité Big Five</p>
            </div>
            <div className="scientific-item">
              <h4>Machine Learning</h4>
              <p>Algorithme qui s'améliore continuellement grâce aux données de milliers d'étudiants</p>
            </div>
            <div className="scientific-item">
              <h4>Validation Expert</h4>
              <p>Testé et validé par des conseillers d'orientation et des psychologues</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h3>🚀 Prêt à découvrir votre voie ?</h3>
          <p>Commencez maintenant et obtenez des résultats en moins de 10 minutes !</p>
          <button 
            className="cta-button"
            onClick={handleStartTest}
            disabled={isStarting}
          >
            {isStarting ? 'Préparation...' : '🎯 Commencer Maintenant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestWelcome;
