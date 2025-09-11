import React from 'react';
import { useSavedPrograms } from '../hooks/useSavedPrograms';
import { FaHeart, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import './SavedProgramsList.css';

const SavedProgramsList = ({ onProgramClick = null }) => {
    const { 
        savedPrograms, 
        loading, 
        error, 
        unsaveProgram, 
        isProgramSaved,
        clearError 
    } = useSavedPrograms();

    const handleRemoveProgram = async (programId, programName) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${programName}" de vos programmes sauvegardés ?`)) {
            await unsaveProgram(programId);
        }
    };

    const handleProgramClick = (program) => {
        if (onProgramClick) {
            onProgramClick(program);
        } else {
            // Navigation par défaut vers la page du programme
            window.open(`/program/${program.id}`, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="saved-programs-loading">
                <div className="loading-spinner"></div>
                <p>Chargement de vos programmes sauvegardés...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="saved-programs-error">
                <p>❌ {error}</p>
                <button onClick={clearError} className="retry-button">
                    Réessayer
                </button>
            </div>
        );
    }

    if (savedPrograms.length === 0) {
        return (
            <div className="saved-programs-empty">
                <div className="empty-icon">
                    <FaHeart />
                </div>
                <h3>Aucun programme sauvegardé</h3>
                <p>Explorez nos programmes et sauvegardez ceux qui vous intéressent en cliquant sur le cœur.</p>
            </div>
        );
    }

    return (
        <div className="saved-programs-list">
            <div className="saved-programs-header">
                <h2>
                    <FaHeart className="header-icon" />
                    Mes Programmes Sauvegardés ({savedPrograms.length})
                </h2>
            </div>
            
            <div className="saved-programs-grid">
                {savedPrograms.map((program) => (
                    <div key={program.id} className="saved-program-card">
                        <div className="program-image-container">
                            {program.imageUrl ? (
                                <img 
                                    src={program.imageUrl} 
                                    alt={program.nom}
                                    className="program-image"
                                />
                            ) : (
                                <div className="program-image-placeholder">
                                    <span>{program.nom?.charAt(0) || 'P'}</span>
                                </div>
                            )}
                            <div className="program-actions">
                                <button
                                    onClick={() => handleProgramClick(program)}
                                    className="action-button view-button"
                                    title="Voir le programme"
                                >
                                    <FaExternalLinkAlt />
                                </button>
                                <button
                                    onClick={() => handleRemoveProgram(program.id, program.nom)}
                                    className="action-button remove-button"
                                    title="Supprimer des sauvegardés"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        
                        <div className="program-info">
                            <h3 className="program-name">{program.nom}</h3>
                            <p className="program-university">{program.universite}</p>
                            <p className="program-country">{program.pays}</p>
                            {program.specialite && (
                                <p className="program-specialty">{program.specialite}</p>
                            )}
                            <div className="program-meta">
                                <span className="program-level">{program.niveau}</span>
                                {program.duree && (
                                    <span className="program-duration">{program.duree}</span>
                                )}
                            </div>
                            <div className="program-saved-date">
                                Sauvegardé le {new Date(program.savedAt).toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedProgramsList;
