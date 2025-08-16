import React from 'react';

const DebugComponent = () => {
  console.log('🔍 DebugComponent rendu');
  
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      border: '2px solid red',
      margin: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🐛 Composant de Débogage</h1>
      <p>Si vous voyez ceci, React fonctionne !</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
      <div style={{ background: '#fff', padding: '10px', margin: '10px 0' }}>
        <h3>Informations de débogage :</h3>
        <ul>
          <li>✅ Composant rendu avec succès</li>
          <li>✅ React fonctionne</li>
          <li>✅ JSX est interprété</li>
          <li>✅ Styles CSS appliqués</li>
        </ul>
      </div>
    </div>
  );
};

export default DebugComponent;
