import React, { useState } from 'react';
import { 
  FaHome,
  FaChartLine,
  FaFileAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaChevronRight,
  FaChevronDown,
  FaPlus,
  FaEye,
  FaEdit,
  FaDownload,
  FaHistory,
  FaTrophy,
  FaBookmark,
  FaUsers,
  FaQuestionCircle,
  FaInfoCircle
} from 'react-icons/fa';
import './EnhancedSidebar.css';

const EnhancedSidebar = ({ activeSection, onSectionChange, userInfo, stats }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: FaHome,
      color: '#667eea',
      description: 'Tableau de bord principal'
    },
    {
      id: 'statistics',
      label: 'Statistiques',
      icon: FaChartLine,
      color: '#48bb78',
      description: 'Analyses et graphiques',
      badge: stats?.totalApplications || 0
    },
    {
      id: 'applications',
      label: 'Candidatures',
      icon: FaFileAlt,
      color: '#ed8936',
      description: 'Mes demandes d\'admission',
      badge: stats?.applicationsInProgress || 0,
      subItems: [
        { id: 'applications-draft', label: 'Brouillons', icon: FaEdit, count: stats?.applicationsDraft || 0 },
        { id: 'applications-submitted', label: 'Soumises', icon: FaEye, count: stats?.applicationsSubmitted || 0 },
        { id: 'applications-approved', label: 'Approuvées', icon: FaTrophy, count: stats?.applicationsApproved || 0 }
      ]
    },
    {
      id: 'tests',
      label: 'Tests & Évaluations',
      icon: FaGraduationCap,
      color: '#9f7aea',
      description: 'Résultats et recommandations',
      badge: stats?.totalTests || 0,
      subItems: [
        { id: 'test-results', label: 'Résultats', icon: FaHistory, count: stats?.completedTests || 0 },
        { id: 'test-recommendations', label: 'Recommandations', icon: FaBookmark, count: stats?.recommendations || 0 },
        { id: 'test-new', label: 'Nouveau test', icon: FaPlus, count: null }
      ]
    },
    {
      id: 'calendar',
      label: 'Calendrier',
      icon: FaCalendarAlt,
      color: '#4299e1',
      description: 'Échéances et événements',
      badge: stats?.upcomingDeadlines || 0
    },
    {
      id: 'chat',
      label: 'Support',
      icon: FaComments,
      color: '#38b2ac',
      description: 'Chat et assistance',
      badge: stats?.unreadMessages || 0
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: FaBell,
      color: '#f56565',
      description: 'Alertes et mises à jour',
      badge: stats?.unreadNotifications || 0
    }
  ];

  const settingsItems = [
    {
      id: 'profile',
      label: 'Mon Profil',
      icon: FaUser,
      color: '#667eea',
      description: 'Informations personnelles'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: FaCog,
      color: '#a0aec0',
      description: 'Préférences et configuration'
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleItemClick = (itemId, parentId = null) => {
    if (parentId) {
      // C'est un sous-élément
      onSectionChange(itemId);
    } else {
      // C'est un élément principal
      if (navigationItems.find(item => item.id === itemId)?.subItems) {
        toggleSection(itemId);
      } else {
        onSectionChange(itemId);
      }
    }
  };

  const handleLogout = () => {
    // Gérer la déconnexion
    console.log('Déconnexion...');
    // Ici vous pouvez ajouter la logique de déconnexion
  };

  const renderNavItem = (item, isSubItem = false, parentId = null) => {
    const isActive = activeSection === item.id;
    const isExpanded = expandedSections[item.id];
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isHovered = hoveredItem === item.id;

    return (
      <div key={item.id} className="nav-item-container">
        <button
          className={`nav-item ${isActive ? 'active' : ''} ${isSubItem ? 'sub-item' : ''} ${isHovered ? 'hovered' : ''}`}
          onClick={() => handleItemClick(item.id, parentId)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ '--item-color': item.color }}
        >
          <div className="nav-item-content">
            <div className="nav-icon-container">
              <item.icon className="nav-icon" />
              {item.badge && item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </div>
            
            <div className="nav-text">
              <span className="nav-label">{item.label}</span>
              {!isSubItem && (
                <span className="nav-description">{item.description}</span>
              )}
            </div>

            {item.count !== undefined && item.count !== null && (
              <span className="nav-count">{item.count}</span>
            )}

            {hasSubItems && (
              <div className="nav-expand-icon">
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            )}
          </div>

          {/* Effet de hover avec gradient */}
          <div className="nav-hover-effect"></div>
        </button>

        {/* Tooltip pour les descriptions */}
        {isHovered && !isSubItem && (
          <div className="nav-tooltip">
            <div className="tooltip-content">
              <h4>{item.label}</h4>
              <p>{item.description}</p>
              {item.badge && item.badge > 0 && (
                <span className="tooltip-badge">{item.badge} éléments</span>
              )}
            </div>
            <div className="tooltip-arrow"></div>
          </div>
        )}

        {/* Sous-éléments */}
        {hasSubItems && isExpanded && (
          <div className="sub-items-container">
            {item.subItems.map(subItem => renderNavItem(subItem, true, item.id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="enhanced-sidebar">
      {/* En-tête utilisateur */}
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-info">
            <h3>{userInfo?.name || 'Étudiant'}</h3>
            <p>{userInfo?.email || 'student@example.com'}</p>
            <div className="user-status">
              <span className="status-dot online"></span>
              <span>En ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4 className="section-title">Navigation</h4>
          <div className="nav-items">
            {navigationItems.map(item => renderNavItem(item))}
          </div>
        </div>

        <div className="nav-section">
          <h4 className="section-title">Compte</h4>
          <div className="nav-items">
            {settingsItems.map(item => renderNavItem(item))}
          </div>
        </div>
      </nav>

      {/* Actions rapides */}
      <div className="quick-actions">
        <h4 className="section-title">Actions Rapides</h4>
        <div className="action-buttons">
          <button className="quick-action-btn primary">
            <FaPlus />
            <span>Nouvelle candidature</span>
          </button>
          <button className="quick-action-btn secondary">
            <FaGraduationCap />
            <span>Passer un test</span>
          </button>
        </div>
      </div>

      {/* Footer avec déconnexion */}
      <div className="sidebar-footer">
        <div className="footer-info">
          <div className="app-version">
            <FaInfoCircle />
            <span>Version 1.0.0</span>
          </div>
          <div className="help-link">
            <FaQuestionCircle />
            <span>Aide & Support</span>
          </div>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};

export default EnhancedSidebar;
