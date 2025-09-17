/**
 * Service OAuth2 pour l'authentification Google
 * Gère l'authentification OAuth2 avec Google
 */
class OAuth2Service {
    constructor() {
        this.googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
        this.redirectUri = process.env.REACT_APP_OAUTH2_REDIRECT_URI || `${window.location.origin}/oauth2-success`;
        this.scope = 'openid email profile';
    }

    /**
     * Initialise l'authentification Google OAuth2
     */
    async initiateGoogleAuth() {
        try {
            console.log('🚀 Initialisation de l\'authentification Google OAuth2...');
            
            // Construire l'URL d'autorisation Google
            const authUrl = this.buildGoogleAuthUrl();
            
            console.log('🔗 Redirection vers Google OAuth2:', authUrl);
            
            // Rediriger vers Google OAuth2
            window.location.href = authUrl;
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation OAuth2:', error);
            throw new Error('Erreur lors de l\'initialisation de l\'authentification Google');
        }
    }

    /**
     * Construit l'URL d'autorisation Google
     */
    buildGoogleAuthUrl() {
        const params = new URLSearchParams({
            client_id: this.googleClientId,
            redirect_uri: this.redirectUri,
            scope: this.scope,
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
            state: this.generateState()
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }

    /**
     * Génère un état aléatoire pour la sécurité
     */
    generateState() {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }

    /**
     * Traite le callback OAuth2
     */
    async handleCallback(code, state) {
        try {
            console.log('📥 Traitement du callback OAuth2...');
            
            // Envoyer le code d'autorisation au backend
            const response = await fetch('/api/auth/oauth2/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    state: state,
                    redirectUri: this.redirectUri
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'authentification OAuth2');
            }

            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Authentification OAuth2 réussie');
                return data;
            } else {
                throw new Error(data.message || 'Échec de l\'authentification OAuth2');
            }
            
        } catch (error) {
            console.error('❌ Erreur lors du traitement du callback OAuth2:', error);
            throw error;
        }
    }

    /**
     * Vérifie si Google OAuth2 est configuré
     */
    isConfigured() {
        return this.googleClientId && this.googleClientId !== 'your-google-client-id';
    }

    /**
     * Obtient les informations de configuration OAuth2
     */
    getConfig() {
        return {
            googleClientId: this.googleClientId,
            redirectUri: this.redirectUri,
            scope: this.scope,
            isConfigured: this.isConfigured()
        };
    }
}

// Créer une instance singleton
const oauth2Service = new OAuth2Service();

export default oauth2Service;
