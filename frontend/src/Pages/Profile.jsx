import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Chargement du profil...</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Non disponible';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusIcon = (status) => {
        return status ? '✅' : '❌';
    };

    const getRoleIcon = (role) => {
        const roleIcons = {
            'ROLE_ETUDIANT': '🎓',
            'ROLE_ADMIN': '👑',
            'ROLE_CONSEILLER': '💼',
            'ROLE_PARTENAIRE': '🤝'
        };
        return roleIcons[role] || '👤';
    };

    return (
        <div className="profile-container">
            {/* Header avec gradient */}
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-header-text">
                        <h1 className="profile-title">
                            <span className="profile-emoji">👋</span>
                            Mon Profil
                        </h1>
                        <p className="profile-subtitle">
                            Gérez vos informations personnelles et suivez votre parcours
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
                {/* Section principale du profil */}
                <div className="profile-main-section">
                    <div className="profile-card profile-info-card">
                        <div className="profile-photo-section">
                            <div className="profile-photo-container">
                                {user.photoProfil ? (
                                    <img 
                                        src={user.photoProfil} 
                                        alt="Photo de profil" 
                                        className="profile-photo-large"
                                    />
                                ) : (
                                    <div className="profile-avatar-large">
                                        <span className="avatar-initial">
                                            {user.prenom?.charAt(0) || user.email?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                )}
                                <div className="profile-photo-overlay">
                                    <span className="camera-emoji">📷</span>
                                </div>
                            </div>
                            <div className="profile-basic-info">
                                <h2 className="profile-name">
                                    {user.prenom} {user.nom}
                                </h2>
                                <div className="profile-role">
                                    <span className="role-icon">{getRoleIcon(user.role)}</span>
                                    <span className="role-text">
                                        {user.role?.replace('ROLE_', '') || 'Utilisateur'}
                                    </span>
                                </div>
                                <div className="profile-email">
                                    <span className="email-icon">📧</span>
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grille d'informations détaillées */}
                    <div className="profile-details-grid">
                        <div className="detail-card">
                            <div className="detail-header">
                                <span className="detail-icon">📱</span>
                                <h3>Téléphone</h3>
                            </div>
                            <div className="detail-content">
                                {user.telephone || 'Non renseigné'}
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-header">
                                <span className="detail-icon">🌍</span>
                                <h3>Langue préférée</h3>
                            </div>
                            <div className="detail-content">
                                {user.languePreferee || 'Français'}
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-header">
                                <span className="detail-icon">📅</span>
                                <h3>Date de création</h3>
                            </div>
                            <div className="detail-content">
                                {formatDate(user.dateCreation)}
                            </div>
                        </div>

                        <div className="detail-card">
                            <div className="detail-header">
                                <span className="detail-icon">🕒</span>
                                <h3>Dernière connexion</h3>
                            </div>
                            <div className="detail-content">
                                {formatDate(user.derniereConnexion)}
                            </div>
                        </div>

                        <div className="detail-card status-card">
                            <div className="detail-header">
                                <span className="detail-icon">🔐</span>
                                <h3>Statut du compte</h3>
                            </div>
                            <div className="detail-content">
                                <div className="status-item">
                                    <span>Compte actif:</span>
                                    <span className="status-value">
                                        {getStatusIcon(user.compteActif)}
                                    </span>
                                </div>
                                <div className="status-item">
                                    <span>Email vérifié:</span>
                                    <span className="status-value">
                                        {getStatusIcon(user.emailVerifie)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-card action-card">
                            <div className="detail-header">
                                <span className="detail-icon">⚙️</span>
                                <h3>Actions</h3>
                            </div>
                            <div className="detail-content">
                                <Link to="/settings" className="edit-profile-btn">
                                    <span className="btn-icon">✏️</span>
                                    Modifier le profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section des actions rapides */}
                <div className="profile-actions-section">
                    <div className="actions-header">
                        <h2 className="actions-title">
                            <span className="actions-emoji">🚀</span>
                            Actions Rapides
                        </h2>
                    </div>
                    <div className="actions-grid">
                        <Link to="/programs" className="action-card">
                            <div className="action-icon">🔍</div>
                            <h3>Explorer les programmes</h3>
                            <p>Découvrez les formations disponibles</p>
                        </Link>
                        <Link to="/orientation" className="action-card">
                            <div className="action-icon">🧭</div>
                            <h3>Test d'orientation</h3>
                            <p>Évaluez vos compétences</p>
                        </Link>
                        <Link to="/contact" className="action-card">
                            <div className="action-icon">💬</div>
                            <h3>Contacter un conseiller</h3>
                            <p>Obtenez de l'aide personnalisée</p>
                        </Link>
                        <Link to="/settings" className="action-card">
                            <div className="action-icon">⚙️</div>
                            <h3>Paramètres</h3>
                            <p>Personnalisez votre expérience</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


