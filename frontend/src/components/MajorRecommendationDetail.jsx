import React from 'react';
import { formatMajorRecommendation } from '../data/majorRecommendationsIndex';
import useDeviceType from '../hooks/useDeviceType';
import './MajorRecommendationDetail.css';

const MajorRecommendationDetail = ({ majorCode, matchPercentage, isExpanded = false, onToggle }) => {
  const { isMobile } = useDeviceType();
  const recommendation = formatMajorRecommendation(majorCode, matchPercentage);

  if (!recommendation) {
    return (
      <div className="major-recommendation-detail">
        <p className="no-recommendation">Aucune recommandation disponible pour cette majeure.</p>
      </div>
    );
  }

  return (
    <div className="major-recommendation-detail">
      {/* En-tête avec pourcentage de correspondance */}
      <div className="recommendation-header">
        <div className="match-percentage">
          <span className="percentage-value">{matchPercentage}%</span>
          <span className="percentage-label">Correspondance</span>
        </div>
        <div className="recommendation-title">
          <h3>{recommendation.title}</h3>
          <p className="match-text">{recommendation.matchText}</p>
        </div>
      </div>

      {/* Description de la majeure */}
      <div className="major-description-section">
        <p className="major-description">{recommendation.description}</p>
      </div>

      {/* Section "Pourquoi cette majeure est pour vous" */}
      <div className="reasons-section">
        <h4 className="reasons-title">
          {isMobile ? 'Pourquoi cette majeure ?' : 'Why this major is for you:'}
        </h4>
        
        <div className="reasons-list">
          {recommendation.reasons.map((reason, index) => (
            <div key={index} className="reason-item">
              <div className="reason-icon">{reason.icon}</div>
              <div className="reason-content">
                <h5 className="reason-title">{reason.title}</h5>
                <p className="reason-description">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton pour voir plus/moins (si nécessaire) */}
      {onToggle && (
        <button 
          className="toggle-details-btn"
          onClick={onToggle}
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
};

export default MajorRecommendationDetail;
