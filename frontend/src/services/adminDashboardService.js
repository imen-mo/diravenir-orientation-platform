import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class AdminDashboardService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour gérer les erreurs de réponse
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // ===== STATISTIQUES GÉNÉRALES =====

  /**
   * Obtenir toutes les statistiques du dashboard
   */
  async getAllStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques des utilisateurs
   */
  async getUserStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics/users');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques utilisateurs:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques des applications
   */
  async getApplicationStatistics() {
    try {
      const response = await this.api.get('/admin/applications/statistics');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques applications:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques des programmes
   */
  async getProgramStatistics() {
    try {
      const response = await this.api.get('/admin/programs/statistics');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques programmes:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques du chat
   */
  async getChatStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics/chat');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques chat:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques d'orientation
   */
  async getOrientationStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics/orientation');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques orientation:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques financières
   */
  async getFinancialStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics/financial');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques financières:', error);
      throw error;
    }
  }

  /**
   * Obtenir les statistiques temporelles
   */
  async getTemporalStatistics() {
    try {
      const response = await this.api.get('/admin/dashboard/statistics/temporal');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques temporelles:', error);
      throw error;
    }
  }

  // ===== DONNÉES RÉCENTES =====

  /**
   * Obtenir les données récentes
   */
  async getRecentData() {
    try {
      const response = await this.api.get('/admin/dashboard/recent-data');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données récentes:', error);
      throw error;
    }
  }

  /**
   * Obtenir les applications récentes
   */
  async getRecentApplications(limit = 10) {
    try {
      const response = await this.api.get('/admin/applications', {
        params: { page: 0, size: limit, sort: 'createdAt,desc' }
      });
      return response.data.content || response.data.applications || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des applications récentes:', error);
      throw error;
    }
  }

  /**
   * Obtenir les utilisateurs récents
   */
  async getRecentUsers(limit = 10) {
    try {
      const response = await this.api.get('/admin/users', {
        params: { page: 0, size: limit, sort: 'dateCreation,desc' }
      });
      return response.data.content || response.data.users || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs récents:', error);
      throw error;
    }
  }

  /**
   * Obtenir les programmes récents
   */
  async getRecentPrograms(limit = 10) {
    try {
      const response = await this.api.get('/admin/programs', {
        params: { page: 0, size: limit, sort: 'id,desc' }
      });
      return response.data.content || response.data.programs || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes récents:', error);
      throw error;
    }
  }

  // ===== GESTION DES APPLICATIONS =====

  /**
   * Obtenir toutes les applications avec pagination
   */
  async getApplications(page = 0, size = 10, status = null, searchTerm = null) {
    try {
      const params = { page, size };
      if (status) params.status = status;
      if (searchTerm) params.searchTerm = searchTerm;

      const response = await this.api.get('/admin/applications', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des applications:', error);
      throw error;
    }
  }

  /**
   * Obtenir une application par ID
   */
  async getApplicationById(applicationId) {
    try {
      const response = await this.api.get(`/admin/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'application:', error);
      throw error;
    }
  }

  /**
   * Approuver une application
   */
  async approveApplication(applicationId, adminNotes = null) {
    try {
      const response = await this.api.post(`/admin/applications/${applicationId}/approve`, {
        adminNotes
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'approbation de l\'application:', error);
      throw error;
    }
  }

  /**
   * Rejeter une application
   */
  async rejectApplication(applicationId, rejectionReason, adminNotes = null) {
    try {
      const response = await this.api.post(`/admin/applications/${applicationId}/reject`, {
        rejectionReason,
        adminNotes
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du rejet de l\'application:', error);
      throw error;
    }
  }

  /**
   * Marquer une application comme en attente
   */
  async markApplicationAsPending(applicationId, adminNotes = null) {
    try {
      const response = await this.api.post(`/admin/applications/${applicationId}/pending`, {
        adminNotes
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du marquage en attente:', error);
      throw error;
    }
  }

  /**
   * Demander des documents supplémentaires
   */
  async requestAdditionalDocuments(applicationId, missingDocuments, adminNotes = null) {
    try {
      const response = await this.api.post(`/admin/applications/${applicationId}/request-documents`, {
        missingDocuments,
        adminNotes
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la demande de documents:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour les notes admin
   */
  async updateAdminNotes(applicationId, adminNotes) {
    try {
      const response = await this.api.put(`/admin/applications/${applicationId}/notes`, {
        adminNotes
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des notes:', error);
      throw error;
    }
  }

  /**
   * Supprimer une application
   */
  async deleteApplication(applicationId) {
    try {
      const response = await this.api.delete(`/admin/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'application:', error);
      throw error;
    }
  }

  // ===== GESTION DES UTILISATEURS =====

  /**
   * Obtenir tous les utilisateurs avec pagination
   */
  async getUsers(page = 0, size = 10, role = null, searchTerm = null) {
    try {
      const params = { page, size };
      if (role) params.role = role;
      if (searchTerm) params.searchTerm = searchTerm;

      const response = await this.api.get('/admin/users', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  /**
   * Obtenir un utilisateur par ID
   */
  async getUserById(userId) {
    try {
      const response = await this.api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  }

  /**
   * Créer un nouvel utilisateur
   */
  async createUser(userData) {
    try {
      const response = await this.api.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un utilisateur
   */
  async updateUser(userId, userData) {
    try {
      const response = await this.api.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  }

  /**
   * Supprimer un utilisateur
   */
  async deleteUser(userId) {
    try {
      const response = await this.api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }

  // ===== GESTION DES PROGRAMMES =====

  /**
   * Obtenir tous les programmes avec pagination
   */
  async getPrograms(page = 0, size = 10, status = null, searchTerm = null) {
    try {
      const params = { page, size };
      if (status) params.status = status;
      if (searchTerm) params.searchTerm = searchTerm;

      const response = await this.api.get('/admin/programs', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes:', error);
      throw error;
    }
  }

  /**
   * Obtenir un programme par ID
   */
  async getProgramById(programId) {
    try {
      const response = await this.api.get(`/admin/programs/${programId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du programme:', error);
      throw error;
    }
  }

  /**
   * Créer un nouveau programme
   */
  async createProgram(programData) {
    try {
      const response = await this.api.post('/admin/programs', programData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un programme
   */
  async updateProgram(programId, programData) {
    try {
      const response = await this.api.put(`/admin/programs/${programId}`, programData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du programme:', error);
      throw error;
    }
  }

  /**
   * Supprimer un programme
   */
  async deleteProgram(programId) {
    try {
      const response = await this.api.delete(`/admin/programs/${programId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du programme:', error);
      throw error;
    }
  }

  /**
   * Changer le statut d'un programme
   */
  async updateProgramStatus(programId, status) {
    try {
      const response = await this.api.put(`/admin/programs/${programId}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  }

  // ===== GESTION DU CHAT =====

  /**
   * Obtenir les conversations
   */
  async getConversations() {
    try {
      const response = await this.api.get('/api/chat/conversations');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
      throw error;
    }
  }

  /**
   * Obtenir les messages d'une conversation
   */
  async getConversationMessages(conversationId) {
    try {
      const response = await this.api.get(`/api/chat/conversation/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  }

  /**
   * Envoyer un message
   */
  async sendMessage(messageData) {
    try {
      const response = await this.api.post('/api/chat/send', messageData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  }

  // ===== ALERTES ET NOTIFICATIONS =====

  /**
   * Obtenir les alertes
   */
  async getAlerts() {
    try {
      const response = await this.api.get('/admin/dashboard/alerts');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      throw error;
    }
  }

  /**
   * Obtenir les métriques de performance
   */
  async getPerformanceMetrics() {
    try {
      const response = await this.api.get('/admin/dashboard/performance');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des métriques:', error);
      throw error;
    }
  }

  // ===== UTILITAIRES =====

  /**
   * Exporter les données en CSV
   */
  async exportData(type, filters = {}) {
    try {
      const response = await this.api.get(`/admin/export/${type}`, {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      throw error;
    }
  }

  /**
   * Télécharger le PDF d'une application
   */
  async downloadApplicationPDF(applicationId) {
    try {
      const response = await this.api.get(`/admin/applications/${applicationId}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du téléchargement du PDF:', error);
      throw error;
    }
  }
}

// Créer une instance singleton
const adminDashboardService = new AdminDashboardService();

export default adminDashboardService;
