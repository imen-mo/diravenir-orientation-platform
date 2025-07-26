import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/SignUp.css";
import API from "../services/api";
import illustration from "../assets/illustration.png";
import logo from "../assets/logo.png";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        motDePasse: "",
        confirmPassword: "",
        nom: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation côté client
        if (formData.motDePasse !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setLoading(false);
            return;
        }

        try {
            const response = await API.post("/auth/signup", {
                email: formData.email,
                motDePasse: formData.motDePasse,
                confirmPassword: formData.confirmPassword,
                nom: formData.nom
            });

            alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
            window.location.href = "/signin";
        } catch (err) {
            setError(
                err.response?.data || "Erreur lors de l'inscription. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
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
            {/* Header / Nav */}
            <header className="navbar">
                <img src={logo} alt="DiraVenir" className="logo" />
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/course-selector" className="active">Course Selector</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About US</Link>
                </nav>
                <div className="nav-buttons">
                    <Link to="/signin" className="btn-login">Log In</Link>
                    <Link to="/signup" className="btn-create">Create Account</Link>
                </div>
            </header>

            {/* Main content */}
            <main className="main-content">
                {/* Left side: form */}
                <div className="form-section">
                    <h1>
                        Create <span className="highlight">Account</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nom"
                            placeholder="Nom *"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                        />
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
                            name="motDePasse"
                            placeholder="Password *"
                            value={formData.motDePasse}
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
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        {error && (
                            <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
                        )}
                        <button 
                            type="submit" 
                            className="btn-create-account"
                            disabled={loading}
                        >
                            {loading ? "Création..." : "Create Account"}
                        </button>
                    </form>

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

            {/* Footer */}
            <footer className="footer">
                <div className="footer-left">
                    <img src={logo} alt="DiraVenir" className="footer-logo" />
                    <p>
                        Diravenir est une plateforme web qui accompagne les étudiants dans
                        leur orientation scolaire et leurs démarches de candidature au
                        Maroc et à l'étranger. Elle se distingue par une approche
                        personnalisée basée sur des tests, des recommandations et un suivi
                        avant toute demande.
                    </p>

                    {/* ✅ Newsletter form */}
                    <div className="newsletter">
                        <label>Subscribe Our Newsletter</label>
                        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Your Email address"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="newsletter-button">›</button>
                        </form>
                    </div>

                    <div className="footer-bottom">
                        <a href="/terms">Terms & Conditions</a> |{" "}
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-center">
                    <h3>
                        Quick <span className="highlight">Links</span>
                    </h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/our-story">Our Story</Link></li>
                        <li><Link to="/best-courses">Best Courses</Link></li>
                        <li><Link to="/faqs">Your FAQ's</Link></li>
                        <li><Link to="/cancellation">Cancellation & Refunds</Link></li>
                        <li><Link to="/contact">Contact US</Link></li>
                    </ul>
                </div>

                <div className="footer-right">
                    <h3>Contact <span className="highlight">Us</span></h3>
                    <p>
                        BD la Résistance, 179, Angle des Boulevards de Londres, Av. Mers
                        Sultan, Casablanca 20250
                    </p>
                    <p>Email: contact@diravenir.com</p>
                    <p>Phone: +91 8428448903 / +91 9475484959</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" aria-label="Facebook">Fb</a>
                        <a href="https://twitter.com" aria-label="Twitter">Tw</a>
                        <a href="https://linkedin.com" aria-label="LinkedIn">In</a>
                        <a href="https://instagram.com" aria-label="Instagram">Ig</a>
                        <a href="https://youtube.com" aria-label="YouTube">Yt</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
