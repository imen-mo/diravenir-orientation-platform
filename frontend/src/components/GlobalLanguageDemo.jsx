import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const GlobalLanguageDemo = () => {
    const { currentTheme, currentLanguage, changeLanguage, getText } = useTheme();
    const [demoCount, setDemoCount] = useState(0);

    // Forcer le re-render quand la langue change
    useEffect(() => {
        setDemoCount(prev => prev + 1);
    }, [currentLanguage]);

    const languages = ['fr', 'en', 'es'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];

    const changeToNextLanguage = () => {
        console.log(`🌍 Changement global de langue: ${currentLanguage} → ${nextLanguage}`);
        changeLanguage(nextLanguage);
    };

    const testAllLanguages = () => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < languages.length) {
                changeLanguage(languages[index]);
                index++;
            } else {
                clearInterval(interval);
                // Revenir à la langue d'origine
                changeLanguage('fr');
            }
        }, 2000);
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '4px solid #10b981', 
            margin: '20px',
            borderRadius: '15px',
            backgroundColor: currentTheme === 'dark' ? '#065f46' : '#ecfdf5',
            color: currentTheme === 'dark' ? '#f0fdf4' : '#064e3b'
        }}>
            <h3>🌍 DÉMONSTRATION GLOBALE DU CHANGEMENT DE LANGUE</h3>
            <div style={{ marginBottom: '15px' }}>
                <strong>🔄 Re-renders globaux:</strong> {demoCount} (change à chaque changement de langue)
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong>🌍 Langue actuelle:</strong> 
                <span style={{ 
                    fontSize: '1.3em', 
                    fontWeight: 'bold', 
                    color: '#10b981',
                    marginLeft: '10px'
                }}>
                    {currentLanguage.toUpperCase()}
                </span>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <strong>🎯 Prochaine langue:</strong> {nextLanguage.toUpperCase()}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={changeToNextLanguage}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '15px',
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                    }}
                >
                    🌍 Changer vers {nextLanguage.toUpperCase()}
                </button>
                
                <button 
                    onClick={testAllLanguages}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                    }}
                >
                    🚀 Test Automatique de Toutes les Langues
                </button>
            </div>

            <div style={{ 
                border: '2px solid #10b981', 
                padding: '20px', 
                borderRadius: '10px',
                backgroundColor: currentTheme === 'dark' ? '#064e3b' : '#ffffff',
                marginBottom: '20px'
            }}>
                <h4>📝 DÉMONSTRATION DES TRADUCTIONS GLOBALES:</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                    <div>
                        <h5>🏠 Page d'Accueil:</h5>
                        <div><strong>Titre:</strong> {getText('heroTitle')}</div>
                        <div><strong>Sous-titre:</strong> {getText('heroSubtitle')}</div>
                        <div><strong>Bouton 1:</strong> {getText('getStarted')}</div>
                        <div><strong>Bouton 2:</strong> {getText('learnMore')}</div>
                    </div>
                    
                    <div>
                        <h5>⚙️ Paramètres:</h5>
                        <div><strong>Settings:</strong> {getText('settings')}</div>
                        <div><strong>Theme:</strong> {getText('theme')}</div>
                        <div><strong>Language:</strong> {getText('language')}</div>
                        <div><strong>Notifications:</strong> {getText('notifications')}</div>
                    </div>
                    
                    <div>
                        <h5>🔐 Authentification:</h5>
                        <div><strong>Login:</strong> {getText('login')}</div>
                        <div><strong>Register:</strong> {getText('register')}</div>
                        <div><strong>Profile:</strong> {getText('profile')}</div>
                        <div><strong>Logout:</strong> {getText('logout')}</div>
                    </div>
                    
                    <div>
                        <h5>🎯 Navigation:</h5>
                        <div><strong>Home:</strong> {getText('home')}</div>
                        <div><strong>About:</strong> {getText('about')}</div>
                        <div><strong>Contact:</strong> {getText('contact')}</div>
                        <div><strong>Programs:</strong> {getText('programs')}</div>
                    </div>
                </div>
            </div>

            <div style={{ 
                border: '2px solid #f59e0b', 
                padding: '15px', 
                borderRadius: '8px',
                backgroundColor: currentTheme === 'dark' ? '#451a03' : '#fffbeb',
                color: currentTheme === 'dark' ? '#fef3c7' : '#92400e'
            }}>
                <h5>💡 INSTRUCTIONS DE TEST:</h5>
                <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <li><strong>Cliquez sur "Changer vers [LANGUE]"</strong> pour changer la langue</li>
                    <li><strong>Observez que TOUS les textes changent</strong> sur toute la page</li>
                    <li><strong>Naviguez vers d'autres pages</strong> (Settings, Profile) - la langue persiste !</li>
                    <li><strong>Utilisez "Test Automatique"</strong> pour voir toutes les langues en action</li>
                </ol>
            </div>

            <div style={{ 
                marginTop: '15px', 
                fontSize: '0.9em', 
                color: '#6b7280',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                🌟 <strong>MAGIE !</strong> Le changement de langue s'applique maintenant à TOUTE l'application !
            </div>
        </div>
    );
};

export default GlobalLanguageDemo;
