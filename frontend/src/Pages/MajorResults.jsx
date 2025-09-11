import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import MajorDescription from '../components/MajorDescription';
import useDeviceType from '../hooks/useDeviceType';
import './MajorResults.css';

const MajorResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useDeviceType();
  
  const [results, setResults] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Récupérer les résultats depuis l'état de navigation
  useEffect(() => {
    if (location.state) {
      setResults(location.state.results);
      setUserInfo(location.state.userInfo);
    } else {
      // Fallback: essayer de récupérer depuis localStorage
      const savedResults = localStorage.getItem('orientationResults');
      const studentInfo = localStorage.getItem('studentInfo');
      
      if (savedResults) {
        setResults(JSON.parse(savedResults));
        if (studentInfo) {
          setUserInfo(JSON.parse(studentInfo));
        }
      } else {
        // Rediriger vers le début de l'orientation si pas de résultats
        navigate('/orientation/question/1');
      }
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate('/orientation/results');
  };

  const handleRetakeTest = () => {
    // Effacer les réponses et recommencer
    for (let i = 1; i <= 14; i++) {
      localStorage.removeItem(`orientation_answer_${i}`);
    }
    localStorage.removeItem('orientationResults');
    localStorage.removeItem('studentInfo');
    navigate('/orientation/question/1');
  };

  const handleApplyNow = (major) => {
    // Logique pour postuler à une majeure
    console.log('Applying to:', major.majorName);
    navigate('/application', { state: { major } });
  };

  const handleViewProgramDetails = (major) => {
    // Naviguer vers la page des programmes avec un filtre pour cette majeure
    navigate('/programs', { 
      state: { 
        searchTerm: major.majorName,
        filterByMajor: major.majorCode 
      } 
    });
  };

  const handleViewAllPrograms = () => {
    // Naviguer vers la page des programmes
    navigate('/programs');
  };

  if (!results) {
    return (
      <div className="major-results">
        <OrientationHeader />
        <div className="results-container">
          <div className="results-content">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Chargement des résultats...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prendre seulement les top 3 recommandations
  const top3Majors = results.topRecommendations ? results.topRecommendations.slice(0, 3) : [];

  return (
    <div className="major-results">
      <OrientationHeader />
      
      <div className="results-container">
        <div className="results-content">
          <div className="results-header">
            <h1 className="results-title">
              {isMobile ? 'Vos Résultats' : 'Vos Résultats d\'Orientation'}
            </h1>
            <p className="results-subtitle">
              Voici les 3 majeures qui correspondent le mieux à votre profil
            </p>
          </div>

          {userInfo && (
            <div className="user-info">
              <p>Bonjour <strong>{userInfo.name}</strong>, voici vos résultats personnalisés.</p>
            </div>
          )}

          <div className="test-summary">
            <div className="summary-item">
              <span className="summary-label">Test complété :</span>
              <span className="summary-value">{results.completedQuestions}/{results.totalQuestions}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Date :</span>
              <span className="summary-value">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Score moyen :</span>
              <span className="summary-value">
                {Math.round(top3Majors.reduce((sum, major) => sum + major.matchingScore, 0) / top3Majors.length)}%
              </span>
            </div>
          </div>

          <div className="majors-list">
            <h2 className="majors-title">Top 3 Majeures Recommandées</h2>
            
            {top3Majors.map((major, index) => (
              <div key={index} className="major-card">
                <div className="major-header">
                  <div className="major-rank">
                    <span className="rank-number">{index + 1}</span>
                  </div>
                  <div className="major-info">
                    <h3 className="major-name">{major.majorName}</h3>
                    <span className="major-code">{major.majorCode}</span>
                    {major.category && <span className="major-category">{major.category}</span>}
                  </div>
                  <div className="major-score">
                    <div className="score-circle">
                      <span className="score-value">{Math.round(major.matchingScore)}%</span>
                    </div>
                    <span className="score-label">Correspondance</span>
                  </div>
                </div>
                
                {major.description && (
                  <MajorDescription major={major} />
                )}
                
                {major.reasoning && (
                  <div className="major-reasoning">
                    <h4>Pourquoi cette majeure ?</h4>
                    <p>{major.reasoning}</p>
                  </div>
                )}
                
                <div className="major-actions">
                  <button 
                    className="btn-apply"
                    onClick={() => handleApplyNow(major)}
                  >
                    Postuler Maintenant
                  </button>
                  <button 
                    className="btn-details"
                    onClick={() => handleViewProgramDetails(major)}
                  >
                    Voir les Programmes
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="additional-actions">
            <button className="btn-view-all" onClick={handleViewAllPrograms}>
              Voir Tous les Programmes
            </button>
            <p className="disclaimer">
              Ces recommandations sont basées sur vos réponses aux 14 questions d'orientation. 
              Pour plus d'informations sur chaque programme, cliquez sur "Voir les Programmes".
            </p>
          </div>

          <div className="results-actions">
            <button className="btn-retake" onClick={handleRetakeTest}>
              Repasser le Test
            </button>
            <button className="btn-back" onClick={handleBack}>
              ← Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorResults;
