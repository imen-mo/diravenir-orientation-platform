import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import './CountdownPage.css';
import GlobalLayout from '../components/GlobalLayout';

const WelcomePage = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [currentFact, setCurrentFact] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Faits magiques et motivants
  const magicFacts = [
    {
      fact: "87% des étudiants qui trouvent leur passion réussissent mieux dans leurs études",
      highlight: "87%"
    },
    {
      fact: "Votre profil unique correspond à des carrières que vous n'auriez jamais imaginées",
      highlight: "profil unique"
    },
    {
      fact: "Notre algorithme hybride analyse 17 dimensions de votre personnalité",
      highlight: "17 dimensions"
    },
    {
      fact: "Chaque majeure a été étudiée par des experts pour correspondre à votre profil",
      highlight: "experts"
    },
    {
      fact: "Votre créativité et votre logique peuvent coexister parfaitement",
      highlight: "créativité"
    }
  ];

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdown(5);
    setCurrentFact(0);
  };

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown > 1) {
          setCurrentFact(5 - countdown);
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Afficher "Ready! Let's begin!" pendant 2 secondes
      setTimeout(() => {
        navigate('/orientation/test');
      }, 2000);
    }
  }, [showCountdown, countdown, navigate]);

  // Suivre la position de la souris pour les effets parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (showCountdown) {
    return (
      <div className="countdown-container">
        {/* Particules magiques flottantes */}
        <div className="magic-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 4}`}></div>
          ))}
        </div>
        
        <div className="countdown-content">
          {countdown > 0 ? (
            <>
              <div className="countdown-number">{countdown}</div>
              <div className="magic-quote">
                <div className="quote-text">{magicFacts[currentFact]?.fact}</div>
                <div className="quote-author">DirAvenir</div>
              </div>
              <div className="countdown-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${(5 - countdown) * 20}%` }}
                ></div>
              </div>
            </>
          ) : (
            <div className="ready-message">
              <div className="ready-text">Ready!</div>
              <div className="lets-begin-text">Let's begin!</div>
              <div className="ready-emoji">🚀</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <GlobalLayout activePage="welcome">
      <div className="welcome-container">
      {/* Background animé avec effet parallax */}
      <div className="floating-shapes">
        <div 
          className="shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        ></div>
        <div 
          className="shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        ></div>
        <div 
          className="shape shape-4"
          style={{
            transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px)`
          }}
        ></div>
        <div 
          className="shape shape-5"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        ></div>
      </div>

      {/* Grille de points animés */}
      <div className="grid-dots">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="grid-dot"
            style={{
              animationDelay: `${i * 0.1}s`,
              left: `${(i % 10) * 10}%`,
              top: `${Math.floor(i / 10) * 10}%`
            }}
          ></div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="welcome-content">
        <div className="welcome-header">
          <h1 className="welcome-title">
            <span className="title-line">Bienvenue dans votre</span>
            <span className="title-line highlight">avenir académique</span>
          </h1>
          <p className="welcome-subtitle">
            Découvrez la majeure qui correspond parfaitement à votre personnalité unique
          </p>
        </div>

        <div className="welcome-illustration">
          <div className="illustration-container">
            <div className="floating-elements">
              <div className="element element-1">
                <div className="element-icon">⚡</div>
                <div className="element-glow"></div>
              </div>
              <div className="element element-2">
                <div className="element-icon">💎</div>
                <div className="element-glow"></div>
              </div>
              <div className="element element-3">
                <div className="element-icon">🌟</div>
                <div className="element-glow"></div>
              </div>
              <div className="element element-4">
                <div className="element-icon">🚀</div>
                <div className="element-glow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-features">
          <div className="feature-card">
            <div className="feature-icon-container">
              <div className="feature-icon">🔬</div>
              <div className="icon-ripple"></div>
            </div>
            <h3>Algorithme Hybride Évolutif</h3>
            <p>Analyse 17 dimensions de votre personnalité avec une précision de 95%</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container">
              <div className="feature-icon">🎨</div>
              <div className="icon-ripple"></div>
            </div>
            <h3>Profil Personnalisé</h3>
            <p>Découvrez vos forces cachées et vos talents naturels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container">
              <div className="feature-icon">🌍</div>
              <div className="icon-ripple"></div>
            </div>
            <h3>40+ Majeures</h3>
            <p>Des domaines passionnants qui correspondent à votre profil unique</p>
          </div>
        </div>

        <div className="welcome-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={startCountdown}
          >
            <span className="btn-text">Démarrer le Test d'Orientation</span>
            <span className="btn-glow"></span>
            <span className="btn-particles"></span>
          </button>
          <button 
            className="btn btn-secondary btn-large"
            onClick={() => navigate('/programs')}
          >
            <span className="btn-text">Découvrir les Programmes</span>
            <span className="btn-glow"></span>
            <span className="btn-particles"></span>
          </button>
        </div>

        <div className="welcome-stats">
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Précision</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">17</div>
            <div className="stat-label">Dimensions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">40+</div>
            <div className="stat-label">Majeures</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3min</div>
            <div className="stat-label">Test</div>
          </div>
        </div>
      </div>
    </div>
    </GlobalLayout>
  );
};

export default WelcomePage;
