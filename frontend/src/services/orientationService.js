import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Service pour l'orientation
class OrientationService {
  
  /**
   * Transforme les réponses du format frontend vers le format backend
   * @param {Object} answers - Les réponses du frontend avec clés numériques
   * @returns {Object} - Les réponses transformées pour le backend
   */
  transformAnswersForBackend(answers) {
    const transformed = {};
    
    // Mapper les clés numériques vers les noms de questions attendus par le backend
    for (let i = 1; i <= 14; i++) {
      if (answers[i] !== undefined) {
        const questionKey = `question${i}`;
        transformed[questionKey] = answers[i];
      }
    }
    
    console.log('🔄 Réponses transformées pour le backend:', transformed);
    return transformed;
  }

  /**
   * Calcule l'orientation en envoyant les réponses au backend
   * @param {Object} answers - Les réponses du test d'orientation
   * @returns {Promise<Object>} - La réponse du backend avec les recommandations
   */
  async calculateOrientation(answers) {
    try {
      console.log('🚀 Service d\'orientation - Début de calculateOrientation');
      console.log('📤 Données envoyées:', answers);
      
      // Transformer les réponses pour le backend
      const transformedAnswers = this.transformAnswersForBackend(answers);
      console.log('🔄 Réponses transformées:', transformedAnswers);
      
      const url = API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH + API_CONFIG.ENDPOINTS.ORIENTATION.CALCULATE;
      console.log('🌐 URL de l\'API:', url);
      console.log('🔧 Configuration API:', API_CONFIG);
      
      const response = await axios.post(url, transformedAnswers);
      console.log('✅ Réponse reçue du backend:', response);
      console.log('📊 Données de la réponse:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Erreur dans le service d\'orientation:', error);
      console.error('❌ Détails de l\'erreur:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw new Error('Impossible de calculer l\'orientation: ' + error.message);
    }
  }

  /**
   * Sauvegarde les informations personnelles de l'utilisateur
   * @param {Object} personalInfo - Les informations personnelles (nom, email, téléphone)
   * @returns {Promise<boolean>} - true si la sauvegarde a réussi
   */
  async savePersonalInfo(personalInfo) {
    try {
      console.log('💾 Service: Utilisation des informations de l\'utilisateur connecté');
      console.log('📧 Email:', personalInfo.email);
      console.log('👤 Nom:', personalInfo.nom);
      
      // Pas besoin de sauvegarder, on utilise les informations existantes
      // Retourner les informations pour la suite
      return {
        email: personalInfo.email,
        nom: personalInfo.nom,
        telephone: personalInfo.telephone
      };
      
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des informations:', error);
      throw new Error('Impossible de récupérer les informations utilisateur: ' + error.message);
    }
  }

  /**
   * Récupère les informations personnelles d'un utilisateur par email
   * @param {string} email - L'email de l'utilisateur
   * @returns {Promise<Object>} - Les informations personnelles
   */
  async getPersonalInfo(email) {
    try {
      console.log('🔍 Service d\'orientation - Récupération des informations personnelles');
      console.log('📧 Email recherché:', email);
      
      const url = API_CONFIG.BACKEND_URL + `/api/personal-info/${encodeURIComponent(email)}`;
      console.log('🌐 URL de l\'API:', url);
      
      const response = await axios.get(url);
      console.log('✅ Informations personnelles récupérées:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des informations personnelles:', error);
      throw new Error('Impossible de récupérer les informations personnelles: ' + error.message);
    }
  }

  /**
   * Récupère le profil utilisateur calculé
   * @param {Object} answers - Les réponses du test
   * @returns {Promise<Object>} - Le profil utilisateur
   */
  async getUserProfile(answers) {
    try {
      const response = await axios.post(
        API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH + API_CONFIG.ENDPOINTS.ORIENTATION.PROFILE,
        answers
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw new Error('Impossible de récupérer le profil');
    }
  }

  /**
   * Récupère toutes les majeures disponibles
   * @returns {Promise<Array>} - Liste des majeures
   */
  async getAllMajors() {
    try {
      const response = await axios.get(
        API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH + API_CONFIG.ENDPOINTS.ORIENTATION.MAJORS
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des majeures:', error);
      throw new Error('Impossible de récupérer les majeures');
    }
  }

  /**
   * Test de connectivité de l'API d'orientation
   * @returns {Promise<Object>} - Statut de la connectivité
   */
  async testApiConnectivity() {
    try {
      console.log('🔌 Test de connectivité de l\'API d\'orientation');
      
      const url = API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH + API_CONFIG.ENDPOINTS.ORIENTATION.PING;
      console.log('🌐 URL de test:', url);
      
      const response = await axios.get(url);
      console.log('✅ Test de connectivité réussi:', response.data);
      
      return { status: 'success', message: 'API connectée et fonctionnelle' };
    } catch (error) {
      console.error('❌ Test de connectivité échoué:', error);
      throw new Error('API non accessible: ' + error.message);
    }
  }

  /**
   * Test avec des réponses d'exemple (pour développement)
   * @returns {Promise<Object>} - Résultats du test
   */
  async testWithExampleAnswers() {
    const sampleAnswers = {
      question1: 'A',
      question2: ['A'],
      question3: 'A',
      question4: 'A',
      question5: ['A'],
      question6: 'A',
      question7: 'A',
      question8: 'A',
      question9: {
        security: 80,
        innovation: 70,
        autonomy: 75,
        salary: 65,
      },
      question10: 'A',
      question11: 'A',
      question12: 'A',
      question13: 'A',
      question14: ['A'],
    };

    return this.calculateOrientation(sampleAnswers);
  }

  async calculateOrientationWithEmail(answers, userEmail, userName) {
    try {
      console.log('🚀 Service d\'orientation - Début de calculateOrientationWithEmail');
      console.log('📤 Réponses à envoyer:', answers);
      console.log('👤 Utilisateur:', userName, '(', userEmail, ')');

      // Transformer les réponses pour le backend
      const transformedAnswers = this.transformAnswersForBackend(answers);
      console.log('🔄 Réponses transformées:', transformedAnswers);

      const url = API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH + '/orientation/calculate-and-email';
      console.log('🌐 URL de l\'API avec email:', url);

      const response = await axios.post(url, transformedAnswers, {
        params: {
          userEmail: userEmail,
          userName: userName
        }
      });
      
      console.log('✅ Réponse reçue du backend avec email:', response);
      console.log('📊 Données de la réponse:', response.data);

      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du calcul avec email:', error);
      
      if (error.response) {
        console.error('📊 Détails de l\'erreur:', error.response.data);
        console.error('🔢 Code de statut:', error.response.status);
      }
      
      throw new Error('Erreur lors du calcul de l\'orientation: ' + error.message);
    }
  }
}

// Instance unique du service
const orientationService = new OrientationService();

export default orientationService;
