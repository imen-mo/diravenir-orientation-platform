import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../assets/logo.png';
import GoogleLogin from '../components/GoogleLogin';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

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

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // if (!recaptchaToken) {
    //   setError("Veuillez valider le reCAPTCHA.");
    //   setLoading(false);
    //   return;
    // }

    try {
      if (rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('rememberMe');
      }

      await login(formData.email, formData.password, recaptchaToken);
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
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="flex min-h-screen">
        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img src={logo} alt="Logo" className="h-20 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
              <p className="text-gray-600">Connectez-vous pour accéder à votre compte</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Se souvenir de moi
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              {/* Désactiver reCAPTCHA dans le formulaire : */}
              {/* <div style={{ margin: '16px 0' }}>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleRecaptchaVerify}
                />
              </div> */}

              <div>
                <button
                  type="submit"
                  disabled={loading || !recaptchaToken}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Ou continuez avec</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <GoogleLogin className="w-full" variant="default" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Bienvenue sur DirAvenir</h2>
            <p className="text-xl">Votre plateforme d'orientation universitaire personnalisée</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} DirAvenir. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Conditions d'utilisation
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
