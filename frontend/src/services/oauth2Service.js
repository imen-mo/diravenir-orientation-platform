import axios from 'axios';
import connectivityService from './connectivityService.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8084';

// Configuration axios pour OAuth2 avec gestion des cookies
const oauth2Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important pour les cookies et sessions
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour vérifier la connectivité avant chaque requête
oauth2Axios.interceptors.request.use(
    async (config) => {
        // Vérifier la connectivité avant d'envoyer la requête
        const status = connectivityService.getConnectionStatus();
        
        if (!status.isConnected && !status.isOnline) {
            throw new Error('Aucune connectivité réseau disponible');
        }
        
        if (!status.isConnected) {
            console.log('🔄 Tentative de reconnexion avant requête OAuth2...');
            await connectivityService.forceConnectivityCheck();
            
            // Attendre un peu pour la reconnexion
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newStatus = connectivityService.getConnectionStatus();
            if (!newStatus.isConnected) {
                throw new Error('Impossible de se connecter au backend');
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Service OAuth2 pour l'authentification Google
 */
const oauth2Service = {
    /**
     * Démarre l'authentification Google
     */
    async initiateGoogleAuth() {
        try {
            console.log('🚀 Démarrage de l\'authentification Google...');
            
            // Vérifier la connectivité avec le backend
            try {
                await oauth2Axios.get('/api/health');
                console.log('✅ Backend accessible');
            } catch (error) {
                console.error('❌ Backend inaccessible:', error.message);
                throw new Error('Le serveur backend n\'est pas accessible. Vérifiez qu\'il est démarré sur le port 8084.');
            }
            
            // Rediriger vers l'endpoint OAuth2 de Spring Security
            const googleAuthUrl = `${API_BASE_URL}/oauth2/authorization/google`;
            console.log('🔗 Redirection vers:', googleAuthUrl);
            
            // Stocker l'état de l'authentification en cours
            localStorage.setItem('oauth2_in_progress', 'true');
            localStorage.setItem('oauth2_timestamp', Date.now().toString());
            
            // Redirection avec gestion d'erreur
            window.location.href = googleAuthUrl;
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation de l\'auth Google:', error);
            throw error;
        }
    },

    /**
     * Traite le callback OAuth2 depuis le backend
     */
    async handleGoogleCallback(userData) {
        try {
            console.log('🔄 Traitement du callback OAuth2:', userData);
            
            const response = await oauth2Axios.post('/api/oauth2/google/callback', userData);
            console.log('✅ Callback OAuth2 traité avec succès:', response.data);
            
            // Nettoyer l'état d'authentification en cours
            localStorage.removeItem('oauth2_in_progress');
            localStorage.removeItem('oauth2_timestamp');
            
            return response.data;
        } catch (error) {
            console.error('❌ Erreur lors du callback Google:', error);
            
            // Nettoyer l'état d'authentification en cours même en cas d'erreur
            localStorage.removeItem('oauth2_in_progress');
            localStorage.removeItem('oauth2_timestamp');
            
            throw error.response?.data || error.message;
        }
    },

    /**
     * Vérifie le statut du service OAuth2
     */
    async checkOAuth2Status() {
        try {
            console.log('🔍 Vérification du statut OAuth2...');
            
            const response = await oauth2Axios.get('/api/oauth2/status');
            console.log('✅ Statut OAuth2 récupéré:', response.data);
            
            return response.data;
        } catch (error) {
            console.error('❌ Erreur lors de la vérification du statut OAuth2:', error);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Obtient l'URL de connexion Google
     */
    async getGoogleLoginUrl() {
        try {
            console.log('🔗 Récupération de l\'URL de connexion Google...');
            
            const response = await oauth2Axios.get('/api/oauth2/google/login-url');
            console.log('✅ URL de connexion Google récupérée:', response.data);
            
            return response.data;
        } catch (error) {
            console.error('❌ Erreur lors de la récupération de l\'URL Google:', error);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Traite la redirection OAuth2 depuis l'URL
     */
    processOAuth2Redirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const name = urlParams.get('name');
        const givenName = urlParams.get('givenName');
        const familyName = urlParams.get('familyName');
        const picture = urlParams.get('picture');
        const sessionId = urlParams.get('sessionId');
        const error = urlParams.get('error');

        console.log('🔄 Traitement de la redirection OAuth2:', {
            email, name, givenName, familyName, picture, sessionId, error
        });

        if (error) {
            console.error('❌ Erreur OAuth2 détectée:', error);
            return {
                success: false,
                error: error,
                message: 'Échec de l\'authentification Google'
            };
        }

        if (email && name) {
            // Stocker les informations utilisateur OAuth2
            const oauth2UserData = {
                email: email,
                name: name,
                givenName: givenName || '',
                familyName: familyName || '',
                picture: picture || '',
                sessionId: sessionId || '',
                isOAuth2User: true
            };
            
            localStorage.setItem('oauth2_user_data', JSON.stringify(oauth2UserData));
            localStorage.setItem('oauth2_authenticated', 'true');
            
            console.log('✅ Utilisateur OAuth2 authentifié:', oauth2UserData);
            
            return {
                success: true,
                user: oauth2UserData,
                message: 'Authentification Google réussie'
            };
        }

        return null;
    },

    /**
     * Vérifie si l'utilisateur est authentifié via OAuth2
     */
    isOAuth2Authenticated() {
        const isAuthenticated = localStorage.getItem('oauth2_authenticated') === 'true';
        const userData = localStorage.getItem('oauth2_user_data');
        
        if (isAuthenticated && userData) {
            try {
                const user = JSON.parse(userData);
                const timestamp = localStorage.getItem('oauth2_timestamp');
                
                // Vérifier si l'authentification n'est pas trop ancienne (24h)
                if (timestamp && (Date.now() - parseInt(timestamp)) < 24 * 60 * 60 * 1000) {
                    return true;
                } else {
                    // Authentification expirée, nettoyer
                    this.clearOAuth2Data();
                    return false;
                }
            } catch (error) {
                console.error('❌ Erreur lors de la vérification OAuth2:', error);
                this.clearOAuth2Data();
                return false;
            }
        }
        
        return false;
    },

    /**
     * Récupère les données utilisateur OAuth2
     */
    getOAuth2UserData() {
        const userData = localStorage.getItem('oauth2_user_data');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.error('❌ Erreur lors de la récupération des données OAuth2:', error);
                return null;
            }
        }
        return null;
    },

    /**
     * Déconnecte l'utilisateur OAuth2
     */
    async logout() {
        try {
            console.log('🔓 Déconnexion OAuth2...');
            
            await oauth2Axios.post('/api/oauth2/logout');
            this.clearOAuth2Data();
            
            console.log('✅ Déconnexion OAuth2 réussie');
            return { success: true, message: 'Déconnexion réussie' };
        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion OAuth2:', error);
            
            // Nettoyer quand même côté client
            this.clearOAuth2Data();
            
            return { success: false, message: 'Erreur lors de la déconnexion' };
        }
    },

    /**
     * Nettoie toutes les données OAuth2
     */
    clearOAuth2Data() {
        localStorage.removeItem('oauth2_authenticated');
        localStorage.removeItem('oauth2_user_data');
        localStorage.removeItem('oauth2_in_progress');
        localStorage.removeItem('oauth2_timestamp');
        
        console.log('🧹 Données OAuth2 nettoyées');
    }
};

export default oauth2Service;
