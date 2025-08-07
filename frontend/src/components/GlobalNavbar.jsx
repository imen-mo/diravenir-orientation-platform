import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const GlobalNavbar = ({ activePage = '' }) => {
  return (
    <motion.header
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <div className="navbar-left">
        <img 
          src={logo} 
          alt="DirAvenir Logo" 
          className="logo" 
          onClick={() => window.location.href = '/'} 
        />
      </div>
      <div className="navbar-right">
        <a href="/" className={`nav-button ${activePage === 'home' ? 'active' : ''}`}>
          Home
        </a>
        <a href="/orientation" className={`nav-button ${activePage === 'orientation' ? 'active' : ''}`}>
          Orientation
        </a>
        <a href="/programs" className={`nav-button ${activePage === 'programs' ? 'active' : ''}`}>
          Programs
        </a>
        <a href="/about" className={`nav-button ${activePage === 'about' ? 'active' : ''}`}>
          About US
        </a>
        <a href="/faq" className={`nav-button ${activePage === 'faq' ? 'active' : ''}`}>
          FAQ
        </a>
        <a href="/contact" className={`nav-button ${activePage === 'contact' ? 'active' : ''}`}>
          Contact US
        </a>
        <a href="/signin" className={`nav-button ${activePage === 'signin' ? 'active' : ''}`}>
          Log In
        </a>
        <a href="/signup" className={`nav-button ${activePage === 'signup' ? 'active' : ''}`}>
          Create Account
        </a>
      </div>
    </motion.header>
  );
};

export default GlobalNavbar;
