import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

// Composant provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Vérifier le statut d'authentification au chargement
    useEffect(() => {
        checkAuthStatus();
    }, []);

    /**
     * Vérifie le statut d'authentification
     */
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            setError(null);

            // Vérifier si un token existe
            if (authService.isAuthenticated()) {
                // Récupérer les infos utilisateur depuis le localStorage
                const userInfo = authService.getUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                } else {
                    // Si pas d'infos en localStorage, vérifier côté serveur
                    const serverUser = await authService.checkAuthStatus();
                    if (serverUser) {
                        setUser(serverUser);
                        authService.setUserInfo(serverUser);
                    } else {
                        // Token invalide, nettoyer
                        authService.clearAuthData();
                        setUser(null);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du statut:', error);
            setError(error.message || 'Erreur de vérification du statut');
            // En cas d'erreur, nettoyer les données
            authService.clearAuthData();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Connexion utilisateur
     */
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            // Si c'est une connexion OAuth2, utiliser directement les données
            if (credentials.oauth2 && credentials.userData) {
                console.log("🔐 Connexion OAuth2 détectée:", credentials.userData);
                
                const userInfo = {
                    id: credentials.userData.id,
                    email: credentials.userData.email,
                    name: `${credentials.userData.prenom} ${credentials.userData.nom}`.trim(),
                    role: credentials.userData.role,
                    nom: credentials.userData.nom,
                    prenom: credentials.userData.prenom
                };
                
                setUser(userInfo);
                console.log("✅ Utilisateur OAuth2 connecté dans le contexte:", userInfo);
                
                return { 
                    success: true, 
                    message: 'Connexion OAuth2 réussie !',
                    user: userInfo,
                    role: credentials.userData.role
                };
            }

            // Connexion normale
            const response = await authService.login(credentials);
            
            if (response.token) {
                const userInfo = {
                    email: response.userEmail,
                    name: response.userName,
                    role: response.role,
                };
                setUser(userInfo);
                return { 
                    success: true, 
                    message: 'Connexion réussie !',
                    user: userInfo,
                    role: response.role
                };
            } else {
                throw new Error('Token non reçu');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de la connexion';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Inscription utilisateur
     */
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.register(userData);
            
            // L'inscription réussit même sans token JWT
            // L'utilisateur doit vérifier son email avant de pouvoir se connecter
            return { 
                success: true, 
                message: 'Inscription réussie ! Vérifiez votre email pour activer votre compte.',
                requiresVerification: true,
                userEmail: response.userEmail || userData.email
            };
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de l\'inscription';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Déconnexion utilisateur
     */
    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            setError(null);
            return { success: true, message: 'Déconnexion réussie !' };
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            // Même en cas d'erreur, nettoyer côté client
            setUser(null);
            setError(null);
            return { success: true, message: 'Déconnexion effectuée !' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Vérification d'email
     */
    const verifyEmail = async (token) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.verifyEmail(token);
            
            if (response.status === 'success') {
                return { success: true, message: response.message };
            } else {
                throw new Error(response.message || 'Échec de la vérification');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de la vérification';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Renvoi d'email de vérification
     */
    const resendVerificationEmail = async (email) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.resendVerificationEmail(email);
            
            if (response.status === 'success') {
                return { success: true, message: response.message };
            } else {
                throw new Error(response.message || 'Échec du renvoi');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors du renvoi';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Demande de réinitialisation de mot de passe
     */
    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.forgotPassword(email);
            
            if (response.status === 'success') {
                return { success: true, message: response.message };
            } else {
                throw new Error(response.message || 'Échec de la demande');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de la demande';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Réinitialisation de mot de passe
     */
    const resetPassword = async (token, newPassword) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.resetPassword(token, newPassword);
            
            if (response.status === 'success') {
                return { success: true, message: response.message };
            } else {
                throw new Error(response.message || 'Échec de la réinitialisation');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de la réinitialisation';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efface l'erreur
     */
    const clearError = () => {
        setError(null);
    };

    // Valeurs du contexte
    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        verifyEmail,
        resendVerificationEmail,
        forgotPassword,
        resetPassword,
        clearError,
        setError,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
