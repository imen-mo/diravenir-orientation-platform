import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte de langue
const LanguageContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
    }
    return context;
};

// Traductions disponibles
const translations = {
    fr: {
        home: 'Accueil',
        orientation: 'Orientation',
        programs: 'Programmes',
        about: 'À propos',
        faq: 'FAQ',
        contact: 'Contact',
        login: 'Connexion',
        register: 'S\'inscrire',
        profile: 'Profil',
        settings: 'Paramètres',
        logout: 'Se déconnecter',
        dashboard: 'Tableau de bord'
    },
    en: {
        home: 'Home',
        orientation: 'Orientation',
        programs: 'Programs',
        about: 'About',
        faq: 'FAQ',
        contact: 'Contact',
        login: 'Login',
        register: 'Register',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        dashboard: 'Dashboard'
    },
    ar: {
        home: 'الرئيسية',
        orientation: 'التوجيه',
        programs: 'البرامج',
        about: 'حول',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        profile: 'الملف الشخصي',
        settings: 'الإعدادات',
        logout: 'تسجيل الخروج',
        dashboard: 'لوحة التحكم'
    }
};

// Composant provider
export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('fr');

    // Charger la langue depuis le localStorage au démarrage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('diravenir-language');
        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    // Sauvegarder la langue dans le localStorage
    const changeLanguage = (language) => {
        if (translations[language]) {
            setCurrentLanguage(language);
            localStorage.setItem('diravenir-language', language);
        }
    };

    // Fonction de traduction
    const t = (key, fallback = key) => {
        return translations[currentLanguage]?.[key] || fallback;
    };

    // Valeurs du contexte
    const value = {
        currentLanguage,
        changeLanguage,
        t,
        availableLanguages: Object.keys(translations)
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
