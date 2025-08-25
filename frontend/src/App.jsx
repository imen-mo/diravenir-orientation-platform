import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute, { PublicRoute } from './components/ProtectedRoute';
import { initCookieService } from './services/cookieService';

// Styles globaux
import './styles/globalTheme.css';

// Pages d'authentification
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailSent from './pages/VerifyEmailSent';
import OAuth2Success from './pages/OAuth2Success';
import OAuth2Failure from './pages/OAuth2Failure';

// Pages protégées - Dashboard supprimé

// Pages existantes originales
import HomePage from './pages/HomePage';
import UnifiedOrientationTest from './components/UnifiedOrientationTest';
import OrientationTest from './components/OrientationTest';
import OrientationResults from './pages/OrientationResults';
import ThemeDemo from './components/ThemeDemo';
import WelcomePage from './pages/WelcomePage';
import TestWelcome from './pages/TestWelcome';
import TestList from './pages/TestList';
import TestPage from './pages/TestPage';
import HeaderTest from './pages/HeaderTest';
import NavbarTest from './pages/NavbarTest';
import SimpleNavbarTest from './pages/SimpleNavbarTest';

// Autres pages existantes
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Apply from './pages/Apply';
import DestinationPage from './pages/DestinationPage';
import China from './pages/China';
import Cyprus from './pages/Cyprus';
import Romania from './pages/Romania';
import Universites from './pages/Universites';
import Etudiant from './pages/Etudiant';
import PersonalizedResults from './pages/PersonalizedResults';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const App = () => {
  // Initialiser le service de cookies au démarrage de l'application
  useEffect(() => {
    initCookieService();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
            {/* Routes publiques existantes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/destination/:id" element={<DestinationPage />} />
            <Route path="/china" element={<China />} />
            <Route path="/cyprus" element={<Cyprus />} />
            <Route path="/romania" element={<Romania />} />
            <Route path="/universities" element={<Universites />} />
            <Route path="/etudiant" element={<Etudiant />} />
            <Route path="/personalized-results" element={<PersonalizedResults />} />
            <Route path="/orientation" element={<UnifiedOrientationTest />} />
            <Route path="/orientation/test" element={<UnifiedOrientationTest />} />
            <Route path="/orientation/results" element={<OrientationResults />} />
            <Route path="/orientation-test" element={<OrientationTest />} />
            <Route path="/results" element={<OrientationResults />} />
            <Route path="/theme-demo" element={<ThemeDemo />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/test-welcome" element={<TestWelcome />} />
            <Route path="/test-list" element={<TestList />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/header-test" element={<HeaderTest />} />
            <Route path="/navbar-test" element={<NavbarTest />} />
            <Route path="/simple-navbar-test" element={<SimpleNavbarTest />} />
            
            {/* Routes d'authentification publiques */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } 
            />
            <Route 
              path="/reset-password" 
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } 
            />
            <Route 
              path="/verify-email" 
              element={
                <PublicRoute>
                  <VerifyEmail />
                </PublicRoute>
              } 
            />
            <Route 
              path="/verify-email-sent" 
              element={
                <PublicRoute>
                  <VerifyEmailSent />
                </PublicRoute>
              } 
            />
            
            {/* Routes OAuth2 Google */}
            <Route 
              path="/oauth2-success" 
              element={
                <PublicRoute>
                  <OAuth2Success />
                </PublicRoute>
              } 
            />
            <Route 
              path="/oauth2-failure" 
              element={
                <PublicRoute>
                  <OAuth2Failure />
                </PublicRoute>
              } 
            />

            {/* Routes protégées - Dashboard supprimé car redirection vers HOMEPAGE */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Route Admin - AJOUTÉE ! */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Routes pour les tableaux de bord */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />



            {/* Route 404 */}
            <Route path="/404" element={<NotFound />} />
            
            {/* Redirection par défaut */}
            <Route path="*" element={<NotFound />} />
                      </Routes>
          </div>
        </Router>
      </ThemeProvider>
      </AuthProvider>
  );
};

export default App;
