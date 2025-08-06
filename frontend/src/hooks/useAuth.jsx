import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api';
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
          // Vous pouvez ajouter une requête pour récupérer les infos utilisateur
          // const response = await authService.getProfile();
          // setUser(response.data);
        } catch (err) {
          console.error('Erreur de vérification du token:', err);
          removeToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      // setUser(response.user); // Décommentez quand votre API renvoie les données utilisateur
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

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
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
