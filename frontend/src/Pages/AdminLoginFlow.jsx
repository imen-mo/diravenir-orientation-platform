import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminWelcomePage from './AdminWelcomePage';
import AdminDashboardModernComplete from './AdminDashboardModernComplete';
import AdminNotifications from '../components/AdminNotifications';
import { FaBell, FaTimes } from 'react-icons/fa';
import './AdminLoginFlow.css';

const AdminLoginFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome' | 'dashboard'
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification admin
    checkAdminAuthentication();
  }, []);

  const checkAdminAuthentication = () => {
    try {
      // Vérifier le token JWT dans localStorage
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        // Vérifier si c'est un admin
        if (parsedUser.role === 'ADMIN') {
          setUser(parsedUser);
          setIsAuthenticated(true);
          // Démarrer directement sur la page de bienvenue
          setCurrentStep('welcome');
        } else {
          // Rediriger vers la page de login si ce n'est pas un admin
          navigate('/login');
        }
      } else {
        // Rediriger vers la page de login si pas de token
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      navigate('/login');
    }
  };

  const handleNavigateToDashboard = () => {
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    // Nettoyer le localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    
    // Rediriger vers la page de login
    navigate('/login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClose = () => {
    setShowNotifications(false);
  };

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-flow">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-flow">
      {/* Notifications Button */}
      <button 
        className="notifications-toggle"
        onClick={toggleNotifications}
        title="Notifications"
      >
        <FaBell />
        <span className="notification-dot"></span>
      </button>

      {/* Notifications Panel */}
      {showNotifications && (
        <AdminNotifications onClose={handleNotificationClose} />
      )}

      {/* Main Content */}
      {currentStep === 'welcome' && (
        <AdminWelcomePage
          user={user}
          onNavigateToDashboard={handleNavigateToDashboard}
          onLogout={handleLogout}
        />
      )}

      {currentStep === 'dashboard' && (
        <AdminDashboardModernComplete
          user={user}
          onLogout={handleLogout}
          onShowNotifications={toggleNotifications}
        />
      )}
    </div>
  );
};

export default AdminLoginFlow;
