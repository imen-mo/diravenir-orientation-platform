// Service d'orientation complet - Intégration Frontend-Backend
// Gère le flux complet des questions aux recommandations

import { calculateUserProfile } from '../data/questionToPillarMapping';
import { idealProfilesData } from '../data/idealProfilesData';
import { getMajorRecommendations } from '../data/majorRecommendationsIndex';
import { getMajorDescriptionUpdated } from '../data/majorDescriptionsUpdated';

class OrientationService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8084';
    this.currentTestUuid = null;
  }

  // Calculer le profil utilisateur à partir des réponses frontend
  calculateUserProfileFromAnswers(answers) {
    try {
      console.log('🧮 Calcul du profil utilisateur à partir des réponses:', answers);
      const userProfile = calculateUserProfile(answers);
      console.log('📊 Profil utilisateur calculé:', userProfile);
      
      // Vérifier que le profil n'est pas vide
      const nonZeroScores = Object.entries(userProfile).filter(([key, value]) => value > 0);
      console.log('🎯 Piliers avec scores > 0:', nonZeroScores);
      
      return userProfile;
    } catch (error) {
      console.error('Erreur lors du calcul du profil utilisateur:', error);
      throw new Error('Impossible de calculer le profil utilisateur');
    }
  }

  // Démarrer un nouveau test d'orientation
  async startTest() {
    try {
      const response = await fetch(`${this.baseURL}/api/orientation/progress/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      this.currentTestUuid = data.testUuid;
      console.log('Test d\'orientation démarré:', data.testUuid);
      return data;
    } catch (error) {
      console.error('Erreur lors du démarrage du test:', error);
      throw new Error('Impossible de démarrer le test d\'orientation');
    }
  }

  // Sauvegarder une réponse dans la base de données
  async saveAnswer(questionNumber, questionText, selectedAnswer, answerData = null, timeSpentSeconds = null) {
    if (!this.currentTestUuid) {
      throw new Error('Aucun test en cours');
    }

    try {
      const params = new URLSearchParams({
        questionNumber: questionNumber.toString(),
        questionText: questionText,
        selectedAnswer: selectedAnswer
      });

      if (answerData) {
        params.append('answerData', JSON.stringify(answerData));
      }
      if (timeSpentSeconds) {
        params.append('timeSpentSeconds', timeSpentSeconds.toString());
      }

      const response = await fetch(`${this.baseURL}/api/orientation/progress/${this.currentTestUuid}/answer?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse sauvegardée pour la question', questionNumber);
      return data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la réponse:', error);
      throw new Error('Impossible de sauvegarder la réponse');
    }
  }

  // Obtenir le progrès actuel du test
  async getProgress() {
    if (!this.currentTestUuid) {
      throw new Error('Aucun test en cours');
    }

    try {
      const response = await fetch(`${this.baseURL}/api/orientation/progress/${this.currentTestUuid}`);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du progrès:', error);
      throw new Error('Impossible de récupérer le progrès');
    }
  }

  // Vérifier si le test est complet
  async isTestComplete() {
    if (!this.currentTestUuid) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseURL}/api/orientation/progress/${this.currentTestUuid}/complete`);
      
      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.isComplete;
    } catch (error) {
      console.error('Erreur lors de la vérification de complétion:', error);
      return false;
    }
  }

  // Préparer les données pour l'API backend
  prepareBackendRequest(answers, userInfo = null) {
    const userProfile = this.calculateUserProfileFromAnswers(answers);
    
    // Convertir les réponses en format attendu par le backend
    const backendRequest = {
      q1: answers['1'] || '',
      q2: answers['2'] || '',
      q3: answers['3'] || '',
      q4: answers['4'] || '',
      q5: answers['5'] || '',
      q6: answers['6'] || '',
      q7: answers['7'] || '',
      q8: answers['8'] || '',
      q9: answers['9'] || '', // Maintenant single-choice
      q10: answers['10'] || '',
      q11: answers['11'] || '',
      q12: answers['12'] || '',
      q13: answers['13'] || '',
      q14: answers['14'] || ''
    };

    // Ajouter les informations étudiant si disponibles
    if (userInfo) {
      backendRequest.studentInfo = {
        fullName: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || ''
      };
    }

    return {
      userProfile,
      backendRequest
    };
  }

  // Test de connectivité avec le backend
  async testBackendConnection() {
    try {
      const url = `${this.baseURL}/api/orientation/ping`;
      console.log('🧪 Test de connectivité backend:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend accessible:', data);
        return true;
      } else {
        console.error('❌ Backend non accessible:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur de connectivité backend:', error);
      return false;
    }
  }

  // Appel à l'API backend pour obtenir les recommandations
  async getBackendRecommendations(backendRequest) {
    try {
      const url = `${this.baseURL}/api/orientation/calculate`;
      console.log('🌐 URL d\'appel:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendRequest)
      });

      console.log('📡 Statut de la réponse:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur de réponse:', errorText);
        throw new Error(`Erreur API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📊 Données reçues du backend:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'appel API backend:', error);
      throw new Error(`Impossible de récupérer les recommandations du serveur: ${error.message}`);
    }
  }

  // Calculer les recommandations côté frontend (fallback)
  calculateFrontendRecommendations(userProfile) {
    try {
      const recommendations = [];
      
      // Calculer le score de correspondance pour chaque majeure
      idealProfilesData.forEach(profile => {
        const matchingScore = this.calculateMatchingScore(userProfile, profile.profile);
        
        if (matchingScore > 0) {
          recommendations.push({
            majorCode: profile.majorCode,
            majorName: profile.majorName,
            description: profile.description,
            whyThisMajor: profile.whyThisMajor,
            matchingScore,
            matchingPercentage: `${Math.round(matchingScore)}%`,
            userProfile,
            idealProfile: profile.profile
          });
        }
      });

      // Trier par score de correspondance décroissant
      recommendations.sort((a, b) => b.matchingScore - a.matchingScore);

      // Limiter aux 10 meilleures recommandations
      return recommendations.slice(0, 10);
    } catch (error) {
      console.error('Erreur lors du calcul frontend:', error);
      throw new Error('Impossible de calculer les recommandations');
    }
  }

  // Calculer le score de correspondance avec Distance Euclidienne Pondérée
  // Formule: Score_matching = 100 - sqrt(sum((DiffP * PoidsP)^2))
  // où DiffP = |Profil_Utilisateur[P] - Profil_Ideal_Majeure[P]|
  // et PoidsP = score idéal du pilier pour la majeure
  calculateMatchingScore(userProfile, idealProfile) {
    let sumWeightedSquaredDifferences = 0;
    let validPillars = 0;

    Object.keys(userProfile).forEach(pillar => {
      const userScore = userProfile[pillar];
      const idealScore = idealProfile[pillar] || 0;
      
      // Ne considérer que les piliers avec un score idéal > 0
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
    
    // Calculer la distance euclidienne pondérée
    const euclideanDistance = Math.sqrt(sumWeightedSquaredDifferences);
    
            // CORRECTION: Utiliser la même normalisation que le backend
            const normalizationFactor = 80000.0; // Facteur optimisé pour différenciation et plage 60-95%
    const normalizedDistance = Math.min(euclideanDistance / normalizationFactor, 1.0);
    
    const matchingScore = 100 - (normalizedDistance * 100);
    
    // Normaliser pour obtenir des scores réalistes (0-100%)
    return Math.max(0, Math.min(100, matchingScore));
  }

  // Obtenir les détails d'une recommandation
  getRecommendationDetails(majorCode, matchingScore) {
    try {
      const majorDescription = getMajorDescriptionUpdated(majorCode);
      const idealProfile = idealProfilesData[majorCode];
      
      if (!majorDescription || !idealProfile) {
        return null;
      }

      // Identifier les piliers les plus forts
      const strongestPillars = this.getStrongestPillars(idealProfile.pillarScores, 3);

      return {
        ...majorDescription,
        matchingScore,
        matchingPercentage: `${Math.round(matchingScore)}%`,
        strongestPillars,
        idealProfile: idealProfile.pillarScores
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
      return null;
    }
  }

  // Identifier les piliers les plus forts d'un profil
  getStrongestPillars(profile, count = 3) {
    const pillars = Object.entries(profile)
      .map(([pillar, score]) => ({ pillar, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);

    return pillars.map(p => ({
      name: p.pillar,
      score: p.score,
      displayName: this.getPillarDisplayName(p.pillar)
    }));
  }

  // Obtenir le nom d'affichage d'un pilier
  getPillarDisplayName(pillar) {
    const pillarNames = {
      'Interet_Scientifique_Tech': 'Intérêt Scientifique & Technique',
      'Interet_Artistique_Creatif': 'Intérêt Artistique & Créatif',
      'Interet_Social_Humain': 'Intérêt Social & Humain',
      'Interet_Business_Gestion': 'Intérêt Business & Gestion',
      'Interet_Logique_Analytique': 'Intérêt Logique & Analytique',
      'Competence_Resolution_Problemes': 'Résolution de Problèmes',
      'Competence_Communication': 'Communication',
      'Competence_Organisation': 'Organisation',
      'Competence_Manuel_Technique': 'Compétences Manuelles & Techniques',
      'Valeur_Impact_Societal': 'Impact Sociétal',
      'Valeur_Innovation_Challenge': 'Innovation & Défis',
      'Valeur_Stabilite_Securite': 'Stabilité & Sécurité',
      'Valeur_Autonomie': 'Autonomie',
      'Pref_Travail_Equipe_Collab': 'Travail d\'Équipe',
      'Pref_Travail_Autonome': 'Travail Autonome',
      'Pref_Pratique_Terrain': 'Pratique & Terrain',
      'Pref_Theorie_Recherche': 'Théorie & Recherche'
    };

    return pillarNames[pillar] || pillar;
  }

  // Processus complet d'orientation avec sauvegarde en base de données
  async processOrientation(answers, userInfo = null) {
    try {
      // 1. Démarrer un nouveau test si pas déjà en cours
      if (!this.currentTestUuid) {
        await this.startTest();
      }
      
      // 2. Sauvegarder toutes les réponses dans la base de données
      for (let i = 1; i <= 14; i++) {
        if (answers[i]) {
          const questionText = this.getQuestionText(i);
          const answerData = typeof answers[i] === 'object' ? answers[i] : null;
          const selectedAnswer = typeof answers[i] === 'object' ? JSON.stringify(answers[i]) : answers[i];
          
          try {
            await this.saveAnswer(i, questionText, selectedAnswer, answerData);
          } catch (error) {
            console.warn(`Erreur lors de la sauvegarde de la question ${i}:`, error);
          }
        }
      }
      
      // 3. Calculer le profil utilisateur
      const { userProfile, backendRequest } = this.prepareBackendRequest(answers, userInfo);

      // 3.5. Tester la connectivité backend
      const backendAvailable = await this.testBackendConnection();
      console.log('🔗 Backend disponible:', backendAvailable);

      // 4. Essayer d'obtenir les recommandations du backend
      let recommendations;
      let calculationMethod = 'BACKEND';
      
      try {
        console.log('🔄 Tentative d\'appel au backend:', this.baseURL);
        console.log('📤 Données envoyées au backend:', backendRequest);
        console.log('👤 Profil utilisateur calculé:', userProfile);
        
        const backendData = await this.getBackendRecommendations(backendRequest);
        console.log('📥 Réponse du backend:', backendData);

        recommendations = backendData.recommendations || [];
        console.log('✅ Recommandations obtenues du backend:', recommendations.length, 'recommandations');
        
        // Vérifier que les données sont dynamiques
        if (recommendations.length > 0) {
          console.log('🎯 Première recommandation backend:', recommendations[0]);
          console.log('📊 Score de correspondance:', recommendations[0].matchingScore);
        }
      } catch (backendError) {
        console.error('❌ ERREUR BACKEND - Utilisation du fallback frontend:', backendError);
        console.log('🔍 Détails de l\'erreur:', backendError.message);
        console.log('🔍 Stack trace:', backendError.stack);
        // Fallback vers le calcul frontend
        const frontendRecommendations = this.calculateFrontendRecommendations(userProfile);
        recommendations = frontendRecommendations.map(rec => ({
          majorId: rec.majorCode,
          majorName: rec.majorName,
          majorCode: rec.majorCode,
          matchingScore: rec.matchingScore,
          matchingPercentage: rec.matchingPercentage,
          description: '',
          userDescription: '',
          whyThisMajor: '',
          pillarComparison: rec.idealProfile
        }));
        calculationMethod = 'FRONTEND_FALLBACK';
      }

      // 5. Enrichir les recommandations avec les détails
      const enrichedRecommendations = recommendations.map(rec => {
        const details = this.getRecommendationDetails(rec.majorCode, rec.matchingScore);
        return {
          ...rec,
          ...details
        };
      });
      
      // 6. Sauvegarder les résultats dans la base de données
      if (userInfo && this.currentTestUuid) {
        try {
          await this.saveResults(userProfile, enrichedRecommendations, calculationMethod, userInfo);
        } catch (error) {
          console.warn('Erreur lors de la sauvegarde des résultats:', error);
        }
      }

      return {
        userProfile,
        recommendations: enrichedRecommendations,
        totalQuestions: 14,
        completedQuestions: Object.keys(answers).length,
        calculationMethod,
        testUuid: this.currentTestUuid
      };

    } catch (error) {
      console.error('Erreur lors du traitement d\'orientation:', error);
      throw new Error('Impossible de traiter l\'orientation');
    }
  }

  // Sauvegarder les résultats finaux
  async saveResults(userProfile, recommendations, calculationMethod, userInfo) {
    if (!this.currentTestUuid) {
      throw new Error('Aucun test en cours');
    }

    try {
      const top3Recommendations = recommendations.slice(0, 3);
      
      const requestBody = {
        userProfile,
        top3Recommendations,
        allRecommendations: recommendations,
        calculationMethod,
        userName: userInfo.name || '',
        userEmail: userInfo.email || '',
        userPhone: userInfo.phone || ''
      };

      const response = await fetch(`${this.baseURL}/api/orientation/results/${this.currentTestUuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Résultats sauvegardés avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error);
      throw new Error('Impossible de sauvegarder les résultats');
    }
  }

  // Obtenir le texte de la question
  getQuestionText(questionNumber) {
    const questionTexts = {
      1: "SI LE TEMPS ET L'ARGENT N'ÉTAIENT PAS UN PROBLÈME, QUELLE ACTIVITÉ CHOISIRIEZ-VOUS POUR PASSER VOTRE JOURNÉE IDÉALE ?",
      2: "QUAND VOUS NAVIGUEZ SUR INTERNET OU REGARDEZ DES VIDÉOS, QUEL TYPE DE CONTENU RETIENT LE PLUS VOTRE ATTENTION ?",
      3: "DANS UNE ÉQUIPE DE TRAVAIL, QUEL RÔLE AVEZ-VOUS TENDANCE À ADOPTER ?",
      4: "FACE À UN PROBLÈME COMPLEXE, QUELLE APPROCHE PRÉFÉREZ-VOUS ?",
      5: "DANS QUEL ENVIRONNEMENT DE TRAVAIL VOUS SENTEZ-VOUS LE PLUS À L'AISE ?",
      6: "QUEL TYPE DE PROJET VOUS MOTIVE LE PLUS ?",
      7: "QUELLE TÂCHE VOUS DONNE LE PLUS DE SATISFACTION ?",
      8: "QUELLES VALEURS SONT LES PLUS IMPORTANTES POUR VOUS DANS VOTRE TRAVAIL ?",
      9: "QUAND VOUS PENSEZ À VOTRE FUTURE CARRIÈRE, QU'EST-CE QUI EST LE PLUS IMPORTANT POUR VOUS ?",
      10: "COMMENT PRÉFÉREZ-VOUS APPRENDRE DE NOUVELLES COMPÉTENCES ?",
      11: "DANS VOTRE TRAVAIL, QUELLE AUTONOMIE PRÉFÉREZ-VOUS ?",
      12: "QUEL IMPACT SOUHAITEZ-VOUS AVOIR DANS VOTRE CARRIÈRE ?",
      13: "QUELLE PARTIE DE VOTRE TRAVAIL VOUS DONNE LE PLUS DE PLAISIR ?",
      14: "DANS QUEL DOMAINE AVEZ-VOUS LE PLUS D'INTÉRÊT ?"
    };
    
    return questionTexts[questionNumber] || `Question ${questionNumber}`;
  }

  // Sauvegarder les réponses en localStorage
  saveAnswers(answers) {
    try {
      localStorage.setItem('orientation_answers', JSON.stringify(answers));
      localStorage.setItem('orientation_timestamp', Date.now().toString());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des réponses:', error);
    }
  }

  // Charger les réponses depuis localStorage
  loadAnswers() {
    try {
      const saved = localStorage.getItem('orientation_answers');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Erreur lors du chargement des réponses:', error);
      return null;
    }
  }

  // Vérifier si les réponses sont complètes
  isAnswersComplete(answers) {
    if (!answers) return false;
    
    const requiredQuestions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
    return requiredQuestions.every(q => answers[q] !== undefined && answers[q] !== '');
  }

  // Obtenir le pourcentage de progression
  getProgressPercentage(answers) {
    if (!answers) return 0;
    
    const totalQuestions = 14;
    const answeredQuestions = Object.keys(answers).filter(q => 
      answers[q] !== undefined && answers[q] !== ''
    ).length;
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  // Valider une réponse spécifique
  validateAnswer(questionId, answer) {
    const questionMapping = this.getQuestionMapping(questionId);
    
    if (!questionMapping) {
      return { isValid: false, error: 'Question invalide' };
    }

    // Validation pour toutes les questions (maintenant toutes single-choice)
    const validAnswers = Object.keys(questionMapping.pillarMapping);
    const isValid = validAnswers.includes(answer);
    
    return { 
      isValid, 
      error: isValid ? null : `Réponse invalide. Options valides: ${validAnswers.join(', ')}` 
    };
  }

  // Obtenir le mapping d'une question
  getQuestionMapping(questionId) {
    const { questionToPillarMapping } = require('../data/questionToPillarMapping');
    return questionToPillarMapping[questionId];
  }
}

/**
 * Envoie les réponses complètes au backend avec les informations étudiant
 */
export const submitCompleteOrientation = async (answers, studentInfo) => {
  try {
    const backendRequest = {
      q1: answers['1'] || '',
      q2: answers['2'] || '',
      q3: answers['3'] || '',
      q4: answers['4'] || '',
      q5: answers['5'] || '',
      q6: answers['6'] || '',
      q7: answers['7'] || '',
      q8: answers['8'] || '',
      q9: answers['9'] || '',
      q10: answers['10'] || '',
      q11: answers['11'] || '',
      q12: answers['12'] || '',
      q13: answers['13'] || '',
      q14: answers['14'] || '',
      studentInfo: studentInfo // Informations étudiant de la question 15
    };

    console.log('Envoi des réponses complètes au backend:', backendRequest);

    const response = await fetch('/api/orientation/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendRequest),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('Résultats reçus du backend:', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des réponses complètes:', error);
    throw error;
  }
};

// Instance singleton
// Exporter la fonction calculateMatchingScore pour utilisation dans d'autres composants
export const calculateMatchingScore = (userProfile, idealProfile) => {
  let sumWeightedSquaredDifferences = 0;
  let validPillars = 0;

  Object.keys(userProfile).forEach(pillar => {
    const userScore = userProfile[pillar];
    const idealScore = idealProfile[pillar] || 0;
    
    // Ne considérer que les piliers avec un score idéal > 0
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
  
  // Calculer la distance euclidienne pondérée
  const euclideanDistance = Math.sqrt(sumWeightedSquaredDifferences);
  
  // Score de correspondance = 100 - distance
  // Facteur de normalisation pour des scores entre 60-95% avec bonne différenciation
  const normalizationFactor = 80000.0;
  const normalizedDistance = Math.min(euclideanDistance / normalizationFactor, 1.0);
  
  const matchingScore = 100 - (normalizedDistance * 100);
  
  // S'assurer que le score reste dans la plage [0, 100]
  return Math.max(0, Math.min(100, matchingScore));
};

const orientationService = new OrientationService();

export default orientationService;
