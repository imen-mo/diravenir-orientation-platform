import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './LoginTest.css';

const LoginTest = () => {
  const { user, userStatus, login, logout } = useAuth();
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  const testLogin = async () => {
    addTestResult('🧪 Test de connexion en cours...', 'info');
    
    try {
      const result = await login(testEmail, testPassword);
      
      if (result.success) {
        addTestResult('✅ Connexion réussie !', 'success');
        addTestResult(`👤 Utilisateur connecté: ${testEmail}`, 'success');
      } else {
        addTestResult(`❌ Échec de la connexion: ${result.error}`, 'error');
      }
    } catch (error) {
      addTestResult(`❌ Erreur lors de la connexion: ${error.message}`, 'error');
    }
  };

  const testLogout = () => {
    addTestResult('🧪 Test de déconnexion...', 'info');
    logout();
    addTestResult('✅ Déconnexion effectuée', 'success');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="login-test">
      <h3>🧪 Test du Processus de Login</h3>
      
      <div className="test-controls">
        <div className="input-group">
          <label>Email de test:</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
          />
        </div>
        
        <div className="input-group">
          <label>Mot de passe de test:</label>
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            placeholder="password123"
          />
        </div>
        
        <div className="button-group">
          <button onClick={testLogin} className="test-btn login">
            🔐 Tester Connexion
          </button>
          
          <button onClick={testLogout} className="test-btn logout">
            🚪 Tester Déconnexion
          </button>
          
          <button onClick={clearResults} className="test-btn clear">
            🗑️ Effacer Résultats
          </button>
        </div>
      </div>

      <div className="current-state">
        <h4>État Actuel:</h4>
        <p><strong>Utilisateur connecté:</strong> {user ? 'Oui' : 'Non'}</p>
        <p><strong>Email:</strong> {user?.email || 'Aucun'}</p>
        <p><strong>Token:</strong> {user?.token ? 'Présent' : 'Absent'}</p>
        <p><strong>Statut Online:</strong> {userStatus.online ? 'En ligne' : 'Hors ligne'}</p>
        <p><strong>Dernière activité:</strong> {userStatus.lastActivity ? new Date(userStatus.lastActivity).toLocaleString() : 'Aucune'}</p>
      </div>

      <div className="test-results">
        <h4>Résultats des Tests:</h4>
        {testResults.length === 0 ? (
          <p className="no-results">Aucun test exécuté</p>
        ) : (
          <div className="results-list">
            {testResults.map((result, index) => (
              <div key={index} className={`test-result ${result.type}`}>
                <span className="timestamp">[{result.timestamp}]</span>
                <span className="message">{result.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginTest;
