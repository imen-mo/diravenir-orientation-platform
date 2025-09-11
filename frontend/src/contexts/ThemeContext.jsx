import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTranslation, getLanguageTranslations } from '../translations';

// Créer le contexte
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé dans un ThemeProvider');
    }
    return context;
};

// Provider du contexte
export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [currentLanguage, setCurrentLanguage] = useState('fr');
    const [isLoading, setIsLoading] = useState(true);

    // Initialisation au montage
    useEffect(() => {
        const initializeThemeAndLanguage = () => {
            try {
                // Récupérer le thème et la langue depuis localStorage
                const storedTheme = localStorage.getItem('theme') || 'light';
                const storedLanguage = localStorage.getItem('language') || 'fr';
                
                setCurrentTheme(storedTheme);
                setCurrentLanguage(storedLanguage);
                
                // Appliquer immédiatement
                applyTheme(storedTheme);
                applyLanguage(storedLanguage);
                
                console.log('🎨 Thème et langue initialisés globalement:', { theme: storedTheme, language: storedLanguage });
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation du thème/langue:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeThemeAndLanguage();
    }, []);

    // Écouter les changements de thème
    useEffect(() => {
        const handleThemeChange = (event) => {
            const newTheme = event.detail.theme;
            setCurrentTheme(newTheme);
            console.log('🎨 Thème changé globalement:', newTheme);
        };

        const handleLanguageChange = (event) => {
            const newLanguage = event.detail.language;
            setCurrentLanguage(newLanguage);
            console.log('🌍 Langue changée globalement:', newLanguage);
        };

        // Écouter les événements des services
        window.addEventListener('themeChanged', handleThemeChange);
        window.addEventListener('languageChanged', handleLanguageChange);

        return () => {
            window.removeEventListener('themeChanged', handleThemeChange);
            window.removeEventListener('languageChanged', handleLanguageChange);
        };
    }, []);

    // Fonctions pour appliquer le thème et la langue
    const applyTheme = (theme) => {
        const root = document.documentElement;
        
        // Supprimer tous les thèmes
        root.classList.remove('light-theme', 'dark-theme');
        
        // Appliquer le nouveau thème
        if (theme === 'dark') {
            root.classList.add('dark-theme');
            root.setAttribute('data-theme', 'dark');
        } else {
            root.classList.add('light-theme');
            root.setAttribute('data-theme', 'light');
        }
        
        // Stocker le thème
        localStorage.setItem('theme', theme);
        
        // Émettre un événement pour notifier les composants
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        
        console.log(`🎨 Thème appliqué: ${theme}`);
    };

    const applyLanguage = (language) => {
        // Appliquer la langue au document
        document.documentElement.lang = language;
        document.documentElement.setAttribute('data-language', language);
        
        // Stocker la langue
        localStorage.setItem('language', language);
        
        // Émettre un événement pour notifier les composants
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
        
        console.log(`🌍 Langue appliquée: ${language}`);
    };

    // Fonctions pour changer le thème et la langue
    const changeTheme = (theme) => {
        applyTheme(theme);
        setCurrentTheme(theme);
    };

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        changeTheme(newTheme);
        return newTheme;
    };

    const changeLanguage = (language) => {
        console.log(`🌍 Changement de langue demandé: ${language}`);
        
        // D'abord mettre à jour l'état pour forcer le re-render
        setCurrentLanguage(language);
        
        // Ensuite appliquer la langue
        applyLanguage(language);
        
        console.log(`🌍 Langue mise à jour dans l'état: ${language}`);
        
        // Forcer un re-render global
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
    };

    // Valeur du contexte
    const value = {
        // État
        currentTheme,
        currentLanguage,
        isLoading,
        
        // Fonctions
        changeTheme,
        toggleTheme,
        changeLanguage,
        applyTheme,
        applyLanguage,
        
        // Système de traductions complet pour toute l'application
        getText: (key, params = {}) => {
            try {
                return getTranslation(key, currentLanguage, params);
            } catch (error) {
                console.warn(`Translation error for key "${key}":`, error);
                return key; // Retourner la clé si la traduction échoue
            }
        },
        
        // Obtenir toutes les traductions de la langue actuelle
        getTranslations: () => {
            return getLanguageTranslations(currentLanguage);
        },
        
        // Vérifier si une clé de traduction existe
        hasTranslation: (key) => {
            const translation = getTranslation(key, currentLanguage);
            return translation !== key;
        }
    };

    if (isLoading) {
        return (
            <div className="theme-loading">
                <div className="loading-spinner">🎨</div>
                <p>Chargement du thème...</p>
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
