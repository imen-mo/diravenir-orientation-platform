import React from 'react';
import { useNavigate } from 'react-router-dom';
import orientationHome from '../assets/orientation-home.png';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationChoice.css';

const OrientationChoice = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/orientation/welcome');
  };

  const handleViewPrograms = () => {
    navigate('/programs');
  };

  return (
    <div className="orientation-choice">
      <OrientationHeader />
      <div className="choice-container">
        <div className="choice-left">
          <h1 className="choice-title">
            Trouvez votre <span className="highlight">majeure idéale</span>
          </h1>
          <p className="choice-subtitle">
            Découvrez les programmes qui correspondent à votre profil
          </p>
          
          <div className="choice-buttons">
            <button 
              className="btn-primary"
              onClick={handleStartTest}
            >
              Commencer le test
            </button>
            <button 
              className="btn-secondary"
              onClick={handleViewPrograms}
            >
              Voir les programmes
            </button>
          </div>
        </div>
        
        <div className="choice-right">
          <img 
            src={orientationHome} 
            alt="Orientation universitaire" 
            className="choice-image"
          />
        </div>
      </div>
    </div>
  );
};

export default OrientationChoice;
