import React, { useState, useEffect } from 'react';
import BackendConnectivityTest from './BackendConnectivityTest';
import FrontendPerformanceTest from './FrontendPerformanceTest';
import './PerformanceDashboard.css';

/**
 * Tableau de bord de performance complet
 * Intègre les tests de connectivité backend et de performance frontend
 */
const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overallScore, setOverallScore] = useState(0);
  const [systemHealth, setSystemHealth] = useState('checking');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mise à jour automatique du score global
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulation d'une mise à jour du score
      const newScore = Math.min(100, overallScore + Math.random() * 5);
      setOverallScore(newScore);
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, [overallScore]);

  // Calcul du niveau de santé du système
  const getSystemHealthLevel = () => {
    if (overallScore >= 90) return { level: 'Excellent', color: '#10b981', emoji: '🚀' };
    if (overallScore >= 75) return { level: 'Bon', color: '#3b82f6', emoji: '✅' };
    if (overallScore >= 60) return { level: 'Moyen', color: '#f59e0b', emoji: '⚠️' };
    return { level: 'Critique', color: '#ef4444', emoji: '❌' };
  };

  const healthLevel = getSystemHealthLevel();

  // Mise à jour de la santé du système
  useEffect(() => {
    if (overallScore >= 90) setSystemHealth('excellent');
    else if (overallScore >= 75) setSystemHealth('good');
    else if (overallScore >= 60) setSystemHealth('warning');
    else setSystemHealth('critical');
  }, [overallScore]);

  // Formatage de la date de dernière mise à jour
  const formatLastUpdate = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="performance-dashboard">
      {/* En-tête du tableau de bord */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>📊 Tableau de Bord de Performance</h1>
          <p>Surveillance complète des performances frontend et backend</p>
        </div>
        
        {/* Indicateur de santé global */}
        <div className={`health-indicator ${systemHealth}`}>
          <span className="health-emoji">{healthLevel.emoji}</span>
          <div className="health-info">
            <h3>Santé du Système</h3>
            <p>{healthLevel.level}</p>
          </div>
        </div>
      </div>

      {/* Score global et métriques */}
      <div className="overview-section">
        <div className="score-overview">
          <div className="score-display">
            <div className="score-circle">
              <svg viewBox="0 0 120 120" className="score-svg">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={healthLevel.color}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - overallScore / 100)}`}
                  transform="rotate(-90 60 60)"
                  className="score-progress"
                />
              </svg>
              <div className="score-text">
                <span className="score-value">{overallScore.toFixed(1)}</span>
                <span className="score-unit">/100</span>
              </div>
            </div>
            <div className="score-details">
              <h3>Score Global de Performance</h3>
              <p>Dernière mise à jour: {formatLastUpdate(lastUpdate)}</p>
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Frontend:</span>
                  <span className="breakdown-value">85/100</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Backend:</span>
                  <span className="breakdown-value">92/100</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Connectivité:</span>
                  <span className="breakdown-value">98/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques rapides */}
        <div className="quick-metrics">
          <div className="metric-item">
            <span className="metric-icon">⚡</span>
            <div className="metric-content">
              <h4>Temps de Réponse</h4>
              <span className="metric-value">45ms</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">💾</span>
            <div className="metric-content">
              <h4>Mémoire Utilisée</h4>
              <span className="metric-value">128MB</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">🔄</span>
            <div className="metric-content">
              <h4>Requêtes/sec</h4>
              <span className="metric-value">156</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">🎯</span>
            <div className="metric-content">
              <h4>Précision</h4>
              <span className="metric-value">94.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Vue d'ensemble
        </button>
        <button
          className={`tab-button ${activeTab === 'backend' ? 'active' : ''}`}
          onClick={() => setActiveTab('backend')}
        >
          🔗 Tests Backend
        </button>
        <button
          className={`tab-button ${activeTab === 'frontend' ? 'active' : ''}`}
          onClick={() => setActiveTab('frontend')}
        >
          ⚡ Tests Frontend
        </button>
        <button
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>🚀 Performance Générale</h3>
                <div className="performance-chart">
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ width: '85%', backgroundColor: '#10b981' }} />
                    <span className="bar-label">Frontend</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ width: '92%', backgroundColor: '#3b82f6' }} />
                    <span className="bar-label">Backend</span>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-fill" style={{ width: '98%', backgroundColor: '#8b5cf6' }} />
                    <span className="bar-label">Connectivité</span>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>📊 Tendances</h3>
                <div className="trends-container">
                  <div className="trend-item positive">
                    <span className="trend-icon">📈</span>
                    <div className="trend-info">
                      <h4>Performance</h4>
                      <p>+12% ce mois</p>
                    </div>
                  </div>
                  <div className="trend-item positive">
                    <span className="trend-icon">⚡</span>
                    <div className="trend-info">
                      <h4>Vitesse</h4>
                      <p>+8% ce mois</p>
                    </div>
                  </div>
                  <div className="trend-item neutral">
                    <span className="trend-icon">💾</span>
                    <div className="trend-info">
                      <h4>Mémoire</h4>
                      <p>Stable</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>🔧 Recommandations</h3>
                <div className="recommendations-list">
                  <div className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <p>Activer la compression GZIP pour améliorer les temps de chargement</p>
                  </div>
                  <div className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <p>Implémenter le lazy loading pour les images</p>
                  </div>
                  <div className="recommendation-item">
                    <span className="recommendation-icon">💡</span>
                    <p>Optimiser les requêtes de base de données</p>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>📅 Activité Récente</h3>
                <div className="activity-timeline">
                  <div className="timeline-item">
                    <span className="timeline-time">14:32</span>
                    <span className="timeline-event">Test de performance terminé</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-time">14:15</span>
                    <span className="timeline-event">Optimisation du cache activée</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-time">13:58</span>
                    <span className="timeline-event">Mise à jour des métriques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backend' && (
          <div className="backend-tab">
            <BackendConnectivityTest />
          </div>
        )}

        {activeTab === 'frontend' && (
          <div className="frontend-tab">
            <FrontendPerformanceTest />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <div className="analytics-content">
              <h3>📈 Analytics de Performance</h3>
              <p>Cette section affichera des graphiques et analyses détaillées des performances.</p>
              <div className="analytics-placeholder">
                <span className="placeholder-icon">📊</span>
                <p>Graphiques et métriques avancées en cours de développement...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pied de page avec informations système */}
      <div className="dashboard-footer">
        <div className="footer-info">
          <span>🕒 Dernière mise à jour: {formatLastUpdate(lastUpdate)}</span>
          <span>🌐 Version: 1.0.0</span>
          <span>🔧 Environnement: Production</span>
        </div>
        <div className="footer-actions">
          <button className="footer-button">
            🔄 Actualiser
          </button>
          <button className="footer-button">
            📥 Exporter
          </button>
          <button className="footer-button">
            ⚙️ Paramètres
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
