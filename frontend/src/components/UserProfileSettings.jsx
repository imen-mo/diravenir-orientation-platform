import React, { useState } from 'react';
import { 
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaLock,
  FaBell,
  FaGlobe,
  FaLanguage,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaDownload,
  FaTrash,
  FaShieldAlt,
  FaKey,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import './UserProfileSettings.css';

const UserProfileSettings = ({ userInfo, onUpdateUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || 'Jean',
    lastName: userInfo?.lastName || 'Dupont',
    email: userInfo?.email || 'jean.dupont@example.com',
    phone: userInfo?.phone || '+33 6 12 34 56 78',
    address: userInfo?.address || '123 Rue de la Paix, 75001 Paris',
    dateOfBirth: userInfo?.dateOfBirth || '1995-06-15',
    nationality: userInfo?.nationality || 'Française',
    bio: userInfo?.bio || 'Étudiant passionné par les nouvelles technologies et l\'innovation.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    preferences: {
      language: 'fr',
      theme: 'light',
      timezone: 'Europe/Paris'
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
    console.log('Sauvegarde des données:', formData);
    setIsEditing(false);
    if (onUpdateUser) {
      onUpdateUser(formData);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Réinitialiser les données
    setFormData({
      firstName: userInfo?.firstName || 'Jean',
      lastName: userInfo?.lastName || 'Dupont',
      email: userInfo?.email || 'jean.dupont@example.com',
      phone: userInfo?.phone || '+33 6 12 34 56 78',
      address: userInfo?.address || '123 Rue de la Paix, 75001 Paris',
      dateOfBirth: userInfo?.dateOfBirth || '1995-06-15',
      nationality: userInfo?.nationality || 'Française',
      bio: userInfo?.bio || 'Étudiant passionné par les nouvelles technologies et l\'innovation.',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
      },
      preferences: {
        language: 'fr',
        theme: 'light',
        timezone: 'Europe/Paris'
      }
    });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: FaUser },
    { id: 'security', label: 'Sécurité', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Confidentialité', icon: FaShieldAlt },
    { id: 'preferences', label: 'Préférences', icon: FaGlobe }
  ];

  return (
    <div className="user-profile-settings">
      {/* En-tête */}
      <div className="settings-header">
        <div className="header-content">
          <h2>
            <FaUser className="header-icon" />
            Paramètres du Compte
          </h2>
          <p>Gérez vos informations personnelles et préférences</p>
        </div>
        <div className="header-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button className="action-btn save" onClick={handleSave}>
                <FaSave />
                Sauvegarder
              </button>
              <button className="action-btn cancel" onClick={handleCancel}>
                <FaTimes />
                Annuler
              </button>
            </div>
          ) : (
            <button className="action-btn edit" onClick={() => setIsEditing(true)}>
              <FaEdit />
              Modifier
            </button>
          )}
        </div>
      </div>

      {/* Onglets */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="tab-icon" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="avatar-section">
                <div className="user-avatar">
                  <FaUser />
                  <button className="avatar-edit">
                    <FaCamera />
                  </button>
                </div>
                <div className="avatar-info">
                  <h3>{formData.firstName} {formData.lastName}</h3>
                  <p>Membre depuis janvier 2024</p>
                </div>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Date de naissance</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Nationalité</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Adresse</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'editable' : ''}
                />
              </div>

              <div className="form-group full-width">
                <label>Biographie</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'editable' : ''}
                  rows="4"
                  placeholder="Parlez-nous de vous..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-section">
            <div className="section-header">
              <h3>
                <FaLock className="section-icon" />
                Sécurité du Compte
              </h3>
              <p>Gérez votre mot de passe et la sécurité de votre compte</p>
            </div>

            <div className="security-form">
              <div className="form-group">
                <label>Mot de passe actuel</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Entrez votre mot de passe actuel"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirmer le nouveau mot de passe</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="security-actions">
                <button className="security-btn primary">
                  <FaKey />
                  Changer le mot de passe
                </button>
                <button className="security-btn secondary">
                  <FaDownload />
                  Exporter mes données
                </button>
                <button className="security-btn danger">
                  <FaTrash />
                  Supprimer le compte
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-section">
            <div className="section-header">
              <h3>
                <FaBell className="section-icon" />
                Préférences de Notification
              </h3>
              <p>Choisissez comment vous souhaitez être notifié</p>
            </div>

            <div className="notification-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Notifications par email</h4>
                  <p>Recevez des mises à jour importantes par email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => handleInputChange('notifications.email', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Notifications SMS</h4>
                  <p>Recevez des alertes importantes par SMS</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.notifications.sms}
                    onChange={(e) => handleInputChange('notifications.sms', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Notifications push</h4>
                  <p>Recevez des notifications sur votre navigateur</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) => handleInputChange('notifications.push', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Marketing et promotions</h4>
                  <p>Recevez des offres spéciales et des nouveautés</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.notifications.marketing}
                    onChange={(e) => handleInputChange('notifications.marketing', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="privacy-section">
            <div className="section-header">
              <h3>
                <FaShieldAlt className="section-icon" />
                Confidentialité
              </h3>
              <p>Contrôlez qui peut voir vos informations</p>
            </div>

            <div className="privacy-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Visibilité du profil</h4>
                  <p>Qui peut voir votre profil</p>
                </div>
                <select
                  value={formData.privacy.profileVisibility}
                  onChange={(e) => handleInputChange('privacy.profileVisibility', e.target.value)}
                  className="privacy-select"
                >
                  <option value="public">Public</option>
                  <option value="friends">Amis seulement</option>
                  <option value="private">Privé</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Afficher l'email</h4>
                  <p>Permettre aux autres de voir votre adresse email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.privacy.showEmail}
                    onChange={(e) => handleInputChange('privacy.showEmail', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Afficher le téléphone</h4>
                  <p>Permettre aux autres de voir votre numéro de téléphone</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.privacy.showPhone}
                    onChange={(e) => handleInputChange('privacy.showPhone', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-section">
            <div className="section-header">
              <h3>
                <FaGlobe className="section-icon" />
                Préférences
              </h3>
              <p>Personnalisez votre expérience</p>
            </div>

            <div className="preference-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Langue</h4>
                  <p>Choisissez votre langue préférée</p>
                </div>
                <select
                  value={formData.preferences.language}
                  onChange={(e) => handleInputChange('preferences.language', e.target.value)}
                  className="preference-select"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Thème</h4>
                  <p>Choisissez votre thème préféré</p>
                </div>
                <div className="theme-options">
                  <button 
                    className={`theme-btn ${formData.preferences.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleInputChange('preferences.theme', 'light')}
                  >
                    <FaSun />
                    Clair
                  </button>
                  <button 
                    className={`theme-btn ${formData.preferences.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleInputChange('preferences.theme', 'dark')}
                  >
                    <FaMoon />
                    Sombre
                  </button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Fuseau horaire</h4>
                  <p>Votre fuseau horaire local</p>
                </div>
                <select
                  value={formData.preferences.timezone}
                  onChange={(e) => handleInputChange('preferences.timezone', e.target.value)}
                  className="preference-select"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions de déconnexion */}
      <div className="settings-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default UserProfileSettings;
