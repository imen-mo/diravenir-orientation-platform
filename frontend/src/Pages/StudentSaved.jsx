import React, { useState, useEffect } from 'react';
import { FaHeart, FaExternalLinkAlt, FaTrash, FaMapMarkerAlt, FaGraduationCap, FaClock, FaEuroSign, FaSpinner } from 'react-icons/fa';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import apiService from '../services/api';
import { useSimpleAuth } from '../contexts/SimpleAuthContext';
import './StudentSaved.css';

const StudentSaved = () => {
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useSimpleAuth();

  // Plus de données factices - tout provient de la base de données

  useEffect(() => {
    if (user && user.email) {
      loadSavedPrograms();
    }
  }, [user]);

  const loadSavedPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Vérifier que l'utilisateur est connecté
      if (!user || !user.email) {
        setError('Vous devez être connecté pour voir vos programmes sauvegardés');
        setLoading(false);
        return;
      }
      
      try {
        // Utiliser l'API avec l'email de l'utilisateur connecté
        const response = await apiService.getPrograms(user.email);
        if (response && response.programs) {
          setSavedPrograms(response.programs);
          console.log('✅ Programmes sauvegardés chargés depuis la base de données:', response.programs.length);
        } else {
          setSavedPrograms([]);
          console.log('ℹ️ Aucun programme sauvegardé trouvé dans la base de données');
        }
      } catch (apiError) {
        console.error('❌ Erreur API programmes sauvegardés:', apiError);
        setSavedPrograms([]);
        setError('Impossible de charger les programmes sauvegardés depuis la base de données');
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement programmes sauvegardés:', error);
      setError('Erreur lors du chargement des programmes sauvegardés depuis la base de données');
      setSavedPrograms([]); // Ne pas utiliser de données factices
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProgram = async (programId) => {
    try {
      const response = await apiService.removeSavedProgram(programId);
      if (response && response.success) {
        setSavedPrograms(prev => prev.filter(p => p.id !== programId));
      }
    } catch (error) {
      console.error('Erreur suppression programme:', error);
    }
  };

  if (loading) {
    return (
      <StudentLayoutFinal>
        <div className="saved-loading">
          <FaSpinner className="animate-spin" />
          <span>Chargement de vos programmes sauvegardés...</span>
        </div>
      </StudentLayoutFinal>
    );
  }

  return (
    <StudentLayoutFinal>
      <div className="student-saved-container">
        <div className="saved-header">
          <h1>Programmes Sauvegardés</h1>
          <p>Vos programmes d'études favoris</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="saved-stats">
          <div className="stat-item">
            <span className="stat-number">{savedPrograms.length}</span>
            <span className="stat-label">Programmes sauvegardés</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{[...new Set(savedPrograms.map(p => p.country))].length}</span>
            <span className="stat-label">Pays</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{[...new Set(savedPrograms.map(p => p.field))].length}</span>
            <span className="stat-label">Domaines</span>
          </div>
        </div>

        {savedPrograms.length === 0 ? (
          <div className="no-saved-programs">
            <div className="empty-state">
              <FaHeart className="empty-icon" />
              <h3>Aucun programme sauvegardé</h3>
              <p>Commencez à sauvegarder vos programmes favoris depuis la page des programmes disponibles.</p>
              <a href="/student/programs" className="btn btn-primary">
                Découvrir les programmes
              </a>
            </div>
          </div>
        ) : (
          <div className="saved-programs-grid">
            {savedPrograms.map(program => (
              <div key={program.id} className="saved-program-card">
                <div className="program-header">
                  <div className="program-title">
                    <h3>{program.name}</h3>
                    <p className="university">{program.university}</p>
                  </div>
                  <div className="program-actions">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveProgram(program.id)}
                      title="Retirer des favoris"
                    >
                      <FaTrash />
                    </button>
                  </div>
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

                <div className="program-meta">
                  <div className="meta-item">
                    <strong>Langue:</strong> {program.language}
                  </div>
                  <div className="meta-item">
                    <strong>Sauvegardé le:</strong> {new Date(program.savedAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="program-actions-bottom">
                  <button className="btn btn-primary">
                    <FaExternalLinkAlt />
                    Voir les détails
                  </button>
                  <button className="btn btn-secondary">
                    Postuler maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentSaved;
