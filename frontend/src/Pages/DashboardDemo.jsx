import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import StudentDashboardNew from './StudentDashboardNew';
import './DashboardDemo.css';

const DashboardDemo = () => {
  const [currentDashboard, setCurrentDashboard] = useState('admin');

  return (
    <div className="dashboard-demo">
      <div className="demo-header">
        <h1>🎨 DirAvenir Dashboard Demo</h1>
        <p>Démonstration des tableaux de bord sophistiqués avec design moderne</p>
        
        <div className="demo-controls">
          <button 
            className={`demo-btn ${currentDashboard === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentDashboard('admin')}
          >
            👨‍💼 Admin Dashboard
          </button>
          <button 
            className={`demo-btn ${currentDashboard === 'student' ? 'active' : ''}`}
            onClick={() => setCurrentDashboard('student')}
          >
            👨‍🎓 Student Dashboard
          </button>
        </div>
      </div>

      <div className="demo-content">
        {currentDashboard === 'admin' ? <AdminDashboard /> : <StudentDashboardNew />}
      </div>

      <div className="demo-info">
        <div className="info-card">
          <h3>✨ Fonctionnalités</h3>
          <ul>
            <li>Design moderne et sophistiqué</li>
            <li>Palette de couleurs cohérente</li>
            <li>Animations fluides et transitions</li>
            <li>Interface responsive</li>
            <li>Composants organisés et modulaires</li>
            <li>Sidebar rétractable</li>
            <li>Graphiques interactifs</li>
            <li>Notifications en temps réel</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🎨 Palette de Couleurs</h3>
          <div className="color-palette">
            <div className="color-item">
              <div className="color-swatch" style={{background: '#541652'}}></div>
              <span>Primary Purple</span>
            </div>
            <div className="color-item">
              <div className="color-swatch" style={{background: '#DDC9DB'}}></div>
              <span>Secondary Purple</span>
            </div>
            <div className="color-item">
              <div className="color-swatch" style={{background: 'linear-gradient(88.33deg, #FCBE1C -7.64%, #FF914C 145.94%)'}}></div>
              <span>Gradient Orange</span>
            </div>
            <div className="color-item">
              <div className="color-swatch" style={{background: '#FFFFFF'}}></div>
              <span>Background White</span>
            </div>
            <div className="color-item">
              <div className="color-swatch" style={{background: '#343434'}}></div>
              <span>Text Dark</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>📁 Structure des Fichiers</h3>
          <div className="file-structure">
            <div className="file-item">
              <span className="file-icon">📄</span>
              <span>AdminDashboard.jsx</span>
            </div>
            <div className="file-item">
              <span className="file-icon">🎨</span>
              <span>AdminDashboard.css</span>
            </div>
            <div className="file-item">
              <span className="file-icon">📄</span>
              <span>StudentDashboardNew.jsx</span>
            </div>
            <div className="file-item">
              <span className="file-icon">🎨</span>
              <span>StudentDashboardNew.css</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
