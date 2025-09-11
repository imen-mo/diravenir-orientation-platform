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
import './AdminDashboardModern.css';

const AdminDashboardModern = () => {
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

  // Initialisation du graphique
  useEffect(() => {
    if (activeTab === 'dashboard') {
      initApplicationsChart();
    }
  }, [activeTab]);

  const initApplicationsChart = () => {
    // Logique d'initialisation du graphique Chart.js
  };

  return (
    <div className="admin-dashboard-modern">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <FaGraduationCap className="logo-icon" />
            <span className="logo-text">DirAvenir</span>
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
                <IconComponent className="nav-icon" />
                <span className="nav-label">{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Déconnexion</span>
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
            <form className="search-box" onSubmit={handleSearch}>
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
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
                    <FaMoneyBillWave />
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
                    <div className="chart-placeholder">
                      <div className="chart-icon">
                        <FaChartBar />
                      </div>
                      <p>Graphique des applications par mois</p>
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
                          <FaCheck />
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
                                className={`status-badge ${app.status}`}
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
                              <span className="status-badge active">
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
          )}

          {/* Other Tabs */}
          {activeTab !== 'dashboard' && (
            <div className="dashboard-content">
              <h2>{pageTitles[activeTab].title}</h2>
              <p>Interface de {pageTitles[activeTab].desc.toLowerCase()} en cours de développement...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardModern;
