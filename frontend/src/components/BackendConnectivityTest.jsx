import React, { useState } from 'react';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import './BackendConnectivityTest.css';

const BackendConnectivityTest = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const runConnectivityTests = async () => {
    setTesting(true);
    const results = {};

    try {
      // Test 1: Connexion de base
      console.log('🔍 Test 1: Test de connexion de base...');
      try {
        const response = await fetch('http://localhost:8084/api/test/health');
        results.basicConnection = {
          success: response.ok,
          status: response.status,
          message: response.ok ? 'Connexion réussie' : `Erreur HTTP: ${response.status}`
        };
      } catch (error) {
        results.basicConnection = {
          success: false,
          error: error.message,
          message: 'Impossible de se connecter au backend'
        };
      }

      // Test 2: Endpoint d'import
      console.log('🔍 Test 2: Test de l\'endpoint d\'import...');
      try {
        const response = await fetch('http://localhost:8084/api/test/upload-endpoint');
        results.importEndpoint = {
          success: response.ok,
          status: response.status,
          message: response.ok ? 'Endpoint d\'import accessible' : `Erreur HTTP: ${response.status}`
        };
      } catch (error) {
        results.importEndpoint = {
          success: false,
          error: error.message,
          message: 'Erreur lors du test de l\'endpoint d\'import'
        };
      }

      // Test 3: Base de données
      console.log('🔍 Test 3: Test de la base de données...');
      try {
        const response = await fetch('http://localhost:8084/api/test/database');
        const data = await response.json();
        results.databaseTest = {
          success: response.ok,
          status: response.status,
          message: response.ok ? `Base de données accessible: ${data.database} ${data.version}` : `Erreur base de données: ${response.status}`,
          details: data
        };
      } catch (error) {
        results.databaseTest = {
          success: false,
          error: error.message,
          message: 'Erreur lors du test de la base de données'
        };
      }

      // Test 4: Test d'upload simulé
      console.log('🔍 Test 4: Test d\'upload simulé...');
      try {
        const response = await fetch('http://localhost:8084/api/test/upload-simulation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        results.uploadTest = {
          success: response.ok,
          status: response.status,
          message: response.ok ? 'Upload simulé réussi' : `Erreur HTTP: ${response.status}`
        };
      } catch (error) {
        results.uploadTest = {
          success: false,
          error: error.message,
          message: 'Erreur lors de l\'upload simulé'
        };
      }

    } catch (error) {
      console.error('❌ Erreur lors des tests:', error);
    } finally {
      setTesting(false);
    }

    setTestResults(results);
    console.log('📊 Résultats des tests:', results);
  };

  const getStatusIcon = (success) => {
    return success ? '✅' : '❌';
  };

  const getStatusClass = (success) => {
    return success ? 'success' : 'error';
  };

  return (
    <div className="connectivity-test">
      <h3>🔍 Test de Connectivité Backend</h3>
      
      <button 
        onClick={runConnectivityTests}
        disabled={testing}
        className="test-btn"
      >
        {testing ? 'Tests en cours...' : 'Lancer les Tests de Connectivité'}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div className="test-results">
          <h4>Résultats des Tests:</h4>
          
          <div className="test-item">
            <span className="test-label">1. Connexion de base:</span>
            <span className={`test-status ${getStatusClass(testResults.basicConnection?.success)}`}>
              {getStatusIcon(testResults.basicConnection?.success)} {testResults.basicConnection?.message}
            </span>
          </div>

          <div className="test-item">
            <span className="test-label">2. Endpoint d'import:</span>
            <span className={`test-status ${getStatusClass(testResults.importEndpoint?.success)}`}>
              {getStatusIcon(testResults.importEndpoint?.success)} {testResults.importEndpoint?.message}
            </span>
          </div>

          <div className="test-item">
            <span className="test-label">3. Base de données:</span>
            <span className={`test-status ${getStatusClass(testResults.databaseTest?.success)}`}>
              {getStatusIcon(testResults.databaseTest?.success)} {testResults.databaseTest?.message}
            </span>
          </div>

          <div className="test-item">
            <span className="test-label">4. Test d'upload:</span>
            <span className={`test-status ${getStatusClass(testResults.uploadTest?.success)}`}>
              {getStatusIcon(testResults.uploadTest?.success)} {testResults.uploadTest?.message}
            </span>
          </div>

          {Object.values(testResults).some(result => !result.success) && (
            <div className="diagnostic-tips">
              <h5>💡 Conseils de Diagnostic:</h5>
              <ul>
                <li>Vérifiez que le backend Spring Boot est démarré sur le port 8084</li>
                <li>Vérifiez les logs du backend pour les erreurs</li>
                <li>Assurez-vous que la base de données MySQL est accessible</li>
                <li>Vérifiez que les entités Program, Destination et Universite existent</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BackendConnectivityTest;
