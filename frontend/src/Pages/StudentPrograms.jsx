import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaGraduationCap, FaClock, FaEuroSign, FaHeart, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import apiService from '../services/api';
import './StudentPrograms.css';

const StudentPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [savedPrograms, setSavedPrograms] = useState(new Set());

  // Plus de données factices - tout provient de la base de données

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, selectedCountry, selectedField]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      
      try {
        // Récupérer les programmes sauvegardés depuis l'API - UNIQUEMENT depuis la base de données
        const response = await apiService.getPrograms();
        if (response && response.programs) {
          setPrograms(response.programs);
          console.log('✅ Programmes sauvegardés chargés depuis la base de données:', response.programs.length);
        } else {
          setPrograms([]);
          console.log('ℹ️ Aucun programme sauvegardé trouvé dans la base de données');
        }
      } catch (apiError) {
        console.error('❌ Erreur API programmes sauvegardés:', apiError);
        setPrograms([]);
        setError('Impossible de charger les programmes sauvegardés depuis la base de données');
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement programmes sauvegardés:', error);
      setError('Erreur lors du chargement des programmes sauvegardés depuis la base de données');
      setPrograms([]); // Ne pas utiliser de données factices
    } finally {
      setLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = programs;

    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(program => program.country === selectedCountry);
    }

    if (selectedField) {
      filtered = filtered.filter(program => program.field === selectedField);
    }

    setFilteredPrograms(filtered);
  };

  const handleSaveProgram = async (programId) => {
    try {
      const response = await apiService.saveProgram(programId);
      if (response && response.success) {
        setSavedPrograms(prev => new Set([...prev, programId]));
      }
    } catch (error) {
      console.error('Erreur sauvegarde programme:', error);
    }
  };

  const countries = [...new Set(programs.map(p => p.country))];
  const fields = [...new Set(programs.map(p => p.field))];

  if (loading) {
    return (
      <StudentLayoutFinal>
        <div className="programs-loading">
          <FaSpinner className="animate-spin" />
          <span>Chargement des programmes...</span>
        </div>
      </StudentLayoutFinal>
    );
  }

  return (
    <StudentLayoutFinal>
      <div className="student-programs-container">
        <div className="programs-header">
          <h1>Mes Programmes Sauvegardés</h1>
          <p>Vos programmes d'études favoris sauvegardés</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="programs-filters">
          <div className="search-section">
            <div className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="Rechercher un programme, université ou domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Pays</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value="">Tous les pays</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Domaine</label>
              <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                <option value="">Tous les domaines</option>
                {fields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="programs-stats">
          <div className="stat-item">
            <span className="stat-number">{filteredPrograms.length}</span>
            <span className="stat-label">Programmes sauvegardés</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{countries.length}</span>
            <span className="stat-label">Pays</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{fields.length}</span>
            <span className="stat-label">Domaines</span>
          </div>
        </div>

        <div className="programs-grid">
          {filteredPrograms.map(program => (
            <div key={program.id} className="program-card">
              <div className="program-header">
                <div className="program-title">
                  <h3>{program.name}</h3>
                  <p className="university">{program.university}</p>
                </div>
                <button
                  className={`save-btn ${savedPrograms.has(program.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveProgram(program.id)}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="program-info">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span>{program.country}</span>
                </div>
                <div className="info-item">
                  <FaGraduationCap />
                  <span>{program.field}</span>
                </div>
                <div className="info-item">
                  <FaClock />
                  <span>{program.duration}</span>
                </div>
                <div className="info-item">
                  <FaEuroSign />
                  <span>{program.tuition}€/an</span>
                </div>
              </div>

              <div className="program-description">
                <p>{program.description}</p>
              </div>

              <div className="program-details">
                <div className="detail-item">
                  <strong>Langue:</strong> {program.language}
                </div>
                <div className="detail-item">
                  <strong>Prérequis:</strong> {program.requirements}
                </div>
                <div className="detail-item">
                  <strong>Date limite:</strong> {new Date(program.applicationDeadline).toLocaleDateString('fr-FR')}
                </div>
                <div className="detail-item">
                  <strong>Début:</strong> {new Date(program.startDate).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="program-actions">
                <button className="btn btn-primary">
                  <FaExternalLinkAlt />
                  Voir les détails
                </button>
                <button className="btn btn-secondary">
                  Postuler
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="no-programs">
            <h3>Aucun programme sauvegardé</h3>
            <p>Commencez à sauvegarder vos programmes favoris depuis la page des programmes disponibles.</p>
            <button className="btn btn-primary">
              <FaHeart />
              Découvrir les programmes
            </button>
          </div>
        )}
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentPrograms;
