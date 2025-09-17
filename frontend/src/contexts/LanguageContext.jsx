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
        dashboard: 'Tableau de bord',
        // Settings page
        personalInfo: 'Informations personnelles',
        preferences: 'Préférences',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        birthDate: 'Date de naissance',
        language: 'Langue',
        theme: 'Thème',
        lightTheme: 'Clair',
        darkTheme: 'Sombre',
        saveSettings: 'Sauvegarder les paramètres',
        settingsSaved: 'Paramètres sauvegardés avec succès !',
        saveError: 'Erreur lors de la sauvegarde',
        loadingSettings: 'Chargement des paramètres...',
        unauthorizedAccess: 'Accès non autorisé',
        loginRequired: 'Veuillez vous connecter pour accéder aux paramètres.'
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
        dashboard: 'Dashboard',
        // Settings page
        personalInfo: 'Personal Information',
        preferences: 'Preferences',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        birthDate: 'Birth Date',
        language: 'Language',
        theme: 'Theme',
        lightTheme: 'Light',
        darkTheme: 'Dark',
        saveSettings: 'Save Settings',
        settingsSaved: 'Settings saved successfully!',
        saveError: 'Error saving settings',
        loadingSettings: 'Loading settings...',
        unauthorizedAccess: 'Unauthorized Access',
        loginRequired: 'Please log in to access settings.'
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
        dashboard: 'لوحة التحكم',
        // Settings page
        personalInfo: 'المعلومات الشخصية',
        preferences: 'التفضيلات',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        birthDate: 'تاريخ الميلاد',
        language: 'اللغة',
        theme: 'المظهر',
        lightTheme: 'فاتح',
        darkTheme: 'داكن',
        saveSettings: 'حفظ الإعدادات',
        settingsSaved: 'تم حفظ الإعدادات بنجاح!',
        saveError: 'خطأ في حفظ الإعدادات',
        loadingSettings: 'جاري تحميل الإعدادات...',
        unauthorizedAccess: 'وصول غير مصرح به',
        loginRequired: 'يرجى تسجيل الدخول للوصول إلى الإعدادات.'
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
