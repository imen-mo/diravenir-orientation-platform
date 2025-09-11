import React from 'react';
import { Link } from 'react-router-dom';
import AdminDashboardModern from './AdminDashboardModern';
import StudentDashboardModern from './StudentDashboardModern';
import './DashboardTestModern.css';

const DashboardTestModern = () => {
  return (
    <div className="dashboard-test-modern">
      <div className="test-header">
        <h1>Test des Dashboards Modernes</h1>
        <p>Interface de test pour les nouveaux dashboards avec design aéré</p>
      </div>

      <div className="test-content">
        <div className="dashboard-preview">
          <h2>Dashboard Admin Moderne</h2>
          <p>Design aéré avec sidebar violet, cartes de statistiques et graphiques</p>
          <div className="preview-container">
            <AdminDashboardModern />
          </div>
        </div>

        <div className="dashboard-preview">
          <h2>Dashboard Étudiant Moderne</h2>
          <p>Interface étudiante avec tests d'orientation et programmes recommandés</p>
          <div className="preview-container">
            <StudentDashboardModern />
          </div>
        </div>
      </div>

      <div className="test-navigation">
        <Link to="/admin" className="test-link admin">
          <span className="test-icon">👨‍💼</span>
          <span>Dashboard Admin</span>
        </Link>
        <Link to="/dashboard" className="test-link student">
          <span className="test-icon">👨‍🎓</span>
          <span>Dashboard Étudiant</span>
        </Link>
        <Link to="/" className="test-link home">
          <span className="test-icon">🏠</span>
          <span>Retour à l'accueil</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardTestModern;
