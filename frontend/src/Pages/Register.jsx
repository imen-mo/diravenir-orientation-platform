import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import oauth2Service from '../services/oauth2Service';
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

        // Validation Terms & Conditions
        if (!acceptTerms) {
            newErrors.terms = 'You must accept the Terms and Conditions';
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
            
            // Préparer les données pour l'API
            const userData = {
                email: formData.email.trim(),
                password: formData.password,
                nom: formData.email.split('@')[0], // Extraire le nom de l'email
                prenom: 'Utilisateur' // Prénom par défaut
                // Les autres champs (telephone, languePreferee, role) sont optionnels
                // et seront définis par défaut côté backend
            };

            const result = await register(userData);
            
            console.log('📝 Résultat de l\'inscription:', result);
            
                    if (result.success) {
                        // Construire l'URL de redirection avec les paramètres
                        const emailParam = encodeURIComponent(result.userEmail || formData.email);
                        const messageParam = encodeURIComponent(result.message || 'Registration successful! Please check your email to activate your account.');

                        // URL de redirection finale - Page bloquante
                        const redirectUrl = `/verify-email-blocked?email=${emailParam}&message=${messageParam}`;

                        console.log('📝 Redirection vers:', redirectUrl);

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

                            {/* Terms & Conditions checkbox */}
                            <div className="register-form-group">
                                <label className="register-terms">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="register-checkbox"
                                        required
                                    />
                                    <span className="register-checkbox-label">
                                        I accept the{' '}
                                        <button 
                                            type="button"
                                            className="register-terms-link" 
                                            onClick={() => setShowTermsModal(true)}
                                        >
                                            Terms and Conditions
                                        </button>
                                        {' '}and{' '}
                                        <button 
                                            type="button"
                                            className="register-terms-link" 
                                            onClick={() => setShowPrivacyModal(true)}
                                        >
                                            Privacy Policy
                                        </button>
                                    </span>
                                </label>
                                {errors.terms && (
                                    <p className="register-error">{errors.terms}</p>
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

                            {/* Mentions légales */}
                            <div className="register-legal">
                                By continuing, you accept our{' '}
                                <button 
                                    type="button"
                                    className="register-legal-link" 
                                    onClick={() => setShowTermsModal(true)}
                                >
                                    Terms of Service
                                </button>{' '}
                                and our{' '}
                                <button 
                                    type="button"
                                    className="register-legal-link" 
                                    onClick={() => setShowPrivacyModal(true)}
                                >
                                    Privacy Policy
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

        {/* Modal Terms & Conditions */}
        {showTermsModal && (
            <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Terms and Conditions</h2>
                        <button 
                            className="modal-close" 
                            onClick={() => setShowTermsModal(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="terms-content">
                            <p><strong>Welcome to Diravenir</strong>, an online platform for academic orientation and application to programs abroad. These Terms & Conditions govern your use of the Diravenir platform and its services. By accessing, using, or submitting an application through our platform, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, you may not use our services.</p>
                            
                            <h3>1. Acceptance of Terms</h3>
                            <p>This is a legally binding agreement between you, the Applicant or User, and Diravenir, operated by Diravenir, a company registered under Moroccan law. These Terms & Conditions, along with our Privacy Policy, constitute the entire agreement regarding your use of the platform.</p>
                            
                            <h3>2. Eligibility</h3>
                            <p>Our services are available to individuals who meet the eligibility criteria for the specific universities, institutions, and programs they are applying to. You must provide information that is accurate, authentic, and complete at all stages of the application process, in accordance with applicable Moroccan law.</p>
                            
                            <h3>3. Application Process</h3>
                            <p><strong>3.1. Service Function:</strong> Diravenir facilitates the application process by providing a centralized portal for submitting documents and information to various universities and educational programs.</p>
                            <p><strong>3.2. Document Submission:</strong> You are required to upload all necessary documents as specified for your chosen program(s).</p>
                            <p><strong>3.3. Review and Approval:</strong> The submission of an application does not guarantee admission. All applications are subject to a thorough review and final approval by the respective university or educational institution and any other relevant governmental or regulatory authorities.</p>
                            
                            <h3>4. Service Charges and Fees</h3>
                            <p><strong>4.1. Diravenir Service Charges:</strong> By using our platform, you agree to pay the applicable service charges for the services provided by Diravenir. These charges are outlined on the platform or communicated to you before payment.</p>
                            <p><strong>4.2. Non-Refundable Policy:</strong> All service charges paid to Diravenir are non-refundable unless explicitly stated otherwise in a separate Refund Policy. This policy is in accordance with consumer protection regulations in Morocco.</p>
                            <p><strong>4.3. Third-Party Fees:</strong> You are solely responsible for all additional fees, including but not limited to, university application fees, visa application fees, language proficiency exam fees, travel expenses, or any other costs imposed by third parties.</p>
                            
                            <h3>5. Applicant's Responsibilities</h3>
                            <p><strong>5.1. Accuracy of Information:</strong> You are responsible for ensuring that all information, documents, and data you provide to Diravenir are true, accurate, and complete. Providing false, misleading, or fraudulent information is strictly prohibited and may result in the termination of your account and application, and may subject you to legal consequences under Moroccan law.</p>
                            <p><strong>5.2. Compliance:</strong> You are responsible for attending any interviews, examinations, or meetings required by the universities or by Diravenir.</p>
                            <p><strong>5.3. Legal Compliance:</strong> You must comply with all applicable local, national, and international laws and regulations related to your application and studies abroad.</p>
                            
                            <h3>6. Platform Use</h3>
                            <p><strong>6.1. Prohibited Conduct:</strong> You agree not to engage in any of the following prohibited activities:</p>
                            <ul>
                                <li>Sharing your account credentials with any third party.</li>
                                <li>Submitting fraudulent, malicious, or unauthorized information.</li>
                                <li>Attempting to interfere with the proper functioning of the platform.</li>
                            </ul>
                            <p><strong>6.2. Termination of Access:</strong> Diravenir reserves the right to suspend or terminate your access to the platform without notice if we believe, in our sole discretion, that you have violated these Terms & Conditions or have engaged in any fraudulent or unlawful behavior.</p>
                            
                            <h3>7. Limitations of Liability</h3>
                            <p><strong>7.1. Circumstances Beyond Our Control:</strong> Diravenir is not liable for any outcomes or circumstances beyond its reasonable control, including, but not limited to:</p>
                            <ul>
                                <li>Rejection of your application by a university.</li>
                                <li>Delay or rejection of a visa or study permit.</li>
                                <li>Delays caused by third parties, such as postal services, universities, or governmental bodies.</li>
                            </ul>
                            <p><strong>7.2. General Disclaimer:</strong> The services are provided "as is" and "as available." Diravenir makes no warranties, either express or implied, regarding the accuracy, completeness, or reliability of the services. You use the platform at your own risk.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="modal-accept-btn"
                            onClick={() => {
                                setAcceptTerms(true);
                                setShowTermsModal(false);
                            }}
                        >
                            I Accept Terms & Conditions
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Privacy Policy */}
        {showPrivacyModal && (
            <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Privacy Policy</h2>
                        <button 
                            className="modal-close" 
                            onClick={() => setShowPrivacyModal(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="privacy-content">
                            <p>This Privacy Policy explains how <strong>Diravenir</strong>, operated by Diravenir, a company registered in Morocco, collects, uses, and protects your personal data when you use our online platform. This policy is in full compliance with Moroccan Law No. 09-08 relating to the protection of individuals with regard to the processing of personal data.</p>
                            
                            <h3>1. Information We Collect</h3>
                            <p>We collect various types of information to provide and improve our services, in accordance with the principles of necessity and proportionality outlined in Law No. 09-08:</p>
                            <ul>
                                <li><strong>Personal Information:</strong> This includes data you provide during registration and application, such as your full name, date of birth, contact details (email, phone number), and passport information.</li>
                                <li><strong>Academic Information:</strong> This includes transcripts, academic certificates, diplomas, and any other educational records required for your application.</li>
                                <li><strong>Payment Information:</strong> For processing service charges, we may collect information such as bank details, credit card confirmations, or other transaction details.</li>
                            </ul>
                            
                            <h3>2. How We Use Your Information</h3>
                            <p>Your data is used for the following purposes:</p>
                            <ul>
                                <li>To process and submit your applications to partner universities and educational programs.</li>
                                <li>To facilitate and manage scholarship applications.</li>
                                <li>To communicate with you regarding the status of your applications and provide customer support.</li>
                                <li>To improve our services, user experience, and platform functionality.</li>
                            </ul>
                            <p>The collection and processing of your personal data are carried out with your explicit and informed consent, as required by Law No. 09-08.</p>
                            
                            <h3>3. Data Sharing</h3>
                            <p>We will only share your personal data with authorized third parties as necessary to provide our services. This includes:</p>
                            <ul>
                                <li><strong>Partner Universities:</strong> To process your application for admission.</li>
                                <li><strong>Governmental Bodies:</strong> To facilitate visa or study permit applications, as required by law.</li>
                                <li><strong>Authorized Third Parties:</strong> Such as payment processors or other service providers that are essential to our operations.</li>
                            </ul>
                            <p>Any transfer of personal data to a foreign country will be subject to the prior authorization of the Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP), in accordance with the provisions of Law No. 09-08.</p>
                            <p>We do not sell, rent, or trade your personal data to any third parties for marketing or commercial purposes.</p>
                            
                            <h3>4. Data Security</h3>
                            <p>We take your data security seriously and implement appropriate technical and organizational measures to protect your information, in compliance with Law No. 09-08. We use data encryption, secure servers, and strict access controls to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>
                            
                            <h3>5. Your Rights</h3>
                            <p>In accordance with Moroccan Law No. 09-08, you have the right to:</p>
                            <ul>
                                <li><strong>Access:</strong> Obtain a copy of your personal data held by us.</li>
                                <li><strong>Rectify:</strong> Request the correction of any inaccurate or incomplete data.</li>
                                <li><strong>Oppose:</strong> Object to the processing of your personal data for legitimate reasons.</li>
                                <li><strong>Request Deletion:</strong> Request the deletion of your personal data when it is no longer necessary for the purpose for which it was collected.</li>
                            </ul>
                            <p>You can exercise these rights by contacting us at <strong>Contact@Diravenir.com</strong>. We will process your request within a reasonable timeframe, in compliance with the procedures set forth by the CNDP.</p>
                            
                            <h3>6. Cookies</h3>
                            <p>We use cookies and similar tracking technologies to enhance your user experience, analyze platform usage, and personalize content. You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain parts of our platform.</p>
                            
                            <h3>7. Compliance and CNDP Declaration</h3>
                            <p>As a data controller operating in Morocco, Diravenir has fulfilled its legal obligation by submitting a prior declaration to the Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) regarding the processing of your personal data. We are committed to upholding the principles and obligations established by Law No. 09-08.</p>
                            
                            <p><strong>Changes to this Policy:</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="modal-accept-btn"
                            onClick={() => {
                                setAcceptTerms(true);
                                setShowPrivacyModal(false);
                            }}
                        >
                            I Accept Privacy Policy
                        </button>
                    </div>
                </div>
            </div>
        )}
        </GlobalLayout>
    );
};

export default Register;
