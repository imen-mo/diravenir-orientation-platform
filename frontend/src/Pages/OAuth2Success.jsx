import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import GlobalLayout from '../components/GlobalLayout';
import './Auth.css';

const OAuth2Success = () => {
    const { getText } = useTheme();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const email = searchParams.get('email');
        const firstName = searchParams.get('firstName');
        const lastName = searchParams.get('lastName');
        const userId = searchParams.get('userId');
        
        if (token && email) {
            // Stocker les informations utilisateur
            localStorage.setItem('token', token);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            localStorage.setItem('user', JSON.stringify({
                id: userId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: 'USER'
            }));
            
            // Rediriger vers la page d'accueil après 2 secondes
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 2000);
        } else {
            // Rediriger vers la page de connexion si pas de token
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);
    
    return (
        <GlobalLayout>
            <div className="auth-container">
                <div className="auth-card success">
                    <div className="success-icon">✅</div>
                    <h2>Connexion réussie !</h2>
                    <p>Vous avez été connecté avec succès via Google.</p>
                    <p>Redirection vers la page d'accueil...</p>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default OAuth2Success;
