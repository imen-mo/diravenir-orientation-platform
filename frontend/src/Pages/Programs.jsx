import React, { useState, useEffect } from 'react';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import { getDefaultProgramImage } from '../assets/default-program-images';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('OPENED');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    filterAndSortPrograms();
  }, [programs, searchTerm, activeFilter, sortBy]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await programService.getAll();
      setPrograms(data);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes:', error);
      toast.error('Erreur lors du chargement des programmes');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPrograms = () => {
    let filtered = programs;

    // Filtrage par statut
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter(program => program.status === activeFilter);
    }

    // Recherche par texte
    if (searchTerm) {
      filtered = filtered.filter(program =>
          program.majorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri
    switch (sortBy) {
      case 'popular':
        // Tri par popularité (ici on utilise l'ID comme exemple)
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.majorName?.localeCompare(b.majorName));
        break;
      case 'university':
        filtered.sort((a, b) => a.universityName?.localeCompare(b.universityName));
        break;
      default:
        break;
    }

    setFilteredPrograms(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPENED':
        return 'bg-green-500';
      case 'COMING_SOON':
        return 'bg-yellow-500';
      case 'CLOSED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'OPENED':
        return 'Ouvert';
      case 'COMING_SOON':
        return 'Bientôt disponible';
      case 'CLOSED':
        return 'Fermé';
      default:
        return 'Inconnu';
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
  }

  return (
      <div className="programs-page">
        {/* Header avec recherche et filtres */}
        <div className="programs-header">
          <div className="search-section">
            <div className="search-container">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                  type="text"
                  placeholder="Search Program here"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
              />
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-buttons">
              <button
                  className={filter-btn ${activeFilter === 'ALL' ? 'active' : ''}}
                  onClick={() => handleFilterChange('ALL')}
              >
                All
              </button>
              <button
                  className={filter-btn ${activeFilter === 'OPENED' ? 'active' : ''}}
                  onClick={() => handleFilterChange('OPENED')}
              >
                Opened
              </button>
              <button
                  className={filter-btn ${activeFilter === 'COMING_SOON' ? 'active' : ''}}
                  onClick={() => handleFilterChange('COMING_SOON')}
              >
                Coming Soon
              </button>
              <button
                  className={filter-btn ${activeFilter === 'CLOSED' ? 'active' : ''}}
                  onClick={() => handleFilterChange('CLOSED')}
              >
                Closed
              </button>
            </div>

            <div className="sort-section">
              <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
              >
                <option value="popular">Sort by Popular Programs</option>
                <option value="name">Sort by Name</option>
                <option value="university">Sort by University</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des programmes */}
        <div className="programs-grid">
          {filteredPrograms.map((program) => (
              <div key={program.id} className="program-card">
                {/* Image du programme (rond) */}
                <div className="program-image-container">
                  <img
                      src={program.programImage || getDefaultProgramImage(program.majorName)}
                      alt={program.majorName}
                      className="program-image"
                      onError={(e) => {
                        e.target.src = getDefaultProgramImage(program.majorName);
                      }}
                  />
                </div>

                {/* Nom du programme */}
                <h3 className="program-name">{program.majorName}</h3>

                {/* Description */}
                <p className="program-description">{program.description}</p>

                {/* Statut */}
                <div className="program-status">
              <span className={status-badge ${getStatusColor(program.status)}}>
                {getStatusText(program.status)}
              </span>
                </div>

                {/* Boutons d'action */}
                <div className="program-actions">
                  <button className="btn-apply">
                    Apply Now
                  </button>
                  <button className="btn-view-more">
                    View More
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Message si aucun programme trouvé */}
        {filteredPrograms.length === 0 && !loading && (
            <div className="no-programs">
              <p>Aucun programme trouvé avec les critères sélectionnés.</p>
            </div>
        )}
      </div>
  );
};

export default Programs;