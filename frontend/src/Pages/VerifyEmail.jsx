import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import GlobalNavbar from '../components/GlobalNavbar';
import Footer from '../components/Footer';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('Vérification de votre email en cours...');
    const [countdown, setCountdown] = useState(5);

    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        } else {
            setStatus('error');
            setMessage('Token de vérification manquant');
        }
    }, [token]);

    useEffect(() => {
        if (status === 'success' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            navigate('/');
        }
    }, [status, countdown, navigate]);

    const verifyEmail = async (verificationToken) => {
        try {
            console.log('🔍 Vérification du token:', verificationToken);
            
            const response = await API.post('/auth/verify-email', { token: verificationToken });
            
            console.log('✅ Email vérifié avec succès:', response.data);
            setStatus('success');
            setMessage('🎉 Votre email a été vérifié avec succès ! Redirection vers l\'accueil dans 5 secondes...');
            
        } catch (error) {
            console.error('❌ Erreur lors de la vérification:', error);
            
            if (error.response?.status === 400) {
                setStatus('error');
                setMessage('❌ Token invalide ou expiré. Veuillez demander un nouvel email de vérification.');
            } else if (error.response?.status === 409) {
                setStatus('error');
                setMessage('⚠️ Cet email a déjà été vérifié. Vous pouvez vous connecter.');
            } else {
                setStatus('error');
                setMessage('❌ Erreur lors de la vérification. Veuillez réessayer ou contacter le support.');
            }
        }
    };

    const handleResendEmail = async () => {
        try {
            setStatus('verifying');
            setMessage('Envoi d\'un nouvel email de vérification...');
            
            // Récupérer l'email depuis le token ou demander à l'utilisateur
            const response = await API.post('/auth/resend-verification', { 
                email: 'email@example.com' // À adapter selon votre logique
            });
            
            setStatus('success');
            setMessage('📧 Nouvel email de vérification envoyé ! Vérifiez votre boîte email.');
            
        } catch (error) {
            setStatus('error');
            setMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'verifying': return '⏳';
            case 'success': return '✅';
            case 'error': return '❌';
            default: return '⏳';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'verifying': return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'success': return 'bg-green-50 border-green-200 text-green-800';
            case 'error': return 'bg-red-50 border-red-200 text-red-800';
            default: return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <GlobalNavbar activePage="verify-email" />
            
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    <div className={`p-8 rounded-lg border-2 ${getStatusColor()} shadow-lg`}>
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">{getStatusIcon()}</div>
                            <h1 className="text-2xl font-bold mb-2">Vérification d'Email</h1>
                            <p className="text-sm opacity-75">DirAvenir</p>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-lg">{message}</p>
                            
                            {status === 'success' && (
                                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                    <p className="text-sm">
                                        Redirection automatique dans <span className="font-bold">{countdown}</span> secondes...
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {status === 'success' && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    🏠 Aller à l'accueil maintenant
                                </button>
                            )}

                            {status === 'error' && (
                                <>
                                    <button
                                        onClick={handleResendEmail}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        📧 Renvoyer l'email de vérification
                                    </button>
                                    
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        🔐 Aller à la connexion
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                🏠 Retour à l'accueil
                            </button>
                        </div>

                        {token && (
                            <div className="mt-6 p-3 bg-gray-100 rounded-lg">
                                <p className="text-xs text-gray-600">
                                    <strong>Token reçu :</strong> {token.substring(0, 20)}...
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>
            
            <Footer />
        </div>
    );
};

export default VerifyEmail;
