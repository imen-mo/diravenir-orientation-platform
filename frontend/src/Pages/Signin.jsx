import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleLogin from '../components/GoogleLogin';
import logo from '../assets/logo.png';
import illustration from '../assets/illustration.jpg';
import { motion } from "framer-motion";
import Footer from '../components/Footer';
import "../pages/SignUp.css";
import GlobalNavbar from '../components/GlobalNavbar';
import LoginTest from '../components/LoginTest';


// Composant interne pour utiliser le hook reCAPTCHA
function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);


  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedRememberMe) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('rememberMe');
      }

      await login(formData.email, formData.password);
      toast.success('Connexion réussie !');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Erreur de connexion:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response?.data : null) || "Erreur lors de la connexion. Veuillez réessayer.";
      setError(errorMessage);
      toast.error('Échec de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-elegant">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header / Nav */}
      <GlobalNavbar activePage="signin" />

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
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="welcome-subtitle-elegant"
              >
                Sign in to continue your journey
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input-elegant"
                  />
                  <div className="input-focus-border"></div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options-elegant">
                <label className="checkbox-container-elegant">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                  />
                  <span className="checkmark-elegant"></span>
                  <span className="checkbox-text">Se souvenir de moi</span>
                </label>
                <a href="#" className="forgot-link-elegant">
                  Mot de passe oublié ?
                </a>
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

              <motion.button
                type="submit"
                className="login-btn-elegant"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                <span className="btn-text-elegant">
                  {loading ? "Connexion en cours..." : "Se connecter"}
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
              <p>Pas encore de compte ? <Link to="/signup" className="signup-link-elegant">S'inscrire</Link></p>
            </motion.div>

            {/* Composant de test de connexion */}
            <LoginTest />
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

export default function SignIn() {
  return <SignInForm />;
}
