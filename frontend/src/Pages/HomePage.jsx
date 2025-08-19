import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-colorfull.png";
import illustration from "../assets/illustration.png";
import meeting from "../assets/meeting.png";
import orientation from "../assets/orientation.png";
import chinaImage from "../assets/CHINA.jpg";
import cyprusImage from "../assets/chypre.jpg";
import romaniaImage from "../assets/ROMANIA.jpg";
import bauImage from "../assets/BAU.png";
import cyprusUniImage from "../assets/Cyprus International University.png";
import finalUniImage from "../assets/Final International University.png";
import { fetchFilieres, fetchTemoignages, fetchDestinations, fetchPartenaires } from "../services/api";
import UserStatusIndicator from "../components/UserStatusIndicator";
import LoginTest from "../components/LoginTest";
import Footer from "../components/Footer";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userStatus, logout } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [temoignages, setTemoignages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [partenaires, setPartenaires] = useState([]);
  const [oauth2Success, setOauth2Success] = useState(false);
  const [oauth2Email, setOauth2Email] = useState('');
  const [oauth2Token, setOauth2Token] = useState('');

  console.log('🔍 HomePage composant rendu');
  console.log('👤 Utilisateur connecté:', user);
  console.log('📊 Statut utilisateur:', userStatus);

  useEffect(() => {
    console.log('🔍 HomePage useEffect exécuté');
    
    // Détecter la connexion OAuth2 réussie
    const oauth2Param = searchParams.get('oauth2');
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    
    if (oauth2Param === 'success' && emailParam && tokenParam) {
      setOauth2Success(true);
      setOauth2Email(emailParam);
      setOauth2Token(tokenParam);
      
      // Stocker le token dans localStorage pour l'authentification
      localStorage.setItem('token', tokenParam);
      
      // Nettoyer l'URL après 5 secondes
      setTimeout(() => {
        setOauth2Success(false);
        navigate('/', { replace: true });
      }, 5000);
    }

    // Charger les programmes
    fetchFilieres()
      .then(data => {
        console.log('✅ Programmes chargés:', data);
        setPrograms(data);
      })
      .catch(err => console.error("❌ Erreur lors du chargement des filières:", err));

    // Charger les témoignages
    fetchTemoignages()
      .then(data => {
        console.log('✅ Témoignages chargés:', data);
        setTemoignages(data);
      })
      .catch(err => console.error("❌ Erreur lors du chargement des témoignages:", err));

    // Charger les destinations
    fetchDestinations()
      .then(data => {
        console.log('✅ Destinations chargées:', data);
        setDestinations(data);
      })
      .catch(err => console.error("❌ Erreur lors du chargement des destinations:", err));

    // Charger les partenaires
    fetchPartenaires()
      .then(data => {
        console.log('✅ Partenaires chargés:', data);
        setPartenaires(data);
      })
      .catch(err => console.error("❌ Erreur lors du chargement des partenaires:", err));
  }, [searchParams, navigate]);

  return (
    <div className="home-page">
      {/* Design professionnel et élégant */}

      {/* Hero Section */}
      <section className="hero-section">
        {/* Profil Utilisateur Connecté */}
        {user && (
          <div className="user-profile-banner">
            <div className="user-profile-content">
              <div className="user-info">
                <div className="user-avatar">
                  <span className="user-avatar-text">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="user-details">
                  <h3 className="user-welcome">Bienvenue !</h3>
                  <p className="user-email">{user.email}</p>
                  <UserStatusIndicator />
                </div>
              </div>
              <div className="user-actions">
                <button 
                  onClick={() => navigate('/profile')}
                  className="user-profile-btn"
                >
                  👤 Mon Profil
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="user-dashboard-btn"
                >
                  📊 Tableau de Bord
                </button>
                <button 
                  onClick={logout}
                  className="user-logout-btn"
                >
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message de bienvenue OAuth2 */}
        {oauth2Success && (
          <div className="oauth2-welcome-banner">
            <div className="oauth2-welcome-content">
              <div className="oauth2-welcome-icon">🎉</div>
              <div className="oauth2-welcome-text">
                <h3>Bienvenue !</h3>
                <p>Vous êtes maintenant connecté avec votre compte Google ({oauth2Email})</p>
                <div className="oauth2-actions">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="oauth2-profile-btn"
                  >
                    👤 Voir mon profil
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="oauth2-dashboard-btn"
                  >
                    📊 Mon tableau de bord
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="magic-title">Guide Your Way Up To Success With Us</h1>
            <p className="magic-subtitle">Get the guidance you need for the future of work.</p>
            <div className="search-container">
              <input type="text" placeholder="Search the program you want" className="search-input" />
              <button className="search-btn magic-btn">Search</button>
            </div>
            <div className="tags">
              <span className="tag active magic-tag">Cloud Computing</span>
              <span className="tag magic-tag">Cyber Security</span>
              <span className="tag magic-tag">DevOps</span>
              <span className="tag magic-tag">Data Science</span>
              <span className="tag magic-tag">Software Testing</span>
            </div>
            <div className="hero-buttons">
              <button className="hero-btn primary magic-btn" onClick={() => navigate('/programs/data-analyst')}>
                Data Analyst
              </button>
              <button className="hero-btn secondary magic-btn" onClick={() => navigate('/programs/website-design')}>
                Website Design
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={illustration} alt="Student Success" className="main-illustration magic-image" />
            <div className="floating-card magic-card">
              <div className="card-header">
                <span className="card-title">Best programs</span>
              </div>
              <div className="card-content">
                <div className="program-item">
                  <div className="program-icon purple magic-icon">📊</div>
                  <div className="program-info">
                    <span className="program-name">Data Analyst</span>
                    <span className="program-reviews">280 Reviews</span>
                  </div>
                </div>
                <div className="program-item">
                  <div className="program-icon yellow magic-icon">🎨</div>
                  <div className="program-info">
                    <span className="program-name">Website Design</span>
                    <span className="program-reviews">216 Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="dotted-decoration"></div>
        <div className="story-container">
          <div className="story-content">
            <h2 className="story-subtitle magic-subtitle">OUR STORY</h2>
            <h3 className="story-title magic-title">Innovate in New Ways to Guide Students</h3>
            <p className="story-text magic-text">
              We believe in the power of purpose-driven learning and bold imagination. We see no limits to what we can build when curiosity meets community, when dreams are backed by action.
              <br /><br />
              We are not just educating the next generation, we are co-creating the future with them. Each scholar is a builder, a thinker, a doer. Together, we are shaping futures that matter.
              <br /><br />
              This is more than a platform. This is a movement for those who dare to dream and work to build.
            </p>
          </div>
          <div className="story-image">
            {/* Replace with your actual image path */}
            <img src={meeting} alt="Founder" className="founder-image magic-image" />
          </div>
        </div>
      </section>

      {/* AI Based Sections */}
      <section className="ai-sections">
        <div className="dotted-decoration"></div>
        <div className="section-header">
          <h2 className="magic-title">Morocco's First AI Based Orientation Platform</h2>
        </div>
        <div className="ai-cards-container">
          <div className="ai-card magic-card" onClick={() => navigate('/program-selector')}>
            <div className="card-icon">
              <div className="icon-container">
                <div className="brain-icon magic-icon">🧠</div>
                <div className="server-icon magic-icon">🖥️</div>
              </div>
            </div>
            <h3>AI Based Program Selector</h3>
            <p>Find your perfect program with our intelligent matching system</p>
          </div>
          <div className="ai-card magic-card" onClick={() => navigate('/scenarios')}>
            <div className="card-icon">
              <div className="icon-container">
                <div className="scenario-icon magic-icon">📋</div>
                <div className="gear-icon magic-icon">⚙️</div>
              </div>
            </div>
            <h3>AI Based Scenarios</h3>
            <p>Explore real-world scenarios to understand your career path</p>
          </div>
          <div className="ai-card magic-card" onClick={() => navigate('/quizzes')}>
            <div className="card-icon">
              <div className="icon-container">
                <div className="quiz-icon magic-icon">❓</div>
                <div className="brain-icon magic-icon">🧠</div>
              </div>
            </div>
            <h3>AI Based Quizzes/Tests</h3>
            <p>Test your knowledge and skills with our adaptive assessments</p>
          </div>
          <div className="ai-card magic-card" onClick={() => navigate('/goals')}>
            <div className="card-icon">
              <div className="icon-container">
                <div className="code-icon magic-icon">💻</div>
                <div className="tech-icons magic-icon">🔧</div>
              </div>
            </div>
            <h3>AI Based Gamification</h3>
            <p>Set and track your career goals with personalized insights</p>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="who-can-join">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">Career Orientation Schemes For All</h2>
        <div className="target-groups">
          <div className="group-card magic-card">
            <div className="group-icon magic-icon">🎓</div>
            <h3>Colleges/Universities</h3>
          </div>
          <div className="group-card magic-card">
            <div className="group-icon magic-icon">👨‍🎓</div>
            <h3>Students</h3>
          </div>
          <div className="group-card magic-card">
            <div className="group-icon magic-icon">🔄</div>
            <h3>Career Changers</h3>
          </div>
          <div className="group-card magic-card">
            <div className="group-icon magic-icon">🏫</div>
            <h3>Educational Institutions</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-item magic-card">
            <div className="step-number magic-number">1</div>
            <div className="step-content">
              <h3>Orientation Aptitude Tests and diagrams</h3>
            </div>
          </div>
          <div className="step-item magic-card">
            <div className="step-number magic-number">2</div>
            <div className="step-content">
              <h3>Program Cases matching your profil</h3>
            </div>
          </div>
          <div className="step-item magic-card">
            <div className="step-number magic-number">3</div>
            <div className="step-content">
              <h3>Opportunities selection in universities</h3>
            </div>
          </div>
          <div className="step-item magic-card">
            <div className="step-number magic-number">4</div>
            <div className="step-content">
              <h3>Application to a chosen opportunity</h3>
            </div>
          </div>
          <div className="step-item magic-card">
            <div className="step-number magic-number">5</div>
            <div className="step-content">
              <h3>Real Time Tracking of your application</h3>
            </div>
          </div>
          <div className="step-item magic-card">
            <div className="step-number magic-number">6</div>
            <div className="step-content">
              <h3>Application guidance & Monitoring</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="popular-programs">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">Popular Programs</h2>
        <div className="programs-grid">
          {Array.isArray(programs) && programs.length > 0 ? (
            programs.map((prog, idx) => (
              <div key={idx} className="program-card magic-card" onClick={() => navigate(`/programs/${prog.id}`)}>
                <h3>{prog.nom}</h3>
                <p>{prog.domaine}</p>
                <div className="program-price">Starting from $2,500</div>
                <button className="magic-btn">Apply Now</button>
              </div>
            ))
          ) : (
            // Fallback cards si pas de données
            <>
              <div className="program-card magic-card">
                <h3>Computer Science</h3>
                <p>Technology & Engineering</p>
                <div className="program-price">Starting from $2,500</div>
                <button className="magic-btn">Apply Now</button>
              </div>
              <div className="program-card magic-card">
                <h3>Business Administration</h3>
                <p>Business & Management</p>
                <div className="program-price">Starting from $2,800</div>
                <button className="magic-btn">Apply Now</button>
              </div>
              <div className="program-card magic-card">
                <h3>Data Science</h3>
                <p>Technology & Analytics</p>
                <div className="program-price">Starting from $3,200</div>
                <button className="magic-btn">Apply Now</button>
              </div>
            </>
          )}
        </div>
        <button className="view-all-btn magic-btn" onClick={() => navigate('/programs')}>View All Programs</button>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">Our Achievements</h2>
        <div className="stats">
          <div className="stat-item magic-card">
            <div className="stat-number magic-number">200</div>
            <div className="stat-label">Students Abroad</div>
          </div>
          <div className="stat-item magic-card">
            <div className="stat-number magic-number">70</div>
            <div className="stat-label">Programs Available</div>
          </div>
          <div className="stat-item magic-card">
            <div className="stat-number magic-number">90%</div>
            <div className="stat-label">Students Satisfied</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">From Dreamers to Achievers & doers</h2>
        <div className="testimonials-list">
          {Array.isArray(temoignages) && temoignages.length > 0 ? (
            temoignages.map((t, idx) => (
              <div key={idx} className="testimonial-card magic-card">
                <div className={`student-avatar ${idx % 2 === 0 ? 'female' : 'male'}`}></div>
                <h4>{t.nom}</h4>
                <div>{t.programme}</div>
                <p>{t.texte}</p>
                <div>{'★'.repeat(t.etoiles)}</div>
              </div>
            ))
          ) : (
            // Fallback testimonials
            <>
              <div className="testimonial-card magic-card">
                <div className="student-avatar female"></div>
                <h4>Anir chentre</h4>
                <div>Business Administration</div>
                <p>J'ai adoré l'expérience avec DirAvenir. Ils m'ont guidé vers le bon programme.</p>
                <div>★★★★★</div>
              </div>
              <div className="testimonial-card magic-card">
                <div className="student-avatar male"></div>
                <h4>Fatimazahra Naim</h4>
                <div>Cyber Security</div>
                <p>I highly recommend DirAvenir for anyone looking to study abroad.</p>
                <div>★★★★★</div>
              </div>
              <div className="testimonial-card magic-card">
                <div className="student-avatar female"></div>
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
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">Our Destinations</h2>
        <div className="destinations-list">
          {Array.isArray(destinations) && destinations.length > 0 ? (
            destinations.map((d, idx) => (
              <Link 
                key={idx} 
                to={`/destinations/${d.nom.toLowerCase()}`} 
                className="destination-card magic-card"
                style={{ textDecoration: 'none' }}
              >
                <h4>{d.nom}</h4>
                <p>{d.description}</p>
                {d.imageUrl && <img src={d.imageUrl} alt={d.nom} />}
              </Link>
            ))
          ) : (
            // Destinations minimalistes avec images circulaires
            <>
              <Link to="/destinations/china" className="destination-card magic-card" style={{ textDecoration: 'none' }}>
                <img src={chinaImage} alt="China" />
                <div className="destination-overlay">
                  <h4>China</h4>
                  <div className="destination-badge">From $3,500</div>
                </div>
              </Link>
              <Link to="/destinations/cyprus" className="destination-card magic-card" style={{ textDecoration: 'none' }}>
                <img src={cyprusImage} alt="Cyprus" />
                <div className="destination-overlay">
                  <h4>Cyprus</h4>
                  <div className="destination-badge">From $4,200</div>
                </div>
              </Link>
              <Link to="/destinations/romania" className="destination-card magic-card" style={{ textDecoration: 'none' }}>
                <img src={romaniaImage} alt="Romania" />
                <div className="destination-overlay">
                  <h4>Romania</h4>
                  <div className="destination-badge">From $2,800</div>
                </div>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <div className="dotted-decoration"></div>
        <h2 className="magic-title">Our Partners</h2>
        <div className="partners-list">
          {Array.isArray(partenaires) && partenaires.length > 0 ? (
            partenaires.map((p, idx) => (
              <div key={idx} className="partner-card magic-card">
                <h4>{p.nom}</h4>
                <p>{p.description}</p>
                {p.logoUrl && <img src={p.logoUrl} alt={p.nom} />}
                {p.siteWeb && <a href={p.siteWeb} target="_blank" rel="noopener noreferrer">Site Web</a>}
              </div>
            ))
          ) : (
            // Partenaires minimalistes avec images circulaires
            <>
              <a 
                href="https://www.final.edu.tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-card magic-card"
              >
                <img src={finalUniImage} alt="Final International University" />
                <div className="partner-overlay">
                  <h4>Final International University</h4>
                  <div className="partner-badge">Visit Website →</div>
                </div>
              </a>
              
              <a 
                href="https://www.ciu.edu.tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-card magic-card"
              >
                <img src={cyprusUniImage} alt="Cyprus International University" />
                <div className="partner-overlay">
                  <h4>Cyprus International University</h4>
                  <div className="partner-badge">Visit Website →</div>
                </div>
              </a>
              
              <a 
                href="https://www.bau.edu.tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="partner-card magic-card"
              >
                <img src={bauImage} alt="BAU - Bahçeşehir University" />
                <div className="partner-overlay">
                  <h4>BAU - Bahçeşehir University</h4>
                  <div className="partner-badge">Visit Website →</div>
                </div>
              </a>
            </>
          )}
        </div>
      </section>

      {/* Composant de Test de Login */}
      <LoginTest />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage; 