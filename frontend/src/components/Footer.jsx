import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
      <footer className="footer" style={{ backgroundColor: '#40004C', color: '#fff', padding: '40px 20px' }}>
        <div
            className="footer-container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '60px', // 👈 Ajout d'un écart visuel entre les colonnes
              maxWidth: '1200px',
              margin: '0 auto',
            }}
        >
          {/* LEFT */}
          <div
              className="footer-section"
              style={{
                flex: '1',
                minWidth: '300px',
                marginBottom: '30px',
                marginLeft: '0', // 👈 Collé à gauche
              }}
          >
            <img
                src={logo}
                alt="Diravenir Logo"
                style={{ height: '90px', marginBottom: '30px', display: 'block' }}
            />
            <p style={{ lineHeight: '1.8' }}>
              Diravenir is a web platform that supports students in their academic orientation and application processes both in Morocco and abroad. It stands out through a personalized approach based on assessments, tailored recommendations, and guidance prior to any application.
            </p>

            <div style={{ marginTop: '25px' }}>
              <h4 style={{ color: '#ccc', marginBottom: '10px' }}>Subscribe to Our Newsletter</h4>
              <form style={{ display: 'flex', borderBottom: '1px solid #666', maxWidth: '300px' }}>
                <input
                    type="email"
                    placeholder="Your email address"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      flex: 1,
                      padding: '10px 0',
                    }}
                />
                <button
                    type="submit"
                    style={{
                      backgroundColor: '#FFC300',
                      border: 'none',
                      color: '#40004C',
                      padding: '10px 16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                >
                  &gt;
                </button>
              </form>
            </div>

            <div style={{ marginTop: '20px', fontSize: '14px', display: 'flex', gap: '20px' }}>
              <Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link to="/privacy" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
          </div>

          {/* CENTER */}
          <div className="footer-section" style={{ flex: '1', minWidth: '200px', marginBottom: '30px' }}>
            <h4 style={{ color: '#ccc', marginBottom: '15px' }}>
              Quick <span style={{ color: '#FFC300' }}>Links</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
              <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/orientation" style={{ color: '#fff', textDecoration: 'none' }}>Orientation</Link></li>
              <li><Link to="/programs" style={{ color: '#fff', textDecoration: 'none' }}>Best Programs</Link></li>
              <li><Link to="/faq" style={{ color: '#fff', textDecoration: 'none' }}>Your FAQ’s</Link></li>
              <li><Link to="/cancellation" style={{ color: '#fff', textDecoration: 'none' }}>Cancellation & Refunds</Link></li>
              <li><Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="footer-section" style={{ flex: '1', minWidth: '250px', marginBottom: '30px' }}>
            <h4 style={{ color: '#ccc', marginBottom: '15px' }}>
              Contact <span style={{ color: '#FFC300' }}>Us</span>
            </h4>
            <div style={{ lineHeight: '2' }}>
              <p>📍 BD la Résistance, 179, Angle des Boulevards de Londres, Av. Mers Sultan, Casablanca 20250</p>
              <p>✉️ contact@diravenir.com</p>
              <p>📞 +212 771 497 646</p>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '15px', fontSize: '20px' }}>
              <a href="https://facebook.com/profile.php?id=61553731883991" target="_blank" rel="noreferrer" style={{ color: '#fff' }}><FaFacebookF /></a>
              <a href="https://twitter.com/diravenir" target="_blank" rel="noreferrer" style={{ color: '#fff' }}><FaTwitter /></a>
              <a href="https://www.instagram.com/diravenir/" target="_blank" rel="noreferrer" style={{ color: '#fff' }}><FaInstagram /></a>
              <a href="https://linkedin.com/company/diravenir" target="_blank" rel="noreferrer" style={{ color: '#fff' }}><FaLinkedinIn /></a>
              <a href="https://www.youtube.com/@Diravenir/videos" target="_blank" rel="noreferrer" style={{ color: '#fff' }}><FaYoutube /></a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
