import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { destinationService } from '../services/api';
import { toast } from 'react-toastify';
import GlobalLayout from '../components/GlobalLayout';
import './DestinationPage.css';

const DestinationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestination();
  }, [id]);

  const loadDestination = async () => {
    try {
      setLoading(true);
      const data = await destinationService.getById(id);
      setDestination(data);
      setPrograms(data.programs || []);
    } catch (error) {
      console.error('Erreur lors du chargement de la destination:', error);
      toast.error('Erreur lors du chargement de la destination');
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="destination-error">
        <h2>Destination non trouvée</h2>
        <button onClick={() => navigate('/programs')} className="btn-back">
          Retour aux programmes
        </button>
      </div>
    );
  }

  return (
    <GlobalLayout activePage="programs">
      <div className="destination-page">
        {/* Header de la destination */}
        <div className="destination-header">
          <div className="destination-image">
            <img
              src={destination.imageUrl || '/default-country.jpg'}
              alt={`${destination.nom} Image`}
              className="country-image"
            />
          </div>
          <div className="destination-info">
            <h1 className="country-name">{destination.nom}</h1>
            <p className="country-description">{destination.description}</p>
          </div>
        </div>

      {/* Informations détaillées du pays */}
      <div className="destination-details">
        <div className="details-grid">
          <div className="detail-card">
            <h3>Pays</h3>
            <p>{destination.pays || destination.nom}</p>
          </div>
          <div className="detail-card">
            <h3>Ville principale</h3>
            <p>{destination.ville || 'N/A'}</p>
          </div>
          <div className="detail-card">
            <h3>Coût de vie moyen</h3>
            <p>{destination.coutVieMoyen ? `${destination.coutVieMoyen}€/mois` : 'N/A'}</p>
          </div>
          <div className="detail-card">
            <h3>Climat</h3>
            <p>{destination.climat || 'N/A'}</p>
          </div>
          <div className="detail-card">
            <h3>Sécurité</h3>
            <p>{destination.securite || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Programmes disponibles */}
      <section className="programs-section">
        <h2>Programmes disponibles en {destination.nom}</h2>
        {programs.length === 0 ? (
          <p className="no-programs">Aucun programme disponible pour le moment.</p>
        ) : (
          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <h3 className="program-title">{program.program}</h3>
                  <span className="program-category">{program.category}</span>
                </div>
                <div className="program-details">
                  <p className="university-name">{program.universities}</p>
                  <p className="campus-city">{program.campusCity}</p>
                  <div className="program-info">
                    <span className="degree-type">{program.degreeType}</span>
                    <span className="duration">{program.duration} ans</span>
                    <span className="language">{program.language}</span>
                  </div>
                  <div className="tuition-fees">
                    <strong>Frais de scolarité:</strong> {program.tuitionFees || 'N/A'}
                  </div>
                  <p className="apply-before">
                    <strong>Date limite:</strong> {program.applyBefore || 'N/A'}
                  </p>
                </div>
                <div className="program-actions">
                  <Link to={`/program/${program.id}`} className="btn-view-details">
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Navigation */}
      <div className="navigation-section">
        <button onClick={() => navigate('/programs')} className="btn-back-to-programs">
          ← Retour à tous les programmes
        </button>
        <Link to="/" className="btn-home">
          Accueil
        </Link>
      </div>
      </div>
    </GlobalLayout>
  );
};

export default DestinationPage;
