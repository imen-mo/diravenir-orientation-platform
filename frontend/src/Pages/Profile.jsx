import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext';
import GlobalLayout from '../components/GlobalLayout';
import './Profile.css';

const Profile = () => {
    const { getText } = useTheme();
    const { t } = useLanguage();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        bio: '',
        location: '',
        website: ''
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
                bio: userObj.bio || '',
                location: userObj.location || '',
                website: userObj.website || ''
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
    
    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        
        try {
            const updatedUser = {
                ...user,
                ...formData
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setEditing(false);
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' });
        } finally {
            setSaving(false);
        }
    };
    
    const handleCancel = () => {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            birthDate: user.birthDate || '',
            bio: user.bio || '',
            location: user.location || '',
            website: user.website || ''
        });
        setEditing(false);
        setMessage({ type: '', text: '' });
    };
    
    if (loading) {
        return (
            <GlobalLayout>
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement du profil...</p>
                </div>
            </GlobalLayout>
        );
    }
    
    if (!user) {
        return (
            <GlobalLayout>
                <div className="profile-error">
                    <h2>Accès non autorisé</h2>
                    <p>Veuillez vous connecter pour accéder au profil.</p>
                </div>
            </GlobalLayout>
        );
    }
    
    return (
        <GlobalLayout>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-info">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>{user.email}</p>
                        <span className="profile-role">{user.role}</span>
                    </div>
                    <div className="profile-actions">
                        {!editing ? (
                            <button onClick={() => setEditing(true)} className="edit-button">
                                Modifier le profil
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button onClick={handleSave} className="save-button" disabled={saving}>
                                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                                </button>
                                <button onClick={handleCancel} className="cancel-button">
                                    Annuler
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="profile-content">
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <div className="profile-form">
                        <div className="form-section">
                            <h3>Informations de base</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">Prénom</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Nom</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                />
                                <small>L'email ne peut pas être modifié</small>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="birthDate">Date de naissance</label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />
                            </div>
                        </div>
                        
                        <div className="form-section">
                            <h3>Informations supplémentaires</h3>
                            
                            <div className="form-group">
                                <label htmlFor="bio">Biographie</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    rows={4}
                                    placeholder="Parlez-nous de vous..."
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="location">Localisation</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="Ville, Pays"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="website">Site web</label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="https://votre-site.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default Profile;
