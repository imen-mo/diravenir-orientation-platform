// Configuration API
export const API_CONFIG = {
  // URL de l'API backend Spring Boot
  baseURL: 'http://localhost:8084/api',
  
  // Timeout des requêtes
  timeout: 10000,
  
  // Configuration de l'application
  appName: 'DirAvenir',
  appVersion: '1.0.0'
};

// Fonction pour obtenir l'URL de base de l'API
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || API_CONFIG.baseURL;
};
