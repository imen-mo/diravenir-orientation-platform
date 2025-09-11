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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminCharts = ({ data }) => {
  // Chart des applications par mois
  const applicationsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Applications Approuvées',
        data: data?.applicationsByMonth?.approved || [12, 19, 8, 15, 22, 18, 25, 20, 28, 24, 30, 26],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Applications Rejetées',
        data: data?.applicationsByMonth?.rejected || [3, 5, 2, 4, 6, 4, 7, 5, 8, 6, 9, 7],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Applications En Attente',
        data: data?.applicationsByMonth?.pending || [5, 8, 4, 6, 9, 7, 10, 8, 12, 10, 13, 11],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Chart des utilisateurs par type
  const usersData = {
    labels: ['Étudiants', 'Administrateurs', 'Conseillers'],
    datasets: [
      {
        data: data?.usersByType || [150, 5, 12],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#8B5CF6'
        ],
        borderColor: [
          '#059669',
          '#2563EB',
          '#7C3AED'
        ],
        borderWidth: 2,
      }
    ]
  };

  // Chart des programmes populaires
  const programsData = {
    labels: data?.popularPrograms?.labels || ['Informatique', 'Business', 'Design', 'Ingénierie', 'Marketing'],
    datasets: [
      {
        label: 'Candidatures',
        data: data?.popularPrograms?.data || [45, 38, 32, 28, 22],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#F59E0B',
          '#EF4444'
        ],
        borderColor: [
          '#059669',
          '#2563EB',
          '#7C3AED',
          '#D97706',
          '#DC2626'
        ],
        borderWidth: 2,
      }
    ]
  };

  // Chart des tests complétés
  const testsData = {
    labels: ['Tests Complétés', 'Tests En Cours', 'Tests Non Commencés'],
    datasets: [
      {
        data: data?.testsStatus || [120, 35, 45],
        backgroundColor: [
          '#10B981',
          '#F59E0B',
          '#6B7280'
        ],
        borderColor: [
          '#059669',
          '#D97706',
          '#4B5563'
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
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
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        intersect: false,
        mode: 'index'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const doughnutOptions = {
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
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    cutout: '60%'
  };

  return (
    <div className="admin-charts">
      {/* Applications par mois */}
      <div className="chart-container">
        <div className="chart-header">
          <h3>Applications par Mois</h3>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color approved"></div>
              <span>Approuvées</span>
            </div>
            <div className="legend-item">
              <div className="legend-color rejected"></div>
              <span>Rejetées</span>
            </div>
            <div className="legend-item">
              <div className="legend-color pending"></div>
              <span>En Attente</span>
            </div>
          </div>
        </div>
        <div className="chart-content">
          <Line data={applicationsData} options={chartOptions} />
        </div>
      </div>

      {/* Grille des charts secondaires */}
      <div className="charts-grid">
        {/* Utilisateurs par type */}
        <div className="chart-container small">
          <div className="chart-header">
            <h3>Utilisateurs par Type</h3>
          </div>
          <div className="chart-content">
            <Doughnut data={usersData} options={doughnutOptions} />
          </div>
        </div>

        {/* Programmes populaires */}
        <div className="chart-container small">
          <div className="chart-header">
            <h3>Programmes Populaires</h3>
          </div>
          <div className="chart-content">
            <Bar data={programsData} options={chartOptions} />
          </div>
        </div>

        {/* Tests complétés */}
        <div className="chart-container small">
          <div className="chart-header">
            <h3>Statut des Tests</h3>
          </div>
          <div className="chart-content">
            <Doughnut data={testsData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
