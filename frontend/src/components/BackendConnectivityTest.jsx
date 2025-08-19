import React, { useState, useEffect } from 'react';
import './BackendConnectivityTest.css';

const BackendConnectivityTest = () => {
    const [backendStatus, setBackendStatus] = useState('checking');
    const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

    const runConnectivityTest = async () => {
    setIsRunning(true);
        setTestResults([]);
        
        const tests = [
            {
                name: 'Test de connexion basique',
                test: async () => {
                    try {
                        const response = await fetch('http://localhost:8084/api/health', {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        });
                        return response.ok ? '✅ Connecté' : `❌ Erreur ${response.status}`;
    } catch (error) {
                        return `❌ Erreur: ${error.message}`;
                    }
                }
            },
            {
                name: 'Test endpoint auth/signup',
                test: async () => {
                    try {
                        const response = await fetch('http://localhost:8084/api/auth/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nom: 'Test',
                                prenom: 'User',
                                email: 'test@example.com',
                                motDePasse: 'Test123!',
                                confirmationMotDePasse: 'Test123!'
                            })
                        });
                        
                        if (response.status === 400) {
                            return '✅ Endpoint accessible (erreur 400 attendue pour email existant)';
                        } else if (response.status === 500) {
                            const data = await response.text();
                            return `⚠️ Endpoint accessible mais erreur 500: ${data.substring(0, 100)}...`;
      } else {
                            return `✅ Endpoint accessible (status: ${response.status})`;
      }
    } catch (error) {
                        return `❌ Erreur: ${error.message}`;
                    }
                }
            },
            {
                name: 'Test de la base de données',
                test: async () => {
                    try {
                        const response = await fetch('http://localhost:8084/api/filieres', {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        });
                        return response.ok ? '✅ Base de données accessible' : `❌ Erreur ${response.status}`;
    } catch (error) {
                        return `❌ Erreur: ${error.message}`;
                    }
                }
            }
        ];

        const results = [];
        for (const test of tests) {
            const result = await test.test();
            results.push({ name: test.name, result });
            setTestResults([...results]);
            await new Promise(resolve => setTimeout(resolve, 500)); // Délai pour l'animation
        }

        // Déterminer le statut global
        const allPassed = results.every(r => r.result.includes('✅'));
        const hasWarnings = results.some(r => r.result.includes('⚠️'));
        
        if (allPassed) {
            setBackendStatus('connected');
        } else if (hasWarnings) {
            setBackendStatus('warning');
      } else {
            setBackendStatus('disconnected');
        }
        
        setIsRunning(false);
    };

    useEffect(() => {
        runConnectivityTest();
    }, []);

    const getStatusColor = () => {
        switch (backendStatus) {
      case 'connected': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'disconnected': return '#ef4444';
      default: return '#6b7280';
    }
  };

    const getStatusText = () => {
        switch (backendStatus) {
            case 'connected': return 'Connecté';
            case 'warning': return 'Attention';
            case 'disconnected': return 'Déconnecté';
            default: return 'Vérification...';
        }
    };

  return (
        <div className="backend-test-container">
      <div className="test-header">
                <h3>🔌 Test de Connectivité Backend</h3>
                <div className="status-indicator" style={{ backgroundColor: getStatusColor() }}>
                    {getStatusText()}
          </div>
        </div>

            <div className="test-controls">
        <button 
                    onClick={runConnectivityTest} 
          disabled={isRunning}
          className="test-button"
        >
                    {isRunning ? '🔄 Test en cours...' : '🔄 Relancer les tests'}
        </button>
      </div>

            <div className="test-results">
                {testResults.map((test, index) => (
                    <div key={index} className="test-result">
                        <span className="test-name">{test.name}</span>
                        <span className="test-status">{test.result}</span>
          </div>
                ))}
      </div>

            <div className="test-info">
                <h4>📋 Informations de diagnostic :</h4>
                <ul>
                    <li><strong>Backend URL:</strong> http://localhost:8084</li>
                    <li><strong>Frontend URL:</strong> http://localhost:3000</li>
                    <li><strong>Base de données:</strong> MySQL sur localhost:3306</li>
                </ul>
                
                <h4>🚨 Solutions courantes :</h4>
                <ul>
                    <li>Vérifiez que le serveur Spring Boot est démarré</li>
                    <li>Vérifiez que MySQL est en cours d'exécution</li>
                    <li>Vérifiez les ports 8084 et 3306</li>
                    <li>Vérifiez la configuration dans application.properties</li>
          </ul>
        </div>
    </div>
  );
};

export default BackendConnectivityTest;
