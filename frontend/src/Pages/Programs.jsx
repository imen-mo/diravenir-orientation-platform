import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import ProgramCardFixed from '../components/ProgramCardFixed';
import GlobalLayout from '../components/GlobalLayout';
import { programService, healthService } from '../services/api';
import './Programs.css';

const Programs = () => {
  const location = useLocation();
  const { getText: t } = useTheme();
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
  const [orientationFilter, setOrientationFilter] = useState(null);

  // Vérifier la santé du backend au chargement
  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Charger les programmes
  useEffect(() => {
    if (backendStatus === 'up') {
      loadPrograms();
    }
  }, [backendStatus]);

  // Vérifier les paramètres d'orientation au chargement
  useEffect(() => {
    if (location.state) {
      const { searchTerm: orientationSearch, filterByMajor } = location.state;
      if (orientationSearch || filterByMajor) {
        setOrientationFilter({
          searchTerm: orientationSearch,
          filterByMajor
        });
        setSearchTerm(orientationSearch || '');
      }
    }
  }, [location.state]);

  // Vérifier la santé du backend
  const checkBackendHealth = async () => {
    try {
      setBackendStatus('checking');
      const health = await healthService.checkHealth();
      
      if (health.status === 'UP') {
        setBackendStatus('up');
        console.log('✅ Backend accessible');
      } else {
        setBackendStatus('down');
        setError(t('loading'));
        console.log('⚠️ Backend en cours de démarrage');
      }
    } catch (error) {
      setBackendStatus('down');
      setError(t('connectionError'));
      console.error('❌ Erreur de connexion au backend:', error);
    }
  };

  // Charger les programmes depuis l'API
  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Chargement des programmes...');
      const data = await programService.getAll();
      
      if (data && Array.isArray(data)) {
      setPrograms(data);
        setFilteredPrograms(data);
        console.log(`✅ ${data.length} programmes chargés avec succès`);
      } else {
        throw new Error('Format de données invalide reçu du serveur');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des programmes:', error);
      
      if (error.message.includes('Impossible de se connecter')) {
        setError(t('connectionError'));
        setBackendStatus('down');
      } else {
        setError(`${t('errorLoadingPrograms')}: ${error.message}`);
      }
      
      // Réessayer de se connecter après 5 secondes
      setTimeout(() => {
        checkBackendHealth();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Gérer le changement de filtre
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    applyFiltersAndSearch(filter, searchTerm);
  };

  // Gérer la recherche
  const handleSearchChange = (e) => {
    const term = e.target.value;
    console.log('🔍 Recherche modifiée:', term);
    console.log('🎯 Input element:', e.target);
    console.log('🎯 Input value:', e.target.value);
    console.log('🎯 Input type:', e.target.type);
    console.log('🎯 Input disabled:', e.target.disabled);
    console.log('🎯 Input readOnly:', e.target.readOnly);
    setSearchTerm(term);
    setCurrentPage(1);
    applyFiltersAndSearch(activeFilter, term);
  };

  // Appliquer les filtres et la recherche
  const applyFiltersAndSearch = (filter, search) => {
    let filtered = [...programs];

    // Appliquer le filtre de statut
    if (filter === 'opened') {
      filtered = filtered.filter(p => p.status === 'OPENED');
    } else if (filter === 'coming-soon') {
      filtered = filtered.filter(p => p.status === 'COMING_SOON');
    } else if (filter === 'favorites') {
      filtered = filtered.filter(p => savedPrograms.includes(p.id));
    }

    // Appliquer le filtre d'orientation si présent
    if (orientationFilter?.filterByMajor) {
      filtered = filtered.filter(program =>
        program.majorCode === orientationFilter.filterByMajor ||
        program.program?.toLowerCase().includes(orientationFilter.filterByMajor.toLowerCase())
      );
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
          return 0; // Pas de tri par popularité pour l'instant
      }
    });

    setFilteredPrograms(filtered);
  };

  // Gérer le changement de tri
  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    applyFiltersAndSearch(activeFilter, searchTerm);
  };

  // Gérer la sauvegarde d'un programme
  const handleSaveProgram = (programId) => {
    setSavedPrograms(prev => {
      if (prev.includes(programId)) {
        toast.success(t('programRemoved'));
        return prev.filter(id => id !== programId);
      } else {
        toast.success(t('programAdded'));
        return [...prev, programId];
      }
    });
  };

  // Gérer la navigation des pages
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculer les programmes de la page courante
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  // Afficher le statut du backend
  if (backendStatus === 'checking') {
    return (
      <GlobalLayout activePage="programs">
        <div className="programs-page">
          <div className="programs-loading">
            <div className="loading-spinner"></div>
            <p>{t('checkingServerConnection')}</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Afficher l'erreur de connexion
  if (backendStatus === 'down') {
    return (
      <GlobalLayout activePage="programs">
        <div className="programs-page">
          <div className="backend-error">
            <h2>🔌 {t('backendServerNotAccessible')}</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={checkBackendHealth} className="retry-btn">
                🔄 {t('retryConnection')}
              </button>
              <button onClick={() => window.location.reload()} className="reload-btn">
                🔄 {t('reloadPage')}
              </button>
            </div>
            <div className="troubleshooting">
              <h3>🔧 {t('troubleshooting')}:</h3>
              <ol>
                <li>Vérifiez que le serveur Spring Boot est démarré</li>
                <li>Exécutez <code>mvn spring-boot:run</code> dans le dossier backend</li>
                <li>Vérifiez que le serveur écoute sur le port 8084</li>
                <li>Vérifiez les logs du serveur pour d'éventuelles erreurs</li>
              </ol>
            </div>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout activePage="programs">
      <div className="programs-page">
        {/* En-tête */}
          <div className="programs-header">
          <h1 className="programs-title">
            <span className="title-liste">{t('listOf')}</span>
            <span className="title-des-programmes"> {t('programs')}</span>
          </h1>
          
          {/* Statistiques */}
          <div className="programs-stats">
            <div className="stat-item">
              <strong>{t('totalPrograms')}:</strong> {programs.length}
            </div>
            <div className="stat-item">
              <strong>{t('filtered')}:</strong> {filteredPrograms.length}
            </div>
            <div className="stat-item">
              <strong>{t('favorites')}:</strong> {savedPrograms.length}
            </div>
          </div>
          </div>

      {/* Contrôles */}
      <div className="programs-controls">
        {/* Recherche */}
        <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`${t('searchPrograms')} ${programs.length} ${t('programsAvailable')}...`}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Rechercher des programmes"
                autoComplete="off"
                spellCheck="false"
                data-testid="program-search-input"
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
            {t('allPrograms')} ({programs.length})
            </button>
            <button
            className={`filter-tab ${activeFilter === 'opened' ? 'active' : ''}`}
            onClick={() => handleFilterChange('opened')}
            >
            {t('openPrograms')} ({programs.filter(p => p.status === 'OPENED').length})
            </button>
            <button
            className={`filter-tab ${activeFilter === 'coming-soon' ? 'active' : ''}`}
            onClick={() => handleFilterChange('coming-soon')}
            >
            {t('comingSoon')} ({programs.filter(p => p.status === 'COMING_SOON').length})
            </button>
            <button
            className={`filter-tab ${activeFilter === 'favorites' ? 'active' : ''}`}
            onClick={() => handleFilterChange('favorites')}
            >
            {t('favorites')} ({savedPrograms.length})
            </button>
          </div>
          
          {/* Tri */}
          <div className="sort-section">
          <select
            className="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="popularity">{t('popularity')}</option>
            <option value="name">{t('name')} A-Z</option>
            <option value="university">{t('university')}</option>
            </select>
          </div>
      </div>

      {/* Contenu principal */}
      {loading ? (
        <div className="programs-loading">
          <div className="loading-spinner"></div>
          <p>{t('loadingPrograms')}</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <h3>❌ {t('error')}</h3>
          <p>{error}</p>
          <button onClick={loadPrograms} className="retry-btn">
            🔄 {t('tryAgain')}
          </button>
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="no-programs">
          <div className="no-programs-icon">📚</div>
          <h3>{t('noProgramsFound')}</h3>
          <p>
            {searchTerm || activeFilter !== 'all' 
              ? t('noProgramsFound')
              : t('noProgramsFound')
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
              {t('reset')}
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grille des programmes */}
      <div className="programs-grid">
            {currentPrograms.map((program) => (
          <ProgramCardFixed 
            key={program.id} 
            program={program}
            onSaveProgram={handleSaveProgram}
            isSaved={savedPrograms.includes(program.id)}
            onViewDetails={(id) => console.log('Voir détails du programme:', id)}
            imageFit="contain" // Options: "contain", "stretch", "crop"
          />
        ))}
      </div>

          {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
                {t('page')} {currentPage} {t('of')} {totalPages} - {filteredPrograms.length} {t('programs')}
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
      </div>
    </GlobalLayout>
  );
};

export default Programs;
