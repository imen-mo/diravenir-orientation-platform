import React, { useState, useEffect } from 'react';
import './OrientationStatistics.css';

const OrientationStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [detailedStats, setDetailedStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState(30);
    const [activeTab, setActiveTab] = useState('overview');

    // ===== CHARGEMENT DES STATISTIQUES =====
    useEffect(() => {
        fetchStatistics();
        fetchDetailedStatistics();
    }, [selectedPeriod]);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/orientation/statistics');
            if (response.ok) {
                const data = await response.json();
                setStatistics(data);
            } else {
                console.error('Erreur lors de la récupération des statistiques:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDetailedStatistics = async () => {
        try {
            const response = await fetch(`/api/admin/orientation/statistics/detailed?days=${selectedPeriod}`);
            if (response.ok) {
                const data = await response.json();
                setDetailedStats(data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques détaillées:', error);
        }
    };

    // ===== RENDU DES CARTES DE STATISTIQUES =====
    const renderStatCard = (title, value, subtitle, icon, color) => (
        <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
            <div className="stat-icon" style={{ color }}>
                {icon}
            </div>
            <div className="stat-content">
                <h3>{title}</h3>
                <div className="stat-value">{value}</div>
                <div className="stat-subtitle">{subtitle}</div>
            </div>
        </div>
    );

    // ===== RENDU DU GRAPHIQUE LINÉAIRE =====
    const renderTimelineChart = () => {
        if (!detailedStats?.timeline) return null;

        const { labels, datasets } = detailedStats.timeline;
        const maxValue = Math.max(...datasets.flatMap(dataset => dataset.data));

        return (
            <div className="chart-container">
                <h3>📈 Évolution des Tests d'Orientation</h3>
                <div className="timeline-chart">
                    <div className="chart-labels">
                        {labels.map((label, index) => (
                            <div key={index} className="chart-label">{label}</div>
                        ))}
                    </div>
                    <div className="chart-bars">
                        {datasets.map((dataset, datasetIndex) => (
                            <div key={datasetIndex} className="dataset">
                                <div className="dataset-label" style={{ color: dataset.borderColor }}>
                                    {dataset.label}
                                </div>
                                <div className="bars-container">
                                    {dataset.data.map((value, index) => (
                                        <div key={index} className="bar-container">
                                            <div 
                                                className="bar" 
                                                style={{ 
                                                    height: `${(value / maxValue) * 100}%`,
                                                    backgroundColor: dataset.backgroundColor
                                                }}
                                            />
                                            <div className="bar-value">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // ===== RENDU DU GRAPHIQUE CIRCULAIRE =====
    const renderPieChart = () => {
        if (!detailedStats?.majorsChart) return null;

        const total = detailedStats.majorsChart.reduce((sum, item) => sum + item.count, 0);
        let cumulativePercentage = 0;

        return (
            <div className="chart-container">
                <h3>🎯 Top Majors Recommandées</h3>
                <div className="pie-chart">
                    {detailedStats.majorsChart.map((item, index) => {
                        const percentage = (item.count / total) * 100;
                        const startAngle = cumulativePercentage * 3.6;
                        const endAngle = (cumulativePercentage + percentage) * 3.6;
                        cumulativePercentage += percentage;

                        return (
                            <div key={index} className="pie-segment">
                                <div 
                                    className="segment" 
                                    style={{
                                        background: `conic-gradient(from ${startAngle}deg, #007bff ${startAngle}deg, #007bff ${endAngle}deg, transparent ${endAngle}deg)`
                                    }}
                                />
                                <div className="segment-info">
                                    <span className="segment-label">{item.major}</span>
                                    <span className="segment-count">{item.count} ({percentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // ===== RENDU DU GRAPHIQUE EN BARRES =====
    const renderBarChart = () => {
        if (!detailedStats?.statusChart) return null;

        const { labels, data, backgroundColor } = detailedStats.statusChart;
        const maxValue = Math.max(...data);

        return (
            <div className="chart-container">
                <h3>📊 Répartition par Statut</h3>
                <div className="bar-chart">
                    {labels.map((label, index) => (
                        <div key={index} className="bar-item">
                            <div className="bar-label">{label}</div>
                            <div className="bar-wrapper">
                                <div 
                                    className="bar-fill" 
                                    style={{ 
                                        height: `${(data[index] / maxValue) * 100}%`,
                                        backgroundColor: backgroundColor[index]
                                    }}
                                />
                                <div className="bar-value">{data[index]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading && !statistics) {
        return (
            <div className="orientation-statistics">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Chargement des statistiques d'orientation...</h3>
                </div>
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="orientation-statistics">
                <div className="error-container">
                    <h3>❌ Erreur lors du chargement des statistiques</h3>
                    <button onClick={fetchStatistics} className="retry-button">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    const { overview, recentActivity, topMajors, statusDistribution } = statistics;

    return (
        <div className="orientation-statistics">
            <div className="stats-header">
                <h2>📊 Statistiques des Tests d'Orientation</h2>
                <div className="period-selector">
                    <label>Période:</label>
                    <select 
                        value={selectedPeriod} 
                        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                    >
                        <option value={7}>7 derniers jours</option>
                        <option value={30}>30 derniers jours</option>
                        <option value={90}>90 derniers jours</option>
                    </select>
                </div>
            </div>

            {/* Onglets */}
            <div className="stats-tabs">
                <button 
                    className={activeTab === 'overview' ? 'active' : ''}
                    onClick={() => setActiveTab('overview')}
                >
                    📈 Vue d'ensemble
                </button>
                <button 
                    className={activeTab === 'charts' ? 'active' : ''}
                    onClick={() => setActiveTab('charts')}
                >
                    📊 Graphiques
                </button>
                <button 
                    className={activeTab === 'majors' ? 'active' : ''}
                    onClick={() => setActiveTab('majors')}
                >
                    🎯 Top Majors
                </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === 'overview' && (
                <div className="stats-content">
                    <div className="stats-grid">
                        {renderStatCard(
                            "Tests Totaux",
                            overview.totalTests,
                            "Depuis le début",
                            "📋",
                            "#007bff"
                        )}
                        {renderStatCard(
                            "Tests Terminés",
                            overview.completedTests,
                            `${overview.completionRate}% de taux de complétion`,
                            "✅",
                            "#28a745"
                        )}
                        {renderStatCard(
                            "Tests en Cours",
                            overview.inProgressTests,
                            "Actuellement",
                            "⏳",
                            "#ffc107"
                        )}
                        {renderStatCard(
                            "Tests Abandonnés",
                            overview.abandonedTests,
                            `${overview.abandonmentRate}% de taux d'abandon`,
                            "❌",
                            "#dc3545"
                        )}
                        {renderStatCard(
                            "Résultats Générés",
                            overview.totalResults,
                            "Avec recommandations",
                            "🎯",
                            "#6f42c1"
                        )}
                        {renderStatCard(
                            "Tests (30j)",
                            recentActivity.testsLast30Days,
                            "Derniers 30 jours",
                            "📅",
                            "#17a2b8"
                        )}
                    </div>

                    <div className="recent-activity">
                        <h3>📈 Activité Récente</h3>
                        <div className="activity-summary">
                            <div className="activity-item">
                                <span className="activity-label">Tests commencés (30j):</span>
                                <span className="activity-value">{recentActivity.testsLast30Days}</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-label">Tests terminés (30j):</span>
                                <span className="activity-value">{recentActivity.completedLast30Days}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'charts' && (
                <div className="stats-content">
                    {renderTimelineChart()}
                    {renderBarChart()}
                </div>
            )}

            {activeTab === 'majors' && (
                <div className="stats-content">
                    {renderPieChart()}
                    <div className="majors-list">
                        <h3>🏆 Top 5 Majors Recommandées</h3>
                        <div className="majors-grid">
                            {topMajors.map((major, index) => (
                                <div key={index} className="major-card">
                                    <div className="major-rank">#{index + 1}</div>
                                    <div className="major-name">{major.major}</div>
                                    <div className="major-count">{major.count} étudiants</div>
                                    <div className="major-percentage">{major.percentage}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="stats-footer">
                <small>Dernière mise à jour: {statistics.lastUpdated}</small>
            </div>
        </div>
    );
};

export default OrientationStatistics;
