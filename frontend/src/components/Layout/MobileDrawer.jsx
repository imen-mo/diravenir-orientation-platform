import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartBar, 
  FaUsers, 
  FaGraduationCap, 
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaHome,
  FaUserShield
} from 'react-icons/fa';

const MobileDrawer = ({ open, onClose }) => {
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
      window.location.href = '/login';
    }
  };

  const handleGoToUserInterface = () => {
    onClose();
    window.location.href = '/';
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="drawer-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        {/* Header du drawer */}
        <div className="drawer-header">
          <div className="drawer-logo">
            <div className="logo-icon">
              <FaUserShield />
            </div>
            <div className="logo-text">
              <h2>DirAvenir</h2>
              <span>Administration</span>
            </div>
          </div>
          
          <button 
            className="drawer-close"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="drawer-nav">
          {navItems.map(item => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `drawer-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={handleNavClick}
            >
              <item.icon className="nav-icon" />
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            </NavLink>
          ))}
        </nav>
        
        {/* Actions rapides */}
        <div className="drawer-actions">
          <button 
            className="action-btn user-interface-btn"
            onClick={handleGoToUserInterface}
          >
            <FaHome />
            <span>Interface Utilisateur</span>
          </button>
        </div>
        
        {/* Footer */}
        <div className="drawer-footer">
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
