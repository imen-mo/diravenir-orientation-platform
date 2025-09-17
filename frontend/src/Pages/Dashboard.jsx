import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext';
import GlobalLayout from '../components/GlobalLayout';
import './Dashboard.css';

const Dashboard = () => {
    const { getText } = useTheme();
    const { t } = useLanguage();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);
    
    if (loading) {
        return (
            <GlobalLayout>
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement du tableau de bord...</p>
                </div>
            </GlobalLayout>
        );
    }
    
    if (!user) {
        return (
            <GlobalLayout>
                <div className="dashboard-error">
                    <h2>Accès non autorisé</h2>
                    <p>Veuillez vous connecter pour accéder au tableau de bord.</p>
                </div>
            </GlobalLayout>
        );
    }
    
    return (
        <GlobalLayout>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Tableau de bord</h1>
                    <p>Bienvenue, {user.firstName} !</p>
                </div>
                
                <div className="dashboard-content">
                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="card-icon">📊</div>
                            <h3>Statistiques</h3>
                            <p>Consultez vos statistiques personnelles</p>
                        </div>
                        
                        <div className="dashboard-card">
                            <div className="card-icon">🎯</div>
                            <h3>Orientation</h3>
                            <p>Découvrez votre orientation professionnelle</p>
                        </div>
                        
                        <div className="dashboard-card">
                            <div className="card-icon">📚</div>
                            <h3>Programmes</h3>
                            <p>Explorez les programmes disponibles</p>
                        </div>
                        
                        <div className="dashboard-card">
                            <div className="card-icon">⚙️</div>
                            <h3>Paramètres</h3>
                            <p>Gérez vos préférences</p>
                        </div>
                    </div>
                    
                    <div className="dashboard-info">
                        <h2>Informations du compte</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Nom complet :</label>
                                <span>{user.firstName} {user.lastName}</span>
                            </div>
                            <div className="info-item">
                                <label>Email :</label>
                                <span>{user.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Rôle :</label>
                                <span>{user.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default Dashboard;
