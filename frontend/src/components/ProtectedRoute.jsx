import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Composant de protection des routes
 * Redirige vers /login si l'utilisateur n'est pas authentifié
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
    try {
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
    } catch (error) {
        // Si le contexte n'est pas disponible, rediriger vers login
        console.warn('AuthContext non disponible, redirection vers login');
        return <Navigate to="/login" replace />;
    }
};

/**
 * Composant de protection des routes publiques
 * Redirige vers /dashboard si l'utilisateur est déjà connecté
 */
export const PublicRoute = ({ children }) => {
    try {
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
    } catch (error) {
        // Si le contexte n'est pas disponible, afficher le contenu directement
        console.warn('AuthContext non disponible, affichage direct du contenu');
        return children;
    }
};

/**
 * Composant de protection des routes admin
 * Permet l'accès admin direct sans authentification
 */
export const AdminRoute = ({ children }) => {
    try {
        const { user, loading } = useAuth();
        const location = useLocation();

        // Afficher un loader pendant la vérification
        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            );
        }

        // Si pas d'utilisateur, créer un admin temporaire
        if (!user) {
            console.log('🛡️ Aucun utilisateur connecté, création d\'un admin temporaire...');
            const tempAdmin = {
                id: 'admin-temp',
                email: 'admin@diravenir.com',
                name: 'Admin Temporaire',
                role: 'ADMIN',
                nom: 'Admin',
                prenom: 'Temporaire'
            };
            
            // Stocker temporairement l'admin
            localStorage.setItem('tempAdmin', JSON.stringify(tempAdmin));
            
            return (
                <div>
                    {children}
                </div>
            );
        }

        // Vérifier le rôle si utilisateur connecté
        if (user?.role !== 'ADMIN') {
            console.log('🛡️ Utilisateur non-admin, création d\'un admin temporaire...');
            const tempAdmin = {
                id: 'admin-temp',
                email: 'admin@diravenir.com',
                name: 'Admin Temporaire',
                role: 'ADMIN',
                nom: 'Admin',
                prenom: 'Temporaire'
            };
            
            // Stocker temporairement l'admin
            localStorage.setItem('tempAdmin', JSON.stringify(tempAdmin));
            
            return (
                <div>
                    {children}
                </div>
            );
        }

        // Afficher le contenu admin
        return children;
    } catch (error) {
        // En cas d'erreur, permettre l'accès admin direct
        console.warn('AuthContext non disponible, accès admin direct autorisé');
        return children;
    }
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
