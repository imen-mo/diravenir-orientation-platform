import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslations } from "../hooks/useTranslations";

import logo from "../assets/logo_diravenir.png";
import fille from "../assets/fille.png";
import orientation from "../assets/orientation.png";
import chinaImage from "../assets/CHINA.jpg";
import cyprusImage from "../assets/chypre.jpg";
import romaniaImage from "../assets/ROMANIA.jpg";
import bauImage from "../assets/BAU.png";
import cyprusUniImage from "../assets/Cyprus International University.png";
import finalUniImage from "../assets/Final International University.png";
import programSelectorImage from "../assets/programselector.png";
import scenarioImage from "../assets/scenario.png";
import quizzesImage from "../assets/quizstests.png";
import gamificationImage from "../assets/gamification.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import careerOrientation from "../assets/CareerOrientation.png";
import how1 from "../assets/how1.png";
import how2 from "../assets/how2.png";
import avatarA from "../assets/avatarA.png";
import avatarB from "../assets/avatarB.png";
import avatarC from "../assets/avatarC.png";
import { fetchFilieres, fetchTemoignages, fetchDestinations, fetchPartenaires } from "../services/api";
import GlobalLayout from "../components/GlobalLayout";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslations();
  const [programs, setPrograms] = useState([]);
  const [temoignages, setTemoignages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [partenaires, setPartenaires] = useState([]);
  // OAuth2 removed - no authentication needed
  const [currentAICard, setCurrentAICard] = useState(0);

  console.log('🔍 HomePage composant rendu');

  // Fonctions pour le carousel AI
  const nextAICard = () => {
    setCurrentAICard((prev) => (prev + 1) % 4);
  };

  const prevAICard = () => {
    setCurrentAICard((prev) => (prev - 1 + 4) % 4);
  };

  // Auto-play désactivé - le carousel ne change que manuellement
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentAICard((prev) => (prev + 1) % 4);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    console.log('🔍 HomePage useEffect exécuté');

    // OAuth2 removed - no authentication needed

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
      <GlobalLayout activePage="home">
        <div className="home-page">
          {/* Hero Section */}
          <section className="hero-section">

            <div className="hero-content">
              <div className="hero-text">
                <h1>
                <span className="line-1">{t('guideYourWay')}</span>
                <span className="line-2">{t('upToSuccess')}</span>
                <span className="line-3">{t('withUs')}</span>
                </h1>
              <p>{t('getGuidance')}</p>
                <div className="search-container">
                <input type="text" placeholder={t('searchProgram')} className="search-input" />
                <button className="search-btn">{t('search')}</button>
                </div>
                <div className="tags">
                <span className="tag active">{t('cloudComputing')}</span>
                <span className="tag">{t('cyberSecurity')}</span>
                <span className="tag">{t('devOps')}</span>
                <span className="tag">{t('dataScience')}</span>
                <span className="tag">{t('softwareTesting')}</span>
                </div>
              </div>
              <div className="hero-image">
                <img src={fille} alt="Student Success" className="main-illustration" />
              </div>
            </div>
          </section>

          {/* AI Based Sections */}
          <section className="ai-sections">
            <div className="ai-hero-content">
              <div className="ai-title-section">
                <h2>
                <span className="title-main">{t('moroccoFirstAI')}</span>
                <span className="title-highlight">{t('orientationPlatform')}</span>
                </h2>
              </div>
              <div className="ai-cards-grid">
                <div
                    className={`ai-card-stable ${currentAICard === 0 ? 'active' : currentAICard === 3 ? 'prev' : 'next'}`}
                    onClick={() => navigate('/program-selector')}
                >
                  <div className="ai-card-image">
                    <img src={programSelectorImage} alt="AI Program Selector" />
                  </div>
                <h3>{t('aiBasedPrograms')}</h3>
                </div>
                <div
                    className={`ai-card-stable ${currentAICard === 1 ? 'active' : currentAICard === 0 ? 'prev' : 'next'}`}
                    onClick={() => navigate('/scenarios')}
                >
                  <div className="ai-card-image">
                    <img src={scenarioImage} alt="AI Scenarios" />
                  </div>
                <h3>{t('aiBasedScenarios')}</h3>
                </div>
                <div
                    className={`ai-card-stable ${currentAICard === 2 ? 'active' : currentAICard === 1 ? 'prev' : 'next'}`}
                    onClick={() => navigate('/quizzes')}
                >
                  <div className="ai-card-image">
                    <img src={quizzesImage} alt="AI Quizzes/Tests" />
                  </div>
                <h3>{t('aiBasedQuizzes')}</h3>
                </div>
                <div
                    className={`ai-card-stable ${currentAICard === 3 ? 'active' : currentAICard === 2 ? 'prev' : 'next'}`}
                    onClick={() => navigate('/goals')}
                >
                  <div className="ai-card-image">
                    <img src={gamificationImage} alt="AI Gamification" />
                  </div>
                <h3>{t('aiBasedGamification')}</h3>
                </div>

                {/* Boutons de navigation RAPPROCHÉS */}
                <div className="carousel-nav-buttons">
                  <button className="nav-btn prev-btn" onClick={prevAICard}>
                    &lt;
                  </button>
                  <button className="nav-btn next-btn" onClick={nextAICard}>
                    &gt;
                  </button>
                </div>

                {/* Indicateurs de position */}
                <div className="carousel-indicators">
                  {[0, 1, 2, 3].map((index) => (
                      <button
                          key={index}
                          className={`indicator-dot ${currentAICard === index ? 'active' : ''}`}
                          onClick={() => setCurrentAICard(index)}
                      />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Who Can Join */}
          <section className="who-can-join">
            <div className="career-title-section">
              <h2>
              <span className="career-title-main">{t('careerOrientationTitle')}</span>
              <span className="career-title-highlight">{t('careerOrientationForAll')}</span>
              </h2>
            </div>
            <div className="career-orientation-container">
              <div className="career-images-left">
                <div className="career-image-grid">
                  <div className="career-image-item">
                    <img src={image1} alt="Career Orientation 1" />
                  </div>
                  <div className="career-image-item">
                    <img src={image2} alt="Career Orientation 2" />
                  </div>
                  <div className="career-image-item">
                    <img src={image3} alt="Career Orientation 3" />
                  </div>
                  <div className="career-image-item">
                    <img src={image4} alt="Career Orientation 4" />
                  </div>
                </div>
              </div>
              <div className="career-orientation-right">
                <img src={careerOrientation} alt="Career Orientation" />
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="how-it-works">
            <div className="how-title-section">
              <h2>
              <span className="how-title-main">{t('howItWorksTitle')}</span>
              </h2>
            </div>
            <div className="how-it-works-container">
              <div className="how-image-left">
                <img src={how1} alt="How It Works 1" />
              </div>
              <div className="steps-container">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                  <h3>{t('step1Title')}</h3>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                  <h3>{t('step2Title')}</h3>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                  <h3>{t('step3Title')}</h3>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-content">
                  <h3>{t('step4Title')}</h3>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <div className="step-content">
                  <h3>{t('step5Title')}</h3>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">6</div>
                  <div className="step-content">
                  <h3>{t('step6Title')}</h3>
                  </div>
                </div>
              </div>
              <div className="how-image-right">
                <img src={how2} alt="How It Works 2" />
              </div>
            </div>
          </section>

           {/* Popular Programs */}
           <section className="popular-programs">
          <h2>{t('popularProgramsTitle')}</h2>
             <div className="programs-grid">
               {Array.isArray(programs) && programs.length > 0 ? (
              // Prendre les 8 premiers programmes de la base de données
              programs.slice(0, 8).map((program, idx) => (
                <div key={program.id || idx} className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo">
                      <img 
                        src={program.universiteLogoUrl || program.universityLogo || '/images/placeholder-logo.png'} 
                        alt={program.universities || program.university || 'University'} 
                        onError={(e) => {
                          e.target.src = '/images/placeholder-logo.png';
                        }}
                      />
                           </div>
                         </div>
                  <div className="card-content-university">
                    <h3>{program.program || program.nom || 'Program'}</h3>
                    <p>{program.description || program.domaine || 'Program description not available.'}</p>
                    <div className="program-actions">
                      <button className="btn-secondary" onClick={() => navigate(`/program/${program.id}`)}>More Info</button>
                      <button className="btn-secondary">Save This</button>
                           </div>
                    <button className="btn-primary" onClick={() => navigate('/apply', {
                                 state: {
                                   program: {
                          id: program.id,
                          name: program.program || program.nom,
                          type: program.category || program.type,
                          university: program.universities || program.university,
                          logo: program.universiteLogoUrl || program.universityLogo,
                          applicationFee: program.applicationFee || 4000,
                          serviceFee: program.serviceFee || 11000,
                          duration: program.duration || '4 Years',
                          level: program.degreeType || 'Bachelor',
                          language: program.language || 'English',
                          tuitionFees: program.tuitionFees || 'Starting from $2,500',
                          category: program.category || 'General',
                          campusCity: program.campusCity || 'City',
                          destinationName: program.destination?.nom || 'Destination'
                        }
                      }
                    })}>Apply Now</button>
                         </div>
                       </div>
                   ))
               ) : (
              // Fallback avec programmes fixes si pas de données
              <>
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-1">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/University_of_Toronto_CoA.svg/1200px-University_of_Toronto_CoA.svg.png" alt="University of Toronto" />
                         </div>
                       </div>
                  <div className="card-content-university">
                    <h3>Computer Science</h3>
                    <p>Advanced program in computer science with focus on software development and algorithms.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                         </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                       </div>
                     </div>
                     
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-2">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Harvard_University_seal.svg/1200px-Harvard_University_seal.svg.png" alt="Harvard University" />
                         </div>
                       </div>
                  <div className="card-content-university">
                    <h3>Business Administration</h3>
                    <p>Comprehensive business program covering management, finance, and entrepreneurship.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                         </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                       </div>
                     </div>
                     
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-3">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/MIT_Seal.svg/1200px-MIT_Seal.svg.png" alt="MIT" />
                         </div>
                       </div>
                  <div className="card-content-university">
                    <h3>Data Science</h3>
                    <p>Interdisciplinary field that uses scientific methods to extract insights from data.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                         </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                       </div>
                     </div>
                     
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-4">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png" alt="Stanford University" />
                         </div>
                       </div>
                  <div className="card-content-university">
                    <h3>Engineering</h3>
                    <p>Technical program focusing on problem-solving and innovation in engineering.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                         </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                       </div>
                     </div>
                     
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-5">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/University_of_Oxford_seal.svg/1200px-University_of_Oxford_seal.svg.png" alt="University of Oxford" />
                         </div>
                       </div>
                  <div className="card-content-university">
                    <h3>Medicine</h3>
                    <p>Medical program preparing students for careers in healthcare and medicine.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                         </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                       </div>
                     </div>
                     
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-6">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/University_of_Cambridge_seal.svg/1200px-University_of_Cambridge_seal.svg.png" alt="University of Cambridge" />
                    </div>
                  </div>
                  <div className="card-content-university">
                    <h3>Architecture</h3>
                    <p>Creative program combining design, technology, and environmental considerations.</p>
                    <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                  </div>
                         </div>
                
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-7">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Princeton_University_seal.svg/1200px-Princeton_University_seal.svg.png" alt="Princeton University" />
                       </div>
                         </div>
                  <div className="card-content-university">
                    <h3>Finance</h3>
                    <p>Financial program covering investment, banking, and corporate finance.</p>
                         <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                  </div>
                </div>
                
                <div className="program-card-university">
                  <div className="card-header-university">
                    <div className="university-logo university-8">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Yale_University_Shield_1.svg/1200px-Yale_University_Shield_1.svg.png" alt="Yale University" />
                    </div>
                  </div>
                  <div className="card-content-university">
                    <h3>Psychology</h3>
                    <p>Study of human behavior and mental processes in various contexts.</p>
                    <div className="program-actions">
                      <button className="btn-secondary">More Info</button>
                      <button className="btn-secondary">Save This</button>
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/apply')}>Apply Now</button>
                  </div>
                </div>
                   </>
               )}
             </div>
          <button className="view-all-btn" onClick={() => navigate('/programs')}>View All Opportunities</button>
           </section>

          {/* Achievements */}
          <section className="achievements">
          <h2>
            <span className="achievement-our">{t('achievementsTitle').split(' ')[0]}</span>
            <span className="achievement-achievement">{t('achievementsTitle').split(' ').slice(1).join(' ')}</span>
          </h2>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">200</div>
              <div className="stat-label">{t('studentsAbroad')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">70</div>
              <div className="stat-label">{t('programsAvailable')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">90%</div>
              <div className="stat-label">{t('studentsSatisfied')}</div>
              </div>
            </div> 
          </section>

          {/* Testimonials - Design sophistiqué exact de l'image 2 */}
          <section className="testimonials">
            <div className="testimonials-title-section">
              <h2>
              <span className="testimonials-title-from">{t('from')}</span>
              <span className="testimonials-title-dreamers">{t('dreamers')}</span>
              <span className="testimonials-title-to">{t('to')}</span>
              <span className="testimonials-title-achievers">{t('achievers')}</span>
              <span className="testimonials-title-and">{t('and')}</span>
              <span className="testimonials-title-doors">{t('doors')}</span>
              </h2>
            </div>
            
             <div className="testimonials-carousel">
               <div className="testimonials-list">
                 <div className="testimonials-slide">
                   {/* Carte 1 - Computer Science - University of Toronto */}
                   <div className="testimonial-card">
                     <div className="testimonial-badge scholarship-a">
                       <span>{t('diravenirScholar')}</span>
                     </div>
                     
                     <div className="testimonial-content">
                       <div className="student-illustration male"></div>
                       <h4>Anir Chentre</h4>
                       <div className="testimonial-field">Computer Science</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">6 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('scholarshipA')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('bachelor')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>I want to sincerely thank Diravenir for their professional, honest, and transparent service. Their integrity stood out and made the whole process smooth. I highly recommend them.</p>
                     </div>
                   </div>

                   {/* Carte 2 - Business Administration - Harvard University */}
                   <div className="testimonial-card">
                     <div className="testimonial-content">
                       <div className="student-illustration female"></div>
                       <h4>Fatimazahra Naim</h4>
                       <div className="testimonial-field">Business Administration</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">3 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('selfSponsor')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('master')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>I highly recommend Diravenir to anyone planning to study abroad, especially in China. The team is professional, responsive, and truly understanding.</p>
                     </div>
                   </div>

                   {/* Carte 3 - Data Science - MIT */}
                   <div className="testimonial-card">
                     <div className="testimonial-badge scholarship-b">
                       <span>{t('diravenirScholar')}</span>
                     </div>
                     
                     <div className="testimonial-content">
                       <div className="student-illustration male"></div>
                       <h4>El Abbadi Hind</h4>
                       <div className="testimonial-field">Data Science</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">6 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('scholarshipB')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('master')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>I would like to extend my heartfelt thanks and appreciation to Diravenir for their outstanding services. They have demonstrated a high level of professionalism and exceptional commitment to meeting my needs.</p>
                     </div>
                   </div>

                   {/* Carte 4 - Engineering - Stanford University */}
                   <div className="testimonial-card">
                     <div className="testimonial-badge scholarship-c">
                       <span>{t('diravenirScholar')}</span>
                     </div>
                     
                     <div className="testimonial-content">
                       <div className="student-illustration female"></div>
                       <h4>Sarah Johnson</h4>
                       <div className="testimonial-field">Engineering</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">4 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('scholarshipC')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('bachelor')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>Diravenir made my dream of studying engineering at Stanford a reality. Their guidance and support throughout the application process was exceptional.</p>
                     </div>
                   </div>

                   {/* Carte 5 - Medicine - University of Oxford */}
                   <div className="testimonial-card">
                     <div className="testimonial-content">
                       <div className="student-illustration male"></div>
                       <h4>Ahmed Hassan</h4>
                       <div className="testimonial-field">Medicine</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">2 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('selfSponsor')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('master')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>The medical program at Oxford through Diravenir exceeded all my expectations. The quality of education and support is outstanding.</p>
                     </div>
                   </div>

                   {/* Carte 6 - Architecture - University of Cambridge */}
                   <div className="testimonial-card">
                     <div className="testimonial-badge scholarship-a">
                       <span>{t('diravenirScholar')}</span>
                     </div>
                     
                     <div className="testimonial-content">
                       <div className="student-illustration female"></div>
                       <h4>Maria Rodriguez</h4>
                       <div className="testimonial-field">Architecture</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">5 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('scholarshipA')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('bachelor')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>Studying architecture at Cambridge through Diravenir has been an incredible journey. The program is world-class and the support is unmatched.</p>
                     </div>
                   </div>

                   {/* Carte 7 - Finance - Princeton University */}
                   <div className="testimonial-card">
                     <div className="testimonial-content">
                       <div className="student-illustration male"></div>
                       <h4>David Kim</h4>
                       <div className="testimonial-field">Finance</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">3 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('selfSponsor')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('master')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>Princeton's finance program through Diravenir opened doors I never thought possible. The education quality and career opportunities are exceptional.</p>
                     </div>
                   </div>

                   {/* Carte 8 - Psychology - Yale University */}
                   <div className="testimonial-card">
                     <div className="testimonial-badge scholarship-b">
                       <span>{t('diravenirScholar')}</span>
                     </div>
                     
                     <div className="testimonial-content">
                       <div className="student-illustration female"></div>
                       <h4>Emma Thompson</h4>
                       <div className="testimonial-field">Psychology</div>
                       
                       <div className="testimonial-rating">
                         <div className="stars">
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                           <span>★</span>
                         </div>
                         <span className="time">4 Month Ago</span>
                       </div>
                       
                       <div className="testimonial-details">
                         <div className="detail-item">
                           <span className="detail-icon">📄</span>
                           <span>{t('scholarshipB')}</span>
                         </div>
                         <div className="detail-item">
                           <span className="detail-icon">🎓</span>
                           <span>{t('bachelor')}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="testimonial-text">
                       <p>Yale's psychology program through Diravenir has been transformative. The faculty, resources, and learning environment are truly world-class.</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </section>

          {/* Destinations */}
          <section className="destinations">
          <h2><span className="our-text">{t('destinationsTitle').split(' ')[0]}</span> <span className="destinations-text">{t('destinationsTitle').split(' ').slice(1).join(' ')}</span></h2>
            <div className="destinations-list">
              {Array.isArray(destinations) && destinations.length > 0 ? (
                  destinations.map((d, idx) => (
                      <Link
                          key={idx}
                          to={`/destinations/${d.nom.toLowerCase()}`}
                          className="destination-card"
                          style={{ textDecoration: 'none' }}
                      >
                        <div className="destination-name">{d.nom}</div>
                      </Link>
                  ))
              ) : (
                  // Fallback destinations with background images and prices
                  <>
                    <Link to="/destinations/china" className="destination-card china-bg" style={{ textDecoration: 'none' }}>
                  <div className="destination-name">{t('china')}</div>
                    </Link>
                    <Link to="/destinations/cyprus" className="destination-card cyprus-bg" style={{ textDecoration: 'none' }}>
                  <div className="destination-name">{t('cyprus')}</div>
                    </Link>
                    <Link to="/destinations/romania" className="destination-card romania-bg" style={{ textDecoration: 'none' }}>
                  <div className="destination-name">{t('romania')}</div>
                    </Link>
                  </>
              )}
            </div>
          </section>

          {/* Partners */}
          <section className="partners">
          <h2><span className="our-text">Our</span> <span className="partners-text">Partners</span></h2>
            <div className="partners-list">
              {Array.isArray(partenaires) && partenaires.length > 0 ? (
                  partenaires.map((p, idx) => (
                      <div key={idx} className="partner-card">
                        {p.logoUrl && <img src={p.logoUrl} alt={p.nom} />}
                      </div>
                  ))
              ) : (
                  // Fallback partners with background images and website links
                  <>
                    <a
                        href="https://www.final.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-card"
                    >
                      <div className="partner-logo">
                        <img src={finalUniImage} alt="Final International University" />
                      </div>
                    </a>

                    <a
                        href="https://www.ciu.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-card"
                    >
                      <div className="partner-logo">
                        <img src={cyprusUniImage} alt="Cyprus International University" />
                      </div>
                    </a>

                    <a
                        href="https://www.bau.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-card"
                    >
                      <div className="partner-logo">
                        <img src={bauImage} alt="BAU - Bahçeşehir University" />
                      </div>
                    </a>
                  </>
              )}
            </div>
          </section>



        </div>
      </GlobalLayout>
  );
};

export default HomePage;
