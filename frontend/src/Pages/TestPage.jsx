import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>🧪 Page de Test</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Si vous voyez cette page, l'application fonctionne correctement !
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3>✅ Statut de l'application :</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>React fonctionne</li>
          <li>Le routage fonctionne</li>
          <li>Les composants se chargent</li>
          <li>Le CSS fonctionne</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
