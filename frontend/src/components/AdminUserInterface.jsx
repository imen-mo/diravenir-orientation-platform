import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserShield, FaArrowLeft, FaHome, FaGraduationCap, FaFileAlt, FaChartBar, FaUser, FaComments, FaCog } from 'react-icons/fa';
import './AdminUserInterface.css';

const AdminUserInterface = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showAdminBar, setShowAdminBar] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  const toggleAdminBar = () => {
    setShowAdminBar(!showAdminBar);
  };

  if (!user || (user.role !== 'ADMIN' && user.role !== 'admin')) {
    return children;
  }

  return (
    <div className="admin-user-interface">
      {/* Admin Bar */}
      {showAdminBar && (
        <div className="admin-bar">
          <div className="admin-bar-content">
            <div className="admin-bar-left">
              <div className="admin-badge">
                <FaUserShield />
                <span>Mode Admin</span>
              </div>
              <div className="admin-info">
                <span className="admin-name">{user.prenom || user.firstName} {user.nom || user.lastName}</span>
                <span className="admin-role">Administrateur</span>
              </div>
            </div>
            <div className="admin-bar-right">
              <button className="admin-bar-btn" onClick={handleBackToAdmin}>
                <FaArrowLeft />
                Retour Admin
              </button>
              <button className="admin-bar-btn" onClick={toggleAdminBar}>
                Masquer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!showAdminBar && (
        <button className="admin-toggle-btn" onClick={toggleAdminBar}>
          <FaUserShield />
        </button>
      )}

      {/* Main Content */}
      <div className={`admin-content ${showAdminBar ? 'with-admin-bar' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminUserInterface;
