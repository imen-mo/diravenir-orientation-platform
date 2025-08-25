import React from 'react';
import GlobalLayout from '../components/GlobalLayout';

const NavbarTest = () => {
  return (
    <GlobalLayout activePage="test">
      <div style={{ 
        padding: '120px 20px 20px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1>Test de la Navbar</h1>
        <p>Vérifiez que :</p>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
          <li>✅ Le logo est à gauche et est grand (80px)</li>
          <li>✅ La navigation est au centre</li>
          <li>✅ Les boutons "Se connecter" et "Create Account" sont à droite</li>
          <li>✅ Le header change d'apparence au scroll</li>
        </ul>
        
        <div style={{ marginTop: '40px' }}>
          <h3>Faites défiler pour tester le header dynamique</h3>
          {Array.from({ length: 20 }, (_, i) => (
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

export default NavbarTest;
