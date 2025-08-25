import React, { useState, useEffect } from 'react';
import oauth2Service from '../services/oauth2Service';
import '../styles/OAuth2Test.css';

const OAuth2Test = () => {
    const [status, setStatus] = useState('idle');
    const [oauth2Status, setOauth2Status] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkOAuth2Status();
    }, []);

    const checkOAuth2Status = async () => {
        try {
            setStatus('checking');
            const result = await oauth2Service.checkOAuth2Status();
            setOauth2Status(result);
            setStatus('success');
        } catch (error) {
            setError(error.message || 'Erreur lors de la vérification');
            setStatus('error');
        }
    };

    const testGoogleLogin = async () => {
        try {
            setStatus('testing');
            setError(null);
            await oauth2Service.initiateGoogleAuth();
        } catch (error) {
            setError(error.message || 'Erreur lors du test Google');
            setStatus('error');
        }
    };

    const getGoogleLoginUrl = async () => {
        try {
            setStatus('getting-url');
            const result = await oauth2Service.getGoogleLoginUrl();
            setOauth2Status(result);
            setStatus('success');
        } catch (error) {
            setError(error.message || 'Erreur lors de la récupération de l\'URL');
            setStatus('error');
        }
    };

    return (
        <div className="oauth2-test-container">
            <h2>🧪 Test OAuth2 Google</h2>
            
            <div className="oauth2-test-section">
                <h3>Statut du service OAuth2</h3>
                <button 
                    onClick={checkOAuth2Status}
                    disabled={status === 'checking'}
                    className="oauth2-test-button"
                >
                    {status === 'checking' ? 'Vérification...' : 'Vérifier le statut'}
                </button>
                
                {oauth2Status && (
                    <div className="oauth2-test-result">
                        <pre>{JSON.stringify(oauth2Status, null, 2)}</pre>
                    </div>
                )}
            </div>

            <div className="oauth2-test-section">
                <h3>Test de connexion Google</h3>
                <button 
                    onClick={testGoogleLogin}
                    disabled={status === 'testing'}
                    className="oauth2-test-button google"
                >
                    {status === 'testing' ? 'Test en cours...' : 'Tester Google Login'}
                </button>
                <p className="oauth2-test-info">
                    Ce bouton redirigera vers l'authentification Google
                </p>
            </div>

            <div className="oauth2-test-section">
                <h3>URL de connexion Google</h3>
                <button 
                    onClick={getGoogleLoginUrl}
                    disabled={status === 'getting-url'}
                    className="oauth2-test-button"
                >
                    {status === 'getting-url' ? 'Récupération...' : 'Obtenir l\'URL Google'}
                </button>
            </div>

            {error && (
                <div className="oauth2-test-error">
                    <h4>❌ Erreur</h4>
                    <p>{error}</p>
                </div>
            )}

            <div className="oauth2-test-info">
                <h4>ℹ️ Informations</h4>
                <ul>
                    <li>Client ID: {process.env.VITE_GOOGLE_CLIENT_ID || 'Non configuré'}</li>
                    <li>API URL: {process.env.VITE_API_URL || 'http://localhost:8084/api'}</li>
                    <li>Backend URL: http://localhost:8084</li>
                </ul>
            </div>
        </div>
    );
};

export default OAuth2Test;
