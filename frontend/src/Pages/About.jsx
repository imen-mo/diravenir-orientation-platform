import React from 'react';
import './About.css';
import romaniaImage from '../assets/ROMANIA.jpg';
import cyprusImage from '../assets/chypre.jpg';
import chinaImage from '../assets/CHINA.jpg';
import meetingImage from '../assets/meeting.png';
import passeportImage from '../assets/passeport.png';
import meryemImage from '../assets/meryemderni.jpg';
import nadiaImage from '../assets/nadiaboukdir.jpg';
import diravenirLogo from '../assets/DIRAVENIR.jpg';

const About = () => {
  return (
    <div className="about-container">
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
          <h3 className="section-subtitle">Let's make your future career successful</h3>
          <p className="section-text">
            As a newcomer, we bring a spirit of enthusiasm, dedication, and a commitment to redefining the landscape of International education.
          </p>
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
              <div className="cofounder-image">
                <img src={meryemImage} alt="Meryem Derni" />
              </div>
              <h4 className="cofounder-name">Meryem Derni</h4>
              <p className="cofounder-degree">MSc in France</p>
            </div>
            <div className="cofounder-card">
              <div className="cofounder-image">
                <img src={nadiaImage} alt="Nadia Boukdir" />
              </div>
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
          <h3 className="section-title">Our partners</h3>
          <ul className="partners-list">
            <li>• Final International University</li>
            <li>• Near East University</li>
            <li>• Cyprus International University</li>
            <li>• Eastern Mediterranean University</li>
            <li>• Bahçeşehir Cyprus University (BAU)</li>
            <li>• University of Kyrenia (probable)</li>
            <li>• Maltepe University</li>
            <li>• Eurasian Universities Union (EURAS)</li>
            <li>• Modern University College (Palestine) (probable)</li>
            <li>• Al Akhawayn University (Maroc) (probable)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
