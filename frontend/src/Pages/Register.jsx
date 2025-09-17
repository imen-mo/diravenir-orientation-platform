import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import oauth2Service from '../services/oauth2Service';
import TermsModal from '../components/TermsModal';
import PrivacyModal from '../components/PrivacyModal';
import illustration from '../assets/illustration.png';
import '../styles/Register.css';
import GlobalLayout from '../components/GlobalLayout';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [oauth2Loading, setOauth2Loading] = useState(false);
    
    const { register, error, clearError, loading } = useAuth();
    const navigate = useNavigate();

    // Effacer les erreurs au changement de composant
    useEffect(() => {
        clearError();
        setSuccessMessage('');
        setShowSuccessMessage(false);
        setErrors({});
    }, [clearError]);

    // Fonction de nettoyage complet des états
    const resetAllStates = () => {
        setErrors({});
        setSuccessMessage('');
        setShowSuccessMessage(false);
        clearError();
    };

    // Fonctions pour gérer les modals
    const handleAcceptTerms = () => {
        setAcceptTerms(true);
        setShowTermsModal(false);
    };

    const handleAcceptPrivacy = () => {
        setAcceptPrivacy(true);
        setShowPrivacyModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Validation mot de passe
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        // Validation confirmation mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Validation des conditions
        if (!acceptTerms) {
            newErrors.terms = 'You must accept the Terms and Conditions';
        }

        if (!acceptPrivacy) {
            newErrors.privacy = 'You must accept the Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Empêcher la soumission multiple
        if (loading) {
            return;
        }
        
        if (!validateForm()) {
            return;
        }

        try {
            // RÉINITIALISER TOUS LES ÉTATS AVANT L'INSCRIPTION
            resetAllStates();
            
            // Préparer les données pour l'API (simplifié)
            const userData = {
                email: formData.email.trim(),
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                rememberMe: rememberMe
            };

            const result = await register(userData);
            
            if (result.success) {
                // Construire l'URL de redirection avec les paramètres
                const emailParam = encodeURIComponent(result.userEmail || formData.email);
                const messageParam = encodeURIComponent(result.message || 'Registration successful! Please check your email to activate your account.');
                
                // URL de redirection finale
                const redirectUrl = `/verify-email-sent?email=${emailParam}&message=${messageParam}`;
                
                // Redirection immédiate et robuste
                window.location.replace(redirectUrl);
                
                return;
            } else {
                throw new Error(result.message || 'Error during registration');
            }
        } catch (error) {
            setErrors({ general: error.message || 'Error during registration' });
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setOauth2Loading(true);
            clearError();
            
            console.log('🚀 Démarrage de la création de compte avec Google...');
            
            // Démarrer l'authentification Google pour la création de compte
            await oauth2Service.initiateGoogleAuth();
            
        } catch (error) {
            console.error('❌ Erreur lors de la création de compte Google:', error);
            setErrors({ general: 'Erreur lors de la création de compte avec Google. Veuillez réessayer.' });
        } finally {
            setOauth2Loading(false);
        }
    };

    return (
        <GlobalLayout activePage="register">
            <div className="register-container">
            {/* Particules d'arrière-plan */}
            <div className="register-particles">
                <div className="register-particle"></div>
                <div className="register-particle"></div>
                <div className="register-particle"></div>
                <div className="register-particle"></div>
            </div>

            <div className="register-layout">
                {/* Section de gauche : Formulaire d'inscription */}
                <div className="register-form-section">
                    <div className="register-form-container">
                        <div className="register-header">
                            <h2 className="register-title">
                                <span className="register-title-primary">Create</span>{' '}
                                <span className="register-title-secondary">Account</span>
                            </h2>
                            <p className="register-subtitle">
                                Join Diravenir and discover your orientation
                            </p>
                        </div>

                        <form className="register-form" onSubmit={handleSubmit}>


                            {/* Affichage des erreurs globales */}
                            {error && (
                                <div className="register-error">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                    <span>{error}</span>
                                        </div>
                            )}

                            {/* Affichage des erreurs de validation */}
                            {errors.general && (
                                <div className="register-error">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span>{errors.general}</span>
                                        </div>
                            )}

                            {/* Message de succès temporaire */}
                            {showSuccessMessage && (
                                <div className="register-success">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {/* Email */}
                            <div className="register-form-group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`register-input ${errors.email ? 'error' : ''}`}
                                    placeholder="Email Address"
                                />
                                {errors.email && (
                                    <p className="register-error">{errors.email}</p>
                                )}
                            </div>

                            {/* Mot de passe */}
                            <div className="register-form-group">
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`register-input ${errors.password ? 'error' : ''}`}
                                        placeholder="Password"
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
                                {errors.password && (
                                    <p className="register-error">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirmation mot de passe */}
                            <div className="register-form-group">
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`register-input ${errors.confirmPassword ? 'error' : ''}`}
                                        placeholder="Confirm Password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
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
                                {errors.confirmPassword && (
                                    <p className="register-error">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Remember Me checkbox */}
                            <div className="register-form-group">
                                <label className="register-remember-me">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="register-checkbox"
                                    />
                                    <span className="register-checkbox-label">Remember Me</span>
                                </label>
                            </div>

                            {/* Terms and Conditions checkbox */}
                            <div className="register-form-group">
                                <label className="register-remember-me">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="register-checkbox"
                                    />
                                    <span className="register-checkbox-label">
                                        I accept the{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowTermsModal(true)}
                                            className="register-legal-link"
                                            style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            Terms and Conditions
                                        </button>
                                    </span>
                                </label>
                                {errors.terms && (
                                    <p className="register-error">{errors.terms}</p>
                                )}
                            </div>

                            {/* Privacy Policy checkbox */}
                            <div className="register-form-group">
                                <label className="register-remember-me">
                                    <input
                                        type="checkbox"
                                        checked={acceptPrivacy}
                                        onChange={(e) => setAcceptPrivacy(e.target.checked)}
                                        className="register-checkbox"
                                    />
                                    <span className="register-checkbox-label">
                                        I accept the{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowPrivacyModal(true)}
                                            className="register-legal-link"
                                            style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            Privacy Policy
                                        </button>
                                    </span>
                                </label>
                                {errors.privacy && (
                                    <p className="register-error">{errors.privacy}</p>
                                )}
                            </div>

                            {/* Bouton d'inscription */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading || !!successMessage}
                                    className="register-submit"
                                >
                                    {loading ? (
                                        <div className="register-loading">
                                            <div className="register-spinner"></div>
                                            <span>Creating account...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="register-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                            <span>Create Account</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Lien de connexion */}
                            <div className="register-login">
                                <span className="register-login-text">
                                    Already have an account?
                                </span>
                                    <Link
                                        to="/login"
                                    className="register-login-link"
                                    >
                                        Sign in
                                    </Link>
                            </div>

                            {/* Séparateur */}
                            <div className="register-separator">
                                <span className="register-separator-text">or</span>
                            </div>

                            {/* Bouton de création de compte Google */}
                            <div>
                                <button
                                    type="button"
                                    className="register-google"
                                    onClick={handleGoogleSignup}
                                    disabled={oauth2Loading || !!successMessage}
                                >
                                    <svg className="register-google-icon" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span>{oauth2Loading ? 'Création en cours...' : 'Créer un compte avec Google'}</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Section de droite : Illustration */}
                <div className="register-illustration-section">
                    {/* Effet de grille en arrière-plan */}
                    <div className="register-illustration-grid"></div>

                    {/* Illustration principale */}
                    <div className="register-illustration-content">
                        <img 
                            src={illustration} 
                            alt="Application development" 
                            className="register-illustration-image"
                        />
                        <h3 className="register-illustration-title">🚀 Discover your future</h3>
                        <p className="register-illustration-text">
                            Join thousands of students who have found their path thanks to Diravenir
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Modals */}
        {showTermsModal && (
            <TermsModal
                isOpen={showTermsModal}
                onClose={() => setShowTermsModal(false)}
                onAccept={handleAcceptTerms}
            />
        )}

        {showPrivacyModal && (
            <PrivacyModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
                onAccept={handleAcceptPrivacy}
            />
        )}
        </GlobalLayout>
    );
};

export default Register;
