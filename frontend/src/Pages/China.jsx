import React from 'react';
import { Link } from 'react-router-dom';
import './CountryPage.css';

const China = () => {
  return (
    <div className="country-page">
      <header className="country-header">
        <div className="country-header-content">
          <h1>Study in China</h1>
          <p>Discover world-class education in one of the world's fastest-growing economies. China offers a unique blend of ancient traditions and modern innovation.</p>
        </div>
        <img src="/src/assets/CHINA.jpg" alt="China landscape" className="country-hero-image" />
      </header>
      
      <div className="country-content">
        <section className="country-section">
          <h2>Why Study in China?</h2>
          <p>China offers world-class education with a rich cultural experience. With its rapidly growing economy, studying in China provides excellent career opportunities.</p>
        </section>
        
        <section className="country-section">
          <h2>Top Universities</h2>
          <ul>
            <li>Tsinghua University</li>
            <li>Peking University</li>
            <li>Fudan University</li>
            <li>Zhejiang University</li>
          </ul>
        </section>
        
        <section className="country-section">
          <h2>Popular Programs</h2>
          <ul>
            <li>Engineering</li>
            <li>Business Administration</li>
            <li>Computer Science</li>
            <li>International Relations</li>
          </ul>
        </section>
        
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button">Contact Us for More Information</Link>
          <Link to="/programs" className="cta-button secondary">View All Programs</Link>
        </div>
      </div>
    </div>
  );
};

export default China;
