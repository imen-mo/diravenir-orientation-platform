import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrientationQuestion15.css';

const OrientationQuestion15 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validation nom complet
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Le nom complet doit contenir au moins 2 caractères';
    }

    // Validation téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide';
    }

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Récupérer les réponses précédentes du localStorage
      const answers = JSON.parse(localStorage.getItem('orientationAnswers') || '{}');
      
      // Préparer les données pour l'API
      const requestData = {
        ...answers,
        studentInfo: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim()
        }
      };

      // Utiliser l'API backend pour le calcul réel
      console.log('📊 Traitement du test d\'orientation avec l\'API backend:', requestData);
      
      // Récupérer les réponses depuis localStorage
      const userAnswers = {};
      for (let i = 1; i <= 14; i++) {
        const answer = localStorage.getItem(`orientation_answer_${i}`);
        if (answer) {
          userAnswers[i] = answer;
        }
      }
      
      console.log('📝 Réponses récupérées:', userAnswers);
      
      // Préparer les données pour l'API backend
      const orientationRequest = {
        q1: userAnswers[1],
        q2: userAnswers[2],
        q3: userAnswers[3],
        q4: userAnswers[4],
        q5: userAnswers[5],
        q6: userAnswers[6],
        q7: userAnswers[7],
        q8: userAnswers[8],
        q9: userAnswers[9],
        q10: userAnswers[10],
        q11: userAnswers[11],
        q12: userAnswers[12],
        q13: userAnswers[13],
        q14: userAnswers[14],
        studentInfo: requestData.studentInfo
      };
      
      console.log('🔄 Envoi des données à l\'API backend:', orientationRequest);
      
      // Appeler l'API backend pour le calcul réel
      try {
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8084';
        const apiResponse = await fetch(`${baseURL}/api/orientation/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orientationRequest)
        });

        if (apiResponse.ok) {
          const apiResult = await apiResponse.json();
          console.log('✅ Résultats calculés par le backend:', apiResult);
          
          // Extraire les données de la réponse API (structure /complete)
          const userProfile = apiResult.results?.userProfile || apiResult.userProfile || {};
          const recommendations = apiResult.recommendations || [];
          const testUuid = apiResult.testUuid || apiResult.results?.testUuid;
          
          // Préparer les données pour le frontend avec les bonnes propriétés
          const frontendResults = {
            topRecommendations: recommendations.slice(0, 3).map(rec => ({
              majorCode: rec.majorId || rec.majorCode,
              majorName: rec.majorName,
              matchingScore: rec.matchingScore || rec.score || 0,
              matchingPercentage: `${Math.round(rec.matchingScore || rec.score || 0)}%`,
              description: rec.description || '',
              whyThisMajor: rec.whyThisMajor || rec.userDescription || '',
              pillarComparison: rec.pillarComparison || {}
            })),
            userProfile: userProfile,
            personalityProfile: generatePersonalityProfile(userProfile),
            testSummary: {
              totalQuestions: 15,
              completedAt: new Date().toISOString(),
              duration: '12 minutes'
            },
            calculationMethod: 'BACKEND',
            testUuid: testUuid
          };
          
          // Stocker en localStorage pour l'affichage immédiat
          localStorage.setItem('orientationResults', JSON.stringify(frontendResults));
          localStorage.setItem('testUuid', 'backend-' + Date.now());
          localStorage.setItem('studentInfo', JSON.stringify(requestData.studentInfo));
          
          console.log('✅ Résultats préparés pour le frontend:', frontendResults);
          navigate('/orientation/results');
        } else {
          const errorText = await apiResponse.text();
          throw new Error(`Erreur API: ${apiResponse.status} - ${errorText}`);
        }
      } catch (apiError) {
        console.error('❌ Erreur lors de l\'appel API backend:', apiError);
        
        // Fallback: utiliser le calcul frontend avec les données statiques
        console.log('🔄 Fallback vers le calcul frontend...');
        
        const { calculateUserProfile } = await import('../data/questionToPillarMapping');
        const { idealProfilesData } = await import('../data/idealProfilesData');
        
        const userProfile = calculateUserProfile(userAnswers);
        const recommendations = calculateRecommendations(userProfile, idealProfilesData);
        
        const fallbackResults = {
          topRecommendations: recommendations.slice(0, 3).map(rec => ({
            majorCode: rec.majorCode || rec.id,
            majorName: rec.name || rec.majorName,
            matchingScore: rec.score || rec.matchingScore || 0,
            matchingPercentage: `${Math.round(rec.score || rec.matchingScore || 0)}%`,
            description: rec.description || '',
            whyThisMajor: rec.description || '',
            pillarComparison: rec.pillarScores || {}
          })),
          userProfile: userProfile,
          personalityProfile: generatePersonalityProfile(userProfile),
          testSummary: {
            totalQuestions: 15,
            completedAt: new Date().toISOString(),
            duration: '12 minutes'
          },
          calculationMethod: 'FRONTEND_FALLBACK'
        };
        
        localStorage.setItem('orientationResults', JSON.stringify(fallbackResults));
        localStorage.setItem('testUuid', 'test-' + Date.now());
        localStorage.setItem('studentInfo', JSON.stringify(requestData));
        
        console.log('✅ Résultats calculés avec fallback frontend:', fallbackResults);
        navigate('/orientation/results');
      }

    } catch (error) {
      console.error('Erreur:', error);
      setErrors({
        submit: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orientation-question">
      <div className="question-container">
        <div className="question-content">
          <div className="question-number">15</div>
          
          <div className="question-header">
            <h1 className="question-title">
              INFORMATIONS PERSONNELLES
            </h1>
            <p className="question-instruction">
              (POUR RECEVOIR VOS RÉSULTATS D'ORIENTATION)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="fullName">Nom Complet *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Prénom et nom"
                  className={errors.fullName ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Numéro de Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 6 12 34 56 78"
                  className={errors.phone ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Adresse Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre.email@exemple.com"
                  className={errors.email ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {errors.submit && (
              <div className="error-alert">
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="navigation">
              <button
                type="button"
                onClick={() => navigate('/orientation/question/14')}
                className="btn-back"
                disabled={isSubmitting}
              >
                ← Retour
              </button>
              
              <button
                type="submit"
                className="btn-next"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement...' : 'Recevoir mes résultats →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Fonction pour calculer les recommandations avec l'algorithme de distance euclidienne pondérée
const calculateRecommendations = (userProfile, idealProfilesData) => {
  const recommendations = [];
  
  Object.keys(idealProfilesData).forEach(majorCode => {
    const major = idealProfilesData[majorCode];
    const idealProfile = major.pillarScores;
    
    // Calculer le score de correspondance avec distance euclidienne pondérée
    const matchingScore = calculateWeightedEuclideanDistance(userProfile, idealProfile);
    
    // Générer les raisons personnalisées
    const reasoning = generateWhyThisMajor(userProfile, idealProfile);
    
    recommendations.push({
      id: majorCode,
      majorCode: majorCode,
      name: major.majorName,
      score: Math.round(matchingScore),
      matchingPercentage: `${Math.round(matchingScore)}%`,
      description: reasoning,
      category: getCategoryFromMajorCode(majorCode),
      pillarScores: idealProfile,
      universities: getUniversitiesForMajor(majorCode),
      careerPaths: getCareerPathsForMajor(majorCode)
    });
  });
  
  // Trier par score de correspondance décroissant
  return recommendations.sort((a, b) => b.score - a.score);
};

// Fonction pour calculer le score de correspondance avec Distance Euclidienne Pondérée
// Formule: Score_matching = 100 - sqrt(sum((DiffP * PoidsP)^2))
// où DiffP = |Profil_Utilisateur[P] - Profil_Ideal_Majeure[P]|
// et PoidsP = score idéal du pilier pour la majeure
const calculateWeightedEuclideanDistance = (userProfile, idealProfile) => {
  let sumWeightedSquaredDifferences = 0;
  let validPillars = 0;

  Object.keys(userProfile).forEach(pillar => {
    const userScore = userProfile[pillar];
    const idealScore = idealProfile[pillar] || 0;

    if (idealScore > 0) {
      // DiffP = différence absolue entre profil utilisateur et profil idéal
      const diffP = Math.abs(userScore - idealScore);
      
      // PoidsP = score idéal du pilier pour la majeure
      const poidsP = idealScore;
      
      // Calculer (DiffP * PoidsP)^2 et l'ajouter à la somme
      sumWeightedSquaredDifferences += Math.pow(diffP * poidsP, 2);
      validPillars++;
    }
  });

  if (validPillars === 0) return 0;

  // Score_matching = 100 - sqrt(sum((DiffP * PoidsP)^2))
  const euclideanDistance = Math.sqrt(sumWeightedSquaredDifferences);
  const matchingScore = 100 - euclideanDistance;

  // Normaliser pour obtenir des scores réalistes (0-100%)
  return Math.max(0, Math.min(100, matchingScore));
};

// Générer le texte "Pourquoi cette majeure est faite pour vous"
const generateWhyThisMajor = (userProfile, idealProfile) => {
  const strongMatches = [];
  
  Object.keys(userProfile).forEach(pillar => {
    const userScore = userProfile[pillar];
    const idealScore = idealProfile[pillar] || 0;
    
    // Identifier les correspondances fortes (score élevé et différence faible)
    if (idealScore >= 70 && Math.abs(userScore - idealScore) <= 20) {
      const pillarName = getPillarDisplayName(pillar);
      strongMatches.push(pillarName);
    }
  });
  
  if (strongMatches.length > 0) {
    return `Votre profil correspond parfaitement aux compétences requises : ${strongMatches.slice(0, 3).join(', ')}.`;
  } else {
    return 'Cette majeure correspond bien à votre profil général.';
  }
};

// Générer le profil de personnalité
const generatePersonalityProfile = (userProfile) => {
  const dominantTraits = [];
  const learningStyle = [];
  const workEnvironment = [];
  
  // Analyser les traits dominants
  if (userProfile.Interet_Scientifique_Tech >= 70) dominantTraits.push('Scientifique');
  if (userProfile.Interet_Artistique_Creatif >= 70) dominantTraits.push('Créatif');
  if (userProfile.Interet_Social_Humain >= 70) dominantTraits.push('Social');
  if (userProfile.Interet_Business_Gestion >= 70) dominantTraits.push('Business');
  if (userProfile.Interet_Logique_Analytique >= 70) dominantTraits.push('Analytique');
  
  // Style d'apprentissage
  if (userProfile.Pref_Pratique_Terrain >= 70) learningStyle.push('Pratique');
  if (userProfile.Pref_Theorie_Recherche >= 70) learningStyle.push('Théorique');
  
  // Environnement de travail
  if (userProfile.Pref_Travail_Equipe_Collab >= 70) workEnvironment.push('Collaboratif');
  if (userProfile.Pref_Travail_Autonome >= 70) workEnvironment.push('Autonome');
  
  return {
    dominantTraits: dominantTraits.length > 0 ? dominantTraits : ['Polyvalent'],
    learningStyle: learningStyle.length > 0 ? learningStyle.join(' et ') : 'Équilibré',
    workEnvironment: workEnvironment.length > 0 ? workEnvironment.join(' et ') : 'Adaptable'
  };
};

// Fonctions utilitaires
const getPillarDisplayName = (pillar) => {
  const names = {
    'Interet_Scientifique_Tech': 'Intérêt Scientifique',
    'Interet_Artistique_Creatif': 'Créativité',
    'Interet_Social_Humain': 'Social',
    'Interet_Business_Gestion': 'Business',
    'Interet_Logique_Analytique': 'Logique',
    'Competence_Resolution_Problemes': 'Résolution de Problèmes',
    'Competence_Communication': 'Communication',
    'Competence_Organisation': 'Organisation',
    'Competence_Manuel_Technique': 'Technique',
    'Valeur_Impact_Societal': 'Impact Sociétal',
    'Valeur_Innovation_Challenge': 'Innovation',
    'Valeur_Stabilite_Securite': 'Stabilité',
    'Valeur_Autonomie': 'Autonomie',
    'Pref_Travail_Equipe_Collab': 'Travail d\'Équipe',
    'Pref_Travail_Autonome': 'Travail Autonome',
    'Pref_Pratique_Terrain': 'Pratique',
    'Pref_Theorie_Recherche': 'Théorie'
  };
  return names[pillar] || pillar;
};

const getCategoryFromMajorCode = (majorCode) => {
  const categories = {
    'CIVIL': 'Ingénierie',
    'MECH': 'Ingénierie',
    'ARCH': 'Architecture',
    'CS': 'Informatique',
    'IT': 'Technologie',
    'BUS': 'Business',
    'MED': 'Médecine',
    'LAW': 'Droit',
    'ART': 'Arts',
    'EDU': 'Éducation'
  };
  return categories[majorCode] || 'Général';
};

const getUniversitiesForMajor = (majorCode) => {
  const universities = {
    'CIVIL': ['École Polytechnique', 'Université Technique', 'École d\'Ingénieurs'],
    'MECH': ['École Polytechnique', 'Université Technique', 'École d\'Ingénieurs'],
    'ARCH': ['École d\'Architecture', 'Université des Arts', 'École de Design'],
    'CS': ['Université de Technologie', 'École d\'Informatique', 'Institut Technique'],
    'IT': ['Université de Technologie', 'École d\'Informatique', 'Institut Technique'],
    'BUS': ['École de Commerce', 'Université de Management', 'Institut de Business'],
    'MED': ['Faculté de Médecine', 'Université de Santé', 'École de Médecine'],
    'LAW': ['Faculté de Droit', 'Université de Jurisprudence', 'École de Droit'],
    'ART': ['École des Beaux-Arts', 'Université des Arts', 'Conservatoire'],
    'EDU': ['École Normale', 'Université Pédagogique', 'Institut d\'Éducation']
  };
  return universities[majorCode] || ['Université Générale'];
};

const getCareerPathsForMajor = (majorCode) => {
  const careers = {
    'CIVIL': ['Ingénieur Civil', 'Chef de Projet', 'Consultant'],
    'MECH': ['Ingénieur Mécanique', 'Designer', 'Chef de Projet'],
    'ARCH': ['Architecte', 'Urbaniste', 'Designer'],
    'CS': ['Développeur', 'Data Scientist', 'Chef de Projet IT'],
    'IT': ['Ingénieur IT', 'Administrateur Système', 'Consultant Tech'],
    'BUS': ['Manager', 'Entrepreneur', 'Consultant Business'],
    'MED': ['Médecin', 'Chirurgien', 'Spécialiste'],
    'LAW': ['Avocat', 'Juge', 'Conseiller Juridique'],
    'ART': ['Artiste', 'Designer', 'Créateur'],
    'EDU': ['Enseignant', 'Formateur', 'Conseiller Pédagogique']
  };
  return careers[majorCode] || ['Professionnel'];
};

export default OrientationQuestion15;
