import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { toast } from 'react-toastify';

// Configuration de base d'Axios
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8084/api',
  timeout: 10000, // 10 secondes de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Gestion des erreurs spécifiques
      if (status === 401) {
        // Déconnexion si non autorisé
        removeToken();
        window.location.href = '/signin';
        toast.error('Votre session a expiré. Veuillez vous reconnecter.');
      } else if (status === 403) {
        toast.error("Vous n'avez pas les droits nécessaires pour cette action.");
      } else if (status === 404) {
        toast.error('Ressource non trouvée');
      } else if (status === 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      toast.error('Pas de réponse du serveur. Vérifiez votre connexion Internet.');
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      toast.error('Erreur de configuration de la requête');
    }

    return Promise.reject(error);
  }
);

// Fonction utilitaire pour gérer les erreurs
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Erreur lors de la requête');
  }
  throw error;
};

// Services API
export const authService = {
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/signin', { email, password });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  register: async (userData) => {
    try {
      const response = await API.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getProfile: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const programService = {
  getAll: async () => {
    try {
      const response = await API.get('/programs');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/programs/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  create: async (programData) => {
    try {
      const response = await API.post('/programs', programData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  update: async (id, programData) => {
    try {
      const response = await API.put(`/programs/${id}`, programData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/programs/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  search: async (searchTerm) => {
    try {
      const response = await API.get(`/programs/search?q=${searchTerm}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getByStatus: async (status) => {
    try {
      const response = await API.get(`/programs/status/${status}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getByFilters: async (majorName, universityName, status) => {
    try {
      const params = new URLSearchParams();
      if (majorName) params.append('majorName', majorName);
      if (universityName) params.append('universityName', universityName);
      if (status) params.append('status', status);

      const response = await API.get(`/programs/filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  uploadExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await API.post('/programs/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const destinationService = {
  getAll: async () => {
    try {
      const response = await API.get('/destinations');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export const temoignageService = {
  getAll: async () => {
    try {
      const response = await API.get('/temoignages');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Service partenaire supprimé

export const userService = {
  getProfile: async () => {
    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await API.put('/users/me', userData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Fonctions utilitaires
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });// src/services/api.js
    import axios from "axios";

// ✅ Définir une seule fois l'URL de base
    const API_BASE = "http://localhost:8084/api";

// ✅ Créer une instance Axios réutilisable
    const API = axios.create({
      baseURL: API_BASE,
    });

// ✅ Exporter l'instance par défaut
    export default API;

// ✅ Fonctions pour consommer les endpoints de l'API

// Récupère la liste des filières
    export const fetchFilieres = async () => {
      const response = await API.get("/filieres");
      return response.data;
    };

// Récupère la liste des témoignages
    export const fetchTemoignages = async () => {
      const response = await API.get("/temoignages");
      return response.data;
    };

// Récupère la liste des destinations
    export const fetchDestinations = async () => {
      const response = await API.get("/destinations");
      return response.data;
    };

// Récupère la liste des partenaires
    export const fetchPartenaires = async () => {
      const response = await API.get("/partenaires");
      return response.data;
    };
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default API;