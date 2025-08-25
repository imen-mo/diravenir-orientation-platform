// Fichier : src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { applicationService } from '../services/applicationService';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
            profileImage: '/default-avatar.png'
        },
        applicationStatus: 'DRAFT',
        currentStep: 1,
        totalSteps: 5,
        progress: 0,
        lastUpdated: null
    });

    const [applications, setApplications] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Status configurations
    const statusConfig = {
        DRAFT: { label: 'Brouillon', color: 'gray', icon: '📝' },
        IN_PROGRESS: { label: 'En cours', color: 'blue', icon: '🔄' },
        SUBMITTED: { label: 'Soumise', color: 'indigo', icon: '📤' },
        UNDER_REVIEW: { label: 'En cours de révision', color: 'blue', icon: '🔍' },
        APPROVED: { label: 'Approuvé', color: 'green', icon: '🎉' },
        REJECTED: { label: 'Rejeté', color: 'red', icon: '❌' },
        COMPLETED: { label: 'Terminé', color: 'emerald', icon: '✅' },
        ON_HOLD: { label: 'En attente', color: 'gray', icon: '⏸️' },
        WITHDRAWN: { label: 'Retirée', color: 'gray', icon: '↩️' },
        SUSPENDED: { label: 'Suspendue', color: 'red', icon: '🚫' },
        EXPIRED: { label: 'Expirée', color: 'red', icon: '⏰' },
        CANCELLED: { label: 'Annulée', color: 'red', icon: '❌' }
    };

    // Charger les données de l'étudiant
    useEffect(() => {
        loadStudentData();
    }, []);

    const loadStudentData = async () => {
        try {
            setLoading(true);
            
            // Récupérer les applications de l'étudiant
            const userApplications = await applicationService.getApplicationsInProgress();
            setApplications(userApplications);
            
            // Récupérer les notifications
            const userNotifications = await applicationService.getApplicationNotifications();
            setNotifications(userNotifications);
            
            // Récupérer les documents
            const userDocuments = await applicationService.getApplicationDocuments();
            setDocuments(userDocuments);
            
            // Mettre à jour les données de l'étudiant
            if (userApplications.length > 0) {
                const latestApp = userApplications[0];
                setStudentData(prev => ({
                    ...prev,
                    personalInfo: {
                        name: `${latestApp.firstName} ${latestApp.lastName}`,
                        email: latestApp.email,
                        phone: latestApp.phone,
                        profileImage: '/default-avatar.png'
                    },
                    applicationStatus: latestApp.status,
                    currentStep: latestApp.currentStep,
                    progress: (latestApp.currentStep / 5) * 100,
                    lastUpdated: latestApp.updatedAt
                }));
            }
            
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            toast.error('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    const getStatusConfig = (status) => {
        return statusConfig[status] || statusConfig.DRAFT;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-blue-500';
        if (progress >= 40) return 'bg-yellow-500';
        if (progress >= 20) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleContinueApplication = (applicationId) => {
        navigate(`/apply/${applicationId}`);
    };

    const handleViewDocument = (documentName) => {
        toast.info(`Affichage du document: ${documentName}`);
    };

    const handleContactSupport = () => {
        navigate('/contact');
    };

    const handleNewApplication = () => {
        navigate('/apply');
    };

    if (loading) {
    return (
            <div className="student-dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de votre tableau de bord...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="student-dashboard">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="welcome-section">
                        <div className="profile-image">
                            <img 
                                src={studentData.personalInfo.profileImage} 
                                alt="Profile" 
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png';
                                }}
                            />
                        </div>
                        <div className="welcome-text">
                            <h1>Bonjour, {studentData.personalInfo.name || 'Étudiant'} !</h1>
                            <p className="subtitle">Bienvenue sur votre tableau de bord étudiant</p>
                            <div className="quick-stats">
                                <div className="stat-item">
                                    <span className="stat-number">{applications.length}</span>
                                    <span className="stat-label">Candidatures</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">{documents.filter(d => d.status === 'APPROVED').length}</span>
                                    <span className="stat-label">Documents approuvés</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">{notifications.length}</span>
                                    <span className="stat-label">Notifications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="status-overview">
                        <div className="current-status">
                            <div className="status-icon">
                                {getStatusConfig(studentData.applicationStatus).icon}
                            </div>
                            <div className="status-info">
                                <h3>Statut actuel</h3>
                                <span className={`status-badge ${getStatusConfig(studentData.applicationStatus).color}`}>
                                    {getStatusConfig(studentData.applicationStatus).label}
                                </span>
                            </div>
                        </div>
                        
                        <div className="progress-section">
                            <div className="progress-info">
                                <span>Étape {studentData.currentStep} sur {studentData.totalSteps}</span>
                                <span className="progress-percentage">{Math.round(studentData.progress)}%</span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className={`progress-fill ${getProgressColor(studentData.progress)}`}
                                    style={{ width: `${studentData.progress}%` }}
                                ></div>
                            </div>
                            <span className="last-updated">
                                Dernière mise à jour: {formatDate(studentData.lastUpdated)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="dashboard-tabs">
                <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => handleTabChange('overview')}
                >
                    <span className="tab-icon">📊</span>
                    Vue d'ensemble
                </button>
                <button 
                    className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => handleTabChange('applications')}
                >
                    <span className="tab-icon">📝</span>
                    Mes Candidatures
                </button>
                <button 
                    className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
                    onClick={() => handleTabChange('documents')}
                >
                    <span className="tab-icon">📋</span>
                    Documents
                </button>
                <button 
                    className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => handleTabChange('notifications')}
                >
                    <span className="tab-icon">🔔</span>
                    Notifications
                </button>
                <button 
                    className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabChange('profile')}
                >
                    <span className="tab-icon">👤</span>
                    Mon Profil
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        <div className="overview-grid">
                            <div className="overview-card applications-overview">
                                <h3>Mes Candidatures</h3>
                                {applications.length > 0 ? (
                                    <>
                                        <div className="applications-summary">
                                            {applications.slice(0, 3).map(app => (
                                                <div key={app.id} className="application-summary-item">
                                                    <div className="app-info">
                                                        <h4>{app.programName || 'Programme non spécifié'}</h4>
                                                        <p>{app.universityName || 'Université non spécifiée'}</p>
                                                    </div>
                                                    <div className="app-status">
                                                        <span className={`status-badge ${getStatusConfig(app.status).color}`}>
                                                            {getStatusConfig(app.status).label}
                                                        </span>
                                                        <div className="app-progress">
                                                            <span>Étape {app.currentStep}/5</span>
                                                            <div className="mini-progress-bar">
                                                                <div 
                                                                    className={`mini-progress-fill ${getProgressColor((app.currentStep / 5) * 100)}`}
                                                                    style={{ width: `${(app.currentStep / 5) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button 
                                            className="continue-btn"
                                            onClick={() => handleContinueApplication(applications[0].id)}
                                        >
                                            Continuer ma candidature
                                        </button>
                                    </>
                                ) : (
                                    <div className="no-applications">
                                        <p>Aucune candidature en cours</p>
                                        <button 
                                            className="continue-btn"
                                            onClick={handleNewApplication}
                                        >
                                            Créer une nouvelle candidature
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="overview-card documents-overview">
                                <h3>Documents</h3>
                                <div className="documents-summary">
                                    <div className="document-stat">
                                        <span className="stat-number">{documents.filter(d => d.status === 'APPROVED').length}</span>
                                        <span className="stat-label">Approuvés</span>
                                    </div>
                                    <div className="document-stat">
                                        <span className="stat-number">{documents.filter(d => d.status === 'PENDING').length}</span>
                                        <span className="stat-label">En attente</span>
                                    </div>
                                    <div className="document-stat">
                                        <span className="stat-number">{documents.filter(d => d.status === 'REJECTED').length}</span>
                                        <span className="stat-label">Rejetés</span>
                                    </div>
                                </div>
                                <button className="view-all-btn">Voir tous les documents</button>
                            </div>

                            <div className="overview-card notifications-overview">
                                <h3>Dernières Notifications</h3>
                                {notifications.length > 0 ? (
                                    <>
                                        <div className="notifications-summary">
                                            {notifications.slice(0, 3).map(notif => (
                                                <div key={notif.id} className="notification-item">
                                                    <span className={`notification-icon ${notif.type}`}>
                                                        {notif.type === 'SUCCESS' ? '✅' : notif.type === 'WARNING' ? '⚠️' : 'ℹ️'}
                                                    </span>
                                                    <span className="notification-text">{notif.message}</span>
                                                    <span className="notification-date">{formatDate(notif.createdAt)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="view-all-btn">Voir toutes les notifications</button>
                                    </>
                                ) : (
                                    <div className="no-notifications">
                                        <p>Aucune notification</p>
                                    </div>
                                )}
                            </div>

                            <div className="overview-card quick-actions">
                                <h3>Actions Rapides</h3>
                                <div className="quick-actions-grid">
                                    <button className="action-btn primary" onClick={handleNewApplication}>
                                        <span className="action-icon">📝</span>
                                        Nouvelle Candidature
                                    </button>
                                    <button className="action-btn secondary">
                                        <span className="action-icon">📋</span>
                                        Télécharger CV
                                    </button>
                                    <button className="action-btn secondary">
                                        <span className="action-icon">📧</span>
                                        Contacter le support
                                    </button>
                                    <button className="action-btn secondary">
                                        <span className="action-icon">⚙️</span>
                                        Paramètres
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <div className="applications-content">
                        <div className="applications-header">
                            <h2>Mes Candidatures</h2>
                            <button className="new-application-btn" onClick={handleNewApplication}>
                                <span className="btn-icon">➕</span>
                                Nouvelle Candidature
                            </button>
                        </div>
                        
                        {applications.length > 0 ? (
                            <div className="applications-list">
                                {applications.map(app => (
                                    <div key={app.id} className="application-card">
                                        <div className="application-header">
                                            <div className="app-title">
                                                <h3>{app.programName || 'Programme non spécifié'}</h3>
                                                <p className="university-name">{app.universityName || 'Université non spécifiée'}</p>
                                            </div>
                                            <div className="app-status-section">
                                                <span className={`status-badge ${getStatusConfig(app.status).color}`}>
                                                    {getStatusConfig(app.status).label}
                                                </span>
                                                <span className="application-id">#{app.applicationId}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="application-details">
                                            <div className="detail-row">
                                                <span className="detail-label">Date de création:</span>
                                                <span className="detail-value">{formatDate(app.createdAt)}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">Progression:</span>
                                                <div className="progress-section">
                                                    <span>Étape {app.currentStep}/5</span>
                                                    <div className="progress-bar">
                                                        <div 
                                                            className={`progress-fill ${getProgressColor((app.currentStep / 5) * 100)}`}
                                                            style={{ width: `${(app.currentStep / 5) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="progress-percentage">{Math.round((app.currentStep / 5) * 100)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="application-actions">
                                            <button 
                                                className="action-btn primary"
                                                onClick={() => handleContinueApplication(app.id)}
                                            >
                                                Continuer
                                            </button>
                                            <button className="action-btn secondary">
                                                Voir les détails
                                            </button>
                                            <button className="action-btn secondary">
                                                Télécharger PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-applications-message">
                                <p>Aucune candidature trouvée</p>
                                <button className="new-application-btn" onClick={handleNewApplication}>
                                    Créer votre première candidature
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                    <div className="documents-content">
                        <div className="documents-header">
                            <h2>Mes Documents</h2>
                            <button className="upload-document-btn">
                                <span className="btn-icon">📤</span>
                                Télécharger un document
                            </button>
                        </div>
                        
                        {documents.length > 0 ? (
                            <div className="documents-list">
                                {documents.map((doc, index) => (
                                    <div key={index} className="document-card">
                                        <div className="document-info">
                                            <div className="document-icon">
                                                {doc.status === 'APPROVED' ? '✅' : 
                                                 doc.status === 'REJECTED' ? '❌' : '⏳'}
                                            </div>
                                            <div className="document-details">
                                                <h4>{doc.documentType}</h4>
                                                <p>Téléchargé le {formatDate(doc.uploadDate)}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="document-status">
                                            <span className={`status-badge ${doc.status === 'APPROVED' ? 'green' : 
                                                               doc.status === 'REJECTED' ? 'red' : 'orange'}`}>
                                                {doc.status === 'APPROVED' ? 'Approuvé' : 
                                                 doc.status === 'REJECTED' ? 'Rejeté' : 'En attente'}
                                            </span>
                                        </div>
                                        
                                        <div className="document-actions">
                                            <button 
                                                className="action-btn secondary"
                                                onClick={() => handleViewDocument(doc.documentType)}
                                            >
                                                Voir
                                            </button>
                                            <button className="action-btn secondary">
                                                Remplacer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-documents-message">
                                <p>Aucun document uploadé</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="notifications-content">
                        <div className="notifications-header">
                            <h2>Notifications</h2>
                            <button className="mark-all-read-btn">
                                Marquer tout comme lu
                            </button>
                        </div>
                        
                        {notifications.length > 0 ? (
                            <div className="notifications-list">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`notification-card ${notif.type.toLowerCase()}`}>
                                        <div className="notification-icon">
                                            {notif.type === 'SUCCESS' ? '✅' : 
                                             notif.type === 'WARNING' ? '⚠️' : 'ℹ️'}
                                        </div>
                                        <div className="notification-content">
                                            <p className="notification-message">{notif.message}</p>
                                            <span className="notification-date">{formatDate(notif.createdAt)}</span>
                                        </div>
                                        <div className="notification-actions">
                                            <button className="action-btn secondary">Marquer comme lu</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-notifications-message">
                                <p>Aucune notification</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="profile-content">
                        <div className="profile-header">
                            <h2>Mon Profil</h2>
                            <button className="edit-profile-btn">
                                <span className="tab-icon">✏️</span>
                                Modifier le profil
                            </button>
                        </div>
                        
                        <div className="profile-grid">
                            <div className="profile-card personal-info">
                                <h3>Informations Personnelles</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Nom complet:</span>
                                        <span className="info-value">{studentData.personalInfo.name || 'Non renseigné'}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Email:</span>
                                        <span className="info-value">{studentData.personalInfo.email || 'Non renseigné'}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Téléphone:</span>
                                        <span className="info-value">{studentData.personalInfo.phone || 'Non renseigné'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="profile-card account-settings">
                                <h3>Paramètres du Compte</h3>
                                <div className="settings-list">
                                    <button className="setting-btn">
                                        <span className="setting-icon">🔒</span>
                                        Changer le mot de passe
                                    </button>
                                    <button className="setting-btn">
                                        <span className="setting-icon">📧</span>
                                        Préférences email
                                    </button>
                                    <button className="setting-btn">
                                        <span className="setting-icon">🌐</span>
                                        Langue et région
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Support Section */}
            <div className="support-section">
                <div className="support-content">
                    <div className="support-info">
                        <h3>Besoin d'aide ?</h3>
                        <p>Notre équipe est là pour vous accompagner dans votre parcours</p>
                    </div>
                    <div className="support-actions">
                        <button className="support-btn primary" onClick={handleContactSupport}>
                            <span className="btn-icon">💬</span>
                            Contacter le support
                        </button>
                        <button className="support-btn secondary">
                            <span className="btn-icon">📚</span>
                            Centre d'aide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
