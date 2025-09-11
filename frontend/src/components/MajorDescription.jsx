import React from 'react';
import useDeviceType from '../hooks/useDeviceType';
import './MajorDescription.css';

// Composant d'affichage adaptatif pour les descriptions de majeures
const MajorDescription = ({ major }) => {
  const { isMobile } = useDeviceType();
  
  return (
    <div className="major-description">
      {isMobile ? (
        <div className="mobile-description">
          <p className="short-desc">{major.user_description}</p>
        </div>
      ) : (
        <div className="desktop-description">
          <div className="english-desc">
            <h4>English Description</h4>
            <p>{major.description}</p>
          </div>
          <div className="french-desc">
            <h4>Description Française</h4>
            <p>{major.user_description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorDescription;
