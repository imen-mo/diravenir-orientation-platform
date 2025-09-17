import React, { useState } from 'react';
import { 
  FaBars, 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaCog,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaGlobe
} from 'react-icons/fa';

const Header = ({ onMenuToggle, sidebarCollapsed, onSidebarToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState('light');

  // Récupérer les informations utilisateur
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = userData.prenom || userData.firstName || 'Admin';
  const userRole = userData.role || 'Administrateur';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Logique de recherche
      console.log('Recherche:', searchTerm);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Logique de changement de thème
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  const notifications = [
    { id: 1, title: 'Nouvelle candidature', message: '3 nouvelles candidatures en attente', time: '5 min', unread: true },
    { id: 2, title: 'Utilisateur inscrit', message: 'Nouvel utilisateur inscrit', time: '1h', unread: true },
    { id: 3, title: 'Système', message: 'Mise à jour disponible', time: '2h', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="header">
      <div className="header-left">
        {/* Bouton menu mobile */}
        <button 
          className="menu-toggle mobile-only"
          onClick={onMenuToggle}
          aria-label="Ouvrir le menu"
        >
          <FaBars />
        </button>
        
        {/* Bouton toggle sidebar desktop */}
        <button 
          className="sidebar-toggle desktop-only"
          onClick={onSidebarToggle}
          aria-label={sidebarCollapsed ? 'Étendre le menu' : 'Réduire le menu'}
        >
          <FaBars />
        </button>
        
        {/* Titre de la page */}
        <div className="page-title">
          <h1>Dashboard</h1>
          <span className="page-subtitle">Administration DirAvenir</span>
        </div>
      </div>
      
      <div className="header-center">
        {/* Barre de recherche */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher utilisateurs, programmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
      </div>
      
      <div className="header-right">
        {/* Bouton thème */}
        <button 
          className="theme-toggle"
          onClick={handleThemeToggle}
          aria-label="Changer le thème"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        
        {/* Bouton langue */}
        <button 
          className="language-toggle"
          aria-label="Changer la langue"
        >
          <FaGlobe />
        </button>
        
        {/* Notifications */}
        <div className="notifications-container">
          <button 
            className="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <span className="notifications-count">{unreadCount} non lues</span>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn">Voir toutes les notifications</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Menu utilisateur */}
        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Menu utilisateur"
          >
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-role">{userRole}</span>
            </div>
            <FaChevronDown className="chevron" />
          </button>
          
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <div className="user-avatar-large">
                  <FaUser />
                </div>
                <div className="user-details">
                  <h3>{userName}</h3>
                  <p>{userRole}</p>
                </div>
              </div>
              <div className="user-menu-items">
                <button className="menu-item">
                  <FaUser />
                  <span>Profil</span>
                </button>
                <button className="menu-item">
                  <FaCog />
                  <span>Paramètres</span>
                </button>
                <hr className="menu-divider" />
                <button className="menu-item logout" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
