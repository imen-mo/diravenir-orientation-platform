import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import orientationImage from '../assets/orientation.png';
import etudiantImage from '../assets/etudiant.png';
import meetingImage from '../assets/meeting.png';
import logo from '../assets/logo.png';
import fondatriceImage from '../assets/Fondatrice.png';
import meryemImage from '../assets/meryemderni.png';
import nadiaImage from '../assets/nadiaboukdir.png';
import raniaImage from '../assets/raniajamoudi.png';
import marouaneImage from '../assets/marouanezahid.png';
import { FaInstagram } from 'react-icons/fa';
import Footer from '../components/Footer';
{/* comment */}

const About = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      id: 1,
      image: meetingImage,
      title: "Collaboration & Innovation",
      description: "Working together to build the future of education",
      icon: "🤝",
      color: "#ffd700"
    },
    {
      id: 2,
      image: etudiantImage,
      title: "Student Success",
      description: "Empowering students to achieve their dreams",
      icon: "🎓",
      color: "#ff6b6b"
    },
    {
      id: 3,
      image: orientationImage,
      title: "Professional Guidance",
      description: "Expert orientation for international studies",
      icon: "🌟",
      color: "#4ecdc4"
    }
  ];

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const goToCard = (index) => {
    setActiveCard(index);
  };

  return (
    <div className="about-page-modern">
      {/* Header/Navigation Bar */}
      <nav className="navbar-modern">
        <div className="navbar-left">
          <img src={logo} alt="DirAvenir Logo" className="logo-modern" />
        </div>
        <div className="navbar-center">
          <Link to="/" className="nav-link-modern">Home</Link>
          <Link to="/orientation" className="nav-link-modern">Orientation</Link>
          <Link to="/programs" className="nav-link-modern">Programs</Link>
          <Link to="/about" className="nav-link-modern active">About US</Link>
          <Link to="/faq" className="nav-link-modern">FAQ</Link>
          <Link to="/contact" className="nav-link-modern">Contact US</Link>
        </div>
        <div className="navbar-right">
          <Link to="/signin" className="btn-login-modern">Log in</Link>
          <Link to="/signup" className="btn-create-account-modern">Create Account</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content-modern">
        {/* Left Side - Text Content */}
        <div className="content-left-modern">
          <div className="section-title-modern">ABOUT US</div>
          <h1 className="main-title-modern">
            The Platform For<br />
            The Next Future<br />
            Makers
          </h1>
          <p className="subtitle-modern">
            Transforming education for the next generation of students & learners
          </p>
        </div>

        {/* Right Side - Image Cards */}
        <div className="content-right-modern">
          <div className="cards-container">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`image-card ${index === activeCard ? 'active' : ''}`}
                onClick={() => goToCard(index)}
              >
                <div className="card-image-container">
                  <img src={card.image} alt={card.title} className="card-image" />
                  <div className="card-overlay"></div>
                  <div className="card-icon">{card.icon}</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title" style={{ color: card.color }}>
                    {card.title}
                  </h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-progress">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${((index + 1) / cards.length) * 100}%`,
                        backgroundColor: card.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Dots */}
            <div className="cards-dots">
              {cards.map((_, index) => (
                <button
                  key={index}
                  className={`card-dot ${index === activeCard ? 'active' : ''}`}
                  onClick={() => goToCard(index)}
                  style={{ backgroundColor: index === activeCard ? cards[index].color : 'rgba(255, 255, 255, 0.4)' }}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="auto-play-indicator">
              <div className="indicator-dot active"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="story-container">
          <div className="story-content">
            <div className="story-content-inner">
              <h2 className="story-subtitle">OUR STORY</h2>
              <h3 className="story-title">Innovate in New Ways to Guide Students</h3>
              <p className="story-text">
                We believe in the power of purpose-driven learning and bold imagination. We see no limits to what we can build when curiosity meets community, when dreams are backed by action.
                <br /><br />
                We are not just educating the next generation, we are co-creating the future with them. Each scholar is a builder, a thinker, a doer. Together, we are shaping futures that matter.
                <br /><br />
                This is more than a platform. This is a movement for those who dare to dream and work to build.
              </p>
              <div className="story-decoration">
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
          </div>
          <div className="story-image">
            <img src={fondatriceImage} alt="Fondatrice" className="founder-image" />
            <div className="image-decoration"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-box">
            <div className="mission-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="mission-content">
              <h2 className="section-title">Our <span className="highlight">Mission</span></h2>
              <p className="section-text">
                We aspire to empower students to succeed in life, offering not only academic orientation but also the hope and inspiration to realize their dreams abroad through international scholarships, global internships, volunteering opportunities & many more.
              </p>
            </div>
          </div>

          <div className="vision-box">
            <div className="vision-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
              </svg>
            </div>
            <div className="vision-content">
              <h2 className="section-title">Our <span className="highlight">Vision</span></h2>
              <p className="section-text">
                We build students futures by providing comprehensive academic guidance, international scholarships ensuring they have the support and resources needed to succeed and realize their dreams abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="values-title">
            <span className="values-our">Our</span> <span className="values-values">Values</span>
          </h2>
          
          <div className="values-grid">
            {/* Honesty Card */}
            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </div>
              <h3 className="value-card-title">Honesty</h3>
              <p className="value-card-text">
                We deliver on our promises to students with integrity, transparency, and a genuine commitment to their success.
              </p>
            </div>

            {/* Students Focus Card */}
            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="value-card-title">Students Focus</h3>
              <p className="value-card-text">
                We keep students at the heart of everything we do because their success is what matters most.
              </p>
            </div>

            {/* Growth Oriented Card */}
            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 2.1l4 4-4 4"></path>
                  <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"></path>
                  <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path>
                </svg>
              </div>
              <h3 className="value-card-title">Growth Oriented</h3>
              <p className="value-card-text">
                We aspire to cultivate a Moroccan generation that values education on a global scale.
              </p>
            </div>

            {/* Believe Card */}
            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="value-card-title">Believe</h3>
              <p className="value-card-text">
                We believe in our students, regardless of their academic grades, skills, or past challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="team-title">
            <span className="team-our">Our</span> <span className="team-team">Team</span>
          </h2>
          
          <div className="team-grid">
            {/* Meryem Derni */}
            <div className="team-member">
              <a href="https://www.instagram.com/meryemderni?igsh=YmJuZGtweXB3NG00" target="_blank" rel="noopener noreferrer" className="team-member-link">
                <div className="team-image-container">
                  <img src={meryemImage} alt="Meryem Derni" className="team-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-icon" />
                  </div>
                </div>
              </a>
              <h3 className="team-member-name">Meryem Derni</h3>
              <p className="team-member-role">Head of Marketing & Sales</p>
            </div>

            {/* Nadia Boukdir */}
            <div className="team-member">
              <a href="https://www.instagram.com/nadia.boukdir?igsh=aDJ1eXRjdWlkdmR1" target="_blank" rel="noopener noreferrer" className="team-member-link">
                <div className="team-image-container">
                  <img src={nadiaImage} alt="Nadia Boukdir" className="team-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-icon" />
                  </div>
                </div>
              </a>
              <h3 className="team-member-name">Nadia Boukdir</h3>
              <p className="team-member-role">Team Member</p>
            </div>

            {/* Rania Jamoudi */}
            <div className="team-member">
              <div className="team-image-container">
                <img src={raniaImage} alt="Rania Jamoudi" className="team-image" />
              </div>
              <h3 className="team-member-name">Rania Jamoudi</h3>
              <p className="team-member-role">Admission Coordinator</p>
            </div>

            {/* Marouane Zahid */}
            <div className="team-member">
              <div className="team-image-container">
                <img src={marouaneImage} alt="Marouane Zahid" className="team-image" />
              </div>
              <h3 className="team-member-name">Marouane Zahid</h3>
              <p className="team-member-role">Sales Representative</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
