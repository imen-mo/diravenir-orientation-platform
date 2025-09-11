import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './ProgramCardFixed.css';
// ProgramDetail est maintenant une page séparée

// Composant d'icône SVG pour "More Infos" - Moniteur avec support (EXACT comme l'image 2)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Écran du moniteur - rectangle avec coins arrondis */}
    <rect x="3" y="3" width="18" height="14" rx="2" ry="2" fill="#FCBE1C"/>
    {/* Support du moniteur - ligne horizontale */}
    <rect x="7" y="21" width="10" height="2" fill="#FCBE1C"/>
    {/* Support du moniteur - ligne verticale vers le centre */}
    <rect x="11" y="17" width="2" height="4" fill="#FCBE1C"/>
  </svg>
);

// Composant d'icône SVG pour "Save This" - Épingle stylisée (EXACT comme l'image 3)
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tête de l'épingle - trapèze inversé */}
    <path d="M6 9L12 3L18 9L12 15L6 9Z" fill="#FCBE1C"/>
    {/* Tige de l'épingle - ligne fine et pointue */}
    <rect x="11" y="15" width="2" height="6" fill="#FCBE1C"/>
    {/* Point de l'épingle - ligne horizontale */}
    <rect x="10" y="21" width="4" height="2" fill="#FCBE1C"/>
  </svg>
);

const ProgramCardFixed = ({ program, onSaveProgram, isSaved, onViewDetails, imageFit = 'contain' }) => {
  const navigate = useNavigate();
  const { getText } = useTheme();
  const [imageFitClass, setImageFitClass] = useState('contain');
  const [imageLoaded, setImageLoaded] = useState(false);
  // showProgramDetail n'est plus nécessaire car ProgramDetail est maintenant une page

  // Fonction pour détecter intelligemment si une image est petite
  const detectImageSize = useCallback(async (imageUrl) => {
    if (!imageUrl || imageUrl === '/images/course.png') {
      setImageFitClass('contain');
      return;
    }

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Pour éviter les erreurs CORS
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          // Dimensions du cadre (168x168) moins le padding (30px)
          const frameSize = 138;
          
          // Log des dimensions pour debugging
          console.log(`🖼️ Image chargée: ${img.width}x${img.height} - URL: ${imageUrl}`);
          
          // NOUVEAU: Seuils ajustés pour mieux détecter les images petites
          // Si l'image est très petite (< 120x120), utiliser 'stretch-zoom'
          if (img.width < 120 || img.height < 120) {
            console.log(`🖼️ Image très petite détectée: ${img.width}x${img.height} -> applique 'stretch-zoom'`);
            setImageFitClass('stretch-zoom');
          }
          // Si l'image est petite (< 160x160), utiliser 'stretch' 
          // (160 est plus proche de la taille du cadre pour mieux détecter)
          else if (img.width < 160 || img.height < 160) {
            console.log(`🖼️ Image petite détectée: ${img.width}x${img.height} -> applique 'stretch'`);
            setImageFitClass('stretch');
          } else {
            console.log(`🖼️ Image normale: ${img.width}x${img.height} -> applique 'contain'`);
            setImageFitClass('contain');
          }
          setImageLoaded(true);
          resolve();
        };
        
        img.onerror = () => {
          console.log('❌ Erreur chargement image (probablement CORS), force stretch pour visibilité');
          // Si erreur CORS, forcer stretch pour que l'image soit visible
          setImageFitClass('stretch');
          setImageLoaded(true);
          reject();
        };
        
        img.src = imageUrl;
      });
    } catch (error) {
      console.log('⚠️ Erreur détection taille image, force stretch pour visibilité');
      // En cas d'erreur, forcer stretch pour la visibilité
      setImageFitClass('stretch');
      setImageLoaded(true);
    }
  }, []);

  // Fonction pour obtenir l'image du programme ou du logo de l'université
  const getProgramImage = (program) => {
    // Priorité 1: Logo de l'université depuis la base de données
    if (program.universiteLogoUrl && program.universiteLogoUrl !== 'N/A') {
      return program.universiteLogoUrl;
    }
    
    // Fallback pour l'ancien nom de champ
    if (program.universityLogo && program.universityLogo !== 'N/A') {
      return program.universityLogo;
    }
    
    // Priorité 2: Image du programme
    if (program.programImage && program.programImage !== 'N/A') {
      return program.programImage;
    }
    
    // Priorité 3: Image par défaut basée sur la catégorie
    const category = program.category || program.filiere || 'default';
    const defaultImages = {
      'Tourism': '/images/tourism-default.jpg',
      'Business': '/images/business-default.jpg',
      'Engineering': '/images/engineering-default.jpg',
      'Computer Science': '/images/cs-default.jpg',
      'Medicine': '/images/medicine-default.jpg',
      'Arts': '/images/arts-default.jpg',
      'default': '/images/course.png'
    };
    
    return defaultImages[category] || defaultImages['default'];
  };

  // Fonction pour obtenir le nom de l'université
  const getUniversityName = (program) => {
    if (program.university) {
      return program.university;
    }
    if (program.universities) {
      return program.universities;
    }
    return 'Université non spécifiée';
  };

  // Fonction pour obtenir le titre du programme
  const getProgramTitle = (program) => {
    if (program.program) {
      return program.program;
    }
    if (program.category) {
      return program.category;
    }
    return 'Programme non spécifié';
  };

  // Fonction pour obtenir la description
  const getProgramDescription = (program) => {
    if (program.description) {
      return program.description;
    }
    return 'Description du programme non disponible.';
  };

  const handleDetailsClick = () => {
    console.log('🔍 Clic sur More Infos détecté !');
    console.log('🎯 Programme:', program);
    // Naviguer vers la page ProgramDetail
    navigate(`/program/${program.id}`);
  };

  const handleSaveClick = () => {
    if (onSaveProgram) {
      onSaveProgram(program.id);
    } else {
      console.log('Programme sauvegardé:', program.id);
    }
  };

  const handleApplyClick = () => {
    // Naviguer vers la page Apply avec les données complètes du programme
    navigate('/apply', {
      state: {
        program: {
          id: program.id,
          name: program.program || program.name || 'Program',
          type: program.category || program.type || 'Program',
          university: program.universities || program.university || 'University',
          logo: program.universiteLogoUrl || program.universityLogo || program.image || '/src/assets/logo.png',
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
    });
  };

  // Détecter la taille de l'image au chargement du composant
  useEffect(() => {
    const imageUrl = getProgramImage(program);
    detectImageSize(imageUrl);
  }, [program, detectImageSize]);

  const imageUrl = getProgramImage(program);

  // Forcer l'étirement complet via JavaScript après application de la classe
  useEffect(() => {
    if (imageFitClass === 'stretch' || imageFitClass === 'stretch-zoom') {
      // Attendre que le DOM soit mis à jour
      const timer = setTimeout(() => {
        const imgElement = document.querySelector(`img[src="${imageUrl}"]`);
        if (imgElement) {
          console.log('🔧 Force l\'étirement complet via JavaScript pour:', imageUrl);
          
          // FORCER l'étirement complet avec JavaScript
          imgElement.style.objectFit = 'fill';
          imgElement.style.width = '100%';
          imgElement.style.height = '100%';
          imgElement.style.minWidth = '100%';
          imgElement.style.minHeight = '100%';
          imgElement.style.maxWidth = '100%';
          imgElement.style.maxHeight = '100%';
          imgElement.style.margin = '0';
          imgElement.style.padding = '0';
          imgElement.style.display = 'block';
          imgElement.style.position = 'relative';
          imgElement.style.transform = 'scale(1)';
          imgElement.style.transformOrigin = 'center center';
          imgElement.style.transition = 'none';
          imgElement.style.animation = 'none';
          imgElement.style.zIndex = '1';
          imgElement.style.boxSizing = 'border-box';
          imgElement.style.verticalAlign = 'top';
          imgElement.style.textAlign = 'center';
          
          // Vérifier que l'étirement a été appliqué
          const computedStyle = window.getComputedStyle(imgElement);
          console.log('✅ Étirement forcé - Width:', computedStyle.width, 'Height:', computedStyle.height, 'Object-fit:', computedStyle.objectFit);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [imageFitClass, imageUrl]);

  // Fonction de forçage supplémentaire pour l'étirement
  const forceStretchImage = useCallback(() => {
    if (imageFitClass === 'stretch' || imageFitClass === 'stretch-zoom') {
      // Attendre que l'image soit complètement rendue
      const checkAndForce = () => {
        const imgElement = document.querySelector(`img[src="${imageUrl}"]`);
        if (imgElement) {
          // Vérifier si l'étirement est déjà appliqué
          const computedStyle = window.getComputedStyle(imgElement);
          const isStretched = computedStyle.objectFit === 'fill' && 
                             computedStyle.width === '138px' && 
                             computedStyle.height === '138px';
          
          if (!isStretched) {
            console.log('🔧 Force l\'étirement supplémentaire pour:', imageUrl);
            
            // Appliquer tous les styles avec !important via JavaScript
            Object.assign(imgElement.style, {
              objectFit: 'fill',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              margin: '0',
              padding: '0',
              display: 'block',
              position: 'relative',
              transform: 'scale(1)',
              transformOrigin: 'center center',
              transition: 'none',
              animation: 'none',
              zIndex: '1',
              boxSizing: 'border-box',
              verticalAlign: 'top',
              textAlign: 'center'
            });
            
            // Vérifier le résultat final
            setTimeout(() => {
              const finalStyle = window.getComputedStyle(imgElement);
              console.log('🎯 Résultat final - Width:', finalStyle.width, 'Height:', finalStyle.height, 'Object-fit:', finalStyle.objectFit);
            }, 50);
          }
        } else {
          // Réessayer si l'image n'est pas encore dans le DOM
          setTimeout(checkAndForce, 50);
        }
      };
      
      // Démarrer la vérification
      setTimeout(checkAndForce, 200);
    }
  }, [imageFitClass, imageUrl]);
  
  // Exécuter le forçage après chaque mise à jour
  useEffect(() => {
    forceStretchImage();
  }, [forceStretchImage]);

  // MutationObserver pour surveiller les changements et forcer l'étirement
  useEffect(() => {
    if (imageFitClass === 'stretch' || imageFitClass === 'stretch-zoom') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const imgElement = mutation.target;
            if (imgElement.classList.contains('stretch') || imgElement.classList.contains('stretch-zoom')) {
              console.log('🔍 MutationObserver détecté - Force l\'étirement pour:', imageUrl);
              
              // Forcer l'étirement immédiatement
              setTimeout(() => {
                Object.assign(imgElement.style, {
                  objectFit: 'fill',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  margin: '0',
                  padding: '0',
                  display: 'block',
                  position: 'relative',
                  transform: 'scale(1)',
                  transformOrigin: 'center center',
                  transition: 'none',
                  animation: 'none',
                  zIndex: '1',
                  boxSizing: 'border-box',
                  verticalAlign: 'top',
                  textAlign: 'center'
                });
                
                console.log('✅ Étirement forcé via MutationObserver');
              }, 10);
            }
          }
        });
      });
      
      // Observer l'image quand elle est disponible
      const startObserving = () => {
        const imgElement = document.querySelector(`img[src="${imageUrl}"]`);
        if (imgElement) {
          observer.observe(imgElement, { attributes: true, attributeFilter: ['class'] });
          console.log('👁️ MutationObserver démarré pour:', imageUrl);
        } else {
          setTimeout(startObserving, 100);
        }
      };
      
      startObserving();
      
      return () => {
        observer.disconnect();
      };
    }
  }, [imageFitClass, imageUrl]);

  return (
    <div className="program-card-fixed">
      {/* Partie supérieure - Section violette avec logo de l'université (EXACT comme image 4) */}
      <div className="card-header-fixed">
        {/* Logo de l'université avec détection intelligente de la taille */}
        <div className="university-logo-fixed">
          <img
            src={imageUrl}
            alt={`Logo ${program.universite?.nom || 'Université'}`}
            className={`${imageFitClass} ${imageLoaded ? 'loaded' : 'loading'}`}
            style={{
              // STYLES INLINE ULTRA-STRICTS POUR FORCER L'ÉTIREMENT
              ...(imageFitClass === 'stretch' || imageFitClass === 'stretch-zoom' ? {
                objectFit: 'fill',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                margin: '0',
                padding: '0',
                display: 'block',
                position: 'relative',
                transform: 'scale(1)',
                transformOrigin: 'center center',
                transition: 'none',
                animation: 'none',
                zIndex: 1,
                boxSizing: 'border-box',
                verticalAlign: 'top',
                textAlign: 'center'
              } : {})
            }}
            onError={(e) => {
              console.log('❌ Erreur image, utilise fallback');
              e.target.src = '/placeholder-logo.png';
            }}
          />
          {/* Indicateur de redimensionnement */}
          {imageLoaded && (imageFitClass === 'stretch' || imageFitClass === 'stretch-zoom') && (
            <div className="resize-indicator" title={
              imageFitClass === 'stretch-zoom' 
                ? 'Image très petite - zoomée et étirée automatiquement' 
                : imageFitClass === 'stretch'
                ? 'Image étirée automatiquement pour remplir le cadre'
                : 'Image redimensionnée automatiquement'
            }>
              {imageFitClass === 'stretch-zoom' ? '🔍' : '📏'}
            </div>
          )}
        </div>
      </div>

      {/* Partie inférieure - Contenu blanc avec chevauchement (EXACT comme image 4) */}
      <div className="card-content-fixed">
        {/* Titre principal - Style exact selon image 4 */}
        <h3 className="program-title-fixed">
          {getProgramTitle(program)}
        </h3>

        {/* Description - Style exact selon image 4 */}
        <p className="program-description-fixed">
          {getProgramDescription(program)}
        </p>

        {/* Boutons secondaires côte à côte - Dimensions exactes selon CSS fourni */}
        <div className="secondary-buttons-fixed">
          <button className="btn-secondary-fixed info-btn-fixed" onClick={handleDetailsClick}>
            <InfoIcon />
            <span>{getText('moreInfos')}</span>
          </button>
          <button className={`btn-secondary-fixed save-btn-fixed ${isSaved ? 'saved' : ''}`} onClick={handleSaveClick}>
            <SaveIcon />
            <span>{isSaved ? getText('saved') : getText('saveThis')}</span>
          </button>
        </div>

        {/* Bouton principal Apply Now - Dimensions exactes selon CSS fourni */}
        <button className="btn-primary-fixed apply-btn-fixed" onClick={handleApplyClick}>
          {getText('applyNow')}
        </button>
      </div>

      {/* ProgramDetail est maintenant une page séparée */}
    </div>
  );
};

export default ProgramCardFixed;
