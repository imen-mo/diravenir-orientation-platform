import axios from 'axios';
import apiClient from '../config/api.js';

// Configuration axios avec intercepteurs
const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8084',
    withCredentials: true, // Important pour les cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT aux requêtes
authAxios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs d'authentification
authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expiré ou invalide
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Gestion des cookies
const COOKIE_NAME = 'jwt_token';
const COOKIE_OPTIONS = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 heures
};

/**
 * Définit un cookie sécurisé
 */
function setCookie(name, value, options = {}) {
    const opts = { ...COOKIE_OPTIONS, ...options };
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    
    if (opts.maxAge) {
        cookieString += `; max-age=${opts.maxAge}`;
    }
    if (opts.path) {
        cookieString += `; path=${opts.path}`;
    }
    if (opts.secure) {
        cookieString += '; secure';
    }
    if (opts.sameSite) {
        cookieString += `; samesite=${opts.sameSite}`;
    }
    
    document.cookie = cookieString;
}

/**
 * Récupère un cookie par nom
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
}

/**
 * Supprime un cookie
 */
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Stocke le token JWT dans un cookie sécurisé
 */
function setAuthToken(token) {
    setCookie(COOKIE_NAME, token);
    
    // Stocker aussi en localStorage pour compatibilité
    localStorage.setItem('token', token);
    
    // Mettre à jour l'état global
    if (window.authState) {
        window.authState.isAuthenticated = true;
        window.authState.token = token;
    }
}

/**
 * Récupère le token JWT depuis le cookie ou localStorage
 */
function getAuthToken() {
    // Priorité aux cookies (plus sécurisé)
    const cookieToken = getCookie(COOKIE_NAME);
    if (cookieToken) {
        return cookieToken;
    }
    
    // Fallback vers localStorage
    return localStorage.getItem('token');
}

/**
 * Supprime le token JWT
 */
function clearAuthToken() {
    deleteCookie(COOKIE_NAME);
    localStorage.removeItem('token');
    
    // Mettre à jour l'état global
    if (window.authState) {
        window.authState.isAuthenticated = false;
        window.authState.token = null;
    }
}

/**
 * Vérifie si l'utilisateur est authentifié
 */
function isAuthenticated() {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
        // Vérifier si le token n'est pas expiré (basique)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
    } catch (error) {
        console.warn('Erreur lors de la vérification du token:', error);
        return false;
    }
}

/**
 * Stocke les informations utilisateur
 */
function setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // Mettre à jour l'état global
    if (window.authState) {
        window.authState.userInfo = userInfo;
    }
}

/**
 * Récupère les informations utilisateur
 */
function getUserInfo() {
    try {
        const stored = localStorage.getItem('userInfo');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.warn('Erreur lors de la récupération des infos utilisateur:', error);
        return null;
    }
}

/**
 * Nettoie toutes les données d'authentification
 */
function clearAuthData() {
    clearAuthToken();
    localStorage.removeItem('userInfo');
    
    // Mettre à jour l'état global
    if (window.authState) {
        window.authState.isAuthenticated = false;
        window.authState.token = null;
        window.authState.userInfo = null;
    }
}

// Service d'authentification principal
const authService = {
    /**
     * Connexion utilisateur - CORRIGÉE pour utiliser la configuration centralisée
     */
    async login(credentials) {
        try {
            // Utiliser le client API centralisé au lieu d'axios direct
            const response = await apiClient.post('/auth/login', credentials);
            
            if (response.token) {
                setAuthToken(response.token);
                setUserInfo({
                    email: response.userEmail,
                    name: response.userName,
                    role: response.role,
                });
            }
            
            return response;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw error;
        }
    },

    /**
     * Déconnexion utilisateur
     */
    async logout() {
        try {
            // Appeler l'endpoint de déconnexion côté serveur
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.warn('Erreur lors de la déconnexion côté serveur:', error);
        } finally {
            // Nettoyer les données côté client
            clearAuthData();
        }
    },

    /**
     * Vérification d'email
     */
    async verifyEmail(token) {
        try {
            const response = await apiClient.get(`/auth/verify-email?token=${token}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Renvoi d'email de vérification
     */
    async resendVerificationEmail(email) {
        try {
            const response = await apiClient.post(`/auth/resend-verification?email=${email}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Demande de réinitialisation de mot de passe
     */
    async forgotPassword(email) {
        try {
            const response = await apiClient.post(`/auth/forgot-password?email=${email}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Réinitialisation de mot de passe
     */
    async resetPassword(token, newPassword) {
        try {
            const response = await apiClient.post(`/auth/reset-password?token=${token}&newPassword=${newPassword}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Vérification du statut d'authentification
     */
    async checkAuthStatus() {
        try {
            const response = await apiClient.get('/auth/me');
            return response;
        } catch (error) {
            // Si erreur 401, l'utilisateur n'est pas authentifié
            if (error.message?.includes('401')) {
                return null;
            }
            throw error;
        }
    },

    // Getters
    getToken: getAuthToken,
    isAuthenticated,
    getUserInfo,
};

export default authService;
