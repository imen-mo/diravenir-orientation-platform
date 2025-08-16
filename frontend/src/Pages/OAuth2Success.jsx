import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import '../pages/SignUp.css';

export default function OAuth2Success() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [userInfo, setUserInfo] = useState(null);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const email = searchParams.get('email');
        const name = searchParams.get('name');
        const provider = searchParams.get('provider');
        const statusParam = searchParams.get('status');

        if (statusParam === 'success' && email) {
            setUserInfo({ email, name, provider });
            setStatus('success');
            
            // Redirection automatique vers la page d'accueil après 5 secondes
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate('/', { replace: true });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setStatus('error');
        }
    }, [searchParams, navigate]);

    if (status === 'loading') {
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
                            Connexion en cours...
                        </h2>
                        <div className="mt-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Finalisation de votre connexion Google.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (status === 'error') {
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
                            Erreur de connexion
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Une erreur s'est produite lors de votre connexion avec Google.
                        </p>
                        <div className="mt-6 space-y-3">
                            <button
                                onClick={() => navigate('/signin')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                🔐 Réessayer la connexion
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
                        Connexion réussie ! 🎉
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Bienvenue <strong>{userInfo?.name || userInfo?.email}</strong> !
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Vous êtes maintenant connecté avec votre compte Google.
                    </p>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            Redirection automatique vers l'accueil dans <span className="font-bold">{countdown}</span> secondes...
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <button
                            onClick={() => navigate('/', { replace: true })}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            🏠 Aller à l'accueil maintenant
                        </button>
                        
                        <button
                            onClick={() => navigate('/signin')}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            🔐 Aller à la connexion
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
