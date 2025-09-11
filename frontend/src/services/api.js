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
    } else if (error.request) {
      // Erreur de requête (pas de réponse)
      console.error(`❌ API Connection Error: ${error.code || 'NETWORK_ERROR'} (${duration}ms) - ${error.config?.url}`);
      console.error('Le serveur backend n\'est pas accessible. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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
        throw new Error('Impossible de se connecter au serveur backend. Vérifiez qu\'il est démarré sur le port 8084.');
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

// Export de l'instance axios pour utilisation directe si nécessaire
export default apiClient;
