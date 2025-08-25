import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
import GlobalLayout from '../components/GlobalLayout';
import './ProgramDetail.css';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgram();
  }, [id]);

  const loadProgram = async () => {
    try {
      setLoading(true);
      const data = await programService.getById(id);
      setProgram(data);
    } catch (error) {
      console.error('Erreur lors du chargement du programme:', error);
      toast.error('Erreur lors du chargement du programme');
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    // Logique pour postuler au programme
    toast.success('Candidature envoyée avec succès !');
  };

  if (loading) {
    return (
      <div className="program-detail-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du programme...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="program-detail-error">
        <h2>Programme non trouvé</h2>
        <button onClick={() => navigate('/programs')} className="btn-back">
          Retour aux programmes
        </button>
      </div>
    );
  }

  return (
    <GlobalLayout activePage="programs">
      <div className="program-detail-page">
        {/* Header violet avec logo et titre */}
        <div className="program-header">
          <div className="header-content">
            <div className="university-logo-section">
              <div className="university-logo">
                <div className="logo-ring">
                  <div className="logo-text">{program.universities || program.universite?.nom || 'UNIVERSITY'}</div>
                  <div className="logo-center">
                    <div className="chinese-text">{program.universite?.nom || 'UNI'}</div>
                    <div className="building-icon">🏛️</div>
                    <div className="founding-year">2024</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="program-title-section">
              <h1 className="program-main-title">
                <span className="degree-type">{program.degreeType || 'Program'}</span>
                <span className="degree-name">{program.program || 'Program Name'}:</span>
                <span className="university-info">Offered by</span>
                <span className="university-name">{program.universities || program.universite?.nom || 'University'}</span>
              </h1>
            </div>
          </div>
        </div>

      {/* Contenu principal blanc */}
      <div className="program-main-content">
        <div className="content-grid">
          {/* Colonne gauche - Détails du programme */}
          <div className="left-column">
            {/* À propos de l'université */}
            <section className="info-section">
              <h2 className="section-title">About The University</h2>
              <p className="section-text">
                {program.aboutTheUniversity || 
                  `Shanxi University is a prestigious institution with a rich history dating back to 1902. 
                  Located in the heart of China, it offers world-class education with modern facilities, 
                  experienced faculty, and a diverse international community. Students develop strong 
                  academic foundations and practical skills for their future careers.`}
              </p>
            </section>

            {/* À propos du programme */}
            <section className="info-section">
              <h2 className="section-title">About The Program</h2>
              <p className="section-text">
                {program.aboutThisProgram || 
                  `The Bachelor in Business Administration program provides a solid foundation in business 
                  principles, combining theoretical knowledge with practical applications. Students learn 
                  essential skills in management, finance, marketing, and entrepreneurship, preparing them 
                  for successful careers in the global business world.`}
              </p>
            </section>

            {/* Pourquoi ce programme */}
            <section className="info-section">
              <h2 className="section-title">Why this Program?</h2>
              <ul className="benefits-list">
                <li className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Shanxi University is among the top 2% of universities in China</span>
                </li>
                <li className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Diverse international community: Join students from 30+ countries and build global connections.</span>
                </li>
                <li className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">100% business-focused curriculum. It Covers core subjects like finance, marketing, management..</span>
                </li>
                <li className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">No Chinese required! Study in a fully English-speaking academic environment.</span>
                </li>
                <li className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Over 86% of graduates find jobs or pursue master's studies within 6 months.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Colonne droite - Spécificités du programme */}
          <div className="right-column">
            {/* À propos de ce programme */}
            <section className="info-section">
              <h2 className="section-title">About this Program</h2>
              <div className="program-details">
                <div className="detail-row">
                  <span className="detail-label">Degree Type:</span>
                  <span className="detail-value degree-badge">Bachelor</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Apply Before:</span>
                  <span className="detail-value">{program.applyBefore || '16th April'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tuition Fees:</span>
                  <span className="detail-value">{program.tuitionFees || '20 000 RMB'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{program.campusCity || 'Hangzhou'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Campus City:</span>
                  <span className="detail-value">{program.campusCity || 'Nanjing'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{program.duration ? `${program.duration} Years` : '4 Years'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">{program.language || 'English'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">University Ranking:</span>
                  <span className="detail-value">{program.universityRanking || 'Top 200'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Program Ranking:</span>
                  <span className="detail-value">{program.ranking || 'TOP 40'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Scholarship:</span>
                  <span className="detail-value scholarship-badge">Available</span>
                </div>
              </div>
            </section>

            {/* Documents nécessaires */}
            <section className="info-section">
              <h2 className="section-title">Documents Needed</h2>
              <div className="documents-grid">
                <div className="document-card">
                  <span className="document-icon">🛂</span>
                  <span className="document-text">Valid Moroccan Passport</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">🎓</span>
                  <span className="document-text">High school Diploma</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📜</span>
                  <span className="document-text">Good Conduct Certificate</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📷</span>
                  <span className="document-text">Small Digital photo</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📄</span>
                  <span className="document-text">Academic Transcript</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📝</span>
                  <span className="document-text">Application Form to Fill</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📜</span>
                  <span className="document-text">English Proficiency Certificate</span>
                </div>
                <div className="document-card">
                  <span className="document-icon">📋</span>
                  <span className="document-text">Academic Study Plan</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Section Call to Action violette */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-text">Interested in this program and ready to get started?</h2>
          <button className="cta-button" onClick={handleApply}>
            Apply Now
          </button>
        </div>
      </div>

      {/* Section autres universités */}
      <div className="other-universities-section">
        <h2 className="section-title">Other Universities</h2>
        <div className="universities-logos">
          <div className="university-logo-item">🏛️</div>
          <div className="university-logo-item">🎓</div>
          <div className="university-logo-item">🌍</div>
          <div className="university-logo-item">🏫</div>
          <div className="university-logo-item">⭐</div>
          <div className="university-logo-item">🎯</div>
        </div>
      </div>
      </div>
    </GlobalLayout>
  );
};

export default ProgramDetail; 