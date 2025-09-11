import React, { useState, useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { 
    FaUsers, 
    FaGraduationCap, 
    FaFileAlt, 
    FaChartLine, 
    FaClock, 
    FaMoneyBillWave,
    FaBrain,
    FaComments,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf
} from 'react-icons/fa';
import './InteractiveStatistics.css';

const InteractiveStatistics = ({ statistics, loading }) => {
    const [selectedStat, setSelectedStat] = useState('applications');
    const [chartType, setChartType] = useState('bar');

    // Couleurs de la palette DirAvenir
    const colors = {
        primary: '#541652',
        secondary: '#DDC9DB',
        accent: '#FCBE1C',
        accent2: '#FF914C',
        white: '#FFFFFF'
    };

    // Données pour les différents types de statistiques
    const getStatData = () => {
        if (!statistics) return [];

        switch (selectedStat) {
            case 'applications':
                return getApplicationData();
            case 'programs':
                return getProgramData();
            case 'users':
                return getUserData();
            case 'tests':
                return getTestData();
            case 'chat':
                return getChatData();
            case 'financial':
                return getFinancialData();
            case 'temporal':
                return getTemporalData();
            default:
                return [];
        }
    };

    const getApplicationData = () => {
        const apps = statistics.applications || {};
        return [
            { name: 'Total', value: apps.total || 0, color: colors.primary },
            { name: 'Approuvées', value: apps.approved || 0, color: '#10B981' },
            { name: 'Rejetées', value: apps.rejected || 0, color: '#EF4444' },
            { name: 'En attente', value: apps.pending || 0, color: '#F59E0B' },
            { name: 'Ce mois', value: apps.thisMonth || 0, color: colors.accent },
            { name: 'Cette semaine', value: apps.thisWeek || 0, color: colors.accent2 }
        ];
    };

    const getProgramData = () => {
        const programs = statistics.programs || {};
        const byStatus = programs.byStatus || {};
        return [
            { name: 'Total', value: programs.total || 0, color: colors.primary },
            { name: 'Actifs', value: byStatus.ACTIVE || 0, color: '#10B981' },
            { name: 'Inactifs', value: byStatus.INACTIVE || 0, color: '#EF4444' },
            { name: 'En attente', value: byStatus.PENDING || 0, color: '#F59E0B' }
        ];
    };

    const getUserData = () => {
        const users = statistics.users || {};
        const byRole = users.byRole || {};
        return [
            { name: 'Total', value: users.total || 0, color: colors.primary },
            { name: 'Étudiants', value: byRole.ETUDIANT || 0, color: '#3B82F6' },
            { name: 'Admins', value: byRole.ADMIN || 0, color: '#8B5CF6' },
            { name: 'Actifs', value: users.active || 0, color: '#10B981' },
            { name: 'Nouveaux ce mois', value: users.newThisMonth || 0, color: colors.accent }
        ];
    };

    const getTestData = () => {
        const orientation = statistics.orientation || {};
        return [
            { name: 'Total tests', value: orientation.totalTests || 0, color: colors.primary },
            { name: 'Complétés', value: orientation.completedTests || 0, color: '#10B981' },
            { name: 'En cours', value: orientation.inProgressTests || 0, color: '#F59E0B' },
            { name: 'Abandonnés', value: orientation.abandonedTests || 0, color: '#EF4444' },
            { name: 'Taux completion', value: Math.round(orientation.completionRate || 0), color: colors.accent }
        ];
    };

    const getChatData = () => {
        const chat = statistics.chat || {};
        return [
            { name: 'Messages totaux', value: chat.totalMessages || 0, color: colors.primary },
            { name: 'Non lus', value: chat.unreadMessages || 0, color: '#EF4444' },
            { name: 'Conversations actives', value: chat.activeConversations || 0, color: '#10B981' },
            { name: 'Utilisateurs en ligne', value: chat.onlineUsers || 0, color: colors.accent }
        ];
    };

    const getFinancialData = () => {
        const financial = statistics.financial || {};
        return [
            { name: 'Applications payées', value: financial.paidApplications || 0, color: '#10B981' },
            { name: 'Paiements en attente', value: financial.pendingPayments || 0, color: '#F59E0B' },
            { name: 'Paiements échoués', value: financial.failedPayments || 0, color: '#EF4444' },
            { name: 'Taux conversion', value: Math.round(financial.conversionRate || 0), color: colors.accent }
        ];
    };

    const getTemporalData = () => {
        const temporal = statistics.temporal || {};
        const activityByHour = temporal.activityByHour || {};
        
        // Convertir les données par heure en format pour le graphique
        return Object.entries(activityByHour).map(([hour, count]) => ({
            name: hour,
            value: count,
            color: colors.primary
        }));
    };

    const getChartComponent = () => {
        const data = getStatData();
        
        if (chartType === 'pie') {
            return (
                <PieChart width={400} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            );
        }

        if (chartType === 'line') {
            return (
                <LineChart width={400} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={colors.primary} 
                        strokeWidth={3}
                        dot={{ fill: colors.accent, strokeWidth: 2, r: 6 }}
                    />
                </LineChart>
            );
        }

        if (chartType === 'area') {
            return (
                <AreaChart width={400} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={colors.primary} 
                        fill={colors.secondary}
                        strokeWidth={3}
                    />
                </AreaChart>
            );
        }

        // Bar chart par défaut
        return (
            <BarChart width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={colors.primary} />
            </BarChart>
        );
    };

    const getStatIcon = (stat) => {
        const icons = {
            applications: <FaFileAlt />,
            programs: <FaGraduationCap />,
            users: <FaUsers />,
            tests: <FaBrain />,
            chat: <FaComments />,
            financial: <FaMoneyBillWave />,
            temporal: <FaClock />
        };
        return icons[stat] || <FaChartLine />;
    };

    const getStatTitle = (stat) => {
        const titles = {
            applications: 'Applications',
            programs: 'Programmes',
            users: 'Utilisateurs',
            tests: 'Tests d\'Orientation',
            chat: 'Chat & Messages',
            financial: 'Statistiques Financières',
            temporal: 'Activité Temporelle'
        };
        return titles[stat] || 'Statistiques';
    };

    const getStatDescription = (stat) => {
        const descriptions = {
            applications: 'Gestion et suivi des candidatures étudiantes',
            programs: 'Programmes d\'études disponibles et leur statut',
            users: 'Utilisateurs inscrits et leur activité',
            tests: 'Tests d\'orientation et taux de completion',
            chat: 'Messages et conversations en temps réel',
            financial: 'Paiements et revenus de la plateforme',
            temporal: 'Activité par heure, jour et mois'
        };
        return descriptions[stat] || 'Statistiques générales';
    };

    if (loading) {
        return (
            <div className="interactive-stats-container">
                <div className="stats-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement des statistiques...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="interactive-stats-container">
            {/* En-tête avec titre et description */}
            <div className="stats-header">
                <div className="stats-title">
                    <div className="stats-icon">
                        {getStatIcon(selectedStat)}
                    </div>
                    <div>
                        <h2>{getStatTitle(selectedStat)}</h2>
                        <p>{getStatDescription(selectedStat)}</p>
                    </div>
                </div>
            </div>

            {/* Boutons de sélection des statistiques */}
            <div className="stats-selector">
                <div className="stat-buttons">
                    {[
                        { key: 'applications', label: 'Applications', icon: <FaFileAlt /> },
                        { key: 'programs', label: 'Programmes', icon: <FaGraduationCap /> },
                        { key: 'users', label: 'Utilisateurs', icon: <FaUsers /> },
                        { key: 'tests', label: 'Tests', icon: <FaBrain /> },
                        { key: 'chat', label: 'Chat', icon: <FaComments /> },
                        { key: 'financial', label: 'Financier', icon: <FaMoneyBillWave /> },
                        { key: 'temporal', label: 'Temporel', icon: <FaClock /> }
                    ].map((stat) => (
                        <button
                            key={stat.key}
                            className={`stat-button ${selectedStat === stat.key ? 'active' : ''}`}
                            onClick={() => setSelectedStat(stat.key)}
                        >
                            <span className="stat-button-icon">{stat.icon}</span>
                            <span className="stat-button-label">{stat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sélecteur de type de graphique */}
            <div className="chart-type-selector">
                <div className="chart-type-buttons">
                    {[
                        { key: 'bar', label: 'Barres', icon: '📊' },
                        { key: 'line', label: 'Ligne', icon: '📈' },
                        { key: 'pie', label: 'Camembert', icon: '🥧' },
                        { key: 'area', label: 'Aire', icon: '📉' }
                    ].map((type) => (
                        <button
                            key={type.key}
                            className={`chart-type-button ${chartType === type.key ? 'active' : ''}`}
                            onClick={() => setChartType(type.key)}
                        >
                            <span className="chart-type-icon">{type.icon}</span>
                            <span className="chart-type-label">{type.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Zone du graphique */}
            <div className="chart-container">
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={400}>
                        {getChartComponent()}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Statistiques détaillées */}
            <div className="stats-details">
                <div className="stats-grid">
                    {getStatData().map((item, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-card-icon" style={{ backgroundColor: item.color }}>
                                {getStatIcon(selectedStat)}
                            </div>
                            <div className="stat-card-content">
                                <h3>{item.name}</h3>
                                <p className="stat-value">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Informations supplémentaires selon le type de statistique */}
            {selectedStat === 'applications' && (
                <div className="additional-info">
                    <h3>📋 Détails des Applications</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <FaCheckCircle className="info-icon success" />
                            <span>Applications approuvées: {statistics.applications?.approved || 0}</span>
                        </div>
                        <div className="info-item">
                            <FaTimesCircle className="info-icon error" />
                            <span>Applications rejetées: {statistics.applications?.rejected || 0}</span>
                        </div>
                        <div className="info-item">
                            <FaHourglassHalf className="info-icon warning" />
                            <span>En attente: {statistics.applications?.pending || 0}</span>
                        </div>
                    </div>
                </div>
            )}

            {selectedStat === 'tests' && (
                <div className="additional-info">
                    <h3>🧠 Détails des Tests d'Orientation</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <FaCheckCircle className="info-icon success" />
                            <span>Tests complétés: {statistics.orientation?.completedTests || 0}</span>
                        </div>
                        <div className="info-item">
                            <FaClock className="info-icon warning" />
                            <span>En cours: {statistics.orientation?.inProgressTests || 0}</span>
                        </div>
                        <div className="info-item">
                            <FaTimesCircle className="info-icon error" />
                            <span>Abandonnés: {statistics.orientation?.abandonedTests || 0}</span>
                        </div>
                        <div className="info-item">
                            <FaChartLine className="info-icon primary" />
                            <span>Taux de completion: {Math.round(statistics.orientation?.completionRate || 0)}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveStatistics;
