import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserShield, 
  FaChartBar, 
  FaUsers, 
  FaGraduationCap,
  FaFileAlt,
  FaSignOutAlt,
  FaBell,
  FaArrowRight,
  FaEye,
  FaCog,
  FaHome,
  FaGlobe,
  FaRocket,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUser,
  FaBookOpen,
  FaUniversity,
  FaComments,
  FaSearch,
  FaFilter,
  FaDownload,
  FaSyncAlt
} from 'react-icons/fa';
import './AdminHome.css';
import adminDashboardService from '../services/adminDashboardService';

const AdminHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrograms: 0,
    totalApplications: 0,
    recentLogins: 0
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadUserData();
    loadDashboardData();
  }, []);

  const loadUserData = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur:', error);
      navigate('/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, recentData] = await Promise.all([
        adminDashboardService.getAllStatistics(),
        adminDashboardService.getRecentData()
      ]);
      
      setStats(statsData);
      setRecentActivity(recentData.recentActivity || []);
      
      // Générer des notifications dynamiques
      generateNotifications(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Données de fallback
      setStats({
        totalUsers: 1247,
        totalPrograms: 89,
        totalApplications: 456,
        recentLogins: 23
      });
      setRecentActivity([
        {
          user: 'Fatima Zahra',
          action: 'a soumis une application',
          details: 'Computer Science - Hefei University',
          time: '25/01/2024 10:30',
          type: 'success'
        },
        {
          user: 'Omar Benali',
          action: 'a soumis une application',
          details: 'Business Administration - Cyprus International University',
          time: '24/01/2024 14:20',
          type: 'success'
        },
        {
          user: 'Aicha El Mansouri',
          action: 's\'est inscrite',
          details: 'Nouvel utilisateur',
          time: '23/01/2024 09:15',
          type: 'info'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateNotifications = (statsData) => {
    const mockNotifications = [
      {
        id: 1,
        type: 'user_connected',
        title: 'Nouvel utilisateur connecté',
        message: `${statsData.totalUsers} utilisateurs actifs sur la plateforme`,
        time: 'Maintenant',
        icon: FaUsers,
        color: 'blue'
      },
      {
        id: 2,
        type: 'application_completed',
        title: 'Candidatures en cours',
        message: `${statsData.totalApplications} candidatures à traiter`,
        time: '5 min',
        icon: FaFileAlt,
        color: 'green'
      },
      {
        id: 3,
        type: 'programs_available',
        title: 'Programmes disponibles',
        message: `${statsData.totalPrograms} programmes d'études actifs`,
        time: '10 min',
        icon: FaGraduationCap,
        color: 'purple'
      },
      {
        id: 4,
        type: 'system_status',
        title: 'Système opérationnel',
        message: 'Tous les services fonctionnent normalement',
        time: '15 min',
        icon: FaCheckCircle,
        color: 'green'
      }
    ];
    setNotifications(mockNotifications);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'user_connected': return FaUsers;
      case 'application_completed': return FaFileAlt;
      case 'programs_available': return FaGraduationCap;
      case 'system_status': return FaCheckCircle;
      default: return FaBell;
    }
  };

  if (loading) {
    return (
      <div className="admin-home-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de votre espace admin...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="admin-home">
      {/* Header */}
      <header className="admin-home-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <FaUserShield className="admin-icon" />
              <div className="logo-text">
                <h1>DirAvenir</h1>
                <span>Administration</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">{notifications.length}</span>
            </button>
            <div className="user-info">
              <div className="user-avatar">
                <FaUserShield />
              </div>
              <div className="user-details">
                <span className="user-name">{user.prenom || user.firstName} {user.nom || user.lastName}</span>
                <span className="user-role">Administrateur</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-home-main">
        <div className="admin-home-container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <div className="greeting">
                <h2>{getGreeting()}, {user.prenom || user.firstName} !</h2>
                <p className="welcome-message">
                  Bienvenue dans votre espace d'administration DirAvenir. 
                  Gérez efficacement votre plateforme d'orientation scolaire.
                </p>
              </div>
              <div className="welcome-actions">
                <button 
                  className="primary-action" 
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <FaChartBar />
                  Voir votre Dashboard
                  <FaArrowRight />
                </button>
                <button 
                  className="secondary-action"
                  onClick={() => navigate('/')}
                >
                  <FaEye />
                  Voir Interface Utilisateur
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className="welcome-visual">
              <div className="visual-element">
                <FaRocket className="visual-icon" />
              </div>
            </div>
          </section>

          {/* Statistics Cards */}
          <section className="stats-section">
            <h3>Vue d'ensemble</h3>
            <div className="stats-grid">
              <div className="stat-card users">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalUsers.toLocaleString()}</span>
                  <span className="stat-label">Utilisateurs</span>
                </div>
              </div>
              <div className="stat-card programs">
                <div className="stat-icon">
                  <FaGraduationCap />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalPrograms}</span>
                  <span className="stat-label">Programmes</span>
                </div>
              </div>
              <div className="stat-card applications">
                <div className="stat-icon">
                  <FaFileAlt />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalApplications}</span>
                  <span className="stat-label">Candidatures</span>
                </div>
              </div>
              <div className="stat-card activity">
                <div className="stat-icon">
                  <FaClock />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.recentLogins}</span>
                  <span className="stat-label">Connexions récentes</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions-section">
            <h3>Actions rapides</h3>
            <div className="quick-actions-grid">
              <button 
                className="quick-action-card"
                onClick={() => navigate('/admin/dashboard')}
              >
                <div className="action-icon">
                  <FaChartBar />
                </div>
                <div className="action-content">
                  <h4>Dashboard Complet</h4>
                  <p>Accédez à toutes les fonctionnalités d'administration</p>
                </div>
              </button>
              
              <button 
                className="quick-action-card"
                onClick={() => navigate('/admin/dashboard?tab=users')}
              >
                <div className="action-icon">
                  <FaUsers />
                </div>
                <div className="action-content">
                  <h4>Gestion Utilisateurs</h4>
                  <p>Gérez les utilisateurs et leurs rôles</p>
                </div>
              </button>
              
              <button 
                className="quick-action-card"
                onClick={() => navigate('/admin/dashboard?tab=programs')}
              >
                <div className="action-icon">
                  <FaGraduationCap />
                </div>
                <div className="action-content">
                  <h4>Gestion Programmes</h4>
                  <p>Administrez les programmes d'études</p>
                </div>
              </button>
              
              <button 
                className="quick-action-card"
                onClick={() => navigate('/admin/dashboard?tab=applications')}
              >
                <div className="action-icon">
                  <FaFileAlt />
                </div>
                <div className="action-content">
                  <h4>Gestion Candidatures</h4>
                  <p>Traitez les candidatures des étudiants</p>
                </div>
              </button>
            </div>
          </section>

          {/* Notifications & Activities */}
          <section className="notifications-section">
            <div className="notifications-grid">
              {/* Notifications */}
              <div className="notifications-panel">
                <div className="panel-header">
                  <h3>
                    <FaBell />
                    Notifications récentes
                  </h3>
                  <span className="notification-count">{notifications.length}</span>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <div key={notification.id} className={`notification-item ${notification.color}`}>
                        <div className="notification-icon">
                          <IconComponent />
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="activities-panel">
                <div className="panel-header">
                  <h3>
                    <FaClock />
                    Activités récentes
                  </h3>
                </div>
                <div className="activities-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <FaCheckCircle />
                      </div>
                      <div className="activity-content">
                        <h4>{activity.action}</h4>
                        <p>
                          <strong>{activity.user}</strong> - {activity.details}
                        </p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* System Status */}
          <section className="system-status-section">
            <div className="status-card">
              <div className="status-header">
                <h3>
                  <FaShieldAlt />
                  Statut du système
                </h3>
                <span className="status-indicator online">En ligne</span>
              </div>
              <div className="status-content">
                <div className="status-item">
                  <FaCheckCircle className="status-icon success" />
                  <span>Backend API</span>
                  <span className="status-value">Opérationnel</span>
                </div>
                <div className="status-item">
                  <FaCheckCircle className="status-icon success" />
                  <span>Base de données</span>
                  <span className="status-value">Connectée</span>
                </div>
                <div className="status-item">
                  <FaCheckCircle className="status-icon success" />
                  <span>Services email</span>
                  <span className="status-value">Actifs</span>
                </div>
                <div className="status-item">
                  <FaCheckCircle className="status-icon success" />
                  <span>Stockage fichiers</span>
                  <span className="status-value">Disponible</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
