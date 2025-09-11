import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import illustration from '../assets/illustration.png';
import '../styles/Login.css';
import GlobalLayout from '../components/GlobalLayout';

const Login = () => {
    const { getText } = useTheme();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    
    const { login, error, clearError, loading, setError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirection après connexion
    const from = location.state?.from?.pathname || '/dashboard';

    // Effacer les erreurs au changement de composant
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            setError(getText('fillAllFields'));
            return;
        }

        try {
            console.log('🔑 Tentative de connexion pour:', formData.email);
            const result = await login(formData);
            
            console.log('🔑 Résultat de la connexion:', result);
            
            if (result.success) {
                // Redirection vers Home après connexion réussie
                console.log('🔑 Connexion réussie, redirection vers Home');
                navigate('/', { replace: true }); // ✅ Redirection vers Home
            } else {
                // La connexion a échoué, l'erreur est déjà gérée par le contexte
                console.error('❌ Échec de la connexion:', result.message);
            }
        } catch (error) {
            console.error('❌ Erreur lors de la connexion:', error);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
        }
    };



    return (
        <GlobalLayout activePage="login">
            <div className="login-container">
            {/* Particules d'arrière-plan */}
            <div className="login-particles">
                <div className="login-particle"></div>
                <div className="login-particle"></div>
                <div className="login-particle"></div>
                <div className="login-particle"></div>
            </div>

            <div className="login-layout">
                {/* Section de gauche : Formulaire de connexion */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2 className="login-title">{getText('loginTitle')}</h2>
                        </div>

                        <form className="login-form" onSubmit={handleSubmit}>
                            {/* Affichage des erreurs */}
                            {error && (
                                <div className="login-error">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Email */}
                            <div className="login-form-group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="login-input"
                                    placeholder={getText('emailPlaceholder')}
                                />
                            </div>

                            {/* Mot de passe */}
                            <div className="login-form-group">
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="login-input"
                                        placeholder={getText('passwordPlaceholder')}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Actions du formulaire */}
                            <div className="login-actions">
                                <div className="login-remember">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="login-checkbox"
                                    />
                                    <label htmlFor="remember-me" className="login-remember-label">
                                        {getText('rememberMe')}
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="login-forgot"
                                >
                                    {getText('forgotPassword')}
                                </Link>
                            </div>

                            {/* Bouton de connexion */}
                            <div>
                            <button
                                type="submit"
                                disabled={loading || !formData.email || !formData.password}
                                    className="login-submit"
                            >
                                {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {getText('loading')}...
                                    </div>
                                ) : (
                                        getText('loginButton')
                                )}
                            </button>
                            </div>

                            {/* Lien d'inscription */}
                            <div className="login-register">
                                <span className="login-register-text">
                                    {getText('noAccount')}
                                </span>
                                <Link
                                    to="/register"
                                    className="login-register-link"
                                >
                                        {getText('createAccount')}
                                    </Link>
                            </div>



                            {/* Mentions légales */}
                            <div className="login-legal">
                                {getText('agreeTerms')}{' '}
                                <Link to="/terms" className="login-legal-link">
                                    {getText('termsAndConditions')}
                                </Link>{' '}
                                {getText('and')}{' '}
                                <Link to="/privacy" className="login-legal-link">
                                    {getText('privacyPolicy')}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section de droite : Illustration */}
                <div className="login-illustration-section">
                    {/* Effet de grille en arrière-plan */}
                    <div className="login-illustration-grid"></div>

                    {/* Illustration principale */}
                    <div className="login-illustration-content">
                        <img 
                            src={illustration} 
                            alt="Développement d'applications" 
                            className="login-illustration-image"
                        />
                        <h3 className="login-illustration-title">🚀 {getText('discoverYourFuture')}</h3>
                        <p className="login-illustration-text">
                            {getText('loginAndExplore')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </GlobalLayout>
    );
};

export default Login;
