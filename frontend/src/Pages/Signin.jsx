import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/SignIn.css";
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.jpg";
import { motion } from "framer-motion";
import API from "../services/api";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await API.post("/auth/signin", {
                email,
                password,
            });
            // Stocker le token JWT dans le localStorage (ou autre)
            localStorage.setItem("token", response.data.token || response.data.jwt || response.data);
            // Rediriger ou afficher un message de succès
            window.location.href = "/"; // À adapter selon votre logique
        } catch (err) {
            setError(
                err.response?.data || "Erreur lors de la connexion. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Header / Nav */}
            <motion.header
                className="navbar"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
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
                    <Link to="/signin">
                        <motion.button
                            className="btn-login"
                            whileHover={{ scale: 1.1 }}
                        >
                            Log In
                        </motion.button>
                    </Link>
                    <Link to="/signup">
                        <motion.button
                            className="btn-create"
                            whileHover={{ scale: 1.1 }}
                        >
                            Create Account
                        </motion.button>
                    </Link>
                </div>
            </motion.header>

            {/* Main content */}
            <main className="main-content">
                {/* Left side: form */}
                <motion.div
                    className="form-section"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <h1>
                        Sign <span className="highlight">In</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        {error && (
                            <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
                        )}
                        <motion.button
                            type="submit"
                            className="btn-create-account"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ backgroundColor: "#ffb700" }}
                            disabled={loading}
                        >
                            {loading ? "Connexion..." : "Log In"}
                        </motion.button>
                    </form>

                    <p className="terms-text">
                        By logging in, you agree to our {" "}
                        <a href="/terms">Terms of Service</a> and {" "}
                        <a href="/privacy">Privacy Policy</a>.
                    </p>
                </motion.div>

                {/* Right side: image */}
                <motion.div
                    className="image-section"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <img src={illustration} alt="Illustration" />
                </motion.div>
            </main>

            {/* Footer */}
            <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <div className="footer-left">
                    <img src={logo} alt="DiraVenir" className="footer-logo" />
                    <p>
                        Diravenir est une plateforme web qui accompagne les étudiants dans
                        leur orientation scolaire et leurs démarches de candidature au
                        Maroc et à l'étranger.
                    </p>
                    <div className="newsletter">
                        <label>Subscribe Our Newsletter</label>
                        <input type="email" placeholder="Your Email address" />
                        <button>›</button>
                    </div>
                    <div className="footer-bottom">
                        <a href="/terms">Terms & Conditions</a> | {" "}
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
                    <p>BD la Résistance, 179, Angle des Boulevards de Londres, Av. Mers Sultan, Casablanca 20250</p>
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
            </motion.footer>
        </motion.div>
    );
}