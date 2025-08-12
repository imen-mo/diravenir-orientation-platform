import React from 'react';
import { Link } from 'react-router-dom';
import './Orientation.css';

const Orientation = () => {
  return (
    <div className="orientation-container">
      <div className="orientation-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Découvrez votre <span className="highlight">parcours idéal</span>
          </h1>
          <p className="hero-subtitle">
            Choisissez votre voie académique ou laissez notre test d'orientation vous guider vers les filières qui vous correspondent le mieux
          </p>
        </div>
      </div>

      <div className="orientation-choices">
        <div className="choice-card programs-choice">
          <div className="choice-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="choice-title">Explorer les Programmes</h2>
          <p className="choice-description">
            Parcourez notre catalogue complet de filières et programmes d'études disponibles dans nos universités partenaires
          </p>
          <Link to="/programs" className="choice-button programs-button">
            Découvrir les Programmes
          </Link>
        </div>

        <div className="choice-card test-choice">
          <div className="choice-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="choice-title">Test d'Orientation</h2>
          <p className="choice-description">
            Répondez à quelques questions et découvrez les filières qui correspondent parfaitement à votre profil
          </p>
          <Link to="/orientation/test" className="choice-button test-button">
            Démarrer le Test
          </Link>
        </div>
      </div>

      <div className="orientation-features">
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Programmes Personnalisés</h3>
          <p>Des filières adaptées à vos intérêts et objectifs</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h3>Test Scientifique</h3>
          <p>Un algorithme avancé pour des recommandations précises</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Accompagnement Complet</h3>
          <p>Du choix de filière jusqu'à l'inscription</p>
        </div>
      </div>
    </div>
  );
};

export default Orientation;
