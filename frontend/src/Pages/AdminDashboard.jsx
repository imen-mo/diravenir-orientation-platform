{/* Icône de succès */}import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import ExcelUploader from '../components/ExcelUploader';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    opened: 0,
    comingSoon: 0,
    closed: 0
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error('Accès non autorisé');
      return;
    }

    loadPrograms();
  }, [isAuthenticated, user]);

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

  // Vérifier si l'utilisateur est admin
  const isAdmin = user && user.role === 'ADMIN';
  
  if (!isAuthenticated || !user) {
    return (
      <div className="admin-dashboard">
        <div className="unauthorized">
          <h2>Accès Non Autorisé</h2>
          <p>Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="unauthorized">
          <h2>Accès Refusé</h2>
          <p>Vous devez avoir les droits d'administrateur pour accéder à cette page.</p>
          <p>Rôle actuel : {user.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Tableau de Bord Administrateur</h1>
        <p>Gérez vos programmes et importez de nouvelles données</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <h3>Total Programmes</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon opened">✅</div>
          <div className="stat-content">
            <h3>Ouverts</h3>
            <p className="stat-number">{stats.opened}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon coming-soon">⏳</div>
          <div className="stat-content">
            <h3>Bientôt Disponibles</h3>
            <p className="stat-number">{stats.comingSoon}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon closed">❌</div>
          <div className="stat-content">
            <h3>Fermés</h3>
            <p className="stat-number">{stats.closed}</p>
          </div>
        </div>
      </div>

      {/* Excel Upload Section */}
      <div className="upload-section">
        <ExcelUploader />
      </div>

      {/* Programs List */}
      <div className="programs-section">
        <div className="section-header">
          <h2>Liste des Programmes</h2>
          <button 
            className="refresh-btn"
            onClick={loadPrograms}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Actualiser'}
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des programmes...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>Aucun programme trouvé</h3>
            <p>Importez votre premier fichier Excel pour commencer</p>
          </div>
        ) : (
          <div className="programs-table">
            <table>
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Université</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td>
                      <div className="program-info">
                        <div className="program-image">
                          <img 
                            src={program.programImage || '/default-program.jpg'} 
                            alt={program.majorName}
                            onError={(e) => {
                              e.target.src = '/default-program.jpg';
                            }}
                          />
                        </div>
                        <div className="program-details">
                          <h4>{program.majorName}</h4>
                          <p>{program.degreeType}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="university-info">
                        <h4>{program.universityName}</h4>
                        <p>{program.location}</p>
                      </div>
                    </td>
                    <td>
                      <select
                        value={program.status}
                        onChange={(e) => handleStatusChange(program.id, e.target.value)}
                        className={`status-select status-${program.status.toLowerCase()}`}
                      >
                        <option value="OPENED">Ouvert</option>
                        <option value="COMING_SOON">Bientôt Disponible</option>
                        <option value="CLOSED">Fermé</option>
                      </select>
                    </td>
                    <td>
                      <div className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => window.open(`/programs/${program.id}`, '_blank')}
                        >
                          👁️ Voir
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleProgramDelete(program.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 