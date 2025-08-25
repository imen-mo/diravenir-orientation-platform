import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/VerifyEmailSent.css';
import GlobalLayout from '../components/GlobalLayout';

const VerifyEmailSent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState('');

    // Récupérer l'email depuis la navigation
    const email = location.state?.email || 'votre email';

    const handleResendEmail = async () => {
        setIsResending(true);
        setResendMessage('');
        
        try {
            const response = await fetch('http://localhost:8084/api/auth/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setResendMessage('✅ Email de vérification renvoyé avec succès !');
            } else {
                const error = await response.json();
                setResendMessage(`❌ Erreur: ${error.message || 'Impossible de renvoyer l\'email'}`);
            }
        } catch (error) {
            setResendMessage('❌ Erreur réseau lors de l\'envoi');
        } finally {
            setIsResending(false);
        }
    };

    const handleBackToLogin = () => {
        logout();
        navigate('/login');
    };

    return (
        <GlobalLayout activePage="verify-email-sent">
            <div className="verify-email-container">
            <div className="verify-email-card">
                <div className="verify-email-header">
                    <h1>📧 Vérifiez Votre Email</h1>
                    <p>Un email de vérification a été envoyé à :</p>
                    <div className="email-display">
                        <strong>{email}</strong>
                    </div>
                </div>

                <div className="verify-email-content">
                    <div className="verification-steps">
                        <h3>📋 Étapes de Vérification :</h3>
                        <ol>
                            <li>Vérifiez votre boîte de réception</li>
                            <li>Cliquez sur le lien de vérification dans l'email</li>
                            <li>Votre compte sera activé automatiquement</li>
                            <li>Vous pourrez alors vous connecter</li>
                        </ol>
                    </div>

                    <div className="verification-actions">
                        <button 
                            onClick={handleResendEmail}
                            disabled={isResending}
                            className="resend-button"
                        >
                            {isResending ? '🔄 Envoi...' : '📤 Renvoyer l\'Email'}
                        </button>

                        <button 
                            onClick={handleBackToLogin}
                            className="back-button"
                        >
                            ← Retour à la Connexion
                        </button>
                    </div>

                    {resendMessage && (
                        <div className={`resend-message ${resendMessage.includes('✅') ? 'success' : 'error'}`}>
                            {resendMessage}
                        </div>
                    )}

                    <div className="verification-note">
                        <p><strong>⚠️ Important :</strong></p>
                        <ul>
                            <li>Vérifiez aussi votre dossier spam</li>
                            <li>L'email peut prendre quelques minutes à arriver</li>
                            <li>Vous ne pouvez pas accéder aux pages protégées sans vérification</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </GlobalLayout>
    );
};

export default VerifyEmailSent;
