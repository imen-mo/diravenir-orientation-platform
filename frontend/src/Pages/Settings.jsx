import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import GlobalLayout from '../components/GlobalLayout';
import API from '../services/api';
import notificationService from '../services/notificationService';
import { defaultSettings, supportedThemes, supportedLanguages, supportedTimezones } from '../config/defaultSettings';
import './Settings.css';

export default function Settings() {
    const { user } = useAuth();
    const { currentTheme, currentLanguage, changeTheme, changeLanguage, getText } = useTheme();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [settings, setSettings] = useState({
        ...defaultSettings,
        languePreferee: currentLanguage,
        theme: currentTheme
    });

    // Charger les paramètres au montage
    useEffect(() => {
        if (user) {
            loadUserSettings();
        }
    }, [user]);

    // Charger les paramètres depuis l'API
    const loadUserSettings = async () => {
        try {
            setLoading(true);
            const response = await API.get('/auth/settings');
            
            if (response.data.status === 'success') {
                const userSettings = response.data.settings;
                setSettings(prev => ({
                    ...prev,
                    ...userSettings
                }));
                
                // Appliquer les paramètres chargés
                if (userSettings.theme) {
                    changeTheme(userSettings.theme);
                }
                if (userSettings.languePreferee) {
                    changeLanguage(userSettings.languePreferee);
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement des paramètres:', error);
            // En cas d'erreur, on garde les valeurs par défaut
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setSettings(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Gérer les changements en temps réel
        if (name === 'theme') {
            changeTheme(newValue);
        } else if (name === 'languePreferee') {
            changeLanguage(newValue);
        } else if (name === 'notifications') {
            // Si on active les notifications, demander la permission
            if (newValue) {
                const granted = await notificationService.requestPermission();
                if (!granted) {
                    // Si la permission est refusée, remettre à false
                    setSettings(prev => ({ ...prev, notifications: false }));
                    setMessage({ type: 'error', text: '❌ Permission de notification refusée' });
                }
            }
        } else if (name === 'pushNotifications' && newValue) {
            // Demander la permission pour les notifications push
            const granted = await notificationService.requestPermission();
            if (!granted) {
                setSettings(prev => ({ ...prev, pushNotifications: false }));
                setMessage({ type: 'error', text: '❌ Permission de notification push refusée' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await API.put('/auth/settings', settings);
            
            if (response.data.status === 'success') {
                setMessage({ type: 'success', text: '✅ Paramètres sauvegardés avec succès !' });
                
                // Appliquer le thème immédiatement
                if (settings.theme === 'dark') {
                    document.documentElement.classList.add('dark-theme');
                } else {
                    document.documentElement.classList.remove('dark-theme');
                }
                
                // Appliquer la langue
                document.documentElement.lang = settings.languePreferee;
                
            } else {
                throw new Error(response.data.message || 'Erreur lors de la sauvegarde');
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setMessage({ type: 'error', text: '❌ Erreur lors de la sauvegarde des paramètres' });
        } finally {
            setLoading(false);
        }
    };

    const resetToDefaults = () => {
        const defaultSettings = {
            languePreferee: 'fr',
            theme: 'light',
            timezone: 'Europe/Paris',
            notifications: true,
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: false,
            saveTestResults: true,
            personalizedRecommendations: true,
            weeklyDigest: false,
            newProgramsAlert: true,
            dataAnalytics: false,
            shareProfile: false,
            marketingEmails: false,
            twoFactorAuth: false,
            loginNotifications: true,
            sessionTimeout: 30
        };
        
        setSettings(defaultSettings);
        setMessage({ type: 'info', text: '🔄 Paramètres remis à zéro' });
    };

    if (!user) {
        return (
            <div className="settings-container">
                <GlobalNavbar activePage="settings" />
                <div className="settings-error">
                    <h2>🔒 Accès refusé</h2>
                    <p>Vous devez être connecté pour accéder aux paramètres.</p>
                </div>
            </div>
        );
    }

    return (
        <GlobalLayout activePage="settings">
            <div className="settings-container">
            
            <main className="settings-main">
                <div className="settings-header">
                    <h1>⚙️ {getText('settings')}</h1>
                    <p>Personnalisez votre expérience sur DirAvenir</p>
                </div>

                <div className="settings-content">
                    <form onSubmit={handleSubmit} className="settings-form">
                        
                        {/* Section Préférences Générales */}
                        <div className="settings-section">
                            <h2>🌍 {getText('generalPreferences')}</h2>
                            
                            <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="languePreferee">{getText('language')}</label>
                                <select
                                    id="languePreferee"
                                    name="languePreferee"
                                    value={settings.languePreferee}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="fr">🇫🇷 Français</option>
                                    <option value="en">🇬🇧 English</option>
                                    <option value="es">🇪🇸 Español</option>
                                    <option value="ar">🇸🇦 العربية</option>
                                    <option value="de">🇩🇪 Deutsch</option>
                                    <option value="it">🇮🇹 Italiano</option>
                                </select>
                                
                                {/* Statut de la langue */}
                                <div className="setting-status">
                                    <span className="status-text">
                                        {getText('currentLanguage')}: <strong>{currentLanguage.toUpperCase()}</strong>
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="theme">🎨 {getText('theme')}</label>
                                <select
                                    id="theme"
                                    name="theme"
                                    value={settings.theme}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="light">☀️ {getText('light')}</option>
                                    <option value="dark">🌙 {getText('dark')}</option>
                                    <option value="auto">🔄 {getText('auto')}</option>
                                </select>
                                
                                {/* Statut du thème */}
                                <div className="setting-status">
                                    <span className="status-text">
                                        {getText('theme')} {getText('current')}: <strong>{currentTheme}</strong>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => changeTheme(currentTheme === 'light' ? 'dark' : 'light')}
                                        className="toggle-theme-btn"
                                    >
                                        🔄 {getText('toggle')}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="languePreferee">🌍 {getText('language')}</label>
                                <select
                                    id="languePreferee"
                                    name="languePreferee"
                                    value={settings.languePreferee}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="fr">🇫🇷 Français</option>
                                    <option value="en">🇬🇧 English</option>
                                    <option value="es">🇪🇸 Español</option>
                                </select>
                                
                                {/* Statut de la langue */}
                                <div className="setting-status">
                                    <span className="status-text">
                                        {getText('currentLanguage')}: <strong>{currentLanguage.toUpperCase()}</strong>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => changeLanguage(settings.languePreferee)}
                                        className="toggle-theme-btn"
                                    >
                                        🔄 {getText('apply')}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="timezone">{getText('timezone')}</label>
                                <select
                                    id="timezone"
                                    name="timezone"
                                    value={settings.timezone}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="Europe/Paris">🇫🇷 Paris (UTC+1/+2)</option>
                                    <option value="Europe/London">🇬🇧 Londres (UTC+0/+1)</option>
                                    <option value="America/New_York">🇺🇸 New York (UTC-5/-4)</option>
                                    <option value="Asia/Tokyo">🇯🇵 Tokyo (UTC+9)</option>
                                    <option value="Australia/Sydney">🇦🇺 Sydney (UTC+10/+11)</option>
                                    <option value="Africa/Cairo">🇪🇬 Le Caire (UTC+2)</option>
                                </select>
                            </div>
                            </div>
                        </div>

                        {/* Section Notifications */}
                        <div className="settings-section">
                            <h2>🔔 Notifications</h2>
                            
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        checked={settings.notifications}
                                        onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="checkmark"></span>
                                    Activer toutes les notifications
                                </label>
                                <p className="form-help">Contrôle principal pour toutes les notifications</p>
                                
                                {/* Statut des permissions */}
                                <div className="permission-status">
                                    <span className={`status-indicator ${notificationService.getPermissionStatus().isAllowed ? 'granted' : 'denied'}`}>
                                        {notificationService.getPermissionStatus().isAllowed ? '✅ Autorisé' : '❌ Non autorisé'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => notificationService.requestPermission()}
                                        className="permission-btn"
                                    >
                                        🔐 Demander la permission
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => notificationService.testNotification()}
                                        className="test-btn"
                                        disabled={!notificationService.isAllowed()}
                                    >
                                        🧪 Tester les notifications
                                    </button>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="emailNotifications"
                                            checked={settings.emailNotifications}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                            disabled={!settings.notifications}
                                        />
                                        <span className="checkmark"></span>
                                        Notifications par email
                                    </label>
                                    <p className="form-help">Recevez des mises à jour importantes par email</p>
                                </div>
                                
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="pushNotifications"
                                            checked={settings.pushNotifications}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                            disabled={!settings.notifications}
                                        />
                                        <span className="checkmark"></span>
                                        Notifications push
                                    </label>
                                    <p className="form-help">Alertes instantanées sur votre appareil</p>
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="smsNotifications"
                                        checked={settings.smsNotifications}
                                        onChange={handleInputChange}
                                        className="form-checkbox"
                                        disabled={!settings.notifications}
                                    />
                                    <span className="checkmark"></span>
                                    Notifications par SMS
                                </label>
                                <p className="form-help">Alertes importantes par message texte</p>
                            </div>
                        </div>

                        {/* Section Tests et Orientation */}
                        <div className="settings-section">
                            <h2>🧠 Tests et Orientation</h2>
                            
                            <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="saveTestResults"
                                            checked={settings.saveTestResults}
                                            onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="checkmark"></span>
                                    Sauvegarder les résultats de tests
                                </label>
                                <p className="form-help">Conservez l'historique de vos tests d'orientation</p>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="personalizedRecommendations"
                                            checked={settings.personalizedRecommendations}
                                            onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="checkmark"></span>
                                    Recommandations personnalisées
                                </label>
                                <p className="form-help">Recevez des suggestions adaptées à votre profil</p>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="weeklyDigest"
                                            checked={settings.weeklyDigest}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Résumé hebdomadaire
                                    </label>
                                    <p className="form-help">Recevez un récapitulatif de vos activités</p>
                                </div>
                                
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="newProgramsAlert"
                                            checked={settings.newProgramsAlert}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Alertes nouveaux programmes
                                    </label>
                                    <p className="form-help">Soyez informé des nouveaux programmes disponibles</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Confidentialité */}
                        <div className="settings-section">
                            <h2>🔒 Confidentialité et Données</h2>
                            
                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="dataAnalytics"
                                            checked={settings.dataAnalytics}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Partager les données d'utilisation
                                    </label>
                                    <p className="form-help">Aidez-nous à améliorer la plateforme (anonymement)</p>
                                </div>
                                
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="shareProfile"
                                            checked={settings.shareProfile}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Profil visible publiquement
                                    </label>
                                    <p className="form-help">Permettre aux autres utilisateurs de voir votre profil</p>
                                </div>
                            </div>
                            
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="marketingEmails"
                                        checked={settings.marketingEmails}
                                        onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="checkmark"></span>
                                    Emails marketing et promotions
                                </label>
                                <p className="form-help">Recevez des offres spéciales et des promotions</p>
                            </div>
                        </div>

                        {/* Section Sécurité */}
                        <div className="settings-section">
                            <h2>🛡️ Sécurité</h2>
                            
                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="twoFactorAuth"
                                            checked={settings.twoFactorAuth}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Authentification à deux facteurs
                                    </label>
                                    <p className="form-help">Sécurisez votre compte avec un code supplémentaire</p>
                                    
                                    {/* Statut 2FA */}
                                    <div className="setting-status">
                                        <span className="status-indicator disabled">
                                            ⚠️ Non configuré
                                        </span>
                                        <button
                                            type="button"
                                            className="configure-btn"
                                        >
                                            ⚙️ Configurer
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="loginNotifications"
                                            checked={settings.loginNotifications}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        Notifications de connexion
                                    </label>
                                    <p className="form-help">Recevez une alerte lors de nouvelles connexions</p>
                                    
                                    {/* Test de notification de connexion */}
                                    <div className="setting-status">
                                        <button
                                            type="button"
                                            onClick={() => notificationService.sendNotification(
                                                '🔐 Nouvelle connexion détectée',
                                                { body: 'Connexion depuis un nouvel appareil' }
                                            )}
                                            className="test-btn"
                                            disabled={!notificationService.isAllowed()}
                                        >
                                            🧪 Tester
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</label>
                                <select
                                    id="sessionTimeout"
                                    name="sessionTimeout"
                                    value={settings.sessionTimeout}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value={15}>15 minutes</option>
                                    <option value={30}>30 minutes</option>
                                    <option value={60}>1 heure</option>
                                    <option value={120}>2 heures</option>
                                    <option value={480}>8 heures</option>
                                </select>
                                <p className="form-help">Après ce délai, vous devrez vous reconnecter</p>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="form-actions">
                            <button
                                type="submit"
                                disabled={loading}
                                className="save-btn"
                            >
                                {loading ? '💾 Sauvegarde...' : `💾 ${getText('save')}`}
                            </button>
                            
                            <button
                                type="button"
                                onClick={resetToDefaults}
                                className="reset-btn"
                            >
                                🔄 Remettre à zéro
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => {
                                    // Test complet des fonctionnalités
                                    notificationService.testNotification();
                                    changeTheme(currentTheme === 'light' ? 'dark' : 'light');
                                    setTimeout(() => changeTheme(currentTheme === 'light' ? 'dark' : 'light'), 1000);
                                }}
                                className="test-all-btn"
                            >
                                🧪 Tester tout
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // Test du changement de langue
                                    const languages = ['fr', 'en', 'es'];
                                    const currentIndex = languages.indexOf(currentLanguage);
                                    const nextLanguage = languages[(currentIndex + 1) % languages.length];
                                    changeLanguage(nextLanguage);
                                    setMessage({ type: 'success', text: `🌍 Langue changée vers ${nextLanguage.toUpperCase()}` });
                                }}
                                className="test-all-btn"
                                style={{ backgroundColor: '#8b5cf6' }}
                            >
                                🌍 Tester Langue
                            </button>
                        </div>

                        {/* Messages de feedback */}
                        {message.text && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
        </GlobalLayout>
    );
}


