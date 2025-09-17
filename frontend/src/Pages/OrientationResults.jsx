import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import orientationService from '../services/orientationService';
import { getMajorDescriptionUpdated } from '../data/majorDescriptionsUpdated';
import { useTheme } from '../contexts/ThemeContext.jsx';
import useTestNotification from '../hooks/useTestNotification';
import './OrientationResultsModern.css';

const OrientationResults = () => {
  const { getText } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { sendTestCompletionNotification, requestNotificationPermission } = useTestNotification();

  // Récupérer les réponses depuis localStorage
  const getAnswersFromStorage = () => {
    try {
      const answers = {};
      for (let i = 1; i <= 14; i++) {
        const answer = localStorage.getItem(`orientation_answer_${i}`);
        if (answer) {
          answers[i] = answer;
        }
      }
      return answers;
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses:', error);
      return {};
    }
  };

  // Générer un profil de personnalité basé sur le profil utilisateur
  const generatePersonalityProfile = (userProfile) => {
    const topPillars = Object.entries(userProfile)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([pillar, score]) => ({ pillar, score }));
    
    return {
      topStrengths: topPillars,
      personalityType: 'Dynamic', // Peut être calculé plus précisément
      summary: `Votre profil montre des forces particulières dans ${topPillars.map(p => p.pillar).join(', ')}`
    };
  };

  // Charger les résultats depuis localStorage et calculer dynamiquement
  const loadResults = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer les réponses depuis localStorage
      const answers = getAnswersFromStorage();
      console.log('📊 Réponses récupérées:', answers);
      
      // Vérifier si toutes les réponses sont présentes
      if (Object.keys(answers).length === 14) {
        console.log('🔄 Recalcul des résultats avec les nouvelles réponses...');
        
        // Recalculer dynamiquement avec les nouvelles réponses
        try {
          const { calculateUserProfile } = await import('../data/questionToPillarMapping');
          const { idealProfilesData } = await import('../data/idealProfilesData');
          const { calculateMatchingScore } = await import('../services/orientationService');
          
          // Calculer le profil utilisateur avec les nouvelles réponses
          const userProfile = calculateUserProfile(answers);
          console.log('📊 Nouveau profil utilisateur:', userProfile);
          
          // Calculer les recommandations avec les nouvelles réponses
          const recommendations = idealProfilesData.map(profile => {
            const score = calculateMatchingScore(userProfile, profile.profile);
            return {
              majorCode: profile.majorCode,
              majorName: profile.majorName,
              matchingScore: score,
              matchingPercentage: `${Math.round(score)}%`,
              description: profile.description,
              whyThisMajor: profile.whyThisMajor,
              pillarComparison: profile.pillarComparison || {}
            };
          }).sort((a, b) => b.matchingScore - a.matchingScore).slice(0, 3);
          
          // Créer les nouveaux résultats
          const newResults = {
            topRecommendations: recommendations,
            userProfile: userProfile,
            personalityProfile: generatePersonalityProfile(userProfile),
            testSummary: {
              totalQuestions: 15,
              completedAt: new Date().toISOString(),
              duration: '12 minutes'
            },
            calculationMethod: 'DYNAMIC_RECALCULATION'
          };
          
          console.log('✅ Nouveaux résultats calculés:', newResults);
          setResults(newResults);
          
          // Sauvegarder les nouveaux résultats
          localStorage.setItem('orientationResults', JSON.stringify(newResults));
          
          // Envoyer une notification avec les résultats
          try {
            await sendTestCompletionNotification({
              testId: 'orientation-test',
              testName: 'Test d\'Orientation',
              score: Math.round(recommendations[0]?.matchingScore || 0),
              recommendations: recommendations.map(r => ({
                major: r.major,
                score: r.matchingScore,
                description: r.description
              })),
              detailedResults: {
                userProfile,
                personalityProfile: generatePersonalityProfile(userProfile),
                topRecommendations: recommendations.slice(0, 3)
              }
            });
            console.log('✅ Notification envoyée avec succès');
          } catch (notificationError) {
            console.error('❌ Erreur envoi notification:', notificationError);
          }
          
        } catch (calculationError) {
          console.error('❌ Erreur lors du recalcul:', calculationError);
          // Fallback vers les anciens résultats
          const storedResults = localStorage.getItem('orientationResults');
          if (storedResults) {
            const results = JSON.parse(storedResults);
            setResults(results);
          } else {
            setError('Erreur lors du calcul des résultats. Veuillez réessayer.');
          }
        }
      } else {
        // Récupérer les résultats depuis localStorage (fallback)
      const storedResults = localStorage.getItem('orientationResults');
      const studentInfo = localStorage.getItem('studentInfo');
      
      if (storedResults) {
        const results = JSON.parse(storedResults);
          console.log('✅ Résultats chargés depuis localStorage (fallback):', results);
        setResults(results);
        
        // Pré-remplir le formulaire avec les informations de l'étudiant
        if (studentInfo) {
          const info = JSON.parse(studentInfo);
          setFormData({
            name: info.fullName || '',
            email: info.email || '',
            phone: info.phone || ''
          });
        }
      } else {
        setError('Aucun résultat trouvé. Veuillez refaire le test d\'orientation.');
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des résultats:', error);
      setError('Erreur lors du chargement des résultats. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les résultats au montage du composant
  useEffect(() => {
    loadResults();
  }, []);


  const handleBack = () => {
    navigate('/orientation/question/14');
  };

  const handleRetakeTest = () => {
    // Effacer les réponses et recommencer
    for (let i = 1; i <= 14; i++) {
      localStorage.removeItem(`orientation_answer_${i}`);
    }
    navigate('/orientation/question/1');
  };

  if (loading) {
    return (
      <div className="orientation-results">
        <OrientationHeader />
        <div className="results-container">
          <div className="results-content">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Calcul de vos résultats...</h2>
              <p>Veuillez patienter pendant que nous analysons vos réponses.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orientation-results">
        <OrientationHeader />
        <div className="results-container">
          <div className="results-content">
            <div className="error-container">
              <h2>Erreur</h2>
              <p>{error}</p>
              <div className="error-actions">
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
      </div>
    );
  }

  return (
    <>
      <div className="orientation-results-modern">
        {/* Header avec titre moderne */}
        <div className="modern-header">
          <h1 className="modern-title">
            Great, this is your <span className="highlight">major match</span>
            </h1>
          </div>

        {/* Cartes de recommandations modernes */}
          {results && (results.topRecommendations || results.top3Recommendations) && (
          <div className="modern-recommendations">
            {(results.topRecommendations || results.top3Recommendations).slice(0, 3).map((program, index) => {
              const majorInfo = getMajorDescriptionUpdated(program.majorCode || program.id);
              const dynamicScore = Math.round(program.matchingScore || program.score || 0);
              const dynamicDescription = program.description || majorInfo?.description || 'Description not available';
              const dynamicWhyThisMajor = program.whyThisMajor || program.reasoning || majorInfo?.whyForYou || [];
              
              // Debug pour voir les données
              console.log(`🔍 Programme ${index + 1}:`, {
                majorName: program.majorName || majorInfo.name,
                dynamicDescription: dynamicDescription,
                majorInfoDescription: majorInfo.description,
                programDescription: program.description,
                majorCode: program.majorCode || program.id
              });
              
              // Debug visuel dans la console
              if (!dynamicDescription && !majorInfo.description) {
                console.warn(`⚠️ Aucune description trouvée pour ${program.majorName || majorInfo.name}`);
              }
                  
              return (
                <div key={index} className="modern-card">
                  {/* Pourcentage en jaune en haut */}
                  <div className="card-percentage-top">
                    <div className="percentage-circle">
                      <span className="percentage-value">{dynamicScore}%</span>
                    </div>
                    <p className="match-text">match with {program.majorName || majorInfo.name}</p>
                  </div>

                  {/* Contenu principal de la carte */}
                  <div className="card-content">
                    <h3 className="major-title">{program.majorName || majorInfo.name}</h3>
                    <p className="compatibility">{getText('yourCompatibilityIs')}: {getText('high')}</p>
                    
                    {/* Description de la majeure */}
                    <div className="major-description">
                      <h4>{getText('aboutThisMajor')}:</h4>
                      <p>{dynamicDescription}</p>
                    </div>
                    
                    <div className="why-section">
                      <h4>{getText('whyThisMajorIsForYou')}:</h4>
                      <div className="reasons-list">
                          {typeof dynamicWhyThisMajor === 'string' ? (
                          <div className="reason-item">
                            <div className="reason-icon">✓</div>
                            <span>{dynamicWhyThisMajor}</span>
                          </div>
                        ) : (
                          (dynamicWhyThisMajor || []).slice(0, 3).map((reason, reasonIndex) => (
                            <div key={reasonIndex} className="reason-item">
                              <div className="reason-icon">✓</div>
                              <span>{reason}</span>
                            </div>
                          ))
                          )}
                        </div>
                    </div>
                  </div>

                    </div>
                  );
                })}
            </div>
          )}

        {/* Section Call-to-Action simplifiée */}
        <div className="modern-cta">
          <div className="cta-content">
            <h2>{getText('readyToExploreMorePrograms')}</h2>
            <button className="cta-button" onClick={() => navigate('/programs')}>
              {getText('applyNow')}
            </button>
          </div>
        </div>

        {/* Navigation simplifiée */}
        <div className="navigation-simple">
          <button className="btn-back" onClick={handleBack}>
            ← {getText('back')}
          </button>
          <button className="btn-retake" onClick={handleRetakeTest}>
            {getText('retakeTest')}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrientationResults;
