import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrientationTest.css';

const OrientationTest = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    // Simulate a brief loading animation before navigating
    setTimeout(() => {
      navigate('/test/welcome');
    }, 1500);
  };

  return (
    <div className="test-welcome-container">
      <div className="test-welcome-hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="welcome-header">
            <h1 className="welcome-title">
              Prêt à découvrir votre <span className="highlight">voie idéale</span> ?
            </h1>
            <p className="welcome-subtitle">
              Notre test d'orientation scientifique va analyser vos intérêts, compétences et valeurs pour vous révéler les filières qui vous correspondent parfaitement
            </p>
          </div>

          <div className="test-info-cards">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>14 Questions</h3>
              <p>Un test rapide et engageant</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>5 Minutes</h3>
              <p>Résultats en temps réel</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔬</div>
              <h3>Algorithme Avancé</h3>
              <p>Recommandations précises</p>
            </div>
          </div>

          <div className="start-test-section">
            <div className="start-button-container">
              <button 
                className={`start-test-button ${isStarting ? 'starting' : ''}`}
                onClick={handleStartTest}
                disabled={isStarting}
              >
                {isStarting ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Préparation du test...</span>
                  </>
                ) : (
                  <>
                    <span>Démarrer le Test</span>
                    <div className="button-arrow">→</div>
                  </>
                )}
              </button>
            </div>
            
            {!isStarting && (
              <p className="start-note">
                Cliquez pour commencer votre voyage vers la découverte de soi
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="test-features">
        <div className="feature-section">
          <h2>Comment fonctionne notre test ?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">1</div>
              <h3>Répondez aux questions</h3>
              <p>Chaque question explore un aspect différent de votre personnalité et de vos intérêts</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">2</div>
              <h3>Analyse intelligente</h3>
              <p>Notre algorithme analyse vos réponses selon 17 piliers de compétences</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">3</div>
              <h3>Recommandations personnalisées</h3>
              <p>Recevez vos top 3 filières avec des explications détaillées</p>
            </div>
          </div>
        </div>
      </div>

      <div className="motivation-section">
        <div className="motivation-content">
          <h2>Votre avenir académique commence ici</h2>
          <p>
            Des milliers d'étudiants ont déjà découvert leur voie grâce à notre test. 
            Rejoignez-les dans cette aventure passionnante vers la réussite !
          </p>
          <div className="motivation-stats">
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">de satisfaction</span>
            </div>
            <div className="stat">
              <span className="stat-number">10k+</span>
              <span className="stat-label">étudiants guidés</span>
            </div>
            <div className="stat">
              <span className="stat-number">17</span>
              <span className="stat-label">piliers analysés</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationTest;
