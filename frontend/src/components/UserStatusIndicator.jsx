import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/api';
import './UserStatusIndicator.css';

const UserStatusIndicator = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState({
    online: false,
    lastActivity: null,
    loading: true
  });

  useEffect(() => {
    if (user && user.token) {
      checkUserStatus();
      // Vérifier le statut toutes les 30 secondes
      const interval = setInterval(checkUserStatus, 30000);
      
      // Nettoyer l'intervalle lors du démontage
      return () => clearInterval(interval);
    }
  }, [user]);

  const checkUserStatus = async () => {
    try {
      const response = await authService.getUserStatus();
      setStatus({
        online: response.online,
        lastActivity: response.timestamp,
        loading: false
      });
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const updateActivity = async () => {
    try {
      await authService.updateUserActivity();
      // Mettre à jour le statut local
      setStatus(prev => ({
        ...prev,
        lastActivity: Date.now()
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité:', error);
    }
  };

  // Mettre à jour l'activité lors des interactions utilisateur
  useEffect(() => {
    const handleUserActivity = () => {
      if (user && user.token) {
        updateActivity();
      }
    };

    // Écouter les événements d'activité utilisateur
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [user]);

  if (!user) {
    return null;
  }

  if (status.loading) {
    return (
      <div className="user-status-indicator loading">
        <div className="status-dot loading"></div>
        <span>Vérification...</span>
      </div>
    );
  }

  return (
    <div className="user-status-indicator">
      <div className={`status-dot ${status.online ? 'online' : 'offline'}`}></div>
      <span className="status-text">
        {status.online ? 'En ligne' : 'Hors ligne'}
      </span>
      {status.lastActivity && (
        <span className="last-activity">
          Dernière activité: {new Date(status.lastActivity).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default UserStatusIndicator;
