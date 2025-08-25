import React, { useState, useEffect } from 'react';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import ExcelUploader from '../components/ExcelUploader';
import GlobalLayout from '../components/GlobalLayout';
import BackendConnectivityTest from '../components/BackendConnectivityTest';
import UserManagement from '../components/UserManagement';
import ApplicationManagement from '../components/ApplicationManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('programs');
  const [stats, setStats] = useState({
    total: 0,
    opened: 0,
    comingSoon: 0,
    closed: 0
  });

  useEffect(() => {
    if (activeTab === 'programs') {
      loadPrograms();
    }
  }, [activeTab]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await programService.getAll();
      setPrograms(data);
      
      // Calculate stats
      const stats = {
        total: data.length,
        opened: data.filter(p => p.status === 'OPENED').length,
        comingSoon: data.filter(p => p.status === 'COMING_SOON').length,
        closed: data.filter(p => p.status === 'CLOSED').length
      };
      setStats(stats);
    } catch (error) {
      toast.error('Erreur lors du chargement des programmes');
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgramDelete = async (programId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      try {
        await programService.delete(programId);
        toast.success('Programme supprimé avec succès');
        loadPrograms(); // Reload the list
      } catch (error) {
        toast.error('Erreur lors de la suppression du programme');
        console.error('Error deleting program:', error);
      }
    }
  };

  const handleStatusChange = async (programId, newStatus) => {
    try {
      const program = programs.find(p => p.id === programId);
      if (program) {
        const updatedProgram = { ...program, status: newStatus };
        await programService.update(programId, updatedProgram);
        toast.success('Statut mis à jour avec succès');
        loadPrograms(); // Reload the list
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
      console.error('Error updating status:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'programs':
        return (
          <>
            {/* Statistiques */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total</h3>
                <span className="stat-number">{stats.total}</span>
              </div>
              <div className="stat-card">
                <h3>Ouverts</h3>
                <span className="stat-number">{stats.opened}</span>
              </div>
              <div className="stat-card">
                <h3>Bientôt</h3>
                <span className="stat-number">{stats.comingSoon}</span>
              </div>
              <div className="stat-card">
                <h3>Fermés</h3>
                <span className="stat-number">{stats.closed}</span>
              </div>
            </div>

            {/* Test de connectivité */}
            <div className="connectivity-section">
              <h2>Diagnostic de Connectivité</h2>
              <BackendConnectivityTest />
            </div>

            {/* Upload Excel */}
            <div className="upload-section">
              <h2>Ajouter des programmes</h2>
              <ExcelUploader onUploadSuccess={loadPrograms} />
            </div>

            {/* Liste des programmes */}
            <div className="programs-section">
              <h2>Programmes existants</h2>
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Chargement des programmes...</p>
                </div>
              ) : (
                <div className="programs-grid">
                  {programs.map((program) => (
                    <div key={program.id} className="program-card">
                      <div className="program-header">
                        <h3>{program.program || 'Nom du programme'}</h3>
                        <span className={`status-badge ${program.status?.toLowerCase()}`}>
                          {program.status}
                        </span>
                      </div>
                      <div className="program-details">
                        <p><strong>Université:</strong> {program.universities || 'N/A'}</p>
                        <p><strong>Catégorie:</strong> {program.category || 'N/A'}</p>
                        <p><strong>Ville:</strong> {program.campusCity || 'N/A'}</p>
                        <p><strong>Type:</strong> {program.degreeType || 'N/A'}</p>
                        <p><strong>Durée:</strong> {program.duration || 'N/A'} ans</p>
                        <p><strong>Langue:</strong> {program.language || 'N/A'}</p>
                        <p><strong>Frais:</strong> {program.tuitionFees || 'N/A'}</p>
                        <p><strong>Date limite:</strong> {program.applyBefore || 'N/A'}</p>
                      </div>
                      <div className="program-actions">
                        <select
                          value={program.status}
                          onChange={(e) => handleStatusChange(program.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="OPENED">Ouvert</option>
                          <option value="COMING_SOON">Bientôt</option>
                          <option value="CLOSED">Fermé</option>
                        </select>
                        <button
                          onClick={() => handleProgramDelete(program.id)}
                          className="delete-btn"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      
      case 'users':
        return <UserManagement />;
      
      case 'applications':
        return <ApplicationManagement />;
      
      default:
        return null;
    }
  };

  return (
    <GlobalLayout activePage="admin">
      <div className="admin-dashboard">
        <main className="admin-main">
          <div className="admin-header">
            <h1>Tableau de Bord Administrateur</h1>
            <p>Gérez les programmes, utilisateurs et candidatures de la plateforme</p>
          </div>

          {/* Navigation par onglets */}
          <div className="admin-tabs">
            <button
              className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`}
              onClick={() => setActiveTab('programs')}
            >
              📚 Programmes
            </button>
            <button
              className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Utilisateurs
            </button>
            <button
              className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              📝 Candidatures
            </button>
          </div>

          {/* Contenu de l'onglet actif */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </GlobalLayout>
  );
};

export default AdminDashboard; 