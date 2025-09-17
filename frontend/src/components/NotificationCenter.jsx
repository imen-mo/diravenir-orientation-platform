import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import notificationService from '../services/notificationService';
import './NotificationCenter.css';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (isOpen && user) {
      loadNotifications();
    }
  }, [isOpen, user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getUserNotifications(user.id);
      setNotifications(response || []);
    } catch (error) {
      console.error('Erreur chargement notifications:', error);
      // Notifications de démonstration en cas d'erreur
      setNotifications([
        {
          id: 1,
          type: 'TEST_COMPLETED',
          title: 'Test d\'orientation terminé',
          message: 'Félicitations ! Vous avez terminé le test d\'orientation avec un score de 85%.',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          type: 'APPLICATION_SUBMITTED',
          title: 'Candidature soumise',
          message: 'Votre candidature pour "Master en Informatique" a été soumise avec succès.',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, isRead: true }
            : notif
        )
      );
    } catch (error) {
      console.error('Erreur marquage notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'TEST_COMPLETED':
        return <FaCheckCircle className="notification-icon success" />;
      case 'APPLICATION_SUBMITTED':
        return <FaEnvelope className="notification-icon info" />;
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'À l\'instant';
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`notification-center ${isOpen ? 'open' : ''}`}>
      <div className="notification-overlay" onClick={onClose}></div>
      
      <div className="notification-panel">
        <div className="notification-header">
          <div className="notification-title">
            <FaBell />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="notification-content">
          {loading ? (
            <div className="notification-loading">
              <div className="loading-spinner"></div>
              <span>Chargement des notifications...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">
              <FaBell className="empty-icon" />
              <p>Aucune notification</p>
              <span>Vous recevrez des notifications ici</span>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <div className="notification-icon-container">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="notification-content-item">
                    <div className="notification-title-item">
                      {notification.title}
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-time">
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>

                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="notification-footer">
          <button className="mark-all-read-btn">
            Marquer tout comme lu
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
