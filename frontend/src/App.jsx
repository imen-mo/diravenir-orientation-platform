import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Correction du layout global
import './styles/fix-layout.css';
import './styles/global-fix.css';
import './styles/themes.css';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext';
import { SimpleAuthProvider } from './contexts/SimpleAuthContext';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import GlobalLayout from './components/GlobalLayout';
import AdminRoute from './components/AdminRoute';
import AdminUserInterface from './components/AdminUserInterface';

// Main Pages
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

// Authentication Pages
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailSent from './pages/VerifyEmailSent';
import OAuth2Success from './pages/OAuth2Success';


// User Pages
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

// Programs Pages
import Programs from './pages/Programs';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetail from './pages/ProgramDetail';
import Apply from './pages/Apply';
import ApplicationSuccess from './pages/ApplicationSuccess';

// Orientation System Pages
import OrientationWelcome from './pages/OrientationWelcome';
import OrientationChoice from './pages/OrientationChoice';
import OrientationCountdown from './pages/OrientationCountdown';
import OrientationQuestion from './pages/OrientationQuestion';
import OrientationQuestion2 from './pages/OrientationQuestion2';
import OrientationQuestion3 from './pages/OrientationQuestion3';
import OrientationQuestion4 from './pages/OrientationQuestion4';
import OrientationQuestion5 from './pages/OrientationQuestion5';
import OrientationQuestion6 from './pages/OrientationQuestion6';
import OrientationQuestion7 from './pages/OrientationQuestion7';
import OrientationQuestion8 from './pages/OrientationQuestion8';
import OrientationQuestion9 from './pages/OrientationQuestion9';
import OrientationQuestion10 from './pages/OrientationQuestion10';
import OrientationQuestion11 from './pages/OrientationQuestion11';
import OrientationQuestion12 from './pages/OrientationQuestion12';
import OrientationQuestion13 from './pages/OrientationQuestion13';
import OrientationQuestion14 from './pages/OrientationQuestion14';
import OrientationQuestion15 from './pages/OrientationQuestion15';
import OrientationResults from './pages/OrientationResults';
import MajorResults from './pages/MajorResults';

// Country Pages
import China from './pages/China';
import Cyprus from './pages/Cyprus';
import Romania from './pages/Romania';
import DestinationPage from './pages/DestinationPage';
import CountryPage from './pages/CountryPage';
import MyTestResults from './pages/MyTestResults';

// University Pages
import Universites from './pages/Universites';
import Etudiant from './pages/Etudiant';

// Admin Pages
import AdminHome from './pages/AdminHome';
import AdminCandidatures from './pages/AdminCandidatures';
import AdminCandidaturesModern from './pages/AdminCandidaturesModern';
import AdminUsers from './pages/AdminUsers';
import AdminPrograms from './pages/AdminPrograms';
import AdminDashboardCharts from './pages/AdminDashboardCharts';
import AdminProgramsCards from './pages/AdminProgramsCards';
import AdminExcelImport from './pages/AdminExcelImport';
import StudentDashboardNew from './pages/StudentDashboardNew';
import StudentDashboardFixed from './pages/StudentDashboardFixed';
import StudentProfile from './pages/StudentProfile';
import StudentPrograms from './pages/StudentPrograms';
import StudentSaved from './pages/StudentSaved';
import StudentTestResults from './pages/StudentTestResults';
import StudentSettings from './pages/StudentSettings';

// Payment Pages
import PaymentSuccess from './pages/PaymentSuccess';

// Test Pages
import CountdownPage from './pages/CountdownPage';
import DashboardTest from './pages/DashboardTest';
import DashboardTestModern from './pages/DashboardTestModern';
import DashboardTestComplete from './pages/DashboardTestComplete';
import EmailDebugPage from './pages/EmailDebugPage';
import EmailTestPage from './pages/EmailTestPage';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SimpleAuthProvider>
          <AuthProvider>
            <Router>
              <div className="App">
                <GlobalLayout>
            <Routes>
                {/* Main Routes */}
              <Route path="/" element={<AdminUserInterface><HomePage /></AdminUserInterface>} />
              <Route path="/welcome" element={<AdminUserInterface><WelcomePage /></AdminUserInterface>} />
                <Route path="/about" element={<AdminUserInterface><About /></AdminUserInterface>} />
                <Route path="/contact" element={<AdminUserInterface><Contact /></AdminUserInterface>} />
                <Route path="/faq" element={<AdminUserInterface><FAQ /></AdminUserInterface>} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
                <Route path="/oauth2-success" element={<OAuth2Success />} />


                {/* User Routes */}
                <Route path="/profile" element={<AdminUserInterface><Profile /></AdminUserInterface>} />
                <Route path="/settings" element={<AdminUserInterface><Settings /></AdminUserInterface>} />
                <Route path="/dashboard" element={<AdminUserInterface><Dashboard /></AdminUserInterface>} />

                {/* Programs Routes */}
              <Route path="/programs" element={<AdminUserInterface><Programs /></AdminUserInterface>} />
              <Route path="/programs-page" element={<AdminUserInterface><ProgramsPage /></AdminUserInterface>} />
              <Route path="/program/:id" element={<AdminUserInterface><ProgramDetail /></AdminUserInterface>} />
                <Route path="/apply/:programId" element={<AdminUserInterface><Apply /></AdminUserInterface>} />
                <Route path="/apply" element={<AdminUserInterface><Apply /></AdminUserInterface>} />
                <Route path="/application-success" element={<AdminUserInterface><ApplicationSuccess /></AdminUserInterface>} />

                {/* Orientation System Routes */}
                <Route path="/orientation" element={<OrientationChoice />} />
                <Route path="/orientation/welcome" element={<OrientationWelcome />} />
                <Route path="/orientation/countdown" element={<OrientationCountdown />} />
                <Route path="/orientation/question/1" element={<OrientationQuestion />} />
                <Route path="/orientation/question/2" element={<OrientationQuestion2 />} />
                <Route path="/orientation/question/3" element={<OrientationQuestion3 />} />
                <Route path="/orientation/question/4" element={<OrientationQuestion4 />} />
                <Route path="/orientation/question/5" element={<OrientationQuestion5 />} />
                <Route path="/orientation/question/6" element={<OrientationQuestion6 />} />
                <Route path="/orientation/question/7" element={<OrientationQuestion7 />} />
                <Route path="/orientation/question/8" element={<OrientationQuestion8 />} />
                <Route path="/orientation/question/9" element={<OrientationQuestion9 />} />
                <Route path="/orientation/question/10" element={<OrientationQuestion10 />} />
                <Route path="/orientation/question/11" element={<OrientationQuestion11 />} />
                <Route path="/orientation/question/12" element={<OrientationQuestion12 />} />
                <Route path="/orientation/question/13" element={<OrientationQuestion13 />} />
                <Route path="/orientation/question/14" element={<OrientationQuestion14 />} />
                <Route path="/orientation/question/15" element={<OrientationQuestion15 />} />
                <Route path="/orientation/results" element={<OrientationResults />} />
                <Route path="/major-results" element={<MajorResults />} />
                <Route path="/my-test-results" element={<MyTestResults />} />

                {/* Country Routes */}
              <Route path="/china" element={<China />} />
              <Route path="/cyprus" element={<Cyprus />} />
              <Route path="/romania" element={<Romania />} />
                <Route path="/destination/:country" element={<DestinationPage />} />
                <Route path="/country/:countryCode" element={<CountryPage />} />

                {/* University Routes */}
                <Route path="/universities" element={<Universites />} />
                <Route path="/etudiant" element={<Etudiant />} />
                
                {/* Student Dashboard Routes */}
                <Route path="/dashboard-student" element={<StudentDashboardFixed />} />
                <Route path="/student/profile" element={<StudentProfile />} />
                <Route path="/student/programs" element={<StudentPrograms />} />
                <Route path="/student/saved" element={<StudentSaved />} />
                <Route path="/student/test-results" element={<StudentTestResults />} />
                <Route path="/student/settings" element={<StudentSettings />} />

                {/* Admin Routes */}
                <Route path="/admin/welcome" element={<AdminRoute><AdminHome /></AdminRoute>} />
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardCharts /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                <Route path="/admin/programs" element={<AdminRoute><AdminProgramsCards /></AdminRoute>} />
                <Route path="/admin/applications" element={<AdminRoute><AdminCandidatures /></AdminRoute>} />
                <Route path="/admin/candidatures" element={<AdminRoute><AdminCandidaturesModern /></AdminRoute>} />
                <Route path="/admin/excel-import" element={<AdminRoute><AdminExcelImport /></AdminRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />

                {/* Payment Routes */}
                <Route path="/payment/success" element={<PaymentSuccess />} />

                {/* Test Routes */}
                <Route path="/test/countdown" element={<CountdownPage />} />
                <Route path="/test/dashboards" element={<DashboardTest />} />
                <Route path="/test/dashboards-modern" element={<DashboardTestModern />} />
                <Route path="/test/dashboards-complete" element={<DashboardTestComplete />} />
                <Route path="/debug/email" element={<EmailDebugPage />} />
                <Route path="/test/email" element={<EmailTestPage />} />

                {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </GlobalLayout>
            
            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
              </div>
            </Router>
          </AuthProvider>
        </SimpleAuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
