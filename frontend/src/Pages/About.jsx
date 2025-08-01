import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import romaniaImage from '../assets/ROMANIA.jpg';
import cyprusImage from '../assets/chypre.jpg';
import chinaImage from '../assets/CHINA.jpg';
import meetingImage from '../assets/meeting.png';
import orientationImage from '../assets/orientation.png';
import passeportImage from '../assets/passeport.png';
import meryemImage from '../assets/meryemderni.jpg';
import nadiaImage from '../assets/nadiaboukdir.jpg';
import diravenirLogo from '../assets/DIRAVENIR.jpg';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="about-page">
      {/* Navbar - Same as Contact Page */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="DirAvenir Logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="navbar-right">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/orientation" className="nav-button">Orientation</Link>
          <Link to="/programs" className="nav-button">Programs</Link>
          <Link to="/about" className="nav-button active">About US</Link>
          <Link to="/faq" className="nav-button">FAQ</Link>
          <Link to="/contact" className="nav-button">Contact US</Link>
          <Link to="/signin" className="nav-button">Log In</Link>
          <Link to="/signup" className="nav-button">Create Account</Link>
        </div>
      </nav>

      <div className="about-content">
        <h1 className="section-title">About Us</h1>
        <div className="mission-statement">
          <p className="section-text">
            As a newcomer, we bring a spirit of enthusiasm, dedication, and a commitment to redefining the landscape of International education.
          </p>
        </div>

        <div className="intro-section">
          <div className="logo-section">
            <img src={diravenirLogo} alt="DIRAVENIR" className="diravenir-logo" />
          </div>
          <p className="section-text">
            Our business blossoms as the fruition of months of unwavering dedication and teamwork between two best friends who dared to dream. From the inception of this idea to its realization, our journey has been marked by shared visions, late-night collaborations, and a relentless pursuit of excellence. Together, we've cultivated not just a business but a testament to the power of friendship, hard work, and a shared dream coming to life.
            Our passion lies in unlocking new horizons for the youth, providing them with unprecedented opportunities to build their academic foundation abroad and explore the transformative possibilities of global learning.
          </p>
          <div className="vision-container">
            <p className="section-text vision-text">
              We aspire to be the catalyst for a future where education empowers, connects, and illuminates the path to a better world.
            </p>
          </div>
          <div className="meeting-image">
            <img src={meetingImage} alt="Team Meeting" />
          </div>

          {/* Student Orientation Section */}
          <div className="orientation-section">
            <h3 className="section-subtitle">Student Orientation with Diravenir</h3>
            
            <div className="orientation-grid">
              <div className="orientation-card">
                <div className="orientation-icon">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <h4>1. Personalized Guidance and Counseling</h4>
                <p>Diravenir offers personalized orientation sessions for students. Our goal is to answer their questions, clarify their academic path choices, and guide them toward the right international study solution that matches their academic profile and aspirations.</p>
              </div>
              
              <div className="orientation-card">
                <div className="orientation-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h4>2. Workshops & Public Events</h4>
                <p>We regularly organize interactive workshops, like those held in February 2025, enabling students to take action through exchanges, advice, and testimonials.</p>
              </div>
              
              <div className="orientation-card">
                <div className="orientation-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h4>3. Student Fair Participation</h4>
                <p>Diravenir participated in the International Student Forum 2025 (Casablanca, April 2025), offering free individual consultations and direct orientation during the event.</p>
              </div>
              
              <div className="orientation-card">
                <div className="orientation-icon">
                  <i className="fas fa-laptop"></i>
                </div>
                <h4>4. Digital Educational Content</h4>
                <p>On Instagram and YouTube, Diravenir shares motivational reels, testimonials from scholarship students, and tips for excelling in the baccalaureate or applying to universities abroad.</p>
              </div>
              
              <div className="orientation-card full-width">
                <div className="orientation-icon">
                  <i className="fas fa-globe-africa"></i>
                </div>
                <h4>5. Comprehensive International Support</h4>
                <p>We provide expert guidance on:</p>
                <ul className="orientation-list">
                  <li>Selecting the right country and university (Cyprus, China, and Romania)</li>
                  <li>Preparing application documents and submissions</li>
                  <li>Accessing scholarship opportunities</li>
                  <li>Organizing accommodation and logistics</li>
                </ul>
              </div>
            </div>
            
            <div className="orientation-image-container">
              <img src={orientationImage} alt="Student Orientation" className="orientation-image" />
            </div>
          </div>
          
          <h3 className="section-subtitle">Let's make your future career successful</h3>
          <div className="contact-section">
            <div className="contact-grid">
              <div className="contact-image">
                <img src={passeportImage} alt="Passeport" />
              </div>
              <div className="contact-links">
                <div className="contact-item">
                  <div className="contact-label">E-mail Address</div>
                  <div className="contact-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <a href="mailto:contact@diravenir.com" className="contact-link">
                    contact@diravenir.com
                  </a>
                </div>
                <div className="contact-item">
                  <div className="contact-label">Website</div>
                  <div className="contact-icon">
                    <i className="fa fa-globe"></i>
                  </div>
                  <a href="https://www.diravenir.com" className="contact-link">
                    www.diravenir.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h2 className="section-title">Build your career with us</h2>
          <p className="section-text">
            Contact a team that has witnessed the magic of education abroad. Esteemed co-founders have strong experiences in leading destinations worldwide.
          </p>
          <h3 className="cofounders-title">Co-founders of DIRAVENIR</h3>
          <div className="cofounders-section">
            <div className="cofounder-card">
              <a 
                href="https://www.instagram.com/meryemderni?igsh=YmJuZGtweXB3NG00" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cofounder-image-link"
                title="Visit Meryem's Instagram"
              >
                <div className="cofounder-image">
                  <img src={meryemImage} alt="Meryem Derni" />
                </div>
              </a>
              <h4 className="cofounder-name">Meryem Derni</h4>
              <p className="cofounder-degree">MSc in France</p>
            </div>
            <div className="cofounder-card">
              <a 
                href="https://www.instagram.com/nadia.boukdir/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cofounder-image-link"
              >
                <div className="cofounder-image">
                  <img src={nadiaImage} alt="Nadia Boukdir" />
                </div>
              </a>
              <h4 className="cofounder-name">Nadia Boukdir</h4>
              <p className="cofounder-degree">MSc in the United Kingdom</p>
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="values-section">
          <h2 className="section-title">Building a Brighter Tomorrow Through Education</h2>
          <div className="values-grid">
            <div className="values-card">
              <h3 className="values-title">Our core values</h3>
              <p className="values-text">
                Our core values define who we are: honesty in all our actions, a steadfast focus on empowering students, a growth-oriented mindset that fuels progress, and an unwavering belief in the potential of every individual to achieve greatness.
              </p>
            </div>
            <div className="values-card">
              <h3 className="values-title">Our vision</h3>
              <p className="values-text">
                Envisions a world where education transcends borders, unlocking boundless opportunities for every individual
              </p>
            </div>
            <div className="values-card">
              <h3 className="values-title">Our mission</h3>
              <p className="values-text">
                We build students futures by providing comprehensive academic guidance, international scholarships, global internships, and volunteering opportunities, ensuring they have the support and resources needed to succeed and realize their dreams abroad
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="partners-section">
          <h3 className="section-title">Our Partners</h3>
          <div className="partners-grid">
            <div className="partner-item">
              <h4>Final International University</h4>
              <p>Leading university in Cyprus offering quality education</p>
            </div>
            <div className="partner-item">
              <h4>Cyprus International University</h4>
              <p>International university with diverse programs</p>
            </div>
            <div className="partner-item">
              <h4>BAU</h4>
              <p>Bahçeşehir University - Excellence in education</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
