import React from 'react';
import { Link } from 'react-router-dom';
import { getDefaultProgramImage } from '../assets/default-program-images';
import './ProgramCard.css';

const ProgramCard = ({ program, onSaveProgram, isSaved, onViewDetails }) => {
  // Fonction pour obtenir l'image du programme ou du logo de l'université
  const getProgramImage = (program) => {
    // Priorité 1: Image du programme
    if (program.programImage && program.programImage !== 'N/A') {
      return program.programImage;
    }
    
    // Priorité 2: Logo de l'université
    if (program.universite && program.universite.logo_url) {
      return program.universite.logo_url;
    }
    
    // Priorité 3: Image par défaut
    return getDefaultProgramImage(program.category);
  };

  // Fonction pour obtenir le nom de l'université
  const getUniversityName = (program) => {
    if (program.universite && program.universite.nom) {
      return program.universite.nom;
    }
    if (program.universities) {
      return program.universities;
    }
    return 'Université non spécifiée';
  };

  // Fonction pour obtenir le nom en anglais de l'université
  const getUniversityNameEn = (program) => {
    if (program.universite && program.universite.nom_en) {
      return program.universite.nom_en;
    }
    return getUniversityName(program);
  };

  // Fonction pour gérer les erreurs d'image
  const handleImageError = (e) => {
    console.warn(`Erreur de chargement de l'image pour ${program.program}:`, e.target.src);
    e.target.src = getDefaultProgramImage(program.category);
  };

  return (
    <div className="program-card">
      {/* Section supérieure avec logo de l'université */}
      <div className="program-card-top">
        <div className="university-logo-container">
          <img 
            src={getProgramImage(program)} 
            alt={`Logo ${getUniversityName(program)}`}
            className="university-logo"
            onError={handleImageError}
          />
        </div>
        
        <div className="program-header">
          <h3 className="program-name">{program.program || 'Nom du Programme'}</h3>
          <p className="university-name">{getUniversityNameEn(program)}</p>
        </div>
      </div>
      
      {/* Section inférieure avec détails */}
      <div className="program-card-bottom">
        <div className="program-details">
          <div className="detail-row">
            <span className="detail-label">📍</span>
            <span className="detail-value">{program.campusCity || 'Ville non spécifiée'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">🎓</span>
            <span className="detail-value">{program.degreeType || 'Type non spécifié'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">⏱️</span>
            <span className="detail-value">{program.duration || '0'} ans</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">💰</span>
            <span className="detail-value">{program.tuitionFees || 'Frais non spécifiés'}</span>
          </div>
        </div>
        
        <div className="program-description">
          {program.description || 'Description du programme non disponible.'}
        </div>
        
        <div className="program-actions">
          <Link 
            to={`/programs/${program.id}`} 
            className="action-btn view-btn" 
            title="Voir les détails"
            onClick={() => onViewDetails && onViewDetails(program.id)}
          >
            <span className="action-icon">👁️</span>
            Détails
          </Link>
          
          <button 
            className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
            title={isSaved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={() => onSaveProgram && onSaveProgram(program.id)}
          >
            <span className="action-icon">{isSaved ? '❤️' : '🤍'}</span>
            {isSaved ? 'Favori' : 'Favori'}
          </button>
        </div>
        
        <button className="apply-now-btn">
          {program.status === 'OPENED' ? 'Postuler Maintenant' : 'Bientôt Disponible'}
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
