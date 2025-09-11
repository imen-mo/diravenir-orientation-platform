import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaUniversity, 
  FaGraduationCap, 
  FaLanguage, 
  FaMoneyBillWave,
  FaClock,
  FaUsers,
  FaStar,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaExternalLinkAlt,
  FaBook,
  FaCalendarAlt,
  FaGlobe,
  FaFlag,
  FaPlane,
  FaHome,
  FaInfoCircle
} from 'react-icons/fa';
import './CountryPage.css';

const CountryPage = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Données de démonstration pour les pays
  const countryDatabase = {
    'CN': {
      name: 'Chine',
      flag: '🇨🇳',
      capital: 'Pékin',
      population: '1.4 milliard',
      currency: 'Yuan (CNY)',
      languages: ['Mandarin', 'Cantonais'],
      timezone: 'UTC+8',
      description: 'La Chine offre un système éducatif de classe mondiale avec des universités prestigieuses et des programmes innovants.',
      highlights: [
        'Universités de classe mondiale',
        'Coût de la vie abordable',
        'Culture riche et diversifiée',
        'Opportunités d\'emploi nombreuses'
      ],
      requirements: [
        'Visa étudiant',
        'Test de langue chinoise (HSK)',
        'Diplôme équivalent',
        'Lettre de motivation'
      ],
      costOfLiving: {
        accommodation: '200-500 EUR/mois',
        food: '150-300 EUR/mois',
        transport: '50-100 EUR/mois',
        total: '400-900 EUR/mois'
      }
    },
    'CY': {
      name: 'Chypre',
      flag: '🇨🇾',
      capital: 'Nicosie',
      population: '1.2 million',
      currency: 'Euro (EUR)',
      languages: ['Grec', 'Turc', 'Anglais'],
      timezone: 'UTC+2',
      description: 'Chypre est une destination idéale pour les études avec ses universités internationales et son environnement méditerranéen.',
      highlights: [
        'Universités internationales',
        'Environnement méditerranéen',
        'Programmes en anglais',
        'Qualité de vie élevée'
      ],
      requirements: [
        'Visa étudiant UE',
        'Test d\'anglais (IELTS/TOEFL)',
        'Diplôme équivalent',
        'Assurance santé'
      ],
      costOfLiving: {
        accommodation: '400-800 EUR/mois',
        food: '200-400 EUR/mois',
        transport: '100-200 EUR/mois',
        total: '700-1400 EUR/mois'
      }
    },
    'RO': {
      name: 'Roumanie',
      flag: '🇷🇴',
      capital: 'Bucarest',
      population: '19.3 millions',
      currency: 'Leu roumain (RON)',
      languages: ['Roumain', 'Anglais', 'Français'],
      timezone: 'UTC+2',
      description: 'La Roumanie offre une éducation de qualité à des prix abordables dans un environnement européen.',
      highlights: [
        'Coût très abordable',
        'Membre de l\'UE',
        'Programmes en français',
        'Culture européenne riche'
      ],
      requirements: [
        'Visa étudiant UE',
        'Test de langue (selon programme)',
        'Diplôme équivalent',
        'Certificat médical'
      ],
      costOfLiving: {
        accommodation: '200-400 EUR/mois',
        food: '100-200 EUR/mois',
        transport: '50-100 EUR/mois',
        total: '350-700 EUR/mois'
      }
    }
  };

  // Données de démonstration pour les universités
  const universitiesDatabase = {
    'CN': [
      {
        id: 1,
        name: 'Université de Pékin',
        location: 'Pékin',
        ranking: 1,
        programs: 150,
        students: 45000,
        established: 1898,
        website: 'https://www.pku.edu.cn',
        description: 'L\'une des universités les plus prestigieuses de Chine.',
        specialties: ['Sciences', 'Ingénierie', 'Médecine', 'Arts']
      },
      {
        id: 2,
        name: 'Université Tsinghua',
        location: 'Pékin',
        ranking: 2,
        programs: 120,
        students: 38000,
        established: 1911,
        website: 'https://www.tsinghua.edu.cn',
        description: 'Université leader en sciences et technologies.',
        specialties: ['Ingénierie', 'Technologie', 'Sciences', 'Business']
      }
    ],
    'CY': [
      {
        id: 1,
        name: 'Cyprus International University',
        location: 'Nicosie',
        ranking: 1,
        programs: 80,
        students: 15000,
        established: 1997,
        website: 'https://www.ciu.edu.tr',
        description: 'Université internationale moderne avec des programmes en anglais.',
        specialties: ['Business', 'Ingénierie', 'Arts', 'Sciences']
      },
      {
        id: 2,
        name: 'Final International University',
        location: 'Kyrenia',
        ranking: 2,
        programs: 60,
        students: 8000,
        established: 2015,
        website: 'https://www.final.edu.tr',
        description: 'Université moderne axée sur l\'innovation et la recherche.',
        specialties: ['Technologie', 'Design', 'Communication', 'Santé']
      }
    ],
    'RO': [
      {
        id: 1,
        name: 'Université de Bucarest',
        location: 'Bucarest',
        ranking: 1,
        programs: 200,
        students: 32000,
        established: 1864,
        website: 'https://www.unibuc.ro',
        description: 'La plus ancienne université de Roumanie.',
        specialties: ['Lettres', 'Sciences', 'Droit', 'Médecine']
      },
      {
        id: 2,
        name: 'Université Polytechnique de Bucarest',
        location: 'Bucarest',
        ranking: 2,
        programs: 90,
        students: 25000,
        established: 1818,
        website: 'https://www.upb.ro',
        description: 'Université technique de référence en Roumanie.',
        specialties: ['Ingénierie', 'Architecture', 'Technologie', 'Sciences']
      }
    ]
  };

  useEffect(() => {
    const loadCountryData = () => {
      setLoading(true);
      
      // Simuler un délai de chargement
      setTimeout(() => {
        const country = countryDatabase[countryCode];
        const countryUniversities = universitiesDatabase[countryCode] || [];
        
        if (country) {
          setCountryData(country);
          setUniversities(countryUniversities);
          
          // Générer des programmes de démonstration
          const demoPrograms = countryUniversities.flatMap(uni => [
            {
              id: `${uni.id}-1`,
              name: 'Master en Informatique',
              university: uni.name,
              duration: '2 ans',
              language: 'Anglais',
              tuition: '3000-5000 EUR/an',
              level: 'Master',
              field: 'Informatique'
            },
            {
              id: `${uni.id}-2`,
              name: 'Bachelor en Business',
              university: uni.name,
              duration: '3 ans',
              language: 'Anglais',
              tuition: '2500-4000 EUR/an',
              level: 'Bachelor',
              field: 'Business'
            }
          ]);
          
          setPrograms(demoPrograms);
        }
        
        setLoading(false);
      }, 1000);
    };

    loadCountryData();
  }, [countryCode]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUniversityClick = (universityId) => {
    navigate(`/universities/${universityId}`);
  };

  const handleProgramClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || program.level.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="country-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des informations du pays...</p>
        </div>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="country-page">
        <div className="error-container">
          <h2>Pays non trouvé</h2>
          <p>Le pays demandé n'existe pas dans notre base de données.</p>
          <button onClick={handleBackClick} className="back-btn">
            <FaArrowLeft />
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="country-page">
      {/* Header */}
      <header className="country-header">
        <div className="header-content">
          <button onClick={handleBackClick} className="back-btn">
            <FaArrowLeft />
            Retour
          </button>
          <div className="country-info">
            <div className="country-flag">{countryData.flag}</div>
            <div className="country-details">
              <h1>{countryData.name}</h1>
              <p>{countryData.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="country-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaInfoCircle />
          Vue d'ensemble
        </button>
        <button 
          className={`tab ${activeTab === 'universities' ? 'active' : ''}`}
          onClick={() => setActiveTab('universities')}
        >
          <FaUniversity />
          Universités ({universities.length})
        </button>
        <button 
          className={`tab ${activeTab === 'programs' ? 'active' : ''}`}
          onClick={() => setActiveTab('programs')}
        >
          <FaGraduationCap />
          Programmes ({programs.length})
        </button>
        <button 
          className={`tab ${activeTab === 'requirements' ? 'active' : ''}`}
          onClick={() => setActiveTab('requirements')}
        >
          <FaBook />
          Exigences
        </button>
      </nav>

      {/* Main Content */}
      <main className="country-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="info-grid">
              <div className="info-card">
                <FaMapMarkerAlt className="info-icon" />
                <h3>Capitale</h3>
                <p>{countryData.capital}</p>
              </div>
              <div className="info-card">
                <FaUsers className="info-icon" />
                <h3>Population</h3>
                <p>{countryData.population}</p>
              </div>
              <div className="info-card">
                <FaMoneyBillWave className="info-icon" />
                <h3>Monnaie</h3>
                <p>{countryData.currency}</p>
              </div>
              <div className="info-card">
                <FaLanguage className="info-icon" />
                <h3>Langues</h3>
                <p>{countryData.languages.join(', ')}</p>
              </div>
              <div className="info-card">
                <FaClock className="info-icon" />
                <h3>Fuseau horaire</h3>
                <p>{countryData.timezone}</p>
              </div>
              <div className="info-card">
                <FaGlobe className="info-icon" />
                <h3>Coût de vie</h3>
                <p>{countryData.costOfLiving.total}</p>
              </div>
            </div>

            <div className="highlights-section">
              <h3>Points forts</h3>
              <ul className="highlights-list">
                {countryData.highlights.map((highlight, index) => (
                  <li key={index}>
                    <FaStar className="highlight-icon" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cost-breakdown">
              <h3>Détail des coûts de vie</h3>
              <div className="cost-grid">
                <div className="cost-item">
                  <FaHome />
                  <span>Logement: {countryData.costOfLiving.accommodation}</span>
                </div>
                <div className="cost-item">
                  <FaMoneyBillWave />
                  <span>Nourriture: {countryData.costOfLiving.food}</span>
                </div>
                <div className="cost-item">
                  <FaPlane />
                  <span>Transport: {countryData.costOfLiving.transport}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'universities' && (
          <div className="universities-section">
            <div className="section-header">
              <h2>Universités en {countryData.name}</h2>
              <p>Découvrez les meilleures universités de ce pays</p>
            </div>
            
            <div className="universities-grid">
              {universities.map((university) => (
                <div key={university.id} className="university-card">
                  <div className="university-header">
                    <h3>{university.name}</h3>
                    <span className="ranking">#{university.ranking}</span>
                  </div>
                  
                  <div className="university-info">
                    <div className="info-item">
                      <FaMapMarkerAlt />
                      <span>{university.location}</span>
                    </div>
                    <div className="info-item">
                      <FaUsers />
                      <span>{university.students.toLocaleString()} étudiants</span>
                    </div>
                    <div className="info-item">
                      <FaGraduationCap />
                      <span>{university.programs} programmes</span>
                    </div>
                    <div className="info-item">
                      <FaCalendarAlt />
                      <span>Fondée en {university.established}</span>
                    </div>
                  </div>
                  
                  <p className="university-description">{university.description}</p>
                  
                  <div className="specialties">
                    <h4>Spécialités:</h4>
                    <div className="specialties-tags">
                      {university.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="university-actions">
                    <button 
                      className="action-btn primary"
                      onClick={() => handleUniversityClick(university.id)}
                    >
                      <FaExternalLinkAlt />
                      Voir détails
                    </button>
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn secondary"
                    >
                      <FaGlobe />
                      Site web
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="programs-section">
            <div className="section-header">
              <h2>Programmes disponibles</h2>
              <p>Explorez les programmes d'études en {countryData.name}</p>
            </div>
            
            <div className="search-filters">
              <div className="search-input">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Rechercher un programme ou une université..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tous les niveaux</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            
            <div className="programs-grid">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-header">
                    <h3>{program.name}</h3>
                    <span className="university-name">{program.university}</span>
                  </div>
                  
                  <div className="program-details">
                    <div className="detail-item">
                      <FaClock />
                      <span>{program.duration}</span>
                    </div>
                    <div className="detail-item">
                      <FaLanguage />
                      <span>{program.language}</span>
                    </div>
                    <div className="detail-item">
                      <FaMoneyBillWave />
                      <span>{program.tuition}</span>
                    </div>
                    <div className="detail-item">
                      <FaGraduationCap />
                      <span>{program.level}</span>
                    </div>
                  </div>
                  
                  <div className="program-actions">
                    <button 
                      className="action-btn primary"
                      onClick={() => handleProgramClick(program.id)}
                    >
                      <FaExternalLinkAlt />
                      Voir détails
                    </button>
                    <button className="action-btn secondary">
                      <FaBook />
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="requirements-section">
            <div className="section-header">
              <h2>Exigences d'admission</h2>
              <p>Informations importantes pour étudier en {countryData.name}</p>
            </div>
            
            <div className="requirements-content">
              <div className="requirements-list">
                <h3>Documents requis:</h3>
                <ul>
                  {countryData.requirements.map((requirement, index) => (
                    <li key={index}>
                      <FaCheckCircle className="requirement-icon" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="additional-info">
                <h3>Informations supplémentaires:</h3>
                <div className="info-cards">
                  <div className="info-card">
                    <FaFlag />
                    <h4>Visa étudiant</h4>
                    <p>Demande de visa obligatoire pour les étudiants internationaux</p>
                  </div>
                  <div className="info-card">
                    <FaLanguage />
                    <h4>Tests de langue</h4>
                    <p>Certification linguistique requise selon le programme</p>
                  </div>
                  <div className="info-card">
                    <FaMoneyBillWave />
                    <h4>Frais de scolarité</h4>
                    <p>Paiement des frais de scolarité avant l'inscription</p>
                  </div>
                  <div className="info-card">
                    <FaCalendarAlt />
                    <h4>Délais</h4>
                    <p>Respecter les dates limites de candidature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CountryPage;
