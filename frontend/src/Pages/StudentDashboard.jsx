import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaFileAlt, 
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
  FaArrowDown,
  FaCheck, 
  FaClock,
  FaEuroSign,
  FaMapMarkerAlt,
  FaHeart,
  FaPlus,
  FaTimes,
  FaRedo,
  FaClipboardCheck,
  FaChartLine
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // États pour les données
  const [stats, setStats] = useState({
    testsCompleted: 3,
    totalTests: 5,
    applications: 2,
    savedPrograms: 8,
    progress: 75
  });

  const [recentActivity, setRecentActivity] = useState([
          {
            id: 1,
      title: 'Test de personnalité',
      description: 'complété',
      details: 'Score: 85/100',
      time: 'Aujourd\'hui 14:30',
      type: 'success'
    },
    {
      id: 2,
      title: 'Candidature soumise',
      description: 'pour Computer Science',
      details: 'Hefei University',
      time: 'Hier 16:45',
      type: 'info'
    },
    {
      id: 3,
      title: 'Programme sauvegardé',
      description: '',
      details: 'Business Administration - Cyprus International University',
      time: 'Il y a 2 jours',
      type: 'heart'
    }
  ]);

  const [recommendedPrograms, setRecommendedPrograms] = useState([
    {
      id: 1,
      title: 'Computer Science',
      university: 'Hefei University',
      country: 'Chine',
      duration: '4 ans',
      tuition: '€8,500/an',
      description: 'Programme de Bachelor en informatique avec focus sur l\'intelligence artificielle et le développement logiciel. Recommandé par Youssef Alami et Khadija Benjelloun.',
      recommendedBy: ['Youssef Alami', 'Khadija Benjelloun']
          },
          {
            id: 2,
      title: 'Business Administration',
      university: 'Cyprus International University',
      country: 'Chypre',
      duration: '4 ans',
      tuition: '€6,200/an',
      description: 'Programme de Bachelor en administration des affaires avec spécialisation en management international. Suivi par Omar Benali et Naima El Fassi.',
      recommendedBy: ['Omar Benali', 'Naima El Fassi']
    }
  ]);

  const [applications, setApplications] = useState([
          {
            id: 1,
      program: 'Computer Science',
      university: 'Hefei University',
      country: 'Chine',
      duration: '4 ans',
      tuition: '€8,500/an',
      status: 'approved',
      submittedDate: '15 Janvier 2024',
      responseDate: '20 Janvier 2024'
          },
          {
            id: 2,
      program: 'Engineering',
      university: 'University of Technology Malaysia',
      country: 'Malaisie',
      duration: '4 ans',
      tuition: '€7,800/an',
      status: 'pending',
      submittedDate: '22 Janvier 2024',
      currentStatus: 'En révision'
          },
          {
            id: 3,
      program: 'International Relations',
      university: 'University of Warsaw',
      country: 'Pologne',
      duration: '3 ans',
      tuition: '€4,500/an',
      status: 'rejected',
      submittedDate: '2 Janvier 2024',
      rejectionReason: 'Documents incomplets'
    }
  ]);

  const [testResults, setTestResults] = useState([
    {
      id: 1,
      name: 'Test de Personnalité',
      score: 85,
      maxScore: 100,
      status: 'Excellent'
    },
    {
      id: 2,
      name: 'Test d\'Aptitudes',
      score: 78,
      maxScore: 100,
      status: 'Très bien'
    },
    {
      id: 3,
      name: 'Test d\'Intérêts',
      score: 92,
      maxScore: 100,
      status: 'Excellent'
    }
  ]);

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      major: 'Public Relations',
      compatibility: 'high',
      about: 'Public Relations is the art of building and maintaining a good image. This major teaches you how to manage an organization\'s reputation, interact with the media, and create impactful campaigns.',
      reasons: [
        'Your Communication Skills and Creativity Are a Driving Force 💬 Your ease with communication and your creativity are the driving forces of this field.',
        'You Are Motivated by Social Impact and Humanities 📰 Your desire to have a social impact and your interest in the humanities are valuable assets.',
        'You Are an Organized Team Player 🤝 Your preference for teamwork and your sense of organization are essential qualities.'
      ]
    },
    {
      id: 2,
      major: 'Computer Science',
      compatibility: 'medium',
      about: 'Computer Science focuses on the study of computational systems and design. This major teaches you programming, algorithms, and problem-solving skills.',
      reasons: [
        'Your Analytical Thinking is Strong 🧠 Your logical reasoning and problem-solving abilities align well with this field.',
        'You Have Technical Aptitude 💻 Your interest in technology and systems makes you a good fit.'
      ]
    },
    {
      id: 3,
      major: 'Business Administration',
      compatibility: 'high',
      about: 'Business Administration covers management principles, economics, and organizational behavior. This major prepares you for leadership roles.',
      reasons: [
        'Your Leadership Potential is Evident 👥 Your natural ability to lead and organize makes you ideal for management roles.',
        'You Are Goal-Oriented 🎯 Your drive to achieve and succeed aligns with business objectives.'
      ]
    }
  ]);

  // Navigation sections
  const navigationSections = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: FaHome },
    { id: 'applications', label: 'Mes Candidatures', icon: FaFileAlt },
    { id: 'results', label: 'Résultats de Tests', icon: FaChartBar },
    { id: 'programs', label: 'Programmes', icon: FaGraduationCap },
    { id: 'chat', label: 'Chat', icon: FaComments },
    { id: 'settings', label: 'Paramètres', icon: FaCog }
  ];

  // Page titles
  const pageTitles = {
    'overview': { title: 'Vue d\'ensemble', desc: 'Tableau de bord principal' },
    'applications': { title: 'Mes Candidatures', desc: 'Gestion de vos candidatures' },
    'results': { title: 'Résultats de Tests', desc: 'Vos résultats et recommandations' },
    'programs': { title: 'Programmes', desc: 'Explorer les programmes disponibles' },
    'chat': { title: 'Chat', desc: 'Communication avec les conseillers' },
    'settings': { title: 'Paramètres', desc: 'Configuration de votre compte' }
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
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

  // Initialisation des graphiques
  useEffect(() => {
    if (activeSection === 'overview' || activeSection === 'results') {
      initCharts();
    }
  }, [activeSection]);

  const initCharts = () => {
    // Logique d'initialisation des graphiques Chart.js
    // Cette fonction sera appelée quand le composant est monté
  };

    return (
      <div className="student-dashboard">
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
            <div className="user-name">Fatima Zahra</div>
            <div className="user-role">Étudiante</div>
            </div>
          </div>

        <nav className="sidebar-nav">
          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionChange(section.id)}
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
            <h1 id="page-title">{pageTitles[activeSection].title}</h1>
            <p id="page-description">{pageTitles[activeSection].desc}</p>
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
              <span className="notification-badge">2</span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                <FaUser />
          </div>
              <div className="user-details">
                <div className="user-name">Fatima Zahra</div>
                <div className="user-email">fatima.zahra@gmail.com</div>
      </div>
    </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="tab-content active">
              <div className="dashboard-content">
                {/* Statistiques principales */}
      <div className="stats-grid">
        <div className="stat-card">
                    <div className="stat-icon tests">
                      <FaClipboardCheck />
          </div>
          <div className="stat-content">
                      <h3>Tests Complétés</h3>
                      <div className="stat-number">{stats.testsCompleted}/{stats.totalTests}</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +1 cette semaine
          </div>
        </div>
                  </div>

        <div className="stat-card">
                    <div className="stat-icon applications">
                      <FaFileAlt />
          </div>
          <div className="stat-content">
                      <h3>Candidatures</h3>
                      <div className="stat-number">{stats.applications}</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +1 cette semaine
          </div>
        </div>
                  </div>

        <div className="stat-card">
                    <div className="stat-icon programs">
                      <FaGraduationCap />
          </div>
          <div className="stat-content">
                      <h3>Programmes Sauvegardés</h3>
                      <div className="stat-number">{stats.savedPrograms}</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +2 cette semaine
          </div>
        </div>
                  </div>

        <div className="stat-card">
                    <div className="stat-icon progress">
                      <FaChartLine />
          </div>
          <div className="stat-content">
                      <h3>Progression</h3>
                      <div className="stat-number">{stats.progress}%</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +5% cette semaine
                      </div>
          </div>
        </div>
      </div>

                {/* Graphiques et tableaux */}
                <div className="dashboard-grid">
                  <div className="chart-container">
                    <div className="chart-header">
                      <h3>Progression des Tests</h3>
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
                          <div className="chart-point" data-value="12"></div>
                          <div className="chart-point" data-value="18"></div>
                          <div className="chart-point" data-value="25"></div>
                          <div className="chart-point" data-value="32"></div>
                          <div className="chart-point" data-value="28"></div>
                          <div className="chart-point" data-value="35"></div>
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
                            <span>Tests complétés</span>
        </div>
                          <div className="legend-item-custom">
                            <div className="legend-color-custom orange"></div>
                            <span>Score moyen</span>
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
                            <p><strong>{activity.title}</strong> {activity.description}</p>
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
      
                {/* Programmes recommandés */}
    <div className="programs-grid">
                  {recommendedPrograms.map((program) => (
        <div key={program.id} className="program-card">
          <div className="program-header">
                        <h3>{program.title}</h3>
                        <div className="university">{program.university}</div>
            </div>
              <div className="program-description">
                <p>{program.description}</p>
          <div className="program-details">
                <div className="detail-item">
                  <FaClock />
                  <span>{program.duration}</span>
                </div>
                <div className="detail-item">
                            <FaEuroSign />
                            <span>{program.tuition}</span>
                </div>
                <div className="detail-item">
                            <FaMapMarkerAlt />
                            <span>{program.country}</span>
                </div>
          </div>
                      </div>
          <div className="program-actions">
                        <button className="action-btn view">Voir détails</button>
                        <button className="action-btn apply">Postuler</button>
                        <button className="action-btn save">Sauvegarder</button>
          </div>
        </div>
      ))}
    </div>
  </div>
            </div>
          )}

          {/* Applications Section */}
          {activeSection === 'applications' && (
            <div className="tab-content active">
              <div className="dashboard-content">
                <div className="content-header">
          <h2>Mes Candidatures</h2>
                  <div className="header-actions">
                    <button className="btn-primary">
                      <FaPlus /> Nouvelle candidature
          </button>
        </div>
        </div>

                {/* Statistiques des candidatures */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon applications">
                      <FaFileAlt />
      </div>
                    <div className="stat-content">
                      <h3>Total Candidatures</h3>
                      <div className="stat-number">5</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +2 ce mois
          </div>
            </div>
          </div>
            
                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'}}>
                      <FaCheck />
          </div>
                    <div className="stat-content">
                      <h3>Approuvées</h3>
                      <div className="stat-number">2</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +1 cette semaine
        </div>
    </div>
  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'}}>
                      <FaClock />
          </div>
                    <div className="stat-content">
                      <h3>En Cours</h3>
                      <div className="stat-number">2</div>
                      <div className="stat-change positive">
                        <FaArrowUp /> +1 cette semaine
          </div>
          </div>
        </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'}}>
                      <FaTimes />
          </div>
                    <div className="stat-content">
                      <h3>Rejetées</h3>
                      <div className="stat-number">1</div>
                      <div className="stat-change negative">
                        <FaArrowDown /> -1 cette semaine
          </div>
          </div>
        </div>
    </div>

                {/* Graphique des applications */}
                <div className="chart-section">
                  <div className="chart-header">
                    <h3>Évolution des Candidatures</h3>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <div className="legend-color" style={{background: '#10B981'}}></div>
                        <span>Approuvées</span>
          </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{background: '#F59E0B'}}></div>
                        <span>En cours</span>
          </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{background: '#EF4444'}}></div>
                        <span>Rejetées</span>
        </div>
      </div>
        </div>
                  <div className="chart-container">
                    <div className="linear-chart">
                      <div className="chart-line"></div>
                      <div className="chart-points">
                        <div className="chart-point" data-value="2"></div>
                        <div className="chart-point" data-value="5"></div>
                        <div className="chart-point" data-value="3"></div>
                        <div className="chart-point" data-value="7"></div>
                        <div className="chart-point" data-value="4"></div>
                        <div className="chart-point" data-value="6"></div>
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
                          <span>Candidatures envoyées</span>
      </div>
                        <div className="legend-item-custom">
                          <div className="legend-color-custom orange"></div>
                          <span>Réponses reçues</span>
      </div>
    </div>
  </div>
        </div>
      </div>

                {/* Liste des candidatures */}
                <div className="applications-list">
                  {applications.map((app) => (
                    <div key={app.id} className="application-card">
                      <div className="application-header">
                        <div className="application-info">
                          <h3>{app.program}</h3>
                          <div className="university">{app.university}</div>
                          <div className="application-date">Soumise le {app.submittedDate}</div>
          </div>
                        <div className="application-status">
                          <span className={`status-badge ${app.status}`}>
                            {app.status === 'approved' ? 'Approuvée' : 
                             app.status === 'pending' ? 'En cours' : 'Rejetée'}
                          </span>
          </div>
        </div>
                      <div className="application-details">
                        <div className="detail-row">
                          <span className="detail-label">Pays:</span>
                          <span className="detail-value">{app.country}</span>
          </div>
                        <div className="detail-row">
                          <span className="detail-label">Durée:</span>
                          <span className="detail-value">{app.duration}</span>
          </div>
                        <div className="detail-row">
                          <span className="detail-label">Frais de scolarité:</span>
                          <span className="detail-value">{app.tuition}</span>
        </div>
                        <div className="detail-row">
                          <span className="detail-label">
                            {app.status === 'approved' ? 'Date de réponse:' : 
                             app.status === 'pending' ? 'Statut:' : 'Raison du rejet:'}
                          </span>
                          <span className="detail-value">
                            {app.status === 'approved' ? app.responseDate :
                             app.status === 'pending' ? app.currentStatus : app.rejectionReason}
                          </span>
          </div>
          </div>
                      <div className="application-actions">
                        <button className="action-btn view">
                          <FaEye /> Voir détails
        </button>
                        {app.status === 'approved' && (
                          <button className="action-btn download">
                            <FaDownload /> Télécharger
        </button>
                        )}
                        {app.status === 'pending' && (
                          <button className="action-btn edit">
                            <FaEdit /> Modifier
        </button>
                        )}
                        {app.status === 'rejected' && (
                          <button className="action-btn retry">
                            <FaRedo /> Repostuler
          </button>
                        )}
        </div>
      </div>
                  ))}
          </div>
          </div>
        </div>
          )}

          {/* Results Section */}
          {activeSection === 'results' && (
            <div className="tab-content active">
              <div className="dashboard-content">
                <div className="test-results-section">
                  <h2>Résultats de Tests</h2>
                  <div className="test-results-grid">
        {testResults.map((test) => (
          <div key={test.id} className="test-result-card">
                        <h4>{test.name}</h4>
                        <div className="test-score">{test.score}/{test.maxScore}</div>
                        <div className="test-status">{test.status}</div>
              </div>
                    ))}
                </div>
                  
                  {/* Graphique des résultats détaillés */}
                  <div style={{marginTop: '2rem'}}>
                    <h3 style={{marginBottom: '1rem', color: 'var(--text-dark)'}}>Évolution des Scores</h3>
                    <canvas id="testScoresChart" width="400" height="200"></canvas>
              </div>
            </div>

                {/* Recommandations de Programmes */}
                <div className="recommendations-section">
                  <h2>Programmes Recommandés</h2>
                  <div className="recommendations-grid">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="recommendation-card">
                        <div className="recommendation-header">
                          <h3>{rec.major}</h3>
                          <div className={`compatibility-badge ${rec.compatibility}`}>
                            Your compatibility is: {rec.compatibility === 'high' ? 'High' : 'Medium'}
              </div>
              </div>
                        <div className="recommendation-content">
                          <div className="about-section">
                            <h4>About this Major:</h4>
                            <p>{rec.about}</p>
              </div>
                          <div className="why-section">
                            <h4>Why this major is for you:</h4>
                            <ul className="reasons-list">
                              {rec.reasons.map((reason, index) => (
                                <li key={index}>
                                  <span className="check-icon">✓</span>
                                  <span className="reason-text"><strong>{reason.split(' ').slice(0, 4).join(' ')}</strong> {reason.split(' ').slice(4).join(' ')}</span>
                                </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
            </div>
          </div>
            </div>
          )}

          {/* Other Sections */}
          {!['overview', 'applications', 'results'].includes(activeSection) && (
            <div className="tab-content active">
              <div className="dashboard-content">
                <h2>{pageTitles[activeSection]?.title || 'Section'}</h2>
                <p>Interface en cours de développement...</p>
        </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
