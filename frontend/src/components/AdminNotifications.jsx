import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaUsers, FaFileAlt, FaCheckCircle, FaClock, FaExclamationTriangle, FaGraduationCap, FaUserPlus, FaUserMinus, FaEdit, FaTrash } from 'react-icons/fa';
import { notificationService } from '../services/apiService';
import './AdminNotifications.css';

const AdminNotifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    // Simuler des notifications en temps réel
    const interval = setInterval(() => {
      simulateNewNotification();
    }, 30000); // Nouvelle notification toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      
      // Charger les vraies notifications depuis l'API
      const response = await notificationService.getNotifications();
      
      if (response.status === 'success') {
        setNotifications(response.notifications);
        setUnreadCount(response.unreadCount);
      } else {
        // Fallback vers des notifications simulées en cas d'erreur
        const mockNotifications = [
        {
          id: 1,
          type: 'user_connected',
          title: 'Nouvel utilisateur connecté',
          message: 'Ahmed Benali s\'est connecté il y a 2 minutes',
          time: '2 min',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          icon: FaUsers,
          color: 'blue',
          read: false,
          priority: 'low'
        },
        {
          id: 2,
          type: 'application_completed',
          title: 'Candidature terminée',
          message: 'Fatima Alami a terminé sa candidature pour Informatique',
          time: '5 min',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          icon: FaFileAlt,
          color: 'green',
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'test_completed',
          title: 'Test d\'orientation terminé',
          message: 'Youssef El Mansouri a terminé son test d\'orientation avec un score de 85%',
          time: '8 min',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          icon: FaCheckCircle,
          color: 'purple',
          read: false,
          priority: 'medium'
        },
        {
          id: 4,
          type: 'application_pending',
          title: 'Candidatures en attente',
          message: '3 nouvelles candidatures nécessitent votre attention',
          time: '12 min',
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          icon: FaClock,
          color: 'orange',
          read: false,
          priority: 'high'
        },
        {
          id: 5,
          type: 'user_registered',
          title: 'Nouvelle inscription',
          message: 'Sara Benali s\'est inscrite sur la plateforme',
          time: '15 min',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          icon: FaUserPlus,
          color: 'blue',
          read: true,
          priority: 'low'
        },
        {
          id: 6,
          type: 'program_created',
          title: 'Programme créé',
          message: 'Nouveau programme "Cybersécurité" ajouté avec succès',
          time: '20 min',
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          icon: FaGraduationCap,
          color: 'green',
          read: true,
          priority: 'medium'
        }
      ];
      
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
      setIsLoading(false);
    }
  };

  const simulateNewNotification = () => {
    const notificationTypes = [
      {
        type: 'user_connected',
        title: 'Utilisateur connecté',
        message: 'Un nouvel utilisateur s\'est connecté',
        icon: FaUsers,
        color: 'blue',
        priority: 'low'
      },
      {
        type: 'application_completed',
        title: 'Candidature terminée',
        message: 'Une nouvelle candidature a été soumise',
        icon: FaFileAlt,
        color: 'green',
        priority: 'medium'
      },
      {
        type: 'test_completed',
        title: 'Test terminé',
        message: 'Un test d\'orientation vient d\'être terminé',
        icon: FaCheckCircle,
        color: 'purple',
        priority: 'medium'
      },
      {
        type: 'application_pending',
        title: 'Action requise',
        message: 'Une candidature nécessite votre attention',
        icon: FaExclamationTriangle,
        color: 'orange',
        priority: 'high'
      }
    ];

    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const newNotification = {
      id: Date.now(),
      ...randomType,
      time: 'Maintenant',
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Erreur lors du marquage de toutes les notifications:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user_connected': return FaUsers;
      case 'application_completed': return FaFileAlt;
      case 'test_completed': return FaCheckCircle;
      case 'application_pending': return FaClock;
      case 'user_registered': return FaUserPlus;
      case 'program_created': return FaGraduationCap;
      default: return FaBell;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#667eea';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Maintenant';
    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  if (isLoading) {
    return (
      <div className="admin-notifications">
        <div className="notifications-header">
          <h3>
            <FaBell />
            Notifications
          </h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="loading-notifications">
          <div className="loading-spinner"></div>
          <p>Chargement des notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-notifications">
      <div className="notifications-header">
        <div className="header-left">
          <h3>
            <FaBell />
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="mark-all-read" onClick={markAllAsRead}>
              Tout marquer comme lu
            </button>
          )}
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="notifications-content">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <FaBell className="no-notifications-icon" />
            <p>Aucune notification</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(notification => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.color} ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-priority" 
                       style={{ backgroundColor: getPriorityColor(notification.priority) }}>
                  </div>
                  <div className="notification-icon">
                    <IconComponent />
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4>{notification.title}</h4>
                      <span className="notification-time">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                    {!notification.read && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                  <button 
                    className="delete-notification"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="notifications-footer">
        <p className="notifications-summary">
          {notifications.length} notification{notifications.length > 1 ? 's' : ''}
          {unreadCount > 0 && ` • ${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`}
        </p>
      </div>
    </div>
  );
};

export default AdminNotifications;
