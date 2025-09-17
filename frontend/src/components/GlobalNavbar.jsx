import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_diravenir.png';
import '../styles/Navbar.css';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const GlobalNavbar = ({ activePage = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Authentication state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getText } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Check authentication on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Call logout API
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
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
      setIsUserMenuOpen(false);
      
      // Redirect to home
      navigate('/', { replace: true });
    }
  };

  const navItems = [
    { href: '/', label: t('home'), page: 'home' },
    { href: '/orientation', label: t('orientation'), page: 'orientation' },
    { href: '/programs', label: t('programs'), page: 'programs' },
    { href: '/about', label: t('about'), page: 'about' },
    { href: '/faq', label: 'FAQ', page: 'faq' },
    { href: '/contact', label: t('contact'), page: 'contact' }
  ];

  return (
    <motion.header
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* Section gauche - Logo + Navigation */}
        <div className="navbar-left">
          {/* Logo */}
          <motion.div 
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/">
              <img 
                src={logo} 
                alt="DirAvenir Logo" 
                className="navbar-logo"
              />
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="navbar-nav">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`${activePage === item.page ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Section droite - Langue + Authentification */}
        <div className="navbar-right">
          {/* Sélecteur de langue */}
          <div className="navbar-language">
            <LanguageSelector />
          </div>

          {/* Boutons d'authentification */}
          <div className="navbar-buttons">
          {isAuthenticated && user ? (
            <div className="user-menu">
              <motion.button
                className="user-menu-button"
                onClick={toggleUserMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`user-avatar ${user?.role === 'ADMIN' ? 'admin-avatar' : ''}`}>
                  {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  {user?.role === 'ADMIN' && <span className="admin-badge">🛡️</span>}
                </div>
              </motion.button>

              {/* Menu déroulant utilisateur */}
                {isUserMenuOpen && (
                <div className="user-dropdown">
                    {/* Informations utilisateur */}
                    <div className="user-dropdown-header">
                      <div className={`user-dropdown-avatar ${user?.role === 'ADMIN' ? 'admin-dropdown-avatar' : ''}`}>
                        {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                        {user?.role === 'ADMIN' && <span className="admin-dropdown-badge">🛡️</span>}
                      </div>
                      <div className="user-dropdown-info">
                        <div className="user-dropdown-name">
                          {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}
                        </div>
                        <div className="user-dropdown-email">
                          {user?.email || ''}
                        </div>
                        {user?.role && (
                          <div className="user-dropdown-role">
                            {user.role === 'ADMIN' ? '🛡️ Administrateur' : 
                             user.role === 'CONSEILLER' ? '👨‍💼 Conseiller' : 
                             '🎓 Étudiant'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="user-dropdown-divider"></div>
                    
                    {/* Options du menu */}
                    <div
                      className="user-dropdown-item"
                      onClick={() => {
                        navigate('/profile');
                        setIsUserMenuOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/profile');
                          setIsUserMenuOpen(false);
                        }
                      }}
                    >
                      <FaUser />
                      <span>Mon Profil</span>
                    </div>
                    
                    {/* Dashboard selon le rôle */}
                    {user?.role === 'ADMIN' ? (
                      <div
                        className="user-dropdown-item"
                        onClick={() => {
                          navigate('/admin/dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            navigate('/admin/dashboard');
                            setIsUserMenuOpen(false);
                          }
                        }}
                      >
                        <span>🛡️</span>
                        <span>Dashboard Admin</span>
                      </div>
                    ) : (
                    <div
                      className="user-dropdown-item"
                      onClick={() => {
                        navigate('/dashboard-student');
                        setIsUserMenuOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/dashboard-student');
                          setIsUserMenuOpen(false);
                        }
                      }}
                    >
                      <span>📊</span>
                      <span>Dashboard Étudiant</span>
                    </div>
                    )}
                    
                    {/* Options supplémentaires pour les admins */}
                    {user?.role === 'ADMIN' && (
                      <>
                        <div
                          className="user-dropdown-item"
                          onClick={() => {
                            navigate('/admin/users');
                            setIsUserMenuOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              navigate('/admin/users');
                              setIsUserMenuOpen(false);
                            }
                          }}
                        >
                          <span>👥</span>
                          <span>Gestion Utilisateurs</span>
                        </div>
                        
                        <div
                          className="user-dropdown-item"
                          onClick={() => {
                            navigate('/admin/programs');
                            setIsUserMenuOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              navigate('/admin/programs');
                              setIsUserMenuOpen(false);
                            }
                          }}
                        >
                          <span>📚</span>
                          <span>Gestion Programmes</span>
                        </div>
                        
                        <div
                          className="user-dropdown-item"
                          onClick={() => {
                            navigate('/admin/applications');
                            setIsUserMenuOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              navigate('/admin/applications');
                              setIsUserMenuOpen(false);
                            }
                          }}
                        >
                          <span>📋</span>
                          <span>Gestion Candidatures</span>
                        </div>
                      </>
                    )}
                    
                    {/* Options pour tous les utilisateurs */}
                    <div
                      className="user-dropdown-item"
                      onClick={() => {
                        navigate('/orientation');
                        setIsUserMenuOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/orientation');
                          setIsUserMenuOpen(false);
                        }
                      }}
                    >
                      <span>🎯</span>
                      <span>Orientation</span>
                    </div>
                    
                    <div
                      className="user-dropdown-item"
                      onClick={() => {
                        navigate('/programs');
                        setIsUserMenuOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/programs');
                          setIsUserMenuOpen(false);
                        }
                      }}
                    >
                      <span>📚</span>
                      <span>Programmes</span>
                    </div>
                    
                    <div className="user-dropdown-divider"></div>
                    
                    <div
                      className="user-dropdown-item"
                      onClick={() => {
                        navigate('/settings');
                        setIsUserMenuOpen(false);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate('/settings');
                          setIsUserMenuOpen(false);
                        }
                      }}
                    >
                      <span>⚙️</span>
                      <span>Paramètres</span>
                    </div>
                    
                    <div className="user-dropdown-item logout" onClick={handleLogout}>
                      <FaSignOutAlt />
                      <span>Se déconnecter</span>
                    </div>
                </div>
                )}
            </div>
          ) : (
            <div className="auth-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/login" className="navbar-button outline">
                  {t('login')}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/register" className="navbar-button solid">
                  {t('register')}
                </Link>
              </motion.div>
            </div>
          )}
        </div>

          {/* Bouton menu mobile */}
          <motion.button
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav-item ${activePage === item.page ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default GlobalNavbar;
