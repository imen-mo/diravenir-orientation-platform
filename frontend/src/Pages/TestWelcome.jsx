import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestWelcome.css';

const TestWelcome = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    // Simulate a brief loading animation before navigating to the first question
    setTimeout(() => {
      navigate('/test-question/1');
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
        </div>
      </div>

      <div className="welcome-content">
        <div className="welcome-header">
          <div className="welcome-badge">
            <span>Test d'Orientation</span>
          </div>
          <h1 className="welcome-title">
            Bienvenue dans votre <span className="highlight">voyage de découverte</span>
          </h1>
          <p className="welcome-subtitle">
            Préparez-vous à explorer les profondeurs de votre personnalité et à découvrir 
            les filières qui correspondent parfaitement à votre profil unique
          </p>
        </div>

        <div className="test-overview">
          <div className="overview-card">
            <div className="overview-icon">📝</div>
            <h3>14 Questions</h3>
            <p>Un parcours personnalisé pour comprendre vos motivations</p>
          </div>
          <div className="overview-card">
            <div className="overview-icon">⏱️</div>
            <h3>5-7 Minutes</h3>
            <p>Un test rapide mais complet pour des résultats précis</p>
          </div>
          <div className="overview-card">
            <div className="overview-icon">🎯</div>
            <h3>Résultats Immédiats</h3>
            <p>Vos recommandations personnalisées en temps réel</p>
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
                    <div className="loading-text">Préparation...</div>
                  </div>
                </>
              ) : (
                <>
                  <span>Démarrer le Test</span>
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
                  <span>Confidentiel</span>
                </div>
                <div className="indicator">
                  <span className="indicator-dot"></span>
                  <span>Sans engagement</span>
                </div>
                <div className="indicator">
                  <span className="indicator-dot"></span>
                  <span>Gratuit</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="motivation-section">
          <div className="motivation-content">
            <h2>Pourquoi ce test est unique ?</h2>
            <div className="motivation-grid">
              <div className="motivation-item">
                <div className="motivation-icon">🧠</div>
                <h3>Algorithme Scientifique</h3>
                <p>Basé sur 17 piliers de compétences validés par des experts</p>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">🎨</div>
                <h3>Personnalisation Avancée</h3>
                <p>Chaque question s'adapte à votre profil unique</p>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">🌍</div>
                <h3>Perspectives Internationales</h3>
                <p>Découvrez des opportunités dans le monde entier</p>
              </div>
            </div>
          </div>
        </div>

        <div className="test-tips">
          <h3>💡 Conseils pour un test optimal</h3>
          <ul className="tips-list">
            <li>Répondez spontanément, ne réfléchissez pas trop longtemps</li>
            <li>Soyez honnête avec vous-même</li>
            <li>Choisissez l'option qui vous ressemble le plus</li>
            <li>Il n'y a pas de bonnes ou mauvaises réponses</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestWelcome;
