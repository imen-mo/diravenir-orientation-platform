import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import './AdminWelcome.css';

const AdminWelcome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrograms: 0,
    totalApplications: 0,
    recentLogins: 0
  });

  useEffect(() => {
    // Récupérer les informations utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Rediriger vers la page de connexion si pas d'utilisateur
      navigate('/login');
    }

    // Charger les statistiques
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8084/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="admin-welcome">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>DirAvenir Admin</h1>
            <p>Panneau d'administration</p>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-info">
              <div className="user-avatar">
                <FaUserShield />
              </div>
              <div className="user-details">
                <div className="user-name">{user.firstName} {user.lastName}</div>
                <div className="user-role">Administrateur</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-icon">
              <FaUserShield />
            </div>
            <h2>Bienvenue, {user.firstName} !</h2>
            <p>Vous êtes connecté en tant qu'administrateur de DirAvenir</p>
            <p>Accédez à votre tableau de bord pour gérer la plateforme</p>
          </div>
          
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalUsers}</div>
                <div className="stat-label">Utilisateurs</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaChartBar />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalPrograms}</div>
                <div className="stat-label">Programmes</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaCog />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalApplications}</div>
                <div className="stat-label">Candidatures</div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <div className="action-card primary">
            <div className="action-icon">
              <FaChartBar />
            </div>
            <div className="action-content">
              <h3>Tableau de Bord</h3>
              <p>Accédez à toutes les fonctionnalités d'administration</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/admin/dashboard')}
              >
                Voir votre Dashboard
              </button>
            </div>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <FaUsers />
            </div>
            <div className="action-content">
              <h3>Gestion des Candidatures</h3>
              <p>Gérez les candidatures des étudiants avec les statuts dynamiques</p>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/admin/candidatures')}
              >
                Gérer les Candidatures
              </button>
            </div>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <FaCog />
            </div>
            <div className="action-content">
              <h3>Configuration</h3>
              <p>Configurez les paramètres de la plateforme</p>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/admin/settings')}
              >
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminWelcome;
