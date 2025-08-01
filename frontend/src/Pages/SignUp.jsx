import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/SignUp.css";
import API from "../services/api";
import illustration from "../assets/illustration.png";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

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
            <Footer />
        </div>
    );
}
