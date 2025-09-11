import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';
import './DashboardStats.css';

const DashboardStats = ({ applications, timeRange = 'month' }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    applicationsThisPeriod: 0,
    applicationsLastPeriod: 0,
    changePercentage: 0,
    changeDirection: 'neutral',
    statusDistribution: {},
    timelineData: [],
    averageProcessingTime: 0,
    completionRate: 0
  });

  useEffect(() => {
    if (applications && applications.length > 0) {
      calculateTimeBasedStats(applications, timeRange);
    }
  }, [applications, timeRange]);

  const calculateTimeBasedStats = (apps, range) => {
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

    // Filtrer les applications par période
    const currentPeriodApps = apps.filter(app => 
      new Date(app.createdAt) >= periodStart
    );
    
    const lastPeriodApps = apps.filter(app => 
      new Date(app.createdAt) >= lastPeriodStart && new Date(app.createdAt) < periodStart
    );

    // Calculer les statistiques
    const totalApps = apps.length;
    const currentPeriodCount = currentPeriodApps.length;
    const lastPeriodCount = lastPeriodApps.length;
    
    // Calculer le pourcentage de changement
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

    // Temps de traitement moyen
    const averageProcessingTime = calculateAverageProcessingTime(apps);

    // Taux de completion
    const completionRate = calculateCompletionRate(apps);

    setStats({
      totalApplications: totalApps,
      applicationsThisPeriod: currentPeriodCount,
      applicationsLastPeriod: lastPeriodCount,
      changePercentage: Math.abs(changePercentage),
      changeDirection,
      statusDistribution,
      timelineData,
      averageProcessingTime,
      completionRate
    });
  };

  const generateTimelineData = (apps, range) => {
    const now = new Date();
    let intervals = [];
    let intervalSize = 1; // jours par défaut
    
    switch (range) {
      case 'week':
        intervals = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split('T')[0];
        });
        intervalSize = 1;
        break;
      case 'month':
        intervals = Array.from({ length: 30 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        intervalSize = 1;
        break;
      case 'quarter':
        intervals = Array.from({ length: 3 }, (_, i) => {
          const date = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + i, 1);
          return date.toISOString().split('T')[0];
        });
        intervalSize = 30;
        break;
      case 'year':
        intervals = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(now.getFullYear(), i, 1);
          return date.toISOString().split('T')[0];
        });
        intervalSize = 30;
        break;
    }

    return intervals.map(date => {
      const count = apps.filter(app => {
        const appDate = new Date(app.createdAt).toISOString().split('T')[0];
        return appDate === date;
      }).length;
      
      return { date, count };
    });
  };

  const calculateAverageProcessingTime = (apps) => {
    const completedApps = apps.filter(app => 
      app.status === 'APPROVED' || app.status === 'REJECTED'
    );
    
    if (completedApps.length === 0) return 0;
    
    const totalTime = completedApps.reduce((sum, app) => {
      const created = new Date(app.createdAt);
      const completed = new Date(app.approvedAt || app.rejectedAt);
      return sum + (completed - created);
    }, 0);
    
    return Math.round(totalTime / completedApps.length / (1000 * 60 * 60 * 24)); // en jours
  };

  const calculateCompletionRate = (apps) => {
    if (apps.length === 0) return 0;
    
    const completedApps = apps.filter(app => 
      app.status === 'APPROVED' || app.status === 'REJECTED'
    );
    
    return Math.round((completedApps.length / apps.length) * 100);
  };

  const getStatusColor = (status) => {
    const colors = {
      'DRAFT': '#6c757d',
      'IN_PROGRESS': '#007bff',
      'READY_FOR_SUBMISSION': '#28a745',
      'SUBMITTED': '#28a745',
      'UNDER_REVIEW': '#ffc107',
      'APPROVED': '#28a745',
      'REJECTED': '#dc3545',
      'COMPLETED': '#6f42c1'
    };
    return colors[status] || '#6c757d';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'DRAFT': 'Brouillon',
      'IN_PROGRESS': 'En cours',
      'READY_FOR_SUBMISSION': 'Prêt à soumettre',
      'SUBMITTED': 'Soumise',
      'UNDER_REVIEW': 'En révision',
      'APPROVED': 'Approuvée',
      'REJECTED': 'Rejetée',
      'COMPLETED': 'Terminée'
    };
    return labels[status] || status;
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

  return (
    <div className="dashboard-stats">
      {/* En-tête des statistiques */}
      <div className="stats-header">
        <h2>📊 Statistiques Temporelles</h2>
        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setStats(prev => ({ ...prev, timeRange: e.target.value }))}
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
      <div className="stats-cards">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3>{stats.applicationsThisPeriod}</h3>
            <p>Nouvelles candidatures</p>
            <div className="stat-change">
              {getChangeIcon()}
              <span className={`change-value ${stats.changeDirection}`}>
                {stats.changePercentage.toFixed(1)}%
              </span>
              <span className="change-period">vs période précédente</span>
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.completionRate}%</h3>
            <p>Taux de completion</p>
            <div className="stat-detail">
              {stats.totalApplications} candidatures au total
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{stats.averageProcessingTime}</h3>
            <p>Jours de traitement moyen</p>
            <div className="stat-detail">
              Pour les candidatures finalisées
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{stats.statusDistribution['IN_PROGRESS'] || 0}</h3>
            <p>Candidatures en cours</p>
            <div className="stat-detail">
              Nécessitent votre attention
            </div>
          </div>
        </div>
      </div>

      {/* Distribution des statuts */}
      <div className="stats-section">
        <h3>📈 Distribution des Statuts</h3>
        <div className="status-distribution">
          {Object.entries(stats.statusDistribution).map(([status, count]) => (
            <div key={status} className="status-item">
              <div className="status-bar">
                <div 
                  className="status-fill" 
                  style={{ 
                    width: `${(count / stats.totalApplications) * 100}%`,
                    backgroundColor: getStatusColor(status)
                  }}
                ></div>
              </div>
              <div className="status-info">
                <span className="status-label">{getStatusLabel(status)}</span>
                <span className="status-count">{count}</span>
                <span className="status-percentage">
                  {((count / stats.totalApplications) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphique temporel */}
      <div className="stats-section">
        <h3>📅 Évolution Temporelle</h3>
        <div className="timeline-chart">
          <div className="chart-container">
            {stats.timelineData.map((data, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ height: `${Math.max((data.count / Math.max(...stats.timelineData.map(d => d.count))) * 100, 5)}%` }}
                ></div>
                <span className="bar-label">
                  {timeRange === 'week' || timeRange === 'month' 
                    ? new Date(data.date).getDate()
                    : new Date(data.date).toLocaleDateString('fr-FR', { month: 'short' })
                  }
                </span>
                <span className="bar-value">{data.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
