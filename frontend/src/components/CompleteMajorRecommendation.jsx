import React, { useState } from 'react';
import { formatMajorRecommendation } from '../data/majorRecommendationsIndex';
import { getIdealProfile, calculateMatchingScore, getStrongestPillars, getPillarDisplayName } from '../data/idealProfilesData';
import useDeviceType from '../hooks/useDeviceType';
import './CompleteMajorRecommendation.css';

const CompleteMajorRecommendation = ({ 
  majorCode, 
  userPillarScores, 
  isExpanded = false, 
  onToggle,
  showPillarDetails = false 
}) => {
  const { isMobile } = useDeviceType();
  const [showPillars, setShowPillars] = useState(showPillarDetails);
  
  // Obtenir les données
  const recommendation = formatMajorRecommendation(majorCode, 0); // Score sera calculé
  const idealProfile = getIdealProfile(majorCode);
  
  if (!recommendation || !idealProfile) {
    return (
      <div className="complete-major-recommendation">
        <p className="no-recommendation">Aucune recommandation disponible pour cette majeure.</p>
      </div>
    );
  }
  
  // Calculer le score de correspondance
  const matchingScore = calculateMatchingScore(userPillarScores, idealProfile.pillarScores);
  const strongestPillars = getStrongestPillars(userPillarScores, idealProfile.pillarScores);
  
  // Mettre à jour le texte de correspondance
  const updatedRecommendation = {
    ...recommendation,
    matchText: `Your profile matches ${matchingScore.toFixed(1)}% with this major.`
  };

  return (
    <div className="complete-major-recommendation">
      {/* En-tête avec pourcentage de correspondance */}
      <div className="recommendation-header">
        <div className="match-percentage">
          <span className="percentage-value">{matchingScore.toFixed(0)}%</span>
          <span className="percentage-label">Correspondance</span>
        </div>
        <div className="recommendation-title">
          <h3>{updatedRecommendation.title}</h3>
          <p className="match-text">{updatedRecommendation.matchText}</p>
        </div>
      </div>

      {/* Description de la majeure */}
      <div className="major-description-section">
        <p className="major-description">{updatedRecommendation.description}</p>
      </div>

      {/* Section "Pourquoi cette majeure est pour vous" */}
      <div className="reasons-section">
        <h4 className="reasons-title">
          {isMobile ? 'Pourquoi cette majeure ?' : 'Why this major is for you:'}
        </h4>
        
        <div className="reasons-list">
          {updatedRecommendation.reasons.map((reason, index) => (
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

      {/* Section des piliers de correspondance (optionnelle) */}
      {showPillars && strongestPillars.length > 0 && (
        <div className="pillars-section">
          <h4 className="pillars-title">Points de correspondance forts :</h4>
          <div className="pillars-list">
            {strongestPillars.map((pillar, index) => (
              <div key={index} className="pillar-item">
                <div className="pillar-info">
                  <span className="pillar-name">{getPillarDisplayName(pillar.pillar)}</span>
                  <span className="pillar-scores">
                    Vous: {pillar.userScore} | Idéal: {pillar.idealScore}
                  </span>
                </div>
                <div className="pillar-match-bar">
                  <div 
                    className="pillar-match-fill" 
                    style={{ 
                      width: `${100 - pillar.difference}%`,
                      backgroundColor: pillar.difference <= 5 ? '#4CAF50' : 
                                     pillar.difference <= 10 ? '#FF9800' : '#F44336'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="action-buttons">
        {onToggle && (
          <button 
            className="toggle-details-btn"
            onClick={onToggle}
          >
            {isExpanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}
        
        <button 
          className="toggle-pillars-btn"
          onClick={() => setShowPillars(!showPillars)}
        >
          {showPillars ? 'Masquer les détails' : 'Voir les détails de correspondance'}
        </button>
      </div>
    </div>
  );
};

export default CompleteMajorRecommendation;
