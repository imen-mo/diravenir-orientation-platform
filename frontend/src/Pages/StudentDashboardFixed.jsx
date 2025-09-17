import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaGraduationCap, 
  FaFileAlt, 
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaBookmark,
  FaClipboardList,
  FaUserEdit,
  FaBell,
  FaPlus,
  FaHeart
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import AdvancedStudentCharts from '../components/AdvancedStudentCharts';
import apiService from '../services/api';
import './StudentDashboardFixed.css';

const StudentDashboardFixed = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 0,
    completedTests: 0,
    totalTests: 0,
    savedPrograms: 0,
    profileCompletion: 0
  });
  
  const [applications, setApplications] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérification d'authentification
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        console.log('🔒 Utilisateur non authentifié - redirection vers login');
        navigate('/login');
        return;
      }
      
      try {
        const userData = JSON.parse(user);
        if (userData.role !== 'ETUDIANT') {
          console.log('🔒 Rôle non autorisé - redirection vers login');
          navigate('/login');
          return;
        }
        console.log('✅ Utilisateur authentifié:', userData.email);
      } catch (error) {
        console.error('❌ Erreur parsing user data:', error);
        navigate('/login');
        return;
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Chargement des données du dashboard étudiant...');
      
      // Charger toutes les données en parallèle
      const [
        statsResponse,
        applicationsResponse,
        testResultsResponse,
        timelineResponse,
        savedProgramsResponse
      ] = await Promise.allSettled([
        apiService.getStudentStats(),
        apiService.getStudentApplications(),
        apiService.getStudentTestResults(),
        apiService.getStudentTimeline(),
        apiService.getSavedPrograms()
      ]);
      
      // Traiter les statistiques - UNIQUEMENT depuis la base de données
      if (statsResponse.status === 'fulfilled') {
        const statsData = statsResponse.value || {};
        setStats({
          totalApplications: statsData.totalApplications || 0,
          completedTests: statsData.completedTests || 0,
          totalTests: statsData.totalTests || 0,
          savedPrograms: statsData.savedPrograms || 0,
          profileCompletion: statsData.profileCompletion || 0
        });
        console.log('✅ Statistiques chargées depuis la base de données:', statsData);
      } else {
        console.error('❌ Erreur chargement statistiques:', statsResponse.reason);
        setError('Impossible de charger les statistiques depuis la base de données');
      }
      
      // Traiter les applications - UNIQUEMENT depuis la base de données
      if (applicationsResponse.status === 'fulfilled') {
        const appsData = applicationsResponse.value || {};
        setApplications(Array.isArray(appsData.applications) ? appsData.applications : []);
        console.log('✅ Candidatures chargées depuis la base de données:', appsData.applications?.length || 0);
      } else {
        console.error('❌ Erreur chargement candidatures:', applicationsResponse.reason);
        setApplications([]);
      }
      
      // Traiter les résultats de tests - UNIQUEMENT depuis la base de données
      if (testResultsResponse.status === 'fulfilled') {
        const testsData = testResultsResponse.value || {};
        setTestResults(Array.isArray(testsData.testResults) ? testsData.testResults : []);
        console.log('✅ Résultats de tests chargés depuis la base de données:', testsData.testResults?.length || 0);
      } else {
        console.error('❌ Erreur chargement résultats tests:', testResultsResponse.reason);
        setTestResults([]);
      }
      
      // Traiter la timeline - UNIQUEMENT depuis la base de données
      if (timelineResponse.status === 'fulfilled') {
        const timelineData = timelineResponse.value || {};
        setTimeline(Array.isArray(timelineData.timeline) ? timelineData.timeline : []);
        console.log('✅ Timeline chargée depuis la base de données:', timelineData.timeline?.length || 0);
      } else {
        console.error('❌ Erreur chargement timeline:', timelineResponse.reason);
        setTimeline([]);
      }
      
      // Traiter les programmes sauvegardés - UNIQUEMENT depuis la base de données
      if (savedProgramsResponse.status === 'fulfilled') {
        const savedData = savedProgramsResponse.value || {};
        setSavedPrograms(Array.isArray(savedData.programs) ? savedData.programs : []);
        console.log('✅ Programmes sauvegardés chargés depuis la base de données:', savedData.programs?.length || 0);
      } else {
        console.error('❌ Erreur chargement programmes sauvegardés:', savedProgramsResponse.reason);
        setSavedPrograms([]);
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement dashboard:', error);
      setError('Erreur lors du chargement des données depuis la base de données');
      // Ne pas utiliser de données factices - laisser les tableaux vides
      setStats({
        totalApplications: 0,
        completedTests: 0,
        totalTests: 0,
        savedPrograms: 0,
        profileCompletion: 0
      });
      setApplications([]);
      setTestResults([]);
      setTimeline([]);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'var(--success-green)';
    if (percentage >= 60) return 'var(--warning-yellow)';
    return 'var(--error-red)';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'var(--success-green)';
      case 'pending':
      case 'submitted':
        return 'var(--warning-yellow)';
      case 'rejected':
      case 'failed':
        return 'var(--error-red)';
      default:
        return 'var(--text-gray)';
    }
  };

  if (loading) {
    return (
      <StudentLayoutFinal>
        <div className="student-dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Chargement de votre dashboard...</p>
        </div>
      </StudentLayoutFinal>
    );
  }

  if (error) {
    return (
      <StudentLayoutFinal>
        <div className="student-dashboard-error">
          <FaTimesCircle />
          <h3>Erreur</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-btn">
            Réessayer
          </button>
        </div>
      </StudentLayoutFinal>
    );
  }

  return (
    <StudentLayoutFinal>
      <div className="student-dashboard" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Section principale avec graphique linéaire et statistiques */}
        <div className="main-dashboard-section">
          {/* Graphique linéaire en haut à gauche */}
          <div className="chart-section">
            <div className="chart-header">
              <h2>📈 Évolution des Candidatures</h2>
              <p>Progression de vos candidatures sur les 6 derniers mois</p>
            </div>
            
            <div className="line-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(84, 22, 82, 0.95)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#541652" 
                    strokeWidth={3}
                    dot={{ fill: '#541652', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#541652', strokeWidth: 2 }}
                    name="Candidatures"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tests" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
                    name="Tests"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cartes statistiques à droite */}
          <div className="stats-section">
            <div className="stats-header">
              <h2>📊 Statistiques Rapides</h2>
              <p>Vue d'ensemble de votre activité</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaFileAlt />
                </div>
                <div className="stat-content">
                  <h3>{stats.totalApplications}</h3>
                  <p>Candidatures</p>
                  <span className="stat-change neutral">Données réelles</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <FaClipboardList />
                </div>
                <div className="stat-content">
                  <h3>{stats.completedTests}/{stats.totalTests}</h3>
                  <p>Tests complétés</p>
                  <span className="stat-change neutral">Données réelles</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <FaBookmark />
                </div>
                <div className="stat-content">
                  <h3>{stats.savedPrograms}</h3>
                  <p>Programmes sauvegardés</p>
                  <span className="stat-change neutral">Stable</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <FaUserEdit />
                </div>
                <div className="stat-content">
                  <h3 style={{ color: getCompletionColor(stats.profileCompletion) }}>
                    {stats.profileCompletion}%
                  </h3>
                  <p>Profil complété</p>
                  <span className="stat-change neutral">Données réelles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="dashboard-content">
          {/* Applications récentes */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Candidatures Récentes</h2>
              <button className="view-all-btn">
                <FaEye />
                Voir tout
              </button>
            </div>
            
            <div className="applications-list">
              {applications.length > 0 ? (
                applications.slice(0, 5).map((app, index) => (
                  <div key={app.id || index} className="application-item">
                    <div className="app-info">
                      <h4>{app.program || 'Programme'}</h4>
                      <p>{app.university || 'Université'}</p>
                      <span className="app-date">{app.date || 'N/A'}</span>
                    </div>
                    <div className="app-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(app.status) }}
                      >
                        {app.status || 'En attente'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FaFileAlt />
                  <p>Aucune candidature pour le moment</p>
                  <button className="primary-btn">
                    <FaPlus />
                    Commencer une candidature
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Programmes Sauvegardés */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Mes Programmes Sauvegardés</h2>
              <button className="view-all-btn">
                <FaEye />
                Voir tout
              </button>
            </div>
            
            <div className="saved-programs-list">
              {savedPrograms.length > 0 ? (
                savedPrograms.slice(0, 3).map((program, index) => (
                  <div key={program.id || index} className="saved-program-item">
                    <div className="program-info">
                      <h4>{program.name || 'Programme'}</h4>
                      <p>{program.university || 'Université'}</p>
                      <span className="program-country">{program.country || 'N/A'}</span>
                    </div>
                    <div className="program-actions">
                      <button className="btn-icon">
                        <FaHeart />
                      </button>
                      <button className="btn-icon">
                        <FaEye />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FaBookmark />
                  <p>Aucun programme sauvegardé</p>
                  <button className="primary-btn">
                    <FaPlus />
                    Découvrir les programmes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Résultats de tests */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Résultats de Tests</h2>
              <button className="view-all-btn">
                <FaEye />
                Voir tout
              </button>
            </div>
            
            <div className="test-results-list">
              {testResults.length > 0 ? (
                testResults.slice(0, 3).map((test, index) => (
                  <div key={test.id || index} className="test-result-item">
                    <div className="test-info">
                      <h4>{test.testName || 'Test d\'Orientation'}</h4>
                      <p>Score: {test.score || 0}/100</p>
                      <span className="test-date">{test.date || 'N/A'}</span>
                    </div>
                    <div className="test-status">
                      <span className="status-badge success">
                        {test.status || 'Complété'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FaClipboardList />
                  <p>Aucun test complété</p>
                  <button className="primary-btn">
                    <FaPlus />
                    Passer un test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Graphiques Avancés */}
        <div className="dashboard-section full-width">
          <div className="section-header">
            <h2>📊 Analytics Avancés</h2>
            <p>Analyse détaillée de vos candidatures avec graphiques interactifs</p>
          </div>
          
          <AdvancedStudentCharts 
            applications={applications}
            testResults={testResults}
            timeline={timeline}
          />
        </div>

        {/* Timeline - seulement si des données réelles */}
        {timeline.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Activité Récente</h2>
              <p>Données basées sur vos activités réelles</p>
            </div>
            
            <div className="timeline">
              {timeline.slice(0, 6).map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-month">{item.month}</div>
                  <div className="timeline-stats">
                    <div className="timeline-stat">
                      <FaFileAlt />
                      <span>{item.applications || 0} candidatures</span>
                    </div>
                    <div className="timeline-stat">
                      <FaClipboardList />
                      <span>{item.tests || 0} tests</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentDashboardFixed;
