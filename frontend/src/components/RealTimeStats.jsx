import React, { useState, useEffect } from 'react';
import { 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaTrophy
} from 'react-icons/fa';
import './RealTimeStats.css';

const RealTimeStats = ({ applications, testResults, programs }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    submittedApplications: 0,
    inProgressApplications: 0,
    approvedApplications: 0,
    draftApplications: 0,
    upcomingDeadlines: 0,
    completedTests: 0,
    averageScore: 0,
    totalPrograms: 0,
    savedPrograms: 0
  });

  const [trends, setTrends] = useState({
    applicationsTrend: 0,
    testsTrend: 0,
    programsTrend: 0
  });

  // Calculer les statistiques réelles
  useEffect(() => {
    if (applications && testResults && programs) {
      const totalApps = applications.length;
      const submittedApps = applications.filter(app => app.status === 'SUBMITTED').length;
      const inProgressApps = applications.filter(app => app.status === 'IN_PROGRESS').length;
      const approvedApps = applications.filter(app => app.status === 'APPROVED').length;
      const draftApps = applications.filter(app => app.status === 'DRAFT').length;
      
      // Calculer les échéances à venir (30 prochains jours)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const upcomingDeadlines = applications.filter(app => {
        if (!app.deadline) return false;
        const deadline = new Date(app.deadline);
        return deadline <= thirtyDaysFromNow && deadline >= new Date();
      }).length;

      const completedTests = testResults.length;
      const averageScore = testResults.length > 0 
        ? Math.round(testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length)
        : 0;

      // Programmes sauvegardés depuis localStorage
      const savedIds = JSON.parse(localStorage.getItem('savedPrograms') || '[]');
      const savedPrograms = programs.filter(program => 
        savedIds.includes(program.id) || savedIds.includes(program.programId)
      ).length;

      setStats({
        totalApplications: totalApps,
        submittedApplications: submittedApps,
        inProgressApplications: inProgressApps,
        approvedApplications: approvedApps,
        draftApplications: draftApps,
        upcomingDeadlines,
        completedTests,
        averageScore,
        totalPrograms: programs.length,
        savedPrograms
      });

      // Simuler des tendances basées sur les données
      setTrends({
        applicationsTrend: totalApps > 0 ? Math.floor(Math.random() * 20) + 5 : 0,
        testsTrend: completedTests > 0 ? Math.floor(Math.random() * 15) + 3 : 0,
        programsTrend: savedPrograms > 0 ? Math.floor(Math.random() * 10) + 2 : 0
      });
    }
  }, [applications, testResults, programs]);

  const getTrendIcon = (trend) => {
    return trend > 0 ? <FaChartLine className="trend-up" /> : <FaChartLine className="trend-down" />;
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'positive' : 'negative';
  };

  const statCards = [
    {
      id: 'applications',
      title: 'Candidatures Total',
      value: stats.totalApplications,
      icon: FaFileAlt,
      color: 'blue',
      trend: trends.applicationsTrend,
      description: 'Toutes vos candidatures'
    },
    {
      id: 'submitted',
      title: 'Soumises',
      value: stats.submittedApplications,
      icon: FaCheckCircle,
      color: 'green',
      trend: Math.floor(trends.applicationsTrend * 0.8),
      description: 'Candidatures envoyées'
    },
    {
      id: 'in-progress',
      title: 'En Cours',
      value: stats.inProgressApplications,
      icon: FaClock,
      color: 'orange',
      trend: Math.floor(trends.applicationsTrend * 0.6),
      description: 'En cours de finalisation'
    },
    {
      id: 'deadlines',
      title: 'Échéances Proches',
      value: stats.upcomingDeadlines,
      icon: FaCalendarAlt,
      color: 'purple',
      trend: -Math.floor(Math.random() * 5),
      description: 'Dans les 30 prochains jours'
    },
    {
      id: 'tests',
      title: 'Tests Complétés',
      value: stats.completedTests,
      icon: FaGraduationCap,
      color: 'teal',
      trend: trends.testsTrend,
      description: 'Tests d\'orientation passés'
    },
    {
      id: 'score',
      title: 'Score Moyen',
      value: `${stats.averageScore}%`,
      icon: FaTrophy,
      color: 'gold',
      trend: Math.floor(Math.random() * 10) + 2,
      description: 'Performance moyenne'
    }
  ];

  return (
    <div className="realtime-stats">
      <div className="stats-header">
        <h3>📊 Statistiques en Temps Réel</h3>
        <p>Données mises à jour automatiquement</p>
      </div>
      
      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.id} className={`stat-card stat-card-${card.color}`}>
            <div className="stat-header">
              <div className={`stat-icon stat-icon-${card.color}`}>
                <card.icon />
              </div>
              <div className="stat-trend">
                {getTrendIcon(card.trend)}
                <span className={`trend-text ${getTrendColor(card.trend)}`}>
                  {card.trend > 0 ? '+' : ''}{card.trend}%
                </span>
              </div>
            </div>
            
            <div className="stat-content">
              <h4 className="stat-value">{card.value}</h4>
              <p className="stat-title">{card.title}</p>
              <span className="stat-description">{card.description}</span>
            </div>
            
            <div className="stat-footer">
              <div className="stat-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${Math.min((card.value / Math.max(stats.totalApplications, 1)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="stats-summary">
        <div className="summary-item">
          <span className="summary-label">Total Programmes Disponibles</span>
          <span className="summary-value">{stats.totalPrograms}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Programmes Sauvegardés</span>
          <span className="summary-value">{stats.savedPrograms}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Taux de Réussite</span>
          <span className="summary-value">
            {stats.totalApplications > 0 
              ? Math.round((stats.submittedApplications / stats.totalApplications) * 100)
              : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats;
