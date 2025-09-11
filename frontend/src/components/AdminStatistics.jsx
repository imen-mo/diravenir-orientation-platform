import React, { useState, useEffect } from 'react';
import './AdminStatistics.css';

const AdminStatistics = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalApplications: 0,
        totalPrograms: 0,
        activeUsers: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // ===== CHARGEMENT DES STATISTIQUES =====
    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/statistics?period=${selectedPeriod}`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                console.warn('⚠️ Erreur API:', response.status, response.statusText);
                // Données de test en mode développement
                if (process.env.NODE_ENV === 'development') {
                    setStats({
                        totalUsers: 1250,
                        totalApplications: 342,
                        totalPrograms: 89,
                        activeUsers: 987,
                        pendingApplications: 45,
                        approvedApplications: 234,
                        rejectedApplications: 63,
                        recentActivity: [
                            { id: 1, type: 'application', message: 'Nouvelle candidature soumise', time: '2h ago' },
                            { id: 2, type: 'user', message: 'Nouvel utilisateur inscrit', time: '4h ago' },
                            { id: 3, type: 'program', message: 'Programme mis à jour', time: '6h ago' },
                            { id: 4, type: 'application', message: 'Candidature approuvée', time: '8h ago' }
                        ]
                    });
                }
            }
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des statistiques:', error);
            // Données de test en cas d'erreur
            if (process.env.NODE_ENV === 'development') {
                setStats({
                    totalUsers: 1000,
                    totalApplications: 250,
                    totalPrograms: 75,
                    activeUsers: 800,
                    pendingApplications: 30,
                    approvedApplications: 180,
                    rejectedApplications: 40,
                    recentActivity: [
                        { id: 1, type: 'error', message: 'Erreur API - Données de test', time: 'Maintenant' }
                    ]
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [selectedPeriod]);

    // ===== CALCULS DES POURCENTAGES =====
    const approvalRate = stats.totalApplications > 0 
        ? Math.round((stats.approvedApplications / stats.totalApplications) * 100)
        : 0;

    const rejectionRate = stats.totalApplications > 0 
        ? Math.round((stats.rejectedApplications / stats.totalApplications) * 100)
        : 0;

    const pendingRate = stats.totalApplications > 0 
        ? Math.round((stats.pendingApplications / stats.totalApplications) * 100)
        : 0;

    // ===== RENDU DES ACTIVITÉS =====
    const renderActivityIcon = (type) => {
        const icons = {
            'application': '📋',
            'user': '👤',
            'program': '🎓',
            'error': '❌'
        };
        return icons[type] || '📊';
    };

    const renderActivityColor = (type) => {
        const colors = {
            'application': '#007bff',
            'user': '#28a745',
            'program': '#ffc107',
            'error': '#dc3545'
        };
        return colors[type] || '#6c757d';
    };

    if (loading && stats.totalUsers === 0) {
            return (
            <div className="admin-statistics">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Chargement des statistiques...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-statistics">
            {/* Header */}
            <div className="statistics-header">
                <div className="header-content">
                    <h2>📊 Tableau de Bord</h2>
                    <p>Vue d'ensemble des activités et performances</p>
                </div>
                <div className="header-actions">
                    <select 
                        value={selectedPeriod} 
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="period-select"
                    >
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="quarter">Ce trimestre</option>
                        <option value="year">Cette année</option>
                    </select>
                    <button 
                        className="btn-refresh"
                        onClick={fetchStatistics}
                        disabled={loading}
                    >
                        {loading ? '🔄' : '🔄'} Actualiser
                    </button>
                </div>
            </div>

            {/* Cartes de statistiques principales */}
            <div className="stats-grid">
                <div className="stat-card primary">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Utilisateurs Totaux</h3>
                        <div className="stat-number">{stats.totalUsers.toLocaleString()}</div>
                        <div className="stat-detail">
                            <span className="stat-label">Actifs:</span>
                            <span className="stat-value">{stats.activeUsers.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card success">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>Candidatures</h3>
                        <div className="stat-number">{stats.totalApplications.toLocaleString()}</div>
                        <div className="stat-detail">
                            <span className="stat-label">Approuvées:</span>
                            <span className="stat-value">{stats.approvedApplications.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card info">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-content">
                        <h3>Programmes</h3>
                        <div className="stat-number">{stats.totalPrograms.toLocaleString()}</div>
                        <div className="stat-detail">
                            <span className="stat-label">Disponibles:</span>
                            <span className="stat-value">{stats.totalPrograms.toLocaleString()}</span>
                        </div>
                    </div>
            </div>

                <div className="stat-card warning">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>En Attente</h3>
                        <div className="stat-number">{stats.pendingApplications.toLocaleString()}</div>
                        <div className="stat-detail">
                            <span className="stat-label">Taux:</span>
                            <span className="stat-value">{pendingRate}%</span>
                        </div>
                    </div>
                </div>
                </div>
                
            {/* Graphiques et analyses */}
            <div className="analytics-section">
                <div className="analytics-grid">
                    {/* Taux d'approbation */}
                    <div className="analytics-card">
                        <h3>📈 Taux d'Approbation</h3>
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill success" 
                                    style={{ width: `${approvalRate}%` }}
                                />
                            </div>
                            <div className="progress-labels">
                                <span className="progress-percentage">{approvalRate}%</span>
                                <span className="progress-text">Approuvées</span>
                            </div>
                        </div>
                        <div className="progress-stats">
                            <div className="stat-item">
                                <span className="stat-label">Approuvées:</span>
                                <span className="stat-value">{stats.approvedApplications}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Rejetées:</span>
                                <span className="stat-value">{stats.rejectedApplications}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">En attente:</span>
                                <span className="stat-value">{stats.pendingApplications}</span>
                            </div>
                </div>
            </div>

                    {/* Répartition des candidatures */}
                    <div className="analytics-card">
                        <h3>📊 Répartition des Candidatures</h3>
                        <div className="chart-container">
                            <div className="chart-item">
                                <div className="chart-bar">
                                    <div 
                                        className="chart-fill success" 
                                        style={{ height: `${(stats.approvedApplications / stats.totalApplications) * 100}%` }}
                                    />
                                </div>
                                <div className="chart-label">
                                    <span className="chart-percentage">{approvalRate}%</span>
                                    <span className="chart-text">Approuvées</span>
                                </div>
                            </div>
                            <div className="chart-item">
                                <div className="chart-bar">
                                    <div 
                                        className="chart-fill warning" 
                                        style={{ height: `${(stats.pendingApplications / stats.totalApplications) * 100}%` }}
                                    />
                                </div>
                                <div className="chart-label">
                                    <span className="chart-percentage">{pendingRate}%</span>
                                    <span className="chart-text">En attente</span>
                            </div>
                            </div>
                            <div className="chart-item">
                                <div className="chart-bar">
                                    <div 
                                        className="chart-fill danger" 
                                        style={{ height: `${(stats.rejectedApplications / stats.totalApplications) * 100}%` }}
                                    />
                                </div>
                                <div className="chart-label">
                                    <span className="chart-percentage">{rejectionRate}%</span>
                                    <span className="chart-text">Rejetées</span>
                                </div>
                            </div>
                            </div>
                        </div>
                </div>
            </div>

            {/* Activité récente */}
            <div className="recent-activity">
                <div className="activity-header">
                    <h3>🕒 Activité Récente</h3>
                    <span className="activity-count">{stats.recentActivity.length} activités</span>
                </div>
                
                <div className="activity-list">
                    {stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div 
                                    className="activity-icon"
                                    style={{ backgroundColor: renderActivityColor(activity.type) }}
                                >
                                    {renderActivityIcon(activity.type)}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-message">{activity.message}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-activity">
                            <p>Aucune activité récente</p>
                        </div>
                    )}
                       </div>
                   </div>

            {/* Métriques rapides */}
            <div className="quick-metrics">
                <div className="metrics-grid">
                    <div className="metric-item">
                        <div className="metric-icon">📈</div>
                        <div className="metric-content">
                            <h4>Croissance</h4>
                            <p>+12% ce mois</p>
                        </div>
                    </div>
                    <div className="metric-item">
                        <div className="metric-icon">⏱️</div>
                        <div className="metric-content">
                            <h4>Temps de traitement</h4>
                            <p>2.3 jours en moyenne</p>
                        </div>
                    </div>
                    <div className="metric-item">
                        <div className="metric-icon">🎯</div>
                        <div className="metric-content">
                            <h4>Objectif</h4>
                            <p>85% d'approbation</p>
                        </div>
                    </div>
                    <div className="metric-item">
                        <div className="metric-icon">📅</div>
                        <div className="metric-content">
                            <h4>Prochaines échéances</h4>
                            <p>15 candidatures à traiter</p>
                        </div>
                    </div>
                </div>
                   </div>
        </div>
    );
};

export default AdminStatistics;
