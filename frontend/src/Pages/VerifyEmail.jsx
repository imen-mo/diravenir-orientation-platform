import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/VerifyEmail.css';
import GlobalLayout from '../components/GlobalLayout';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(5);

    const rawToken = searchParams.get('token');
    const token = rawToken ? rawToken.replace(/^["']|["']$/g, '') : null;
    
    // Référence pour éviter les appels multiples (au niveau du composant)
    const hasVerified = React.useRef(false);

    useEffect(() => {
        if (!token) {
            setVerificationStatus('error');
            setMessage('❌ Token de vérification manquant');
            return;
        }

        // Éviter les appels multiples
        if (!hasVerified.current) {
            hasVerified.current = true;
            verifyEmail();
        }
    }, [token]);

    useEffect(() => {
        if (verificationStatus === 'success' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (verificationStatus === 'success' && countdown === 0) {
            navigate('/login');
        }
    }, [verificationStatus, countdown, navigate]);

    const verifyEmail = async () => {
        try {
            console.log('🔍 Token de vérification:', token);
            console.log('🔍 Token nettoyé:', token);
            
            // Protection renforcée contre les appels multiples
            if (verificationStatus === 'loading' || verificationStatus === 'success') {
                console.log('🔒 Vérification déjà en cours ou terminée, arrêt de l\'appel');
                return;
            }
            
            setVerificationStatus('loading');
            
            const response = await fetch(`http://localhost:8084/api/auth/verify-email?token=${token}`);
            const result = await response.json();

            console.log('🔍 Réponse de vérification:', result);

            if (result.status === 'success') {
                setVerificationStatus('success');
                setMessage(result.message);
            } else {
                setVerificationStatus('error');
                setMessage(result.message || '❌ Échec de la vérification email');
            }
        } catch (error) {
            console.error('❌ Erreur lors de la vérification:', error);
            setVerificationStatus('error');
            setMessage('❌ Erreur lors de la vérification. Veuillez réessayer.');
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoToHome = () => {
        navigate('/');
    };

    if (verificationStatus === 'verifying') {
        return (
            <GlobalLayout activePage="verify-email">
                <div className="verify-email-container">
                <div className="verify-email-card">
                    <div className="verification-loading">
                        <div className="loading-spinner"></div>
                        <h2>🔐 Vérification en cours...</h2>
                        <p>Veuillez patienter pendant que nous vérifions votre email.</p>
                    </div>
                </div>
            </div>
        </GlobalLayout>
        );
    }

    return (
        <GlobalLayout activePage="verify-email">
            <div className="verify-email-container">
            <div className="verify-email-card">
                {verificationStatus === 'success' ? (
                    <div className="verification-success">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                        </div>
                        <h2>✅ Vérification Réussie !</h2>
                        <p className="success-message">{message}</p>
                        
                        <div className="countdown-info">
                            <p>Redirection automatique vers la page de connexion dans :</p>
                            <div className="countdown-timer">{countdown}</div>
                        </div>

                        <div className="verification-actions">
                            <button onClick={handleGoToLogin} className="primary-button">
                                Se connecter maintenant
                            </button>
                            <button onClick={handleGoToHome} className="secondary-button">
                                Retour à l'accueil
                            </button>
                        </div>

                        <div className="verification-note">
                            <p><strong>🎉 Félicitations !</strong></p>
                            <p>Votre compte est maintenant actif. Vous pouvez vous connecter et accéder à toutes les fonctionnalités de Diravenir.</p>
                        </div>
                    </div>
                ) : (
                    <div className="verification-error">
                        <div className="error-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <h2>❌ Vérification Échouée</h2>
                        <p className="error-message">{message}</p>
                        
                        <div className="verification-actions">
                            <button onClick={handleGoToHome} className="primary-button">
                                Retour à l'accueil
                            </button>
                            <button onClick={() => navigate('/register')} className="secondary-button">
                                S'inscrire à nouveau
                            </button>
                        </div>

                        <div className="verification-help">
                            <p><strong>💡 Besoin d'aide ?</strong></p>
                            <ul>
                                <li>Vérifiez que le lien dans votre email est complet</li>
                                <li>Le lien peut avoir expiré (24h)</li>
                                <li>Contactez le support si le problème persiste</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </GlobalLayout>
    );
};

export default VerifyEmail;
