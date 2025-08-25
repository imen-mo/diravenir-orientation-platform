import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GlobalLayout from '../components/GlobalLayout';

const OAuth2Failure = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState('Erreur d\'authentification OAuth2');

    useEffect(() => {
        // Récupérer l'erreur depuis l'URL
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError(decodeURIComponent(errorParam));
        }
        
        console.error('❌ Échec OAuth2:', errorParam);
    }, [searchParams]);

    const handleRetry = () => {
        navigate('/register');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <GlobalLayout activePage="oauth2-failure">
            <div className="oauth2-failure-container">
                <div className="oauth2-failure-content">
                    <div className="oauth2-failure-error">
                        <div className="oauth2-failure-error-icon">❌</div>
                        <h1>Authentification échouée</h1>
                        <p className="oauth2-failure-message">
                            Nous n'avons pas pu vous connecter avec Google.
                        </p>
                        
                        {error && (
                            <div className="oauth2-failure-details">
                                <h3>Détails de l'erreur :</h3>
                                <p className="oauth2-failure-error-text">{error}</p>
                            </div>
                        )}
                        
                        <div className="oauth2-failure-suggestions">
                            <h3>Suggestions :</h3>
                            <ul>
                                <li>Vérifiez votre connexion internet</li>
                                <li>Assurez-vous que les cookies sont activés</li>
                                <li>Essayez de vider le cache de votre navigateur</li>
                                <li>Vérifiez que vous n'avez pas de bloqueur de publicités actif</li>
                            </ul>
                        </div>
                        
                        <div className="oauth2-failure-actions">
                            <button 
                                onClick={handleRetry}
                                className="oauth2-failure-retry-button"
                            >
                                🔄 Réessayer
                            </button>
                            
                            <button 
                                onClick={handleGoHome}
                                className="oauth2-failure-home-button"
                            >
                                🏠 Retour à l'accueil
                            </button>
                        </div>
                        
                        <div className="oauth2-failure-alternative">
                            <p>
                                Vous pouvez aussi vous inscrire avec un email et mot de passe :{' '}
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="oauth2-failure-link"
                                >
                                    Créer un compte
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default OAuth2Failure;
