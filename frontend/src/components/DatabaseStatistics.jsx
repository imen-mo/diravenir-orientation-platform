import React, { useState, useEffect } from 'react';
import { FaUsers, FaFileAlt, FaGraduationCap, FaChartBar, FaSpinner, FaSyncAlt, FaDatabase } from 'react-icons/fa';
import { userService, applicationService, programService, testService } from '../services/apiService';

const DatabaseStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    users: { total: 0, byRole: {}, recent: [] },
    applications: { total: 0, byStatus: {}, recent: [] },
    programs: { total: 0, byCategory: {}, recent: [] },
    tests: { total: 0, byStatus: {}, recent: [] }
  });

  useEffect(() => {
    loadAllStatistics();
  }, []);

  const loadAllStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      // Charger toutes les données en parallèle
      const [usersData, applicationsData, programsData, testsData] = await Promise.all([
        loadUsersStatistics(),
        loadApplicationsStatistics(),
        loadProgramsStatistics(),
        loadTestsStatistics()
      ]);

      setStats({
        users: usersData,
        applications: applicationsData,
        programs: programsData,
        tests: testsData
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const loadUsersStatistics = async () => {
    try {
      const users = await userService.getAllUsers();
      const byRole = users.reduce((acc, user) => {
        const role = user.role || 'student';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});

      const recent = users
        .sort((a, b) => new Date(b.createdAt || b.dateCreation) - new Date(a.createdAt || a.dateCreation))
        .slice(0, 5);

      return {
        total: users.length,
        byRole,
        recent
      };
    } catch (error) {
      console.error('Erreur users:', error);
      return { total: 0, byRole: {}, recent: [] };
    }
  };

  const loadApplicationsStatistics = async () => {
    try {
      const applications = await applicationService.getAllApplications();
      const byStatus = applications.reduce((acc, app) => {
        const status = app.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const recent = applications
        .sort((a, b) => new Date(b.submittedAt || b.dateSoumission) - new Date(a.submittedAt || a.dateSoumission))
        .slice(0, 5);

      return {
        total: applications.length,
        byStatus,
        recent
      };
    } catch (error) {
      console.error('Erreur applications:', error);
      return { total: 0, byStatus: {}, recent: [] };
    }
  };

  const loadProgramsStatistics = async () => {
    try {
      const programs = await programService.getAllPrograms();
      const byCategory = programs.reduce((acc, program) => {
        const category = program.category || program.categorie || 'autre';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const recent = programs
        .sort((a, b) => new Date(b.createdAt || b.dateCreation) - new Date(a.createdAt || a.dateCreation))
        .slice(0, 5);

      return {
        total: programs.length,
        byCategory,
        recent
      };
    } catch (error) {
      console.error('Erreur programs:', error);
      return { total: 0, byCategory: {}, recent: [] };
    }
  };

  const loadTestsStatistics = async () => {
    try {
      const tests = await testService.getAllTests();
      const byStatus = tests.reduce((acc, test) => {
        const status = test.status || 'completed';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const recent = tests
        .sort((a, b) => new Date(b.completedAt || b.dateCompletion) - new Date(a.completedAt || a.dateCompletion))
        .slice(0, 5);

      return {
        total: tests.length,
        byStatus,
        recent
      };
    } catch (error) {
      console.error('Erreur tests:', error);
      return { total: 0, byStatus: {}, recent: [] };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': case 'completed': case 'active': return 'text-green-600';
      case 'pending': case 'in_progress': return 'text-yellow-600';
      case 'rejected': case 'inactive': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-600';
      case 'student': return 'text-blue-600';
      case 'counselor': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="database-statistics">
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <h3>Chargement des données de la base de données...</h3>
          <p>Récupération de toutes les statistiques en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="database-statistics">
      {/* Header */}
      <div className="stats-header">
        <div className="header-left">
          <h2>
            <FaDatabase className="header-icon" />
            Statistiques de la Base de Données
          </h2>
          <p>Vue d'ensemble complète de toutes les données stockées</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={loadAllStatistics}>
            <FaSyncAlt />
            Actualiser
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Statistiques principales */}
      <div className="main-stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Utilisateurs</h3>
            <div className="stat-number">{stats.users.total}</div>
            <div className="stat-breakdown">
              {Object.entries(stats.users.byRole).map(([role, count]) => (
                <div key={role} className="breakdown-item">
                  <span className={`role ${getRoleColor(role)}`}>
                    {role === 'student' ? 'Étudiants' : 
                     role === 'admin' ? 'Admins' : 
                     role === 'counselor' ? 'Conseillers' : role}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon applications">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <h3>Candidatures</h3>
            <div className="stat-number">{stats.applications.total}</div>
            <div className="stat-breakdown">
              {Object.entries(stats.applications.byStatus).map(([status, count]) => (
                <div key={status} className="breakdown-item">
                  <span className={`status ${getStatusColor(status)}`}>
                    {status === 'approved' ? 'Approuvées' :
                     status === 'pending' ? 'En Attente' :
                     status === 'rejected' ? 'Rejetées' : status}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon programs">
            <FaGraduationCap />
          </div>
          <div className="stat-content">
            <h3>Programmes</h3>
            <div className="stat-number">{stats.programs.total}</div>
            <div className="stat-breakdown">
              {Object.entries(stats.programs.byCategory).map(([category, count]) => (
                <div key={category} className="breakdown-item">
                  <span className="category">
                    {category === 'informatique' ? 'Informatique' :
                     category === 'business' ? 'Business' :
                     category === 'design' ? 'Design' : category}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon tests">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>Tests</h3>
            <div className="stat-number">{stats.tests.total}</div>
            <div className="stat-breakdown">
              {Object.entries(stats.tests.byStatus).map(([status, count]) => (
                <div key={status} className="breakdown-item">
                  <span className={`status ${getStatusColor(status)}`}>
                    {status === 'completed' ? 'Terminés' :
                     status === 'in_progress' ? 'En Cours' :
                     status === 'not_started' ? 'Non Commencés' : status}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Détails récents */}
      <div className="recent-data-grid">
        {/* Utilisateurs récents */}
        <div className="recent-section">
          <h3>Utilisateurs Récents</h3>
          <div className="recent-list">
            {stats.users.recent.map((user, index) => (
              <div key={index} className="recent-item">
                <div className="item-info">
                  <div className="item-name">
                    {user.firstName || user.prenom} {user.lastName || user.nom}
                  </div>
                  <div className="item-details">
                    <span className={`role ${getRoleColor(user.role)}`}>
                      {user.role === 'student' ? 'Étudiant' : 
                       user.role === 'admin' ? 'Admin' : 
                       user.role === 'counselor' ? 'Conseiller' : user.role}
                    </span>
                    <span className="item-date">
                      {new Date(user.createdAt || user.dateCreation).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidatures récentes */}
        <div className="recent-section">
          <h3>Candidatures Récentes</h3>
          <div className="recent-list">
            {stats.applications.recent.map((app, index) => (
              <div key={index} className="recent-item">
                <div className="item-info">
                  <div className="item-name">
                    {app.studentName || `${app.student?.firstName} ${app.student?.lastName}`}
                  </div>
                  <div className="item-details">
                    <span className="item-program">
                      {app.programName || app.program?.name}
                    </span>
                    <span className={`status ${getStatusColor(app.status)}`}>
                      {app.status === 'approved' ? 'Approuvée' :
                       app.status === 'pending' ? 'En Attente' :
                       app.status === 'rejected' ? 'Rejetée' : app.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programmes récents */}
        <div className="recent-section">
          <h3>Programmes Récents</h3>
          <div className="recent-list">
            {stats.programs.recent.map((program, index) => (
              <div key={index} className="recent-item">
                <div className="item-info">
                  <div className="item-name">
                    {program.name || program.nom}
                  </div>
                  <div className="item-details">
                    <span className="item-category">
                      {program.category === 'informatique' ? 'Informatique' :
                       program.category === 'business' ? 'Business' :
                       program.category === 'design' ? 'Design' : program.category}
                    </span>
                    <span className="item-price">
                      {program.price || program.prix}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tests récents */}
        <div className="recent-section">
          <h3>Tests Récents</h3>
          <div className="recent-list">
            {stats.tests.recent.map((test, index) => (
              <div key={index} className="recent-item">
                <div className="item-info">
                  <div className="item-name">
                    {test.studentName || `${test.student?.firstName} ${test.student?.lastName}`}
                  </div>
                  <div className="item-details">
                    <span className="item-test">
                      {test.testType || test.typeTest}
                    </span>
                    <span className={`status ${getStatusColor(test.status)}`}>
                      {test.status === 'completed' ? 'Terminé' :
                       test.status === 'in_progress' ? 'En Cours' :
                       test.status === 'not_started' ? 'Non Commencé' : test.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatistics;
