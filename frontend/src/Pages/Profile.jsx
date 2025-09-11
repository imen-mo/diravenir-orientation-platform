import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import GlobalLayout from '../components/GlobalLayout';
import UserAvatar from '../components/UserAvatar';
import API from '../services/api';
import './Profile.css';

export default function Profile() {
    const { user, setUser } = useAuth();
    const { getText } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        genre: '',
        nationalite: '',
        pays: '',
        ville: '',
        adresse: '',
        etablissement: '',
        niveauEtude: '',
        anneeEtude: '',
        specialite: '',
        languePreferee: 'fr'
    });

    // Charger les données utilisateur au montage
    useEffect(() => {
        if (user) {
            loadUserProfile();
        }
    }, [user]);

    // Charger le profil complet depuis l'API
    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const response = await API.get('/auth/profile');
            
            if (response.data.status === 'success') {
                const userData = response.data.user;
                setFormData({
                    nom: userData.nom || '',
                    prenom: userData.prenom || '',
                    email: userData.email || '',
                    telephone: userData.telephone || '',
                    dateNaissance: userData.dateNaissance ? userData.dateNaissance.split('T')[0] : '',
                    genre: userData.genre || '',
                    nationalite: userData.nationalite || '',
                    pays: userData.pays || '',
                    ville: userData.ville || '',
                    adresse: userData.adresse || '',
                    etablissement: userData.etablissement || '',
                    niveauEtude: userData.niveauEtude || '',
                    anneeEtude: userData.anneeEtude || '',
                    specialite: userData.specialite || '',
                    languePreferee: userData.languePreferee || 'fr'
                });
            }
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error);
            setMessage({ type: 'error', text: 'Erreur lors du chargement du profil' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await API.put('/auth/profile', formData);
            
            if (response.data.status === 'success') {
                setMessage({ type: 'success', text: 'Profil mis à jour avec succès ! ✅' });
                setIsEditing(false);
                
                // Mettre à jour le contexte utilisateur
                if (setUser) {
                    setUser(prev => ({
                        ...prev,
                        nom: formData.nom,
                        prenom: formData.prenom,
                        name: `${formData.prenom} ${formData.nom}`.trim()
                    }));
                }
            } else {
                throw new Error(response.data.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde du profil' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        loadUserProfile(); // Recharger les données originales
        setMessage({ type: '', text: '' });
    };

    if (!user) {
        return (
            <div className="profile-container">
                <GlobalNavbar activePage="profile" />
                <div className="profile-error">
                    <h2>🔒 Accès refusé</h2>
                    <p>Vous devez être connecté pour accéder à votre profil.</p>
                </div>
            </div>
        );
    }

    return (
        <GlobalLayout activePage="profile">
            <div className="profile-container">
            
            {/* Header avec gradient */}
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-header-text">
                                            <h1 className="profile-title">
                        <span className="profile-emoji">👤</span>
                        {getText('profile')}
                    </h1>
                        <p className="profile-subtitle">
                            Gérez vos informations personnelles et académiques
                        </p>
                    </div>
                    <div className="profile-header-decoration">
                        <div className="floating-shapes">
                            <div className="shape shape-1">✨</div>
                            <div className="shape shape-2">🌟</div>
                            <div className="shape shape-3">💫</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                {/* Section principale */}
                <div className="profile-main-section">
                    {/* Carte d'information de base */}
                    <div className="profile-card profile-info-card">
                        <div className="profile-photo-section">
                            <div className="profile-photo-container">
                                <UserAvatar user={user} size="large" />
                            </div>
                            <div className="profile-basic-info">
                                <h2 className="profile-name">
                                    {user.name || `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Utilisateur'}
                                </h2>
                                <div className="profile-role">
                                    <span className="role-icon">🎓</span>
                                    <span className="role-text">{user.role || 'Étudiant'}</span>
                                </div>
                                <div className="profile-email">
                                    <span className="email-icon">📧</span>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                        
                        {/* Boutons d'action */}
                        <div className="profile-actions">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="edit-btn"
                                >
                                    ✏️ {getText('edit')} {getText('profile')}
                                </button>
                            ) : (
                                <div className="edit-actions">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="save-btn"
                                    >
                                        {loading ? '💾 Sauvegarde...' : '💾 Sauvegarder'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="cancel-btn"
                                    >
                                        ❌ Annuler
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Formulaire de modification */}
                    <div className="profile-card">
                        <h3 className="card-title">📝 Informations Personnelles</h3>
                        
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="prenom">Prénom *</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom de famille *</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telephone">Téléphone</label>
                                    <input
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="dateNaissance">Date de naissance</label>
                                    <input
                                        type="date"
                                        id="dateNaissance"
                                        name="dateNaissance"
                                        value={formData.dateNaissance}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genre">Genre</label>
                                    <select
                                        id="genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-select"
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Féminin</option>
                                        <option value="A">Autre</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nationalite">Nationalité</label>
                                    <input
                                        type="text"
                                        id="nationalite"
                                        name="nationalite"
                                        value={formData.nationalite}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="languePreferee">Langue préférée</label>
                                    <select
                                        id="languePreferee"
                                        name="languePreferee"
                                        value={formData.languePreferee}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-select"
                                    >
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="ar">العربية</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="adresse">Adresse</label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="ville">Ville</label>
                                    <input
                                        type="text"
                                        id="ville"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pays">Pays</label>
                                    <input
                                        type="text"
                                        id="pays"
                                        name="pays"
                                        value={formData.pays}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Informations académiques */}
                    <div className="profile-card">
                        <h3 className="card-title">🎓 Informations Académiques</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="etablissement">Établissement actuel</label>
                                <input
                                    type="text"
                                    id="etablissement"
                                    name="etablissement"
                                    value={formData.etablissement}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="niveauEtude">Niveau d'étude</label>
                                <select
                                    id="niveauEtude"
                                    name="niveauEtude"
                                    value={formData.niveauEtude}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-select"
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="Bac">Baccalauréat</option>
                                    <option value="Bac+1">Bac+1</option>
                                    <option value="Bac+2">Bac+2</option>
                                    <option value="Bac+3">Bac+3 (Licence)</option>
                                    <option value="Bac+4">Bac+4</option>
                                    <option value="Bac+5">Bac+5 (Master)</option>
                                    <option value="Bac+8">Bac+8 (Doctorat)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="anneeEtude">Année d'étude</label>
                                <input
                                    type="text"
                                    id="anneeEtude"
                                    name="anneeEtude"
                                    value={formData.anneeEtude}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialite">Spécialité</label>
                                <input
                                    type="text"
                                    id="specialite"
                                    name="specialite"
                                    value={formData.specialite}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Messages de feedback */}
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </GlobalLayout>
    );
}


