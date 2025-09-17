import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEuroSign,
  FaCalendarAlt,
  FaTimes,
  FaSave,
  FaUniversity,
  FaLanguage,
  FaClock,
  FaInfoCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';
import ProgramCardFixed from '../components/ProgramCardFixed';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';
import '../components/ProgramCardFixed.css';
import '../pages/Programs.css';

const AdminPrograms = () => {
  // États identiques à Programs.jsx
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [currentPage, setCurrentPage] = useState(1);
  const [programsPerPage] = useState(40);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [savedPrograms, setSavedPrograms] = useState([]);
  
  // États spécifiques à l'admin
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Vérifier la santé du backend au chargement (comme Programs.jsx)
  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Charger les programmes
  useEffect(() => {
    if (backendStatus === 'up') {
    loadPrograms();
    }
  }, [backendStatus]);

  // Vérifier la santé du backend (comme Programs.jsx)
  const checkBackendHealth = async () => {
    try {
      setBackendStatus('checking');
      // Simuler une vérification de santé pour l'admin
      setBackendStatus('up');
      console.log('✅ Backend accessible pour admin');
    } catch (error) {
      setBackendStatus('down');
      setError('Erreur de connexion au backend');
      console.error('❌ Erreur de connexion au backend:', error);
    }
  };

  // Charger les programmes depuis l'API admin (comme Programs.jsx)
  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Chargement des programmes admin...');
      const response = await adminApiService.getPrograms();
      
      if (response && Array.isArray(response)) {
        setPrograms(response);
        setFilteredPrograms(response);
        console.log(`✅ ${response.length} programmes chargés avec succès`);
      } else {
        throw new Error('Format de données invalide reçu du serveur');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des programmes:', error);
      setError(`Erreur lors du chargement: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la sauvegarde d'un programme (comme Programs.jsx)
  const handleSaveProgram = (programId) => {
    setSavedPrograms(prev => {
      if (prev.includes(programId)) {
        toast.success('Programme retiré des favoris');
        return prev.filter(id => id !== programId);
      } else {
        toast.success('Programme ajouté aux favoris');
        return [...prev, programId];
      }
    });
  };

  // Fonctions CRUD admin
  const handleCreateProgram = async (data) => {
    try {
      await adminApiService.createProgram(data);
      setShowCreateModal(false);
      loadPrograms();
      toast.success('Programme créé avec succès');
    } catch (err) {
      console.error('❌ Erreur lors de la création:', err);
      toast.error('Erreur lors de la création du programme');
    }
  };

  const handleUpdateProgram = async (id, data) => {
    try {
      await adminApiService.updateProgram(id, data);
      setShowEditModal(false);
      setSelectedProgram(null);
      loadPrograms();
    } catch (err) {
      console.error('❌ Erreur lors de la mise à jour:', err);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      try {
        await adminApiService.deleteProgram(id);
        loadPrograms();
      } catch (err) {
        console.error('❌ Erreur lors de la suppression:', err);
      }
    }
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowDetailsModal(true);
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const handleTableEdit = (program) => {
    setSelectedProgram(program);
    setShowTableModal(true);
  };

  // Fonctions de filtrage et recherche (comme Programs.jsx)
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    applyFiltersAndSearch(filter, searchTerm);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    applyFiltersAndSearch(activeFilter, term);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    applyFiltersAndSearch(activeFilter, searchTerm);
  };

  const applyFiltersAndSearch = (filter, search) => {
    let filtered = [...programs];

    // Appliquer le filtre de statut
    if (filter === 'opened') {
      filtered = filtered.filter(p => p.status === 'OPENED');
    } else if (filter === 'coming-soon') {
      filtered = filtered.filter(p => p.status === 'COMING_SOON');
    } else if (filter === 'closed') {
      filtered = filtered.filter(p => p.status === 'CLOSED');
    }

    // Appliquer la recherche
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(program =>
        program.program?.toLowerCase().includes(searchLower) ||
        program.universities?.toLowerCase().includes(searchLower) ||
        program.category?.toLowerCase().includes(searchLower) ||
        program.description?.toLowerCase().includes(searchLower)
      );
    }

    // Appliquer le tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.program || '').localeCompare(b.program || '');
        case 'university':
          return (a.universities || '').localeCompare(b.universities || '');
        case 'popularity':
        default:
          return 0;
      }
    });

    setPrograms(filtered);
  };

  // Calculer les programmes de la page courante
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-loading-spinner"></div>
          <p>Chargement des programmes...</p>
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
          <button className="admin-btn admin-btn-primary" onClick={loadPrograms}>
            Réessayer
          </button>
        </div>
      </AdminLayout>
    );
  }

  // Afficher le statut du backend (comme Programs.jsx)
  if (backendStatus === 'checking') {
  return (
    <AdminLayout>
        <div className="programs-page">
          <div className="programs-loading">
            <div className="loading-spinner"></div>
            <p>Vérification de la connexion au serveur...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Afficher l'erreur de connexion (comme Programs.jsx)
  if (backendStatus === 'down') {
    return (
      <AdminLayout>
        <div className="programs-page">
          <div className="backend-error">
            <h2>🔌 Serveur Backend Non Accessible</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={checkBackendHealth} className="retry-btn">
                🔄 Réessayer la Connexion
              </button>
              <button onClick={() => window.location.reload()} className="reload-btn">
                🔄 Recharger la Page
          </button>
        </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="programs-page">
        {/* En-tête avec design exact de Programs.css */}
        <div className="programs-header">
          <h1 className="programs-title">
            <span className="title-liste">Gestion des</span>
            <span className="title-des-programmes"> Programmes</span>
          </h1>
          
          {/* Statistiques */}
          <div className="programs-stats">
            <div className="stat-item">
              <strong>Total:</strong> {programs.length}
            </div>
            <div className="stat-item">
              <strong>Ouverts:</strong> {programs.filter(p => p.status === 'OPENED').length}
            </div>
            <div className="stat-item">
              <strong>Bientôt:</strong> {programs.filter(p => p.status === 'COMING_SOON').length}
            </div>
            <div className="stat-item">
              <strong>Favoris:</strong> {savedPrograms.length}
            </div>
          </div>
        </div>

        {/* Contrôles avec design exact de Programs.css */}
        <div className="programs-controls">
          {/* Recherche */}
          <div className="search-section">
            <div className="search-container">
                  <input
                    type="text"
                className="search-input"
                placeholder={`Rechercher parmi ${programs.length} programmes...`}
                    value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Rechercher des programmes"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="search-icon" aria-hidden="true">🔍</span>
                </div>
          </div>
          
          {/* Filtres */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              Tous ({programs.length})
                </button>
            <button
              className={`filter-tab ${activeFilter === 'opened' ? 'active' : ''}`}
              onClick={() => handleFilterChange('opened')}
            >
              Ouverts ({programs.filter(p => p.status === 'OPENED').length})
            </button>
            <button
              className={`filter-tab ${activeFilter === 'coming-soon' ? 'active' : ''}`}
              onClick={() => handleFilterChange('coming-soon')}
            >
              Bientôt ({programs.filter(p => p.status === 'COMING_SOON').length})
            </button>
            <button
              className={`filter-tab ${activeFilter === 'closed' ? 'active' : ''}`}
              onClick={() => handleFilterChange('closed')}
            >
              Fermés ({programs.filter(p => p.status === 'CLOSED').length})
            </button>
          </div>
          
          {/* Tri */}
          <div className="sort-section">
              <select 
              className="sort-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="popularity">Popularité</option>
              <option value="name">Nom A-Z</option>
              <option value="university">Université</option>
              </select>
            </div>
          </div>

        {/* Bouton Créer Programme */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ 
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #541652 0%, #3D0F3A 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(84, 22, 82, 0.3)'
            }}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Nouveau Programme
          </button>
        </div>

        {/* Contenu principal */}
        {loading ? (
          <div className="programs-loading">
            <div className="loading-spinner"></div>
            <p>Chargement des programmes...</p>
                </div>
        ) : error ? (
          <div className="error-message">
            <h3>❌ Erreur</h3>
            <p>{error}</p>
            <button onClick={loadPrograms} className="retry-btn">
              🔄 Réessayer
                </button>
          </div>
        ) : programs.length === 0 ? (
          <div className="no-programs">
            <div className="no-programs-icon">📚</div>
            <h3>Aucun programme trouvé</h3>
            <p>
              {searchTerm || activeFilter !== 'all' 
                ? 'Aucun programme ne correspond à vos critères de recherche'
                : 'Aucun programme disponible'
              }
            </p>
            {(searchTerm || activeFilter !== 'all') && (
                <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setCurrentPage(1);
                  applyFiltersAndSearch('all', '');
                }} 
                className="reset-filters-btn"
              >
                Réinitialiser
                </button>
            )}
              </div>
            ) : (
          <>
            {/* Grille des programmes avec ProgramCardFixed + fonctionnalités admin */}
            <div className="programs-grid">
              {currentPrograms.map((program) => (
                <div key={program.id} style={{ position: 'relative' }}>
                  {/* Carte ProgramCardFixed identique à celle des étudiants */}
                  <ProgramCardFixed 
                    program={program}
                    onSaveProgram={handleSaveProgram}
                    isSaved={savedPrograms.includes(program.id)}
                    onViewDetails={() => handleViewDetails(program)}
                    imageFit="contain"
                  />
                  
                  {/* Overlay admin avec boutons d'action */}
              <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                  }}>
                          <button 
                            className="admin-btn admin-btn-sm admin-btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(program);
                      }}
                      title="Voir les détails"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <FaEye size={12} />
                    </button>
                    
                    <button 
                      className="admin-btn admin-btn-sm admin-btn-warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTableEdit(program);
                            }}
                            title="Modifier"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 193, 7, 0.9)',
                        border: '1px solid #ffc107',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <FaEdit size={12} />
                          </button>
                    
                          <button 
                            className="admin-btn admin-btn-sm admin-btn-error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProgram(program.id);
                      }}
                            title="Supprimer"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(220, 53, 69, 0.9)',
                        border: '1px solid #dc3545',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <FaTrash size={12} />
                          </button>
                      </div>

                  {/* Badges admin avec plus d'informations */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {/* Badge statut */}
                    <span style={{
                      background: program.status === 'OPENED' ? '#28a745' : 
                                 program.status === 'COMING_SOON' ? '#ffc107' : '#dc3545',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {program.status === 'OPENED' ? 'Ouvert' : 
                       program.status === 'COMING_SOON' ? 'Bientôt' : 'Fermé'}
                          </span>
                    
                    {/* Badge niveau */}
                    {program.level && (
                      <span style={{
                        background: '#6f42c1',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '9px',
                        fontWeight: '500',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}>
                        {program.level}
                      </span>
                    )}
                    
                    {/* Badge applications */}
                    {program.applicationCount > 0 && (
                      <span style={{
                        background: '#17a2b8',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '9px',
                        fontWeight: '500',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}>
                        {program.applicationCount} candidatures
                        </span>
                    )}
                    </div>
                  </div>
                ))}
              </div>

            {/* Pagination avec design exact */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Page {currentPage} sur {totalPages} - {filteredPrograms.length} programmes
        </div>

                <div className="pagination-controls">
            <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ←
            </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (page > totalPages) return null;
                  
                    return (
            <button 
                        key={page}
                        className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    →
            </button>
                </div>
          </div>
            )}
          </>
        )}

        {/* Modales */}
        {showCreateModal && (
          <ProgramFormModal
            mode="create"
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateProgram}
          />
        )}

        {showEditModal && selectedProgram && (
          <ProgramFormModal
            mode="edit"
            program={selectedProgram}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProgram(null);
            }}
            onSubmit={(data) => handleUpdateProgram(selectedProgram.id, data)}
          />
        )}

        {/* Modal de détails avec design des cartes */}
        {showDetailsModal && selectedProgram && (
          <ProgramDetailsModal
            program={selectedProgram}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedProgram(null);
            }}
            onEdit={() => {
              setShowDetailsModal(false);
              handleEditProgram(selectedProgram);
            }}
            onDelete={() => {
              setShowDetailsModal(false);
              handleDeleteProgram(selectedProgram.id);
            }}
          />
        )}

        {/* Modal de tableau de modification */}
        {showTableModal && selectedProgram && (
          <ProgramTableModal
            program={selectedProgram}
            onClose={() => {
              setShowTableModal(false);
              setSelectedProgram(null);
            }}
            onSave={(updatedProgram) => {
              handleUpdateProgram(selectedProgram.id, updatedProgram);
              setShowTableModal(false);
              setSelectedProgram(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Composant Modal pour le formulaire programme
const ProgramFormModal = ({ mode, program, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    program: program?.program || program?.nom || '',
    pays: program?.pays || program?.country || '',
    universite: program?.universite || program?.university || '',
    niveau: program?.niveau || program?.level || '',
    frais: program?.frais || program?.fees || '',
    duree: program?.duree || program?.duration || '',
    description: program?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {mode === 'create' ? 'Nouveau Programme' : 'Modifier Programme'}
          </h2>
          <button className="admin-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-content">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="program">Nom du Programme</label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="admin-form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="pays">Pays</label>
                <select
                  id="pays"
                  name="pays"
                  value={formData.pays}
                  onChange={handleChange}
                  required
                  className="admin-form-select"
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="Chine">Chine</option>
                  <option value="Chypre">Chypre</option>
                  <option value="Roumanie">Roumanie</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="niveau">Niveau</label>
                <select
                  id="niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  required
                  className="admin-form-select"
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                  <option value="Doctorat">Doctorat</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="universite">Université</label>
              <input
                type="text"
                id="universite"
                name="universite"
                value={formData.universite}
                onChange={handleChange}
                required
                className="admin-form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="frais">Frais (€)</label>
                <input
                  type="number"
                  id="frais"
                  name="frais"
                  value={formData.frais}
                  onChange={handleChange}
                  required
                  className="admin-form-input"
                  min="0"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="duree">Durée</label>
                <input
                  type="text"
                  id="duree"
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  required
                  className="admin-form-input"
                  placeholder="ex: 3 ans, 2 semestres"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="admin-form-textarea"
                rows="4"
                placeholder="Description du programme..."
              />
            </div>
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              {mode === 'create' ? 'Créer' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Composant Modal de détails avec design des cartes
const ProgramDetailsModal = ({ program, onClose, onEdit, onDelete }) => {
  const [imageFitClass, setImageFitClass] = useState('contain');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fonction pour obtenir l'image du programme
  const getProgramImage = (program) => {
    if (program.universiteLogoUrl && program.universiteLogoUrl !== 'N/A') {
      return program.universiteLogoUrl;
    }
    if (program.universityLogo && program.universityLogo !== 'N/A') {
      return program.universityLogo;
    }
    if (program.programImage && program.programImage !== 'N/A') {
      return program.programImage;
    }
    return '/images/course.png';
  };

  // Fonction pour obtenir le nom de l'université
  const getUniversityName = (program) => {
    if (program.universite) return program.universite;
    if (program.university) return program.university;
    return 'Université non spécifiée';
  };

  // Fonction pour obtenir le titre du programme
  const getProgramTitle = (program) => {
    if (program.program) return program.program;
    if (program.nom) return program.nom;
    return 'Programme non spécifié';
  };

  // Fonction pour obtenir la description
  const getProgramDescription = (program) => {
    if (program.description) return program.description;
    return 'Description du programme non disponible.';
  };

  const imageUrl = getProgramImage(program);

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
        {/* En-tête du modal */}
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            <FaInfoCircle style={{ marginRight: '8px', color: 'var(--primary-violet)' }} />
            Détails du Programme
          </h2>
          <button className="admin-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Contenu du modal avec design des cartes */}
        <div className="admin-modal-body">
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-xl)', 
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            {/* Carte de programme (design identique) */}
            <div className="program-card-fixed" style={{ 
              width: '360px', 
              height: '459px',
              margin: '0 auto',
              flexShrink: 0
            }}>
              {/* Partie supérieure - Section violette avec logo */}
              <div className="card-header-fixed">
                <div className="university-logo-fixed">
                  <img
                    src={imageUrl}
                    alt={`Logo ${getUniversityName(program)}`}
                    className={imageFitClass}
                    onError={(e) => {
                      e.target.src = '/images/course.png';
                    }}
                  />
                </div>
              </div>

              {/* Partie inférieure - Contenu blanc */}
              <div className="card-content-fixed">
                <h3 className="program-title-fixed">
                  {getProgramTitle(program)}
                </h3>

                <p className="program-description-fixed">
                  {getProgramDescription(program)}
                </p>

                {/* Boutons d'action */}
                <div className="secondary-buttons-fixed">
                  <button 
                    className="btn-secondary-fixed info-btn-fixed" 
                    onClick={onEdit}
                    title="Modifier le programme"
                  >
                    <FaEdit />
                    <span>Modifier</span>
                  </button>
                  <button 
                    className="btn-secondary-fixed save-btn-fixed" 
                    onClick={onDelete}
                    title="Supprimer le programme"
                    style={{ 
                      borderColor: '#EF4444',
                      color: '#EF4444'
                    }}
                  >
                    <FaTrash />
                    <span>Supprimer</span>
                  </button>
                </div>

                {/* Bouton principal */}
                <button 
                  className="btn-primary-fixed apply-btn-fixed" 
                  onClick={onEdit}
                >
                  Modifier Programme
                </button>
              </div>
            </div>

            {/* Informations détaillées */}
            <div style={{ 
              flex: 1, 
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)'
            }}>
              {/* Informations générales */}
              <div className="admin-detail-section">
                <h4 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600', 
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--spacing-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}>
                  <FaGraduationCap style={{ color: 'var(--primary-violet)' }} />
                  Informations Générales
                </h4>
                
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaUniversity style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Université:</strong> {program.universiteName || program.universities || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaMapMarkerAlt style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Ville:</strong> {program.campusCity || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaMapMarkerAlt style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Pays:</strong> {program.destinationName || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaEuroSign style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Frais:</strong> {program.tuitionFees || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaCalendarAlt style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Durée:</strong> {program.duration ? `${program.duration} ans` : 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaLanguage style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Langue:</strong> {program.language || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaGraduationCap style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Niveau:</strong> {program.level || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaCalendarAlt style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Date limite:</strong> {program.applyBefore || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaEuroSign style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Bourse:</strong> {program.scholarship || 'Non spécifié'}
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaInfoCircle style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Statut:</strong> 
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: program.status === 'OPENED' ? '#28a745' : 
                                   program.status === 'COMING_SOON' ? '#ffc107' : '#dc3545',
                        color: 'white'
                      }}>
                        {program.status === 'OPENED' ? 'Ouvert' : 
                         program.status === 'COMING_SOON' ? 'Bientôt' : 'Fermé'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaInfoCircle style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Actif:</strong> 
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: program.isActive ? '#28a745' : '#dc3545',
                        color: 'white'
                      }}>
                        {program.isActive ? 'Oui' : 'Non'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="admin-flex admin-items-center admin-gap-md">
                    <FaInfoCircle style={{ color: 'var(--gray-500)', width: '16px' }} />
                    <div>
                      <strong>Candidatures:</strong> {program.applicationCount || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description complète */}
              <div className="admin-detail-section">
                <h4 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600', 
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--spacing-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}>
                  <FaInfoCircle style={{ color: 'var(--primary-violet)' }} />
                  Description Complète
                </h4>
                
                <p style={{ 
                  color: 'var(--gray-700)', 
                  lineHeight: '1.6',
                  fontSize: 'var(--font-size-sm)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {program.description || 'Description du programme non disponible.'}
                </p>
                
                {program.aboutThisProgram && (
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 style={{ 
                      fontSize: 'var(--font-size-md)', 
                      fontWeight: '600', 
                      color: 'var(--gray-800)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      À propos de ce programme
                    </h5>
                    <p style={{ 
                      color: 'var(--gray-700)', 
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {program.aboutThisProgram}
                    </p>
                  </div>
                )}
                
                {program.whyThisProgram && (
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 style={{ 
                      fontSize: 'var(--font-size-md)', 
                      fontWeight: '600', 
                      color: 'var(--gray-800)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      Pourquoi ce programme
                    </h5>
                    <p style={{ 
                      color: 'var(--gray-700)', 
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {program.whyThisProgram}
                    </p>
                  </div>
                )}
                
                {program.aboutTheUniversity && (
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 style={{ 
                      fontSize: 'var(--font-size-md)', 
                      fontWeight: '600', 
                      color: 'var(--gray-800)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      À propos de l'université
                    </h5>
                    <p style={{ 
                      color: 'var(--gray-700)', 
                      lineHeight: '1.6',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {program.aboutTheUniversity}
                    </p>
                  </div>
                )}
              </div>

              {/* Informations techniques */}
              <div className="admin-detail-section">
                <h4 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600', 
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--spacing-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}>
                  <FaClock style={{ color: 'var(--primary-violet)' }} />
                  Informations Techniques
                </h4>
                
                <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                  <div><strong>ID:</strong> {program.id}</div>
                  <div><strong>Catégorie:</strong> {program.category || program.filiere || 'Non spécifiée'}</div>
                  <div><strong>Type de diplôme:</strong> {program.degreeType || 'Non spécifié'}</div>
                  <div><strong>Langue:</strong> {program.language || 'Non spécifiée'}</div>
                  <div><strong>Frais de scolarité:</strong> {program.tuitionFees || 'Non spécifiés'}</div>
                  <div><strong>Ville du campus:</strong> {program.campusCity || 'Non spécifiée'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions du modal */}
        <div className="admin-modal-footer">
          <button 
            type="button" 
            className="admin-btn admin-btn-secondary" 
            onClick={onClose}
          >
            Fermer
          </button>
          <button 
            type="button" 
            className="admin-btn admin-btn-warning" 
            onClick={onEdit}
          >
            <FaEdit />
            Modifier
          </button>
          <button 
            type="button" 
            className="admin-btn admin-btn-error" 
            onClick={onDelete}
          >
            <FaTrash />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Modal de tableau de modification
const ProgramTableModal = ({ program, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    // Informations générales
    program: program?.program || '',
    universities: program?.universities || '',
    category: program?.category || '',
    degreeType: program?.degreeType || '',
    level: program?.level || '',
    
    // Informations financières
    tuitionFees: program?.tuitionFees || '',
    duration: program?.duration || '',
    
    // Informations géographiques
    campusCity: program?.campusCity || '',
    language: program?.language || '',
    
    // Informations académiques
    description: program?.description || '',
    aboutThisProgram: program?.aboutThisProgram || '',
    whyThisProgram: program?.whyThisProgram || '',
    aboutTheUniversity: program?.aboutTheUniversity || '',
    
    // Statut et métadonnées
    status: program?.status || 'OPENED',
    isActive: program?.isActive !== undefined ? program.isActive : true,
    programImage: program?.programImage || '',
    
    // Relations
    destinationId: program?.destinationId || '',
    universiteId: program?.universiteId || '',
    
    // Informations supplémentaires
    universityRanking: program?.universityRanking || '',
    applyBefore: program?.applyBefore || '',
    scholarship: program?.scholarship || '',
    applicationCount: program?.applicationCount || 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
        {/* En-tête du modal */}
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            <FaEdit style={{ marginRight: '8px', color: 'var(--primary-violet)' }} />
            Modifier Programme - Tableau
          </h2>
          <button className="admin-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Contenu du modal avec tableau */}
        <div className="admin-modal-body">
          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 'var(--spacing-xl)',
              maxHeight: '60vh',
              overflowY: 'auto'
            }}>
              {/* Colonne gauche - Informations générales */}
              <div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600', 
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--spacing-md)',
                  paddingBottom: 'var(--spacing-sm)',
                  borderBottom: '2px solid var(--primary-violet)'
                }}>
                  📋 Informations Générales
                </h3>
                
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Nom du Programme *</label>
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="admin-form-input"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Université *</label>
                    <input
                      type="text"
                      name="universities"
                      value={formData.universities}
                      onChange={handleChange}
                      className="admin-form-input"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Catégorie *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="admin-form-input"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Type de Diplôme *</label>
                    <select
                      name="degreeType"
                      value={formData.degreeType}
                      onChange={handleChange}
                      className="admin-form-select"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="PhD">PhD</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Niveau</label>
                    <input
                      type="text"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Statut *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="admin-form-select"
                      required
                    >
                      <option value="OPENED">Ouvert</option>
                      <option value="COMING_SOON">Bientôt</option>
                      <option value="CLOSED">Fermé</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        style={{ marginRight: '8px' }}
                      />
                      Programme Actif
                    </label>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Informations détaillées */}
              <div>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600', 
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--spacing-md)',
                  paddingBottom: 'var(--spacing-sm)',
                  borderBottom: '2px solid var(--primary-violet)'
                }}>
                  💰 Informations Financières & Géographiques
                </h3>
                
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Frais de Scolarité</label>
                    <input
                      type="text"
                      name="tuitionFees"
                      value={formData.tuitionFees}
                      onChange={handleChange}
                      className="admin-form-input"
                      placeholder="ex: 18,000 RMB/year"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Durée (années)</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="admin-form-input"
                      min="1"
                      max="10"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Ville du Campus</label>
                    <input
                      type="text"
                      name="campusCity"
                      value={formData.campusCity}
                      onChange={handleChange}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Langue d'Enseignement</label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="admin-form-input"
                      placeholder="ex: English, Chinese"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Classement Université</label>
                    <input
                      type="text"
                      name="universityRanking"
                      value={formData.universityRanking}
                      onChange={handleChange}
                      className="admin-form-input"
                      placeholder="ex: 283"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Date Limite d'Inscription</label>
                    <input
                      type="text"
                      name="applyBefore"
                      value={formData.applyBefore}
                      onChange={handleChange}
                      className="admin-form-input"
                      placeholder="ex: 31st May"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Bourse Disponible</label>
                    <input
                      type="text"
                      name="scholarship"
                      value={formData.scholarship}
                      onChange={handleChange}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Image du Programme</label>
                    <input
                      type="text"
                      name="programImage"
                      value={formData.programImage}
                      onChange={handleChange}
                      className="admin-form-input"
                      placeholder="URL de l'image"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section des descriptions */}
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              <h3 style={{ 
                fontSize: 'var(--font-size-lg)', 
                fontWeight: '600', 
                color: 'var(--gray-900)',
                marginBottom: 'var(--spacing-md)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom: '2px solid var(--primary-violet)'
              }}>
                📝 Descriptions Détaillées
              </h3>
              
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Description Générale</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleTextareaChange}
                    className="admin-form-textarea"
                    rows="3"
                    placeholder="Description courte du programme..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">À Propos de ce Programme</label>
                  <textarea
                    name="aboutThisProgram"
                    value={formData.aboutThisProgram}
                    onChange={handleTextareaChange}
                    className="admin-form-textarea"
                    rows="4"
                    placeholder="Description détaillée du programme..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Pourquoi ce Programme</label>
                  <textarea
                    name="whyThisProgram"
                    value={formData.whyThisProgram}
                    onChange={handleTextareaChange}
                    className="admin-form-textarea"
                    rows="4"
                    placeholder="Avantages et particularités du programme..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">À Propos de l'Université</label>
                  <textarea
                    name="aboutTheUniversity"
                    value={formData.aboutTheUniversity}
                    onChange={handleTextareaChange}
                    className="admin-form-textarea"
                    rows="4"
                    placeholder="Informations sur l'université..."
                  />
                </div>
              </div>
            </div>

            {/* Actions du modal */}
            <div className="admin-modal-footer">
              <button 
                type="button" 
                className="admin-btn admin-btn-secondary" 
                onClick={onClose}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="admin-btn admin-btn-primary"
              >
                <FaSave />
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPrograms;
