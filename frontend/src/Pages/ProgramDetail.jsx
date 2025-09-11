import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { programService } from '../services/api';
import './ProgramDetail.css';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getText } = useTheme();
  const [programDetail, setProgramDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarPrograms, setSimilarPrograms] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

  useEffect(() => {
    const fetchProgramDetail = async () => {
      try {
        setLoading(true);
        console.log('🔍 Récupération des détails du programme ID:', id);
        
        const data = await programService.getDetailById(id);
        console.log('✅ Données reçues de l\'API:', data);
        setProgramDetail(data);
        
      } catch (err) {
        console.error('❌ Erreur lors de la récupération:', err);
        setError(err.message || getText('errorLoadingProgram'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramDetail();
    }
  }, [id]);

  useEffect(() => {
    const fetchSimilarPrograms = async () => {
      // Vérifier d'abord si on a des programmes similaires dans les détails
      if (programDetail?.similarPrograms && programDetail.similarPrograms.length > 0) {
        console.log('✅ Programmes similaires trouvés dans les détails:', programDetail.similarPrograms);
        setSimilarPrograms(programDetail.similarPrograms);
        setIsLoadingSimilar(false);
        return;
      }

      // Sinon, essayer de récupérer via l'API
      try {
        setIsLoadingSimilar(true);
        console.log('🔍 Recherche de programmes similaires via API...');
        
        // Essayer d'abord la méthode intelligente
        const similarProgramsData = await programService.getSimilarProgramsIntelligent(id);
        if (similarProgramsData && similarProgramsData.length > 0) {
          console.log('✅ Programmes similaires intelligents trouvés:', similarProgramsData);
          setSimilarPrograms(similarProgramsData);
        } else {
          // Fallback: essayer par catégorie
          console.log('🔄 Fallback: recherche par catégorie...');
          const categoryPrograms = await programService.getProgramsByCategory(id);
          if (categoryPrograms && categoryPrograms.length > 0) {
            console.log('✅ Programmes par catégorie trouvés:', categoryPrograms);
            setSimilarPrograms(categoryPrograms);
          } else {
            // Fallback final: programmes du même type
            console.log('🔄 Fallback final: recherche par type de programme...');
            const allPrograms = await programService.getAll();
            if (allPrograms && allPrograms.length > 0) {
              // Filtrer les programmes du même type (ex: Bachelor, Master)
              const currentDegreeType = programDetail?.degreeType || 'Bachelor';
              const sameTypePrograms = allPrograms.filter(p => 
                p.degreeType === currentDegreeType && p.id !== parseInt(id)
              ).slice(0, 6); // Limiter à 6 programmes
              
              if (sameTypePrograms.length > 0) {
                console.log('✅ Programmes du même type trouvés:', sameTypePrograms);
                setSimilarPrograms(sameTypePrograms);
              } else {
                console.log('⚠️ Aucun programme similaire trouvé');
                setSimilarPrograms([]);
              }
            } else {
              setSimilarPrograms([]);
            }
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des programmes similaires:', error);
        // Fallback final en cas d'erreur
        try {
          const allPrograms = await programService.getAll();
          if (allPrograms && allPrograms.length > 0) {
            const fallbackPrograms = allPrograms.slice(0, 6).filter(p => p.id !== parseInt(id));
            console.log('🔄 Fallback d\'erreur: programmes de base:', fallbackPrograms);
            setSimilarPrograms(fallbackPrograms);
          } else {
            setSimilarPrograms([]);
          }
        } catch (fallbackError) {
          console.error('❌ Erreur lors du fallback:', fallbackError);
          setSimilarPrograms([]);
        }
      } finally {
        setIsLoadingSimilar(false);
      }
    };

    if (id) {
      fetchSimilarPrograms();
    }
  }, [id, programDetail]);

  // Fonction pour obtenir le contenu traduit selon la langue
  const getTranslatedContent = (fieldName) => {
    const { currentLanguage } = useTheme();
    
    // Si c'est en anglais, chercher le champ avec "En" suffix
    if (currentLanguage === 'en') {
      const englishField = `${fieldName}En`;
      return programDetail?.[englishField] || programDetail?.[fieldName] || getText(fieldName);
    }
    
    // Si c'est en français, utiliser le champ normal
    return programDetail?.[fieldName] || getText(fieldName);
  };

  // Fusion des données avec fallbacks intelligents et traduction
  const currentProgram = {
    id: programDetail?.id || id,
    title: programDetail?.title || programDetail?.program || getText('program'),
    program: programDetail?.program || getText('program'),
    university: programDetail?.university || getText('university'),
    universityEn: programDetail?.university || "University",
    universityLogo: programDetail?.universityLogo || null,
    degreeType: programDetail?.degreeType || "N/A",
    applyBefore: programDetail?.applyBefore || "N/A",
    tuitionFees: programDetail?.tuitionFees || "N/A",
    location: programDetail?.location || programDetail?.city || "N/A",
    campusCity: programDetail?.campusCity || programDetail?.city || "N/A",
    duration: programDetail?.duration || "N/A",
    language: programDetail?.language || "N/A",
    universityRanking: programDetail?.universityRanking || "N/A",
    programRanking: programDetail?.programRanking || "N/A",
    scholarship: programDetail?.scholarship || "N/A",
    description: programDetail?.description || getText('description'),
    universityAbout: programDetail?.universityAbout || getText('aboutTheUniversity'),
    aboutThisProgram: programDetail?.aboutThisProgram || getText('aboutThisProgram'),
    whyThisProgram: programDetail?.whyThisProgram || getText('whyThisProgram'),
    documentsNeeded: Array.isArray(programDetail?.documentsNeeded) 
      ? programDetail.documentsNeeded 
      : [],
    similarPrograms: Array.isArray(programDetail?.similarPrograms) 
      ? programDetail.similarPrograms 
      : [],
    country: programDetail?.country || "N/A",
    destinationName: programDetail?.destinationName || "N/A"
  };

  // Logs de débogage pour le nom de l'université
  console.log('🔍 Données fusionnées:', currentProgram);
  console.log('🏫 Université depuis l\'API:', programDetail?.university);
  console.log('🖼️ Logo université depuis l\'API:', programDetail?.universityLogo);
  console.log('🖼️ Logo université final utilisé:', currentProgram.universityLogo);
  console.log('🌍 Pays depuis l\'API:', programDetail?.country);
  console.log('🎯 Université finale utilisée:', currentProgram.university);
  console.log('🎯 Université anglaise:', currentProgram.universityEn);

  const handleApplyNow = () => {
    navigate('/apply', {
      state: {
        program: {
          id: currentProgram.id,
          name: currentProgram.program || currentProgram.title || 'Program',
          type: currentProgram.degreeType || 'Program',
          university: currentProgram.university || getText('university'),
          logo: currentProgram.universityLogo || '/src/assets/logo.png',
          applicationFee: 4000,
          serviceFee: 11000,
                      duration: currentProgram.duration || '4 Years',
            level: currentProgram.degreeType || 'Bachelor',
            language: currentProgram.language || getText('language'),
          tuitionFees: currentProgram.tuitionFees || 'Starting from $2,500',
          category: currentProgram.degreeType || 'General',
          campusCity: currentProgram.campusCity || 'City',
          destinationName: 'Destination'
        }
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSimilarProgramClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  const getDefaultLogo = (name) => {
    if (!name) return '/src/assets/logo.png';
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('hebei')) return 'https://www.urongda.com/og-images/hefeiuniversity-of-technology.png';
    if (lowerCaseName.includes('beijing')) return 'https://www.edarabia.com/wp-content/uploads/2018/03/beijing-jiaotonguniversity-beijing-china.png';
    if (lowerCaseName.includes('foreign')) return 'https://i.ytimg.com/vi/6im5oQlr_OM/maxresdefault.jpg';
    return '/src/assets/logo.png';
  };

  if (loading) {
    return (
      <div className="program-detail-overlay">
        <div className="program-detail-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h3>Chargement des détails...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="program-detail-overlay">
        <div className="program-detail-container">
          <div className="error-container">
            <h3>Erreur de chargement</h3>
            <p>{error}</p>
            <button onClick={handleBack} className="back-button">
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="program-detail-overlay">
      <div className="program-detail-container">
        {/* Header Section - Bannière violette */}
        <div className="detail-header">
          <div className="university-logo-section">
            <div className="university-logo">
              {currentProgram.universityLogo ? (
                <img 
                  src={currentProgram.universityLogo} 
                  alt={`Logo ${currentProgram.university}`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div style={{ display: currentProgram.universityLogo ? 'none' : 'block' }}>
                {currentProgram.university ? currentProgram.university.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
          
          <div className="program-title-section">
            <h1 className="program-title">
              <span className="title-main">{currentProgram.title || currentProgram.program}</span>
              <span className="title-subtitle">: {getText('offeredBy')} {currentProgram.university || getText('university')}</span>
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="detail-content">
          <div className="content-columns">
            {/* Left Column - About sections */}
            <div className="left-column">
              {/* About The University */}
              <div className="content-section">
                <h2 className="section-title">{getText('aboutTheUniversity')}</h2>
                <p className="section-text">
                  {currentProgram.universityAbout}
                </p>
              </div>

              {/* About The Program */}
              <div className="content-section">
                <h2 className="section-title">{getText('aboutThisProgram')}</h2>
                <p className="section-text">
                  {currentProgram.aboutThisProgram}
                </p>
              </div>

              {/* Why this Program? */}
              <div className="content-section">
                <h2 className="section-title">{getText('whyThisProgram')}</h2>
                {currentProgram.whyThisProgram && currentProgram.whyThisProgram !== "Avantages du programme non spécifiés" ? (
                  <div className="why-this-program-text">
                    {currentProgram.whyThisProgram.split('\n').map((line, index) => (
                      <div key={index} className="benefit-line">
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 39 39" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="checkmark-icon"
                        >
                          <path d="M19.4869 39.0001C8.72288 38.9715 -0.0263068 30.2106 5.9436e-05 19.488C0.0264256 8.7236 8.78879 -0.0263023 19.511 5.94111e-05C30.2729 0.0264212 39.0264 8.7895 38.9979 19.5121C38.9715 30.2743 30.2091 39.0264 19.4869 39.0001ZM3.18817 19.4616C3.20795 28.3148 10.217 35.7444 19.4341 35.7993C28.3349 35.852 35.7614 28.7497 35.7988 19.5385C35.8339 10.6524 28.7502 3.25573 19.5638 3.20081C10.6981 3.14589 3.28485 10.2174 3.18817 19.4616Z" fill="#46B734"/>
                          <path d="M16.8697 22.1132C19.904 19.2485 22.8548 16.4674 25.799 13.6796C26.2604 13.2425 26.7372 12.9459 27.414 13.1194C28.4554 13.3874 28.9498 14.5386 28.3807 15.4546C28.2577 15.6546 28.0951 15.8347 27.9259 15.9973C24.6367 19.1123 21.3454 22.2296 18.0518 25.3403C17.2103 26.1355 16.3665 26.118 15.5624 25.2876C14.0243 23.6993 12.4885 22.1066 10.9615 20.5095C10.2078 19.7208 10.1793 18.7191 10.8692 18.082C11.5701 17.434 12.4973 17.4691 13.2092 18.2094C14.3254 19.3672 15.4239 20.5425 16.5269 21.7112C16.6412 21.8276 16.7401 21.9594 16.8697 22.1132Z" fill="#46B734"/>
                        </svg>
                        <span className="benefit-text">{line.trim()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-benefits">
                    {getText('whyThisProgram')}
                  </p>
                )}
              </div>

              {/* Documents Needed */}
              <div className="content-section documents-section">
                <h2 className="section-title">{getText('documentsNeeded')}</h2>
                <div className="documents-grid">
                  {currentProgram.documentsNeeded && currentProgram.documentsNeeded.length > 0 ? (
                    currentProgram.documentsNeeded.map((document, index) => (
                      <div key={index} className="document-card">
                        <div className="mini-logo-container">
                          <img 
                            src="/src/assets/mini-logo.png" 
                            alt="Document requirement" 
                            className="mini-logo"
                          />
                        </div>
                        <span className="document-name">{document}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-documents">
                      {getText('documentsNeeded')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Program Details */}
            <div className="right-column">
              <div className="program-details-card">
                <h2 className="section-title">{getText('aboutThisProgram')}</h2>
                
                <div className="details-list">
                  <div className="detail-item">
                    <span className="detail-label">Degree Type</span>
                    <span className="detail-value degree-type">{currentProgram.degreeType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Apply Before</span>
                    <span className="detail-value">{currentProgram.applyBefore}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tuition Fees</span>
                    <span className="detail-value">{currentProgram.tuitionFees}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{currentProgram.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Campus City</span>
                    <span className="detail-value">{currentProgram.campusCity}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">{currentProgram.duration ? `${currentProgram.duration} Years` : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Language</span>
                    <span className="detail-value">{currentProgram.language}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">University Ranking</span>
                    <span className="detail-value">{currentProgram.universityRanking}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Program Ranking</span>
                    <span className="detail-value">{currentProgram.programRanking}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Scholarship</span>
                    <span className="detail-value scholarship">{currentProgram.scholarship}</span>
                  </div>
                </div>
                
                {/* Éléments décoratifs */}
                <div className="decorative-dots"></div>
                <div className="decorative-arc"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <div className="cta-content">
            <div className="cta-text">
              <h3>Interested in this program and ready to get started?</h3>
            </div>
            <div className="cta-button">
              <button onClick={handleApplyNow} className="apply-now-btn">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Other Universities Section */}
        <div className="other-universities-section">
          <h2 className="section-title">OTHER UNIVERSITIES</h2>
          
          {similarPrograms.length > 0 ? (
            <div className="universities-logos">
              {similarPrograms.map((similarProgram) => (
                <div 
                  key={similarProgram.id} 
                  className="university-logo-item"
                  onClick={() => handleSimilarProgramClick(similarProgram.id)}
                  title={`${similarProgram.universiteName || similarProgram.universities || similarProgram.university} - ${similarProgram.program || similarProgram.title}`}
                >
                  <img 
                    src={similarProgram.universiteLogoUrl || similarProgram.universityLogo || getDefaultLogo(similarProgram.universiteName || similarProgram.universities || similarProgram.university)}
                    alt={similarProgram.universiteName || similarProgram.universities || similarProgram.university}
                    onError={(e) => {
                      e.target.src = getDefaultLogo(similarProgram.universiteName || similarProgram.universities || similarProgram.university);
                    }}
                  />
                  {/* Ajouter le nom de l'université sous le logo */}
                  <div className="university-name">
                    {similarProgram.universiteName || similarProgram.universities || similarProgram.university || 'Université'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-similar-programs">
              <p>🔍 Recherche de programmes similaires...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {similarPrograms.length === 0 && !isLoadingSimilar && (
            <div className="no-similar-programs">
              <p>📚 Aucun programme similaire trouvé pour le moment.</p>
              <p>Explorez d'autres programmes dans notre catalogue.</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <button className="close-button" onClick={handleBack}>
          ←
        </button>
      </div>
    </div>
  );
};

export default ProgramDetail;