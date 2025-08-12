import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/Navbar.css';
import { useAuth } from '../hooks/useAuth';
import LogoutConfirmation from './LogoutConfirmation';

const GlobalNavbar = ({ activePage = '' }) => {
  const { isAuthenticated, user, logout, logoutAll } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutAllDevices, setLogoutAllDevices] = useState(false);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-profile-section')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutAllDevices(false);
    setShowLogoutConfirmation(true);
    setIsDropdownOpen(false);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      if (logoutAllDevices) {
        await logoutAll();
      } else {
        await logout();
      }
      setShowLogoutConfirmation(false);
      setLogoutAllDevices(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
    setLogoutAllDevices(false);
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
        {/* Logo */}
        <motion.div 
          className="navbar-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={logo} 
            alt="DirAvenir Logo" 
            className="navbar-logo" 
            onClick={() => window.location.href = '/'} 
          />
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={`nav-link ${activePage === item.page ? 'active' : ''}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMobileMenu}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Boutons d'authentification Desktop */}
        <div className="desktop-auth">
          {isAuthenticated ? (
            <div className="user-profile-section">
              <motion.div
                className="user-info"
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUser className="user-icon" />
                <span className="user-name">{user?.prenom || 'Utilisateur'}</span>
                <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
              </motion.div>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="user-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a
                      href="/profile"
                      className="dropdown-item"
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                    >
                      <FaUser className="dropdown-icon" />
                      Mon Profil
                    </motion.a>
                    <motion.button
                      onClick={handleLogoutClick}
                      className="dropdown-item logout-btn"
                      whileHover={{ backgroundColor: '#fef2f2' }}
                    >
                      <FaSignOutAlt className="dropdown-icon" />
                      Se déconnecter
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowLogoutConfirmation(true);
                        setIsDropdownOpen(false);
                        // Set a flag to indicate this is a logout all
                        setLogoutAllDevices(true);
                      }}
                      className="dropdown-item logout-all-btn"
                      whileHover={{ backgroundColor: '#fef2f2' }}
                    >
                      <FaSignOutAlt className="dropdown-icon" />
                      Se déconnecter de tous les appareils
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.a
                href="/signin"
                className="auth-btn login-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.a>
              <motion.a
                href="/signup"
                className="auth-btn signup-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </motion.a>
            </>
          )}
        </div>

        {/* Bouton menu mobile */}
        <motion.button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars />
              </motion.div>
            )}
          </AnimatePresence>
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-content">
              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link ${activePage === item.page ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              
              <div className="mobile-auth">
                {isAuthenticated ? (
                  <>
                    <motion.a
                      href="/profile"
                      className="mobile-auth-btn profile-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeMobileMenu}
                    >
                      <FaUser className="mobile-icon" />
                      Mon Profil
                    </motion.a>
                    <motion.button
                      onClick={() => {
                        handleLogoutClick();
                        closeMobileMenu();
                      }}
                      className="mobile-auth-btn logout-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSignOutAlt className="mobile-icon" />
                      Se déconnecter
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowLogoutConfirmation(true);
                        setLogoutAllDevices(true);
                        closeMobileMenu();
                      }}
                      className="mobile-auth-btn logout-all-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSignOutAlt className="mobile-icon" />
                      Se déconnecter partout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.a
                      href="/signin"
                      className="mobile-auth-btn login-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeMobileMenu}
                    >
                      Log In
                    </motion.a>
                    <motion.a
                      href="/signup"
                      className="mobile-auth-btn signup-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeMobileMenu}
                    >
                      Create Account
                    </motion.a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
        isLogoutAll={logoutAllDevices}
      />
    </motion.header>
  );
};

export default GlobalNavbar;
