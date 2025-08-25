import React from 'react';
import GlobalLayout from '../components/GlobalLayout';
import '../styles/HeaderTest.css';

const HeaderTest = () => {
  return (
    <GlobalLayout activePage="test">
      <div className="header-test-page">
        <div className="hero-section">
          <h1>Test du Header Dynamique</h1>
          <p>Faites défiler vers le bas pour voir le header changer d'apparence</p>
        </div>
        
        <div className="content-sections">
          {Array.from({ length: 10 }, (_, index) => (
            <section key={index} className="test-section">
              <h2>Section {index + 1}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default HeaderTest;
