import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import GlobalLayout from '../components/GlobalLayout';
import UserAvatar from '../components/UserAvatar';
import './Settings.css';

const Settings = () => {
    const { user } = useAuth();
    const { 
        theme, 
        setTheme, 
        language, 
        setLanguage, 
        getText,
        availableLanguages 
    } = useTheme();
    
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: false,
            sms: false
        },
        privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false
        },
        preferences: {
            autoSave: true,
            darkMode: theme === 'dark',
            language: language
        }
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Charger les paramètres sauvegardés
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = () => {
        try {
            const savedSettings = localStorage.getItem('userSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                setSettings(prev => ({ ...prev, ...parsed }));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des paramètres:', error);
        }
    };

    const saveSettings = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            // Sauvegarder en localStorage
            localStorage.setItem('userSettings', JSON.stringify(settings));
            
            // Appliquer les changements de thème et langue
            if (settings.preferences.darkMode !== (theme === 'dark')) {
                setTheme(settings.preferences.darkMode ? 'dark' : 'light');
            }
            
            if (settings.preferences.language !== language) {
                setLanguage(settings.preferences.language);
            }
            
            setMessage({ 
                type: 'success', 
                text: getText('settingsSaved', 'Paramètres sauvegardés avec succès !') 
            });
            
            // Effacer le message après 3 secondes
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setMessage({ 
                type: 'error', 
                text: getText('settingsError', 'Erreur lors de la sauvegarde des paramètres') 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSettingChange = (category, key, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const resetSettings = () => {
        setSettings({
            notifications: {
                email: true,
                push: false,
                sms: false
            },
            privacy: {
                profileVisibility: 'public',
                showEmail: false,
                showPhone: false
            },
            preferences: {
                autoSave: true,
                darkMode: false,
                language: 'fr'
            }
        });
    };

    return (
        <GlobalLayout activePage="settings">
            <div className="settings-container">
                <div className="settings-header">
                    <div className="settings-user-info">
                        <UserAvatar user={user} size="large" />
                        <div className="settings-user-details">
                            <h1>{getText('settings', 'Paramètres')}</h1>
                            <p>{getText('settingsSubtitle', 'Personnalisez votre expérience DirAvenir')}</p>
                        </div>
                    </div>
                </div>

                <div className="settings-content">
                    {/* Message de statut */}
                    {message.text && (
                        <div className={`settings-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Notifications */}
                    <div className="settings-section">
                        <h2>{getText('notifications', 'Notifications')}</h2>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('emailNotifications', 'Notifications par email')}</h3>
                                    <p>{getText('emailNotificationsDesc', 'Recevez des notifications importantes par email')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.email}
                                        onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('pushNotifications', 'Notifications push')}</h3>
                                    <p>{getText('pushNotificationsDesc', 'Recevez des notifications push dans votre navigateur')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.push}
                                        onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('smsNotifications', 'Notifications SMS')}</h3>
                                    <p>{getText('smsNotificationsDesc', 'Recevez des notifications par SMS (nécessite un numéro de téléphone')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.sms}
                                        onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Confidentialité */}
                    <div className="settings-section">
                        <h2>{getText('privacy', 'Confidentialité')}</h2>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('profileVisibility', 'Visibilité du profil')}</h3>
                                    <p>{getText('profileVisibilityDesc', 'Contrôlez qui peut voir votre profil')}</p>
                                </div>
                                <select
                                    value={settings.privacy.profileVisibility}
                                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="public">{getText('public', 'Public')}</option>
                                    <option value="friends">{getText('friends', 'Amis uniquement')}</option>
                                    <option value="private">{getText('private', 'Privé')}</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('showEmail', 'Afficher l\'email')}</h3>
                                    <p>{getText('showEmailDesc', 'Permettre aux autres utilisateurs de voir votre email')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.privacy.showEmail}
                                        onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('showPhone', 'Afficher le téléphone')}</h3>
                                    <p>{getText('showPhoneDesc', 'Permettre aux autres utilisateurs de voir votre numéro de téléphone')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.privacy.showPhone}
                                        onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Préférences */}
                    <div className="settings-section">
                        <h2>{getText('preferences', 'Préférences')}</h2>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('darkMode', 'Mode sombre')}</h3>
                                    <p>{getText('darkModeDesc', 'Activer le thème sombre pour une meilleure expérience nocturne')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.preferences.darkMode}
                                        onChange={(e) => handleSettingChange('preferences', 'darkMode', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('language', 'Langue')}</h3>
                                    <p>{getText('languageDesc', 'Choisissez votre langue préférée')}</p>
                                </div>
                                <select
                                    value={settings.preferences.language}
                                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                                    className="setting-select"
                                >
                                    {availableLanguages.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>{getText('autoSave', 'Sauvegarde automatique')}</h3>
                                    <p>{getText('autoSaveDesc', 'Sauvegarder automatiquement vos modifications')}</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.preferences.autoSave}
                                        onChange={(e) => handleSettingChange('preferences', 'autoSave', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="settings-actions">
                        <button
                            onClick={saveSettings}
                            disabled={loading}
                            className="settings-save-btn"
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    {getText('saving', 'Sauvegarde...')}
                                </>
                            ) : (
                                getText('saveSettings', 'Sauvegarder les paramètres')
                            )}
                        </button>

                        <button
                            onClick={resetSettings}
                            className="settings-reset-btn"
                        >
                            {getText('resetSettings', 'Réinitialiser')}
                        </button>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default Settings;