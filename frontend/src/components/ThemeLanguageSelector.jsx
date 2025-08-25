import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import './ThemeLanguageSelector.css';

const ThemeLanguageSelector = () => {
    const { currentTheme, currentLanguage, changeTheme, changeLanguage, toggleTheme, getText } = useTheme();
    const { isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Ne pas afficher le sélecteur si l'utilisateur n'est pas connecté
    if (!isAuthenticated) {
        return null;
    }

    const handleThemeChange = (theme) => {
        changeTheme(theme);
        setIsOpen(false);
    };

    const handleLanguageChange = (language) => {
        changeLanguage(language);
        setIsOpen(false);
    };

    const handleToggleTheme = () => {
        toggleTheme();
    };

    return (
        <div className="theme-language-selector">
            {/* Bouton de basculement rapide du thème */}
            <button
                className="theme-toggle-btn"
                onClick={handleToggleTheme}
                title={currentTheme === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair'}
            >
                {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Menu déroulant pour plus d'options */}
            <div className="selector-dropdown">
                <button
                    className="dropdown-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    title="Paramètres de thème et langue"
                >
                    ⚙️
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        {/* Section Thème */}
                        <div className="dropdown-section">
                            <h4>🎨 Thème</h4>
                            <div className="theme-options">
                                <button
                                    className={`theme-option ${currentTheme === 'light' ? 'active' : ''}`}
                                    onClick={() => handleThemeChange('light')}
                                >
                                    ☀️ Clair
                                </button>
                                <button
                                    className={`theme-option ${currentTheme === 'dark' ? 'active' : ''}`}
                                    onClick={() => handleThemeChange('dark')}
                                >
                                    🌙 Sombre
                                </button>
                                <button
                                    className={`theme-option ${currentTheme === 'auto' ? 'active' : ''}`}
                                    onClick={() => handleThemeChange('auto')}
                                >
                                    🔄 Auto
                                </button>
                            </div>
                        </div>

                        {/* Section Langue */}
                        <div className="dropdown-section">
                            <h4>🌍 Langue</h4>
                            <div className="language-options">
                                <button
                                    className={`language-option ${currentLanguage === 'fr' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('fr')}
                                >
                                    🇫🇷 Français
                                </button>
                                <button
                                    className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('en')}
                                >
                                    🇬🇧 English
                                </button>
                                <button
                                    className={`language-option ${currentLanguage === 'es' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('es')}
                                >
                                    🇪🇸 Español
                                </button>
                            </div>
                        </div>

                        {/* Statut actuel */}
                        <div className="current-status">
                            <div className="status-item">
                                <span className="status-label">Thème:</span>
                                <span className="status-value">{currentTheme}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Langue:</span>
                                <span className="status-value">{currentLanguage.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Indicateur de langue actuelle */}
            <div className="current-language-indicator">
                {currentLanguage === 'fr' && '🇫🇷'}
                {currentLanguage === 'en' && '🇬🇧'}
                {currentLanguage === 'es' && '🇪🇸'}
            </div>
        </div>
    );
};

export default ThemeLanguageSelector;
