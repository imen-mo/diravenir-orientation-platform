{/* Icône de succès */}import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { programService } from '../services/api';
import { toast } from 'react-toastify';
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
    <div className="program-detail-page">
      {/* Header avec logo et titre */}
      <div className="program-header">
        <div className="program-logo">
          <img
            src={program.programImage || '/default-university-logo.png'}
            alt={`${program.universityName} Logo`}
            className="university-logo"
          />
        </div>
        <div className="program-title">
          <h1 className="main-title">
            <span className="program-name">{program.majorName}</span>
            <span className="university-name">: Offered by {program.universityName}</span>
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="program-content">
        <div className="content-left">
          {/* À propos de l'université */}
          <section className="info-section">
            <h2>About The University</h2>
            <p>
              {program.universityName} is a top historic university in China, 
              emphasizing its focus on management, marketing, and entrepreneurship 
              skills for a global career.
            </p>
          </section>

          {/* À propos du programme */}
          <section className="info-section">
            <h2>About The Program</h2>
            <p>
              {program.description || 
                `This ${program.majorName} program provides a solid foundation in business, 
                management, and leadership, blending theory with real-world applications 
                through case studies and projects.`}
            </p>
          </section>

          {/* Pourquoi ce programme */}
          <section className="info-section">
            <h2>Why this Program?</h2>
            <ul className="benefits-list">
              <li className="benefit-item">
                <span className="check-icon">✓</span>
                {program.universityName} is among the top 2% of universities in China
              </li>
              <li className="benefit-item">
                <span className="check-icon">✓</span>
                Diverse international community from 30+ countries
              </li>
              <li className="benefit-item">
                <span className="check-icon">✓</span>
                100% business-focused curriculum covering finance, marketing, and management
              </li>
              <li className="benefit-item">
                <span className="check-icon">✓</span>
                Fully English-speaking academic environment (no Chinese required)
              </li>
              <li className="benefit-item">
                <span className="check-icon">✓</span>
                Over 85% of graduates find jobs or pursue master's studies within 6 months
              </li>
            </ul>
          </section>
        </div>

        <div className="content-right">
          {/* Informations du programme */}
          <section className="program-info-section">
            <h2>About this Program</h2>
            <div className="info-table">
              <div className="info-row">
                <span className="info-label">Degree Type:</span>
                <span className="info-value">{program.degreeType || 'Bachelor'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Apply Before:</span>
                <span className="info-value">{program.applyBefore || '19th April'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tuition Fees:</span>
                <span className="info-value">
                  {program.tuitionFees ? `${program.tuitionFees} RMB` : '23,000 RMB'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Location:</span>
                <span className="info-value">{program.location || 'Hangzhou'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Campus City:</span>
                <span className="info-value">{program.campusCity || 'Nanjing'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Duration:</span>
                <span className="info-value">{program.duration || 4} Years</span>
              </div>
              <div className="info-row">
                <span className="info-label">Language:</span>
                <span className="info-value">{program.language || 'English'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">University Ranking:</span>
                <span className="info-value">{program.universityRanking || 'Top 200'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Program Ranking:</span>
                <span className="info-value">{program.programRanking || 'TOP 40'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Scholarship:</span>
                <span className="info-value scholarship-available">
                  {program.scholarshipAvailable ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Documents requis */}
      <section className="documents-section">
        <h2>Documents Needed</h2>
        <div className="documents-grid">
          <div className="document-card">
            <div className="document-icon">📄</div>
            <span>Valid Moroccan Passport</span>
          </div>
          <div className="document-card">
            <div className="document-icon">🎓</div>
            <span>High school Diploma</span>
          </div>
          <div className="document-card">
            <div className="document-icon">📋</div>
            <span>Good Conduct Certificate</span>
          </div>
          <div className="document-card">
            <div className="document-icon">📸</div>
            <span>Small Digital photo</span>
          </div>
          <div className="document-card">
            <div className="document-icon">📊</div>
            <span>Academic Transcript</span>
          </div>
          <div className="document-card">
            <div className="document-icon">📝</div>
            <span>Application Form to Fill</span>
          </div>
          <div className="document-card">
            <div className="document-icon">🌐</div>
            <span>English Proficiency Certificate</span>
          </div>
          <div className="document-card">
            <div className="document-icon">📚</div>
            <span>Academic Study Plan</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Interested in this program and ready to get started?</h2>
          <button onClick={handleApply} className="btn-apply-large">
            Apply Now
          </button>
        </div>
      </section>

      {/* Autres universités */}
      <section className="other-universities">
        <h3>Other Universities</h3>
        <div className="universities-logos">
          {/* Logos des autres universités */}
          <div className="university-logo-small">🏛️</div>
          <div className="university-logo-small">🎓</div>
          <div className="university-logo-small">🏫</div>
          <div className="university-logo-small">🎯</div>
          <div className="university-logo-small">🌟</div>
          <div className="university-logo-small">💎</div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail; 