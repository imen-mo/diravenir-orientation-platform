import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import oauth2Service from '../services/oauth2Service';
import illustration from '../assets/illustration.png';
import '../styles/Register.css';
import GlobalLayout from '../components/GlobalLayout';

const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [oauth2Loading, setOauth2Loading] = useState(false);
    
    const { register, error, clearError, loading } = useAuth();
    const navigate = useNavigate();

    // Effacer les erreurs au changement de composant
    useEffect(() => {
        clearError();
        setSuccessMessage('');
    }, [clearError]);

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

        // Validation nom
        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est requis';
        } else if (formData.nom.length < 2) {
            newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
        } else if (formData.nom.length > 50) {
            newErrors.nom = 'Le nom ne peut pas dépasser 50 caractères';
        }

        // Validation prénom
        if (!formData.prenom.trim()) {
            newErrors.prenom = 'Le prénom est requis';
        } else if (formData.prenom.length < 2) {
            newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
        } else if (formData.prenom.length > 50) {
            newErrors.prenom = 'Le prénom ne peut pas dépasser 50 caractères';
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        // Validation mot de passe
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        // Validation confirmation mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        // Validation téléphone (optionnel)
        if (formData.telephone && formData.telephone.length > 20) {
            newErrors.telephone = 'Le numéro de téléphone ne peut pas dépasser 20 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
        // Préparer les données pour l'API (sans confirmPassword)
        const userData = {
            nom: formData.nom.trim(),
            prenom: formData.prenom.trim(),
            email: formData.email.trim(),
            password: formData.password,
            telephone: formData.telephone.trim() || null
        };

            console.log('Données envoyées:', userData);

        const result = await register(userData);
        console.log('Résultat de l\'inscription:', result);
        
        if (result.success) {
            setSuccessMessage(result.message || 'Inscription réussie ! Vérifiez votre email pour activer votre compte.');
            
            // Rediriger immédiatement vers la page de vérification
            setTimeout(() => {
                navigate('/verify-email-sent', { 
                    state: { 
                        email: result.userEmail || formData.email,
                        message: result.message || 'Inscription réussie ! Vérifiez votre email pour activer votre compte.'
                    } 
                });
            }, 100);
            } else {
            throw new Error(result.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Exception lors de l\'inscription:', error);
            setErrors({ general: error.message || 'Erreur lors de l\'inscription' });
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setOauth2Loading(true);
            clearError();
            
            // Démarrer l'authentification Google
            await oauth2Service.initiateGoogleAuth();
            
        } catch (error) {
            console.error('Erreur lors de l\'inscription Google:', error);
            setErrors({ general: 'Erreur lors de l\'inscription Google. Veuillez réessayer.' });
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
                                <span className="register-title-primary">Créer</span>{' '}
                                <span className="register-title-secondary">Compte</span>
                            </h2>
                            <p className="register-subtitle">
                                Rejoignez Diravenir et découvrez votre orientation
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

                            {/* Message de succès */}
                            {successMessage && (
                                <div className="register-success">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {/* Nom et Prénom sur la même ligne */}
                            <div className="register-name-grid">
                                <div className="register-form-group">
                                    <input
                                        id="prenom"
                                        name="prenom"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        className={`register-input ${errors.prenom ? 'error' : ''}`}
                                        placeholder="Prénom"
                                    />
                                    {errors.prenom && (
                                        <p className="register-error">{errors.prenom}</p>
                                    )}
                                </div>

                                <div className="register-form-group">
                                    <input
                                        id="nom"
                                        name="nom"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        value={formData.nom}
                                        onChange={handleChange}
                                        className={`register-input ${errors.nom ? 'error' : ''}`}
                                        placeholder="Nom"
                                    />
                                    {errors.nom && (
                                        <p className="register-error">{errors.nom}</p>
                                    )}
                                </div>
                            </div>

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

                            {/* Téléphone */}
                            <div className="register-form-group">
                                <input
                                    id="telephone"
                                    name="telephone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    className={`register-input ${errors.telephone ? 'error' : ''}`}
                                    placeholder="Téléphone (optionnel)"
                                />
                                {errors.telephone && (
                                    <p className="register-error">{errors.telephone}</p>
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
                                            <span>Création en cours...</span>
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
                                    Déjà un compte ?
                                </span>
                                    <Link
                                        to="/login"
                                    className="register-login-link"
                                    >
                                        Se connecter
                                    </Link>
                            </div>

                            {/* Séparateur */}
                            <div className="register-separator">
                                <span className="register-separator-text">ou</span>
                            </div>

                            {/* Bouton de connexion Google */}
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
                                    <span>{oauth2Loading ? 'Connexion...' : 'Sign in with Google'}</span>
                                </button>
                            </div>

                            {/* Mentions légales */}
                            <div className="register-legal">
                                En continuant, vous acceptez nos{' '}
                                <Link to="/terms" className="register-legal-link">
                                    Conditions d'utilisation
                                </Link>{' '}
                                et notre{' '}
                                <Link to="/privacy" className="register-legal-link">
                                    Politique de confidentialité
                                </Link>
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
                            alt="Développement d'applications" 
                            className="register-illustration-image"
                        />
                        <h3 className="register-illustration-title">🚀 Découvrez votre avenir</h3>
                        <p className="register-illustration-text">
                            Rejoignez des milliers d'étudiants qui ont trouvé leur voie grâce à Diravenir
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </GlobalLayout>
    );
};

export default Register;
