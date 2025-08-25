import apiClient from '../config/api.js';

// ✅ Service API unifié pour Diravenir
// Utilise la nouvelle configuration centralisée

// Service pour les programmes
export const programService = {
  getAll: async () => {
    return await apiClient.get('/programs');
  },
  
  getById: async (id) => {
    return await apiClient.get(`/programs/${id}`);
  },
  
  create: async (programData) => {
    return await apiClient.post('/programs', programData);
  },
  
  update: async (id, programData) => {
    return await apiClient.put(`/programs/${id}`, programData);
  },
  
  delete: async (id) => {
    return await apiClient.delete(`/programs/${id}`);
  },
  
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return await apiClient.post('/programs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Service pour les filières
export const fetchFilieres = async () => {
  return await apiClient.get('/filieres');
};

// Service pour les témoignages
export const fetchTemoignages = async () => {
  return await apiClient.get('/temoignages');
};

// Service pour les destinations
export const fetchDestinations = async () => {
  return await apiClient.get('/destinations');
};

// Service pour les partenaires
export const fetchPartenaires = async () => {
  return await apiClient.get('/partenaires');
};

// Service pour les candidatures
export const candidatureService = {
  getAll: async () => {
    return await apiClient.get('/candidatures');
  },
  
  getById: async (id) => {
    return await apiClient.get(`/candidatures/${id}`);
  },
  
  create: async (candidatureData) => {
    return await apiClient.post('/candidatures', candidatureData);
  },
  
  update: async (id, candidatureData) => {
    return await apiClient.put(`/candidatures/${id}`, candidatureData);
  },
  
  delete: async (id) => {
    return await apiClient.delete(`/candidatures/${id}`);
  }
};

// Service pour les utilisateurs
export const utilisateurService = {
  getAll: async () => {
    return await apiClient.get('/utilisateurs');
  },
  
  getById: async (id) => {
    return await apiClient.get(`/utilisateurs/${id}`);
  },
  
  update: async (id, userData) => {
    return await apiClient.put(`/utilisateurs/${id}`, userData);
  },
  
  delete: async (id) => {
    return await apiClient.delete(`/utilisateurs/${id}`);
  }
};

// Service pour les destinations
export const destinationService = {
  getAll: async () => {
    return await apiClient.get('/destinations');
  },
  
  getById: async (id) => {
    return await apiClient.get(`/destinations/${id}`);
  }
};

// Export par défaut pour compatibilité
export default apiClient;
