import React, { useState, useEffect } from 'react';
import connectivityService from '../services/connectivityService';
import '../styles/ConnectivityMonitor.css';

const ConnectivityMonitor = () => {
    const [connectionStatus, setConnectionStatus] = useState({
        isOnline: navigator.onLine,
        isConnected: false,
        status: 'disconnected',
        lastPing: null,
        retryAttempts: 0
    });
    
    const [endpointTests, setEndpointTests] = useState([]);
    const [isTesting, setIsTesting] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Ajouter un listener pour les changements de connectivité
        const connectionListener = (status) => {
            setConnectionStatus(prev => ({
                ...prev,
                ...status
            }));
        };

        connectivityService.addConnectionListener(connectionListener);

        // Nettoyer le listener au démontage
        return () => {
            connectivityService.removeConnectionListener(connectionListener);
        };
    }, []);

    /**
     * Teste tous les endpoints critiques
     */
    const runEndpointTests = async () => {
        setIsTesting(true);
        setEndpointTests([]);
        
        try {
            const results = await connectivityService.testAllCriticalEndpoints();
            setEndpointTests(results.results);
        } catch (error) {
            console.error('Erreur lors des tests d\'endpoints:', error);
        } finally {
            setIsTesting(false);
        }
    };

    /**
     * Force une vérification de connectivité
     */
    const forceConnectivityCheck = () => {
        connectivityService.forceConnectivityCheck();
    };

    /**
     * Obtient l'icône de statut
     */
    const getStatusIcon = (status) => {
        switch (status) {
            case 'connected':
                return '✅';
            case 'retrying':
                return '🔄';
            case 'failed':
                return '❌';
            case 'disconnected':
                return '🔌';
            default:
                return '❓';
        }
    };

    /**
     * Obtient la classe CSS de statut
     */
    const getStatusClass = (status) => {
        switch (status) {
            case 'connected':
                return 'status-connected';
            case 'retrying':
                return 'status-retrying';
            case 'failed':
                return 'status-failed';
            case 'disconnected':
                return 'status-disconnected';
            default:
                return 'status-unknown';
        }
    };

    /**
     * Obtient le texte de statut
     */
    const getStatusText = (status) => {
        switch (status) {
            case 'connected':
                return 'CONNECTÉ';
            case 'retrying':
                return 'RECONNEXION...';
            case 'failed':
                return 'ÉCHEC';
            case 'disconnected':
                return 'DÉCONNECTÉ';
            default:
                return 'INCONNU';
        }
    };

    /**
     * Formate le temps écoulé depuis le dernier ping
     */
    const formatTimeSinceLastPing = () => {
        if (!connectionStatus.lastPing) return 'Jamais';
        
        const now = Date.now();
        const diff = now - connectionStatus.lastPing;
        const seconds = Math.floor(diff / 1000);
        
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        return `${Math.floor(seconds / 3600)}h`;
    };

    return (
        <div className="connectivity-monitor">
            <div className="monitor-header">
                <h3>🔌 Surveillance de Connectivité</h3>
                <div className="monitor-controls">
                    <button 
                        onClick={forceConnectivityCheck}
                        className="monitor-button"
                        disabled={isTesting}
                    >
                        🔄 Vérifier
                    </button>
                    <button 
                        onClick={runEndpointTests}
                        className="monitor-button"
                        disabled={isTesting}
                    >
                        {isTesting ? '🧪 Tests...' : '🧪 Tester Endpoints'}
                    </button>
                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className="monitor-button"
                    >
                        {showDetails ? '📋 Masquer' : '📋 Détails'}
                    </button>
                </div>
            </div>

            {/* Statut de connectivité principal */}
            <div className="connection-status-main">
                <div className="status-indicator">
                    <span className={`status-icon ${getStatusClass(connectionStatus.status)}`}>
                        {getStatusIcon(connectionStatus.status)}
                    </span>
                    <div className="status-info">
                        <div className="status-text">
                            {getStatusText(connectionStatus.status)}
                        </div>
                        <div className="status-details">
                            {connectionStatus.isOnline ? '🌐 En ligne' : '🌐 Hors ligne'}
                            {connectionStatus.lastPing && (
                                <span> • Dernier ping: {formatTimeSinceLastPing()}</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {connectionStatus.status === 'retrying' && (
                    <div className="retry-info">
                        Tentative {connectionStatus.retryAttempts}/5...
                    </div>
                )}
            </div>

            {/* Détails de connectivité */}
            {showDetails && (
                <div className="connection-details">
                    <div className="detail-section">
                        <h4>📊 Statistiques de Connectivité</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <strong>Statut:</strong> {connectionStatus.status}
                            </div>
                            <div className="detail-item">
                                <strong>Réseau:</strong> {connectionStatus.isOnline ? 'En ligne' : 'Hors ligne'}
                            </div>
                            <div className="detail-item">
                                <strong>Backend:</strong> {connectionStatus.isConnected ? 'Connecté' : 'Déconnecté'}
                            </div>
                            <div className="detail-item">
                                <strong>Dernier ping:</strong> {formatTimeSinceLastPing()}
                            </div>
                            <div className="detail-item">
                                <strong>Tentatives:</strong> {connectionStatus.retryAttempts}/5
                            </div>
                        </div>
                    </div>

                    {/* Tests d'endpoints */}
                    {endpointTests.length > 0 && (
                        <div className="detail-section">
                            <h4>🧪 Tests d'Endpoints</h4>
                            <div className="endpoint-tests">
                                {endpointTests.map((test, index) => (
                                    <div key={index} className={`endpoint-test ${test.success ? 'success' : 'failure'}`}>
                                        <div className="test-header">
                                            <span className="test-method">{test.method}</span>
                                            <span className="test-path">{test.endpoint}</span>
                                            <span className="test-status">
                                                {test.success ? '✅' : '❌'}
                                            </span>
                                        </div>
                                        {test.success ? (
                                            <div className="test-success">
                                                <span>Temps de réponse: {test.responseTime?.toFixed(2)}ms</span>
                                            </div>
                                        ) : (
                                            <div className="test-failure">
                                                <span>Erreur: {test.error}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions de diagnostic */}
                    <div className="detail-section">
                        <h4>🔧 Actions de Diagnostic</h4>
                        <div className="diagnostic-actions">
                            <button 
                                onClick={() => window.open('http://localhost:8084/api/health', '_blank')}
                                className="diagnostic-button"
                            >
                                🌐 Tester Backend Directement
                            </button>
                            <button 
                                onClick={() => console.log('Statut de connectivité:', connectivityService.getConnectionStatus())}
                                className="diagnostic-button"
                            >
                                📋 Logs Console
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Indicateur de statut en temps réel */}
            <div className="realtime-indicator">
                <div className={`indicator-dot ${getStatusClass(connectionStatus.status)}`}></div>
                <span>Surveillance en temps réel</span>
            </div>
        </div>
    );
};

export default ConnectivityMonitor;
