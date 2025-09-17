import React, { useState, useEffect } from 'react';
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
  FaEye
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import AdvancedCharts from '../components/AdvancedCharts';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';

const AdminDashboardCharts = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrograms: 0,
    totalApplications: 0,
    recentLogins: 0
  });
  
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    usersByRole: {}
  });
  
  const [programStats, setProgramStats] = useState({
    totalPrograms: 0,
    programsByStatus: {},
    programsByDestination: {},
    programsByUniversity: {}
  });
  
  const [applicationStats, setApplicationStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    documentsRequired: 0,
    paymentPending: 0,
    paymentCompleted: 0,
    paymentFailed: 0
  });
  
  const [timelineData, setTimelineData] = useState({
    timeline: [],
    totalMonths: 0,
    totalApplications: 0
  });
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30'); // 7, 30, 90, 365 jours
  const [chartType, setChartType] = useState('overview'); // overview, users, programs, applications

  useEffect(() => {
    loadDashboardData();
  }, [selectedFilter, dateRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Chargement des données du dashboard...');
      
      // Charger toutes les statistiques en parallèle
      const [
        statsData,
        userStatsData,
        programStatsData,
        applicationStatsData,
        timelineData,
        applicationsData
      ] = await Promise.allSettled([
        adminApiService.getStats(),
        adminApiService.getUserStatistics(),
        adminApiService.getProgramStatistics(),
        adminApiService.getApplicationStatistics(),
        adminApiService.getApplicationTimeline(parseInt(dateRange) / 30), // Convertir jours en mois
        adminApiService.getApplications({
          status: selectedFilter !== 'all' ? selectedFilter : undefined
        })
      ]);
      
      // Traiter les statistiques générales
      if (statsData.status === 'fulfilled') {
        setStats(statsData.value);
      }
      
      // Traiter les statistiques utilisateurs
      if (userStatsData.status === 'fulfilled') {
        setUserStats(userStatsData.value);
      }
      
      // Traiter les statistiques programmes
      if (programStatsData.status === 'fulfilled') {
        setProgramStats(programStatsData.value);
      }
      
      // Traiter les statistiques applications
      if (applicationStatsData.status === 'fulfilled') {
        setApplicationStats(applicationStatsData.value);
      }
      
      // Traiter les données timeline
      if (timelineData.status === 'fulfilled') {
        setTimelineData(timelineData.value);
      }
      
      // Traiter les applications avec gestion d'erreur
      if (applicationsData.status === 'fulfilled') {
        setApplications(applicationsData.value.items || applicationsData.value || []);
        console.log('✅ Applications chargées:', applicationsData.value);
      } else {
        console.warn('⚠️ Erreur chargement applications:', applicationsData.reason?.message);
        setApplications([]); // Pas de données simulées, juste un tableau vide
      }
      
      console.log('✅ Toutes les données du dashboard chargées');
    } catch (err) {
      console.error('❌ Erreur chargement dashboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Utiliser directement les statistiques de la DB depuis l'état applicationStats

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <div className="admin-card admin-stat-card">
      <div className="admin-card-content">
        <div className="admin-stat-header">
          <div className={`admin-stat-icon ${color}`}>
            <Icon />
          </div>
          <div className="admin-stat-info">
            <h3 className="admin-stat-title">{title}</h3>
            <p className="admin-stat-value">{value}</p>
            {change && (
              <div className={`admin-stat-change ${changeType}`}>
                {changeType === 'increase' ? <FaArrowUp /> : <FaArrowDown />}
                <span>{change}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = '' }) => (
    <div className={`admin-card admin-chart-card ${className}`}>
      <div className="admin-card-header">
        <h3 className="admin-card-title">{title}</h3>
      </div>
      <div className="admin-card-content">
        {children}
      </div>
    </div>
  );

  const ApplicationStatusChart = () => {
    const data = [
      { label: 'Approuvées', value: applicationStats.approved, color: 'var(--success)', icon: FaCheckCircle },
      { label: 'En cours', value: applicationStats.pending, color: 'var(--warning)', icon: FaClock },
      { label: 'Rejetées', value: applicationStats.rejected, color: 'var(--error)', icon: FaTimesCircle }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const IconComponent = item.icon;
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}>
                  <IconComponent />
                </div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div
                key={index}
                className="admin-chart-bar-segment"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const RecentApplicationsTable = () => (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Programme</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.slice(0, 5).map((app, index) => (
            <tr key={app.id || index}>
              <td>
                <div className="admin-user-cell">
                  <div className="admin-user-avatar-small">
                    {app.etudiant?.prenom?.charAt(0) || app.studentName?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <div className="admin-user-name">
                      {app.etudiant?.prenom || app.studentName || 'N/A'} {app.etudiant?.nom || app.studentLastName || ''}
                    </div>
                    <div className="admin-user-email">
                      {app.etudiant?.email || app.studentEmail || 'N/A'}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="admin-program-cell">
                  <div className="admin-program-name">
                    {app.program?.program || app.programName || 'N/A'}
                  </div>
                  <div className="admin-program-university">
                    {app.program?.universite || app.university || 'N/A'}
                  </div>
                </div>
              </td>
              <td>
                <span className={`admin-badge ${
                  app.status === 'APPROVED' || app.status === 'approuvé' ? 'admin-badge-success' :
                  app.status === 'REJECTED' || app.status === 'rejeté' ? 'admin-badge-error' :
                  'admin-badge-warning'
                }`}>
                  {app.status === 'APPROVED' || app.status === 'approuvé' ? 'Approuvée' :
                   app.status === 'REJECTED' || app.status === 'rejeté' ? 'Rejetée' :
                   'En cours'}
                </span>
              </td>
              <td>
                <div className="admin-date-cell">
                  {app.dateCreation ? new Date(app.dateCreation).toLocaleDateString('fr-FR') : 'N/A'}
                </div>
              </td>
              <td>
                <button className="admin-btn admin-btn-sm admin-btn-secondary">
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {applications.length === 0 && (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📝</div>
          <h3 className="admin-empty-state-title">Aucune candidature</h3>
          <p className="admin-empty-state-description">
            Aucune candidature ne correspond aux critères sélectionnés
          </p>
        </div>
      )}
    </div>
  );

  // Nouveaux composants de graphiques
  const UserRoleChart = () => {
    const data = Object.entries(userStats.usersByRole || {}).map(([role, count]) => ({
      label: role === 'ETUDIANT' ? 'Étudiants' : role === 'ADMIN' ? 'Administrateurs' : role,
      value: count,
      color: role === 'ETUDIANT' ? 'var(--primary)' : role === 'ADMIN' ? 'var(--accent)' : 'var(--secondary)'
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const UserActivityChart = () => {
    const data = [
      { label: 'Actifs', value: userStats.activeUsers || 0, color: 'var(--success)' },
      { label: 'Inactifs', value: userStats.inactiveUsers || 0, color: 'var(--error)' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const ProgramStatusChart = () => {
    const data = Object.entries(programStats.programsByStatus || {}).map(([status, count]) => ({
      label: status === 'OPENED' ? 'Ouverts' : status === 'COMING_SOON' ? 'Bientôt' : status === 'CLOSED' ? 'Fermés' : status,
      value: count,
      color: status === 'OPENED' ? 'var(--success)' : status === 'COMING_SOON' ? 'var(--warning)' : 'var(--error)'
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const ProgramDestinationChart = () => {
    const data = Object.entries(programStats.programsByDestination || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([destination, count]) => ({
        label: destination,
        value: count,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const TopUniversitiesChart = () => {
    const data = Object.entries(programStats.programsByUniversity || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([university, count]) => ({
        label: university,
        value: count,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const PaymentStatusChart = () => {
    const data = [
      { label: 'En attente', value: applicationStats.paymentPending || 0, color: 'var(--warning)' },
      { label: 'Complété', value: applicationStats.paymentCompleted || 0, color: 'var(--success)' },
      { label: 'Échoué', value: applicationStats.paymentFailed || 0, color: 'var(--error)' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-legend">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={index} className="admin-chart-legend-item">
                <div className="admin-chart-legend-color" style={{ backgroundColor: item.color }}></div>
                <div className="admin-chart-legend-info">
                  <span className="admin-chart-legend-label">{item.label}</span>
                  <span className="admin-chart-legend-value">{item.value} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="admin-chart-bar">
          {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="admin-chart-bar-item" style={{ 
                width: `${percentage}%`, 
                backgroundColor: item.color 
              }}></div>
            );
          })}
        </div>
      </div>
    );
  };

  const ApplicationsTimelineChart = () => {
    // Utiliser les vraies données de la timeline
    const data = timelineData.timeline || [];
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

    if (data.length === 0) {
      return (
        <div className="admin-chart-container">
          <div className="admin-empty-state">
            <div className="admin-empty-state-icon">📅</div>
            <h3 className="admin-empty-state-title">Aucune donnée timeline</h3>
            <p className="admin-empty-state-description">
              Aucune donnée disponible pour la période sélectionnée
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="admin-chart-container">
        <div className="admin-chart-timeline">
          {data.map((item, index) => {
            const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
            return (
              <div key={index} className="admin-chart-timeline-item">
                <div className="admin-chart-timeline-bar" style={{ 
                  height: `${height}%`,
                  backgroundColor: 'var(--primary)'
                }}></div>
                <div className="admin-chart-timeline-label">{item.month}</div>
                <div className="admin-chart-timeline-value">{item.count}</div>
              </div>
            );
          })}
        </div>
        <div className="admin-chart-summary">
          <p>Total: {timelineData.totalApplications} candidatures sur {timelineData.totalMonths} mois</p>
        </div>
      </div>
    );
  };

  const UserStatsTable = () => (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Métrique</th>
            <th>Valeur</th>
            <th>Pourcentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total utilisateurs</td>
            <td>{userStats.totalUsers || 0}</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>Utilisateurs actifs</td>
            <td>{userStats.activeUsers || 0}</td>
            <td>{userStats.totalUsers > 0 ? Math.round(((userStats.activeUsers || 0) / userStats.totalUsers) * 100) : 0}%</td>
          </tr>
          <tr>
            <td>Utilisateurs inactifs</td>
            <td>{userStats.inactiveUsers || 0}</td>
            <td>{userStats.totalUsers > 0 ? Math.round(((userStats.inactiveUsers || 0) / userStats.totalUsers) * 100) : 0}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const ProgramStatsTable = () => (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Métrique</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total programmes</td>
            <td>{programStats.totalPrograms || 0}</td>
          </tr>
          <tr>
            <td>Destinations uniques</td>
            <td>{Object.keys(programStats.programsByDestination || {}).length}</td>
          </tr>
          <tr>
            <td>Universités partenaires</td>
            <td>{Object.keys(programStats.programsByUniversity || {}).length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-loading-spinner"></div>
          <p>Chargement du dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-error">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button className="admin-btn admin-btn-primary" onClick={loadDashboardData}>
            Réessayer
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        {/* En-tête avec filtres avancés */}
        <div className="admin-header">
          <h1 className="admin-title">Dashboard - Vue d'ensemble</h1>
          <div className="admin-header-actions">
            <div className="admin-filters">
              <select 
                value={chartType} 
                onChange={(e) => setChartType(e.target.value)}
                className="admin-form-select"
              >
                <option value="overview">Vue d'ensemble</option>
                <option value="users">Utilisateurs</option>
                <option value="programs">Programmes</option>
                <option value="applications">Candidatures</option>
              </select>
              
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="admin-form-select"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="365">365 derniers jours</option>
              </select>
              
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="admin-form-select"
            >
              <option value="all">Toutes les candidatures</option>
              <option value="APPROVED">Approuvées</option>
              <option value="PENDING">En cours</option>
              <option value="REJECTED">Rejetées</option>
                <option value="DRAFT">Brouillons</option>
                <option value="SUBMITTED">Soumises</option>
                <option value="DOCUMENTS_REQUIRED">Documents requis</option>
            </select>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="admin-stats-grid">
          <StatCard
            title="Utilisateurs"
            value={stats.totalUsers || 0}
            icon={FaUsers}
            color="users"
            change="+12"
            changeType="increase"
          />
          <StatCard
            title="Programmes"
            value={stats.totalPrograms || 0}
            icon={FaGraduationCap}
            color="programs"
            change="+5"
            changeType="increase"
          />
          <StatCard
            title="Candidatures"
            value={applicationStats.total}
            icon={FaFileAlt}
            color="applications"
            change="+8"
            changeType="increase"
          />
          <StatCard
            title="Connexions récentes"
            value={stats.recentLogins || 0}
            icon={FaChartLine}
            color="activity"
            change="+15"
            changeType="increase"
          />
        </div>

        {/* Charts et données détaillées */}
        <div className="admin-charts-grid">
          {/* Vue d'ensemble */}
          {chartType === 'overview' && (
            <>
              <ChartCard title="Statut des candidatures" className="admin-chart-large">
                <ApplicationStatusChart />
              </ChartCard>
              
              <ChartCard title="Utilisateurs par rôle" className="admin-chart-large">
                <UserRoleChart />
              </ChartCard>
              
              <ChartCard title="Programmes par destination" className="admin-chart-large">
                <ProgramDestinationChart />
              </ChartCard>
              
              <ChartCard title="Candidatures récentes">
                <RecentApplicationsTable />
              </ChartCard>
            </>
          )}
          
          {/* Vue utilisateurs */}
          {chartType === 'users' && (
            <>
              <ChartCard title="Répartition des utilisateurs" className="admin-chart-large">
                <UserRoleChart />
              </ChartCard>
              
              <ChartCard title="Utilisateurs actifs vs inactifs" className="admin-chart-large">
                <UserActivityChart />
              </ChartCard>
              
              <ChartCard title="Statistiques utilisateurs détaillées">
                <UserStatsTable />
              </ChartCard>
            </>
          )}
          
          {/* Vue programmes */}
          {chartType === 'programs' && (
            <>
              <ChartCard title="Programmes par statut" className="admin-chart-large">
                <ProgramStatusChart />
              </ChartCard>
              
              <ChartCard title="Programmes par destination" className="admin-chart-large">
                <ProgramDestinationChart />
              </ChartCard>
              
              <ChartCard title="Top universités" className="admin-chart-large">
                <TopUniversitiesChart />
              </ChartCard>
              
              <ChartCard title="Statistiques programmes détaillées">
                <ProgramStatsTable />
              </ChartCard>
            </>
          )}
          
          {/* Vue candidatures */}
          {chartType === 'applications' && (
            <>
          <ChartCard title="Statut des candidatures" className="admin-chart-large">
            <ApplicationStatusChart />
          </ChartCard>
              
              <ChartCard title="Statut de paiement" className="admin-chart-large">
                <PaymentStatusChart />
              </ChartCard>
              
              <ChartCard title="Candidatures par mois" className="admin-chart-large">
                <ApplicationsTimelineChart />
              </ChartCard>
          
          <ChartCard title="Candidatures récentes">
            <RecentApplicationsTable />
          </ChartCard>
            </>
          )}
        </div>

        {/* Section Graphiques Avancés Power BI Style */}
        <div className="admin-advanced-charts-section">
          <AdvancedCharts />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardCharts;
