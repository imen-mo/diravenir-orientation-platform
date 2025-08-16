import axios from 'axios';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

// Service pour l'orientation
class OrientationService {
  
  /**
   * Calcule l'orientation en envoyant les réponses au backend
   * @param {Object} answers - Les réponses du test d'orientation
   * @returns {Promise<Object>} - La réponse du backend avec les recommandations
   */
  async calculateOrientation(answers) {
    try {
      console.log('🚀 Service d\'orientation - Début de calculateOrientation');
      console.log('📤 Données envoyées:', answers);
      
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ORIENTATION.CALCULATE);
      console.log('🌐 URL de l\'API:', url);
      console.log('🔧 Configuration API:', API_CONFIG);
      
      const response = await axios.post(url, answers);
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
   * Récupère le profil utilisateur calculé
   * @param {Object} answers - Les réponses du test
   * @returns {Promise<Object>} - Le profil utilisateur
   */
  async getUserProfile(answers) {
    try {
      const response = await axios.post(
        buildApiUrl(API_CONFIG.ENDPOINTS.ORIENTATION.PROFILE),
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
        buildApiUrl(API_CONFIG.ENDPOINTS.ORIENTATION.MAJORS)
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des majeures:', error);
      throw new Error('Impossible de récupérer les majeures');
    }
  }

  /**
   * Test avec des réponses d'exemple (pour développement)
   * @returns {Promise<Object>} - Résultats du test
   */
  async testWithExampleAnswers() {
    try {
      const response = await axios.get(
        buildApiUrl(API_CONFIG.ENDPOINTS.ORIENTATION.TEST_EXAMPLE)
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors du test avec exemples:', error);
      throw new Error('Impossible d\'exécuter le test avec exemples');
    }
  }
}

// Instance unique du service
const orientationService = new OrientationService();

export default orientationService;
