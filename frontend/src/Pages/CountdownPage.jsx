import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountdownPage.css';

const CountdownPage = ({ onComplete, initialCount = 5 }) => {
  const [countdown, setCountdown] = useState(initialCount);
  const [currentFact, setCurrentFact] = useState(0);
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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown > 1) {
          setCurrentFact(initialCount - countdown);
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Afficher "Ready! Let's begin!" pendant 2 secondes
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          navigate('/orientation/test');
        }
      }, 2000);
    }
  }, [countdown, navigate, onComplete, initialCount]);

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
                style={{ width: `${(initialCount - countdown) * (100/initialCount)}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="ready-message">
            <div className="ready-text">Ready!</div>
            <div className="lets-begin-text">Let's begin!</div>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownPage;
