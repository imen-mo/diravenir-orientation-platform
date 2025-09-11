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
  FaUser as FaUserIcon
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // États pour les données
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalPrograms: 89,
    totalApplications: 456,
    totalRevenue: 156000
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: 'Fatima Zahra',
      action: 'a soumis une application',
      details: 'Computer Science - Hefei University',
      time: '25/01/2024 10:30',
      type: 'success'
    },
    {
      id: 2,
      user: 'Omar Benali',
      action: 'a soumis une application',
      details: 'Business Administration - Cyprus International University',
      time: '24/01/2024 14:20',
      type: 'success'
    },
    {
      id: 3,
      user: 'Aicha El Mansouri',
      action: 's\'est inscrite',
      details: 'Nouvel utilisateur',
      time: '23/01/2024 09:15',
      type: 'info'
    }
  ]);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      student: 'Fatima Zahra',
      email: 'fatima.zahra@gmail.com',
      program: 'Computer Science',
      university: 'Hefei University',
      status: 'pending',
      date: '25/01/2024 10:30'
    },
    {
      id: 2,
      student: 'Omar Benali',
      email: 'omar.benali@gmail.com',
      program: 'Business Administration',
      university: 'Cyprus International University',
      status: 'approved',
      date: '24/01/2024 14:20'
    }
  ]);

  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: 'Aicha El Mansouri',
      email: 'aicha.elmansouri@gmail.com',
      role: 'Étudiant',
      status: 'active',
      joinDate: '23/01/2024 09:15'
    }
  ]);

  // Navigation sections
  const navigationSections = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'applications', label: 'Applications', icon: FaFileAlt },
    { id: 'users', label: 'Utilisateurs', icon: FaUsers },
    { id: 'programs', label: 'Programmes', icon: FaGraduationCap },
    { id: 'chat', label: 'Chat', icon: FaComments },
    { id: 'statistics', label: 'Statistiques', icon: FaChartBar },
    { id: 'settings', label: 'Paramètres', icon: FaCog }
  ];

  // Page titles
  const pageTitles = {
    'dashboard': { title: 'Dashboard', desc: 'Vue d\'ensemble du système' },
    'applications': { title: 'Applications', desc: 'Gestion des candidatures' },
    'users': { title: 'Utilisateurs', desc: 'Gestion des utilisateurs' },
    'programs': { title: 'Programmes', desc: 'Gestion des programmes' },
    'chat': { title: 'Chat', desc: 'Communication avec les étudiants' },
    'statistics': { title: 'Statistiques', desc: 'Analyses et rapports' },
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
      // Implémenter la logique de recherche
      console.log('Recherche:', searchTerm);
    }
  };

  // Initialisation du graphique
  useEffect(() => {
    if (activeTab === 'dashboard') {
      initApplicationsChart();
    }
  }, [activeTab]);

  const initApplicationsChart = () => {
    // Logique d'initialisation du graphique Chart.js
    // Cette fonction sera appelée quand le composant est monté
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <FaGraduationCap />
            <span>DirAvenir</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-info">
            <div className="user-name">Youssef Alami</div>
            <div className="user-role">Administrateur</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                className={`nav-item ${activeTab === section.id ? 'active' : ''}`}
                onClick={() => handleTabChange(section.id)}
              >
                <IconComponent />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1 id="page-title">{pageTitles[activeTab].title}</h1>
            <p id="page-description">{pageTitles[activeTab].desc}</p>
          </div>

          <div className="header-right">
            <form className="search-box" onSubmit={handleSearch}>
              <FaSearch />
              <input 
                type="text" 
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-details">
                <div className="user-name">Youssef Alami</div>
                <div className="user-email">youssef.alami@gmail.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="tab-content active">
              <div className="dashboard-content">
                {/* Statistiques principales */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon users">
                      <FaUsers />
                    </div>
                    <div className="stat-content">
                      <h3>Utilisateurs</h3>
                      <div className="stat-number">{stats.totalUsers.toLocaleString()}</div>
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
                      <div className="stat-number">{stats.totalPrograms}</div>
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
                      <div className="stat-number">{stats.totalApplications}</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +8.7%
                      </div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon revenue">
                      <FaChartBar />
                    </div>
                    <div className="stat-content">
                      <h3>Revenus</h3>
                      <div className="stat-number">€{stats.totalRevenue.toLocaleString()}</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +15.3%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graphiques et tableaux */}
                <div className="dashboard-grid">
                  <div className="chart-container">
                    <div className="chart-header">
                      <h3>Applications par mois</h3>
                      <div className="chart-actions">
                        <button className="btn-icon">
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                    <div className="chart-content">
                      <div className="linear-chart">
                        <div className="chart-line"></div>
                        <div className="chart-points">
                          <div className="chart-point" data-value="45"></div>
                          <div className="chart-point" data-value="62"></div>
                          <div className="chart-point" data-value="58"></div>
                          <div className="chart-point" data-value="73"></div>
                          <div className="chart-point" data-value="68"></div>
                          <div className="chart-point" data-value="81"></div>
                        </div>
                        <div className="chart-labels">
                          <span>Jan</span>
                          <span>Fév</span>
                          <span>Mar</span>
                          <span>Avr</span>
                          <span>Mai</span>
                          <span>Juin</span>
                        </div>
                        <div className="chart-legend-custom">
                          <div className="legend-item-custom">
                            <div className="legend-color-custom purple"></div>
                            <span>Nouvelles applications</span>
                          </div>
                          <div className="legend-item-custom">
                            <div className="legend-color-custom orange"></div>
                            <span>Applications traitées</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="recent-activity">
                    <div className="activity-header">
                      <h3>Activité récente</h3>
                      <button className="btn-text">Voir tout</button>
                    </div>
                    <div className="activity-list">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">
                            <FaCheck className="text-green-500" />
                          </div>
                          <div className="activity-content">
                            <p><strong>{activity.user}</strong> {activity.action}</p>
                            <p className="activity-meta">{activity.details}</p>
                          </div>
                          <div className="activity-time">
                            {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tableaux de données */}
                <div className="data-grid">
                  <div className="data-table">
                    <div className="table-header">
                      <h3>Applications récentes</h3>
                      <div className="table-actions">
                        <button className="btn-icon">
                          <FaFilter />
                        </button>
                        <button className="btn-icon">
                          <FaSyncAlt />
                        </button>
                      </div>
                    </div>
                    <div className="table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Étudiant</th>
                            <th>Programme</th>
                            <th>Université</th>
                            <th>Statut</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentApplications.map((app) => (
                            <tr key={app.id}>
                              <td>
                                <div className="user-info">
                                  <div className="user-avatar">
                                    <FaUserIcon />
                                  </div>
                                  <div>
                                    <div className="user-name">{app.student}</div>
                                    <div className="user-email">{app.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{app.program}</td>
                              <td>{app.university}</td>
                              <td>
                                <span 
                                  className="status-badge" 
                                  style={{
                                    backgroundColor: app.status === 'pending' ? '#F59E0B' : '#10B981'
                                  }}
                                >
                                  {app.status}
                                </span>
                              </td>
                              <td>{app.date}</td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action view" title="Voir">
                                    <FaEye />
                                  </button>
                                  <button className="btn-action edit" title="Modifier">
                                    <FaEdit />
                                  </button>
                                  <button className="btn-action delete" title="Supprimer">
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="data-table">
                    <div className="table-header">
                      <h3>Utilisateurs récents</h3>
                      <div className="table-actions">
                        <button className="btn-icon">
                          <FaFilter />
                        </button>
                        <button className="btn-icon">
                          <FaSyncAlt />
                        </button>
                      </div>
                    </div>
                    <div className="table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>Rôle</th>
                            <th>Statut</th>
                            <th>Inscription</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="user-info">
                                  <div className="user-avatar">
                                    <FaUserIcon />
                                  </div>
                                  <div>
                                    <div className="user-name">{user.name}</div>
                                    <div className="user-email">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{user.role}</td>
                              <td>
                                <span 
                                  className="status-badge" 
                                  style={{ backgroundColor: '#10B981' }}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td>{user.joinDate}</td>
                              <td>
                                <div className="action-buttons">
                                  <button className="btn-action view" title="Voir">
                                    <FaEye />
                                  </button>
                                  <button className="btn-action edit" title="Modifier">
                                    <FaEdit />
                                  </button>
                                  <button className="btn-action delete" title="Supprimer">
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab !== 'dashboard' && (
            <div className="tab-content active">
              <div className="dashboard-content">
                <h2>{pageTitles[activeTab].title}</h2>
                <p>Interface de {pageTitles[activeTab].desc.toLowerCase()} en cours de développement...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
