// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import GoogleLogin from "../components/GoogleLogin";
import ReCaptcha from "../components/ReCaptcha";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.jpg";
import "./SignIn.css";

export default function SignIn() {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const { login } = useAuth();
    const navigate   = useNavigate();

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
        console.log("reCAPTCHA token:", token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Vérification reCAPTCHA
        if (!recaptchaToken) {
            setError("Veuillez compléter la vérification reCAPTCHA");
            setLoading(false);
            return;
        }

        try {
            const { data } = await API.post("/auth/signin", { 
                email, 
                password,
                recaptchaToken 
            });

            // Extrait ton token et (optionnel) URL de photo
            const token    = data.token || data.jwt || data;
            const photoUrl = data.user?.photoUrl;

            // Stockage
            localStorage.setItem("token", token);
            login(photoUrl);

            // Redirection
            navigate("/");
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data ||
                "Erreur lors de la connexion. Veuillez réessayer.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = (user) => {
        console.log("Connexion Google réussie:", user);
        // La redirection sera gérée par le backend
    };

    const handleGoogleError = (error) => {
        console.error("Erreur connexion Google:", error);
        setError("Erreur lors de la connexion avec Google. Veuillez réessayer.");
    };

    return (
        <motion.div
            className="signin-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <header className="signin-header">
                <img src={logo} alt="Diravenir" className="signin-logo" />
            </header>

            <main className="signin-content">
                {/* Formulaire */}
                <motion.section
                    className="form-section"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h1 className="signin-title">
                        Sign <span className="highlight">In</span>
                    </h1>

                    {/* Google Login */}
                    <div className="google-login-section">
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

                    <form onSubmit={handleSubmit} className="signin-form">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember Me
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* reCAPTCHA */}
                        <div className="recaptcha-section">
                            <ReCaptcha onVerify={handleRecaptchaVerify} />
                        </div>

                        {error && <div className="signin-error">{error}</div>}

                        <motion.button
                            type="submit"
                            className="btn-primary"
                            whileTap={{ scale: 0.95 }}
                            disabled={loading || !recaptchaToken}
                        >
                            {loading ? "Connexion..." : "Log In"}
                        </motion.button>
                    </form>

                    <div className="signup-link">
                        <p>
                            Pas encore de compte ?{" "}
                            <Link to="/signup" className="link">
                                Créer un compte
                            </Link>
                        </p>
                    </div>

                    <p className="terms-text">
                        By logging in, you agree to our{" "}
                        <Link to="/terms" className="link">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="link">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </motion.section>

                {/* Illustration */}
                <motion.section
                    className="illustration-section"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <img src={illustration} alt="Illustration" className="illustration" />
                </motion.section>
            </main>
        </motion.div>
    );
}
