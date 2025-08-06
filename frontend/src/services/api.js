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

// Services API
export const authService = {
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/signin', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const response = await API.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProfile: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const programService = {
  getAll: async () => {
    try {
      const response = await API.get('/programs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/programs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (programData) => {
    try {
      const response = await API.post('/programs', programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (id, programData) => {
    try {
      const response = await API.put(`/programs/${id}`, programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/programs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  search: async (searchTerm) => {
    try {
      const response = await API.get(`/programs/search?q=${searchTerm}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getByStatus: async (status) => {
    try {
      const response = await API.get(`/programs/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }
};

export const destinationService = {
  getAll: async () => {
    try {
      const response = await API.get('/destinations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const temoignageService = {
  getAll: async () => {
    try {
      const response = await API.get('/temoignages');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const userService = {
  getProfile: async () => {
    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await API.put('/users/me', userData);
      return response.data;
    } catch (error) {
      throw error;
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
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};