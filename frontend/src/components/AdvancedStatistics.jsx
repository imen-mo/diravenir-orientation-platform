import React, { useState, useEffect } from 'react';
import './AdvancedStatistics.css';

const AdvancedStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('30days');
    const [activeSection, setActiveSection] = useState('overview');

    // ===== CHARGEMENT DES DONNÉES =====
    useEffect(() => {
        fetchAdvancedStatistics();
    }, []);

    const fetchAdvancedStatistics = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/applications/statistics/advanced');
            if (response.ok) {
                const data = await response.json();
                setStatistics(data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques avancées:', error);
        } finally {
            setLoading(false);
        }
    };

    // ===== SECTIONS =====
    const sections = [
        { id: 'overview', label: '📊 Vue d\'ensemble', icon: '📊' },
        { id: 'users', label: '👥 Utilisateurs', icon: '👥' },
        { id: 'payments', label: '💳 Paiements', icon: '💳' },
        { id: 'programs', label: '🎓 Programmes', icon: '🎓' },
        { id: 'geographic', label: '🌍 Géographie', icon: '🌍' },
        { id: 'timeline', label: '📅 Évolution', icon: '📅' }
    ];

    // ===== RENDU DES CARTES DE STATISTIQUES =====
    const renderStatCard = (title, value, icon, color, subtitle = '') => (
        <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
            <div className="stat-icon" style={{ color }}>
                {icon}
            </div>
            <div className="stat-content">
                <span className="stat-number">{value}</span>
                <span className="stat-title">{title}</span>
                {subtitle && <span className="stat-subtitle">{subtitle}</span>}
            </div>
        </div>
    );

    // ===== RENDU DES STATISTIQUES DES UTILISATEURS =====
    const renderUserStatistics = () => {
        if (!statistics?.users) return null;

        const { users } = statistics;
        return (
            <div className="statistics-section">
                <h3>👥 Statistiques des Utilisateurs</h3>
                
                <div className="stats-grid">
                    {renderStatCard(
                        'Total Utilisateurs',
                        users.totalUsers || 0,
                        '👥',
                        '#007bff'
                    )}
                    {renderStatCard(
                        'Avec Applications',
                        users.usersWithApplications || 0,
                        '📋',
                        '#28a745'
                    )}
                    {renderStatCard(
                        'Applications Terminées',
                        users.usersWithCompletedApplications || 0,
                        '✅',
                        '#6f42c1'
                    )}
                    {renderStatCard(
                        'Utilisateurs Actifs',
                        users.activeUsers || 0,
                        '🔄',
                        '#ffc107'
                    )}
                </div>

                {/* Top utilisateurs */}
                {users.topUsers && users.topUsers.length > 0 && (
                    <div className="top-users-section">
                        <h4>🏆 Top Utilisateurs</h4>
                        <div className="top-users-list">
                            {users.topUsers.slice(0, 5).map((user, index) => (
                                <div key={index} className="top-user-item">
                                    <div className="user-rank">#{index + 1}</div>
                                    <div className="user-email">{user.email}</div>
                                    <div className="user-applications">
                                        {user.applicationCount} application(s)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ===== RENDU DES STATISTIQUES DES PAIEMENTS =====
    const renderPaymentStatistics = () => {
        if (!statistics?.payments) return null;

        const { payments } = statistics;
        return (
            <div className="statistics-section">
                <h3>💳 Statistiques des Paiements</h3>
                
                <div className="stats-grid">
                    {renderStatCard(
                        'Total Paiements',
                        payments.totalPayments || 0,
                        '💳',
                        '#007bff'
                    )}
                    {renderStatCard(
                        'Paiements Complétés',
                        payments.completedPayments || 0,
                        '✅',
                        '#28a745'
                    )}
                    {renderStatCard(
                        'Paiements en Attente',
                        payments.pendingPayments || 0,
                        '⏳',
                        '#ffc107'
                    )}
                    {renderStatCard(
                        'Paiements Échoués',
                        payments.failedPayments || 0,
                        '❌',
                        '#dc3545'
                    )}
                </div>

                <div className="stats-grid">
                    {renderStatCard(
                        'Montant Total',
                        `${payments.totalAmount || 0} MAD`,
                        '💰',
                        '#28a745',
                        'Paiements complétés'
                    )}
                    {renderStatCard(
                        'Montant Moyen',
                        `${payments.averageAmount || 0} MAD`,
                        '📊',
                        '#17a2b8',
                        'Par paiement'
                    )}
                    {renderStatCard(
                        'Remboursements',
                        payments.refundedPayments || 0,
                        '💸',
                        '#6f42c1'
                    )}
                </div>

                {/* Méthodes de paiement */}
                {payments.paymentMethods && Object.keys(payments.paymentMethods).length > 0 && (
                    <div className="payment-methods-section">
                        <h4>💳 Méthodes de Paiement</h4>
                        <div className="payment-methods-grid">
                            {Object.entries(payments.paymentMethods).map(([method, count]) => (
                                <div key={method} className="payment-method-item">
                                    <div className="method-name">{method}</div>
                                    <div className="method-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ===== RENDU DES STATISTIQUES DES PROGRAMMES =====
    const renderProgramStatistics = () => {
        if (!statistics?.programs) return null;

        const { programs } = statistics;
        return (
            <div className="statistics-section">
                <h3>🎓 Statistiques des Programmes</h3>
                
                <div className="stats-grid">
                    {renderStatCard(
                        'Total Programmes',
                        programs.totalPrograms || 0,
                        '🎓',
                        '#007bff'
                    )}
                </div>

                {/* Programmes par statut */}
                {programs.programsByStatus && Object.keys(programs.programsByStatus).length > 0 && (
                    <div className="programs-by-status-section">
                        <h4>📊 Programmes par Statut</h4>
                        <div className="programs-status-grid">
                            {Object.entries(programs.programsByStatus).map(([status, count]) => (
                                <div key={status} className="program-status-item">
                                    <div className="status-name">{status}</div>
                                    <div className="status-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Programmes par destination */}
                {programs.programsByDestination && Object.keys(programs.programsByDestination).length > 0 && (
                    <div className="programs-by-destination-section">
                        <h4>🌍 Programmes par Destination</h4>
                        <div className="programs-destination-grid">
                            {Object.entries(programs.programsByDestination).map(([destination, count]) => (
                                <div key={destination} className="program-destination-item">
                                    <div className="destination-name">{destination}</div>
                                    <div className="destination-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Top programmes populaires */}
                {programs.topPrograms && programs.topPrograms.length > 0 && (
                    <div className="top-programs-section">
                        <h4>🏆 Programmes les Plus Populaires</h4>
                        <div className="top-programs-list">
                            {programs.topPrograms.slice(0, 10).map((program, index) => (
                                <div key={index} className="top-program-item">
                                    <div className="program-rank">#{index + 1}</div>
                                    <div className="program-name">{program.name}</div>
                                    <div className="program-applications">
                                        {program.applicationCount} candidature(s)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ===== RENDU DES STATISTIQUES GÉOGRAPHIQUES =====
    const renderGeographicStatistics = () => {
        if (!statistics?.geographic) return null;

        const { geographic } = statistics;
        return (
            <div className="statistics-section">
                <h3>🌍 Statistiques Géographiques</h3>
                
                {/* Applications par pays */}
                {geographic.applicationsByCountry && Object.keys(geographic.applicationsByCountry).length > 0 && (
                    <div className="geographic-section">
                        <h4>🌍 Applications par Pays</h4>
                        <div className="geographic-grid">
                            {Object.entries(geographic.applicationsByCountry).map(([country, count]) => (
                                <div key={country} className="geographic-item">
                                    <div className="country-name">{country}</div>
                                    <div className="country-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Applications par province */}
                {geographic.applicationsByProvince && Object.keys(geographic.applicationsByProvince).length > 0 && (
                    <div className="geographic-section">
                        <h4>🏛️ Applications par Province</h4>
                        <div className="geographic-grid">
                            {Object.entries(geographic.applicationsByProvince).map(([province, count]) => (
                                <div key={province} className="geographic-item">
                                    <div className="province-name">{province}</div>
                                    <div className="province-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Choix de destination */}
                {geographic.destinationChoices && Object.keys(geographic.destinationChoices).length > 0 && (
                    <div className="geographic-section">
                        <h4>✈️ Choix de Destination</h4>
                        <div className="geographic-grid">
                            {Object.entries(geographic.destinationChoices).map(([destination, count]) => (
                                <div key={destination} className="geographic-item">
                                    <div className="destination-name">{destination}</div>
                                    <div className="destination-count">{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ===== RENDU DES STATISTIQUES TEMPORELLES =====
    const renderTimelineStatistics = () => {
        if (!statistics?.timeline) return null;

        const { timeline } = statistics;
        return (
            <div className="statistics-section">
                <h3>📅 Statistiques Temporelles</h3>
                
                <div className="stats-grid">
                    {renderStatCard(
                        '30 Derniers Jours',
                        timeline.last30Days || 0,
                        '📅',
                        '#007bff'
                    )}
                    {renderStatCard(
                        '7 Derniers Jours',
                        timeline.last7Days || 0,
                        '📆',
                        '#28a745'
                    )}
                </div>

                {/* Applications par jour */}
                {timeline.dailyApplications && Object.keys(timeline.dailyApplications).length > 0 && (
                    <div className="timeline-section">
                        <h4>📊 Applications par Jour (30 derniers jours)</h4>
                        <div className="timeline-chart">
                            {Object.entries(timeline.dailyApplications)
                                .sort(([a], [b]) => new Date(a) - new Date(b))
                                .slice(-7)
                                .map(([date, count]) => (
                                    <div key={date} className="timeline-bar">
                                        <div className="bar-label">
                                            {new Date(date).toLocaleDateString('fr-FR', { 
                                                day: '2-digit', 
                                                month: '2-digit' 
                                            })}
                                        </div>
                                        <div className="bar-container">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    height: `${Math.min((count / Math.max(...Object.values(timeline.dailyApplications))) * 100, 100)}%`,
                                                    backgroundColor: '#007bff'
                                                }}
                                            />
                                        </div>
                                        <div className="bar-value">{count}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ===== RENDU PRINCIPAL =====
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">🔄</div>
                <p>Chargement des statistiques avancées...</p>
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="error-container">
                <div className="error-icon">❌</div>
                <h3>Erreur de chargement</h3>
                <p>Impossible de charger les statistiques avancées</p>
                <button onClick={fetchAdvancedStatistics} className="btn-retry">
                    🔄 Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="advanced-statistics">
            {/* Header */}
            <div className="stats-header">
                <div className="header-left">
                    <h2>📊 Statistiques Avancées</h2>
                    <p>Vue complète et détaillée de toutes les données</p>
                </div>

                <div className="header-right">
                    <button
                        className="btn-refresh"
                        onClick={fetchAdvancedStatistics}
                    >
                        🔄 Actualiser
                    </button>
                </div>
            </div>

            {/* Navigation des sections */}
            <div className="sections-nav">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`section-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <span className="section-icon">{section.icon}</span>
                        <span className="section-label">{section.label}</span>
                    </button>
                ))}
            </div>

            {/* Contenu des sections */}
            <div className="sections-content">
                {activeSection === 'overview' && (
                    <div className="statistics-section">
                        <h3>📊 Vue d'Ensemble</h3>
                        
                        <div className="stats-grid">
                            {renderStatCard(
                                'Total Applications',
                                statistics.applications?.total || 0,
                                '📋',
                                '#007bff'
                            )}
                            {renderStatCard(
                                'Total Utilisateurs',
                                statistics.users?.totalUsers || 0,
                                '👥',
                                '#28a745'
                            )}
                            {renderStatCard(
                                'Total Programmes',
                                statistics.programs?.totalPrograms || 0,
                                '🎓',
                                '#6f42c1'
                            )}
                            {renderStatCard(
                                'Paiements Complétés',
                                statistics.payments?.completedPayments || 0,
                                '💳',
                                '#ffc107'
                            )}
                        </div>

                        <div className="stats-grid">
                            {renderStatCard(
                                'Applications Approuvées',
                                statistics.applications?.approved || 0,
                                '✅',
                                '#28a745',
                                `${statistics.applications?.approvedPercentage || 0}% du total`
                            )}
                            {renderStatCard(
                                'Applications en Cours',
                                statistics.applications?.inProgress || 0,
                                '🔄',
                                '#007bff',
                                `${statistics.applications?.inProgressPercentage || 0}% du total`
                            )}
                            {renderStatCard(
                                'Applications Rejetées',
                                statistics.applications?.rejected || 0,
                                '❌',
                                '#dc3545',
                                `${statistics.applications?.rejectedPercentage || 0}% du total`
                            )}
                            {renderStatCard(
                                'Taux de Réussite',
                                `${Math.round((statistics.applications?.approved || 0) / Math.max(statistics.applications?.total || 1) * 100)}%`,
                                '🎯',
                                '#28a745',
                                'Applications approuvées'
                            )}
                        </div>
                    </div>
                )}

                {activeSection === 'users' && renderUserStatistics()}
                {activeSection === 'payments' && renderPaymentStatistics()}
                {activeSection === 'programs' && renderProgramStatistics()}
                {activeSection === 'geographic' && renderGeographicStatistics()}
                {activeSection === 'timeline' && renderTimelineStatistics()}
            </div>
        </div>
    );
};

export default AdvancedStatistics;
