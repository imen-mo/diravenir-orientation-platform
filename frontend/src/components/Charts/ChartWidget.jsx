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
import './ChartWidget.css';

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

const ChartWidget = ({ 
  title, 
  type = 'line', 
  data, 
  options = {}, 
  loading = false,
  error = false,
  height = 300,
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`chart-widget loading ${className}`}>
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
          <div className="chart-skeleton">
            <div className="skeleton-chart"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`chart-widget error ${className}`}>
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
        </div>
        <div className="chart-error">
          <div className="error-icon">⚠️</div>
          <p>Erreur lors du chargement du graphique</p>
        </div>
      </div>
    );
  }

  const defaultOptions = {
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
        borderColor: '#FCBE1C',
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
    },
    ...options
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={defaultOptions} />;
      case 'bar':
        return <Bar data={data} options={defaultOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={defaultOptions} />;
      case 'pie':
        return <Pie data={data} options={defaultOptions} />;
      default:
        return <Line data={data} options={defaultOptions} />;
    }
  };

  return (
    <div className={`chart-widget ${className}`}>
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>
      <div className="chart-container" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartWidget;
