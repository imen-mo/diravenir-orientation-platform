import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEuroSign,
  FaCalendarAlt,
  FaUniversity,
  FaFilter
} from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import ExcelImporter from '../components/ExcelImporter';
import adminApiService from '../services/adminApiService';
import '../styles/admin-theme.css';

const AdminProgramsCards = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [page, setPage] = useState(1);
  const [showExcelImporter, setShowExcelImporter] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadPrograms();
  }, [page, searchTerm, filterCountry]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎓 Chargement des programmes...');
      
      const params = {
        page: page - 1,
        limit: 12,
        filter: searchTerm,
        country: filterCountry !== 'all' ? filterCountry : undefined
      };
      
      const response = await adminApiService.getPrograms(params);
      setPrograms(response.items || response || []);
      setTotalPages(Math.ceil((response.total || response.length || 0) / 12));
      
      console.log('✅ Programmes chargés:', response);
    } catch (err) {
      console.error('❌ Erreur chargement programmes:', err);
      setError('Erreur lors du chargement des programmes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadPrograms();
  };

  const handleFilterChange = (value) => {
    setFilterCountry(value);
    setPage(1);
  };

  const handleCreateProgram = async (data) => {
    try {
      await adminApiService.createProgram(data);
      setShowCreateModal(false);
      loadPrograms();
    } catch (err) {
      console.error('❌ Erreur création programme:', err);
    }
  };

  const handleUpdateProgram = async (id, data) => {
    try {
      await adminApiService.updateProgram(id, data);
      setShowEditModal(false);
      setSelectedProgram(null);
      loadPrograms();
    } catch (err) {
      console.error('❌ Erreur modification programme:', err);
    }
  };

  const handleDeleteProgram = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      try {
        await adminApiService.deleteProgram(id);
        loadPrograms();
      } catch (err) {
        console.error('❌ Erreur suppression programme:', err);
      }
    }
  };

  const handleImportComplete = (result) => {
    if (result.success) {
      loadPrograms(); // Recharger la liste des programmes
      setShowExcelImporter(false);
    }
  };

  const ProgramCard = ({ program }) => (
    <div className="admin-program-card">
      <div className="admin-program-card-header">
        <div className="admin-program-icon">
          <FaGraduationCap />
        </div>
        <div className="admin-program-actions">
          <button 
            className="admin-btn admin-btn-sm admin-btn-secondary"
            onClick={() => {
              setSelectedProgram(program);
              setShowEditModal(true);
            }}
            title="Modifier"
          >
            <FaEdit />
          </button>
          <button 
            className="admin-btn admin-btn-sm admin-btn-error"
            onClick={() => handleDeleteProgram(program.id)}
            title="Supprimer"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="admin-program-card-content">
        <h3 className="admin-program-title">
          {program.program || program.nom || 'Programme sans nom'}
        </h3>
        
        <div className="admin-program-details">
          <div className="admin-program-detail">
            <FaMapMarkerAlt />
            <span>{program.pays || program.country || 'Non spécifié'}</span>
          </div>
          
          <div className="admin-program-detail">
            <FaUniversity />
            <span>{program.universite || program.university || 'Non spécifié'}</span>
          </div>
          
          <div className="admin-program-detail">
            <FaEuroSign />
            <span>{program.frais || program.fees || 'Non spécifié'} €</span>
          </div>
          
          <div className="admin-program-detail">
            <FaCalendarAlt />
            <span>{program.duree || program.duration || 'Non spécifié'}</span>
          </div>
        </div>

        {program.description && (
          <p className="admin-program-description">
            {program.description.length > 120 
              ? `${program.description.substring(0, 120)}...` 
              : program.description
            }
          </p>
        )}

        <div className="admin-program-footer">
          <span className="admin-program-level">
            {program.niveau || program.level || 'Niveau non spécifié'}
          </span>
          <button className="admin-btn admin-btn-sm admin-btn-primary">
            <FaEye />
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );

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

  return (
    <AdminLayout>
      <div className="admin-container">
        {/* En-tête */}
        <div className="admin-header">
          <h1 className="admin-title">Gestion des Programmes</h1>
          <div className="admin-header-actions">
            <button 
              className="admin-btn admin-btn-secondary"
              onClick={() => setShowExcelImporter(true)}
            >
              <FaFileExcel />
              <span>Import Excel</span>
            </button>
            <button 
              className="admin-btn admin-btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlus />
              <span>Nouveau Programme</span>
            </button>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="admin-card admin-mb-xl">
          <div className="admin-card-content">
            <div className="admin-flex admin-gap-lg admin-items-center">
              <form onSubmit={handleSearch} className="admin-flex admin-gap-md admin-items-center" style={{ flex: 1 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <FaSearch style={{ 
                    position: 'absolute', 
                    left: 'var(--spacing-md)', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--gray-400)'
                  }} />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, université..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <button type="submit" className="admin-btn admin-btn-secondary">
                  Rechercher
                </button>
              </form>

              <select 
                value={filterCountry} 
                onChange={(e) => handleFilterChange(e.target.value)}
                className="admin-form-select"
                style={{ width: '200px' }}
              >
                <option value="all">Tous les pays</option>
                <option value="Chine">Chine</option>
                <option value="Chypre">Chypre</option>
                <option value="Roumanie">Roumanie</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des Programmes */}
        <div className="admin-card">
          <div className="admin-card-content">
            {programs.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">🎓</div>
                <h3 className="admin-empty-state-title">Aucun programme trouvé</h3>
                <p className="admin-empty-state-description">
                  Aucun programme ne correspond à vos critères de recherche
                </p>
                <button 
                  className="admin-btn admin-btn-primary admin-mt-lg"
                  onClick={() => setShowCreateModal(true)}
                >
                  Créer un programme
                </button>
              </div>
            ) : (
              <div className="admin-programs-grid">
                {programs.map(program => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {programs.length > 0 && (
          <div className="admin-pagination admin-mt-xl">
            <button 
              className="admin-pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </button>
            <span className="admin-pagination-info">
              Page {page} sur {totalPages}
            </span>
            <button 
              className="admin-pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Importateur Excel */}
        {showExcelImporter && (
          <div className="admin-modal-overlay" onClick={() => setShowExcelImporter(false)}>
            <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Import de Programmes Excel</h3>
                <button 
                  className="admin-modal-close"
                  onClick={() => setShowExcelImporter(false)}
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

export default AdminProgramsCards;
