import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userDataService from '../services/userDataService';

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

    // VÉRIFICATION D'AUTHENTIFICATION NORMALE
    useEffect(() => {
        console.log('🔍 VÉRIFICATION D\'AUTHENTIFICATION - Démarrage normal');
        
        const initializeAuth = async () => {
            // Nettoyer l'admin temporaire s'il existe
            localStorage.removeItem('tempAdmin');
            try {
                setLoading(true);
                
                // Vérifier si l'utilisateur est déjà connecté
                if (authService.isAuthenticated()) {
                    console.log('🔍 Utilisateur déjà authentifié, récupération des infos...');
                    const userInfo = authService.getUserInfo();
                    if (userInfo) {
                        setUser(userInfo);
                        console.log('✅ Utilisateur connecté:', userInfo);
                    } else {
                        // Vérifier côté serveur si nécessaire
                        const serverUser = await authService.checkAuthStatus();
                        if (serverUser) {
                            setUser(serverUser);
                            console.log('✅ Utilisateur vérifié côté serveur:', serverUser);
                        }
                    }
                } else {
                    console.log('ℹ️ Aucun utilisateur authentifié');
                }
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation de l\'authentification:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        initializeAuth();
    }, []); // Dépendances vides pour s'exécuter une seule fois

    /**
     * Vérifie le statut d'authentification
     */
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            setError(null);

            // Vérifier l'authentification JWT normale
            if (authService.isAuthenticated()) {
                console.log('🔍 Vérification de l\'authentification JWT...');
                
                // Récupérer les infos utilisateur depuis le localStorage
                const userInfo = authService.getUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                    console.log('✅ Utilisateur JWT authentifié:', userInfo);
                } else {
                    // Si pas d'infos en localStorage, vérifier côté serveur
                    const serverUser = await authService.checkAuthStatus();
                    if (serverUser) {
                        setUser(serverUser);
                        authService.setUserInfo(serverUser);
                        console.log('✅ Utilisateur JWT vérifié côté serveur:', serverUser);
                    } else {
                        // Token invalide, nettoyer
                        authService.clearAuthData();
                        setUser(null);
                        console.log('❌ Token JWT invalide, nettoyage effectué');
                    }
                }
            } else {
                console.log('ℹ️ Aucune authentification active');
                setUser(null);
            }
        } catch (error) {
            console.error('❌ Erreur lors de la vérification du statut:', error);
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

            // Connexion normale
            const response = await authService.login(credentials);
            
            console.log('🔑 Réponse complète reçue dans AuthContext:', response);
            
            if (response.token) {
                // CORRECTION: Utiliser la structure de réponse correcte du backend
                const userInfo = {
                    id: response.userId,
                    email: response.email,
                    name: `${response.email.split('@')[0]}`, // Fallback temporaire
                    role: response.role,
                    nom: response.email.split('@')[0], // Fallback temporaire
                    prenom: response.email.split('@')[0] // Fallback temporaire
                };
                
                setUser(userInfo);
                console.log("✅ Utilisateur connecté dans le contexte:", userInfo);
                
                // Récupérer les données utilisateur sauvegardées
                const userData = userDataService.getAllUserData(userInfo.id);
                console.log("📂 Données utilisateur récupérées:", userData);
                
                return { 
                    success: true, 
                    message: response.message || 'Connexion réussie !',
                    user: userInfo,
                    role: response.role,
                    userData: userData
                };
            } else {
                throw new Error(response.message || 'Échec de la connexion');
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

            console.log('📝 Inscription en cours pour:', userData.email);
            const response = await authService.register(userData);
            
            console.log('📝 Réponse d\'inscription reçue:', response);
            
            if (response.success) {
                // Pour l'inscription, on ne connecte PAS l'utilisateur
                // On retourne juste les informations de succès
                return { 
                    success: true, 
                    message: response.message || 'Inscription réussie ! Vérifiez votre email pour activer votre compte.',
                    userEmail: response.userEmail,
                    userName: response.userName,
                    role: response.role
                };
            } else {
                throw new Error(response.message || 'Échec de l\'inscription');
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'inscription:', error);
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
            console.log('🚪 Déconnexion en cours...');
            
            console.log('🔓 Déconnexion JWT...');
            await authService.logout();
            
            // NETTOYAGE COMPLET de toutes les données
            console.log('🧹 Nettoyage complet des données...');
            
            // Nettoyer les données utilisateur spécifiques
            if (user?.id) {
                userDataService.clearAllUserData(user.id);
            }
            
            // Nettoyer l'état local
            setUser(null);
            setError(null);
            
            // Nettoyer le localStorage et sessionStorage
            localStorage.clear();
            sessionStorage.clear();
            
            // Nettoyer les cookies
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            
            // Forcer le rechargement de la page pour s'assurer que tout est nettoyé
            console.log('🔄 Rechargement de la page...');
            window.location.reload();
            
            return { success: true, message: 'Déconnexion réussie !' };
        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion:', error);
            
            // Même en cas d'erreur, FORCER le nettoyage complet
            console.log('🧹 Nettoyage forcé en cas d\'erreur...');
            setUser(null);
            setError(null);
            
            // Nettoyer le localStorage et sessionStorage
            localStorage.clear();
            sessionStorage.clear();
            
            // Nettoyer les cookies
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            
            // Forcer le rechargement
            window.location.reload();
            
            return { success: true, message: 'Déconnexion forcée effectuée !' };
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
                throw new Error(response.message || 'Échec de l\'envoi');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de l\'envoi';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Mot de passe oublié
     */
    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.forgotPassword(email);
            
            if (response.status === 'success') {
                return { success: true, message: response.message };
            } else {
                throw new Error(response.message || 'Échec de l\'envoi');
            }
        } catch (error) {
            const errorMessage = error.message || 'Erreur lors de l\'envoi';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Réinitialisation du mot de passe
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

    /**
     * Définit une erreur
     */
    const setErrorValue = (errorMessage) => {
        setError(errorMessage);
    };

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    const isAuthenticated = () => {
        return user !== null && authService.isAuthenticated();
    };


    /**
     * Déconnexion forcée (nettoyage complet)
     */
    const forceLogout = () => {
        console.log('🚨 FORCE LOGOUT - Nettoyage complet...');
        
        // Nettoyer l'état
        setUser(null);
        setError(null);
        
        // Nettoyer le stockage
        try {
            localStorage.clear();
            sessionStorage.clear();
            console.log('🗑️ Stockage nettoyé');
        } catch (e) {
            console.log('❌ Erreur lors du nettoyage du stockage:', e);
        }
        
        // Nettoyer les cookies
        try {
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            console.log('🍪 Cookies nettoyés');
        } catch (e) {
            console.log('❌ Erreur lors du nettoyage des cookies:', e);
        }
        
        // Redirection
        window.location.href = '/';
    };

    /**
     * Déconnexion ultra-forcée (destruction complète)
     */
    const ultraForceLogout = () => {
        console.log('💥 ULTRA FORCE LOGOUT - Destruction complète...');
        
        // Nettoyer l'état
        setUser(null);
        setError(null);
        
        // Destruction de tous les cookies
        try {
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            console.log('🍪 Cookies détruits');
        } catch (e) {
            console.log('❌ Erreur lors de la destruction des cookies:', e);
        }
        
        // Destruction des caches
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }
        
        // Destruction d'IndexedDB
        if ('indexedDB' in window) {
            indexedDB.databases().then(databases => {
                databases.forEach(db => {
                    indexedDB.deleteDatabase(db.name);
                });
            });
        }
        
        // Destruction des service workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.unregister();
                });
            });
        }
        
        // Destruction des données de session
        if (window.sessionStorage) {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                console.log('❌ Erreur lors de la destruction de sessionStorage:', e);
            }
        }
        
        // Destruction des données de localStorage
        if (window.localStorage) {
            try {
                window.localStorage.clear();
            } catch (e) {
                console.log('❌ Erreur lors de la destruction de localStorage:', e);
            }
        }
        
        // Redirection vers une page vide pour forcer le nettoyage
        console.log('💥 Redirection vers page vide...');
        window.location.href = 'about:blank';
        
        // Si la redirection échoue, recharger
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    /**
     * Diagnostic de la source de l'utilisateur
     */
    const diagnoseUserSource = () => {
        const results = [];
        results.push('🔍 DIAGNOSTIC COMPLET DE L\'UTILISATEUR');
        results.push('=====================================');
        
        // État du contexte
        results.push(`📊 ÉTAT DU CONTEXTE:`);
        results.push(`   - user: ${user ? 'PRÉSENT' : 'NULL'}`);
        results.push(`   - loading: ${loading}`);
        results.push(`   - error: ${error || 'AUCUNE'}`);
        
        // Stockage local
        results.push(`💾 STOCKAGE LOCAL:`);
        results.push(`   - localStorage: ${localStorage.length} clés`);
        results.push(`   - sessionStorage: ${sessionStorage.length} clés`);
        
        // Cookies
        const cookies = document.cookie.split(';').filter(c => c.trim());
        results.push(`🍪 COOKIES:`);
        results.push(`   - Nombre: ${cookies.length}`);
        cookies.forEach(cookie => {
            const [name] = cookie.trim().split('=');
            if (name && (name.includes('auth') || name.includes('user') || name.includes('token'))) {
                results.push(`     ⚠️  ${name}: SUSPECT`);
            }
        });
        
        // Variables globales
        const globalAuthKeys = Object.keys(window).filter(key => 
            key.includes('auth') || key.includes('user') || key.includes('token')
        );
        results.push(`🌐 VARIABLES GLOBALES:`);
        results.push(`   - Nombre suspectes: ${globalAuthKeys.length}`);
        globalAuthKeys.forEach(key => {
            results.push(`     ⚠️  ${key}: SUSPECT`);
        });
        
        return results.join('\n');
    };

    // Méthodes utilitaires pour la gestion des données utilisateur
    const saveUserData = (dataType, data) => {
        if (user?.id) {
            switch (dataType) {
                case 'programs':
                    return userDataService.savePrograms(data, user.id);
                case 'preferences':
                    return userDataService.saveUserPreferences(data, user.id);
                case 'orientationResults':
                    return userDataService.saveOrientationResults(data, user.id);
                case 'applications':
                    return userDataService.saveApplications(data, user.id);
                case 'notifications':
                    return userDataService.saveNotifications(data, user.id);
                default:
                    return false;
            }
        }
        return false;
    };

    const getUserData = (dataType) => {
        if (user?.id) {
            switch (dataType) {
                case 'programs':
                    return userDataService.getSavedPrograms(user.id);
                case 'preferences':
                    return userDataService.getUserPreferences(user.id);
                case 'orientationResults':
                    return userDataService.getOrientationResults(user.id);
                case 'applications':
                    return userDataService.getApplications(user.id);
                case 'notifications':
                    return userDataService.getNotifications(user.id);
                default:
                    return null;
            }
        }
        return null;
    };

    const addSavedProgram = (program) => {
        if (user?.id) {
            return userDataService.addSavedProgram(program, user.id);
        }
        return false;
    };

    const removeSavedProgram = (programId) => {
        if (user?.id) {
            return userDataService.removeSavedProgram(programId, user.id);
        }
        return false;
    };

    // Valeurs du contexte
    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        verifyEmail,
        resendVerificationEmail,
        forgotPassword,
        resetPassword,
        clearError,
        setError: setErrorValue,
        isAuthenticated,
        forceLogout,
        ultraForceLogout,
        diagnoseUserSource,
        // Nouvelles méthodes pour la gestion des données
        saveUserData,
        getUserData,
        addSavedProgram,
        removeSavedProgram
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
