import React from 'react';
import GlobalLayout from '../components/GlobalLayout';

const TestPage = () => {
  return (
    <GlobalLayout activePage="test">
      <div style={{ 
        padding: '50px', 
        textAlign: 'center', 
        backgroundColor: '#5C1A6E', /* Palette exacte : violet profond de l'image */
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
      <h1 style={{ color: '#F7C800' }}>🧪 Page de Test</h1> {/* Palette exacte : jaune doré de l'image */}
      <p style={{ fontSize: '18px', color: '#FFFFFF' }}> {/* Palette exacte : blanc de l'image */}
        Si vous voyez cette page, l'application fonctionne correctement !
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        border: '2px solid #F7C800' /* Palette exacte : jaune doré de l'image */
      }}>
        <h3 style={{ color: '#5C1A6E' }}>✅ Statut de l'application :</h3> {/* Palette exacte : violet profond de l'image */}
        <ul style={{ textAlign: 'left', display: 'inline-block', color: '#5C1A6E' }}> {/* Palette exacte : violet profond de l'image */}
          <li>React fonctionne</li>
          <li>Le routage fonctionne</li>
          <li>Les composants se chargent</li>
          <li>Le CSS fonctionne</li>
        </ul>
      </div>
    </div>
    </GlobalLayout>
  );
};

export default TestPage;
