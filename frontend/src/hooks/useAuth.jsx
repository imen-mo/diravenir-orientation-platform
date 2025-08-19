import React, { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStatus, setUserStatus] = useState({
    online: false,
    lastActivity: null
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifier la validité du token avec le backend
      checkUserStatus();
      // Marquer l'utilisateur comme connecté localement
      setUser({ token, email: 'utilisateur@example.com' }); // Placeholder temporaire
    }
    setLoading(false);
  }, []);

  const checkUserStatus = async () => {
    try {
      const response = await authService.getUserStatus();
      setUserStatus({
        online: response.online,
        lastActivity: response.timestamp
      });
      
      // Si le statut est récupéré avec succès, mettre à jour l'utilisateur
      if (response.email) {
        setUser(prev => ({ ...prev, email: response.email }));
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      // Si le token est invalide, nettoyer l'état
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
        setUserStatus({
          online: false,
          lastActivity: null
        });
      }
    }
  };

  const updateUserActivity = async () => {
    try {
      await authService.updateUserActivity();
      setUserStatus(prev => ({
        ...prev,
        lastActivity: Date.now()
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité:', error);
    }
  };

  const login = async (email, password) => {
    try {
    setLoading(true);
    setError(null);
      
      const response = await authService.login(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response);
        
        // Marquer l'utilisateur comme online
        setUserStatus(prev => ({
          ...prev,
          online: true,
          lastActivity: Date.now()
        }));
        
        return { success: true };
      } else {
        return { success: false, error: 'Réponse invalide du serveur' };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de connexion' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    
    // Marquer l'utilisateur comme offline
    setUserStatus({
      online: false,
      lastActivity: null
    });
  };

  const value = {
    user,
    login,
    logout,
    loading,
    userStatus,
    checkUserStatus,
    updateUserActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
