import React, { useState } from 'react';
import orientationService from '../services/orientationService';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setTestResults(null);

    try {
      console.log('🧪 Test de l\'API d\'orientation...');
      
      // Test 1: Récupérer toutes les majeures
      console.log('📚 Test 1: Récupération des majeures...');
      const majors = await orientationService.getAllMajors();
      console.log('✅ Majeures récupérées:', majors);
      
      // Test 2: Test avec des réponses d'exemple
      console.log('🧪 Test 2: Test avec réponses d\'exemple...');
      const testResponse = await orientationService.testWithExampleAnswers();
      console.log('✅ Test avec exemples réussi:', testResponse);
      
      // Test 3: Calcul d'orientation avec des données de test
      console.log('🎯 Test 3: Calcul d\'orientation...');
      const testData = {
        question1: "E",
        question2: ["C"],
        question3: "D",
        question4: "C",
        question5: ["G", "H", "B"],
        question6: "A",
        question7: "A",
        question8: "D",
        question9: { "A": 1, "B": 5, "C": 5, "D": 5 },
        question10: "B",
        question11: "A",
        question12: "B",
        question13: "B",
        question14: ["D"]
      };
      
      const orientationResponse = await orientationService.calculateOrientation(testData);
      console.log('✅ Calcul d\'orientation réussi:', orientationResponse);
      
      setTestResults({
        majors: majors,
        testExample: testResponse,
        orientation: orientationResponse
      });
      
    } catch (err) {
      console.error('❌ Erreur lors du test de l\'API:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px' }}>
      <h2>🧪 Composant de Test de l'API</h2>
      
      <button 
        onClick={testApi}
        disabled={loading}
        style={{
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? '⏳ Test en cours...' : '🚀 Tester l\'API Backend'}
      </button>

      {error && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <h3>❌ Erreur</h3>
          <p>{error}</p>
        </div>
      )}

      {testResults && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px' }}>
          <h3>✅ Tests réussis !</h3>
          
          <div style={{ marginTop: '15px' }}>
            <h4>📚 Majeures récupérées ({testResults.majors?.length || 0})</h4>
            <p>✅ API des majeures fonctionne</p>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <h4>🧪 Test avec exemples</h4>
            <p>✅ API de test fonctionne</p>
            <p><strong>Top recommandation:</strong> {testResults.testExample?.top3Recommendations?.[0]?.name || 'N/A'}</p>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <h4>🎯 Calcul d'orientation</h4>
            <p>✅ API de calcul fonctionne</p>
            <p><strong>Top recommandation:</strong> {testResults.orientation?.top3Recommendations?.[0]?.name || 'N/A'}</p>
            <p><strong>Score:</strong> {testResults.orientation?.top3Recommendations?.[0]?.matchingScore || 'N/A'}%</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6c757d' }}>
        <p><strong>Instructions:</strong></p>
        <ul>
          <li>Cliquez sur le bouton pour tester toutes les APIs</li>
          <li>Vérifiez la console pour les logs détaillés</li>
          <li>Si une erreur survient, vérifiez que le backend Spring Boot est démarré</li>
          <li>Vérifiez que l'URL de l'API est correcte dans la configuration</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTestComponent;
