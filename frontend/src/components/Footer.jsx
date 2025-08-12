import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SECTION - Logo et Description */}
        <div className="footer-section left-section">
          <img
            src={logo}
            alt="Diravenir Logo"
            className="logo"
          />
          <p>
            Diravenir is a web platform that supports students in their academic orientation and application processes both in Morocco and abroad. It stands out through a personalized approach based on assessments, tailored recommendations, and guidance prior to any application.
          </p>

          {/* Newsletter Section */}
          <div className="newsletter-section">
            <h4>Subscribe to Our Newsletter</h4>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                &gt;
              </button>
            </form>
          </div>

          {/* Legal Links */}
          <div className="bottom-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>

        {/* CENTER SECTION - Quick Links */}
        <div className="footer-section center-section">
          <h4>
            Quick <span className="highlight">Links</span>
          </h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/orientation">Orientation</Link></li>
            <li><Link to="/programs">Best Programs</Link></li>
            <li><Link to="/faq">Your FAQ's</Link></li>
            <li><Link to="/cancellation">Cancellation & Refunds</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* RIGHT SECTION - Contact Info */}
        <div className="footer-section right-section">
          <h4>
            Contact <span className="highlight">Us</span>
          </h4>
          <div className="contact-info">
            <p>📍 BD la Résistance, 179, Angle des Boulevards de Londres, Av. Mers Sultan, Casablanca 20250</p>
            <p>✉️ contact@diravenir.com</p>
            <p>📞 +212 771 497 646</p>
          </div>

          <div className="social-icons">
            <a href="https://facebook.com/profile.php?id=61553731883991" target="_blank" rel="noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/diravenir" target="_blank" rel="noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/diravenir/" target="_blank" rel="noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/diravenir" target="_blank" rel="noreferrer" className="social-icon">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/@Diravenir/videos" target="_blank" rel="noreferrer" className="social-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
