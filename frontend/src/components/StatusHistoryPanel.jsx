import React, { useState, useEffect } from 'react';
import './StatusHistoryPanel.css';

const StatusHistoryPanel = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // ===== CHARGEMENT DE L'HISTORIQUE =====
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/history?period=${selectedPeriod}`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            } else {
                console.warn('⚠️ Erreur API:', response.status, response.statusText);
                // Données de test en mode développement
                if (process.env.NODE_ENV === 'development') {
                    setHistory([
                        {
                            id: 1,
                            type: 'STATUS_CHANGE',
                            applicationId: 'APP001',
                            oldStatus: 'DRAFT',
                            newStatus: 'SUBMITTED',
                            adminName: 'Admin User',
                            timestamp: new Date().toISOString(),
                            notes: 'Candidature soumise par l\'étudiant'
                        },
                        {
                            id: 2,
                            type: 'USER_CREATED',
                            userId: 'USR001',
                            adminName: 'Admin User',
                            timestamp: new Date(Date.now() - 3600000).toISOString(),
                            notes: 'Nouvel utilisateur créé'
                        },
                        {
                            id: 3,
                            type: 'PROGRAM_UPDATED',
                            programId: 'PROG001',
                            adminName: 'Admin User',
                            timestamp: new Date(Date.now() - 7200000).toISOString(),
                            notes: 'Programme mis à jour'
                        }
                    ]);
                }
            }
        } catch (error) {
            console.error('❌ Erreur lors de la récupération de l\'historique:', error);
            // Données de test en cas d'erreur
            if (process.env.NODE_ENV === 'development') {
                setHistory([
                    {
                        id: 1,
                        type: 'ERROR',
                        applicationId: 'APP001',
                        oldStatus: 'ERROR',
                        newStatus: 'ERROR',
                        adminName: 'System',
                        timestamp: new Date().toISOString(),
                        notes: 'Erreur API - Données de test'
                    }
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [selectedPeriod]);

    // ===== FILTRAGE ET RECHERCHE =====
    const filteredHistory = history.filter(item => {
        const matchesType = filterType === 'ALL' || item.type === filterType;
        const matchesSearch = 
            item.applicationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.notes?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesType && matchesSearch;
    });

    // ===== RENDU DES TYPES D'ACTIVITÉ =====
    const renderActivityType = (type) => {
        const typeConfig = {
            'STATUS_CHANGE': { label: '🔄 Changement de statut', color: '#007bff', bgColor: '#e3f2fd' },
            'USER_CREATED': { label: '👤 Utilisateur créé', color: '#28a745', bgColor: '#e8f5e8' },
            'USER_UPDATED': { label: '✏️ Utilisateur modifié', color: '#ffc107', bgColor: '#fff8e1' },
            'USER_DELETED': { label: '🗑️ Utilisateur supprimé', color: '#dc3545', bgColor: '#ffebee' },
            'PROGRAM_CREATED': { label: '🎓 Programme créé', color: '#28a745', bgColor: '#e8f5e8' },
            'PROGRAM_UPDATED': { label: '✏️ Programme modifié', color: '#ffc107', bgColor: '#fff8e1' },
            'PROGRAM_DELETED': { label: '🗑️ Programme supprimé', color: '#dc3545', bgColor: '#ffebee' },
            'ERROR': { label: '❌ Erreur', color: '#dc3545', bgColor: '#ffebee' }
        };

        const config = typeConfig[type] || { label: type, color: '#6c757d', bgColor: '#f8f9fa' };

        return (
                <span 
                className="activity-type-badge"
                style={{ 
                    color: config.color, 
                    backgroundColor: config.bgColor,
                    border: `1px solid ${config.color}`
                }}
            >
                {config.label}
                </span>
        );
    };

    // ===== RENDU DES STATUTS =====
    const renderStatus = (status) => {
        const statusConfig = {
            'DRAFT': { label: '📝 Brouillon', color: '#6c757d', bgColor: '#f8f9fa' },
            'IN_PROGRESS': { label: '🔄 En cours', color: '#007bff', bgColor: '#e3f2fd' },
            'SUBMITTED': { label: '📤 Soumise', color: '#28a745', bgColor: '#e8f5e8' },
            'UNDER_REVIEW': { label: '🔍 En révision', color: '#ffc107', bgColor: '#fff8e1' },
            'APPROVED': { label: '✅ Approuvée', color: '#28a745', bgColor: '#e8f5e8' },
            'REJECTED': { label: '❌ Rejetée', color: '#dc3545', bgColor: '#ffebee' },
            'COMPLETED': { label: '🎉 Terminée', color: '#6f42c1', bgColor: '#f3e5f5' },
            'ERROR': { label: '❌ Erreur', color: '#dc3545', bgColor: '#ffebee' }
        };

        const config = statusConfig[status] || { label: status, color: '#6c757d', bgColor: '#f8f9fa' };
        
        return (
            <span 
                className="status-badge"
                style={{ 
                    color: config.color, 
                    backgroundColor: config.bgColor,
                    border: `1px solid ${config.color}`
                }}
            >
                {config.label}
            </span>
        );
    };

    // ===== FORMATAGE DE LA DATE =====
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'À l\'instant';
        } else if (diffInHours < 24) {
            return `Il y a ${Math.floor(diffInHours)}h`;
        } else if (diffInHours < 168) {
            return `Il y a ${Math.floor(diffInHours / 24)}j`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    if (loading && history.length === 0) {
        return (
            <div className="status-history-panel">
            <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Chargement de l'historique...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="status-history-panel">
            {/* Header */}
            <div className="history-header">
                <div className="header-content">
                    <h2>🕒 Historique des Actions</h2>
                    <p>Suivi des modifications et actions administrateur</p>
                </div>
                <div className="header-actions">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="period-select"
                    >
                        <option value="day">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="quarter">Ce trimestre</option>
                        <option value="year">Cette année</option>
                    </select>
                    <button 
                        className="btn-refresh"
                        onClick={fetchHistory}
                        disabled={loading}
                    >
                        {loading ? '🔄' : '🔄'} Actualiser
                    </button>
                </div>
            </div>

            {/* Filtres */}
            <div className="filters-section">
                <div className="filter-group">
                    <select 
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">Toutes les actions</option>
                        <option value="STATUS_CHANGE">Changements de statut</option>
                        <option value="USER_CREATED">Créations d'utilisateurs</option>
                        <option value="USER_UPDATED">Modifications d'utilisateurs</option>
                        <option value="USER_DELETED">Suppressions d'utilisateurs</option>
                        <option value="PROGRAM_CREATED">Créations de programmes</option>
                        <option value="PROGRAM_UPDATED">Modifications de programmes</option>
                        <option value="PROGRAM_DELETED">Suppressions de programmes</option>
                    </select>
                </div>

                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Rechercher par ID, admin ou notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Liste de l'historique */}
            <div className="history-list">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                        <div key={item.id} className="history-item">
                            <div className="history-icon">
                                {item.type === 'STATUS_CHANGE' && '🔄'}
                                {item.type === 'USER_CREATED' && '👤'}
                                {item.type === 'USER_UPDATED' && '✏️'}
                                {item.type === 'USER_DELETED' && '🗑️'}
                                {item.type === 'PROGRAM_CREATED' && '🎓'}
                                {item.type === 'PROGRAM_UPDATED' && '✏️'}
                                {item.type === 'PROGRAM_DELETED' && '🗑️'}
                                {item.type === 'ERROR' && '❌'}
                                </div>
                                
                                <div className="history-content">
                                <div className="history-header-row">
                                    <div className="history-type">
                                        {renderActivityType(item.type)}
                                    </div>
                                    <div className="history-time">
                                        {formatTimestamp(item.timestamp)}
                                    </div>
                                    </div>
                                    
                                    <div className="history-details">
                                    {item.type === 'STATUS_CHANGE' && (
                                        <div className="status-change">
                                            <span className="status-label">Statut:</span>
                                            <span className="status-old">{renderStatus(item.oldStatus)}</span>
                                            <span className="status-arrow">→</span>
                                            <span className="status-new">{renderStatus(item.newStatus)}</span>
                                        </div>
                                    )}
                                    
                                    {item.applicationId && (
                                        <div className="history-id">
                                            <span className="id-label">Application:</span>
                                            <span className="id-value">{item.applicationId}</span>
                                        </div>
                                    )}
                                    
                                    {item.userId && (
                                        <div className="history-id">
                                            <span className="id-label">Utilisateur:</span>
                                            <span className="id-value">{item.userId}</span>
                                        </div>
                                    )}
                                        
                                    {item.programId && (
                                        <div className="history-id">
                                            <span className="id-label">Programme:</span>
                                            <span className="id-value">{item.programId}</span>
                                    </div>
                                    )}
                                    
                                    <div className="history-admin">
                                        <span className="admin-label">Par:</span>
                                        <span className="admin-name">{item.adminName}</span>
                                </div>
                                
                                    {item.notes && (
                                        <div className="history-notes">
                                            <span className="notes-label">Notes:</span>
                                            <span className="notes-text">{item.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                    </div>
                    ))
                ) : (
                    <div className="no-history">
                        <h3>📭 Aucun historique trouvé</h3>
                        <p>
                            {searchTerm || filterType !== 'ALL' 
                                ? 'Essayez de modifier vos critères de recherche ou de filtrage.'
                                : 'Aucune action n\'a encore été effectuée.'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Statistiques de l'historique */}
            {filteredHistory.length > 0 && (
                <div className="history-stats">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <span className="stat-number">{filteredHistory.length}</span>
                                <span className="stat-label">Actions totales</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">👤</div>
                            <div className="stat-content">
                                <span className="stat-number">
                                    {filteredHistory.filter(item => item.type.includes('USER')).length}
                                </span>
                                <span className="stat-label">Actions utilisateurs</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🎓</div>
                            <div className="stat-content">
                                <span className="stat-number">
                                    {filteredHistory.filter(item => item.type.includes('PROGRAM')).length}
                                </span>
                                <span className="stat-label">Actions programmes</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">🔄</div>
                            <div className="stat-content">
                                <span className="stat-number">
                                    {filteredHistory.filter(item => item.type === 'STATUS_CHANGE').length}
                                </span>
                                <span className="stat-label">Changements de statut</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusHistoryPanel;
