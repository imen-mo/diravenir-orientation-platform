import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext';
import GlobalLayout from '../components/GlobalLayout';
import './Settings.css';

const Settings = () => {
    const { getText } = useTheme();
    const { t } = useLanguage();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        language: 'fr',
        theme: 'light'
    });
    
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const userObj = JSON.parse(userData);
            setUser(userObj);
            setFormData({
                firstName: userObj.firstName || '',
                lastName: userObj.lastName || '',
                email: userObj.email || '',
                phone: userObj.phone || '',
                birthDate: userObj.birthDate || '',
                language: localStorage.getItem('language') || 'fr',
                theme: localStorage.getItem('theme') || 'light'
            });
        }
        setLoading(false);
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        
        try {
            // Sauvegarder les préférences
            localStorage.setItem('language', formData.language);
            localStorage.setItem('theme', formData.theme);
            
            // Mettre à jour l'utilisateur
            const updatedUser = {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                birthDate: formData.birthDate
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            
            setMessage({ type: 'success', text: t('settingsSaved') });
        } catch (error) {
            setMessage({ type: 'error', text: t('saveError') });
        } finally {
            setSaving(false);
        }
    };
    
    if (loading) {
        return (
            <GlobalLayout>
                <div className="settings-loading">
                    <div className="loading-spinner"></div>
                    <p>{t('loadingSettings')}</p>
                </div>
            </GlobalLayout>
        );
    }
    
    if (!user) {
        return (
            <GlobalLayout>
                <div className="settings-error">
                    <h2>{t('unauthorizedAccess')}</h2>
                    <p>{t('loginRequired')}</p>
                </div>
            </GlobalLayout>
        );
    }
    
    return (
        <GlobalLayout>
            <div className="settings-container">
                <div className="settings-header">
                    <h1>{t('settings')}</h1>
                    <p>{t('personalInfo')}</p>
                </div>
                
                <div className="settings-content">
                    <form onSubmit={handleSubmit} className="settings-form">
                        <div className="form-section">
                            <h3>{t('personalInfo')}</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">{t('firstName')}</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">{t('lastName')}</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">{t('email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <small>L'email ne peut pas être modifié</small>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phone">{t('phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="birthDate">{t('birthDate')}</label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-section">
                            <h3>{t('preferences')}</h3>
                            
                            <div className="form-group">
                                <label htmlFor="language">{t('language')}</label>
                                <select
                                    id="language"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                    <option value="ar">العربية</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="theme">{t('theme')}</label>
                                <select
                                    id="theme"
                                    name="theme"
                                    value={formData.theme}
                                    onChange={handleChange}
                                >
                                    <option value="light">{t('lightTheme')}</option>
                                    <option value="dark">{t('darkTheme')}</option>
                                </select>
                            </div>
                        </div>
                        
                        {message.text && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}
                        
                        <button type="submit" className="save-button" disabled={saving}>
                            {saving ? 'Sauvegarde...' : t('saveSettings')}
                        </button>
                    </form>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default Settings;
