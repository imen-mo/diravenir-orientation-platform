import React, { useState, useEffect } from 'react';
import './BackendConnectivityTest.css';

const BackendConnectivityTest = () => {
  const [backendStatus, setBackendStatus] = useState('unknown');
  const [lastCheck, setLastCheck] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testBackendConnection = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    const startTime = Date.now();
    
    try {
      // Test de connectivité avec le backend
      const response = await fetch('http://localhost:8080/api/chat/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      const endTime = Date.now();
      const responseTimeMs = endTime - startTime;
      
      if (response.ok) {
        setBackendStatus('connected');
        setResponseTime(responseTimeMs);
        setLastCheck(new Date());
      } else {
        setBackendStatus('error');
        setErrorMessage(`Erreur HTTP: ${response.status} ${response.statusText}`);
        setResponseTime(null);
        setLastCheck(new Date());
      }
    } catch (error) {
      setBackendStatus('error');
      setErrorMessage(`Erreur de connexion: ${error.message}`);
      setResponseTime(null);
      setLastCheck(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (backendStatus) {
      case 'connected':
        return '🟢';
      case 'error':
        return '🔴';
      case 'unknown':
        return '⚪';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'connected':
        return 'Connecté';
      case 'error':
        return 'Erreur de connexion';
      case 'unknown':
        return 'Non testé';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'connected':
        return '#10B981';
      case 'error':
        return '#EF4444';
      case 'unknown':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  useEffect(() => {
    // Test automatique au chargement du composant
    testBackendConnection();
  }, []);

  return (
    <div className="backend-connectivity-test">
      <div className="test-header">
        <h3>🔌 Test de Connectivité Backend</h3>
        <button
          className={`test-button ${isLoading ? 'loading' : ''}`}
          onClick={testBackendConnection}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Test en cours...' : '🔄 Tester à nouveau'}
        </button>
      </div>

      <div className="status-display">
        <div className="status-indicator">
          <span className="status-icon">{getStatusIcon()}</span>
          <div className="status-info">
            <span className="status-text" style={{ color: getStatusColor() }}>
              {getStatusText()}
            </span>
            {lastCheck && (
              <span className="last-check">
                Dernier test: {lastCheck.toLocaleTimeString('fr-FR')}
              </span>
            )}
          </div>
        </div>

        {responseTime && (
          <div className="response-time">
            <span className="time-label">Temps de réponse:</span>
            <span className="time-value">{responseTime}ms</span>
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="test-details">
        <h4>Détails du test:</h4>
        <ul>
          <li>
            <strong>Endpoint testé:</strong> http://localhost:8080/api/chat/health
          </li>
          <li>
            <strong>Méthode:</strong> GET
          </li>
          <li>
            <strong>CORS:</strong> Activé
          </li>
          <li>
            <strong>Protocole:</strong> HTTP
          </li>
        </ul>
      </div>

      <div className="troubleshooting">
        <h4>🔧 Dépannage:</h4>
        <div className="troubleshooting-tips">
          <div className="tip">
            <span className="tip-icon">💡</span>
            <div className="tip-content">
              <strong>Backend non démarré:</strong> Assurez-vous que votre application Spring Boot est en cours d'exécution sur le port 8080
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">💡</span>
            <div className="tip-content">
              <strong>Port incorrect:</strong> Vérifiez que le backend écoute bien sur le port 8080
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">💡</span>
            <div className="tip-content">
              <strong>Problème CORS:</strong> Vérifiez la configuration CORS dans votre backend Spring Boot
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">💡</span>
            <div className="tip-content">
              <strong>Firewall:</strong> Assurez-vous que le port 8080 n'est pas bloqué par votre pare-feu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendConnectivityTest;
