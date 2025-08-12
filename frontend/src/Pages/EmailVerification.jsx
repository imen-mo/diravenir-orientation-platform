import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import '../pages/SignUp.css';

export default function EmailVerification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (!token) {
            setError('Token de vérification manquant');
            setVerificationStatus('error');
            return;
        }

        // Vérification réelle du token via l'API backend
        const verifyEmail = async () => {
            try {
                console.log('🔍 Vérification du token:', token);
                
                // Appel à l'API backend pour vérifier le token
                const response = await fetch(`http://localhost:8084/api/auth/verify-email?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    console.log('✅ Email vérifié avec succès');
                    setVerificationStatus('success');
                    
                    // Rediriger vers la page d'accueil après 3 secondes
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    console.error('❌ Erreur de vérification:', errorData);
                    setError(errorData.message || 'Erreur lors de la vérification de l\'email');
                    setVerificationStatus('error');
                }
                
            } catch (err) {
                console.error('❌ Erreur de connexion:', err);
                setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré.');
                setVerificationStatus('error');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    if (verificationStatus === 'verifying') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full space-y-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center">
                        <img src={logo} alt="DirAvenir Logo" className="h-16 w-auto" />
                    </div>
                    <div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Vérification en cours...
                        </h2>
                        <div className="mt-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Veuillez patienter pendant que nous vérifions votre email.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (verificationStatus === 'error') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full space-y-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center">
                        <img src={logo} alt="DirAvenir Logo" className="h-16 w-auto" />
                    </div>
                    <div>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Erreur de vérification
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {error || 'Une erreur s\'est produite lors de la vérification de votre email.'}
                        </p>
                        <div className="mt-6 space-y-3">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                📧 Créer un nouveau compte
                            </button>
                            
                            <button
                                onClick={() => navigate('/signin')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                🔐 Aller à la connexion
                            </button>
                            
                            <button
                                onClick={() => navigate('/')}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                🏠 Retour à l'accueil
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full space-y-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-center">
                    <img src={logo} alt="DirAvenir Logo" className="h-16 w-auto" />
                </div>
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Email vérifié avec succès !
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Votre compte a été activé avec succès. Vous allez être redirigé vers la page d'accueil dans quelques secondes.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/', { replace: true })}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Aller à l'accueil maintenant
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
