import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaFacebook, FaTwitter, FaCheck } from 'react-icons/fa';
import { MdEmail, MdMessage, MdError } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';
import '../pages/SignUp.css';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [errors, setErrors] = useState({});
  
  const controls = useAnimation();
  const formRef = useRef();
  const isInView = useInView(formRef, { once: true, amount: 0.2 });
  
  // Suppression de l'animation de décalage
  useEffect(() => {
    controls.start('visible');
  }, [controls]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your actual service ID
        'YOUR_TEMPLATE_ID', // Replace with your actual template ID
        e.target,
        'YOUR_PUBLIC_KEY' // Replace with your actual public key
      );
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialClick = (platform) => {
    console.log(`Navigating to ${platform}`);
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p className="hero-subtitle">We're here to help and answer any questions you might have.</p>
          <div className="contact-hero-icons">
            <div className="hero-icon">
              <FaEnvelope className="icon" />
              <span>Email</span>
            </div>
            <div className="hero-icon">
              <FaPhoneAlt className="icon" />
              <span>Call</span>
            </div>
            <div className="hero-icon">
              <FaMapMarkerAlt className="icon" />
              <span>Visit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-methods">
        <motion.div 
          className="contact-method-card"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="method-icon email-icon">
            <FaEnvelope />
          </div>
          <h3>Email Us</h3>
          <p>Send us an email and we'll get back to you as soon as possible.</p>
          <a href="mailto:contact@diravenir.com" className="contact-link">
            contact@diravenir.com
            <span className="link-icon">→</span>
          </a>
        </motion.div>
        
        <motion.div 
          className="contact-method-card"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="method-icon phone-icon">
            <FaPhoneAlt />
          </div>
          <h3>Call Us</h3>
          <p>Mon-Fri from 9am to 6pm</p>
          <a href="tel:+212778711906" className="contact-link">
            +212 7 78 71 19 06
            <span className="link-icon">→</span>
          </a>
        </motion.div>
        
        <motion.div 
          className="contact-method-card"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="method-icon location-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Visit Us</h3>
          <p>123 Education St,<br />Casablanca, Morocco</p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
            onClick={() => handleSocialClick('Google Maps')}
          >
            View on Map
            <span className="link-icon">→</span>
          </a>
        </motion.div>
      </section>

      <section className="contact-form-section" ref={formRef}>
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="form-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Send Us a Message
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Have questions or feedback? We'd love to hear from you!
            </motion.p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus.message && (
              <motion.div 
                className={`form-status-message ${submitStatus.success ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {submitStatus.success ? (
                  <FaCheck className="status-icon" />
                ) : (
                  <MdError className="status-icon" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}
            
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <div className="input-with-icon">
                  <span className="input-icon">
                    <FaEnvelope />
                  </span>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <div className="input-with-icon">
                  <span className="input-icon">
                    <MdEmail />
                  </span>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input" 
                    placeholder="Your Email"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className={`form-group ${errors.subject ? 'error' : ''}`}>
              <div className="input-with-icon">
                <span className="input-icon">
                  <MdMessage />
                </span>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Subject"
                />
              </div>
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>
            
            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <div className="textarea-with-icon">
                <span className="textarea-icon">
                  <FaPaperPlane />
                </span>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea" 
                  placeholder="Your Message" 
                  rows="5"
                ></textarea>
              </div>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <motion.button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <span className="btn-text">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              {!isSubmitting && <IoMdSend className="send-icon" />}
            </motion.button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
