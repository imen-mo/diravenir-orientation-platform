import React, { useState, useEffect } from 'react';
import { FaUser, FaBell, FaShieldAlt, FaPalette, FaDownload, FaTrash, FaSave, FaSpinner } from 'react-icons/fa';
import StudentLayoutFinal from '../components/StudentLayoutFinal';
import apiService from '../services/api';
import './StudentSettings.css';

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // États pour les différents paramètres
  const [profileSettings, setProfileSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'fr',
    timezone: 'Europe/Paris'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    testReminders: true,
    programRecommendations: true,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    cookieConsent: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorScheme: 'default'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Charger les paramètres depuis localStorage ou API
      const savedProfile = localStorage.getItem('profileSettings');
      const savedNotifications = localStorage.getItem('notificationSettings');
      const savedPrivacy = localStorage.getItem('privacySettings');
      const savedAppearance = localStorage.getItem('appearanceSettings');
      
      if (savedProfile) {
        setProfileSettings(JSON.parse(savedProfile));
      }
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications));
      }
      if (savedPrivacy) {
        setPrivacySettings(JSON.parse(savedPrivacy));
      }
      if (savedAppearance) {
        setAppearanceSettings(JSON.parse(savedAppearance));
      }
      
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
      setError('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Sauvegarder dans localStorage
      localStorage.setItem('profileSettings', JSON.stringify(profileSettings));
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
      localStorage.setItem('appearanceSettings', JSON.stringify(appearanceSettings));
      
      // Essayer de sauvegarder via l'API
      try {
        await apiService.updateStudentSettings({
          profile: profileSettings,
          notifications: notificationSettings,
          privacy: privacySettings,
          appearance: appearanceSettings
        });
      } catch (apiError) {
        console.log('API non disponible, sauvegarde locale uniquement');
      }
      
      setSuccess('Paramètres sauvegardés avec succès !');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      console.error('Erreur sauvegarde paramètres:', error);
      setError('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    const userData = {
      profile: profileSettings,
      notifications: notificationSettings,
      privacy: privacySettings,
      appearance: appearanceSettings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diravenir-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      console.log('Suppression du compte demandée');
      // Implémenter la logique de suppression
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Confidentialité', icon: FaShieldAlt },
    { id: 'appearance', label: 'Apparence', icon: FaPalette }
  ];

  if (loading) {
    return (
      <StudentLayoutFinal>
        <div className="settings-loading">
          <FaSpinner className="animate-spin" />
          <span>Chargement des paramètres...</span>
        </div>
      </StudentLayoutFinal>
    );
  }

  return (
    <StudentLayoutFinal>
      <div className="student-settings-container">
        <div className="settings-header">
          <h1>Paramètres</h1>
          <p>Gérez vos préférences et paramètres de compte</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <div className="settings-layout">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="settings-content">
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2>Informations du Profil</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      value={profileSettings.firstName}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={profileSettings.lastName}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Langue</label>
                    <select
                      value={profileSettings.language}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fuseau horaire</label>
                    <select
                      value={profileSettings.timezone}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    >
                      <option value="Europe/Paris">Europe/Paris</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Préférences de Notifications</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Notifications par email</h3>
                      <p>Recevez des notifications importantes par email</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Notifications push</h3>
                      <p>Recevez des notifications dans votre navigateur</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Mises à jour des candidatures</h3>
                      <p>Notifications sur le statut de vos candidatures</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.applicationUpdates}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, applicationUpdates: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Rappels de tests</h3>
                      <p>Rappels pour compléter vos tests d'orientation</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.testReminders}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, testReminders: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Recommandations de programmes</h3>
                      <p>Nouvelles recommandations basées sur votre profil</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.programRecommendations}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, programRecommendations: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Emails marketing</h3>
                      <p>Recevez des offres et actualités de DiRavenir</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketingEmails}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Confidentialité */}
            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2>Confidentialité et Sécurité</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Visibilité du profil</h3>
                      <p>Contrôlez qui peut voir votre profil</p>
                    </div>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                    >
                      <option value="private">Privé</option>
                      <option value="public">Public</option>
                      <option value="friends">Amis uniquement</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Partage de données</h3>
                      <p>Autoriser le partage anonyme de données pour améliorer le service</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacySettings.dataSharing}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataSharing: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Suivi analytique</h3>
                      <p>Autoriser le suivi pour améliorer votre expérience</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacySettings.analyticsTracking}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, analyticsTracking: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Consentement aux cookies</h3>
                      <p>Accepter les cookies pour une meilleure expérience</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacySettings.cookieConsent}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, cookieConsent: e.target.checked }))}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Apparence */}
            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2>Apparence et Interface</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Thème</label>
                    <select
                      value={appearanceSettings.theme}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, theme: e.target.value }))}
                    >
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                      <option value="auto">Automatique</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Taille de police</label>
                    <select
                      value={appearanceSettings.fontSize}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                    >
                      <option value="small">Petite</option>
                      <option value="medium">Moyenne</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Schéma de couleurs</label>
                    <select
                      value={appearanceSettings.colorScheme}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, colorScheme: e.target.value }))}
                    >
                      <option value="default">Par défaut</option>
                      <option value="purple">Violet</option>
                      <option value="blue">Bleu</option>
                      <option value="green">Vert</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-actions">
          <div className="action-group">
            <button 
              className="btn btn-primary"
              onClick={handleSaveSettings}
              disabled={saving}
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
          
          <div className="action-group">
            <button 
              className="btn btn-secondary"
              onClick={handleExportData}
            >
              <FaDownload />
              <span>Exporter les données</span>
            </button>
            
            <button 
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              <FaTrash />
              <span>Supprimer le compte</span>
            </button>
          </div>
        </div>
      </div>
    </StudentLayoutFinal>
  );
};

export default StudentSettings;
