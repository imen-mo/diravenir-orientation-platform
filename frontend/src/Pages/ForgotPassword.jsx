import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GlobalLayout from '../components/GlobalLayout';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const { forgotPassword, error, clearError, loading } = useAuth();

    // Effacer les erreurs au changement de composant
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Effacer l'erreur du champ modifié
        if (emailError) {
            setEmailError('');
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('L\'email est requis');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Format d\'email invalide');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateEmail()) {
            return;
        }

        const result = await forgotPassword(email);
        
        if (result.success) {
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Particules magiques en arrière-plan */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-300 rounded-full animate-pulse"></div>
                </div>

                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                    <div className="text-center">
                        {/* Icône de succès */}
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            📧 Email envoyé !
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                to="/login"
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
                            >
                                🔐 Retour à la connexion
                            </Link>

                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                📧 Renvoyer l'email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <GlobalLayout activePage="forgot-password">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Particules magiques en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-300 rounded-full animate-pulse"></div>
            </div>

            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        🔓 Mot de passe oublié ?
                    </h2>
                    <p className="text-gray-600">
                        Entrez votre email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Affichage des erreurs globales */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            📧 Adresse email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                                emailError ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="votre@email.com"
                        />
                        {emailError && (
                            <p className="mt-1 text-sm text-red-600">{emailError}</p>
                        )}
                    </div>

                    {/* Bouton d'envoi */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Envoi en cours...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Envoyer le lien de réinitialisation
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Lien de retour */}
                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                        >
                            ← Retour à la connexion
                        </Link>
                    </div>

                    {/* Informations supplémentaires */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">
                                    Le lien de réinitialisation expire dans 1 heure. Vérifiez également votre dossier spam.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </GlobalLayout>
    );
};

export default ForgotPassword;
