import React, { useState } from 'react';
import StudentDashboard from '../pages/StudentDashboard';
import { FaPlay, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import './DashboardDemo.css';

const DashboardDemo = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <StudentDashboard />;
  }

  return (
    <div className="dashboard-demo">
      <div className="demo-container">
        <div className="demo-header">
          <h1>
            <FaPlay className="header-icon" />
            Démonstration du Dashboard Étudiant
          </h1>
          <p>Interface moderne et professionnelle avec statistiques avancées</p>
        </div>

        <div className="demo-features">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Statistiques Avancées</h3>
              <p>Diagrammes linéaires, cartes de performance et analyses temporelles</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Cartes Professionnelles</h3>
              <p>Tests et applications avec états visuels et actions contextuelles</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Sidebar Améliorée</h3>
              <p>Navigation avec hover effects et organisation harmonieuse</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Résultats Détaillés</h3>
              <p>Analyse complète des tests avec historique et recommandations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Profil & Paramètres</h3>
              <p>Gestion complète du profil utilisateur et des préférences</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Design Responsive</h3>
              <p>Interface adaptée à tous les écrans et appareils</p>
            </div>
          </div>
        </div>

        <div className="demo-actions">
          <button className="demo-btn primary" onClick={() => setShowDemo(true)}>
            <FaPlay />
            Lancer la Démonstration
          </button>
          <button className="demo-btn secondary">
            <FaInfoCircle />
            En savoir plus
          </button>
        </div>

        <div className="demo-info">
          <h3>Fonctionnalités Principales</h3>
          <ul>
            <li>📊 Tableau de bord avec statistiques en temps réel</li>
            <li>📈 Graphiques linéaires et analyses temporelles</li>
            <li>🎯 Cartes de tests avec scores et recommandations</li>
            <li>📋 Gestion des candidatures avec états visuels</li>
            <li>👤 Profil utilisateur complet avec paramètres</li>
            <li>🔍 Résultats détaillés avec historique des tests</li>
            <li>🎨 Design moderne avec animations et transitions</li>
            <li>📱 Interface responsive pour tous les appareils</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
