import React, { useState, useEffect } from 'react';
import { 
  FaFileExcel, 
  FaUpload, 
  FaDownload, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle,
  FaInfoCircle,
  FaSpinner,
  FaFileAlt,
  FaTable,
  FaChartBar
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import ExcelImporter from '../components/ExcelImporter';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';

const AdminExcelImport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [importHistory, setImportHistory] = useState([]);
  const [showImporter, setShowImporter] = useState(false);
  const [stats, setStats] = useState({
    totalImports: 0,
    successfulImports: 0,
    failedImports: 0,
    lastImportDate: null
  });

  useEffect(() => {
    loadImportHistory();
    loadStats();
  }, []);

  const loadImportHistory = async () => {
    try {
      // Simuler l'historique des imports (à remplacer par une vraie API)
      const mockHistory = [
        {
          id: 1,
          fileName: 'programmes_chine_2024.xlsx',
          date: '2024-01-15T10:30:00Z',
          status: 'success',
          recordsImported: 25,
          recordsTotal: 25,
          errors: 0,
          warnings: 2
        },
        {
          id: 2,
          fileName: 'programmes_chypre_2024.xlsx',
          date: '2024-01-14T14:20:00Z',
          status: 'success',
          recordsImported: 18,
          recordsTotal: 20,
          errors: 0,
          warnings: 2
        },
        {
          id: 3,
          fileName: 'programmes_test.xlsx',
          date: '2024-01-13T09:15:00Z',
          status: 'error',
          recordsImported: 0,
          recordsTotal: 15,
          errors: 5,
          warnings: 0
        }
      ];
      setImportHistory(mockHistory);
    } catch (err) {
      console.error('Erreur chargement historique:', err);
    }
  };

  const loadStats = async () => {
    try {
      // Simuler les statistiques (à remplacer par une vraie API)
      const mockStats = {
        totalImports: 12,
        successfulImports: 10,
        failedImports: 2,
        lastImportDate: '2024-01-15T10:30:00Z'
      };
      setStats(mockStats);
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  const handleImportComplete = (result) => {
    console.log('Import terminé:', result);
    setSuccess('Import terminé avec succès !');
    setShowImporter(false);
    loadImportHistory();
    loadStats();
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => setSuccess(null), 5000);
  };

  const downloadTemplate = async () => {
    try {
      setLoading(true);
      const blob = await adminApiService.downloadExcelTemplate();
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template_programmes.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setSuccess('Template téléchargé avec succès !');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur téléchargement template:', err);
      setError('Erreur lors du téléchargement du template');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaTimesCircle className="text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Succès';
      case 'error':
        return 'Erreur';
      case 'warning':
        return 'Avertissement';
      default:
        return 'Inconnu';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        {/* En-tête */}
        <div className="admin-header">
          <div className="admin-header-left">
            <div className="admin-header-icon">
              <FaFileExcel />
            </div>
            <div>
              <h1 className="admin-title">Import Excel</h1>
              <p className="admin-subtitle">Gérez l'import de programmes depuis des fichiers Excel</p>
            </div>
          </div>
          <div className="admin-header-actions">
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={downloadTemplate}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
              <span>Télécharger Template</span>
            </button>
            <button 
              className="admin-btn admin-btn-primary"
              onClick={() => setShowImporter(true)}
            >
              <FaUpload />
              <span>Nouvel Import</span>
            </button>
          </div>
        </div>

        {/* Messages de statut */}
        {success && (
          <div className="admin-alert admin-alert-success">
            <FaCheckCircle />
            <span>{success}</span>
          </div>
        )}
        
        {error && (
          <div className="admin-alert admin-alert-error">
            <FaTimesCircle />
            <span>{error}</span>
          </div>
        )}

        {/* Statistiques */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaFileExcel />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.totalImports}</div>
              <div className="admin-stat-label">Imports Totaux</div>
            </div>
          </div>
          
          <div className="admin-stat-card">
            <div className="admin-stat-icon success">
              <FaCheckCircle />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.successfulImports}</div>
              <div className="admin-stat-label">Imports Réussis</div>
            </div>
          </div>
          
          <div className="admin-stat-card">
            <div className="admin-stat-icon error">
              <FaTimesCircle />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.failedImports}</div>
              <div className="admin-stat-label">Imports Échoués</div>
            </div>
          </div>
          
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FaChartBar />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">
                {stats.lastImportDate ? formatDate(stats.lastImportDate) : 'Aucun'}
              </div>
              <div className="admin-stat-label">Dernier Import</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="admin-card admin-mb-xl">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaInfoCircle />
              Instructions d'Import
            </h3>
          </div>
          <div className="admin-card-content">
            <div className="admin-instructions">
              <div className="admin-instruction-item">
                <div className="admin-instruction-number">1</div>
                <div className="admin-instruction-content">
                  <h4>Téléchargez le template</h4>
                  <p>Utilisez le template Excel fourni pour garantir la compatibilité des données.</p>
                </div>
              </div>
              
              <div className="admin-instruction-item">
                <div className="admin-instruction-number">2</div>
                <div className="admin-instruction-content">
                  <h4>Remplissez vos données</h4>
                  <p>Ajoutez vos programmes en respectant le format des colonnes du template.</p>
                </div>
              </div>
              
              <div className="admin-instruction-item">
                <div className="admin-instruction-number">3</div>
                <div className="admin-instruction-content">
                  <h4>Importez le fichier</h4>
                  <p>Uploadez votre fichier Excel et vérifiez les données avant validation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historique des imports */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaTable />
              Historique des Imports
            </h3>
          </div>
          <div className="admin-card-content">
            {importHistory.length > 0 ? (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Fichier</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Enregistrements</th>
                      <th>Erreurs</th>
                      <th>Avertissements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importHistory.map(importItem => (
                      <tr key={importItem.id}>
                        <td>
                          <div className="admin-file-info">
                            <FaFileExcel className="admin-file-icon" />
                            <span>{importItem.fileName}</span>
                          </div>
                        </td>
                        <td>{formatDate(importItem.date)}</td>
                        <td>
                          <div className="admin-status-badge">
                            {getStatusIcon(importItem.status)}
                            <span>{getStatusText(importItem.status)}</span>
                          </div>
                        </td>
                        <td>
                          <span className="admin-record-count">
                            {importItem.recordsImported}/{importItem.recordsTotal}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-error-count ${importItem.errors > 0 ? 'has-errors' : ''}`}>
                            {importItem.errors}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-warning-count ${importItem.warnings > 0 ? 'has-warnings' : ''}`}>
                            {importItem.warnings}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty-state">
                <FaFileExcel className="admin-empty-icon" />
                <h3>Aucun import trouvé</h3>
                <p>Commencez par importer votre premier fichier Excel.</p>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setShowImporter(true)}
                >
                  <FaUpload />
                  <span>Importer un fichier</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal d'import */}
        {showImporter && (
          <div className="admin-modal-overlay" onClick={() => setShowImporter(false)}>
            <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Import de Programmes Excel</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowImporter(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-modal-body">
                <ExcelImporter onImportComplete={handleImportComplete} />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminExcelImport;
