// Configuration API ultra-optimisée pour Diravenir
const API_CONFIG = {
  // Configuration du backend
  BACKEND_URL: import.meta.env.VITE_API_URL || 'http://localhost:8084',
  API_BASE_PATH: import.meta.env.VITE_API_BASE_PATH || '', // CORRIGÉ : Pas de préfixe par défaut
  
  // Timeouts optimisés
  TIMEOUTS: {
    REQUEST: 10000,      // 10 secondes
    UPLOAD: 30000,       // 30 secondes pour les uploads
    ORIENTATION: 15000,  // 15 secondes pour l'orientation
  },
  
  // Endpoints principaux - CORRIGÉS pour éviter la duplication
  ENDPOINTS: {
    // Authentification
    AUTH: {
      SIGNIN: '/auth/login',
      SIGNUP: '/auth/signup',
      VERIFY_EMAIL: '/auth/verify-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      OAUTH2: '/oauth2',
    },
    
    // Orientation
    ORIENTATION: {
      CALCULATE: '/orientation/calculate',
      PROFILE: '/orientation/profile',
      MAJORS: '/orientation/majors',
      PING: '/orientation/ping',
    },
    
    // Programmes
    PROGRAMS: {
      ALL: '/programs',
      BY_ID: '/programs/{id}',
      BY_MAJOR: '/programs/major/{majorName}',
      UPLOAD: '/programs/upload',
    },
    
    // Utilisateurs
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/update',
      DELETE: '/users/delete',
    },
    
    // Santé et tests
    HEALTH: '/health',
    TEST: '/test',
  },
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  
  // Configuration des retry
  RETRY_CONFIG: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
  
  // Configuration du cache
  CACHE_CONFIG: {
    ENABLED: true,
    TTL: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 100,
  },
};

// Classe utilitaire pour les appels API
class ApiClient {
  constructor() {
    // CORRECTION : Construction correcte de l'URL de base
    // Si API_BASE_PATH est vide, on utilise directement BACKEND_URL
    // Sinon on concatène BACKEND_URL + API_BASE_PATH
    this.baseURL = API_CONFIG.API_BASE_PATH 
      ? API_CONFIG.BACKEND_URL + API_CONFIG.API_BASE_PATH
      : API_CONFIG.BACKEND_URL + '/api'; // Fallback vers /api si pas de configuration
    
    this.cache = new Map();
    this.requestCount = 0;
    this.startTime = Date.now();
    
    console.log('🚀 API Client initialisé avec URL:', this.baseURL);
  }
  
  // Méthode principale pour les appels API
  async request(endpoint, options = {}) {
    const url = this.baseURL + endpoint;
    const requestId = ++this.requestCount;
    
    console.log(`🚀 API Request #${requestId}: ${options.method || 'GET'} ${url}`);
    
    const startTime = performance.now();
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...API_CONFIG.DEFAULT_HEADERS,
          ...options.headers,
        },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUTS.REQUEST),
        credentials: 'include', // Important pour les cookies CORS
      });
      
      const responseTime = performance.now() - startTime;
      console.log(`✅ API Response #${requestId}: ${response.status} (${responseTime.toFixed(2)}ms)`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Mise en cache si applicable
      if (options.method === 'GET' && API_CONFIG.CACHE_CONFIG.ENABLED) {
        this.setCache(url, response.clone());
      }
      
      return response;
      
    } catch (error) {
      const responseTime = performance.now() - startTime;
      console.error(`❌ API Error #${requestId}: ${error.message} (${responseTime.toFixed(2)}ms)`);
      
      // Retry automatique pour les erreurs réseau
      if (this.shouldRetry(error) && options.retryCount < API_CONFIG.RETRY_CONFIG.MAX_RETRIES) {
        return this.retryRequest(endpoint, options, error);
      }
      
      throw error;
    }
  }
  
  // Méthodes HTTP simplifiées
  async get(endpoint, options = {}) {
    const response = await this.request(endpoint, { ...options, method: 'GET' });
    return response.json();
  }
  
  async post(endpoint, data, options = {}) {
    const response = await this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  async put(endpoint, data, options = {}) {
    const response = await this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  async delete(endpoint, options = {}) {
    const response = await this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
    return response.json();
  }
  
  // Gestion du cache
  setCache(key, response) {
    if (this.cache.size >= API_CONFIG.CACHE_CONFIG.MAX_SIZE) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data: response,
      timestamp: Date.now(),
      ttl: API_CONFIG.CACHE_CONFIG.TTL,
    });
  }
  
  getCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }
  
  // Gestion des retry
  shouldRetry(error) {
    return error.name === 'AbortError' || 
           error.message.includes('network') ||
           error.message.includes('timeout');
  }
  
  async retryRequest(endpoint, options, originalError) {
    const retryCount = (options.retryCount || 0) + 1;
    const delay = API_CONFIG.RETRY_CONFIG.RETRY_DELAY * 
                  Math.pow(API_CONFIG.RETRY_CONFIG.BACKOFF_MULTIPLIER, retryCount - 1);
    
    console.log(`🔄 Retry #${retryCount} for ${endpoint} in ${delay}ms`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return this.request(endpoint, { ...options, retryCount });
  }
  
  // Statistiques d'utilisation
  getStats() {
    const uptime = Date.now() - this.startTime;
    return {
      requestCount: this.requestCount,
      uptime: uptime,
      requestsPerMinute: (this.requestCount / (uptime / 60000)).toFixed(2),
      cacheSize: this.cache.size,
      cacheHitRate: this.cache.size > 0 ? 'N/A' : '0%',
    };
  }
  
  // Test de connectivité
  async ping() {
    try {
      const response = await this.get(API_CONFIG.ENDPOINTS.ORIENTATION.PING);
      return response === 'pong';
    } catch (error) {
      console.error('❌ Ping failed:', error.message);
      return false;
    }
  }
}

// Instance singleton
const apiClient = new ApiClient();

// Export des configurations et du client
export { API_CONFIG, ApiClient, apiClient };

// Export par défaut pour la compatibilité
export default apiClient;
