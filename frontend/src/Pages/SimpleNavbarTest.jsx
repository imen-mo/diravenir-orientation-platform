import React from 'react';
import GlobalLayout from '../components/GlobalLayout';

const SimpleNavbarTest = () => {
  return (
    <GlobalLayout activePage="test">
      <div style={{ 
        padding: '120px 20px 20px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1>Test Simple de la Navbar</h1>
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '800px',
          margin: '30px auto',
          textAlign: 'left'
        }}>
          <h3>Vérifiez que :</h3>
          <ul>
            <li>✅ <strong>Logo</strong> : Tout à gauche, taille 65px (plus petit que 80px)</li>
            <li>✅ <strong>Navigation</strong> : Parfaitement centrée</li>
            <li>✅ <strong>Boutons Auth</strong> : Tout à droite</li>
            <li>✅ <strong>Disposition</strong> : Logo (gauche) | Navigation (centre) | Boutons (droite)</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <h3>Faites défiler pour tester le header dynamique</h3>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.1)', 
              margin: '20px 0', 
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h4>Section {i + 1}</h4>
              <p>Contenu pour tester le scroll et voir le header changer d'apparence.</p>
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default SimpleNavbarTest;
