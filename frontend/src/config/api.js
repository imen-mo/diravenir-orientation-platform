// Configuration de l'API backend - PORT 8084
const API_CONFIG = {
  // URL de base de l'API backend - PORT 8084
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8084',
  
  // Endpoints de l'API
  ENDPOINTS: {
    ORIENTATION: {
      CALCULATE: '/api/orientation/calculate',
      PROFILE: '/api/orientation/profile',
      MAJORS: '/api/orientation/majors',
      TEST_EXAMPLE: '/api/orientation/test-example'
    },
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      VERIFY_EMAIL: '/api/auth/verify-email'
    }
  }
};

// Fonction pour obtenir l'URL de base
export const getApiBaseUrl = () => {
  return API_CONFIG.BASE_URL;
};

// Fonction utilitaire pour construire l'URL complète
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Configuration par défaut d'axios
export const axiosConfig = {
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG;
