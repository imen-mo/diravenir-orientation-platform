import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import oauth2Service from '../services/oauth2Service';
import illustration from '../assets/illustration.png';
import '../styles/Login.css';
import GlobalNavbar from '../components/GlobalNavbar';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    
    const { login, error, clearError, loading, setError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirection après connexion
    const from = location.state?.from?.pathname || '/';

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
        console.log('🔍 Début de la tentative de connexion...');
        
        // Validation des champs vides
        if (!formData.email.trim() || !formData.password.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        console.log('📤 Envoi des credentials:', { email: formData.email, password: '*' });

        try {
            const result = await login(formData);
            console.log('📥 Résultat de connexion:', result);
            
            if (result && result.success) {
                console.log('✅ Connexion réussie, redirection...');
                console.log('👤 Informations utilisateur:', result.user);
                console.log('🏷 Rôle:', result.role);
                
                // Redirection intelligente selon le rôle
                const userRole = result.user?.role || result.role;
                
                if (userRole === 'ADMIN') {
                    console.log('🔄 Redirection vers /admin');
                    navigate('/admin', { replace: true }); // ✅ Admin → AdminDashboard
                } else {
                    console.log('🔄 Redirection vers / (HomePage)');
                    navigate('/', { replace: true }); // ✅ Utilisateurs → HomePage
                }
            } else {
                console.log('❌ Connexion échouée:', result?.message || 'Erreur inconnue');
                setError(result?.message || 'Erreur lors de la connexion');
            }
        } catch (error) {
            console.error('❌ Erreur lors de la connexion:', error);
            setError(error.message || 'Erreur lors de la connexion');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            clearError();
            
            // Démarrer l'authentification Google
            await oauth2Service.initiateGoogleAuth();
            
        } catch (error) {
            console.error('Erreur lors de la connexion Google:', error);
            setError(error.message || 'Erreur lors de la connexion Google. Veuillez réessayer.');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <GlobalNavbar activePage="login" />
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
                            <h2 className="login-title">Log In</h2>
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
                                    placeholder="Email Address"
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
                                        Remember Me
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="login-forgot"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Bouton de connexion */}
                            <div>
                            <button
                                type="submit"
                                disabled={loading}
                                    className="login-submit"
                            >
                                {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                    </div>
                                ) : (
                                        'Login'
                                )}
                            </button>
                            </div>

                            {/* Lien d'inscription */}
                            <div className="login-register">
                                <span className="login-register-text">
                                    Already Created?
                                </span>
                                <Link
                                    to="/register"
                                    className="login-register-link"
                                >
                                    Login Here
                                </Link>
                            </div>

                            {/* Séparateur */}
                            <div className="login-separator">
                                <span className="login-separator-text">or</span>
                            </div>

                            {/* Bouton de connexion Google */}
                            <div>
                                <button
                                    type="button"
                                    className="login-google"
                                    onClick={handleGoogleLogin}
                                    disabled={googleLoading}
                                >
                                    <svg className="login-google-icon" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    {googleLoading ? 'Connexion...' : 'Login with Google'}
                                </button>
                            </div>

                            {/* Mentions légales */}
                            <div className="login-legal">
                                By continuing, you agree to the{' '}
                                <Link to="/terms" className="login-legal-link">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="login-legal-link">
                                    Privacy Policy
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section de droite : Illustration */}
                <div className="login-illustration-section">
                    {/* Illustration principale */}
                    <div className="login-illustration-content">
                        <img 
                            src={illustration} 
                            alt="Développement d'applications" 
                            className="login-illustration-image"
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
