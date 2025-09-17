import axios from 'axios';

class AdminApiService {
  constructor() {
    this.baseURL = 'http://localhost:8084/api';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Intercepteur pour l'auth
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // ===== STATISTIQUES =====
  
  /**
   * Récupérer les statistiques générales
   * @returns {Promise<Object>} Statistiques depuis la DB réelle
   */
  async getStats() {
    try {
      console.log('📊 Récupération des statistiques depuis la DB...');
      const response = await this.client.get('/admin/stats');
      console.log('✅ Statistiques récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats:', error);
      throw new Error('Impossible de récupérer les statistiques depuis la base de données');
    }
  }

  /**
   * Récupérer les statistiques des utilisateurs
   * @returns {Promise<Object>} Statistiques des utilisateurs
   */
  async getUserStatistics() {
    try {
      console.log('👥 Récupération des statistiques utilisateurs...');
      const response = await this.client.get('/admin/users/statistics');
      console.log('✅ Statistiques utilisateurs récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats utilisateurs:', error);
      throw new Error('Impossible de récupérer les statistiques des utilisateurs');
    }
  }

  /**
   * Récupérer les statistiques des programmes
   * @returns {Promise<Object>} Statistiques des programmes
   */
  async getProgramStatistics() {
    try {
      console.log('🎓 Récupération des statistiques programmes...');
      const response = await this.client.get('/admin/programs/statistics');
      console.log('✅ Statistiques programmes récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats programmes:', error);
      throw new Error('Impossible de récupérer les statistiques des programmes');
    }
  }

  /**
   * Récupérer les statistiques des applications
   * @returns {Promise<Object>} Statistiques des applications
   */
  async getApplicationStatistics() {
    try {
      console.log('📝 Récupération des statistiques applications...');
      const response = await this.client.get('/admin/applications/statistics');
      console.log('✅ Statistiques applications récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats applications:', error);
      throw new Error('Impossible de récupérer les statistiques des applications');
    }
  }

  /**
   * Récupérer les données timeline des applications
   * @param {number} months - Nombre de mois à récupérer (défaut: 12)
   * @returns {Promise<Object>} Données timeline des applications
   */
  async getApplicationTimeline(months = 12) {
    try {
      console.log('📅 Récupération des données timeline applications...', { months });
      const response = await this.client.get('/admin/applications/timeline', {
        params: { months }
      });
      console.log('✅ Données timeline applications récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération timeline applications:', error);
      throw new Error('Impossible de récupérer les données timeline des applications');
    }
  }

  /**
   * Supprimer une candidature
   * @param {string} applicationId - ID de la candidature
   * @returns {Promise<Object>} Résultat de la suppression
   */
  async deleteApplication(applicationId) {
    try {
      console.log(`🗑️ Suppression de la candidature ${applicationId}...`);
      const response = await this.client.delete(`/admin/applications/${applicationId}`);
      console.log('✅ Candidature supprimée:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur suppression candidature:', error);
      throw new Error('Impossible de supprimer la candidature');
    }
  }

  // ===== IMPORT EXCEL =====
  
  /**
   * Importer des programmes depuis un fichier Excel
   * @param {FormData} formData - Données du fichier Excel
   * @returns {Promise<Object>} Résultat de l'import
   */
  async importProgramsFromExcel(formData) {
    try {
      console.log('📊 Import programmes depuis Excel...');
      const response = await this.client.post('/admin/excel/import/programs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('✅ Import terminé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur import Excel:', error);
      throw new Error('Impossible d\'importer le fichier Excel');
    }
  }

  /**
   * Télécharger le template Excel
   * @returns {Promise<Blob>} Template Excel
   */
  async downloadExcelTemplate() {
    try {
      console.log('📥 Téléchargement template Excel...');
      const response = await this.client.get('/admin/excel/template/programs', {
        responseType: 'blob'
      });
      console.log('✅ Template téléchargé');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur téléchargement template:', error);
      throw new Error('Impossible de télécharger le template');
    }
  }

  /**
   * Valider un fichier Excel avant import
   * @param {FormData} formData - Données du fichier Excel
   * @returns {Promise<Object>} Résultat de la validation
   */
  async validateExcelFile(formData) {
    try {
      console.log('🔍 Validation fichier Excel...');
      const response = await this.client.post('/admin/excel/validate/programs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('✅ Fichier validé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur validation fichier:', error);
      throw new Error('Impossible de valider le fichier');
    }
  }

  // ===== UTILISATEURS =====
  
  /**
   * Récupérer la liste des utilisateurs avec pagination
   * @param {Object} params - Paramètres de pagination et filtres
   * @returns {Promise<Object>} Liste des utilisateurs depuis la DB
   */
  async getUsers(params = {}) {
    try {
      console.log('👥 Récupération des utilisateurs depuis la DB...', params);
      const response = await this.client.get('/admin/users', { params });
      console.log('✅ Utilisateurs récupérés:', response.data);
      
      // Si l'API retourne directement une liste, on la transforme en objet avec pagination
      if (Array.isArray(response.data)) {
        return {
          items: response.data,
          total: response.data.length,
          page: params.page || 0,
          limit: params.limit || 10
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération utilisateurs:', error);
      throw new Error('Impossible de récupérer les utilisateurs depuis la base de données');
    }
  }

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} Utilisateur créé
   */
  async createUser(userData) {
    try {
      console.log('➕ Création utilisateur dans la DB...', userData);
      const response = await this.client.post('/admin/users', userData);
      console.log('✅ Utilisateur créé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création utilisateur:', error);
      throw new Error('Impossible de créer l\'utilisateur');
    }
  }

  /**
   * Modifier un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @param {Object} userData - Nouvelles données
   * @returns {Promise<Object>} Utilisateur modifié
   */
  async updateUser(id, userData) {
    try {
      console.log('✏️ Modification utilisateur dans la DB...', id, userData);
      const response = await this.client.put(`/admin/users/${id}`, userData);
      console.log('✅ Utilisateur modifié:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur modification utilisateur:', error);
      throw new Error('Impossible de modifier l\'utilisateur');
    }
  }

  /**
   * Supprimer un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<Object>} Confirmation de suppression
   */
  async deleteUser(id) {
    try {
      console.log('🗑️ Suppression utilisateur dans la DB...', id);
      const response = await this.client.delete(`/admin/users/${id}`);
      console.log('✅ Utilisateur supprimé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur suppression utilisateur:', error);
      throw new Error('Impossible de supprimer l\'utilisateur');
    }
  }

  // ===== PROGRAMMES =====
  
  /**
   * Récupérer la liste des programmes avec pagination
   * @param {Object} params - Paramètres de pagination et filtres
   * @returns {Promise<Object>} Liste des programmes depuis la DB
   */
  async getPrograms(params = {}) {
    try {
      console.log('🎓 Récupération des programmes depuis la DB...', params);
      const response = await this.client.get('/admin/programs', { params });
      console.log('✅ Programmes récupérés:', response.data);
      
      // Si l'API retourne directement une liste, on la transforme en objet avec pagination
      if (Array.isArray(response.data)) {
        return {
          items: response.data,
          total: response.data.length,
          page: params.page || 0,
          limit: params.limit || 10
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération programmes:', error);
      throw new Error('Impossible de récupérer les programmes depuis la base de données');
    }
  }

  /**
   * Créer un nouveau programme
   * @param {Object} programData - Données du programme
   * @returns {Promise<Object>} Programme créé
   */
  async createProgram(programData) {
    try {
      console.log('➕ Création programme dans la DB...', programData);
      const response = await this.client.post('/admin/programs', programData);
      console.log('✅ Programme créé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création programme:', error);
      throw new Error('Impossible de créer le programme');
    }
  }

  /**
   * Modifier un programme
   * @param {number} id - ID du programme
   * @param {Object} programData - Nouvelles données
   * @returns {Promise<Object>} Programme modifié
   */
  async updateProgram(id, programData) {
    try {
      console.log('✏️ Modification programme dans la DB...', id, programData);
      const response = await this.client.put(`/admin/programs/${id}`, programData);
      console.log('✅ Programme modifié:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur modification programme:', error);
      throw new Error('Impossible de modifier le programme');
    }
  }

  /**
   * Supprimer un programme
   * @param {number} id - ID du programme
   * @returns {Promise<Object>} Confirmation de suppression
   */
  async deleteProgram(id) {
    try {
      console.log('🗑️ Suppression programme dans la DB...', id);
      const response = await this.client.delete(`/admin/programs/${id}`);
      console.log('✅ Programme supprimé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur suppression programme:', error);
      throw new Error('Impossible de supprimer le programme');
    }
  }

  // ===== CANDIDATURES =====
  
  /**
   * Récupérer la liste des candidatures avec pagination
   * @param {Object} params - Paramètres de pagination et filtres
   * @returns {Promise<Object>} Liste des candidatures depuis la DB
   */
  async getApplications(params = {}) {
    try {
      console.log('📝 Récupération des candidatures depuis la DB...', params);
      const response = await this.client.get('/admin/applications', { params });
      console.log('✅ Candidatures récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération candidatures:', error);
      throw new Error('Impossible de récupérer les candidatures depuis la base de données');
    }
  }

  /**
   * Modifier une candidature
   * @param {number} id - ID de la candidature
   * @param {Object} applicationData - Nouvelles données
   * @returns {Promise<Object>} Candidature modifiée
   */
  async updateApplication(id, applicationData) {
    try {
      console.log('✏️ Modification candidature dans la DB...', id, applicationData);
      const response = await this.client.put(`/admin/applications/${id}`, applicationData);
      console.log('✅ Candidature modifiée:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur modification candidature:', error);
      throw new Error('Impossible de modifier la candidature');
    }
  }

  /**
   * Supprimer une candidature
   * @param {number} id - ID de la candidature
   * @returns {Promise<Object>} Confirmation de suppression
   */
  async deleteApplication(id) {
    try {
      console.log('🗑️ Suppression candidature dans la DB...', id);
      const response = await this.client.delete(`/admin/applications/${id}`);
      console.log('✅ Candidature supprimée:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur suppression candidature:', error);
      throw new Error('Impossible de supprimer la candidature');
    }
  }

  // ===== DONNÉES RÉCENTES =====
  
  /**
   * Récupérer les données récentes
   * @returns {Promise<Object>} Données récentes depuis la DB
   */
  async getRecentData() {
    try {
      console.log('🕒 Récupération des données récentes depuis la DB...');
      const response = await this.client.get('/admin/dashboard/recent-data');
      console.log('✅ Données récentes récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération données récentes:', error);
      // Retourner un objet vide au lieu de fake data
      return {
        recentActivity: []
      };
    }
  }

  // ===== GESTION D'ERREURS =====
  
  /**
   * Vérifier la connectivité
   * @returns {Promise<boolean>} État de la connexion
   */
  async checkConnectivity() {
    try {
      await this.client.get('/health');
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Instance singleton
const adminApiService = new AdminApiService();

export default adminApiService;
