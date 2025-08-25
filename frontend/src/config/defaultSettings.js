// Configuration des paramètres par défaut
export const defaultSettings = {
    // Préférences générales
    languePreferee: 'fr',
    theme: 'light',
    timezone: 'Europe/Paris',
    
    // Notifications
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    
    // Tests et orientation
    saveTestResults: true,
    personalizedRecommendations: true,
    weeklyDigest: false,
    newProgramsAlert: true,
    
    // Confidentialité
    dataAnalytics: false,
    shareProfile: false,
    marketingEmails: false,
    
    // Sécurité
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 30
};

// Configuration des thèmes supportés
export const supportedThemes = [
    { value: 'light', label: '☀️ Clair', icon: '☀️' },
    { value: 'dark', label: '🌙 Sombre', icon: '🌙' },
    { value: 'auto', label: '🔄 Automatique', icon: '🔄' }
];

// Configuration des langues supportées
export const supportedLanguages = [
    { value: 'fr', label: '🇫🇷 Français', icon: '🇫🇷' },
    { value: 'en', label: '🇬🇧 English', icon: '🇬🇧' },
    { value: 'es', label: '🇪🇸 Español', icon: '🇪🇸' }
];

// Configuration des fuseaux horaires
export const supportedTimezones = [
    { value: 'Europe/Paris', label: '🇫🇷 Paris (UTC+1/+2)' },
    { value: 'Europe/London', label: '🇬🇧 Londres (UTC+0/+1)' },
    { value: 'America/New_York', label: '🇺🇸 New York (UTC-5/-4)' },
    { value: 'Asia/Tokyo', label: '🇯🇵 Tokyo (UTC+9)' },
    { value: 'Australia/Sydney', label: '🇦🇺 Sydney (UTC+10/+11)' }
];
