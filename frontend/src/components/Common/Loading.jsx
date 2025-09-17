import React from 'react';
import './Loading.css';

const Loading = ({ 
  size = 'medium', 
  text = 'Chargement...', 
  fullScreen = false,
  className = ''
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'loading-small';
      case 'large':
        return 'loading-large';
      default:
        return 'loading-medium';
    }
  };

  if (fullScreen) {
    return (
      <div className={`loading-fullscreen ${className}`}>
        <div className="loading-content">
          <div className={`loading-spinner ${getSizeClass()}`}>
            <div className="spinner"></div>
          </div>
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`loading-container ${className}`}>
      <div className={`loading-spinner ${getSizeClass()}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
