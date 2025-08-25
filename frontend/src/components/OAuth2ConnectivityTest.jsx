import React, { useState, useEffect } from 'react';
import oauth2Service from '../services/oauth2Service';
import '../styles/OAuth2ConnectivityTest.css';

const OAuth2ConnectivityTest = () => {
    const [testResults, setTestResults] = useState({
        backend: 'pending',
        oauth2: 'pending',
        google: 'pending'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const runConnectivityTests = async () => {
        setLoading(true);
        setError(null);
        
        const results = {
            backend: 'pending',
            oauth2: 'pending',
            google: 'pending'
        };

        try {
            // Test 1: Connectivité backend
            try {
                await oauth2Service.checkOAuth2Status();
                results.backend = 'success';
                console.log('✅ Test backend: SUCCÈS');
            } catch (error) {
                results.backend = 'error';
                console.error('❌ Test backend: ÉCHEC', error.message);
            }

            // Test 2: Endpoint OAuth2
            try {
                const loginUrl = await oauth2Service.getGoogleLoginUrl();
                results.oauth2 = 'success';
                console.log('✅ Test OAuth2: SUCCÈS', loginUrl);
            } catch (error) {
                results.oauth2 = 'error';
                console.error('❌ Test OAuth2: ÉCHEC', error.message);
            }

            // Test 3: Configuration Google
            try {
                const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
                if (googleClientId && googleClientId.length > 0) {
                    results.google = 'success';
                    console.log('✅ Test Google: SUCCÈS - Client ID configuré');
                } else {
                    results.google = 'error';
                    console.error('❌ Test Google: ÉCHEC - Client ID manquant');
                }
            } catch (error) {
                results.google = 'error';
                console.error('❌ Test Google: ÉCHEC', error.message);
            }

            setTestResults(results);
            
        } catch (error) {
            setError('Erreur lors des tests de connectivité: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'pending':
                return '⏳';
            default:
                return '❓';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'success':
                return 'SUCCÈS';
            case 'error':
                return 'ÉCHEC';
            case 'pending':
                return 'EN ATTENTE';
            default:
                return 'INCONNU';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'success':
                return 'status-success';
            case 'error':
                return 'status-error';
            case 'pending':
                return 'status-pending';
            default:
                return 'status-unknown';
        }
    };

    useEffect(() => {
        runConnectivityTests();
    }, []);

    return (
        <div className="oauth2-connectivity-test">
            <h3>🧪 Test de Connectivité OAuth2</h3>
            
            <div className="test-controls">
                <button 
                    onClick={runConnectivityTests}
                    disabled={loading}
                    className="test-button"
                >
                    {loading ? '🔄 Tests en cours...' : '🔄 Relancer les tests'}
                </button>
            </div>

            {error && (
                <div className="test-error">
                    <span>❌ {error}</span>
                </div>
            )}

            <div className="test-results">
                <div className="test-item">
                    <span className="test-label">Backend (Port 8084):</span>
                    <span className={`test-status ${getStatusClass(testResults.backend)}`}>
                        {getStatusIcon(testResults.backend)} {getStatusText(testResults.backend)}
                    </span>
                </div>

                <div className="test-item">
                    <span className="test-label">Endpoint OAuth2:</span>
                    <span className={`test-status ${getStatusClass(testResults.oauth2)}`}>
                        {getStatusIcon(testResults.oauth2)} {getStatusText(testResults.oauth2)}
                    </span>
                </div>

                <div className="test-item">
                    <span className="test-label">Configuration Google:</span>
                    <span className={`test-status ${getStatusClass(testResults.google)}`}>
                        {getStatusIcon(testResults.google)} {getStatusText(testResults.google)}
                    </span>
                </div>
            </div>

            <div className="test-info">
                <h4>📋 Informations de Configuration</h4>
                <div className="config-info">
                    <div><strong>Backend URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8084'}</div>
                    <div><strong>Frontend URL:</strong> {import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}</div>
                    <div><strong>Google Client ID:</strong> {import.meta.env.VITE_GOOGLE_CLIENT_ID ? '✅ Configuré' : '❌ Manquant'}</div>
                </div>
            </div>

            <div className="test-troubleshooting">
                <h4>🔧 Dépannage</h4>
                <ul>
                    <li><strong>Backend inaccessible:</strong> Vérifiez que le serveur Spring Boot est démarré sur le port 8084</li>
                    <li><strong>OAuth2 échoue:</strong> Vérifiez la configuration OAuth2 dans application.properties</li>
                    <li><strong>Google non configuré:</strong> Vérifiez les variables d'environnement VITE_GOOGLE_CLIENT_ID</li>
                    <li><strong>Problèmes CORS:</strong> Vérifiez la configuration CORS dans SecurityConfig.java</li>
                </ul>
            </div>
        </div>
    );
};

export default OAuth2ConnectivityTest;
