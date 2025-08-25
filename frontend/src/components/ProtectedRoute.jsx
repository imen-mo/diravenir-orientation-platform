import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Composant de protection des routes
 * Redirige vers /login si l'utilisateur n'est pas authentifié
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    // Afficher un loader pendant la vérification
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Rediriger vers login si non authentifié
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Vérifier le rôle si requis
    if (requiredRole && user?.role !== requiredRole) {
        // Rediriger vers une page d'erreur ou la page d'accueil
        return <Navigate to="/unauthorized" replace />;
    }

    // Afficher le contenu protégé
    return children;
};

/**
 * Composant de protection des routes publiques
 * Redirige vers /dashboard si l'utilisateur est déjà connecté
 */
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

/**
 * Composant de protection des routes admin
 */
export const AdminRoute = ({ children }) => {
    return (
        <ProtectedRoute requiredRole="ADMIN">
            {children}
        </ProtectedRoute>
    );
};

/**
 * Composant de protection des routes étudiant
 */
export const StudentRoute = ({ children }) => {
    return (
        <ProtectedRoute requiredRole="ETUDIANT">
            {children}
        </ProtectedRoute>
    );
};

export default ProtectedRoute;
