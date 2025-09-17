import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  loading = false,
  error = false,
  onClick
}) => {
  if (loading) {
    return (
      <div className="stats-card loading">
        <div className="stats-skeleton">
          <div className="skeleton-icon"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-value"></div>
            <div className="skeleton-change"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-card error">
        <div className="stats-icon error">
          {icon}
        </div>
        <div className="stats-content">
          <h3 className="stats-title">{title}</h3>
          <div className="stats-value error">Erreur</div>
          <div className="stats-change error">
            Données non disponibles
          </div>
        </div>
      </div>
    );
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <FaArrowUp />;
      case 'negative':
        return <FaArrowDown />;
      default:
        return <FaMinus />;
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString('fr-FR');
    }
    return val;
  };

  return (
    <div 
      className={`stats-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <div className="stats-value">{formatValue(value)}</div>
        {change && (
          <div className={`stats-change ${changeType}`}>
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
