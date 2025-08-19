import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/api';
import './UserStatusTest.css';

const UserStatusTest = () => {
  const { user, userStatus, checkUserStatus, updateUserActivity } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  const runStatusTest = async () => {
    if (!user) {
      addTestResult('❌ Aucun utilisateur connecté', 'error');
      return;
    }

    setLoading(true);
    addTestResult('🧪 Début des tests de statut utilisateur', 'info');

    try {
      // Test 1: Vérifier le statut actuel
      addTestResult('📡 Test 1: Vérification du statut actuel...', 'info');
      const statusResponse = await authService.getUserStatus();
      addTestResult(`✅ Statut actuel: ${statusResponse.online ? 'En ligne' : 'Hors ligne'}`, 'success');

      // Test 2: Mettre à jour l'activité
      addTestResult('📡 Test 2: Mise à jour de l\'activité...', 'info');
      const activityResponse = await authService.updateUserActivity();
      addTestResult(`✅ Activité mise à jour: ${activityResponse.message}`, 'success');

      // Test 3: Vérifier le statut après mise à jour
      addTestResult('📡 Test 3: Vérification du statut après mise à jour...', 'info');
      const updatedStatus = await authService.getUserStatus();
      addTestResult(`✅ Nouveau statut: ${updatedStatus.online ? 'En ligne' : 'Hors ligne'}`, 'success');

      // Test 4: Vérifier le statut local
      addTestResult('📡 Test 4: Vérification du statut local...', 'info');
      addTestResult(`✅ Statut local: ${userStatus.online ? 'En ligne' : 'Hors ligne'}`, 'success');

      addTestResult('🎉 Tous les tests sont passés avec succès!', 'success');

    } catch (error) {
      addTestResult(`❌ Erreur lors des tests: ${error.message}`, 'error');
      console.error('Erreur détaillée:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const simulateUserActivity = () => {
    if (user) {
      updateUserActivity();
      addTestResult('🖱️ Activité utilisateur simulée', 'info');
    }
  };

  return (
    <div className="user-status-test">
      <h3>🧪 Test du Système de Statut Utilisateur</h3>
      
      <div className="test-controls">
        <button 
          onClick={runStatusTest} 
          disabled={loading || !user}
          className="test-button primary"
        >
          {loading ? 'Tests en cours...' : 'Lancer les Tests'}
        </button>
        
        <button 
          onClick={simulateUserActivity} 
          disabled={!user}
          className="test-button secondary"
        >
          Simuler Activité
        </button>
        
        <button 
          onClick={clearResults} 
          className="test-button clear"
        >
          Effacer Résultats
        </button>
      </div>

      <div className="current-status">
        <h4>Statut Actuel:</h4>
        <p><strong>Connecté:</strong> {user ? 'Oui' : 'Non'}</p>
        <p><strong>Statut Local:</strong> {userStatus.online ? 'En ligne' : 'Hors ligne'}</p>
        <p><strong>Dernière Activité:</strong> {userStatus.lastActivity ? new Date(userStatus.lastActivity).toLocaleString() : 'Aucune'}</p>
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

export default UserStatusTest;
