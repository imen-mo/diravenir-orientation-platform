import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import { getDefaultProgramImage } from '../assets/default-program-images';
import ProgramCard from '../components/ProgramCard';
import DebugProgramData from '../components/DebugProgramData';
import GlobalLayout from '../components/GlobalLayout';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('OPENED');
  const [sortBy, setSortBy] = useState('popular');
  const [savedPrograms, setSavedPrograms] = useState(new Set()); // Programmes sauvegardés
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(40); // 40 programmes par page

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    filterAndSortPrograms();
  }, [programs, searchTerm, activeFilter, sortBy, currentPage, savedPrograms]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      
      // Charger tous les programmes
      const data = await programService.getAll();
      setPrograms(data);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes:', error);
      toast.error('Erreur lors du chargement des programmes');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPrograms = async () => {
    try {
      // Utiliser la nouvelle logique de filtrage
      let filtered = getFilteredPrograms();
      
      // Tri
      if (sortBy === 'popular') {
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => (a.program || '').localeCompare(b.program || ''));
      }
      
      // Pagination
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPrograms = filtered.slice(startIndex, endIndex);
      
      setFilteredPrograms(paginatedPrograms);
      setTotalPages(Math.ceil(filtered.length / pageSize));
    } catch (error) {
      console.error('Erreur lors du filtrage:', error);
      setFilteredPrograms(programs);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fonction pour sauvegarder/retirer un programme
  const handleSaveProgram = (programId) => {
    setSavedPrograms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(programId)) {
        newSet.delete(programId);
      } else {
        newSet.add(programId);
      }
      return newSet;
    });
  };

  // Fonction pour vérifier si un programme est sauvegardé
  const isProgramSaved = (programId) => {
    return savedPrograms.has(programId);
  };

  // Fonction pour voir les détails d'un programme
  const handleViewDetails = (programId) => {
    // Navigation vers la page de détails
    window.location.href = `/programs/${programId}`;
  };

  // Fonction pour obtenir les programmes selon le filtre
  const getFilteredPrograms = () => {
    let filtered = [...programs];
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(program => 
        program.program?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par statut
    if (activeFilter === 'SAVED') {
      filtered = filtered.filter(program => savedPrograms.has(program.id));
    } else if (activeFilter !== 'ALL') {
      filtered = filtered.filter(program => program.status === activeFilter);
    }
    
    return filtered;
  };

  const getDefaultImage = (program) => {
    if (program.programImage) {
      return program.programImage;
    }
    
    // Utiliser la catégorie pour déterminer l'image par défaut
    if (program.category) {
      const categoryLower = program.category.toLowerCase();
      if (categoryLower.includes('medical') || categoryLower.includes('health')) {
        return getDefaultProgramImage('medicine');
      } else if (categoryLower.includes('business') || categoryLower.includes('management')) {
        return getDefaultProgramImage('business');
      } else if (categoryLower.includes('engineering') || categoryLower.includes('technology')) {
        return getDefaultProgramImage('engineering');
      } else if (categoryLower.includes('arts') || categoryLower.includes('design')) {
        return getDefaultProgramImage('arts');
      } else if (categoryLower.includes('science')) {
        return getDefaultProgramImage('science');
      } else if (categoryLower.includes('law')) {
        return getDefaultProgramImage('law');
      } else if (categoryLower.includes('education')) {
        return getDefaultProgramImage('education');
      }
    }
    
    return getDefaultProgramImage('default');
  };

  if (loading) {
    return (
      <div className="programs-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des programmes...</p>
      </div>
    );
  }

  return (
    <GlobalLayout activePage="programs">
      <div className="programs-container">
        <div className="programs-header">
          <h1>Nos Programmes</h1>
          <p>Découvrez nos programmes d'études à l'étranger</p>
        </div>

      {/* Composant de debug temporaire */}
      <DebugProgramData />

      {/* Filtres et recherche */}
      <div className="programs-filters">
        <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search the Programs Here"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          {/* Filtres */}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilterChange('ALL')}
            >
              All
            </button>
            <button
              className={`filter-tab ${activeFilter === 'OPENED' ? 'active' : ''}`}
              onClick={() => handleFilterChange('OPENED')}
            >
              Opened
            </button>
            <button
              className={`filter-tab ${activeFilter === 'COMING_SOON' ? 'active' : ''}`}
              onClick={() => handleFilterChange('COMING_SOON')}
            >
              Coming soon
            </button>
            <button
              className={`filter-tab ${activeFilter === 'SAVED' ? 'active' : ''}`}
              onClick={() => handleFilterChange('SAVED')}
            >
              Saved
            </button>
          </div>
          
          {/* Tri */}
          <div className="sort-section">
            <select value={sortBy} onChange={handleSortChange} className="sort-select">
              <option value="popular">Sort by Popular Programs</option>
              <option value="name">Sort by Name</option>
              <option value="university">Sort by University</option>
            </select>
          </div>
      </div>

      <div className="programs-grid">
        {filteredPrograms.map((program) => (
          <ProgramCard 
            key={program.id} 
            program={program}
            isSaved={isProgramSaved(program.id)}
            onSaveProgram={() => handleSaveProgram(program.id)}
            onViewDetails={() => handleViewDetails(program.id)}
          />
        ))}
      </div>

      {filteredPrograms.length === 0 && !loading && (
        <div className="no-programs">
          <p>Aucun programme trouvé</p>
        </div>
      )}

      {/* Pagination - Style pro avec navigation */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {/* Indicateur de page */}
          <div className="pagination-info">
            Page {currentPage} sur {totalPages} • {filteredPrograms.length} programmes affichés
          </div>
          
          <div className="pagination">
            {/* Bouton Précédent */}
            {currentPage > 1 && (
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                title="Page précédente"
              >
                ←
              </button>
            )}
            
            {/* Pages numérotées */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Afficher seulement 4 pages maximum
                if (totalPages <= 4) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                return false;
              })
              .map((page, index, array) => {
                // Ajouter des ellipses si nécessaire
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                    <button
                      className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
            
            {/* Bouton Suivant */}
            {currentPage < totalPages && (
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                title="Page suivante"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </GlobalLayout>
  );
};

export default Programs;
