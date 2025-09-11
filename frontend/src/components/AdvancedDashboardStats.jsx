import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaGraduationCap,
  FaFileAlt,
  FaUsers,
  FaTrophy,
  FaEye,
  FaDownload
} from 'react-icons/fa';
import './AdvancedDashboardStats.css';

const AdvancedDashboardStats = ({ applications = [], testResults = [], timeRange = 'month' }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    applicationsThisPeriod: 0,
    applicationsLastPeriod: 0,
    changePercentage: 0,
    changeDirection: 'neutral',
    statusDistribution: {},
    timelineData: [],
    averageProcessingTime: 0,
    completionRate: 0,
    testStats: {
      totalTests: 0,
      averageScore: 0,
      bestScore: 0,
      testsThisMonth: 0
    }
  });

  useEffect(() => {
    if (applications.length > 0 || testResults.length > 0) {
      calculateAdvancedStats(applications, testResults, timeRange);
    }
  }, [applications, testResults, timeRange]);

  const calculateAdvancedStats = (apps, tests, range) => {
    const now = new Date();
    let periodStart, lastPeriodStart;
    
    // Définir les périodes selon le range
    switch (range) {
      case 'week':
        periodStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        lastPeriodStart = new Date(periodStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        lastPeriodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'quarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        periodStart = new Date(now.getFullYear(), currentQuarter * 3, 1);
        lastPeriodStart = new Date(now.getFullYear(), (currentQuarter - 1) * 3, 1);
        break;
      case 'year':
        periodStart = new Date(now.getFullYear(), 0, 1);
        lastPeriodStart = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default:
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        lastPeriodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    // Statistiques des applications
    const currentPeriodApps = apps.filter(app => 
      new Date(app.createdAt || app.submittedAt) >= periodStart
    );
    
    const lastPeriodApps = apps.filter(app => 
      new Date(app.createdAt || app.submittedAt) >= lastPeriodStart && 
      new Date(app.createdAt || app.submittedAt) < periodStart
    );

    const totalApps = apps.length;
    const currentPeriodCount = currentPeriodApps.length;
    const lastPeriodCount = lastPeriodApps.length;
    
    let changePercentage = 0;
    let changeDirection = 'neutral';
    
    if (lastPeriodCount > 0) {
      changePercentage = ((currentPeriodCount - lastPeriodCount) / lastPeriodCount) * 100;
      changeDirection = changePercentage > 0 ? 'up' : changePercentage < 0 ? 'down' : 'neutral';
    }

    // Distribution des statuts
    const statusDistribution = apps.reduce((acc, app) => {
      const status = app.status || 'DRAFT';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Données temporelles pour le graphique
    const timelineData = generateTimelineData(apps, range);

    // Statistiques des tests
    const testStats = calculateTestStats(tests, periodStart);

    setStats({
      totalApplications: totalApps,
      applicationsThisPeriod: currentPeriodCount,
      applicationsLastPeriod: lastPeriodCount,
      changePercentage: Math.abs(changePercentage),
      changeDirection,
      statusDistribution,
      timelineData,
      averageProcessingTime: calculateAverageProcessingTime(apps),
      completionRate: calculateCompletionRate(apps),
      testStats
    });
  };

  const generateTimelineData = (apps, range) => {
    const now = new Date();
    let data = [];
    
    if (range === 'week') {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const count = apps.filter(app => {
          const appDate = new Date(app.createdAt || app.submittedAt);
          return appDate.toDateString() === date.toDateString();
        }).length;
        data.push({ date: date.toISOString(), count });
      }
    } else if (range === 'month') {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), i);
        const count = apps.filter(app => {
          const appDate = new Date(app.createdAt || app.submittedAt);
          return appDate.getDate() === i && appDate.getMonth() === now.getMonth();
        }).length;
        data.push({ date: date.toISOString(), count });
      }
    }
    
    return data;
  };

  const calculateTestStats = (tests, periodStart) => {
    if (!tests || tests.length === 0) {
      return {
        totalTests: 0,
        averageScore: 0,
        bestScore: 0,
        testsThisMonth: 0
      };
    }

    const testsThisMonth = tests.filter(test => 
      new Date(test.completedAt || test.testDate) >= periodStart
    ).length;

    const scores = tests.map(test => test.score || 0).filter(score => score > 0);
    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

    return {
      totalTests: tests.length,
      averageScore: Math.round(averageScore),
      bestScore: Math.round(bestScore),
      testsThisMonth
    };
  };

  const calculateAverageProcessingTime = (apps) => {
    const completedApps = apps.filter(app => 
      app.status === 'APPROVED' || app.status === 'REJECTED'
    );
    
    if (completedApps.length === 0) return 0;
    
    const totalDays = completedApps.reduce((sum, app) => {
      const start = new Date(app.createdAt || app.submittedAt);
      const end = new Date(app.updatedAt || new Date());
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);
    
    return Math.round(totalDays / completedApps.length);
  };

  const calculateCompletionRate = (apps) => {
    if (apps.length === 0) return 0;
    const completedApps = apps.filter(app => 
      app.status === 'SUBMITTED' || app.status === 'APPROVED' || app.status === 'REJECTED'
    );
    return Math.round((completedApps.length / apps.length) * 100);
  };

  const getChangeIcon = () => {
    switch (stats.changeDirection) {
      case 'up':
        return <FaArrowUp className="change-icon up" />;
      case 'down':
        return <FaArrowDown className="change-icon down" />;
      default:
        return <FaMinus className="change-icon neutral" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'DRAFT': '#f39c12',
      'IN_PROGRESS': '#3498db',
      'SUBMITTED': '#2ecc71',
      'APPROVED': '#27ae60',
      'REJECTED': '#e74c3c',
      'UNDER_REVIEW': '#f39c12'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'DRAFT': 'Brouillon',
      'IN_PROGRESS': 'En cours',
      'SUBMITTED': 'Soumis',
      'APPROVED': 'Approuvé',
      'REJECTED': 'Rejeté',
      'UNDER_REVIEW': 'En révision'
    };
    return labels[status] || status;
  };

  return (
    <div className="advanced-dashboard-stats">
      {/* En-tête avec sélecteur de période */}
      <div className="stats-header">
        <div className="header-content">
          <h2>
            <FaChartLine className="header-icon" />
            Tableau de Bord Analytique
          </h2>
          <p>Vue d'ensemble de vos performances et activités</p>
        </div>
        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => {/* Gérer le changement de période */}}
            className="time-select"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="stats-cards-grid">
        {/* Carte Applications */}
        <div className="stat-card primary">
          <div className="card-header">
            <div className="card-icon">
              <FaFileAlt />
            </div>
            <div className="card-trend">
              {getChangeIcon()}
              <span className={`trend-value ${stats.changeDirection}`}>
                {stats.changePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="card-content">
            <h3>{stats.applicationsThisPeriod}</h3>
            <p>Nouvelles candidatures</p>
            <div className="card-detail">
              {stats.totalApplications} au total
            </div>
          </div>
          <div className="card-footer">
            <span className="period-label">vs période précédente</span>
          </div>
        </div>

        {/* Carte Tests */}
        <div className="stat-card success">
          <div className="card-header">
            <div className="card-icon">
              <FaGraduationCap />
            </div>
            <div className="card-trend">
              <FaTrophy className="trend-icon" />
            </div>
          </div>
          <div className="card-content">
            <h3>{stats.testStats.averageScore}%</h3>
            <p>Score moyen des tests</p>
            <div className="card-detail">
              {stats.testStats.totalTests} tests complétés
            </div>
          </div>
          <div className="card-footer">
            <span className="period-label">Meilleur score: {stats.testStats.bestScore}%</span>
          </div>
        </div>

        {/* Carte Completion */}
        <div className="stat-card info">
          <div className="card-header">
            <div className="card-icon">
              <FaCheckCircle />
            </div>
            <div className="card-trend">
              <FaArrowUp className="trend-icon" />
            </div>
          </div>
          <div className="card-content">
            <h3>{stats.completionRate}%</h3>
            <p>Taux de completion</p>
            <div className="card-detail">
              Candidatures finalisées
            </div>
          </div>
          <div className="card-footer">
            <span className="period-label">Performance globale</span>
          </div>
        </div>

        {/* Carte Temps de traitement */}
        <div className="stat-card warning">
          <div className="card-header">
            <div className="card-icon">
              <FaClock />
            </div>
            <div className="card-trend">
              <FaArrowDown className="trend-icon" />
            </div>
          </div>
          <div className="card-content">
            <h3>{stats.averageProcessingTime}</h3>
            <p>Jours de traitement</p>
            <div className="card-detail">
              Temps moyen
            </div>
          </div>
          <div className="card-footer">
            <span className="period-label">Pour les candidatures finalisées</span>
          </div>
        </div>
      </div>

      {/* Graphique linéaire et distribution */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>
              <FaChartLine className="chart-icon" />
              Évolution des Candidatures
            </h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <FaEye />
                Voir détails
              </button>
              <button className="chart-action-btn">
                <FaDownload />
                Exporter
              </button>
            </div>
          </div>
          <div className="line-chart">
            <div className="chart-area">
              {stats.timelineData.map((data, index) => (
                <div key={index} className="chart-point">
                  <div 
                    className="point-value"
                    style={{ 
                      height: `${Math.max((data.count / Math.max(...stats.timelineData.map(d => d.count))) * 100, 5)}%` 
                    }}
                  ></div>
                  <span className="point-label">
                    {timeRange === 'week' || timeRange === 'month' 
                      ? new Date(data.date).getDate()
                      : new Date(data.date).toLocaleDateString('fr-FR', { month: 'short' })
                    }
                  </span>
                  <span className="point-count">{data.count}</span>
                </div>
              ))}
            </div>
            <div className="chart-line"></div>
          </div>
        </div>

        <div className="distribution-container">
          <div className="distribution-header">
            <h3>
              <FaChartPie className="chart-icon" />
              Distribution des Statuts
            </h3>
          </div>
          <div className="status-distribution">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div key={status} className="status-item">
                <div className="status-info">
                  <div 
                    className="status-color" 
                    style={{ backgroundColor: getStatusColor(status) }}
                  ></div>
                  <span className="status-label">{getStatusLabel(status)}</span>
                  <span className="status-count">{count}</span>
                </div>
                <div className="status-bar">
                  <div 
                    className="status-fill" 
                    style={{ 
                      width: `${(count / stats.totalApplications) * 100}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  ></div>
                </div>
                <span className="status-percentage">
                  {((count / stats.totalApplications) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques des tests */}
      {stats.testStats.totalTests > 0 && (
        <div className="test-stats-section">
          <div className="section-header">
            <h3>
              <FaGraduationCap className="section-icon" />
              Statistiques des Tests
            </h3>
          </div>
          <div className="test-stats-grid">
            <div className="test-stat-card">
              <div className="test-stat-icon">
                <FaFileAlt />
              </div>
              <div className="test-stat-content">
                <h4>{stats.testStats.totalTests}</h4>
                <p>Tests complétés</p>
              </div>
            </div>
            <div className="test-stat-card">
              <div className="test-stat-icon">
                <FaTrophy />
              </div>
              <div className="test-stat-content">
                <h4>{stats.testStats.bestScore}%</h4>
                <p>Meilleur score</p>
              </div>
            </div>
            <div className="test-stat-card">
              <div className="test-stat-icon">
                <FaChartBar />
              </div>
              <div className="test-stat-content">
                <h4>{stats.testStats.testsThisMonth}</h4>
                <p>Tests ce mois</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedDashboardStats;
