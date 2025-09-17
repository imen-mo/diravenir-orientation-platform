import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaCog, 
  FaGraduationCap, 
  FaBookmark, 
  FaClipboardCheck, 
  FaChartBar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import './StudentSidebar.css';

const StudentSidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8084/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FaChartBar,
      path: '/dashboard-student',
      description: 'Vue d\'ensemble'
    },
    {
      id: 'profile',
      label: 'Mon Profil',
      icon: FaUser,
      path: '/student/profile',
      description: 'Informations personnelles'
    },
    {
      id: 'programs',
      label: 'Programmes',
      icon: FaGraduationCap,
      path: '/student/programs',
      description: 'Programmes disponibles'
    },
    {
      id: 'saved',
      label: 'Sauvegardés',
      icon: FaBookmark,
      path: '/student/saved',
      description: 'Programmes favoris'
    },
    {
      id: 'test-results',
      label: 'Résultats Tests',
      icon: FaClipboardCheck,
      path: '/student/test-results',
      description: 'Mes résultats de tests'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: FaCog,
      path: '/student/settings',
      description: 'Configuration'
    }
  ];

  return (
    <div className={`student-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="logo">
            <FaGraduationCap />
            <span>DiRavenir</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle}>
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* User Info */}
      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'E'}
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-name">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Étudiant'}
            </div>
            <div className="user-role">Étudiant</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon />
              {!isCollapsed && (
                <div className="nav-item-content">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
