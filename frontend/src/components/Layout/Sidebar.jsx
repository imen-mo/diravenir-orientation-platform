import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaChartBar, 
  FaUsers, 
  FaGraduationCap, 
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaUserShield
} from 'react-icons/fa';

const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();

  const navItems = [
    { 
      path: '/admin/dashboard', 
      icon: FaChartBar, 
      label: 'Dashboard',
      description: 'Vue d\'ensemble'
    },
    { 
      path: '/admin/users', 
      icon: FaUsers, 
      label: 'Utilisateurs',
      description: 'Gestion des utilisateurs'
    },
    { 
      path: '/admin/programs', 
      icon: FaGraduationCap, 
      label: 'Programmes',
      description: 'Gestion des programmes'
    },
    { 
      path: '/admin/applications', 
      icon: FaFileAlt, 
      label: 'Candidatures',
      description: 'Gestion des candidatures'
    },
    { 
      path: '/admin/settings', 
      icon: FaCog, 
      label: 'Paramètres',
      description: 'Configuration'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const handleGoToUserInterface = () => {
    navigate('/');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header du sidebar */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <FaUserShield />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <h2>DirAvenir</h2>
              <span>Administration</span>
            </div>
          )}
        </div>
        
        <button 
          className="toggle-btn" 
          onClick={onToggle}
          aria-label={collapsed ? 'Étendre le menu' : 'Réduire le menu'}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      
      {/* Navigation principale */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink 
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="nav-icon" />
            {!collapsed && (
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Actions rapides */}
      <div className="sidebar-actions">
        <button 
          className="action-btn user-interface-btn"
          onClick={handleGoToUserInterface}
          title={collapsed ? 'Interface utilisateur' : undefined}
        >
          <FaHome />
          {!collapsed && <span>Interface Utilisateur</span>}
        </button>
      </div>
      
      {/* Footer du sidebar */}
      <div className="sidebar-footer">
        <button 
          className="logout-btn"
          onClick={handleLogout}
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
