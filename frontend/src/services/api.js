// Service API amélioré avec gestion d'erreur robuste
import axios from 'axios';

// Configuration de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8084/api';

// Instance axios avec configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 secondes de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Ajouter un timestamp unique pour chaque requête
    config.metadata = { startTime: new Date() };
    
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log de la requête
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Erreur de configuration de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`✅ API Response: ${response.status} (${duration}ms) - ${response.config.url}`);
    return response;
  },
  (error) => {
    const duration = error.config?.metadata?.startTime 
      ? new Date() - error.config.metadata.startTime 
      : 'N/A';
    
    if (error.response) {
      // Erreur de réponse du serveur
      console.error(`❌ API Error: ${error.response.status} (${duration}ms) - ${error.config?.url}`);
      console.error('Détails:', error.response.data);
      
      // Gérer les erreurs d'authentification
      if (error.response.status === 401) {
        console.warn('🔐 Token expiré ou invalide, redirection vers login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Erreur de requête (pas de réponse)
      console.error(`❌ API Connection Error: ${error.code || 'NETWORK_ERROR'} (${duration}ms) - ${error.config?.url}`);
      console.error('Le serveur backend n\'est pas accessible. Vérifiez qu\'il est démarré sur le port 8080.');
    } else {
      // Erreur de configuration
      console.error('❌ API Configuration Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Service de programmes
export const programService = {
  // Récupérer tous les programmes
  async getAll() {
    try {
      const response = await apiClient.get('/programs');
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, program: "Computer Science", universities: "Demo University" },
          { id: 2, program: "Business Administration", universities: "Demo University" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer un programme par ID
  async getById(id) {
    try {
      const response = await apiClient.get(`/programs/${id}`);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/{id} - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return {
          id: id,
          program: "Computer Science",
          universities: "Demo University",
          description: "Programme de démonstration"
        };
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer les détails complets d'un programme
  async getDetailById(id) {
    try {
      const response = await apiClient.get(`/programs/detail/${id}`);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/detail - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return {
          id: id,
          program: "Computer Science",
          universities: "Demo University",
          description: "Programme de démonstration"
        };
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },
  
  // ===== NOUVELLES MÉTHODES POUR PROGRAMMES SIMILAIRES =====
  
  // Récupérer les programmes similaires (même nom) dans d'autres universités
  async getSimilarPrograms(id) {
    try {
      const response = await apiClient.get(`/programs/${id}/similar`);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/similar - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, program: "Computer Science", universities: "Demo University" },
          { id: 2, program: "Software Engineering", universities: "Demo University" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },
  
  // Récupérer les programmes dans la même catégorie
  async getProgramsByCategory(id) {
    try {
      const response = await apiClient.get(`/programs/${id}/category`);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/category - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, program: "Computer Science", universities: "Demo University" },
          { id: 2, program: "Information Technology", universities: "Demo University" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },
  
  // Récupérer les programmes similaires avec fallback intelligent
  async getSimilarProgramsIntelligent(id) {
    try {
      const response = await apiClient.get(`/programs/${id}/similar-intelligent`);
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/similar-intelligent - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, program: "Computer Science", universities: "Demo University" },
          { id: 2, program: "Software Engineering", universities: "Demo University" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Rechercher des programmes
  async search(query) {
    try {
      const response = await apiClient.get('/programs/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs/search - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, program: "Computer Science", universities: "Demo University" },
          { id: 2, program: "Business Administration", universities: "Demo University" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  }
};

// Service de santé du backend
export const healthService = {
  // Vérifier la santé du backend
  async checkHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        return {
          status: 'DOWN',
          message: 'Backend non accessible',
          error: 'ERR_CONNECTION_REFUSED'
        };
      }
      throw error;
    }
  }
};

// Service de destinations
export const destinationService = {
  // Récupérer toutes les destinations
  async getAll() {
    try {
      const response = await apiClient.get('/destinations');
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /destinations - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, nom: "Chine", description: "Pays d'Asie avec d'excellentes universités", image: "🇨🇳" },
          { id: 2, nom: "Chypre", description: "Île méditerranéenne avec des programmes internationaux", image: "🇨🇾" },
          { id: 3, nom: "Turquie", description: "Pays eurasien avec des universités modernes", image: "🇹🇷" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  }
};

// Service de filières/programmes (alias pour programService)
export const filiereService = {
  // Récupérer tous les programmes
  async getAll() {
    try {
      const response = await apiClient.get('/programs');
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /programs - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, nom: "Computer Science", description: "Programme en informatique" },
          { id: 2, nom: "Business Administration", description: "Programme en administration des affaires" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  }
};

// Service de témoignages (placeholder - à implémenter selon vos besoins)
export const temoignageService = {
  async getAll() {
    // Pour l'instant, retourner des données factices
    return [
      {
        id: 1,
        nom: "Marie Dupont",
        programme: "Computer Science",
        universite: "Hefei University",
        message: "Excellente expérience d'études en Chine !"
      },
      {
        id: 2,
        nom: "Jean Martin",
        programme: "Business Administration",
        universite: "Cyprus International University",
        message: "Formation de qualité dans un environnement international."
      }
    ];
  }
};

// Service de partenaires (placeholder - à implémenter selon vos besoins)
export const partenaireService = {
  async getAll() {
    // Pour l'instant, retourner des données factices
    return [
      {
        id: 1,
        nom: "Hefei University",
        pays: "Chine",
        description: "Université reconnue en Chine avec un excellent niveau d'enseignement."
      },
      {
        id: 2,
        nom: "Cyprus International University",
        pays: "Chypre",
        description: "Université internationale offrant des programmes de qualité."
      }
    ];
  }
};

// Service de gestion des utilisateurs
export const utilisateurService = {
  // Récupérer tous les utilisateurs
  async getAll() {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /users - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, nom: "Utilisateur Demo", email: "demo@example.com" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer un utilisateur par ID
  async getById(id) {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Créer un utilisateur
  async create(userData) {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  async update(id, userData) {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Supprimer un utilisateur
  async delete(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  }
};

// Service de gestion des candidatures
export const candidatureService = {
  // Récupérer toutes les candidatures
  async getAll() {
    try {
      const response = await apiClient.get('/candidatures');
      return response.data;
    } catch (error) {
      // Gestion spécifique des erreurs 401 (non autorisé)
      if (error.response?.status === 401) {
        console.warn('⚠️ Accès non autorisé à /candidatures - utilisation des données de démonstration');
        // Retourner des données de démonstration en cas d'erreur 401
        return [
          { id: 1, status: "EN_COURS", programName: "Computer Science" }
        ];
      }
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer une candidature par ID
  async getById(id) {
    try {
      const response = await apiClient.get(`/candidatures/${id}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Créer une candidature
  async create(candidatureData) {
    try {
      const response = await apiClient.post('/candidatures', candidatureData);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Mettre à jour une candidature
  async update(id, candidatureData) {
    try {
      const response = await apiClient.put(`/candidatures/${id}`, candidatureData);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Supprimer une candidature
  async delete(id) {
    try {
      const response = await apiClient.delete(`/candidatures/${id}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer les candidatures d'un utilisateur
  async getByUserId(userId) {
    try {
      const response = await apiClient.get(`/candidatures/user/${userId}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  },

  // Récupérer les candidatures pour un programme
  async getByProgramId(programId) {
    try {
      const response = await apiClient.get(`/candidatures/program/${programId}`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8080.');
      }
      throw error;
    }
  }
};

// Fonctions d'export pour compatibilité avec HomePage.jsx
export const fetchDestinations = () => destinationService.getAll();
export const fetchFilieres = () => filiereService.getAll();
export const fetchTemoignages = () => temoignageService.getAll();
export const fetchPartenaires = () => partenaireService.getAll();

// ===== STUDENT DASHBOARD SERVICES =====

// Service pour les statistiques étudiant
const studentStatsService = {
  // Récupérer les statistiques de l'étudiant
  async getStudentStats() {
    try {
      const response = await apiClient.get('/student/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération stats étudiant:', error);
      throw error;
    }
  },

  // Récupérer les applications de l'étudiant
  async getStudentApplications() {
    try {
      const response = await apiClient.get('/student/applications');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération applications étudiant:', error);
      throw error;
    }
  },

  // Récupérer les résultats de tests de l'étudiant
  async getStudentTestResults() {
    try {
      const response = await apiClient.get('/student/test-results');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération résultats tests:', error);
      throw error;
    }
  },

  // Récupérer les données de timeline de l'étudiant
  async getStudentTimeline() {
    try {
      const response = await apiClient.get('/student/timeline');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération timeline étudiant:', error);
      throw error;
    }
  },

  // Récupérer le profil de l'étudiant
  async getStudentProfile() {
    try {
      const response = await apiClient.get('/student/profile');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération profil étudiant:', error);
      throw error;
    }
  },

  // Mettre à jour le profil de l'étudiant
  async updateStudentProfile(profileData) {
    try {
      const response = await apiClient.put('/student/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Erreur mise à jour profil étudiant:', error);
      throw error;
    }
  },

  // ===== DASHBOARD ÉTUDIANT =====
  
  /**
   * Récupérer les statistiques du dashboard étudiant
   */
  async getStudentStats() {
    try {
      const response = await apiClient.get('/student/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération stats étudiant:', error);
      throw error;
    }
  },

  /**
   * Récupérer les candidatures de l'étudiant
   */
  async getStudentApplications() {
    try {
      const response = await apiClient.get('/student/applications');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération candidatures:', error);
      throw error;
    }
  },

  /**
   * Récupérer les résultats de tests de l'étudiant
   */
  async getStudentTestResults() {
    try {
      const response = await apiClient.get('/student/test-results');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération résultats tests:', error);
      throw error;
    }
  },

  /**
   * Récupérer la timeline de l'étudiant
   */
  async getStudentTimeline() {
    try {
      const response = await apiClient.get('/student/timeline');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération timeline:', error);
      throw error;
    }
  },

  /**
   * Récupérer les programmes sauvegardés de l'étudiant
   */
  async getPrograms(userEmail = null) {
    try {
      // Si pas d'email fourni, essayer de le récupérer depuis le localStorage
      if (!userEmail) {
        const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        userEmail = userInfo.email;
      }
      
      if (!userEmail) {
        throw new Error('Email utilisateur requis pour récupérer les programmes sauvegardés');
      }
      
      const response = await apiClient.get(`/student/programs?email=${encodeURIComponent(userEmail)}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération programmes:', error);
      throw error;
    }
  },

  /**
   * Récupérer les programmes sauvegardés
   */
  async getSavedPrograms() {
    try {
      const userEmail = localStorage.getItem('userEmail') || 'student@diravenir.com';
      const response = await apiClient.get(`/student/saved-programs?email=${userEmail}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération programmes sauvegardés:', error);
      throw error;
    }
  },

  /**
   * Sauvegarder un programme
   */
  async saveProgram(programId) {
    try {
      const userEmail = localStorage.getItem('userEmail') || 'student@diravenir.com';
      const response = await apiClient.post('/student/save-program', {
        programId,
        userEmail
      });
      return response.data;
    } catch (error) {
      console.error('Erreur sauvegarde programme:', error);
      throw error;
    }
  },

  /**
   * Retirer un programme des sauvegardés
   */
  async removeSavedProgram(programId) {
    try {
      const userEmail = localStorage.getItem('userEmail') || 'student@diravenir.com';
      const response = await apiClient.delete(`/student/saved-programs/${programId}?email=${userEmail}`);
      return response.data;
    } catch (error) {
      console.error('Erreur suppression programme sauvegardé:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour les paramètres de l'étudiant
   */
  async updateStudentSettings(settingsData) {
    try {
      const userEmail = localStorage.getItem('userEmail') || 'student@diravenir.com';
      const response = await apiClient.put('/student/settings', {
        ...settingsData,
        userEmail
      });
      return response.data;
    } catch (error) {
      console.error('Erreur mise à jour paramètres:', error);
      throw error;
    }
  }
};

// Objet principal apiService qui combine tous les services
const apiService = {
  // Programmes
  ...programService,
  
  // Candidatures (Applications)
  ...candidatureService,
  
  // Utilisateurs
  ...utilisateurService,
  
  // Statistiques étudiant
  ...studentStatsService,
  
  // Services supplémentaires
  ...healthService,
  ...destinationService,
  ...filiereService,
  ...temoignageService,
  ...partenaireService,
  
  // Méthodes utilitaires
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Erreur health check:', error);
      throw error;
    }
  },

  // ===== NOTIFICATION SERVICES =====
  
  // Créer une notification
  async createNotification(notificationData) {
    try {
      const response = await apiClient.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Erreur création notification:', error);
      throw error;
    }
  },

  // Récupérer les notifications de l'utilisateur
  async getUserNotifications(userId) {
    try {
      const response = await apiClient.get(`/notifications/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération notifications:', error);
      throw error;
    }
  },

  // Marquer une notification comme lue
  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiClient.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Erreur marquage notification:', error);
      throw error;
    }
  },

  // Envoyer un email
  async sendEmail(emailData) {
    try {
      const response = await apiClient.post('/email/send', emailData);
      return response.data;
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw error;
    }
  },

  // ===== STUDENT PROFILE SERVICES =====
  
  // Récupérer le profil de l'étudiant
  async getStudentProfile() {
    try {
      const response = await apiClient.get('/student/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur récupération profil étudiant:', error);
      throw error;
    }
  },

  // Mettre à jour le profil de l'étudiant
  async updateStudentProfile(profileData) {
    try {
      const response = await apiClient.put('/student/profile', profileData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erreur mise à jour profil étudiant:', error);
      throw error;
    }
  },

  // ===== ADMIN APPLICATION ENDPOINTS =====
  
  // Récupérer toutes les applications pour l'admin
  getAdminApplications: async (params = {}) => {
    try {
      console.log('📊 Récupération des applications admin...');
      const response = await apiClient.get('/admin/applications', { params });
      console.log('✅ Applications admin récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des applications admin:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une application
  updateApplicationStatus: async (applicationId, status, adminNotes = '') => {
    try {
      console.log(`🔄 Mise à jour du statut de l'application ${applicationId} vers ${status}...`);
      const response = await apiClient.put(`/admin/applications/${applicationId}/status`, {
        status,
        adminNotes
      });
      console.log('✅ Statut mis à jour avec succès:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Télécharger le PDF d'une application
  downloadApplicationPDF: async (applicationId) => {
    try {
      console.log(`📄 Téléchargement du PDF pour l'application ${applicationId}...`);
      const response = await apiClient.get(`/admin/applications/${applicationId}/pdf`, {
        responseType: 'blob'
      });
      console.log('✅ PDF téléchargé avec succès');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du téléchargement du PDF:', error);
      throw error;
    }
  },

  // Récupérer les statistiques des applications
  getApplicationStatistics: async () => {
    try {
      console.log('📈 Récupération des statistiques des applications...');
      const response = await apiClient.get('/admin/applications/statistics');
      console.log('✅ Statistiques récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // ===== STUDENT APPLICATION ENDPOINTS =====
  
  // Récupérer les applications de l'étudiant
  getStudentApplications: async () => {
    try {
      console.log('📋 Récupération des applications de l\'étudiant...');
      const response = await apiClient.get('/student/applications');
      console.log('✅ Applications étudiant récupérées:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des applications étudiant:', error);
      throw error;
    }
  },

  // Récupérer une application spécifique de l'étudiant
  getStudentApplication: async (applicationId) => {
    try {
      console.log(`📋 Récupération de l'application ${applicationId}...`);
      const response = await apiClient.get(`/student/applications/${applicationId}`);
      console.log('✅ Application récupérée:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'application:', error);
      throw error;
    }
  },

  // Méthode de connexion
  async login(credentials) {
    try {
      console.log('🔑 Tentative de connexion avec:', credentials.email);
      const response = await apiClient.post('/api/auth/login', credentials);
      console.log('✅ Connexion réussie:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      throw error;
    }
  }
};

// Export de l'objet principal apiService
export default apiService;

// Export de l'instance axios pour utilisation directe si nécessaire
export { apiClient };
