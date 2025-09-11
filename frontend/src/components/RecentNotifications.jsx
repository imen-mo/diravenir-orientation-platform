import React, { useState, useEffect } from 'react';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaBell,
  FaTimes,
  FaCheck,
  FaTrash,
  FaCog
} from 'react-icons/fa';
import notificationService from '../services/notificationService';
import './RecentNotifications.css';

const RecentNotifications = ({ onNotificationClick, userId = 'mock-user' }) => {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, application, program, system
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialiser le service de notifications
    notificationService.init();
    
    // Charger les notifications existantes
    const loadNotifications = async () => {
      await notificationService.generateSystemNotifications(userId);
      setNotifications(notificationService.getNotificationsByCategory('all'));
    };
    
    loadNotifications();
    
    // Écouter les changements
    const unsubscribe = notificationService.addListener((newNotifications) => {
      setNotifications(newNotifications);
    });
    
    return () => {
      unsubscribe();
      notificationService.destroy();
    };
  }, [userId]);

  // Filtrer les notifications selon le filtre actuel
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  // Gérer le clic sur une notification
  const handleNotificationClick = (notification) => {
    // Marquer comme lue
    notificationService.markAsRead(notification.id);
    
    // Exécuter l'action
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  // Gérer les actions des notifications
  const handleNotificationAction = (notification, action) => {
    switch (action) {
      case 'mark-read':
        notificationService.markAsRead(notification.id);
        break;
      case 'delete':
        notificationService.removeNotification(notification.id);
        break;
      case 'mark-all-read':
        notificationService.markAllAsRead();
        break;
      case 'clear-all':
        notificationService.clearAllNotifications();
        break;
      default:
        handleNotificationClick(notification);
    }
  };

  // Obtenir l'icône selon le type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      case 'system':
        return <FaBell />;
      default:
        return <FaBell />;
    }
  };

  // Obtenir la classe de priorité
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  // Formater la date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  };

  // Obtenir les statistiques
  const stats = notificationService.getNotificationStats();

  if (notifications.length === 0) {
    return (
      <div className="notifications-section">
        <div className="notifications-header">
          <h3>🔔 Notifications</h3>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Paramètres"
          >
            <FaCog />
          </button>
        </div>
        <div className="no-notifications">
          <FaBell className="no-notifications-icon" />
          <p>Aucune notification pour le moment</p>
          <small>Les notifications apparaîtront ici lors de vos actions</small>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-section">
      <div className="notifications-header">
        <div className="header-left">
          <h3>🔔 Notifications</h3>
          <span className="notification-count">
            {stats.unread > 0 && (
              <span className="unread-badge">{stats.unread}</span>
            )}
            {notifications.length}
          </span>
        </div>
        <div className="header-actions">
          <button 
            className="filter-btn"
            onClick={() => setShowAll(!showAll)}
            title={showAll ? "Voir moins" : "Voir tout"}
          >
            {showAll ? "Voir moins" : "Voir tout"}
          </button>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Paramètres"
          >
            <FaCog />
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="notification-filters">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({notifications.length})
        </button>
        <button 
          className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Non lues ({stats.unread})
        </button>
        <button 
          className={`filter-tab ${filter === 'application' ? 'active' : ''}`}
          onClick={() => setFilter('application')}
        >
          Candidatures ({stats.byCategory.application || 0})
        </button>
        <button 
          className={`filter-tab ${filter === 'program' ? 'active' : ''}`}
          onClick={() => setFilter('program')}
        >
          Programmes ({stats.byCategory.program || 0})
        </button>
      </div>

      {/* Actions rapides */}
      {stats.unread > 0 && (
        <div className="quick-actions">
          <button 
            className="action-btn mark-all-read"
            onClick={() => handleNotificationAction(null, 'mark-all-read')}
          >
            <FaCheck /> Marquer tout comme lu
          </button>
          <button 
            className="action-btn clear-all"
            onClick={() => handleNotificationAction(null, 'clear-all')}
          >
            <FaTrash /> Tout effacer
          </button>
        </div>
      )}

      {/* Liste des notifications */}
      <div className="notifications-list">
        {filteredNotifications.slice(0, showAll ? filteredNotifications.length : 5).map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.type} ${getPriorityClass(notification.priority)} ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="notification-content" onClick={() => handleNotificationClick(notification)}>
              <div className="notification-header">
                <h4 className="notification-title">{notification.title}</h4>
                <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
              <div className="notification-meta">
                <span className="notification-category">{notification.category}</span>
                <span className={`notification-priority ${notification.priority}`}>
                  {notification.priority}
                </span>
              </div>
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button 
                  className="action-btn mark-read"
                  onClick={() => handleNotificationAction(notification, 'mark-read')}
                  title="Marquer comme lu"
                >
                  <FaCheck />
                </button>
              )}
              <button 
                className="action-btn delete"
                onClick={() => handleNotificationAction(notification, 'delete')}
                title="Supprimer"
              >
                <FaTimes />
              </button>
              <button 
                className="action-btn primary"
                onClick={() => handleNotificationClick(notification)}
                title={notification.action}
              >
                <span>{notification.action}</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paramètres */}
      {showSettings && (
        <div className="notification-settings">
          <h4>Paramètres des notifications</h4>
          <div className="settings-options">
            <label>
              <input 
                type="checkbox" 
                checked={true} 
                readOnly 
              />
              Notifications par email
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={true} 
                readOnly 
              />
              Notifications push
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={true} 
                readOnly 
              />
              Notifications système
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentNotifications;
