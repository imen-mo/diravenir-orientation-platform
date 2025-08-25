import React, { useState, useEffect } from 'react';
import connectivityService from '../services/connectivityService';
import oauth2Service from '../services/oauth2Service';
import apiClient from '../config/api.js';
import '../styles/FlowTestSuite.css';

const FlowTestSuite = () => {
    const [testResults, setTestResults] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [currentTest, setCurrentTest] = useState('');
    const [overallStatus, setOverallStatus] = useState('pending');

    // Définition des tests de flux
    const flowTests = [
        {
            id: 'connectivity',
            name: 'Test de Connectivité',
            description: 'Vérifie la connectivité réseau et backend',
            test: async () => {
                const status = connectivityService.getConnectionStatus();
                return {
                    success: status.isConnected,
                    details: status,
                    message: status.isConnected ? 'Connectivité OK' : 'Connectivité échouée'
                };
            }
        },
        {
            id: 'health',
            name: 'Test Endpoint Santé',
            description: 'Teste l\'endpoint de santé du backend',
            test: async () => {
                try {
                    const response = await apiClient.get('/health');
                    return {
                        success: true,
                        details: response,
                        message: 'Endpoint de santé accessible'
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: error,
                        message: `Erreur endpoint santé: ${error.message}`
                    };
                }
            }
        },
        {
            id: 'oauth2_status',
            name: 'Test Statut OAuth2',
            description: 'Vérifie le statut du service OAuth2',
            test: async () => {
                try {
                    const response = await oauth2Service.checkOAuth2Status();
                    return {
                        success: true,
                        details: response,
                        message: 'Service OAuth2 opérationnel'
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: error,
                        message: `Erreur service OAuth2: ${error.message}`
                    };
                }
            }
        },
        {
            id: 'oauth2_login_url',
            name: 'Test URL Connexion OAuth2',
            description: 'Récupère l\'URL de connexion Google',
            test: async () => {
                try {
                    const response = await oauth2Service.getGoogleLoginUrl();
                    return {
                        success: true,
                        details: response,
                        message: 'URL de connexion OAuth2 récupérée'
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: error,
                        message: `Erreur URL OAuth2: ${error.message}`
                    };
                }
            }
        },
        {
            id: 'auth_endpoints',
            name: 'Test Endpoints Authentification',
            description: 'Teste les endpoints d\'authentification',
            test: async () => {
                const endpoints = [
                    { path: '/auth/login', method: 'POST', data: { email: 'test@test.com', password: 'test' } },
                    { path: '/auth/register', method: 'POST', data: { email: 'test@test.com', password: 'test', nom: 'Test', prenom: 'User' } }
                ];
                
                const results = [];
                
                for (const endpoint of endpoints) {
                    try {
                        let response;
                        if (endpoint.method === 'POST') {
                            response = await apiClient.post(endpoint.path, endpoint.data);
                        } else {
                            response = await apiClient.get(endpoint.path);
                        }
                        
                        results.push({
                            endpoint: endpoint.path,
                            method: endpoint.method,
                            success: true,
                            response: response
                        });
                    } catch (error) {
                        results.push({
                            endpoint: endpoint.path,
                            method: endpoint.method,
                            success: false,
                            error: error.message
                        });
                    }
                }
                
                const successCount = results.filter(r => r.success).length;
                const totalCount = results.length;
                
                return {
                    success: successCount > 0,
                    details: results,
                    message: `${successCount}/${totalCount} endpoints d'authentification accessibles`
                };
            }
        },
        {
            id: 'orientation_endpoints',
            name: 'Test Endpoints Orientation',
            description: 'Teste les endpoints d\'orientation',
            test: async () => {
                const endpoints = [
                    { path: '/orientation/majors', method: 'GET' },
                    { path: '/orientation/ideal-profiles', method: 'GET' }
                ];
                
                const results = [];
                
                for (const endpoint of endpoints) {
                    try {
                        const response = await apiClient.get(endpoint.path);
                        results.push({
                            endpoint: endpoint.path,
                            success: true,
                            response: response
                        });
                    } catch (error) {
                        results.push({
                            endpoint: endpoint.path,
                            success: false,
                            error: error.message
                        });
                    }
                }
                
                const successCount = results.filter(r => r.success).length;
                const totalCount = results.length;
                
                return {
                    success: successCount > 0,
                    details: results,
                    message: `${successCount}/${totalCount} endpoints d'orientation accessibles`
                };
            }
        },
        {
            id: 'programs_endpoints',
            name: 'Test Endpoints Programmes',
            description: 'Teste les endpoints de programmes',
            test: async () => {
                try {
                    const response = await apiClient.get('/programs');
                    return {
                        success: true,
                        details: response,
                        message: 'Endpoint programmes accessible'
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: error,
                        message: `Erreur endpoint programmes: ${error.message}`
                    };
                }
            }
        },
        {
            id: 'cors_test',
            name: 'Test Configuration CORS',
            description: 'Vérifie la configuration CORS',
            test: async () => {
                try {
                    // Test avec credentials
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/health`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    return {
                        success: response.ok,
                        details: {
                            status: response.status,
                            statusText: response.statusText,
                            headers: Object.fromEntries(response.headers.entries())
                        },
                        message: response.ok ? 'Configuration CORS OK' : 'Problème CORS détecté'
                    };
                } catch (error) {
                    return {
                        success: false,
                        details: error,
                        message: `Erreur CORS: ${error.message}`
                    };
                }
            }
        }
    ];

    /**
     * Exécute tous les tests de flux
     */
    const runAllTests = async () => {
        setIsRunning(true);
        setTestResults({});
        setOverallStatus('running');
        
        const results = {};
        let successCount = 0;
        let totalCount = flowTests.length;
        
        for (const test of flowTests) {
            setCurrentTest(test.name);
            console.log(`🧪 Exécution du test: ${test.name}`);
            
            try {
                const result = await test.test();
                results[test.id] = {
                    ...result,
                    timestamp: Date.now(),
                    testName: test.name
                };
                
                if (result.success) {
                    successCount++;
                }
                
                console.log(`✅ Test ${test.name} terminé:`, result.success ? 'SUCCÈS' : 'ÉCHEC');
                
            } catch (error) {
                results[test.id] = {
                    success: false,
                    error: error.message,
                    timestamp: Date.now(),
                    testName: test.name
                };
                console.error(`❌ Erreur dans le test ${test.name}:`, error);
            }
            
            // Pause entre les tests
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        setTestResults(results);
        setCurrentTest('');
        setIsRunning(false);
        
        // Déterminer le statut global
        if (successCount === totalCount) {
            setOverallStatus('success');
        } else if (successCount > 0) {
            setOverallStatus('partial');
        } else {
            setOverallStatus('failed');
        }
        
        console.log(`📊 Tests terminés: ${successCount}/${totalCount} succès`);
    };

    /**
     * Exécute un test spécifique
     */
    const runSingleTest = async (testId) => {
        const test = flowTests.find(t => t.id === testId);
        if (!test) return;
        
        setCurrentTest(test.name);
        
        try {
            const result = await test.test();
            setTestResults(prev => ({
                ...prev,
                [testId]: {
                    ...result,
                    timestamp: Date.now(),
                    testName: test.name
                }
            }));
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                [testId]: {
                    success: false,
                    error: error.message,
                    timestamp: Date.now(),
                    testName: test.name
                }
            }));
        }
        
        setCurrentTest('');
    };

    /**
     * Obtient l'icône de statut global
     */
    const getOverallStatusIcon = () => {
        switch (overallStatus) {
            case 'success':
                return '✅';
            case 'partial':
                return '⚠️';
            case 'failed':
                return '❌';
            case 'running':
                return '🔄';
            default:
                return '⏳';
        }
    };

    /**
     * Obtient la classe CSS de statut global
     */
    const getOverallStatusClass = () => {
        switch (overallStatus) {
            case 'success':
                return 'status-success';
            case 'partial':
                return 'status-partial';
            case 'failed':
                return 'status-failed';
            case 'running':
                return 'status-running';
            default:
                return 'status-pending';
        }
    };

    /**
     * Formate le timestamp
     */
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleTimeString();
    };

    return (
        <div className="flow-test-suite">
            <div className="suite-header">
                <h2>🧪 Suite de Tests de Flux Backend-Frontend</h2>
                <div className="suite-controls">
                    <button 
                        onClick={runAllTests}
                        disabled={isRunning}
                        className="suite-button primary"
                    >
                        {isRunning ? '🔄 Tests en cours...' : '🚀 Lancer Tous les Tests'}
                    </button>
                    <button 
                        onClick={() => setTestResults({})}
                        className="suite-button secondary"
                    >
                        🧹 Effacer Résultats
                    </button>
                </div>
            </div>

            {/* Statut global */}
            <div className={`overall-status ${getOverallStatusClass()}`}>
                <div className="status-header">
                    <span className="status-icon">{getOverallStatusIcon()}</span>
                    <div className="status-info">
                        <h3>Statut Global des Tests</h3>
                        <p>
                            {overallStatus === 'success' && 'Tous les tests sont passés avec succès !'}
                            {overallStatus === 'partial' && 'Certains tests ont échoué, vérifiez les détails.'}
                            {overallStatus === 'failed' && 'Tous les tests ont échoué, problème critique détecté.'}
                            {overallStatus === 'running' && 'Tests en cours d\'exécution...'}
                            {overallStatus === 'pending' && 'Aucun test n\'a encore été exécuté.'}
                        </p>
                    </div>
                </div>
                
                {Object.keys(testResults).length > 0 && (
                    <div className="status-summary">
                        <div className="summary-item">
                            <strong>Tests exécutés:</strong> {Object.keys(testResults).length}/{flowTests.length}
                        </div>
                        <div className="summary-item">
                            <strong>Succès:</strong> {Object.values(testResults).filter(r => r.success).length}
                        </div>
                        <div className="summary-item">
                            <strong>Échecs:</strong> {Object.values(testResults).filter(r => !r.success).length}
                        </div>
                    </div>
                )}
            </div>

            {/* Tests individuels */}
            <div className="tests-grid">
                {flowTests.map((test) => {
                    const result = testResults[test.id];
                    const isRunning = currentTest === test.name;
                    
                    return (
                        <div key={test.id} className={`test-card ${result ? (result.success ? 'success' : 'failure') : ''}`}>
                            <div className="test-header">
                                <h4>{test.name}</h4>
                                <div className="test-status">
                                    {isRunning && <span className="running">🔄</span>}
                                    {result && (result.success ? '✅' : '❌')}
                                    {!result && !isRunning && '⏳'}
                                </div>
                            </div>
                            
                            <p className="test-description">{test.description}</p>
                            
                            {result && (
                                <div className="test-result">
                                    <div className="result-message">
                                        <strong>Résultat:</strong> {result.message}
                                    </div>
                                    <div className="result-timestamp">
                                        <strong>Exécuté:</strong> {formatTimestamp(result.timestamp)}
                                    </div>
                                </div>
                            )}
                            
                            <div className="test-actions">
                                <button 
                                    onClick={() => runSingleTest(test.id)}
                                    disabled={isRunning}
                                    className="test-button"
                                >
                                    {isRunning ? '🔄 Test...' : '🧪 Tester'}
                                </button>
                                
                                {result && (
                                    <button 
                                        onClick={() => console.log('Détails du test:', result)}
                                        className="test-button secondary"
                                    >
                                        📋 Détails
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Résultats détaillés */}
            {Object.keys(testResults).length > 0 && (
                <div className="detailed-results">
                    <h3>📊 Résultats Détaillés</h3>
                    <div className="results-table">
                        {Object.entries(testResults).map(([testId, result]) => (
                            <div key={testId} className={`result-row ${result.success ? 'success' : 'failure'}`}>
                                <div className="result-test">{result.testName}</div>
                                <div className="result-status">
                                    {result.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}
                                </div>
                                <div className="result-message">{result.message}</div>
                                <div className="result-time">{formatTimestamp(result.timestamp)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlowTestSuite;
