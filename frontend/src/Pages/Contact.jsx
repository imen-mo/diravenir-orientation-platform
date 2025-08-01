import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Navbar - Same as HomePage */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="DirAvenir Logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/orientation" className="nav-button">Orientation</Link>
          <Link to="/programs" className="nav-button">Programs</Link>
          <Link to="/about" className="nav-button">About US</Link>
          <Link to="/faq" className="nav-button">FAQ</Link>
          <Link to="/contact" className="nav-button active">Contact US</Link>
          <Link to="/signin" className="nav-button">Log In</Link>
          <Link to="/signup" className="nav-button">Create Account</Link>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="contact-section">
        <h1>Contact Us</h1>
        <p>Have questions or need assistance? Get in touch with our team and we'll respond as soon as possible.</p>
        
        <div className="contact-container">
          <div className="contact-method">
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>Send us an email and we'll respond within 24 hours.</p>
            <a href="mailto:ajidiravenir@gmail.com">ajidiravenir@gmail.com</a>
          </div>
          
          <div className="contact-method">
            <i className="fas fa-phone"></i>
            <h3>Call Us</h3>
            <p>Speak directly with one of our team members.</p>
            <a href="tel:+212778711906">+212 7 78 71 19 06</a>
          </div>
          
          <div className="contact-method">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Visit Us</h3>
            <p>Our office is open Monday to Friday from 9am to 6pm.</p>
            <a href="https://www.google.com/maps?q=33.5731,-7.5898" target="_blank" rel="noopener noreferrer" className="map-link">
              <i className="fas fa-map-marker-alt"></i> View on Google Maps
            </a>
            <div className="social-links">
              <a href="https://www.youtube.com/@Diravenir" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              <a href="https://instagram.com/instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="https://facebook.com/profile.php?id=61553731883991" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
