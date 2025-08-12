import React, { useState } from 'react';
import { authService } from '../services/api';

const LoginTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTestLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      console.log('🧪 Test de connexion avec:', { email, password: '***' });
      
      // Test sans reCAPTCHA d'abord
      const response = await authService.login(email, password, 'test-token');
      
      setResult({
        success: true,
        data: response,
        message: 'Connexion réussie !'
      });
      
      console.log('✅ Test de connexion réussi:', response);
      
    } catch (err) {
      console.error('❌ Test de connexion échoué:', err);
      
      setError({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        fullError: err
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      margin: '20px 0'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🧪 Test de Connexion</h3>
      
      <form onSubmit={handleTestLogin} style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="test@example.com"
            required
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Mot de passe"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Test en cours...' : 'Tester la Connexion'}
        </button>
      </form>

      {result && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724'
        }}>
          <h4>✅ Succès</h4>
          <p><strong>Message:</strong> {result.message}</p>
          <details>
            <summary>Données de réponse</summary>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          <h4>❌ Erreur</h4>
          <p><strong>Message:</strong> {error.message}</p>
          {error.status && <p><strong>Status:</strong> {error.status}</p>}
          {error.data && (
            <details>
              <summary>Détails de l'erreur</summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {JSON.stringify(error.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Note:</strong> Ce composant teste la connexion sans reCAPTCHA pour diagnostiquer les problèmes d'API.</p>
        <p><strong>URL de l'API:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084/api'}</p>
      </div>
    </div>
  );
};

export default LoginTest;
