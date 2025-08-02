import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/SignUp.css";
import API from "../services/api";
import GoogleLogin from "../components/GoogleLogin";
import ReCaptcha from "../components/ReCaptcha";
import illustration from "../assets/illustration.png";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nom: "",
        prenom: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [newsletterEmail, setNewsletterEmail] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
        console.log("reCAPTCHA token:", token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation côté client
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setLoading(false);
            return;
        }

        // Validation de la force du mot de passe
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
            setLoading(false);
            return;
        }

        // Vérification reCAPTCHA
        if (!recaptchaToken) {
            setError("Veuillez compléter la vérification reCAPTCHA");
            setLoading(false);
            return;
        }

        try {
            const response = await API.post("/auth/signup", {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                nom: formData.nom,
                prenom: formData.prenom,
                recaptchaToken: recaptchaToken
            });

            // Redirection vers la page de confirmation
            window.location.href = "/signup-success";
        } catch (err) {
            setError(
                err.response?.data?.message || 
                err.response?.data?.error ||
                err.response?.data || 
                "Erreur lors de l'inscription. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = (user) => {
        console.log("Inscription Google réussie:", user);
        // La redirection sera gérée par le backend
    };

    const handleGoogleError = (error) => {
        console.error("Erreur inscription Google:", error);
        setError("Erreur lors de l'inscription avec Google. Veuillez réessayer.");
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            alert(`Thank you for subscribing: ${newsletterEmail}`);
            setNewsletterEmail("");
        }
    };

    return (
        <div className="home-container">
            {/* Main content */}
            <main className="main-content">
                {/* Left side: form */}
                <div className="form-section">
                    <h1>
                        Create <span className="highlight">Account</span>
                    </h1>

                    {/* Google SignUp */}
                    <div className="google-signup-section">
                        <GoogleLogin 
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            variant="primary"
                            className="w-full mb-6"
                        />
                        
                        {/* Séparateur */}
                        <div className="separator">
                            <span className="separator-text">ou</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="name-fields">
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom *"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom *"
                                value={formData.nom}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        
                        <input
                            type="password"
                            name="password"
                            placeholder="Password *"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password *"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="password-requirements">
                            <small>
                                Le mot de passe doit contenir au moins 8 caractères, 
                                une majuscule, une minuscule, un chiffre et un caractère spécial
                            </small>
                        </div>

                        {/* reCAPTCHA */}
                        <div className="recaptcha-section">
                            <ReCaptcha onVerify={handleRecaptchaVerify} />
                        </div>

                        <label className="terms-checkbox">
                            <input type="checkbox" required /> 
                            J'accepte les{" "}
                            <a href="/terms" className="link">conditions d'utilisation</a> et la{" "}
                            <a href="/privacy" className="link">politique de confidentialité</a>
                        </label>

                        {error && (
                            <div className="error-message">{error}</div>
                        )}
                        
                        <button 
                            type="submit" 
                            className="btn-create-account"
                            disabled={loading || !recaptchaToken}
                        >
                            {loading ? "Création..." : "Create Account"}
                        </button>
                    </form>

                    <div className="signin-link">
                        <p>
                            Déjà un compte ?{" "}
                            <Link to="/signin" className="link">
                                Se connecter
                            </Link>
                        </p>
                    </div>

                    <p className="terms-text">
                        By continuing, you agree to the{" "}
                        <a href="/terms">Terms of Service</a> and{" "}
                        <a href="/privacy">Privacy Policy</a>.
                    </p>
                </div>

                {/* Right side: image */}
                <div className="image-section">
                    <img src={illustration} alt="Illustration" />
                </div>
            </main>
        </div>
    );
}
