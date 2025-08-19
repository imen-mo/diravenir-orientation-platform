import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/GlobalColors.css';


// Auth context
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Composants globaux
import GlobalNavbar from "./components/GlobalNavbar";
import Footer from "./components/Footer";

// Composants de chargement
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
    </div>
);

// Gestion simple des erreurs
const ErrorBoundary = ({ children }) => <>{children}</>;

// Pages
const SignIn = lazy(() => import("./pages/Signin"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignUpSuccess = lazy(() => import("./pages/SignUpSuccess"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const OAuth2Success = lazy(() => import("./pages/OAuth2Success"));
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Universites = lazy(() => import("./pages/Universites"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// Orientation and Test Pages
const UnifiedOrientationTest = lazy(() => import("./components/UnifiedOrientationTest"));
const OrientationResults = lazy(() => import("./pages/OrientationResults"));
const TestWelcome = lazy(() => import("./pages/TestWelcome"));
const TestList = lazy(() => import("./pages/TestList"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));



// Test Page
const TestPage = lazy(() => import("./pages/TestPage"));

// Country Pages
const China = lazy(() => import("./pages/China"));
const Cyprus = lazy(() => import("./pages/Cyprus"));
const Romania = lazy(() => import("./pages/Romania"));

// Layouts
const MainLayout = () => (
    <div className="flex flex-col min-h-screen">
        <GlobalNavbar />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
);

const AuthLayout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Outlet />
    </div>
);

// Route protégée
const PrivateRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingFallback />;
    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<LoadingFallback />}>
                    <ToastContainer />
                    <ErrorBoundary>
                        <Routes>
                            {/* Auth routes */}
                            <Route element={<AuthLayout />}>
                                    <Route path="/signin" element={<SignIn />} />
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/signup-success" element={<SignUpSuccess />} />
                                    <Route path="/verify-email" element={<EmailVerification />} />
                                    <Route path="/oauth2-success" element={<OAuth2Success />} />
                                </Route>

                                {/* Main routes */}
                                <Route element={<MainLayout />}>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/faq" element={<FAQ />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/universites" element={<Universites />} />
                                    <Route path="/programs" element={<Programs />} />
                                    <Route path="/programs/:id" element={<ProgramDetail />} />
                                    
                                    {/* Orientation and Test Routes */}
                                    <Route path="/orientation" element={<WelcomePage />} />
                                    <Route path="/orientation/welcome" element={<WelcomePage />} />
                                    <Route path="/orientation/test" element={<UnifiedOrientationTest />} />
                                    <Route path="/orientation/results" element={<OrientationResults />} />
                                    <Route path="/test" element={<TestWelcome />} />
                                    <Route path="/test/welcome" element={<TestWelcome />} />
                                    <Route path="/test/list" element={<TestList />} />
                                    

                                    
                                    {/* Test Route */}
                                    <Route path="/test-page" element={<TestPage />} />

                                    {/* Country Routes */}
                                    <Route path="/destinations/china" element={<China />} />
                                    <Route path="/destinations/cyprus" element={<Cyprus />} />
                                    <Route path="/destinations/romania" element={<Romania />} />

                                    {/* Protected */}
                                    <Route element={<PrivateRoute />}>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/student-dashboard" element={<StudentDashboard />} />
                                        <Route path="/admin" element={<AdminDashboard />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/settings" element={<Settings />} />
                                    </Route>

                                    <Route path="*" element={<NotFound />} />
                                </Route>
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                </Router>
            </AuthProvider>
    );
}

export default App;
