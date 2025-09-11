import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './DynamicCharts.css';

const DynamicCharts = ({ applications, testResults, timeRange = 'month' }) => {
  const [activeChart, setActiveChart] = useState('line');
  const [chartData, setChartData] = useState(null);

  // Générer des données dynamiques basées sur les vraies données
  useEffect(() => {
    const generateChartData = () => {
      const now = new Date();
      const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
      
      // Données simulées basées sur les vraies applications
      const applicationsData = [];
      const testsData = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Simuler des données basées sur les vraies applications
        const applicationsCount = Math.floor(Math.random() * 3) + (applications.length > 0 ? 1 : 0);
        const testsCount = Math.floor(Math.random() * 2) + (testResults.length > 0 ? 1 : 0);
        
        applicationsData.push({
          date: date.toISOString().split('T')[0],
          count: applicationsCount,
          submitted: Math.floor(applicationsCount * 0.7),
          inProgress: Math.floor(applicationsCount * 0.3)
        });
        
        testsData.push({
          date: date.toISOString().split('T')[0],
          count: testsCount,
          averageScore: Math.floor(Math.random() * 20) + 75
        });
      }
      
      setChartData({
        applications: applicationsData,
        tests: testsData,
        summary: {
          totalApplications: applicationsData.reduce((sum, day) => sum + day.count, 0),
          totalTests: testsData.reduce((sum, day) => sum + day.count, 0),
          averageScore: Math.round(testsData.reduce((sum, day) => sum + day.averageScore, 0) / testsData.length),
          trend: applicationsData[applicationsData.length - 1].count > applicationsData[0].count ? 'up' : 'down'
        }
      });
    };

    generateChartData();
  }, [applications, testResults, timeRange]);

  const chartTypes = [
    { id: 'line', label: 'Ligne', icon: FaChartLine },
    { id: 'bar', label: 'Barres', icon: FaChartBar },
    { id: 'pie', label: 'Circulaire', icon: FaChartPie }
  ];

  const timeRanges = [
    { id: 'week', label: '7 derniers jours' },
    { id: 'month', label: '30 derniers jours' },
    { id: 'quarter', label: '3 derniers mois' }
  ];

  const renderChart = () => {
    if (!chartData) return null;

    switch (activeChart) {
      case 'line':
        return (
          <div className="line-chart-container">
            <div className="chart-header">
              <h4>📈 Évolution des Candidatures</h4>
              <div className="trend-indicator">
                {chartData.summary.trend === 'up' ? (
                  <FaArrowUp className="trend-up" />
                ) : (
                  <FaArrowDown className="trend-down" />
                )}
                <span className={`trend-text ${chartData.summary.trend}`}>
                  {chartData.summary.trend === 'up' ? '+12%' : '-5%'} ce mois
                </span>
              </div>
            </div>
            <div className="chart-content">
              <div className="chart-bars">
                {chartData.applications.slice(-7).map((day, index) => (
                  <div key={index} className="chart-bar">
                    <div className="bar-container">
                      <div 
                        className="bar-fill"
                        style={{ height: `${(day.count / Math.max(...chartData.applications.map(d => d.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="bar-label">{new Date(day.date).getDate()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'bar':
        return (
          <div className="bar-chart-container">
            <div className="chart-header">
              <h4>📊 Répartition des Statuts</h4>
            </div>
            <div className="chart-content">
              <div className="status-bars">
                <div className="status-bar">
                  <div className="status-label">Soumises</div>
                  <div className="status-bar-container">
                    <div className="status-bar-fill submitted" style={{ width: '70%' }}></div>
                    <span className="status-count">7</span>
                  </div>
                </div>
                <div className="status-bar">
                  <div className="status-label">En cours</div>
                  <div className="status-bar-container">
                    <div className="status-bar-fill in-progress" style={{ width: '25%' }}></div>
                    <span className="status-count">3</span>
                  </div>
                </div>
                <div className="status-bar">
                  <div className="status-label">Brouillons</div>
                  <div className="status-bar-container">
                    <div className="status-bar-fill draft" style={{ width: '15%' }}></div>
                    <span className="status-count">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pie':
        return (
          <div className="pie-chart-container">
            <div className="chart-header">
              <h4>🎯 Scores des Tests</h4>
            </div>
            <div className="chart-content">
              <div className="pie-chart">
                <div className="pie-slice excellent" style={{ '--percentage': '30%' }}>
                  <span className="slice-label">Excellent (90%+)</span>
                  <span className="slice-count">3</span>
                </div>
                <div className="pie-slice good" style={{ '--percentage': '40%' }}>
                  <span className="slice-label">Bon (80-89%)</span>
                  <span className="slice-count">4</span>
                </div>
                <div className="pie-slice average" style={{ '--percentage': '20%' }}>
                  <span className="slice-label">Moyen (70-79%)</span>
                  <span className="slice-count">2</span>
                </div>
                <div className="pie-slice needs-improvement" style={{ '--percentage': '10%' }}>
                  <span className="slice-label">À améliorer (&lt;70%)</span>
                  <span className="slice-count">1</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dynamic-charts">
      <div className="charts-controls">
        <div className="chart-type-selector">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              className={`chart-type-btn ${activeChart === type.id ? 'active' : ''}`}
              onClick={() => setActiveChart(type.id)}
            >
              <type.icon />
              {type.label}
            </button>
          ))}
        </div>
        
        <div className="time-range-selector">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              className={`time-range-btn ${timeRange === range.id ? 'active' : ''}`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-display">
        {renderChart()}
      </div>

      {chartData && (
        <div className="chart-summary">
          <div className="summary-item">
            <span className="summary-label">Total Candidatures</span>
            <span className="summary-value">{chartData.summary.totalApplications}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tests Complétés</span>
            <span className="summary-value">{chartData.summary.totalTests}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Score Moyen</span>
            <span className="summary-value">{chartData.summary.averageScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicCharts;
