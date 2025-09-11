import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import { useTheme } from '../contexts/ThemeContext';
import './OrientationWelcome.css';

const OrientationWelcome = () => {
  const { getText } = useTheme();
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/orientation/countdown');
  };

  return (
    <div className="orientation-welcome">
      <OrientationHeader />
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">
            {getText('orientationWelcomeTitle')} <span className="highlight">{getText('orientationTest')}</span>
          </h1>
          
          <div className="welcome-info">
            <div className="info-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#541652"/>
                </svg>
              </div>
              <h3>{getText('aboutTest')}</h3>
              <p>{getText('aboutTestDescription')}</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#541652" strokeWidth="2" fill="none"/>
                  <path d="M12 6V12L16 14" stroke="#541652" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>{getText('estimatedDuration')}</h3>
              <p>{getText('estimatedDurationDescription')}</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="#541652" strokeWidth="2" fill="none"/>
                  <path d="M21 21L16.65 16.65" stroke="#541652" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>{getText('personalizedResults')}</h3>
              <p>{getText('personalizedResultsDescription')}</p>
            </div>
          </div>
          
          <button 
            className="welcome-btn"
            onClick={handleStartTest}
          >
            {getText('startTest')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrientationWelcome;
