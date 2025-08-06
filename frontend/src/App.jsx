import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth context
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Composants globaux
import Navbar from "./components/Navbar";
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
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Universites = lazy(() => import("./pages/Universites"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));

// Layouts
const MainLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
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
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <LoadingFallback />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

// ✅ UNE seule fonction App()
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

                                {/* Protected */}
                                <Route element={<PrivateRoute />}>
                                    <Route path="/dashboard" element={<StudentDashboard />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/profile" element={<div>Mon profil</div>} />
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
