import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoColorful from '../assets/logo-colorfull.png';
import '../styles/Navbar.css';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const GlobalNavbar = ({ activePage = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getText } = useTheme();
  const navigate = useNavigate();

  // Gestion du scroll pour l'effet de changement de couleur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/orientation', label: 'Orientation', page: 'orientation' },
    { href: '/programs', label: 'Programs', page: 'programs' },
    { href: '/about', label: 'About US', page: 'about' },
    { href: '/faq', label: 'FAQ', page: 'faq' },
    { href: '/contact', label: 'Contact US', page: 'contact' }
  ];

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
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
              src={isScrolled ? logo : logoColorful} 
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

        {/* Boutons d'authentification - Tout à droite */}
        <div className="navbar-buttons">
          {isAuthenticated ? (
            <div className="user-menu">
              <motion.button
                className="user-menu-button"
                onClick={toggleUserMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="user-avatar">
                  <FaUser />
                </div>
                <div className="user-info">
                  <span className="user-name">{user?.name || 'Utilisateur'}</span>
                  <span className="user-email">{user?.email || ''}</span>
                </div>
                <FaChevronDown className={`chevron ${isUserMenuOpen ? 'rotated' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    className={`user-dropdown ${isUserMenuOpen ? 'show' : ''}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/profile" className="user-dropdown-item">
                      <FaUser />
                      Mon Profil
                    </Link>
                    <Link to="/settings" className="user-dropdown-item">
                      <FaUser />
                      Paramètres
                    </Link>
                    <button onClick={handleLogout} className="user-dropdown-item logout">
                      <FaSignOutAlt />
                      Se déconnecter
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="auth-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/login" className="navbar-button outline">
                  Log In
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/register" className="navbar-button solid">
                  Create Account
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/* Bouton Menu Mobile */}
        <motion.button
          className="navbar-mobile-toggle"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="mobile-menu-header">
                <img src={logo} alt="DirAvenir Logo" className="mobile-logo" />
                <button
                  className="mobile-close-btn"
                  onClick={closeMobileMenu}
                >
                  <FaTimes />
                </button>
              </div>
              
              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link ${activePage === item.page ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Authentification Mobile */}
              <div className="mobile-auth">
                {isAuthenticated ? (
                  <div className="mobile-user-info">
                    <div className="mobile-user-avatar">
                      <FaUser />
                    </div>
                    <span className="mobile-user-name">{user?.name || 'Utilisateur'}</span>
                  </div>
                ) : (
                  <div className="mobile-auth-buttons">
                    <Link to="/login" className="mobile-auth-button login" onClick={closeMobileMenu}>
                      Log In
                    </Link>
                    <Link to="/register" className="mobile-auth-button register" onClick={closeMobileMenu}>
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default GlobalNavbar;
