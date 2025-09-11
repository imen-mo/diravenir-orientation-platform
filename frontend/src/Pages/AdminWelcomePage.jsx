import React, { useState, useEffect } from 'react';
import { FaUserShield, FaChartLine, FaUsers, FaFileAlt, FaGraduationCap, FaBell, FaArrowRight, FaCog, FaSignOutAlt, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import './AdminWelcomePage.css';

const AdminWelcomePage = ({ user, onNavigateToDashboard, onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalPrograms: 0,
    pendingApplications: 0
  });

  useEffect(() => {
    loadNotifications();
    loadRecentActivities();
    loadStats();
  }, []);

  const loadNotifications = async () => {
    try {
      // Simulation des notifications dynamiques
      const mockNotifications = [
        {
          id: 1,
          type: 'user_connected',
          title: 'Nouvel utilisateur connecté',
          message: 'Ahmed Benali s\'est connecté il y a 5 minutes',
          time: '5 min',
          icon: FaUsers,
          color: 'blue'
        },
        {
          id: 2,
          type: 'application_completed',
          title: 'Candidature terminée',
          message: 'Fatima Alami a terminé sa candidature pour Informatique',
          time: '12 min',
          icon: FaFileAlt,
          color: 'green'
        },
        {
          id: 3,
          type: 'test_completed',
          title: 'Test d\'orientation terminé',
          message: 'Youssef El Mansouri a terminé son test d\'orientation',
          time: '18 min',
          icon: FaCheckCircle,
          color: 'purple'
        },
        {
          id: 4,
          type: 'application_pending',
          title: 'Candidature en attente',
          message: '3 nouvelles candidatures nécessitent votre attention',
          time: '25 min',
          icon: FaClock,
          color: 'orange'
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const loadRecentActivities = async () => {
    try {
      // Simulation des activités récentes
      const mockActivities = [
        { id: 1, action: 'Nouvelle inscription', user: 'Sara Benali', time: '2 min', type: 'user' },
        { id: 2, action: 'Candidature soumise', user: 'Omar El Fassi', program: 'Génie Civil', time: '8 min', type: 'application' },
        { id: 3, action: 'Test terminé', user: 'Aicha Tazi', score: '85%', time: '15 min', type: 'test' },
        { id: 4, action: 'Programme créé', user: 'Admin', program: 'Cybersécurité', time: '1h', type: 'program' }
      ];
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
    }
  };

  const loadStats = async () => {
    try {
      // Simulation des statistiques
      const mockStats = {
        totalUsers: 1247,
        totalApplications: 89,
        totalPrograms: 12,
        pendingApplications: 23
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
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
      case 'test_completed': return FaCheckCircle;
      case 'application_pending': return FaClock;
      default: return FaBell;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return FaUsers;
      case 'application': return FaFileAlt;
      case 'test': return FaCheckCircle;
      case 'program': return FaGraduationCap;
      default: return FaBell;
    }
  };

  return (
    <div className="admin-welcome-page">
      {/* Header */}
      <header className="welcome-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <FaUserShield className="admin-icon" />
              <div className="logo-text">
                <h1>Diravenir</h1>
                <span>Administration</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                <FaUserShield />
              </div>
              <div className="user-details">
                <span className="user-name">{user?.nom} {user?.prenom}</span>
                <span className="user-role">Administrateur</span>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="welcome-main">
        <div className="welcome-container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <div className="greeting">
                <h2>{getGreeting()}, {user?.prenom} !</h2>
                <p className="welcome-message">
                  Bienvenue dans votre espace d'administration Diravenir. 
                  Gérez efficacement votre plateforme d'orientation scolaire.
                </p>
              </div>
              <div className="welcome-actions">
                <button className="primary-action" onClick={onNavigateToDashboard}>
                  <FaChartLine />
                  Voir votre Dashboard
                  <FaArrowRight />
                </button>
                <button className="secondary-action">
                  <FaCog />
                  Paramètres
                </button>
              </div>
            </div>
            <div className="welcome-visual">
              <div className="visual-element">
                <FaUserShield className="visual-icon" />
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
              <div className="stat-card applications">
                <div className="stat-icon">
                  <FaFileAlt />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalApplications}</span>
                  <span className="stat-label">Candidatures</span>
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
              <div className="stat-card pending">
                <div className="stat-icon">
                  <FaClock />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.pendingApplications}</span>
                  <span className="stat-label">En attente</span>
                </div>
              </div>
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
                    <FaChartLine />
                    Activités récentes
                  </h3>
                </div>
                <div className="activities-list">
                  {recentActivities.map(activity => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          <IconComponent />
                        </div>
                        <div className="activity-content">
                          <h4>{activity.action}</h4>
                          <p>
                            {activity.user}
                            {activity.program && ` - ${activity.program}`}
                            {activity.score && ` (${activity.score})`}
                          </p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminWelcomePage;
