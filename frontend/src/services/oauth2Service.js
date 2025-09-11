import apiClient from '../config/api.js';

/**
 * Service OAuth2 pour l'authentification Google
 */
class OAuth2Service {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8084';
        this.frontendURL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000';
    }

    /**
     * Initie l'authentification Google pour la connexion
     */
    async initiateGoogleAuth() {
        try {
            console.log('🚀 Initiation de l\'authentification Google...');
            
            // Rediriger vers l'endpoint OAuth2 de Spring Security
            const googleAuthUrl = `${this.baseURL}/oauth2/authorization/google`;
            
            console.log('🔗 Redirection vers:', googleAuthUrl);
            
            // Redirection vers Google OAuth2
            window.location.href = googleAuthUrl;
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initiation de l\'authentification Google:', error);
            throw new Error('Erreur lors de l\'authentification Google');
        }
    }

    /**
     * Initie l'authentification Google pour l'inscription
     */
    async initiateGoogleSignup() {
        try {
            console.log('🚀 Initiation de l\'inscription Google...');
            
            // Pour l'inscription, on utilise le même endpoint mais on peut ajouter des paramètres
            const googleSignupUrl = `${this.baseURL}/oauth2/authorization/google?action=signup`;
            
            console.log('🔗 Redirection vers:', googleSignupUrl);
            
            // Redirection vers Google OAuth2
            window.location.href = googleSignupUrl;
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initiation de l\'inscription Google:', error);
            throw new Error('Erreur lors de l\'inscription Google');
        }
    }

    /**
     * Traite le callback OAuth2 après authentification
     */
    async handleOAuth2Callback(urlParams) {
        try {
            console.log('🔄 Traitement du callback OAuth2...');
            
            const token = urlParams.get('token');
            const refreshToken = urlParams.get('refreshToken');
            const userEmail = urlParams.get('userEmail');
            const userName = urlParams.get('userName');
            const role = urlParams.get('role');
            const emailVerified = urlParams.get('emailVerified') === 'true';
            const authProvider = urlParams.get('authProvider');
            const userId = urlParams.get('userId');
            const photoProfil = urlParams.get('photoProfil');
            const success = urlParams.get('success') === 'true';
            const message = urlParams.get('message');

            if (!success || !token) {
                throw new Error(message || 'Échec de l\'authentification OAuth2');
            }

            // Stocker les informations d'authentification
            this.storeAuthData({
                token,
                refreshToken,
                userEmail,
                userName,
                role,
                emailVerified,
                authProvider,
                userId,
                photoProfil
            });

            console.log('✅ Authentification OAuth2 réussie pour:', userEmail);
            
            return {
                success: true,
                message: message || 'Authentification Google réussie',
                user: {
                    email: userEmail,
                    name: userName,
                    role: role,
                    emailVerified: emailVerified,
                    authProvider: authProvider,
                    userId: userId,
                    photoProfil: photoProfil
                }
            };

        } catch (error) {
            console.error('❌ Erreur lors du traitement du callback OAuth2:', error);
            throw error;
        }
    }

    /**
     * Stocke les données d'authentification
     */
    storeAuthData(authData) {
        try {
            // Stocker le token JWT
            if (authData.token) {
                localStorage.setItem('token', authData.token);
                document.cookie = `jwt_token=${authData.token}; path=/; max-age=86400; secure; samesite=strict`;
            }

            // Stocker le refresh token
            if (authData.refreshToken) {
                localStorage.setItem('refreshToken', authData.refreshToken);
            }

            // Stocker les informations utilisateur
            const userInfo = {
                email: authData.userEmail,
                name: authData.userName,
                role: authData.role,
                emailVerified: authData.emailVerified,
                authProvider: authData.authProvider,
                userId: authData.userId,
                photoProfil: authData.photoProfil
            };

            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Mettre à jour l'état global
            if (window.authState) {
                window.authState.isAuthenticated = true;
                window.authState.token = authData.token;
                window.authState.userInfo = userInfo;
            }

            console.log('💾 Données d\'authentification stockées');

        } catch (error) {
            console.error('❌ Erreur lors du stockage des données d\'authentification:', error);
        }
    }

    /**
     * Récupère les informations utilisateur OAuth2
     */
    async getOAuth2User(email, name = null, givenName = null, familyName = null) {
        try {
            console.log('🔍 Récupération des informations OAuth2 pour:', email);
            
            const params = new URLSearchParams({
                email: email
            });

            if (name) params.append('name', name);
            if (givenName) params.append('givenName', givenName);
            if (familyName) params.append('familyName', familyName);

            const response = await apiClient.get(`/auth/oauth2-user?${params.toString()}`);
            
            console.log('✅ Informations OAuth2 récupérées:', response);
            return response;

        } catch (error) {
            console.error('❌ Erreur lors de la récupération des informations OAuth2:', error);
            throw error;
        }
    }

    /**
     * Déconnecte l'utilisateur OAuth2
     */
    async logout() {
        try {
            console.log('🚪 Déconnexion OAuth2...');
            
            // Nettoyer les données locales
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            
            // Nettoyer les cookies
            document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Mettre à jour l'état global
            if (window.authState) {
                window.authState.isAuthenticated = false;
                window.authState.token = null;
                window.authState.userInfo = null;
            }

            console.log('✅ Déconnexion OAuth2 réussie');

        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion OAuth2:', error);
            throw error;
        }
    }

    /**
     * Vérifie si l'utilisateur est authentifié via OAuth2
     */
    isAuthenticated() {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('userInfo');
        
        if (!token || !userInfo) {
            return false;
        }

        try {
            // Vérifier si le token n'est pas expiré
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp > currentTime;
        } catch (error) {
            console.warn('⚠️ Erreur lors de la vérification du token OAuth2:', error);
            return false;
        }
    }

    /**
     * Récupère les informations utilisateur actuelles
     */
    getCurrentUser() {
        try {
            const userInfo = localStorage.getItem('userInfo');
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.warn('⚠️ Erreur lors de la récupération des informations utilisateur:', error);
            return null;
        }
    }
}

// Instance singleton
const oauth2Service = new OAuth2Service();

export default oauth2Service;
