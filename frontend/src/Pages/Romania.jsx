import React from 'react';
import { Link } from 'react-router-dom';
import './CountryPage.css';
import Footer from '../components/Footer';

const Romania = () => {
  return (
    <div className="country-page">
      <header className="country-header">
        <div className="country-header-content">
          <h1>Study in Romania</h1>
          <p>Experience European education with affordable costs</p>
        </div>
        <img src="/src/assets/ROMANIA.jpg" alt="Romania landscape" className="country-hero-image" />
      </header>
      
      <div className="country-content">
        <section className="country-section">
          <p>Discover the rich educational opportunities in Romania, known for its high-quality education system and affordable tuition fees. Romania offers a unique blend of Eastern and Western European culture, making it an exciting destination for international students.</p>
        </section>
        
        <section className="country-section">
          <h2>Why Study in Romania?</h2>
          <p>Romania offers high-quality European education at affordable prices. With a rich cultural heritage and a growing economy, it's an excellent destination for international students.</p>
        </section>
        
        <section className="country-section">
          <h2>Top Universities</h2>
          <ul>
            <li>University of Bucharest</li>
            <li>Babeș-Bolyai University</li>
            <li>Alexandru Ioan Cuza University</li>
            <li>University of Medicine and Pharmacy</li>
          </ul>
        </section>
        
        <section className="country-section">
          <h2>Popular Programs</h2>
          <ul>
            <li>Medicine</li>
            <li>Engineering</li>
            <li>Computer Science</li>
            <li>Business Administration</li>
          </ul>
        </section>
        
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button">Contact Us for More Information</Link>
          <Link to="/programs" className="cta-button secondary">View All Programs</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Romania;
