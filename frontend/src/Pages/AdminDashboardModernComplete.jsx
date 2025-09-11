import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaFileAlt, 
  FaUsers, 
  FaGraduationCap, 
  FaComments, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt, 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaBars, 
  FaDownload, 
  FaFilter, 
  FaSyncAlt, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaArrowUp, 
  FaCheck, 
  FaUser as FaUserIcon,
  FaMoneyBillWave
} from 'react-icons/fa';
import AdminCharts from '../components/AdminCharts';
import UsersManagement from '../components/UsersManagement';
import ApplicationsManagement from '../components/ApplicationsManagement';
import ProgramsManagement from '../components/ProgramsManagement';
import TestsManagement from '../components/TestsManagement';
import DatabaseStatistics from '../components/DatabaseStatistics';
import AdminNotifications from '../components/AdminNotifications';
import { statisticsService, apiUtils } from '../services/apiService';
import './AdminDashboardModern.css';
import '../components/ManagementComponents.css';

const AdminDashboardModernComplete = ({ user, onLogout, onShowNotifications }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 1247,
    totalApplications: 89,
    totalPrograms: 15,
    revenue: '€45,230'
  });
  const [chartsData, setChartsData] = useState(null);

  // Charger les données du dashboard
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Fonctions pour les notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (onShowNotifications) {
      onShowNotifications();
    }
  };

  const handleNotificationClose = () => {
    setShowNotifications(false);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Charger les statistiques
      const statsResponse = await statisticsService.getDashboardStats();
      setDashboardStats(statsResponse);
      
      // Charger les données des charts
      const chartsResponse = await statisticsService.getChartsData();
      setChartsData(chartsResponse);
    } catch (error) {
      console.error('Erreur lors du chargement des données du dashboard:', error);
      // Utiliser les données par défaut en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  // Données d'activité récente
  const [recentActivity] = useState([
    {
      text: 'Nouvelle candidature soumise par Ahmed Benali',
      time: 'Il y a 5 minutes',
      type: 'application'
    },
    {
      text: 'Test complété par Fatima Zahra',
      time: 'Il y a 15 minutes',
      type: 'test'
    },
    {
      text: 'Nouvel utilisateur inscrit: Omar Hassan',
      time: 'Il y a 1 heure',
      type: 'user'
    },
    {
      text: 'Programme "Master Informatique" mis à jour',
      time: 'Il y a 2 heures',
      type: 'program'
    }
  ]);

  // Navigation sections
  const navigationSections = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'statistics', label: 'Statistiques DB', icon: FaChartBar },
    { id: 'users', label: 'Utilisateurs', icon: FaUsers },
    { id: 'applications', label: 'Candidatures', icon: FaFileAlt },
    { id: 'programs', label: 'Programmes', icon: FaGraduationCap },
    { id: 'tests', label: 'Tests', icon: FaChartBar },
    { id: 'chat', label: 'Chat', icon: FaComments },
    { id: 'settings', label: 'Paramètres', icon: FaCog }
  ];

  // Page titles
  const pageTitles = {
    'dashboard': { title: 'Dashboard', desc: 'Vue d\'ensemble du système' },
    'statistics': { title: 'Statistiques DB', desc: 'Vue complète de la base de données' },
    'users': { title: 'Utilisateurs', desc: 'Gestion des utilisateurs' },
    'applications': { title: 'Candidatures', desc: 'Gestion des candidatures' },
    'programs': { title: 'Programmes', desc: 'Gestion des programmes' },
    'tests': { title: 'Tests', desc: 'Consulter les tests effectués' },
    'chat': { title: 'Chat', desc: 'Communication avec les étudiants' },
    'settings': { title: 'Paramètres', desc: 'Configuration du système' }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      alert('Déconnexion effectuée');
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Recherche:', searchTerm);
    }
  };

  // CRUD Functions
  const handleUpdateUser = (userId, userData) => {
    console.log('Update user:', userId, userData);
    // Ici vous pouvez ajouter l'appel API pour mettre à jour l'utilisateur
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
    // Ici vous pouvez ajouter l'appel API pour supprimer l'utilisateur
  };

  const handleCreateUser = (userData) => {
    console.log('Create user:', userData);
    // Ici vous pouvez ajouter l'appel API pour créer l'utilisateur
  };

  const handleUpdateApplicationStatus = (applicationId, status) => {
    console.log('Update application status:', applicationId, status);
    // Ici vous pouvez ajouter l'appel API pour mettre à jour le statut
  };

  const handleUpdateProgram = (programId, programData) => {
    console.log('Update program:', programId, programData);
    // Ici vous pouvez ajouter l'appel API pour mettre à jour le programme
  };

  const handleDeleteProgram = (programId) => {
    console.log('Delete program:', programId);
    // Ici vous pouvez ajouter l'appel API pour supprimer le programme
  };

  const handleCreateProgram = (programData) => {
    console.log('Create program:', programData);
    // Ici vous pouvez ajouter l'appel API pour créer le programme
  };

  return (
    <div className="admin-dashboard-modern">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">🎓</div>
            <h2>DiRAvenir</h2>
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={`nav-item ${activeTab === section.id ? 'active' : ''}`}
                onClick={() => handleTabChange(section.id)}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" />
            <span className="nav-label">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1 className="page-title">{pageTitles[activeTab].title}</h1>
            <p className="page-description">{pageTitles[activeTab].desc}</p>
          </div>
          <div className="header-right">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
            <div className="header-actions">
              <button className="action-btn notification" onClick={toggleNotifications}>
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-profile">
                <div className="user-avatar">
                  <FaUser />
                </div>
                <div className="user-details">
                  <div className="user-name">Admin User</div>
                  <div className="user-email">admin@diravenir.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {/* Statistiques principales */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon users">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <h3>Utilisateurs</h3>
                    <div className="stat-number">{dashboardStats.totalUsers.toLocaleString()}</div>
                    <div className="stat-change positive">
                      <FaArrowUp /> +12.5%
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon programs">
                    <FaGraduationCap />
                  </div>
                  <div className="stat-content">
                    <h3>Programmes</h3>
                    <div className="stat-number">{dashboardStats.totalPrograms}</div>
                    <div className="stat-change positive">
                      <FaArrowUp /> +3.2%
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon applications">
                    <FaFileAlt />
                  </div>
                  <div className="stat-content">
                    <h3>Applications</h3>
                    <div className="stat-number">{dashboardStats.totalApplications}</div>
                    <div className="stat-change positive">
                      <FaArrowUp /> +8.7%
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <FaMoneyBillWave />
                  </div>
                  <div className="stat-content">
                    <h3>Revenus</h3>
                    <div className="stat-number">{dashboardStats.revenue}</div>
                    <div className="stat-change positive">
                      <FaArrowUp /> +15.3%
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts fonctionnels */}
              <AdminCharts data={chartsData || {
                applicationsByMonth: {
                  approved: [12, 19, 8, 15, 22, 18, 25, 20, 28, 24, 30, 26],
                  rejected: [3, 5, 2, 4, 6, 4, 7, 5, 8, 6, 9, 7],
                  pending: [5, 8, 4, 6, 9, 7, 10, 8, 12, 10, 13, 11]
                },
                usersByType: [150, 5, 12],
                popularPrograms: {
                  labels: ['Informatique', 'Business', 'Design', 'Ingénierie', 'Marketing'],
                  data: [45, 38, 32, 28, 22]
                },
                testsStatus: [120, 35, 45]
              }} />

              {/* Activité récente */}
              <div className="recent-activity">
                <div className="activity-header">
                  <h3>Activité Récente</h3>
                  <button className="btn-action">
                    <FaSyncAlt />
                  </button>
                </div>
                <div className="activity-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <FaUser />
                      </div>
                      <div className="activity-content">
                        <div className="activity-text">{activity.text}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section Utilisateurs */}
          {activeTab === 'users' && (
            <div className="tab-content active">
              <UsersManagement 
                users={[]}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
                onCreateUser={handleCreateUser}
              />
            </div>
          )}

          {/* Section Candidatures */}
          {activeTab === 'applications' && (
            <div className="tab-content active">
              <ApplicationsManagement 
                applications={[]}
                onUpdateStatus={handleUpdateApplicationStatus}
              />
            </div>
          )}

          {/* Section Programmes */}
          {activeTab === 'programs' && (
            <div className="tab-content active">
              <ProgramsManagement 
                programs={[]}
                onUpdateProgram={handleUpdateProgram}
                onDeleteProgram={handleDeleteProgram}
                onCreateProgram={handleCreateProgram}
              />
            </div>
          )}

          {/* Section Tests */}
          {activeTab === 'tests' && (
            <div className="tab-content active">
              <TestsManagement tests={[]} />
            </div>
          )}

          {/* Section Statistiques DB */}
          {activeTab === 'statistics' && (
            <div className="tab-content active">
              <DatabaseStatistics />
            </div>
          )}

          {/* Autres sections */}
          {!['dashboard', 'statistics', 'users', 'applications', 'programs', 'tests'].includes(activeTab) && (
            <div className="tab-content active">
              <div className="dashboard-content">
                <h2>{pageTitles[activeTab]?.title || 'Section'}</h2>
                <p>Interface de {pageTitles[activeTab]?.desc?.toLowerCase() || 'cette section'} en cours de développement...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <AdminNotifications onClose={handleNotificationClose} />
      )}
    </div>
  );
};

export default AdminDashboardModernComplete;
