import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orientationService from '../services/orientationService';
import './UnifiedOrientationTest.css';

const UnifiedOrientationTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [dragOrder, setDragOrder] = useState([]);
  const [sliderValues, setSliderValues] = useState({});
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const navigate = useNavigate();

  // Configuration des questions
  const questions = [
    {
      id: 1,
      category: "Intérêts et Passions",
      question: "Si le temps et l'argent n'étaient pas un problème, quelle activité choisiriez-vous pour passer votre journée idéale ?",
      type: "single",
      options: [
        { id: 'A', icon: '🏗️', title: 'Créer quelque chose de nouveau', description: 'Construire, coder, designer' },
        { id: 'B', icon: '🔬', title: 'Comprendre comment les choses fonctionnent', description: 'Expérimenter, analyser, résoudre des énigmes' },
        { id: 'C', icon: '🤝', title: 'Interagir et aider les autres', description: 'Conseiller, enseigner, soigner' },
        { id: 'D', icon: '📊', title: 'Organiser et gérer des projets', description: 'Planifier, diriger, optimiser' },
        { id: 'E', icon: '🎨', title: 'Exprimer ma créativité', description: 'Peindre, écrire, jouer de la musique, faire des vidéos' }
      ]
    },
    {
      id: 2,
      category: "Intérêts et Passions",
      question: "Quand vous naviguez sur internet ou regardez des vidéos, quel type de contenu retient le plus votre attention ?",
      type: "multiple",
      maxSelections: 3,
      options: [
        { id: 'A', icon: '🔬', title: 'Découvertes scientifiques, Technologie et innovation' },
        { id: 'B', icon: '🎨', title: 'Art et culture, Design et création' },
        { id: 'C', icon: '💝', title: 'Développement personnel, Causes sociales et humanitaires' },
        { id: 'D', icon: '📈', title: 'Actualités économiques, Stratégies d\'entreprise' },
        { id: 'E', icon: '📋', title: 'Organisation et méthodes de travail, Gestion de projets' },
        { id: 'F', icon: '⚽', title: 'Sports, Bricolage et artisanat' }
      ]
    },
    {
      id: 3,
      category: "Intérêts et Passions",
      question: "Imaginez que vous êtes dans un magasin. Vers quelle section êtes-vous naturellement attiré(e) ?",
      type: "single",
      options: [
        { id: 'A', icon: '🔌', title: 'Rayons d\'électronique, gadgets ou outils' },
        { id: 'B', icon: '📚', title: 'Livres de science, de philosophie ou documentaires' },
        { id: 'C', icon: '🎭', title: 'Matériel d\'art, instruments de musique ou objets de décoration' },
        { id: 'D', icon: '🎮', title: 'Livres de développement personnel, jeux de société ou jeux vidéo' },
        { id: 'E', icon: '👗', title: 'Vêtements, accessoires de mode ou articles de luxe' }
      ]
    },
    {
      id: 4,
      category: "Compétences et Aptitudes",
      question: "Face à un problème complexe, quelle est votre première réaction ?",
      type: "single",
      options: [
        { id: 'A', icon: '🧩', title: 'Le décomposer en petites étapes logiques', description: 'Pour trouver la solution la plus efficace' },
        { id: 'B', icon: '🔍', title: 'Aller chercher les données et les faits', description: 'Pour comprendre la situation et trouver une solution' },
        { id: 'C', icon: '💡', title: 'Imaginer des solutions originales', description: 'Même si elles semblent folles au début' },
        { id: 'D', icon: '👥', title: 'Chercher l\'avis des autres', description: 'Pour trouver une solution collective' }
      ]
    },
    {
      id: 5,
      category: "Compétences et Aptitudes",
      question: "Parmi ces activités, lesquelles vous viennent le plus naturellement ?",
      type: "dragdrop",
      options: [
        { id: 'A', icon: '💰', title: 'Gérer un budget' },
        { id: 'B', icon: '📅', title: 'Organiser un événement' },
        { id: 'C', icon: '✍️', title: 'Écrire un texte clair' },
        { id: 'D', icon: '🔧', title: 'Réparer un appareil' },
        { id: 'E', icon: '🎨', title: 'Dessiner ou peindre' },
        { id: 'F', icon: '🧮', title: 'Résoudre une équation complexe' },
        { id: 'G', icon: '💬', title: 'Convaincre quelqu\'un d\'une idée' },
        { id: 'H', icon: '👂', title: 'Écouter et conseiller un ami' }
      ]
    },
    {
      id: 6,
      category: "Compétences et Aptitudes",
      question: "Quand vous devez apprendre quelque chose de nouveau, comment préférez-vous le faire ?",
      type: "single",
      options: [
        { id: 'A', icon: '📚', title: 'Lire et prendre des notes détaillées' },
        { id: 'B', icon: '🎥', title: 'Regarder des tutoriels vidéo ou des démonstrations' },
        { id: 'C', icon: '🛠️', title: 'Essayer par moi-même, pratiquer et faire des erreurs' },
        { id: 'D', icon: '💭', title: 'Discuter avec d\'autres et échanger des idées' }
      ]
    },
    {
      id: 7,
      category: "Valeurs et Objectifs",
      question: "Quel type d'impact aimeriez-vous avoir dans le monde ?",
      type: "single",
      options: [
        { id: 'A', icon: '❤️', title: 'Améliorer la vie des individus directement', description: 'Bien-être, santé, éducation' },
        { id: 'B', icon: '⚡', title: 'Créer des systèmes ou des produits qui rendent le monde plus efficace' },
        { id: 'C', icon: '🎭', title: 'Contribuer à la beauté et à la culture', description: 'Arts, design, histoire' },
        { id: 'D', icon: '⚖️', title: 'Défendre une cause ou promouvoir la justice sociale' }
      ]
    },
    {
      id: 8,
      category: "Valeurs et Objectifs",
      question: "Choisissez l'image qui représente le mieux l'environnement de travail dans lequel vous vous épanouirez le plus.",
      type: "single",
      options: [
        { id: 'A', icon: '🧪', title: 'Un laboratoire ou un centre de recherche' },
        { id: 'B', icon: '🏢', title: 'Un bureau ouvert et collaboratif' },
        { id: 'C', icon: '🎨', title: 'Un atelier ou un studio créatif' },
        { id: 'D', icon: '🌳', title: 'L\'extérieur, la nature, un chantier' },
        { id: 'E', icon: '📚', title: 'Un environnement calme et individuel', description: 'Bibliothèque, bureau privé' }
      ]
    },
    {
      id: 9,
      category: "Valeurs et Objectifs",
      question: "Quand vous pensez à votre future carrière, qu'est-ce qui est le plus important pour vous ?",
      type: "sliders",
      options: [
        { id: 'A', title: 'La sécurité de l\'emploi et la stabilité' },
        { id: 'B', title: 'La possibilité d\'innover et d\'être à la pointe' },
        { id: 'C', title: 'L\'autonomie et la liberté de mes décisions' },
        { id: 'D', title: 'Un salaire élevé et de bonnes opportunités financières' }
      ]
    },
    {
      id: 10,
      category: "Valeurs et Objectifs",
      question: "Si vous deviez résoudre un grand problème, quelle serait votre motivation principale ?",
      type: "single",
      options: [
        { id: 'A', icon: '🔍', title: 'Comprendre la racine du problème pour une solution durable' },
        { id: 'B', icon: '⚡', title: 'Mettre en place rapidement une solution concrète' },
        { id: 'C', icon: '🤝', title: 'Rallier les gens autour de la solution' },
        { id: 'D', icon: '🚀', title: 'Développer une solution technologique avancée' }
      ]
    },
    {
      id: 11,
      category: "Préférences de Travail et Personnalité",
      question: "Préférez-vous travailler :",
      type: "single",
      options: [
        { id: 'A', icon: '👤', title: 'Seul(e) sur un projet, en totale autonomie' },
        { id: 'B', icon: '👥', title: 'En petite équipe, où chacun apporte sa pierre à l\'édifice' },
        { id: 'C', icon: '🏢', title: 'Au sein d\'une grande structure, avec des rôles bien définis' }
      ]
    },
    {
      id: 12,
      category: "Préférences de Travail et Personnalité",
      question: "Lors d'une présentation ou d'un exposé, vous préférez :",
      type: "single",
      options: [
        { id: 'A', icon: '📊', title: 'Préparer méticuleusement et présenter clairement les faits' },
        { id: 'B', icon: '📖', title: 'Raconter une histoire pour capter l\'attention' },
        { id: 'C', icon: '💬', title: 'Répondre aux questions du public et interagir spontanément' }
      ]
    },
    {
      id: 13,
      category: "Préférences de Travail et Personnalité",
      question: "Quand vous prenez une décision importante, vous vous fiez le plus à :",
      type: "single",
      options: [
        { id: 'A', icon: '🧠', title: 'La logique et l\'analyse des faits' },
        { id: 'B', icon: '💭', title: 'Votre intuition et vos sentiments' },
        { id: 'C', icon: '👥', title: 'L\'avis des personnes que vous respectez' }
      ]
    },
    {
      id: 14,
      category: "Matières et Parcours Académiques Préférés",
      question: "Parmi ces groupes de matières, lesquels vous ont le plus passionné(e) durant votre parcours scolaire ?",
      type: "multiple",
      maxSelections: 2,
      options: [
        { id: 'A', icon: '🔬', title: 'Sciences', description: 'Maths, Physique-Chimie, SVT' },
        { id: 'B', icon: '📚', title: 'Littérature et Langues', description: 'Français, Langues étrangères, Philosophie' },
        { id: 'C', icon: '🌍', title: 'Sciences Sociales et Humaines', description: 'Histoire-Géo, SES, Psychologie' },
        { id: 'D', icon: '🎨', title: 'Arts et Design', description: 'Arts Plastiques, Musique, Design' },
        { id: 'E', icon: '💻', title: 'Technologie et Informatique', description: 'NSI, STI2D, Sciences de l\'ingénieur' },
        { id: 'F', icon: '💰', title: 'Gestion et Économie', description: 'Management, Droit' }
      ]
    },
    {
      id: 15,
      category: "Informations Personnelles",
      question: "15- ENTER YOUR EMAIL & FIND OUT",
      subtitle: "(FILL OUT THIS FORME)",
      type: "personal_info"
    }
  ];

  const currentQ = questions[currentQuestion];

  // Gestion des réponses
  const handleSingleAnswer = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleMultipleAnswer = (optionId) => {
    setSelectedMultiple(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else if (prev.length < currentQ.maxSelections) {
        return [...prev, optionId];
      }
      return prev;
    });
  };

  const handleDragDrop = (optionId) => {
    if (!dragOrder.includes(optionId)) {
      setDragOrder(prev => [...prev, optionId]);
    }
  };

  const removeFromDragOrder = (index) => {
    setDragOrder(prev => prev.filter((_, i) => i !== index));
  };

  const handleSliderChange = (optionId, value) => {
    setSliderValues(prev => ({ ...prev, [optionId]: value }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Sauvegarder les réponses de la question actuelle
    if (currentQ.type === 'multiple') {
      setAnswers(prev => ({ ...prev, [currentQ.id]: selectedMultiple }));
      setSelectedMultiple([]);
    } else if (currentQ.type === 'dragdrop') {
      setAnswers(prev => ({ ...prev, [currentQ.id]: dragOrder }));
      setDragOrder([]);
    } else if (currentQ.type === 'sliders') {
      setAnswers(prev => ({ ...prev, [currentQ.id]: sliderValues }));
      setSliderValues({});
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const sendAnswersToBackend = async () => {
    try {
      // Sauvegarder d'abord les informations personnelles
      if (personalInfo.nom && personalInfo.email && personalInfo.telephone) {
        await savePersonalInfo();
      }

      // Envoyer les réponses du test au backend
      const result = await orientationService.calculateOrientation(answers);
      
      // Naviguer vers la page de résultats avec les informations personnelles
      navigate('/orientation-results', { 
        state: { 
          results: result, 
          personalInfo: personalInfo,
          answers: answers 
        } 
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des réponses:', error);
      alert('Erreur lors de l\'envoi des réponses. Veuillez réessayer.');
    }
  };

  const savePersonalInfo = async () => {
    try {
      await orientationService.savePersonalInfo(personalInfo);
      console.log('Informations personnelles sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  };

  const renderQuestionContent = () => {
    switch (currentQ.type) {
      case 'single':
        return (
          <div className="options">
            {currentQ.options.map((option) => (
              <label key={option.id} className="option">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={option.id}
                  checked={answers[currentQ.id] === option.id}
                  onChange={() => handleSingleAnswer(option.id)}
                />
                <div className="option-content">
                  <span className="option-icon">{option.icon}</span>
                  <div className="option-text">
                    <span className="option-title">{option.title}</span>
                    {option.description && (
                      <span className="option-description">{option.description}</span>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="options">
            {currentQ.options.map((option) => (
              <label key={option.id} className="option">
                <input
                  type="checkbox"
                  checked={selectedMultiple.includes(option.id)}
                  onChange={() => handleMultipleAnswer(option.id)}
                />
                <div className="option-content">
                  <span className="option-icon">{option.icon}</span>
                  <div className="option-text">
                    <span className="option-title">{option.title}</span>
                    {option.description && (
                      <span className="option-description">{option.description}</span>
                    )}
                  </div>
                </div>
              </label>
            ))}
            <div className="selection-info">
              Sélectionnez jusqu'à {currentQ.maxSelections} option(s)
            </div>
          </div>
        );

      case 'dragdrop':
        return (
          <div className="dragdrop-container">
            <div className="available-options">
              <h4>Options disponibles :</h4>
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  className="drag-option"
                  onClick={() => handleDragDrop(option.id)}
                  disabled={dragOrder.includes(option.id)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-title">{option.title}</span>
                </button>
              ))}
            </div>
            <div className="selected-order">
              <h4>Votre ordre de préférence :</h4>
              {dragOrder.map((optionId, index) => {
                const option = currentQ.options.find(opt => opt.id === optionId);
                return (
                  <div key={optionId} className="selected-option">
                    <span className="order-number">{index + 1}</span>
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-title">{option.title}</span>
                    <button
                      className="remove-button"
                      onClick={() => removeFromDragOrder(index)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'sliders':
        return (
          <div className="sliders-container">
            {currentQ.options.map((option) => (
              <div key={option.id} className="slider-group">
                <div className="slider-label">
                  <span>{option.title}</span>
                  <span className="slider-value">{sliderValues[option.id] || 0}/5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={sliderValues[option.id] || 0}
                  onChange={(e) => handleSliderChange(option.id, parseInt(e.target.value))}
                  className="slider-input"
                />
                <div className="slider-labels">
                  <span>Pas important</span>
                  <span>Très important</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'personal_info':
        return (
          <div className="personal-info-container">
            <div className="personal-info-subtitle">
              {currentQ.subtitle}
            </div>
            <div className="form-fields">
              <div className="form-field">
                <label htmlFor="nom">Your Name</label>
                <input
                  type="text"
                  id="nom"
                  placeholder="Enter Your Name..."
                  value={personalInfo.nom}
                  onChange={(e) => handlePersonalInfoChange('nom', e.target.value)}
                  className="personal-info-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address here..."
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="personal-info-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="telephone">Your Number phone</label>
                <input
                  type="tel"
                  id="telephone"
                  placeholder="Enter your Number phone here..."
                  value={personalInfo.telephone}
                  onChange={(e) => handlePersonalInfoChange('telephone', e.target.value)}
                  className="personal-info-input"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentQ.type) {
      case 'single':
        return answers[currentQ.id];
      case 'multiple':
        return selectedMultiple.length > 0;
      case 'dragdrop':
        return dragOrder.length > 0;
      case 'sliders':
        return Object.keys(sliderValues).length > 0;
      case 'personal_info':
        return personalInfo.nom && personalInfo.email && personalInfo.telephone;
      default:
        return false;
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="test-container">
      {/* Particules magiques */}
      <div className="magic-particles">
        <div className="particle particle-0"></div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="test-content">
        {/* En-tête du test */}
        <div className="test-header">
          <h1 className="test-title">Test d'Orientation</h1>
          <p className="test-subtitle">Découvrez votre profil et trouvez votre voie</p>
        </div>

        {/* Barre de progression */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Question {currentQuestion + 1} sur {questions.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Section de la question */}
        <div className="question-section">
          <div className="question-number">Question {currentQuestion + 1}</div>
          <h2 className="question-text">{currentQ.question}</h2>
          
          {/* Contenu de la question selon le type */}
          {renderQuestionContent()}
        </div>

        {/* Boutons de navigation */}
        <div className="navigation-buttons">
          {currentQuestion > 0 && (
            <button className="nav-button" onClick={handlePrevious}>
              ← Précédent
            </button>
          )}
          
          <button 
            className="nav-button"
            disabled={!canProceed()}
            onClick={currentQuestion === questions.length - 1 ? sendAnswersToBackend : handleNext}
          >
            {currentQuestion === questions.length - 1 ? 'See My Result Now' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnifiedOrientationTest;
