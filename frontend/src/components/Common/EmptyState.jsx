import React from 'react';
import { FaInbox, FaPlus, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const EmptyState = ({ 
  title = "Aucune donnée",
  description = "Aucun élément trouvé dans la base de données",
  icon = FaInbox,
  action = null,
  type = "default"
}) => {
  const getIconColor = () => {
    switch (type) {
      case 'error':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'success':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return FaExclamationTriangle;
      case 'warning':
        return FaExclamationTriangle;
      case 'search':
        return FaSearch;
      default:
        return icon;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div 
          className="empty-state-icon"
          style={{ color: getIconColor() }}
        >
          <IconComponent />
        </div>
        
        <div className="empty-state-text">
          <h3 className="empty-state-title">{title}</h3>
          <p className="empty-state-description">{description}</p>
        </div>
        
        {action && (
          <div className="empty-state-action">
            <button 
              className="empty-state-btn"
              onClick={action.onClick}
            >
              {action.icon && <action.icon />}
              <span>{action.label}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
