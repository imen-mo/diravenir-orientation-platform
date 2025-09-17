import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import './AdminCharts.css';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const AdminCharts = ({ stats, recentActivity }) => {
  // Configuration des couleurs DirAvenir
  const colors = {
    primary: '#541652',
    secondary: '#DDC9DB',
    accent: '#FCBE1C',
    accent2: '#FF914C',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    gradient: {
      primary: 'linear-gradient(135deg, #541652 0%, #7B2C7B 100%)',
      accent: 'linear-gradient(135deg, #FCBE1C 0%, #FF914C 100%)'
    }
  };

  // Données pour le graphique des utilisateurs (évolution mensuelle)
  const usersData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Nouveaux Utilisateurs',
        data: [120, 190, 300, 500, 200, 300, 450, 600, 550, 700, 800, 950],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  // Données pour le graphique des candidatures par statut
  const applicationsData = {
    labels: ['Approuvées', 'En attente', 'Rejetées', 'Brouillon'],
    datasets: [
      {
        label: 'Candidatures',
        data: [
          stats.totalApplications * 0.6 || 300,
          stats.totalApplications * 0.25 || 125,
          stats.totalApplications * 0.1 || 50,
          stats.totalApplications * 0.05 || 25
        ],
        backgroundColor: [
          colors.success,
          colors.warning,
          colors.error,
          colors.info
        ],
        borderColor: [
          colors.success,
          colors.warning,
          colors.error,
          colors.info
        ],
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  // Données pour le graphique des revenus mensuels
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Revenus (€)',
        data: [15000, 22000, 18000, 25000, 30000, 28000, 35000, 40000, 38000, 45000, 42000, 50000],
        backgroundColor: `${colors.accent}40`,
        borderColor: colors.accent,
        borderWidth: 3,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: `${colors.accent}60`,
        hoverBorderColor: colors.accent2,
        hoverBorderWidth: 4
      }
    ]
  };

  // Données pour le graphique des programmes par université
  const programsData = {
    labels: ['Hefei University', 'Cyprus International', 'University of Bucharest', 'Autres'],
    datasets: [
      {
        label: 'Programmes',
        data: [15, 12, 8, 5],
        backgroundColor: [
          colors.primary,
          colors.accent,
          colors.success,
          colors.info
        ],
        borderColor: [
          colors.primary,
          colors.accent,
          colors.success,
          colors.info
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  // Configuration commune des graphiques
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          },
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          },
          color: '#6B7280'
        }
      }
    }
  };

  // Options spécifiques pour les graphiques en barres
  const barOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Revenus Mensuels',
        font: {
          size: 16,
          weight: '600'
        },
        color: colors.primary,
        padding: {
          bottom: 20
        }
      }
    }
  };

  // Options spécifiques pour les graphiques en ligne
  const lineOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Évolution des Utilisateurs',
        font: {
          size: 16,
          weight: '600'
        },
        color: colors.primary,
        padding: {
          bottom: 20
        }
      }
    }
  };

  // Options spécifiques pour les graphiques en secteurs
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    }
  };

  return (
    <div className="admin-charts">
      <div className="charts-grid">
        {/* Graphique des utilisateurs */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Évolution des Utilisateurs</h3>
            <div className="chart-stats">
              <span className="stat-value">+{stats.totalUsers || 0}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={usersData} options={lineOptions} />
          </div>
        </div>

        {/* Graphique des revenus */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Revenus Mensuels</h3>
            <div className="chart-stats">
              <span className="stat-value">€{(stats.totalRevenue || 0).toLocaleString()}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar data={revenueData} options={barOptions} />
          </div>
        </div>

        {/* Graphique des candidatures */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Candidatures par Statut</h3>
            <div className="chart-stats">
              <span className="stat-value">{stats.totalApplications || 0}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Doughnut data={applicationsData} options={pieOptions} />
          </div>
        </div>

        {/* Graphique des programmes */}
        <div className="chart-container">
          <div className="chart-header">
            <h3>Programmes par Université</h3>
            <div className="chart-stats">
              <span className="stat-value">{stats.totalPrograms || 0}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Pie data={programsData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Graphiques supplémentaires */}
      <div className="charts-grid charts-grid-large">
        {/* Graphique de performance */}
        <div className="chart-container chart-large">
          <div className="chart-header">
            <h3>Performance Globale</h3>
            <div className="chart-stats">
              <span className="stat-value">98.5%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line 
              data={{
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [
                  {
                    label: 'Performance (%)',
                    data: [95, 97, 98, 99, 98, 97],
                    borderColor: colors.success,
                    backgroundColor: `${colors.success}20`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.success,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                  }
                ]
              }} 
              options={lineOptions} 
            />
          </div>
        </div>

        {/* Graphique des activités récentes */}
        <div className="chart-container chart-large">
          <div className="chart-header">
            <h3>Activités Récentes</h3>
            <div className="chart-stats">
              <span className="stat-value">{recentActivity.length || 0}</span>
              <span className="stat-label">Activités</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar 
              data={{
                labels: ['Connexions', 'Candidatures', 'Tests', 'Inscriptions'],
                datasets: [
                  {
                    label: 'Activités',
                    data: [45, 23, 12, 8],
                    backgroundColor: [
                      colors.primary,
                      colors.accent,
                      colors.success,
                      colors.info
                    ],
                    borderColor: [
                      colors.primary,
                      colors.accent,
                      colors.success,
                      colors.info
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                  }
                ]
              }} 
              options={barOptions} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
