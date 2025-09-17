import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaUserShield, 
  FaChartBar, 
  FaUsers, 
  FaGraduationCap, 
  FaFileAlt, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaFileExcel
} from 'react-icons/fa';
import '../styles/admin-theme.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // false = expanded, true = collapsed
  const [showWarning, setShowWarning] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const getUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const user = getUserData();

  // Effet de détection de scroll pour l'effet warning
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const sidebar = sidebarRef.current;
        const scrollTop = sidebar.scrollTop;
        const scrollHeight = sidebar.scrollHeight;
        const clientHeight = sidebar.clientHeight;
        
        // Calculer si on est proche du footer (dans les 200px du bas)
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        
        if (distanceFromBottom <= 200) {
          setShowWarning(true);
        } else {
          setShowWarning(false);
        }
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('scroll', handleScroll);
      return () => sidebar.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FaChartBar,
      path: '/admin/dashboard'
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: FaUsers,
      path: '/admin/users'
    },
    {
      id: 'programs',
      label: 'Programmes',
      icon: FaGraduationCap,
      path: '/admin/programs'
    },
    {
      id: 'applications',
      label: 'Candidatures',
      icon: FaFileAlt,
      path: '/admin/candidatures'
    },
    {
      id: 'excel-import',
      label: 'Import Excel',
      icon: FaFileExcel,
      path: '/admin/excel-import'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: FaCog,
      path: '/admin/settings'
    }
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Administration';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getSidebarClasses = () => {
    const classes = ['admin-sidebar'];
    if (sidebarCollapsed) classes.push('collapsed');
    if (sidebarOpen) classes.push('open');
    if (showWarning) classes.push('warning-footer');
    return classes.join(' ');
  };

  const getMainContentClasses = () => {
    const classes = ['admin-main-content'];
    if (sidebarCollapsed) classes.push('sidebar-collapsed');
    return classes.join(' ');
  };

  return (
    <div className="admin-layout">
      <div className="admin-layout-container">
        {/* Sidebar */}
        <div ref={sidebarRef} className={getSidebarClasses()}>
          <div className="admin-sidebar-header">
            <div className="admin-logo">
              <div className="admin-logo-icon">
                <FaUserShield />
              </div>
              <span>DirAvenir</span>
            </div>
            <button 
              className="admin-sidebar-toggle-btn"
              onClick={toggleSidebarCollapse}
              title={sidebarCollapsed ? 'Étendre sidebar' : 'Réduire sidebar'}
            >
              {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          <nav className="admin-sidebar-nav">
            {menuItems.map(item => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={`admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  <IconComponent className="admin-nav-icon" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-user-avatar">
                {user?.nom ? user.nom.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="admin-user-details">
                <div className="admin-user-name">
                  {user?.nom || 'System'} {user?.prenom || 'Admin'}
                </div>
                <div className="admin-user-role">
                  {user?.role || 'Administrateur'}
                </div>
              </div>
            </div>
            
            <button className="admin-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={getMainContentClasses()}>
          {/* Header */}
          <header className="admin-header">
            <div className="admin-header-left">
              <button 
                className="admin-sidebar-toggle"
                onClick={toggleSidebar}
                title="Basculer sidebar"
              >
                <FaBars />
              </button>
              <h1 className="admin-page-title">{getPageTitle()}</h1>
            </div>
            
            <div className="admin-header-right">
              <button className="admin-notification-btn">
                <FaBell />
                <span className="admin-notification-badge">3</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="admin-content admin-fade-in">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="admin-modal-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;
