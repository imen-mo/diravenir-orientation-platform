import React, { useState } from 'react';

const SimpleApiTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testBackend = async () => {
    setLoading(true);
    setError(null);
    setTestResult(null);

    try {
      console.log('🧪 Test simple de l\'API backend...');
      
      // Test 1: Vérifier que le backend répond
      const response = await fetch('http://localhost:8080/api/orientation/test-example');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Réponse du backend:', data);
      
      setTestResult({
        success: true,
        data: data,
        message: `API fonctionne ! ${data.top3Recommendations?.length || 0} recommandations reçues.`
      });
      
    } catch (err) {
      console.error('❌ Erreur lors du test:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '15px', 
      background: '#e9ecef', 
      borderRadius: '8px', 
      margin: '15px 0',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>🧪 Test Simple de l'API</h3>
      
      <button 
        onClick={testBackend}
        disabled={loading}
        style={{
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {loading ? '⏳ Test...' : '🚀 Tester l\'API'}
      </button>

      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginTop: '10px',
          fontSize: '14px'
        }}>
          <strong>❌ Erreur:</strong> {error}
          <br />
          <small>Vérifiez que le backend Spring Boot est démarré sur le port 8080</small>
        </div>
      )}

      {testResult && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px', 
          marginTop: '10px',
          fontSize: '14px'
        }}>
          <strong>✅ Succès:</strong> {testResult.message}
          {testResult.data?.top3Recommendations?.[0] && (
            <div style={{ marginTop: '8px' }}>
              <strong>Top recommandation:</strong> {testResult.data.top3Recommendations[0].name} 
              ({testResult.data.top3Recommendations[0].matchingScore}%)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleApiTest;
