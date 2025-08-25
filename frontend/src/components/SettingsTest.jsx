import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SettingsTest = () => {
    const { currentTheme, currentLanguage, changeTheme, changeLanguage, getText } = useTheme();

    const testLanguageChange = () => {
        const languages = ['fr', 'en', 'es'];
        const currentIndex = languages.indexOf(currentLanguage);
        const nextLanguage = languages[(currentIndex + 1) % languages.length];
        changeLanguage(nextLanguage);
        console.log(`🌍 Langue changée vers: ${nextLanguage}`);
    };

    const testThemeChange = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        changeTheme(newTheme);
        console.log(`🎨 Thème changé vers: ${newTheme}`);
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '2px solid #ccc', 
            margin: '20px',
            backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
            color: currentTheme === 'dark' ? '#fff' : '#333'
        }}>
            <h3>🧪 Test des Paramètres</h3>
            <div>
                <strong>Thème actuel:</strong> {currentTheme}
                <button onClick={testThemeChange} style={{ marginLeft: '10px' }}>
                    🔄 Changer Thème
                </button>
            </div>
            <div>
                <strong>Langue actuelle:</strong> {currentLanguage.toUpperCase()}
                <button onClick={testLanguageChange} style={{ marginLeft: '10px' }}>
                    🌍 Changer Langue
                </button>
            </div>
            <div>
                <strong>Test de traduction:</strong> {getText('settings')}
            </div>
        </div>
    );
};

export default SettingsTest;
