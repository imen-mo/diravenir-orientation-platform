import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './OrientationResults.css';

const OrientationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profils idéaux des majeures (scores sur 100)
  const idealMajors = {
    'Civil Engineering': {
      Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 40, Interet_Social_Humain: 50,
      Interet_Business_Gestion: 60, Interet_Logique_Analytique: 90, Competence_Resolution_Problemes: 90,
      Competence_Communication: 75, Competence_Organisation: 90, Competence_Manuel_Technique: 85,
      Valeur_Impact_Societal: 80, Valeur_Innovation_Challenge: 85, Valeur_Stabilite_Securite: 80,
      Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80, Pref_Travail_Autonome: 60,
      Pref_Pratique_Terrain: 90, Pref_Theorie_Recherche: 60
    },
    'Mechanical Engineering': {
      Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 30, Interet_Social_Humain: 20,
      Interet_Business_Gestion: 50, Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
      Competence_Communication: 65, Competence_Organisation: 80, Competence_Manuel_Technique: 90,
      Valeur_Impact_Societal: 70, Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 70,
      Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 75, Pref_Travail_Autonome: 70,
      Pref_Pratique_Terrain: 85, Pref_Theorie_Recherche: 70
    },
    'Architecture': {
      Interet_Scientifique_Tech: 60, Interet_Artistique_Creatif: 90, Interet_Social_Humain: 70,
      Interet_Business_Gestion: 50, Interet_Logique_Analytique: 80, Competence_Resolution_Problemes: 80,
      Competence_Communication: 85, Competence_Organisation: 85, Competence_Manuel_Technique: 85,
      Valeur_Impact_Societal: 85, Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 60,
      Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80, Pref_Travail_Autonome: 70,
      Pref_Pratique_Terrain: 70, Pref_Theorie_Recherche: 60
    },
    'Computer Science': {
      Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 60, Interet_Social_Humain: 40,
      Interet_Business_Gestion: 50, Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
      Competence_Communication: 70, Competence_Organisation: 75, Competence_Manuel_Technique: 60,
      Valeur_Impact_Societal: 60, Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 70,
      Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 70, Pref_Travail_Autonome: 80,
      Pref_Pratique_Terrain: 60, Pref_Theorie_Recherche: 80
    },
    'Business Administration': {
      Interet_Scientifique_Tech: 40, Interet_Artistique_Creatif: 50, Interet_Social_Humain: 80,
      Interet_Business_Gestion: 95, Interet_Logique_Analytique: 70, Competence_Resolution_Problemes: 75,
      Competence_Communication: 90, Competence_Organisation: 95, Competence_Manuel_Technique: 30,
      Valeur_Impact_Societal: 60, Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 85,
      Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90, Pref_Travail_Autonome: 60,
      Pref_Pratique_Terrain: 50, Pref_Theorie_Recherche: 40
    },
    'Psychology': {
      Interet_Scientifique_Tech: 50, Interet_Artistique_Creatif: 60, Interet_Social_Humain: 95,
      Interet_Business_Gestion: 40, Interet_Logique_Analytique: 70, Competence_Resolution_Problemes: 75,
      Competence_Communication: 90, Competence_Organisation: 70, Competence_Manuel_Technique: 30,
      Valeur_Impact_Societal: 95, Valeur_Innovation_Challenge: 60, Valeur_Stabilite_Securite: 60,
      Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 85, Pref_Travail_Autonome: 70,
      Pref_Pratique_Terrain: 40, Pref_Theorie_Recherche: 80
    },
    'Medicine': {
      Interet_Scientifique_Tech: 80, Interet_Artistique_Creatif: 40, Interet_Social_Humain: 95,
      Interet_Business_Gestion: 50, Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 90,
      Competence_Communication: 90, Competence_Organisation: 80, Competence_Manuel_Technique: 85,
      Valeur_Impact_Societal: 95, Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 90,
      Valeur_Autonomie: 60, Pref_Travail_Equipe_Collab: 85, Pref_Travail_Autonome: 70,
      Pref_Pratique_Terrain: 90, Pref_Theorie_Recherche: 70
    },
    'Environmental Science': {
      Interet_Scientifique_Tech: 75, Interet_Artistique_Creatif: 50, Interet_Social_Humain: 80,
      Interet_Business_Gestion: 40, Interet_Logique_Analytique: 80, Competence_Resolution_Problemes: 80,
      Competence_Communication: 75, Competence_Organisation: 70, Competence_Manuel_Technique: 60,
      Valeur_Impact_Societal: 95, Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 60,
      Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80, Pref_Travail_Autonome: 60,
      Pref_Pratique_Terrain: 80, Pref_Theorie_Recherche: 70
    }
  };

  // Calcul du profil utilisateur basé sur les réponses
  const calculateUserProfile = (answers) => {
    const profile = {
      Interet_Scientifique_Tech: 0, Interet_Artistique_Creatif: 0, Interet_Social_Humain: 0,
      Interet_Business_Gestion: 0, Interet_Logique_Analytique: 0, Competence_Resolution_Problemes: 0,
      Competence_Communication: 0, Competence_Organisation: 0, Competence_Manuel_Technique: 0,
      Valeur_Impact_Societal: 0, Valeur_Innovation_Challenge: 0, Valeur_Stabilite_Securite: 0,
      Valeur_Autonomie: 0, Pref_Travail_Equipe_Collab: 0, Pref_Travail_Autonome: 0,
      Pref_Pratique_Terrain: 0, Pref_Theorie_Recherche: 0
    };

    // Question 1 - Activité idéale
    if (answers.question1 === 'A') {
      profile.Interet_Scientifique_Tech += 5; profile.Interet_Artistique_Creatif += 3;
      profile.Valeur_Innovation_Challenge += 4; profile.Competence_Manuel_Technique += 2;
    } else if (answers.question1 === 'B') {
      profile.Interet_Scientifique_Tech += 4; profile.Interet_Logique_Analytique += 5;
      profile.Competence_Resolution_Problemes += 4; profile.Pref_Theorie_Recherche += 3;
    } else if (answers.question1 === 'C') {
      profile.Interet_Social_Humain += 5; profile.Valeur_Impact_Societal += 5;
      profile.Competence_Communication += 4;
    } else if (answers.question1 === 'D') {
      profile.Interet_Business_Gestion += 5; profile.Competence_Organisation += 5;
      profile.Pref_Travail_Equipe_Collab += 3;
    } else if (answers.question1 === 'E') {
      profile.Interet_Artistique_Creatif += 5; profile.Valeur_Innovation_Challenge += 2;
      profile.Pref_Travail_Autonome += 3;
    }

    // Question 2 - Environnement de travail préféré
    if (answers.question2 === 'A') {
      profile.Pref_Travail_Equipe_Collab += 5; profile.Competence_Communication += 3;
      profile.Valeur_Impact_Societal += 2;
    } else if (answers.question2 === 'B') {
      profile.Pref_Travail_Autonome += 5; profile.Valeur_Autonomie += 4;
      profile.Competence_Organisation += 2;
    } else if (answers.question2 === 'C') {
      profile.Interet_Scientifique_Tech += 4; profile.Pref_Theorie_Recherche += 4;
      profile.Competence_Resolution_Problemes += 2;
    } else if (answers.question2 === 'D') {
      profile.Interet_Artistique_Creatif += 4; profile.Valeur_Innovation_Challenge += 3;
      profile.Pref_Travail_Autonome += 2;
    }

    // Question 3 - Type de problème préféré
    if (answers.question3 === 'A') {
      profile.Competence_Resolution_Problemes += 5; profile.Interet_Logique_Analytique += 4;
      profile.Interet_Scientifique_Tech += 3;
    } else if (answers.question3 === 'B') {
      profile.Competence_Communication += 5; profile.Interet_Social_Humain += 4;
      profile.Valeur_Impact_Societal += 3;
    } else if (answers.question3 === 'C') {
      profile.Competence_Organisation += 5; profile.Interet_Business_Gestion += 4;
      profile.Valeur_Stabilite_Securite += 3;
    } else if (answers.question3 === 'D') {
      profile.Interet_Artistique_Creatif += 5; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 3;
    }

    // Question 4 - Réaction au stress
    if (answers.question4 === 'A') {
      profile.Competence_Organisation += 4; profile.Valeur_Stabilite_Securite += 4;
      profile.Pref_Travail_Equipe_Collab += 2;
    } else if (answers.question4 === 'B') {
      profile.Competence_Resolution_Problemes += 4; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 2;
    } else if (answers.question4 === 'C') {
      profile.Competence_Communication += 4; profile.Interet_Social_Humain += 4;
      profile.Pref_Travail_Equipe_Collab += 2;
    } else if (answers.question4 === 'D') {
      profile.Interet_Logique_Analytique += 4; profile.Pref_Theorie_Recherche += 4;
      profile.Pref_Travail_Autonome += 2;
    }

    // Question 5 - Type de lecture préféré
    if (answers.question5 === 'A') {
      profile.Interet_Scientifique_Tech += 4; profile.Pref_Theorie_Recherche += 4;
      profile.Interet_Logique_Analytique += 3;
    } else if (answers.question5 === 'B') {
      profile.Interet_Artistique_Creatif += 4; profile.Valeur_Innovation_Challenge += 3;
      profile.Pref_Travail_Autonome += 3;
    } else if (answers.question5 === 'C') {
      profile.Interet_Social_Humain += 4; profile.Competence_Communication += 3;
      profile.Valeur_Impact_Societal += 3;
    } else if (answers.question5 === 'D') {
      profile.Interet_Business_Gestion += 4; profile.Competence_Organisation += 3;
      profile.Valeur_Stabilite_Securite += 3;
    }

    // Question 6 - Projet de groupe
    if (answers.question6 === 'A') {
      profile.Competence_Communication += 5; profile.Pref_Travail_Equipe_Collab += 4;
      profile.Interet_Social_Humain += 3;
    } else if (answers.question6 === 'B') {
      profile.Competence_Organisation += 5; profile.Interet_Business_Gestion += 4;
      profile.Valeur_Stabilite_Securite += 3;
    } else if (answers.question6 === 'C') {
      profile.Competence_Resolution_Problemes += 5; profile.Interet_Logique_Analytique += 4;
      profile.Interet_Scientifique_Tech += 3;
    } else if (answers.question6 === 'D') {
      profile.Interet_Artistique_Creatif += 5; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 3;
    }

    // Question 7 - Apprentissage préféré
    if (answers.question7 === 'A') {
      profile.Pref_Pratique_Terrain += 5; profile.Competence_Manuel_Technique += 4;
      profile.Valeur_Innovation_Challenge += 3;
    } else if (answers.question7 === 'B') {
      profile.Pref_Theorie_Recherche += 5; profile.Interet_Logique_Analytique += 4;
      profile.Interet_Scientifique_Tech += 3;
    } else if (answers.question7 === 'C') {
      profile.Pref_Travail_Equipe_Collab += 5; profile.Competence_Communication += 4;
      profile.Interet_Social_Humain += 3;
    } else if (answers.question7 === 'D') {
      profile.Interet_Artistique_Creatif += 5; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 3;
    }

    // Question 8 - Défis préférés
    if (answers.question8 === 'A') {
      profile.Valeur_Innovation_Challenge += 5; profile.Interet_Scientifique_Tech += 4;
      profile.Competence_Resolution_Problemes += 3;
    } else if (answers.question8 === 'B') {
      profile.Valeur_Impact_Societal += 5; profile.Interet_Social_Humain += 4;
      profile.Competence_Communication += 3;
    } else if (answers.question8 === 'C') {
      profile.Valeur_Stabilite_Securite += 5; profile.Interet_Business_Gestion += 4;
      profile.Competence_Organisation += 3;
    } else if (answers.question8 === 'D') {
      profile.Valeur_Autonomie += 5; profile.Pref_Travail_Autonome += 4;
      profile.Interet_Artistique_Creatif += 3;
    }

    // Question 9 - Sliders (valeurs déjà traitées)
    if (answers.question9) {
      try {
        const values = JSON.parse(answers.question9);
        profile.Valeur_Stabilite_Securite += values.security * 0.05;
        profile.Valeur_Innovation_Challenge += values.innovation * 0.05;
        profile.Valeur_Autonomie += values.autonomy * 0.05;
        profile.Interet_Business_Gestion += values.salary * 0.05;
      } catch (e) {
        // Fallback si le parsing échoue
        profile.Valeur_Stabilite_Securite += 25;
        profile.Valeur_Innovation_Challenge += 25;
        profile.Valeur_Autonomie += 25;
        profile.Interet_Business_Gestion += 25;
      }
    }

    // Question 10 - Travail d'équipe vs individuel
    if (answers.question10 === 'A') {
      profile.Pref_Travail_Equipe_Collab += 5; profile.Competence_Communication += 4;
      profile.Interet_Social_Humain += 3;
    } else if (answers.question10 === 'B') {
      profile.Pref_Travail_Autonome += 5; profile.Valeur_Autonomie += 4;
      profile.Competence_Organisation += 3;
    } else if (answers.question10 === 'C') {
      profile.Pref_Travail_Equipe_Collab += 3; profile.Pref_Travail_Autonome += 3;
      profile.Valeur_Autonomie += 2; profile.Competence_Communication += 2;
    }

    // Question 11 - Type de mentor
    if (answers.question11 === 'A') {
      profile.Interet_Scientifique_Tech += 4; profile.Pref_Theorie_Recherche += 4;
      profile.Interet_Logique_Analytique += 3;
    } else if (answers.question11 === 'B') {
      profile.Interet_Artistique_Creatif += 4; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 3;
    } else if (answers.question11 === 'C') {
      profile.Interet_Social_Humain += 4; profile.Competence_Communication += 4;
      profile.Valeur_Impact_Societal += 3;
    } else if (answers.question11 === 'D') {
      profile.Interet_Business_Gestion += 4; profile.Competence_Organisation += 4;
      profile.Valeur_Stabilite_Securite += 3;
    }

    // Question 12 - Projet de fin d'études
    if (answers.question12 === 'A') {
      profile.Interet_Scientifique_Tech += 5; profile.Competence_Resolution_Problemes += 4;
      profile.Valeur_Innovation_Challenge += 3;
    } else if (answers.question12 === 'B') {
      profile.Interet_Artistique_Creatif += 5; profile.Valeur_Innovation_Challenge += 4;
      profile.Pref_Travail_Autonome += 3;
    } else if (answers.question12 === 'C') {
      profile.Interet_Social_Humain += 5; profile.Valeur_Impact_Societal += 4;
      profile.Competence_Communication += 3;
    } else if (answers.question12 === 'D') {
      profile.Interet_Business_Gestion += 5; profile.Competence_Organisation += 4;
      profile.Valeur_Stabilite_Securite += 3;
    }

    // Question 13 - Environnement de travail idéal
    if (answers.question13 === 'A') {
      profile.Pref_Theorie_Recherche += 4; profile.Interet_Scientifique_Tech += 3;
      profile.Valeur_Stabilite_Securite += 3;
    } else if (answers.question13 === 'B') {
      profile.Pref_Pratique_Terrain += 4; profile.Competence_Manuel_Technique += 3;
      profile.Valeur_Innovation_Challenge += 3;
    } else if (answers.question13 === 'C') {
      profile.Pref_Travail_Equipe_Collab += 4; profile.Competence_Communication += 3;
      profile.Interet_Social_Humain += 3;
    } else if (answers.question13 === 'D') {
      profile.Pref_Travail_Autonome += 4; profile.Valeur_Autonomie += 3;
      profile.Interet_Artistique_Creatif += 3;
    }

    // Question 14 - Impact souhaité
    if (answers.question14 === 'A') {
      profile.Valeur_Impact_Societal += 5; profile.Interet_Social_Humain += 4;
      profile.Competence_Communication += 3;
    } else if (answers.question14 === 'B') {
      profile.Valeur_Innovation_Challenge += 5; profile.Interet_Scientifique_Tech += 4;
      profile.Competence_Resolution_Problemes += 3;
    } else if (answers.question14 === 'C') {
      profile.Valeur_Stabilite_Securite += 5; profile.Interet_Business_Gestion += 4;
      profile.Competence_Organisation += 3;
    } else if (answers.question14 === 'D') {
      profile.Valeur_Autonomie += 5; profile.Pref_Travail_Autonome += 4;
      profile.Interet_Artistique_Creatif += 3;
    }

    // Normaliser tous les scores sur 100
    Object.keys(profile).forEach(key => {
      profile[key] = Math.min(100, Math.max(0, Math.round(profile[key])));
    });

    return profile;
  };

  // Calcul de la correspondance avec les majeures
  const calculateMatching = (userProfile, majorProfile) => {
    let totalDifference = 0;
    let totalWeight = 0;

    Object.keys(userProfile).forEach(pillar => {
      const diff = Math.abs(userProfile[pillar] - majorProfile[pillar]);
      const weight = majorProfile[pillar] / 100; // Poids basé sur l'importance du pilier
      totalDifference += diff * weight;
      totalWeight += weight;
    });

    const averageWeight = totalWeight / Object.keys(userProfile).length;
    const matchingScore = Math.max(0, 100 - (totalDifference / averageWeight));
    
    return Math.round(matchingScore);
  };

  // Génération des explications personnalisées
  const generateExplanation = (userProfile, majorProfile, majorName) => {
    const strengths = [];
    
    Object.keys(userProfile).forEach(pillar => {
      if (userProfile[pillar] >= 70 && majorProfile[pillar] >= 70) {
        strengths.push(pillar);
      }
    });

    const explanations = {
      'Interet_Scientifique_Tech': 'votre passion pour la technologie et les sciences',
      'Interet_Logique_Analytique': 'votre esprit logique et analytique',
      'Competence_Resolution_Problemes': 'votre capacité à résoudre des problèmes complexes',
      'Valeur_Innovation_Challenge': 'votre goût pour l\'innovation et les défis',
      'Interet_Artistique_Creatif': 'votre créativité et votre sens artistique',
      'Interet_Social_Humain': 'votre empathie et votre intérêt pour les autres',
      'Competence_Communication': 'vos excellentes compétences en communication',
      'Interet_Business_Gestion': 'votre esprit entrepreneurial et gestionnaire'
    };

    if (strengths.length > 0) {
      const mainStrength = strengths[0];
      return `Vos ${explanations[mainStrength] || 'compétences exceptionnelles'} font de vous un candidat idéal pour ${majorName}.`;
    }

    return `Votre profil équilibré correspond bien aux exigences de ${majorName}.`;
  };

  useEffect(() => {
    // Récupérer les réponses du localStorage
    const answers = {};
    for (let i = 1; i <= 14; i++) {
      const answer = localStorage.getItem(`question${i}`);
      if (answer) {
        answers[`question${i}`] = answer;
      }
    }

    if (Object.keys(answers).length === 0) {
      navigate('/test');
      return;
    }

    // Calculer le profil utilisateur
    const userProfile = calculateUserProfile(answers);

    // Calculer les correspondances avec toutes les majeures
    const majorMatches = Object.keys(idealMajors).map(majorName => {
      const matching = calculateMatching(userProfile, idealMajors[majorName]);
      return {
        name: majorName,
        matching,
        explanation: generateExplanation(userProfile, idealMajors[majorName], majorName)
      };
    });

    // Trier par score de correspondance décroissant
    majorMatches.sort((a, b) => b.matching - a.matching);

    // Prendre le top 3
    const top3 = majorMatches.slice(0, 3);

    setResults({
      userProfile,
      top3,
      allMatches: majorMatches
    });

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="results-loading">
        <div className="loading-spinner"></div>
        <h2>Calcul de vos résultats...</h2>
        <p>Analyse de votre profil en cours...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="no-results">
        <h2>Aucun résultat trouvé</h2>
        <p>Veuillez d'abord compléter le test d'orientation.</p>
        <Link to="/test" className="cta-button">Commencer le Test</Link>
      </div>
    );
  }

  return (
    <div className="orientation-results-page">
      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <div className="header-badge">🎯 Résultats Personnalisés</div>
          <h1>Découvrez les majeures qui vous correspondent le mieux !</h1>
          <p>Basé sur vos réponses, voici notre analyse approfondie de votre profil</p>
        </div>

        {/* Top 3 Recommendations */}
        <section className="top-recommendations">
          <h2>Top 3 de vos Majeures Recommandées</h2>
          <div className="recommendations-grid">
            {results.top3.map((major, index) => (
              <div key={major.name} className={`recommendation-card rank-${index + 1}`}>
                <div className="rank-badge">#{index + 1}</div>
                <div className="major-header">
                  <h3>{major.name}</h3>
                  <div className="matching-score">
                    <span className="score-number">{major.matching}%</span>
                    <span className="score-label">de correspondance</span>
                  </div>
                </div>
                <p className="major-explanation">{major.explanation}</p>
                <div className="major-details">
                  <div className="detail-item">
                    <span className="detail-label">Niveau de confiance:</span>
                    <span className={`confidence-level level-${index === 0 ? 'high' : index === 1 ? 'medium' : 'low'}`}>
                      {index === 0 ? 'Très élevé' : index === 1 ? 'Élevé' : 'Bon'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Profile Summary */}
        <section className="profile-summary">
          <h2>Résumé de votre Profil</h2>
          <div className="profile-grid">
            <div className="profile-category">
              <h3>🎯 Intérêts Principaux</h3>
              <div className="pillar-item">
                <span>Technologie & Sciences</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Interet_Scientifique_Tech}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Interet_Scientifique_Tech)}%</span>
              </div>
              <div className="pillar-item">
                <span>Créativité & Arts</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Interet_Artistique_Creatif}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Interet_Artistique_Creatif)}%</span>
              </div>
              <div className="pillar-item">
                <span>Social & Humain</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Interet_Social_Humain}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Interet_Social_Humain)}%</span>
              </div>
              <div className="pillar-item">
                <span>Business & Gestion</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Interet_Business_Gestion}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Interet_Business_Gestion)}%</span>
              </div>
            </div>
            
            <div className="profile-category">
              <h3>💪 Compétences Clés</h3>
              <div className="pillar-item">
                <span>Résolution de Problèmes</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Competence_Resolution_Problemes}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Competence_Resolution_Problemes)}%</span>
              </div>
              <div className="pillar-item">
                <span>Communication</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Competence_Communication}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Competence_Communication)}%</span>
              </div>
              <div className="pillar-item">
                <span>Organisation</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Competence_Organisation}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Competence_Organisation)}%</span>
              </div>
              <div className="pillar-item">
                <span>Manuel & Technique</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Competence_Manuel_Technique}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Competence_Manuel_Technique)}%</span>
              </div>
            </div>

            <div className="profile-category">
              <h3>🧠 Logique & Analytique</h3>
              <div className="pillar-item">
                <span>Pensée Logique</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Interet_Logique_Analytique}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Interet_Logique_Analytique)}%</span>
              </div>
              <div className="pillar-item">
                <span>Théorie & Recherche</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Pref_Theorie_Recherche}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Pref_Theorie_Recherche)}%</span>
              </div>
              <div className="pillar-item">
                <span>Pratique & Terrain</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Pref_Pratique_Terrain}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Pref_Pratique_Terrain)}%</span>
              </div>
            </div>

            <div className="profile-category">
              <h3>🌟 Valeurs & Préférences</h3>
              <div className="pillar-item">
                <span>Impact Sociétal</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Valeur_Impact_Societal}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Valeur_Impact_Societal)}%</span>
              </div>
              <div className="pillar-item">
                <span>Innovation & Défis</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Valeur_Innovation_Challenge}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Valeur_Innovation_Challenge)}%</span>
              </div>
              <div className="pillar-item">
                <span>Stabilité & Sécurité</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Valeur_Stabilite_Securite}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Valeur_Stabilite_Securite)}%</span>
              </div>
              <div className="pillar-item">
                <span>Autonomie</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Valeur_Autonomie}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Valeur_Autonomie)}%</span>
              </div>
            </div>

            <div className="profile-category">
              <h3>👥 Travail & Collaboration</h3>
              <div className="pillar-item">
                <span>Équipe & Collaboration</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Pref_Travail_Equipe_Collab}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Pref_Travail_Equipe_Collab)}%</span>
              </div>
              <div className="pillar-item">
                <span>Travail Autonome</span>
                <div className="pillar-bar">
                  <div className="pillar-fill" style={{ width: `${results.userProfile.Pref_Travail_Autonome}%` }}></div>
                </div>
                <span className="pillar-score">{Math.round(results.userProfile.Pref_Travail_Autonome)}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="next-steps">
          <h2>Prochaines Étapes</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📚</div>
              <h3>Explorer les Programmes</h3>
              <p>Découvrez les formations disponibles dans vos domaines d'intérêt</p>
              <Link to="/programs" className="step-button">Voir les Programmes</Link>
            </div>
            <div className="step-card">
              <div className="step-icon">🌍</div>
              <h3>Découvrir les Destinations</h3>
              <p>Explorez les pays et universités qui correspondent à votre profil</p>
              <Link to="/universites" className="step-button">Voir les Destinations</Link>
            </div>
            <div className="step-card">
              <div className="step-icon">💬</div>
              <h3>Consulter nos Experts</h3>
              <p>Discutez de vos résultats avec nos conseillers en orientation</p>
              <Link to="/contact" className="step-button">Nous Contacter</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="results-cta">
          <h2>Prêt à passer à l'action ?</h2>
          <p>Commencez votre parcours académique dès maintenant</p>
          <div className="cta-buttons">
            <Link to="/test" className="cta-button secondary">Refaire le Test</Link>
            <Link to="/programs" className="cta-button primary">Explorer les Programmes</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrientationResults;
