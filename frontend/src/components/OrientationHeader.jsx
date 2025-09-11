import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './OrientationHeader.css';

const OrientationHeader = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="orientation-header">
      {/* Logo */}
      <div className="header-logo">
        <img src={logo} alt="Diravenir" />
      </div>
      
      {/* Navigation Links */}
      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/orientation" className="nav-link active">Orientation</Link>
        <Link to="/programs" className="nav-link">Programs</Link>
        <Link to="/about" className="nav-link">About US</Link>
        <Link to="/faq" className="nav-link">FAQ</Link>
        <Link to="/contact" className="nav-link">Contact US</Link>
      </nav>
      
      {/* Action Buttons */}
      <div className="header-actions">
        <button className="btn-login" onClick={handleLogin}>
          Log in
        </button>
        <button className="btn-create-account" onClick={handleCreateAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default OrientationHeader;
