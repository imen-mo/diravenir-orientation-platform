import React, { useState } from 'react';
import { FaBook, FaHeart, FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import './ProgramsPage.css';

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données simulées des programmes
  const savedPrograms = [
    {
      id: 1,
      title: "Master en Intelligence Artificielle",
      university: "Université de Paris",
      country: "France",
      duration: "2 ans",
      language: "Français/Anglais",
      tuition: "€8,000/an",
      status: "saved",
      savedDate: "2024-01-15",
      deadline: "2024-05-30",
      requirements: ["Licence en Informatique", "TOEFL 90+", "Lettre de motivation"],
      description: "Programme avancé en IA avec spécialisation en machine learning et deep learning."
    },
    {
      id: 2,
      title: "Master en Data Science",
      university: "Université de Lyon",
      country: "France",
      duration: "2 ans",
      language: "Français",
      tuition: "€6,500/an",
      status: "saved",
      savedDate: "2024-01-10",
      deadline: "2024-06-15",
      requirements: ["Licence en Mathématiques", "Niveau B2 français", "CV détaillé"],
      description: "Formation complète en science des données avec applications pratiques."
    },
    {
      id: 3,
      title: "Master en Business Administration",
      university: "HEC Paris",
      country: "France",
      duration: "2 ans",
      language: "Français/Anglais",
      tuition: "€45,000/an",
      status: "saved",
      savedDate: "2024-01-05",
      deadline: "2024-04-30",
      requirements: ["Licence en Commerce", "GMAT 650+", "Expérience professionnelle"],
      description: "Programme d'excellence en management et administration des affaires."
    }
  ];

  const appliedPrograms = [
    {
      id: 4,
      title: "Master en Informatique",
      university: "Université de Toulouse",
      country: "France",
      duration: "2 ans",
      language: "Français",
      tuition: "€5,000/an",
      status: "applied",
      appliedDate: "2024-01-20",
      deadline: "2024-03-15",
      requirements: ["Licence en Informatique", "Niveau B2 français"],
      description: "Formation en informatique avec spécialisations multiples."
    }
  ];

  const filteredPrograms = () => {
    let programs = [];
    
    if (activeTab === 'saved') {
      programs = savedPrograms;
    } else if (activeTab === 'applied') {
      programs = appliedPrograms;
    }

    if (searchTerm) {
      programs = programs.filter(program => 
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      programs = programs.filter(program => program.status === filterStatus);
    }

    return programs;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      saved: { label: 'Sauvegardé', class: 'status-saved' },
      applied: { label: 'Candidature envoyée', class: 'status-applied' },
      pending: { label: 'En attente', class: 'status-pending' },
      accepted: { label: 'Accepté', class: 'status-accepted' },
      rejected: { label: 'Refusé', class: 'status-rejected' }
    };

    const config = statusConfig[status] || statusConfig.saved;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="programs-page">
      <div className="programs-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Programmes d'Études</h1>
            <p>Gérez vos programmes sauvegardés et vos candidatures</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary">
              <FaPlus />
              Nouveau Programme
            </button>
          </div>
        </div>
      </div>

      <div className="programs-content">
        <div className="content-header">
          <div className="search-filters">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FaFilter className="filter-icon" />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Tous les statuts</option>
                <option value="saved">Sauvegardés</option>
                <option value="applied">Candidatures envoyées</option>
                <option value="pending">En attente</option>
                <option value="accepted">Acceptés</option>
                <option value="rejected">Refusés</option>
              </select>
            </div>
          </div>
        </div>

        <div className="programs-tabs">
          <button
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <FaHeart />
            Sauvegardés ({savedPrograms.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'applied' ? 'active' : ''}`}
            onClick={() => setActiveTab('applied')}
          >
            <FaEye />
            Candidatures ({appliedPrograms.length})
          </button>
        </div>

        <div className="programs-list">
          {filteredPrograms().length === 0 ? (
            <div className="empty-state">
              <FaBook className="empty-icon" />
              <h3>Aucun programme trouvé</h3>
              <p>Commencez par sauvegarder des programmes qui vous intéressent</p>
            </div>
          ) : (
            filteredPrograms().map(program => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <div className="program-title">
                    <h3>{program.title}</h3>
                    <div className="program-meta">
                      <span className="university">{program.university}</span>
                      <span className="country">{program.country}</span>
                    </div>
                  </div>
                  <div className="program-status">
                    {getStatusBadge(program.status)}
                    <div className="program-date">
                      {program.status === 'saved' ? 'Sauvegardé le' : 'Candidature envoyée le'}: {program.status === 'saved' ? program.savedDate : program.appliedDate}
                    </div>
                  </div>
                </div>

                <div className="program-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Durée</span>
                      <span className="detail-value">{program.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Langue</span>
                      <span className="detail-value">{program.language}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Frais de scolarité</span>
                      <span className="detail-value">{program.tuition}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Date limite</span>
                      <span className="detail-value">{program.deadline}</span>
                    </div>
                  </div>

                  <div className="program-description">
                    <p>{program.description}</p>
                  </div>

                  <div className="program-requirements">
                    <h4>Prérequis</h4>
                    <ul>
                      {program.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="program-actions">
                  <button className="btn-secondary">
                    <FaEye />
                    Voir détails
                  </button>
                  <button className="btn-secondary">
                    <FaEdit />
                    Modifier
                  </button>
                  {program.status === 'saved' && (
                    <button className="btn-primary">
                      <FaEye />
                      Postuler
                    </button>
                  )}
                  <button className="btn-danger">
                    <FaTrash />
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
