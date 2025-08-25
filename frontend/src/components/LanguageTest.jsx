import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { testLanguageChange, verifyTranslations } from '../utils/languageTest';

const LanguageTest = () => {
    const { currentTheme, currentLanguage, changeLanguage, getText } = useTheme();
    const [testCount, setTestCount] = useState(0);

    // Forcer le re-render quand la langue change
    useEffect(() => {
        setTestCount(prev => prev + 1);
    }, [currentLanguage]);

    const testLanguages = ['fr', 'en', 'es'];
    const currentIndex = testLanguages.indexOf(currentLanguage);
    const nextLanguage = testLanguages[(currentIndex + 1) % testLanguages.length];

    const changeToNextLanguage = () => {
        console.log(`🌍 Changement de langue: ${currentLanguage} → ${nextLanguage}`);
        changeLanguage(nextLanguage);
    };

    const testAllLanguages = () => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < testLanguages.length) {
                changeLanguage(testLanguages[index]);
                index++;
            } else {
                clearInterval(interval);
                // Revenir à la langue d'origine
                changeLanguage('fr');
            }
        }, 1000);
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '3px solid #8b5cf6', 
            margin: '20px',
            borderRadius: '10px',
            backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#f3f4f6',
            color: currentTheme === 'dark' ? '#f9fafb' : '#1f2937'
        }}>
            <h3>🌍 Test Avancé du Changement de Langue</h3>
            <div style={{ marginBottom: '15px' }}>
                <strong>🔄 Re-renders:</strong> {testCount} (change à chaque changement de langue)
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong>🌍 Langue actuelle:</strong> 
                <span style={{ 
                    fontSize: '1.2em', 
                    fontWeight: 'bold', 
                    color: '#8b5cf6',
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
                        padding: '10px 20px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    🌍 Changer vers {nextLanguage.toUpperCase()}
                </button>
                
                <button 
                    onClick={testAllLanguages}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    🚀 Tester Toutes les Langues
                </button>
                
                <button 
                    onClick={() => testLanguageChange(changeLanguage, getText)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    🧪 Test Automatique
                </button>
            </div>

            <div style={{ 
                border: '1px solid #d1d5db', 
                padding: '15px', 
                borderRadius: '5px',
                backgroundColor: currentTheme === 'dark' ? '#374151' : '#ffffff'
            }}>
                <h4>📝 Test des Traductions:</h4>
                <div><strong>Settings:</strong> {getText('settings')}</div>
                <div><strong>Theme:</strong> {getText('theme')}</div>
                <div><strong>Language:</strong> {getText('language')}</div>
                <div><strong>Notifications:</strong> {getText('notifications')}</div>
                <div><strong>Security:</strong> {getText('security')}</div>
                <div><strong>Privacy:</strong> {getText('privacy')}</div>
            </div>

            <div style={{ 
                marginTop: '15px', 
                fontSize: '0.9em', 
                color: '#6b7280',
                fontStyle: 'italic'
            }}>
                💡 <strong>Test:</strong> Cliquez sur "Changer vers [LANGUE]" et observez que tous les textes changent immédiatement !
            </div>
        </div>
    );
};

export default LanguageTest;
