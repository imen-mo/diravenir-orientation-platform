import { useState, useEffect, createContext, useContext } from 'react';
import { authService, userService } from '../services/api';
import { setToken, removeToken, getToken } from '../utils/auth';

// Créer le contexte d'authentification
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const profile = await userService.getProfile();
          setUser(profile);
        } catch (err) {
          console.error('Erreur de vérification du token:', err);
          removeToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password, recaptchaToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password, recaptchaToken);
      setToken(response.token);
      try {
        const profile = await userService.getProfile();
        setUser(profile);
      } catch (e) {
        // profil non indispensable pour compléter la connexion
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Échec de la connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de l'inscription";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try { await authService.logout(); } catch (_) {}
    removeToken();
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedProfile = await userService.updateProfile(profileData);
      setUser(updatedProfile);
      
      // Rafraîchir les données utilisateur depuis le serveur
      try {
        const freshProfile = await userService.getProfile();
        setUser(freshProfile);
        return freshProfile;
      } catch (refreshError) {
        console.warn('Erreur lors du rafraîchissement du profil:', refreshError);
        return updatedProfile;
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!getToken(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export default AuthContext;
