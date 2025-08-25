import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import oauth2Service from '../services/oauth2Service';
import GlobalLayout from '../components/GlobalLayout';

const OAuth2Success = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const handleOAuth2Success = async () => {
            try {
                console.log('🔄 Traitement de la redirection OAuth2...');
                
                // Traiter la redirection OAuth2 avec le service
                const oauth2Result = oauth2Service.processOAuth2Redirect();
                
                if (!oauth2Result) {
                    setError("Aucune information OAuth2 trouvée. Veuillez réessayer la connexion.");
                    setLoading(false);
                    return;
                }
                
                if (!oauth2Result.success) {
                    setError(oauth2Result.message || "Erreur lors de l'authentification OAuth2");
                    setLoading(false);
                    return;
                }
                
                console.log('✅ Redirection OAuth2 traitée avec succès:', oauth2Result);
                
                // Récupérer les informations utilisateur
                const { user } = oauth2Result;
                const { email, name, givenName, familyName, picture } = user;
                
                console.log('👤 Informations utilisateur OAuth2:', user);
                
                // Vérifier le statut côté serveur
                try {
                    const serverStatus = await oauth2Service.checkOAuth2Status();
                    console.log('🔍 Statut serveur OAuth2:', serverStatus);
                    
                    if (serverStatus.authenticated) {
                        console.log('✅ Utilisateur authentifié côté serveur');
                        
                        // Créer un objet utilisateur compatible avec le contexte d'authentification
                        const userData = {
                            id: Date.now(), // ID temporaire
                            email: email,
                            nom: familyName || name.split(' ')[1] || '',
                            prenom: givenName || name.split(' ')[0] || name,
                            role: 'ROLE_USER',
                            picture: picture,
                            isOAuth2User: true
                        };
                        
                        console.log('👤 Données utilisateur formatées:', userData);
                        
                        // Mettre à jour le contexte d'authentification
                        const loginResult = await login({
                            oauth2: true,
                            userData: userData
                        });
                        
                        console.log('🔐 Résultat de la connexion:', loginResult);
                        
                        if (loginResult.success) {
                            setUserInfo(userData);
                            setSuccess(true);
                            
                            // Rediriger vers la page d'accueil après 3 secondes
                            setTimeout(() => {
                                console.log('🔄 Redirection vers la page d\'accueil...');
                                navigate('/');
                            }, 3000);
                        } else {
                            setError(loginResult.message || "Erreur lors de la connexion");
                        }
                    } else {
                        setError("L'utilisateur n'est pas authentifié côté serveur");
                    }
                } catch (serverError) {
                    console.error('❌ Erreur lors de la vérification côté serveur:', serverError);
                    setError("Erreur de communication avec le serveur");
                }
                
            } catch (err) {
                console.error('❌ Erreur OAuth2:', err);
                setError("Erreur lors de l'authentification OAuth2. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        handleOAuth2Success();
    }, [searchParams, navigate, login]);

    if (loading) {
        return (
            <GlobalLayout activePage="oauth2-success">
                <div className="oauth2-success-container">
                    <div className="oauth2-success-content">
                        <div className="oauth2-success-loading">
                            <div className="oauth2-success-spinner"></div>
                            <h2>🔐 Authentification en cours...</h2>
                            <p>Veuillez patienter pendant que nous finalisons votre connexion Google.</p>
                        </div>
                    </div>
                </div>
            </GlobalLayout>
        );
    }

    if (error) {
        return (
            <GlobalLayout activePage="oauth2-success">
                <div className="oauth2-success-container">
                    <div className="oauth2-success-content">
                        <div className="oauth2-success-error">
                            <div className="oauth2-success-error-icon">❌</div>
                            <h2>Erreur d'authentification</h2>
                            <p>{error}</p>
                            <button 
                                onClick={() => navigate('/register')}
                                className="oauth2-success-retry-button"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
            </GlobalLayout>
        );
    }

    if (success && userInfo) {
        return (
            <GlobalLayout activePage="oauth2-success">
                <div className="oauth2-success-container">
                    <div className="oauth2-success-content">
                        <div className="oauth2-success-success">
                            <div className="oauth2-success-success-icon">✅</div>
                            <h2>Authentification réussie !</h2>
                            <div className="oauth2-success-user-info">
                                {userInfo.picture && (
                                    <img 
                                        src={userInfo.picture} 
                                        alt="Photo de profil" 
                                        className="oauth2-success-user-picture"
                                    />
                                )}
                                <div className="oauth2-success-user-details">
                                    <h3>Bienvenue, {userInfo.prenom} {userInfo.nom} !</h3>
                                    <p>Email: {userInfo.email}</p>
                                    <p>Vous allez être redirigé vers la page d'accueil...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GlobalLayout>
        );
    }

    return (
        <GlobalLayout activePage="oauth2-success">
            <div className="oauth2-success-container">
                <div className="oauth2-success-content">
                    <div className="oauth2-success-unknown">
                        <h2>État inconnu</h2>
                        <p>Impossible de déterminer l'état de l'authentification.</p>
                        <button 
                            onClick={() => navigate('/register')}
                            className="oauth2-success-retry-button"
                        >
                            Retour à l'inscription
                        </button>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default OAuth2Success;
