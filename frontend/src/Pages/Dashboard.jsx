import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import UserStatusIndicator from '../components/UserStatusIndicator';
import UserStatusTest from '../components/UserStatusTest';
import GlobalNavbar from '../components/GlobalNavbar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="dashboard-container">
      <GlobalNavbar activePage="dashboard" />
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Tableau de bord</h1>
          <UserStatusIndicator />
        </div>
        
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Bienvenue sur votre tableau de bord</h2>
            <p>Vous êtes maintenant connecté et pouvez accéder à toutes les fonctionnalités.</p>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Profil</h3>
              <p>Gérez vos informations personnelles</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Tests d'orientation</h3>
              <p>Passez des tests pour découvrir votre voie</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Programmes</h3>
              <p>Explorez les programmes disponibles</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Messages</h3>
              <p>Consultez vos messages et notifications</p>
            </div>
          </div>
          
          {/* Composant de test du système de statut */}
          <UserStatusTest />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
