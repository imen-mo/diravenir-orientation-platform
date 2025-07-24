import React, { useState } from "react";
import "../Pages/SignUp.css";

import illustration from "../assets/illustration.png";
import logo from "../assets/logo.png";

export default function SignUp() {
    const [newsletterEmail, setNewsletterEmail] = useState("");

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            alert(`Thank you for subscribing: ${newsletterEmail}`);
            setNewsletterEmail(""); // Reset field
        }
    };

    return (
        <div className="home-container">
            {/* Header / Nav */}
            <header className="navbar">
                <img src={logo} alt="DiraVenir" className="logo" />
                <nav className="nav-links">
                    <a href="/">Home</a>
                    <a href="/course-selector" className="active">Course Selector</a>
                    <a href="/courses">Courses</a>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                    <a href="/about">About US</a>
                </nav>
                <div className="nav-buttons">
                    <a href="/login" className="btn-login">Log In</a>
                    <a href="/signup" className="btn-create">Create Account</a>
                </div>

            </header>

            {/* Main content */}
            <main className="main-content">
                {/* Left side: form */}
                <div className="form-section">
                    <h1>
                        Create <span className="highlight">Account</span>
                    </h1>
                    <form>
                        <input type="email" placeholder="Email Address" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm Password" required />
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        <button type="submit" className="btn-create-account">
                            Create Account
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
                        Maroc et à l’étranger. Elle se distingue par une approche
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
                        <li><a href="/">Home</a></li>
                        <li><a href="/our-story">Our Story</a></li>
                        <li><a href="/best-courses">Best Courses</a></li>
                        <li><a href="/faqs">Your FAQ's</a></li>
                        <li><a href="/cancellation">Cancellation & Refunds</a></li>
                        <li><a href="/contact">Contact US</a></li>
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
