import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_diravenir.png';
import '../styles/Navbar.css';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const GlobalNavbar = ({ activePage = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getText } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Pages où le sélecteur de langue ne doit pas être affiché
  const hideLanguageSelector = ['login', 'register'].includes(activePage);

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
      console.log('🚪 Déconnexion en cours...');
      
      // Fermer le menu utilisateur
      setIsUserMenuOpen(false);
      
      // Appeler la déconnexion du contexte
      await logout();
      
      // Nettoyer toutes les données locales
      localStorage.clear();
      sessionStorage.clear();
      
      // Nettoyer les cookies côté client
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      console.log('✅ Déconnexion complète réussie');
      
      // Rediriger vers la page d'accueil
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      // Même en cas d'erreur, nettoyer les données locales
      localStorage.clear();
      sessionStorage.clear();
      navigate('/', { replace: true });
    }
  };

  const navItems = [
    { href: '/', label: t('home'), page: 'home' },
    { href: '/orientation', label: t('orientation'), page: 'orientation' },
    { href: '/programs', label: t('programs'), page: 'programs' },
    { href: '/about', label: t('about'), page: 'about' },
    { href: '/faq', label: t('faq'), page: 'faq' },
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
        {/* Logo - Tout à gauche */}
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

        {/* Navigation - Centrée */}
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

        {/* Sélecteur de langue - Entre navigation et authentification */}
        {!hideLanguageSelector && (
          <div className="navbar-language">
            <LanguageSelector />
          </div>
        )}

        {/* Boutons d'authentification - Tout à droite */}
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
                <div className="user-avatar">
                  {(() => {
                    const email = user?.email || user?.userEmail || user?.user_email;
                    return email ? email.charAt(0).toUpperCase() : 'U';
                  })()}
                </div>
              </motion.button>

              {/* Menu déroulant utilisateur */}
                {isUserMenuOpen && (
                <div className="user-dropdown">
                    {/* Informations utilisateur */}
                    <div className="user-dropdown-header">
                      <div className="user-dropdown-avatar">
                        {(() => {
                          const email = user?.email || user?.userEmail || user?.user_email;
                          return email ? email.charAt(0).toUpperCase() : 'U';
                        })()}
                      </div>
                      <div className="user-dropdown-info">
                        <div className="user-dropdown-name">
                          {user?.firstName || user?.name || 'Utilisateur'}
                        </div>
                        <div className="user-dropdown-email">
                          {user?.email || user?.userEmail || user?.user_email || 'email@example.com'}
                        </div>
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
