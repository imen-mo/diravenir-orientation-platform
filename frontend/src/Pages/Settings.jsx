import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        nom: user?.nom || '',
        prenom: user?.prenom || '',
        telephone: user?.telephone || '',
        languePreferee: user?.languePreferee || 'Français',
        photoProfil: user?.photoProfil || '',
        email: user?.email || ''
    });
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showEmailChange, setShowEmailChange] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(user?.photoProfil || '');
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    // Mettre à jour le formData quand l'utilisateur change
    useEffect(() => {
        if (user) {
            setFormData({
                nom: user.nom || '',
                prenom: user.prenom || '',
                telephone: user.telephone || '',
                languePreferee: user.languePreferee || 'Français',
                photoProfil: user.photoProfil || '',
                email: user.email || ''
            });
            setPhotoPreview(user.photoProfil || '');
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Vérifier le type de fichier
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Veuillez sélectionner un fichier image valide.' });
                return;
            }

            // Vérifier la taille (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Le fichier est trop volumineux (max 5MB).' });
                return;
            }

            setPhotoFile(file);
            
            // Créer un aperçu
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadPhoto = async () => {
        if (!photoFile) return null;

        setUploadingPhoto(true);
        try {
            const formData = new FormData();
            formData.append('file', photoFile);

            const response = await fetch('http://localhost:8084/api/upload/profile-photo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'upload de la photo');
            }

            const photoUrl = await response.text();
            setMessage({ type: 'success', text: 'Photo uploadée avec succès ! 📸' });
            return photoUrl;

        } catch (error) {
            console.error('Erreur upload photo:', error);
            setMessage({ type: 'error', text: 'Erreur lors de l\'upload de la photo. Veuillez réessayer.' });
            return null;
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            let finalPhotoUrl = formData.photoProfil;

            // Si une nouvelle photo a été sélectionnée, l'uploader d'abord
            if (photoFile) {
                const uploadedPhotoUrl = await uploadPhoto();
                if (uploadedPhotoUrl) {
                    finalPhotoUrl = uploadedPhotoUrl;
                } else {
                    setLoading(false);
                    return; // Arrêter si l'upload a échoué
                }
            }

            // Préparer les données à mettre à jour
            const updateData = {
                nom: formData.nom,
                prenom: formData.prenom,
                telephone: formData.telephone,
                languePreferee: formData.languePreferee,
                photoProfil: finalPhotoUrl
            };

            const updatedProfile = await updateProfile(updateData);
            
            // Mettre à jour le formData local avec les nouvelles données
            setFormData(prev => ({
                ...prev,
                ...updatedProfile
            }));
            
            // Réinitialiser la photo
            setPhotoFile(null);
            setPhotoPreview(updatedProfile.photoProfil || '');
            
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès ! 🎉' });
            
            // Effacer le message après 5 secondes
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            console.error('Erreur de mise à jour du profil:', error);
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               'Erreur lors de la mise à jour du profil. Veuillez réessayer.';
            setMessage({ 
                type: 'error', 
                text: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        if (!newEmail || !currentPassword) {
            setMessage({ 
                type: 'error', 
                text: 'Veuillez remplir tous les champs requis.' 
            });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Ici, vous devrez implémenter l'API de changement d'email
            // Pour l'instant, on simule la réussite
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage({ 
                type: 'success', 
                text: 'Demande de changement d\'email envoyée ! Vérifiez votre nouvelle adresse email.' 
            });
            
            setNewEmail('');
            setCurrentPassword('');
            setShowEmailChange(false);
            
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: 'Erreur lors du changement d\'email. Veuillez réessayer.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const languages = [
        'Français', 'English', 'Español', 'Deutsch', 'Italiano', 
        'Português', 'Nederlands', 'Русский', '中文', '日本語'
    ];

    if (!user) {
        return (
            <div className="settings-loading">
                <div className="loading-spinner"></div>
                <p>Chargement des paramètres...</p>
            </div>
        );
    }

    return (
        <div className="settings-container">
            {/* Header avec gradient */}
            <div className="settings-header">
                <div className="settings-header-content">
                    <div className="settings-header-text">
                        <h1 className="settings-title">
                            <span className="settings-emoji">⚙️</span>
                            Paramètres
                        </h1>
                        <p className="settings-subtitle">
                            Personnalisez votre profil et gérez vos préférences
                        </p>
                    </div>
                    <div className="settings-header-decoration">
                        <div className="floating-gears">
                            <div className="gear gear-1">⚙️</div>
                            <div className="gear gear-2">🔧</div>
                            <div className="gear gear-3">🎛️</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-content">
                {/* Message de notification */}
                {message.text && (
                    <div className={`message-banner ${message.type}`}>
                        <span className="message-icon">
                            {message.type === 'success' ? '✅' : '❌'}
                        </span>
                        <span className="message-text">{message.text}</span>
                    </div>
                )}

                {/* Section principale des paramètres */}
                <div className="settings-main-section">
                    {/* Carte des informations personnelles */}
                    <div className="settings-card profile-settings-card">
                        <div className="card-header">
                            <div className="card-header-content">
                                <span className="card-icon">👤</span>
                                <h2>Informations Personnelles</h2>
                            </div>
                            <div className="card-header-decoration">
                                <div className="decoration-line"></div>
                            </div>
                        </div>
                        
                        <form onSubmit={handleProfileUpdate} className="settings-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="prenom">
                                        <span className="label-icon">👨‍🎓</span>
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Votre prénom"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nom">
                                        <span className="label-icon">👩‍🎓</span>
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Votre nom"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telephone">
                                        <span className="label-icon">📱</span>
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Votre numéro de téléphone"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="languePreferee">
                                        <span className="label-icon">🌍</span>
                                        Langue préférée
                                    </label>
                                    <select
                                        id="languePreferee"
                                        name="languePreferee"
                                        value={formData.languePreferee}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="photoProfil">
                                        <span className="label-icon">📷</span>
                                        Photo de profil
                                    </label>
                                    
                                    {/* Aperçu de la photo actuelle */}
                                    {photoPreview && (
                                        <div className="photo-preview">
                                            <img 
                                                src={photoPreview} 
                                                alt="Photo de profil actuelle" 
                                                className="current-photo"
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Input de fichier */}
                                    <div className="file-upload-container">
                                        <input
                                            type="file"
                                            id="photoProfil"
                                            name="photoProfil"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="file-input"
                                            disabled={uploadingPhoto}
                                        />
                                        <label htmlFor="photoProfil" className="file-upload-label">
                                            {uploadingPhoto ? (
                                                <span className="uploading-text">⏳ Upload en cours...</span>
                                            ) : photoFile ? (
                                                <span className="file-selected">📁 {photoFile.name}</span>
                                            ) : (
                                                <span className="upload-text">📁 Choisir une photo</span>
                                            )}
                                        </label>
                                    </div>
                                    
                                    <p className="upload-hint">
                                        Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
                                    </p>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="submit" 
                                    className="save-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading-dots">⏳</span>
                                            Sauvegarde...
                                        </>
                                    ) : (
                                        <>
                                            <span className="btn-icon">💾</span>
                                            Sauvegarder les modifications
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Carte de changement d'email */}
                    <div className="settings-card email-settings-card">
                        <div className="card-header">
                            <div className="card-header-content">
                                <span className="card-icon">📧</span>
                                <h2>Changement d'Email</h2>
                            </div>
                            <div className="card-header-decoration">
                                <div className="decoration-line"></div>
                            </div>
                        </div>

                        <div className="current-email-info">
                            <div className="email-display">
                                <span className="email-label">Email actuel :</span>
                                <span className="email-value">{user.email}</span>
                            </div>
                            
                            {!showEmailChange ? (
                                <button 
                                    className="change-email-btn"
                                    onClick={() => setShowEmailChange(true)}
                                >
                                    <span className="btn-icon">✏️</span>
                                    Changer l'email
                                </button>
                            ) : (
                                <form onSubmit={handleEmailChange} className="email-change-form">
                                    <div className="form-group">
                                        <label htmlFor="newEmail">
                                            <span className="label-icon">🆕</span>
                                            Nouvel email
                                        </label>
                                        <input
                                            type="email"
                                            id="newEmail"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            className="form-input"
                                            placeholder="nouveau@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="currentPassword">
                                            <span className="label-icon">🔐</span>
                                            Mot de passe actuel
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="form-input"
                                            placeholder="Votre mot de passe actuel"
                                            required
                                        />
                                    </div>

                                    <div className="email-form-actions">
                                        <button 
                                            type="submit" 
                                            className="confirm-email-btn"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="loading-dots">⏳</span>
                                                    Traitement...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="btn-icon">✅</span>
                                                    Confirmer le changement
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="cancel-email-btn"
                                            onClick={() => {
                                                setShowEmailChange(false);
                                                setNewEmail('');
                                                setCurrentPassword('');
                                            }}
                                        >
                                            <span className="btn-icon">❌</span>
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>



                    {/* Carte des actions rapides */}
                    <div className="settings-card actions-settings-card">
                        <div className="card-header">
                            <div className="card-header-content">
                                <span className="card-icon">🚀</span>
                                <h2>Actions Rapides</h2>
                            </div>
                            <div className="card-header-decoration">
                                <div className="decoration-line"></div>
                            </div>
                        </div>

                        <div className="quick-actions">
                            <Link to="/profile" className="quick-action-btn">
                                <span className="action-icon">👤</span>
                                <span className="action-text">Voir mon profil</span>
                            </Link>
                            
                            <Link to="/contact" className="quick-action-btn">
                                <span className="action-icon">💬</span>
                                <span className="action-text">Contacter le support</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


