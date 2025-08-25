import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCookie, hasCookie, checkAuthConsistency } from '../services/cookieService';

const CookieTest = () => {
    const { user, isAuthenticated } = useAuth();
    const [cookieStatus, setCookieStatus] = useState({});
    const [consistency, setConsistency] = useState({});

    useEffect(() => {
        checkCookies();
        const interval = setInterval(checkCookies, 2000); // Vérifier toutes les 2 secondes
        return () => clearInterval(interval);
    }, []);

    const checkCookies = () => {
        // Vérifier les cookies d'authentification
        const jwtCookie = getCookie('jwt_token');
        const oauth2Cookie = getCookie('oauth2_state');
        
        setCookieStatus({
            jwt_token: {
                exists: !!jwtCookie,
                value: jwtCookie ? `${jwtCookie.substring(0, 20)}...` : 'N/A',
                hasCookie: hasCookie('jwt_token')
            },
            oauth2_state: {
                exists: !!oauth2Cookie,
                value: oauth2Cookie || 'N/A',
                hasCookie: hasCookie('oauth2_state')
            }
        });

        // Vérifier la cohérence
        setConsistency(checkAuthConsistency());
    };

    const testNavigation = () => {
        // Simuler une navigation
        window.history.pushState({}, '', '/test-cookies');
        setTimeout(() => {
            window.history.back();
            checkCookies();
        }, 1000);
    };

    const testPageReload = () => {
        // Simuler un rechargement de page
        const currentCookies = document.cookie;
        console.log('🍪 Cookies avant rechargement:', currentCookies);
        
        // Simuler un rechargement
        setTimeout(() => {
            checkCookies();
            console.log('🍪 Cookies après rechargement simulé:', document.cookie);
        }, 500);
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '4px solid #8b5cf6', 
            margin: '20px',
            borderRadius: '15px',
            backgroundColor: '#f3f4f6',
            color: '#1f2937'
        }}>
            <h3>🍪 TEST DE PERSISTANCE DES COOKIES D'AUTHENTIFICATION</h3>
            
            <div style={{ marginBottom: '20px' }}>
                <strong>🔐 État d'authentification:</strong> 
                <span style={{ 
                    fontSize: '1.2em', 
                    fontWeight: 'bold', 
                    color: isAuthenticated ? '#10b981' : '#ef4444',
                    marginLeft: '10px'
                }}>
                    {isAuthenticated ? 'CONNECTÉ' : 'NON CONNECTÉ'}
                </span>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <strong>👤 Utilisateur:</strong> {user ? user.name : 'Aucun'}
            </div>

            <div style={{ 
                border: '2px solid #8b5cf6', 
                padding: '15px', 
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                marginBottom: '20px'
            }}>
                <h4>🍪 ÉTAT DES COOKIES:</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    <div>
                        <h5>JWT Token:</h5>
                        <div><strong>Existe:</strong> {cookieStatus.jwt_token?.exists ? '✅ OUI' : '❌ NON'}</div>
                        <div><strong>Valeur:</strong> {cookieStatus.jwt_token?.value}</div>
                        <div><strong>Cookie valide:</strong> {cookieStatus.jwt_token?.hasCookie ? '✅ OUI' : '❌ NON'}</div>
                    </div>
                    
                    <div>
                        <h5>OAuth2 State:</h5>
                        <div><strong>Existe:</strong> {cookieStatus.oauth2_state?.exists ? '✅ OUI' : '❌ NON'}</div>
                        <div><strong>Valeur:</strong> {cookieStatus.oauth2_state?.value}</div>
                        <div><strong>Cookie valide:</strong> {cookieStatus.oauth2_state?.hasCookie ? '✅ OUI' : '❌ NON'}</div>
                    </div>
                </div>
            </div>

            <div style={{ 
                border: '2px solid #10b981', 
                padding: '15px', 
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                marginBottom: '20px'
            }}>
                <h4>🔄 COHÉRENCE AUTHENTIFICATION:</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <strong>Cookie JWT:</strong> {consistency.hasCookie ? '✅ OUI' : '❌ NON'}
                    </div>
                    <div>
                        <strong>localStorage Token:</strong> {consistency.hasLocal ? '✅ OUI' : '❌ NON'}
                    </div>
                    <div>
                        <strong>Cohérence:</strong> 
                        <span style={{ 
                            color: consistency.isConsistent ? '#10b981' : '#ef4444',
                            fontWeight: 'bold'
                        }}>
                            {consistency.isConsistent ? '✅ OUI' : '❌ NON'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={checkCookies}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '15px',
                        fontSize: '1em'
                    }}
                >
                    🔄 Vérifier Cookies
                </button>
                
                <button 
                    onClick={testNavigation}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '15px',
                        fontSize: '1em'
                    }}
                >
                    🧭 Test Navigation
                </button>
                
                <button 
                    onClick={testPageReload}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1em'
                    }}
                >
                    🔄 Test Rechargement
                </button>
            </div>

            <div style={{ 
                border: '2px solid #f59e0b', 
                padding: '15px', 
                borderRadius: '8px',
                backgroundColor: '#fffbeb',
                color: '#92400e'
            }}>
                <h5>💡 INSTRUCTIONS DE TEST:</h5>
                <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <li><strong>Connectez-vous via Google OAuth2</strong></li>
                    <li><strong>Naviguez entre les pages</strong> - les cookies doivent persister</li>
                    <li><strong>Utilisez "Test Navigation"</strong> pour simuler une navigation</li>
                    <li><strong>Utilisez "Test Rechargement"</strong> pour vérifier la persistance</li>
                    <li><strong>Vérifiez la cohérence</strong> entre cookies et localStorage</li>
                </ol>
            </div>

            <div style={{ 
                marginTop: '15px', 
                fontSize: '0.9em', 
                color: '#6b7280',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                🌟 <strong>RÉSULTAT ATTENDU:</strong> Les cookies doivent persister lors de la navigation et du rechargement !
            </div>
        </div>
    );
};

export default CookieTest;
