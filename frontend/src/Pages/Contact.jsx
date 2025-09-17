import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaFacebook, FaTwitter, FaCheck } from 'react-icons/fa';
import { MdEmail, MdMessage, MdError } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';
import logo from '../assets/logo.png';
import GlobalLayout from '../components/GlobalLayout';
import { useTranslations } from '../hooks/useTranslations';

const Contact = () => {
  const { t } = useTranslations();
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
      newErrors.name = t('fullName') + ' ' + t('required');
    }
    
    if (!formData.email) {
      newErrors.email = t('email') + ' ' + t('required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('subject') + ' ' + t('required');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('message') + ' ' + t('required');
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
        message: t('messageSentSuccess')
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
        message: t('messageSentError')
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialClick = (platform) => {
    console.log(`Navigating to ${platform}`);
  };

  return (
    <GlobalLayout activePage="contact">
      <div className="contact-page">
      {/* Éléments décoratifs comme dans l'image */}
      <div className="decorative-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      
      <div className="decorative-circle"></div>
      
      {/* Formulaire de contact en premier, juste après le header */}
      <section className="contact-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>{t('contactTitle')}</h2>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus.message && (
              <div className={`form-status-message ${submitStatus.type}`}>
                <span className="status-icon">
                  {submitStatus.type === 'success' ? <FaCheck /> : <MdError />}
                </span>
                {submitStatus.message}
              </div>
            )}
            
            {/* Première ligne : Your name et Contact email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('fullName')}*</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder={t('fullName') + '*'}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('email')}*</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="contact@gmail.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            {/* Deuxième ligne : Phone Number et Subject */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">{t('phoneNumber')}*</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder={t('phoneNumber') + '*'}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{t('subject')}*</label>
                <select 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">{t('selectSubject')}</option>
                  <option value="Orientation">{t('orientation')}</option>
                  <option value="Payment Failure">{t('paymentFailure')}</option>
                  <option value="Other">{t('other')}</option>
                </select>
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
            </div>
            
            {/* Troisième ligne : Your message (pleine largeur) */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="message">{t('message')}*</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea" 
                  placeholder={t('typeMessage')}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
            </div>
            
            {/* Disclaimer text comme dans l'image */}
            <p className="disclaimer-text">
              {t('termsAgreement')}
            </p>
            
            <motion.button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-text">{t('send')}</span>
              <IoMdSend className="send-icon" />
            </motion.button>
          </form>
        </div>
      </section>

      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>{t('getInTouch')}</h1>
          <p className="hero-subtitle">{t('hereToHelp')}</p>
        </div>
      </section>

      <section className="contact-methods">
        <div className="contact-method-card">
          <div className="method-icon email-icon">
            <FaEnvelope />
          </div>
          <div className="method-content">
            <h3>{t('emailUs')}</h3>
            <p>{t('emailUsDescription')}</p>
            <a href="mailto:contact@diravenir.com" className="contact-link">
              contact@diravenir.com
              <span className="link-icon">→</span>
            </a>
          </div>
        </div>

        <div className="contact-method-card">
          <div className="method-icon phone-icon">
            <FaPhoneAlt />
          </div>
          <div className="method-content">
            <h3>{t('callUs')}</h3>
            <p>{t('callUsDescription')}</p>
            <a href="tel:+1234567890" className="contact-link">
              +1 (234) 567-890
              <span className="link-icon">→</span>
            </a>
          </div>
        </div>

        <div className="contact-method-card">
          <div className="method-icon location-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="method-content">
            <h3>{t('visitUs')}</h3>
            <p>{t('visitUsDescription')}</p>
            <a href="https://maps.app.goo.gl/LX6f589uVm12t5qy9" className="contact-link" target="_blank" rel="noopener noreferrer">
              {t('viewOnMap')}
              <span className="link-icon">→</span>
            </a>
          </div>
        </div>
      </section>
      </div>
    </GlobalLayout>
  );
};

export default Contact;