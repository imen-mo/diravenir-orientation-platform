import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaGraduationCap, FaCalendar, FaClock, FaUsers, FaEuroSign, FaMapMarkerAlt } from 'react-icons/fa';

const ProgramsManagement = ({ programs = [], onUpdateProgram, onDeleteProgram, onCreateProgram }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'informatique',
    duration: '',
    price: '',
    location: '',
    requirements: '',
    status: 'active'
  });

  // Données de test si pas de données réelles
  const mockPrograms = programs.length > 0 ? programs : [
    {
      id: 1,
      name: 'Master en Informatique',
      description: 'Formation avancée en développement logiciel et technologies web',
      category: 'informatique',
      duration: '2 ans',
      price: '8000€',
      location: 'Paris',
      requirements: 'Bac+3 en informatique ou équivalent',
      status: 'active',
      studentsCount: 45,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'MBA Business',
      description: 'Master en administration des affaires avec spécialisation management',
      category: 'business',
      duration: '18 mois',
      price: '12000€',
      location: 'Lyon',
      requirements: 'Bac+3 + 3 ans d\'expérience professionnelle',
      status: 'active',
      studentsCount: 32,
      createdAt: '2024-01-05'
    },
    {
      id: 3,
      name: 'Design Graphique',
      description: 'Formation complète en design graphique et communication visuelle',
      category: 'design',
      duration: '1 an',
      price: '6000€',
      location: 'Marseille',
      requirements: 'Bac+2 en arts ou design',
      status: 'active',
      studentsCount: 28,
      createdAt: '2024-01-10'
    }
  ];

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description,
      category: program.category,
      duration: program.duration,
      price: program.price,
      location: program.location,
      requirements: program.requirements,
      status: program.status
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProgram(null);
    setFormData({
      name: '',
      description: '',
      category: 'informatique',
      duration: '',
      price: '',
      location: '',
      requirements: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProgram) {
      onUpdateProgram(editingProgram.id, formData);
    } else {
      onCreateProgram(formData);
    }
    setShowModal(false);
  };

  const handleDelete = (programId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      onDeleteProgram(programId);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'informatique': return 'bg-blue-100 text-blue-800';
      case 'business': return 'bg-green-100 text-green-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'ingenierie': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'informatique': return 'Informatique';
      case 'business': return 'Business';
      case 'design': return 'Design';
      case 'ingenierie': return 'Ingénierie';
      default: return category;
    }
  };

  return (
    <div className="programs-management">
      {/* Header avec actions */}
      <div className="management-header">
        <div className="header-left">
          <h2>Gestion des Programmes</h2>
          <p>Gérez tous les programmes de formation</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleCreate}>
            <FaPlus /> Nouveau Programme
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="management-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un programme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes les catégories</option>
            <option value="informatique">Informatique</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
            <option value="ingenierie">Ingénierie</option>
          </select>
        </div>
      </div>

      {/* Grille des programmes */}
      <div className="programs-grid">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="program-card">
            <div className="program-header">
              <div className="program-icon">
                <FaGraduationCap />
              </div>
              <div className="program-info">
                <h3>{program.name}</h3>
                <span className={`category-badge ${getCategoryColor(program.category)}`}>
                  {getCategoryText(program.category)}
                </span>
              </div>
            </div>

            <div className="program-content">
              <p className="program-description">{program.description}</p>
              
              <div className="program-details">
                <div className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>{program.duration}</span>
                </div>
                <div className="detail-item">
                  <FaEuroSign className="detail-icon" />
                  <span>{program.price}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{program.location}</span>
                </div>
                <div className="detail-item">
                  <FaUsers className="detail-icon" />
                  <span>{program.studentsCount} étudiants</span>
                </div>
              </div>

              <div className="program-requirements">
                <h4>Prérequis:</h4>
                <p>{program.requirements}</p>
              </div>
            </div>

            <div className="program-actions">
              <button 
                className="btn-action edit"
                onClick={() => handleEdit(program)}
                title="Modifier"
              >
                <FaEdit />
                Modifier
              </button>
              <button 
                className="btn-action delete"
                onClick={() => handleDelete(program.id)}
                title="Supprimer"
              >
                <FaTrash />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de création/édition */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>{editingProgram ? 'Modifier le programme' : 'Nouveau programme'}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nom du programme</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="informatique">Informatique</option>
                    <option value="business">Business</option>
                    <option value="design">Design</option>
                    <option value="ingenierie">Ingénierie</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Durée</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="ex: 2 ans"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prix</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="ex: 8000€"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Lieu</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Prérequis</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  rows="2"
                  required
                />
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingProgram ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsManagement;
