import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { fetchFilieres, fetchTemoignages, fetchDestinations, fetchPartenaires } from "../services/api";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [temoignages, setTemoignages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [partenaires, setPartenaires] = useState([]);

  useEffect(() => {
    // Charger les programmes
    fetchFilieres()
      .then(data => setPrograms(data))
      .catch(err => console.error("Erreur lors du chargement des filières:", err));

    // Charger les témoignages
    fetchTemoignages()
      .then(data => setTemoignages(data))
      .catch(err => console.error("Erreur lors du chargement des témoignages:", err));

    // Charger les destinations
    fetchDestinations()
      .then(data => setDestinations(data))
      .catch(err => console.error("Erreur lors du chargement des destinations:", err));

    // Charger les partenaires
    fetchPartenaires()
      .then(data => setPartenaires(data))
      .catch(err => console.error("Erreur lors du chargement des partenaires:", err));
  }, []);

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="DirAvenir Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/orientation" className="nav-button">Orientation</Link>
          <Link to="/programs" className="nav-button">Programs</Link>
          <Link to="/about" className="nav-button">About US</Link>
          <Link to="/faq" className="nav-button">FAQ</Link>
          <Link to="/contact" className="nav-button">Contact US</Link>
          <Link to="/signin" className="nav-button">Log In</Link>
          <Link to="/signup" className="nav-button">Create Account</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Guide Your Way Up To Success With Us</h1>
          <p>Get the guidance you need for the future of work.</p>
          <input type="text" placeholder="Search the program you want" className="search-input" />
          <div className="tags">
            <span>Cloud Computing</span>
            <span>Cyber Security</span>
            <span>DevOps</span>
            <span>Data Science</span>
            <span>Software Testing</span>
          </div>
          <div className="hero-buttons">
            <button onClick={() => navigate('/programs/data-analyst')}>Data Analyst</button>
            <button onClick={() => navigate('/programs/website-design')}>Website Design</button>
          </div>
        </div>
      </section>

      {/* AI Based Sections */}
      <section className="ai-sections">
        <div className="ai-card" onClick={() => navigate('/program-selector')}>
          <h3>AI Based Program Selector</h3>
          <p>Find your perfect program with our intelligent matching system</p>
        </div>
        <div className="ai-card" onClick={() => navigate('/scenarios')}>
          <h3>AI Based Scenarios</h3>
          <p>Explore real-world scenarios to understand your career path</p>
        </div>
        <div className="ai-card" onClick={() => navigate('/quizzes')}>
          <h3>AI Based Quizzes/Tests</h3>
          <p>Test your knowledge and skills with our adaptive assessments</p>
        </div>
        <div className="ai-card" onClick={() => navigate('/goals')}>
          <h3>AI Based Goals</h3>
          <p>Set and track your career goals with personalized insights</p>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="who-can-join">
        <h2>Career Orientation Schemes For All</h2>
        <ul>
          <li>Colleges/Universities</li>
          <li>Students</li>
          <li>Career Changers</li>
          <li>Educational Institutions</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Orientation Aptitude Tests and diagrams</li>
          <li>Program Cases matching your profil</li>
          <li>Opportunities selection in universities</li>
          <li>Application to a chosen opportunity</li>
          <li>Real Time Tracking of your application</li>
          <li>Application guidance & Monitoring</li>
        </ol>
      </section>

      {/* Popular Programs */}
      <section className="popular-programs">
        <h2>Popular Programs</h2>
        <div className="programs-grid">
          {programs.length > 0 ? (
            programs.map((prog, idx) => (
              <div key={idx} className="program-card" onClick={() => navigate(`/programs/${prog.id}`)}>
                <h3>{prog.nom}</h3>
                <p>{prog.domaine}</p>
                <button>Apply Now</button>
              </div>
            ))
          ) : (
            // Fallback cards si pas de données
            <>
              <div className="program-card">
                <h3>Computer Science</h3>
                <p>Technology & Engineering</p>
                <button>Apply Now</button>
              </div>
              <div className="program-card">
                <h3>Business Administration</h3>
                <p>Business & Management</p>
                <button>Apply Now</button>
              </div>
              <div className="program-card">
                <h3>Data Science</h3>
                <p>Technology & Analytics</p>
                <button>Apply Now</button>
              </div>
            </>
          )}
        </div>
        <button onClick={() => navigate('/opportunities')}>View All Opportunities</button>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <h2>Our Achievements</h2>
        <div className="stats">
          <div>200 Students Abroad</div>
          <div>70 Programs Available</div>
          <div>90% Students Satisfied</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>From Dreamers to Achievers & doers</h2>
        <div className="testimonials-list">
          {temoignages.length > 0 ? (
            temoignages.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <h4>{t.nom}</h4>
                <div>{t.programme}</div>
                <p>{t.texte}</p>
                <div>{'★'.repeat(t.etoiles)}</div>
              </div>
            ))
          ) : (
            // Fallback testimonials
            <>
              <div className="testimonial-card">
                <h4>Anir chentre</h4>
                <div>Business Administration</div>
                <p>J'ai adoré l'expérience avec DirAvenir. Ils m'ont guidé vers le bon programme.</p>
                <div>★★★★★</div>
              </div>
              <div className="testimonial-card">
                <h4>Fatimazahra Naim</h4>
                <div>Cyber Security</div>
                <p>I highly recommend DirAvenir for anyone looking to study abroad.</p>
                <div>★★★★★</div>
              </div>
              <div className="testimonial-card">
                <h4>El Abbadi Hind</h4>
                <div>Architecture</div>
                <p>J'ai hâte de commencer mon programme grâce à leur orientation.</p>
                <div>★★★★★</div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Destinations */}
      <section className="destinations">
        <h2>Our Destinations</h2>
        <div className="destinations-list">
          {destinations.length > 0 ? (
            destinations.map((d, idx) => (
              <div key={idx} className="destination-card">
                <h4>{d.nom}</h4>
                <p>{d.description}</p>
                {d.imageUrl && <img src={d.imageUrl} alt={d.nom} />}
              </div>
            ))
          ) : (
            // Fallback destinations
            <>
              <div className="destination-card">
                <h4>China</h4>
                <p>Discover opportunities in one of the world's fastest-growing economies</p>
              </div>
              <div className="destination-card">
                <h4>Cyprus</h4>
                <p>Study in a beautiful Mediterranean island with excellent universities</p>
              </div>
              <div className="destination-card">
                <h4>Romania</h4>
                <p>Experience European education with affordable costs</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <h2>Our Partners</h2>
        <div className="partners-list">
          {partenaires.length > 0 ? (
            partenaires.map((p, idx) => (
              <div key={idx} className="partner-card">
                <h4>{p.nom}</h4>
                <p>{p.description}</p>
                {p.logoUrl && <img src={p.logoUrl} alt={p.nom} />}
                {p.siteWeb && <a href={p.siteWeb} target="_blank" rel="noopener noreferrer">Site Web</a>}
              </div>
            ))
          ) : (
            // Fallback partners
            <>
              <div className="partner-card">
                <h4>Final International University</h4>
                <p>Leading university in Cyprus offering quality education</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="partner-card">
                <h4>Cyprus International University</h4>
                <p>International university with diverse programs</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="partner-card">
                <h4>BAU</h4>
                <p>Bahçeşehir University - Excellence in education</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <img src={logo} alt="DirAvenir Logo" className="logo" />
          <p>DirAvenir est une plateforme web qui accompagne les étudiants dans leur orientation académique et professionnelle, facilitant leur accès aux meilleures opportunités d'études à l'étranger.</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/programs">Best Programs</Link>
          <Link to="/faq">Our FAQS</Link>
          <Link to="/contact">Contact US</Link>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>contact@diravenir.com</p>
          <p>+212 777 447 546</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 