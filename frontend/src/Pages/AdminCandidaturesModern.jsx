import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes, 
  FaClock,
  FaSync,
  FaFileAlt,
  FaUser,
  FaGraduationCap,
  FaDownload,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin-theme.css';

const AdminCandidaturesModern = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatut, setSelectedStatut] = useState('');
  const [selectedCandidatures, setSelectedCandidatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [stats, setStats] = useState({});
  const [sortBy, setSortBy] = useState('dateSoumission');
  const [sortDir, setSortDir] = useState('desc');
  
  // États pour les modales
  const [showStatutModal, setShowStatutModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [newStatut, setNewStatut] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const statuts = [
    { value: '', label: 'Tous les statuts', color: '#95a5a6', icon: '📋' },
    { value: 'EN_ATTENTE', label: 'En Attente', color: '#f39c12', icon: '⏳' },
    { value: 'EN_COURS', label: 'En Cours', color: '#3498db', icon: '🔄' },
    { value: 'APPROUVEE', label: 'Approuvée', color: '#27ae60', icon: '✅' },
    { value: 'REJETEE', label: 'Rejetée', color: '#e74c3c', icon: '❌' }
  ];

  useEffect(() => {
    loadCandidatures();
    loadStats();
  }, [currentPage, selectedStatut, searchTerm, sortBy, sortDir]);

  const loadCandidatures = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        size: 10,
        sortBy: sortBy,
        sortDir: sortDir
      });
      
      if (selectedStatut) params.append('statut', selectedStatut);
      if (searchTerm) params.append('searchTerm', searchTerm);

      const response = await fetch(`http://localhost:8084/api/admin/candidatures?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCandidatures(data.candidatures || []);
        setTotalPages(data.totalPages || 0);
        setTotalItems(data.totalItems || 0);
      } else {
        console.error('Erreur API:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8084/api/admin/candidatures/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const handleStatutChange = async (candidatureId, newStatut) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8084/api/admin/candidatures/${candidatureId}/statut`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          statut: newStatut,
          commentaire: commentaire
        })
      });

      if (response.ok) {
        loadCandidatures();
        loadStats();
        setShowStatutModal(false);
        setCommentaire('');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleBatchStatutChange = async () => {
    if (selectedCandidatures.length === 0) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8084/api/admin/candidatures/batch-statut', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ids: selectedCandidatures,
          statut: newStatut,
          commentaire: commentaire
        })
      });

      if (response.ok) {
        loadCandidatures();
        loadStats();
        setSelectedCandidatures([]);
        setShowStatutModal(false);
        setCommentaire('');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour en lot:', error);
    }
  };

  const handleSelectCandidature = (candidatureId) => {
    setSelectedCandidatures(prev => 
      prev.includes(candidatureId) 
        ? prev.filter(id => id !== candidatureId)
        : [...prev, candidatureId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidatures.length === candidatures.length) {
      setSelectedCandidatures([]);
    } else {
      setSelectedCandidatures(candidatures.map(c => c.id));
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <FaSort />;
    return sortDir === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const getStatutInfo = (statut) => {
    return statuts.find(s => s.value === statut) || statuts[0];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-title-section">
            <h1 className="admin-page-title">Gestion des Candidatures</h1>
            <p className="admin-page-subtitle">Gérez les candidatures des étudiants de manière dynamique</p>
          </div>
          <div className="admin-page-actions">
            <button className="admin-btn admin-btn-secondary" onClick={loadCandidatures}>
              <FaSync /> Actualiser
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon-primary">
              <FaFileAlt />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.total || 0}</div>
              <div className="admin-stat-label">Total Candidatures</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon-warning">
              <FaClock />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.en_attente || 0}</div>
              <div className="admin-stat-label">En Attente</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon-info">
              <FaSync />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.en_cours || 0}</div>
              <div className="admin-stat-label">En Cours</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon-success">
              <FaCheck />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.approuvees || 0}</div>
              <div className="admin-stat-label">Approuvées</div>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon admin-stat-icon-danger">
              <FaTimes />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{stats.rejetees || 0}</div>
              <div className="admin-stat-label">Rejetées</div>
            </div>
          </div>
        </div>

        {/* Filtres et Actions */}
        <div className="admin-filters-section">
          <div className="admin-filters-left">
            <div className="admin-search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="admin-select"
            >
              {statuts.map(statut => (
                <option key={statut.value} value={statut.value}>
                  {statut.icon} {statut.label}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-filters-right">
            {selectedCandidatures.length > 0 && (
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowStatutModal(true)}
              >
                <FaEdit /> Modifier ({selectedCandidatures.length})
              </button>
            )}
          </div>
        </div>

        {/* Tableau des candidatures */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-table-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCandidatures.length === candidatures.length && candidatures.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th 
                  className="admin-table-sortable"
                  onClick={() => handleSort('etudiant')}
                >
                  Étudiant {getSortIcon('etudiant')}
                </th>
                <th 
                  className="admin-table-sortable"
                  onClick={() => handleSort('programme')}
                >
                  Programme {getSortIcon('programme')}
                </th>
                <th 
                  className="admin-table-sortable"
                  onClick={() => handleSort('statut')}
                >
                  Statut {getSortIcon('statut')}
                </th>
                <th 
                  className="admin-table-sortable"
                  onClick={() => handleSort('dateSoumission')}
                >
                  Date {getSortIcon('dateSoumission')}
                </th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="admin-table-loading">
                    <div className="admin-loading-spinner">
                      <FaSync className="admin-spin" />
                      Chargement...
                    </div>
                  </td>
                </tr>
              ) : candidatures.length === 0 ? (
                <tr>
                  <td colSpan="7" className="admin-table-empty">
                    <div className="admin-empty-state">
                      <FaFileAlt />
                      <p>Aucune candidature trouvée</p>
                    </div>
                  </td>
                </tr>
              ) : (
                candidatures.map(candidature => (
                  <tr key={candidature.id} className="admin-table-row">
                    <td className="admin-table-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCandidatures.includes(candidature.id)}
                        onChange={() => handleSelectCandidature(candidature.id)}
                      />
                    </td>
                    <td>
                      <div className="admin-student-info">
                        <div className="admin-student-name">
                          {candidature.etudiant?.prenom} {candidature.etudiant?.nom}
                        </div>
                        <div className="admin-student-email">{candidature.etudiant?.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="admin-program-info">
                        <div className="admin-program-name">{candidature.programme?.nom}</div>
                        <div className="admin-program-category">{candidature.programme?.categorie}</div>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="admin-status-badge"
                        style={{ backgroundColor: getStatutInfo(candidature.statut).color }}
                      >
                        {getStatutInfo(candidature.statut).icon} {getStatutInfo(candidature.statut).label}
                      </span>
                    </td>
                    <td>{formatDate(candidature.dateSoumission)}</td>
                    <td>
                      <div className="admin-documents-info">
                        <FaFileAlt />
                        <span>{candidature.documents?.length || 0} document(s)</span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button 
                          className="admin-btn-icon admin-btn-icon-info"
                          onClick={() => {
                            setSelectedCandidature(candidature);
                            setShowDetailModal(true);
                          }}
                          title="Voir les détails"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="admin-btn-icon admin-btn-icon-warning"
                          onClick={() => {
                            setSelectedCandidature(candidature);
                            setNewStatut(candidature.statut);
                            setShowStatutModal(true);
                          }}
                          title="Modifier le statut"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button 
              className="admin-btn admin-btn-secondary"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Précédent
            </button>
            <span className="admin-pagination-info">
              Page {currentPage + 1} sur {totalPages} ({totalItems} candidatures)
            </span>
            <button 
              className="admin-btn admin-btn-secondary"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Modal de modification de statut */}
        {showStatutModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <div className="admin-modal-header">
                <h3>Modifier le statut</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowStatutModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Nouveau statut</label>
                  <select 
                    value={newStatut} 
                    onChange={(e) => setNewStatut(e.target.value)}
                    className="admin-select"
                  >
                    {statuts.filter(s => s.value).map(statut => (
                      <option key={statut.value} value={statut.value}>
                        {statut.icon} {statut.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Commentaire (optionnel)</label>
                  <textarea
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    rows="3"
                    className="admin-textarea"
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowStatutModal(false)}
                >
                  Annuler
                </button>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    if (selectedCandidatures.length > 0) {
                      handleBatchStatutChange();
                    } else if (selectedCandidature) {
                      handleStatutChange(selectedCandidature.id, newStatut);
                    }
                  }}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de détails */}
        {showDetailModal && selectedCandidature && (
          <div className="admin-modal-overlay">
            <div className="admin-modal admin-modal-large">
              <div className="admin-modal-header">
                <h3>Détails de la candidature</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowDetailModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-detail-grid">
                  <div className="admin-detail-section">
                    <h4>Informations de l'étudiant</h4>
                    <p><strong>Nom:</strong> {selectedCandidature.etudiant?.prenom} {selectedCandidature.etudiant?.nom}</p>
                    <p><strong>Email:</strong> {selectedCandidature.etudiant?.email}</p>
                    <p><strong>Téléphone:</strong> {selectedCandidature.etudiant?.telephone}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Programme demandé</h4>
                    <p><strong>Programme:</strong> {selectedCandidature.programme?.nom}</p>
                    <p><strong>Catégorie:</strong> {selectedCandidature.programme?.categorie}</p>
                    <p><strong>Université:</strong> {selectedCandidature.programme?.universite}</p>
                    <p><strong>Pays:</strong> {selectedCandidature.programme?.pays}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Statut et suivi</h4>
                    <p><strong>Statut:</strong> 
                      <span 
                        className="admin-status-badge"
                        style={{ backgroundColor: getStatutInfo(selectedCandidature.statut).color }}
                      >
                        {getStatutInfo(selectedCandidature.statut).icon} {getStatutInfo(selectedCandidature.statut).label}
                      </span>
                    </p>
                    <p><strong>Date de soumission:</strong> {formatDate(selectedCandidature.dateSoumission)}</p>
                    {selectedCandidature.suivi && (
                      <p><strong>Suivi:</strong> {selectedCandidature.suivi}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowDetailModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCandidaturesModern;
