import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/SignUp.css";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.jpg";
import { motion } from "framer-motion";
import API from "../services/api";
import Footer from "../components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { setToken } from "../utils/auth";
import GoogleLogin from "../components/GoogleLogin";
import GlobalNavbar from "../components/GlobalNavbar";

export default function SignUp() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation des mots de passe
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/auth/signup", {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password
            });
            
            // Afficher le message de succès
            setSuccess(response.data.message || "Compte créé avec succès !");
            
            // Optionnel : rediriger après quelques secondes
            setTimeout(() => {
                window.location.href = "/signin";
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Erreur lors de la création du compte. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page-elegant">
            {/* Header / Nav */}
            <GlobalNavbar activePage="signup" />

            {/* Main content */}
            <main className="main-content-elegant">
                {/* Left side: form */}
                <motion.div
                    className="form-section-elegant"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <div className="form-container-elegant">
                        <div className="form-header-elegant">
                            <motion.div
                                className="logo-circle"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                            >
                                <div className="logo-inner">
                                    <span>DA</span>
                                </div>
                            </motion.div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="welcome-title-elegant"
                            >
                                Join DirAvenir
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                className="welcome-subtitle-elegant"
                            >
                                Create your account to start your journey
                            </motion.p>
                        </div>

                        <motion.form 
                            onSubmit={handleSubmit}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                            className="login-form-elegant"
                        >
                            <div className="input-group-elegant">
                                <label className="input-label">Nom</label>
                                <div className="input-wrapper-elegant">
                                    <input
                                        type="text"
                                        name="nom"
                                        placeholder="Entrez votre nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                        className="form-input-elegant"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>

                            <div className="input-group-elegant">
                                <label className="input-label">Prénom</label>
                                <div className="input-wrapper-elegant">
                                    <input
                                        type="text"
                                        name="prenom"
                                        placeholder="Entrez votre prénom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                        className="form-input-elegant"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>

                            <div className="input-group-elegant">
                                <label className="input-label">Email Address</label>
                                <div className="input-wrapper-elegant">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Entrez votre email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input-elegant"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>

                            <div className="input-group-elegant">
                                <label className="input-label">Password</label>
                                <div className="input-wrapper-elegant">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Créez un mot de passe"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="form-input-elegant"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>

                            <div className="input-group-elegant">
                                <label className="input-label">Confirm Password</label>
                                <div className="input-wrapper-elegant">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirmez votre mot de passe"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="form-input-elegant"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>

                            <div className="form-options-elegant">
                                <label className="checkbox-container-elegant">
                                    <input type="checkbox" required name="terms" />
                                    <span className="checkmark-elegant"></span>
                                    <span className="checkbox-text">I agree to the Terms & Conditions</span>
                                </label>
                            </div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="error-message-elegant"
                                >
                                    <div className="error-icon">⚠️</div>
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="success-message-elegant"
                                >
                                    <div className="success-icon">✅</div>
                                    <span>{success}</span>
                                </motion.div>
                            )}

                            {/* <div style={{ margin: '16px 0' }}>
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={handleRecaptchaVerify}
                                    onError={() => {
                                        console.error('Erreur reCAPTCHA');
                                        setError("Erreur de vérification reCAPTCHA. Veuillez réessayer.");
                                    }}
                                />
                            </div> */}

                            <motion.button
                                type="submit"
                                className="login-btn-elegant"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                            >
                                <span className="btn-text-elegant">
                                    {loading ? "Creating Account..." : "Create Account"}
                                </span>
                                <div className="btn-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </motion.button>
                        </motion.form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Ou continuez avec</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <GoogleLogin className="w-full" variant="default" />
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="signup-prompt-elegant"
                        >
                            <p>Already have an account? <a href="/signin" className="signup-link-elegant">Sign In</a></p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right side: decorative content */}
                <motion.div
                    className="decorative-section-elegant"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <div className="decorative-content-elegant">
                        <div className="background-pattern">
                            <div className="pattern-circle circle-1"></div>
                            <div className="pattern-circle circle-2"></div>
                            <div className="pattern-circle circle-3"></div>
                            <div className="pattern-line line-1"></div>
                            <div className="pattern-line line-2"></div>
                        </div>
                        
                        <div className="main-illustration-elegant">
                            <div className="image-container">
                                <img src={illustration} alt="Education Illustration" />
                                <div className="image-overlay"></div>
                            </div>
                        </div>
                        
                        <div className="floating-elements-elegant">
                            <div className="floating-item item-1">
                                <div className="item-icon">🎓</div>
                                <span>Education</span>
                            </div>
                            <div className="floating-item item-2">
                                <div className="item-icon">🌟</div>
                                <span>Success</span>
                            </div>
                            <div className="floating-item item-3">
                                <div className="item-icon">🚀</div>
                                <span>Future</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
