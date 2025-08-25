import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeDemo.css';

const ThemeDemo = () => {
    const { currentTheme, currentLanguage, changeTheme, changeLanguage, toggleTheme, getText } = useTheme();

    return (
        <div className={`theme-demo ${currentTheme}-theme`}>
            <div className="demo-container">
                <h2>🎨 Démonstration du Thème Global</h2>
                
                <div className="demo-section">
                    <h3>Thème Actuel</h3>
                    <div className="theme-info">
                        <span className="theme-label">Thème:</span>
                        <span className="theme-value">{currentTheme}</span>
                        <button onClick={toggleTheme} className="demo-btn">
                            🔄 Basculer
                        </button>
                    </div>
                </div>

                <div className="demo-section">
                    <h3>Langue Actuelle</h3>
                    <div className="language-info">
                        <span className="language-label">Langue:</span>
                        <span className="language-value">{currentLanguage.toUpperCase()}</span>
                        <div className="language-buttons">
                            <button 
                                onClick={() => changeLanguage('fr')} 
                                className={`demo-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
                            >
                                🇫🇷 Français
                            </button>
                            <button 
                                onClick={() => changeLanguage('en')} 
                                className={`demo-btn ${currentLanguage === 'en' ? 'active' : ''}`}
                            >
                                🇬🇧 English
                            </button>
                            <button 
                                onClick={() => changeLanguage('es')} 
                                className={`demo-btn ${currentLanguage === 'es' ? 'active' : ''}`}
                            >
                                🇪🇸 Español
                            </button>
                        </div>
                    </div>
                </div>

                <div className="demo-section">
                    <h3>Options de Thème</h3>
                    <div className="theme-options">
                        <button 
                            onClick={() => changeTheme('light')} 
                            className={`demo-btn ${currentTheme === 'light' ? 'active' : ''}`}
                        >
                            ☀️ Clair
                        </button>
                        <button 
                            onClick={() => changeTheme('dark')} 
                            className={`demo-btn ${currentTheme === 'dark' ? 'active' : ''}`}
                        >
                            🌙 Sombre
                        </button>
                        <button 
                            onClick={() => changeTheme('auto')} 
                            className={`demo-btn ${currentTheme === 'auto' ? 'active' : ''}`}
                        >
                            🔄 Auto
                        </button>
                    </div>
                </div>

                <div className="demo-section">
                    <h3>Test de Contenu</h3>
                    <div className="content-test">
                        <p>Ceci est un paragraphe de test pour vérifier que le thème s'applique correctement.</p>
                        <div className="test-card">
                            <h4>Carte de Test</h4>
                            <p>Cette carte devrait changer de couleur selon le thème sélectionné.</p>
                            <button className="test-button">Bouton de Test</button>
                        </div>
                    </div>
                </div>

                <div className="demo-section">
                    <h3>Traductions</h3>
                    <div className="translations-test">
                        <p><strong>Paramètres:</strong> {getText('settings')}</p>
                        <p><strong>Notifications:</strong> {getText('notifications')}</p>
                        <p><strong>Sécurité:</strong> {getText('security')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeDemo;
