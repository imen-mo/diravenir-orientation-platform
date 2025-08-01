import React from 'react';
import { Link } from 'react-router-dom';
import './CountryPage.css';
import Footer from '../components/Footer';

const Cyprus = () => {
  return (
    <div className="country-page">
      <header className="country-header">
        <div className="country-header-content">
          <h1>Study in Cyprus</h1>
          <p>Study in a beautiful Mediterranean island with excellent universities</p>
        </div>
        <img src="/src/assets/chypre.jpg" alt="Cyprus landscape" className="country-hero-image" />
      </header>
      
      <div className="country-content">
        <section className="country-section">
          <h2>Why Study in Cyprus?</h2>
          <p>Cyprus offers high-quality education in a stunning Mediterranean setting. With English-taught programs and affordable tuition fees, it's an excellent choice for international students.</p>
        </section>
        
        <section className="country-section">
          <h2>Top Universities</h2>
          <ul>
            <li>University of Cyprus</li>
            <li>Cyprus International University</li>
            <li>Final International University</li>
            <li>European University Cyprus</li>
          </ul>
        </section>
        
        <section className="country-section">
          <h2>Popular Programs</h2>
          <ul>
            <li>Business Administration</li>
            <li>Computer Science</li>
            <li>Tourism & Hospitality</li>
            <li>Engineering</li>
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

export default Cyprus;
