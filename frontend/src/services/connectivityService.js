import apiClient from '../config/api';

/**
 * Service de connectivité centralisé pour garantir la communication backend-frontend
 */
class ConnectivityService {
    constructor() {
        this.isConnected = false;
        this.lastPing = null;
        this.connectionStatus = 'disconnected';
        this.retryAttempts = 0;
        this.maxRetries = 5;
        this.retryDelay = 2000;
        this.healthCheckInterval = null;
        this.connectionListeners = [];
        
        // Initialiser la surveillance de connectivité
        this.initializeConnectivityMonitoring();
    }

    /**
     * Initialise la surveillance de connectivité
     */
    initializeConnectivityMonitoring() {
        console.log('🔌 Initialisation de la surveillance de connectivité...');
        
        // Premier test de connectivité
        this.checkConnectivity();
        
        // Surveillance continue toutes les 30 secondes
        this.healthCheckInterval = setInterval(() => {
            this.checkConnectivity();
        }, 30000);
        
        // Surveillance de la connectivité réseau
        this.setupNetworkMonitoring();
    }

    /**
     * Configure la surveillance de la connectivité réseau
     */
    setupNetworkMonitoring() {
        // Détecter les changements de connectivité réseau
        window.addEventListener('online', () => {
            console.log('🌐 Connexion réseau rétablie');
            this.onNetworkChange(true);
        });
        
        window.addEventListener('offline', () => {
            console.log('🌐 Connexion réseau perdue');
            this.onNetworkChange(false);
        });
        
        // Détecter la perte de focus de la page (utilisateur change d'onglet)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👁️ Page redevenue visible, vérification de connectivité...');
                this.checkConnectivity();
            }
        });
    }

    /**
     * Gère les changements de connectivité réseau
     */
    onNetworkChange(isOnline) {
        if (isOnline && !this.isConnected) {
            // Réessayer la connexion au backend
            setTimeout(() => {
                this.checkConnectivity();
            }, 1000);
        }
        
        this.notifyConnectionChange({
            isOnline,
            isConnected: this.isConnected,
            status: this.connectionStatus
        });
    }

    /**
     * Vérifie la connectivité avec le backend
     */
    async checkConnectivity() {
        try {
            console.log('🔍 Vérification de la connectivité backend...');
            
            const startTime = performance.now();
            
            // Test de connectivité via l'endpoint de santé - CORRIGÉ
            // Utilise l'endpoint de santé sans préfixe /api (déjà inclus dans baseURL)
            const response = await apiClient.get('/health');
            const responseTime = performance.now() - startTime;
            
            if (response && response.status === 'UP') {
                this.onConnectivitySuccess(responseTime);
            } else {
                this.onConnectivityFailure('Réponse invalide du backend');
            }
            
        } catch (error) {
            console.error('❌ Échec de la vérification de connectivité:', error);
            this.onConnectivityFailure(error.message);
        }
    }

    /**
     * Gère le succès de la connectivité
     */
    onConnectivitySuccess(responseTime) {
        this.isConnected = true;
        this.connectionStatus = 'connected';
        this.lastPing = Date.now();
        this.retryAttempts = 0;
        
        console.log(`✅ Connectivité backend rétablie (${responseTime.toFixed(2)}ms)`);
        
        this.notifyConnectionChange({
            isOnline: navigator.onLine,
            isConnected: true,
            status: 'connected',
            responseTime: responseTime
        });
    }

    /**
     * Gère l'échec de la connectivité
     */
    onConnectivityFailure(error) {
        this.isConnected = false;
        this.retryAttempts++;
        
        if (this.retryAttempts <= this.maxRetries) {
            this.connectionStatus = 'retrying';
            console.log(`🔄 Tentative de reconnexion ${this.retryAttempts}/${this.maxRetries}...`);
            
            // Retry avec délai exponentiel
            setTimeout(() => {
                this.checkConnectivity();
            }, this.retryDelay * Math.pow(2, this.retryAttempts - 1));
            
        } else {
            this.connectionStatus = 'failed';
            console.error('❌ Échec de la connectivité après toutes les tentatives');
        }
        
        this.notifyConnectionChange({
            isOnline: navigator.onLine,
            isConnected: false,
            status: this.connectionStatus,
            error: error,
            retryAttempts: this.retryAttempts
        });
    }

    /**
     * Teste un endpoint spécifique
     */
    async testEndpoint(endpoint, method = 'GET', data = null) {
        try {
            console.log(`🧪 Test de l'endpoint: ${method} ${endpoint}`);
            
            const startTime = performance.now();
            let response;
            
            switch (method.toUpperCase()) {
                case 'GET':
                    response = await apiClient.get(endpoint);
                    break;
                case 'POST':
                    response = await apiClient.post(endpoint, data);
                    break;
                case 'PUT':
                    response = await apiClient.put(endpoint, data);
                    break;
                case 'DELETE':
                    response = await apiClient.delete(endpoint);
                    break;
                default:
                    throw new Error(`Méthode HTTP non supportée: ${method}`);
            }
            
            const responseTime = performance.now() - startTime;
            
            console.log(`✅ Endpoint ${endpoint} testé avec succès (${responseTime.toFixed(2)}ms)`);
            
            return {
                success: true,
                endpoint: endpoint,
                method: method,
                responseTime: responseTime,
                data: response
            };
            
        } catch (error) {
            console.error(`❌ Échec du test de l'endpoint ${endpoint}:`, error);
            
            return {
                success: false,
                endpoint: endpoint,
                method: method,
                error: error.message,
                timestamp: Date.now()
            };
        }
    }

    /**
     * Teste tous les endpoints critiques
     */
    async testAllCriticalEndpoints() {
        console.log('🧪 Test de tous les endpoints critiques...');
        
        const endpoints = [
            { path: '/health', method: 'GET' },
            { path: '/auth/login', method: 'POST', data: { email: 'test@test.com', password: 'test' } },
            { path: '/orientation/majors', method: 'GET' },
            { path: '/programs', method: 'GET' }
        ];
        
        const results = [];
        
        for (const endpoint of endpoints) {
            const result = await this.testEndpoint(endpoint.path, endpoint.method, endpoint.data);
            results.push(result);
            
            // Pause entre les tests pour éviter la surcharge
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        console.log('📊 Résultats des tests d\'endpoints:', results);
        
        return {
            timestamp: Date.now(),
            totalEndpoints: endpoints.length,
            successfulTests: results.filter(r => r.success).length,
            failedTests: results.filter(r => !r.success).length,
            results: results
        };
    }

    /**
     * Ajoute un listener pour les changements de connectivité
     */
    addConnectionListener(listener) {
        this.connectionListeners.push(listener);
        
        // Notifier immédiatement l'état actuel
        listener({
            isOnline: navigator.onLine,
            isConnected: this.isConnected,
            status: this.connectionStatus,
            lastPing: this.lastPing
        });
    }

    /**
     * Supprime un listener de connectivité
     */
    removeConnectionListener(listener) {
        const index = this.connectionListeners.indexOf(listener);
        if (index > -1) {
            this.connectionListeners.splice(index, 1);
        }
    }

    /**
     * Notifie tous les listeners des changements de connectivité
     */
    notifyConnectionChange(status) {
        this.connectionListeners.forEach(listener => {
            try {
                listener(status);
            } catch (error) {
                console.error('Erreur dans un listener de connectivité:', error);
            }
        });
    }

    /**
     * Obtient le statut actuel de la connectivité
     */
    getConnectionStatus() {
        return {
            isOnline: navigator.onLine,
            isConnected: this.isConnected,
            status: this.connectionStatus,
            lastPing: this.lastPing,
            retryAttempts: this.retryAttempts,
            maxRetries: this.maxRetries
        };
    }

    /**
     * Force une vérification de connectivité
     */
    forceConnectivityCheck() {
        console.log('🔄 Vérification forcée de la connectivité...');
        this.checkConnectivity();
    }

    /**
     * Nettoie les ressources
     */
    cleanup() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
        
        this.connectionListeners = [];
        console.log('🧹 Service de connectivité nettoyé');
    }
}

// Instance singleton
const connectivityService = new ConnectivityService();

// Export du service
export default connectivityService;

// Export de la classe pour les tests
export { ConnectivityService };
