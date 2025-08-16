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
    if (dragOrder.length < 3) {
      setDragOrder(prev => [...prev, optionId]);
    }
  };

  const removeFromDragOrder = (index) => {
    setDragOrder(prev => prev.filter((_, i) => i !== index));
  };

  const handleSliderChange = (optionId, value) => {
    setSliderValues(prev => ({ ...prev, [optionId]: value }));
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      // Terminer le test
      const allAnswers = {
        ...answers,
        [currentQ.id]: currentQ.type === 'multiple' ? selectedMultiple : 
                      currentQ.type === 'dragdrop' ? dragOrder :
                      currentQ.type === 'sliders' ? sliderValues : answers[currentQ.id]
      };
      
      sendAnswersToBackend(allAnswers);
    } else {
      // Sauvegarder les réponses de la question actuelle
      const currentAnswers = currentQ.type === 'multiple' ? selectedMultiple : 
                           currentQ.type === 'dragdrop' ? dragOrder :
                           currentQ.type === 'sliders' ? sliderValues : answers[currentQ.id];
      
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswers }));
      
      // Passer à la question suivante
      setCurrentQuestion(prev => prev + 1);
      
      // Réinitialiser les états spécifiques
      setSelectedMultiple([]);
      setDragOrder([]);
      setSliderValues({});
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Réinitialiser les états spécifiques
      setSelectedMultiple([]);
      setDragOrder([]);
      setSliderValues({});
    }
  };

  const sendAnswersToBackend = async () => {
    try {
      // Préparer les données dans le format attendu par le backend
      const requestData = {
        question1: allAnswers[1] || "A",
        question2: allAnswers[2] ? [allAnswers[2]] : ["A"],
        question3: allAnswers[3] || "A",
        question4: allAnswers[4] || "A",
        question5: allAnswers[5] ? [allAnswers[5]] : ["A"],
        question6: allAnswers[6] || "A",
        question7: allAnswers[7] || "A",
        question8: allAnswers[8] || "A",
        question9: {
          "security": 80,
          "innovation": 70,
          "autonomy": 75,
          "salary": 65
        },
        question10: allAnswers[10] || "A",
        question11: allAnswers[11] || "A",
        question12: allAnswers[12] || "A",
        question13: allAnswers[13] || "A",
        question14: allAnswers[14] ? [allAnswers[14]] : ["A"]
      };

      console.log('Envoi des réponses au backend:', requestData);

      // Utiliser le service d'orientation pour communiquer avec le backend
      const response = await orientationService.calculateOrientation(requestData);
      
      console.log('Réponse du backend:', response);

      navigate('/orientation/results', { 
        state: { 
          backendResponse: response,
          userAnswers: allAnswers
        } 
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi au backend:', error);
      navigate('/orientation/results', { 
        state: { 
          userAnswers: allAnswers,
          error: 'Erreur de connexion au serveur'
        } 
      });
    }
  };

  // Rendu du contenu de la question selon le type
  const renderQuestionContent = () => {
    switch (currentQ.type) {
      case 'single':
        return (
          <div className="options-grid">
            {currentQ.options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${answers[currentQ.id] === option.id ? 'selected' : ''}`}
                onClick={() => handleSingleAnswer(option.id)}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-content">
                  <h3 className="option-title">{option.title}</h3>
                  {option.description && (
                    <p className="option-description">{option.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="options-grid">
            {currentQ.options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${selectedMultiple.includes(option.id) ? 'selected' : ''}`}
                onClick={() => handleMultipleAnswer(option.id)}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-content">
                  <h3 className="option-title">{option.title}</h3>
                  {option.description && (
                    <p className="option-description">{option.description}</p>
                  )}
                </div>
                {selectedMultiple.includes(option.id) && (
                  <div className="selection-indicator">✓</div>
                )}
              </div>
            ))}
            <div className="selection-info">
              Sélectionné(s): {selectedMultiple.length}/{currentQ.maxSelections}
            </div>
          </div>
        );

      case 'dragdrop':
        return (
          <div className="dragdrop-container">
            <div className="available-options">
              <h4>Options disponibles :</h4>
              <div className="options-grid">
                {currentQ.options
                  .filter(option => !dragOrder.includes(option.id))
                  .map((option) => (
                    <div
                      key={option.id}
                      className="option-card draggable"
                      onClick={() => handleDragDrop(option.id)}
                    >
                      <div className="option-icon">{option.icon}</div>
                      <div className="option-title">{option.title}</div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="selected-order">
              <h4>Votre ordre de préférence :</h4>
              <div className="order-list">
                {dragOrder.map((optionId, index) => {
                  const option = currentQ.options.find(opt => opt.id === optionId);
                  return (
                    <div key={optionId} className="order-item">
                      <span className="order-number">{index + 1}</span>
                      <div className="option-icon">{option.icon}</div>
                      <div className="option-title">{option.title}</div>
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
      default:
        return false;
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="unified-test-container">
      {/* Header avec navigation */}
      <div className="test-header">
        <div className="header-content">
          <h1 className="test-title">Test d'Orientation</h1>
          <p className="test-subtitle">Découvrez votre profil et trouvez votre voie</p>
        </div>
      </div>

      {/* Carte principale du test */}
      <div className="test-card">
        {/* Question principale */}
        <h2 className="question-text">{currentQ.question}</h2>
        <p className="question-instruction">
          {currentQ.type === 'single' && '(SÉLECTIONNEZ UNE SEULE OPTION)'}
          {currentQ.type === 'multiple' && '(SÉLECTIONNEZ JUSQU\'À 3 OPTIONS)'}
          {currentQ.type === 'dragdrop' && '(GLISSEZ-DÉPOSEZ 3 OPTIONS DANS L\'ORDRE DE PRÉFÉRENCE)'}
          {currentQ.type === 'sliders' && '(AJUSTEZ LES CURSEURS SELON VOTRE PRÉFÉRENCE)'}
        </p>
        
        {/* Contenu de la question selon le type */}
        {renderQuestionContent()}

        {/* Navigation et progression */}
        <div className="navigation-section">
          {currentQuestion > 0 && (
            <a href="#" className="back-button" onClick={handlePrevious}>
              ← Précédent
            </a>
          )}
          
          <button 
            className={`btn ${canProceed() ? 'btn-primary' : 'btn-secondary'}`}
            disabled={!canProceed()}
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? 'Terminer le test' : 'Suivant'}
          </button>
        </div>

        {/* Barre de progression professionnelle */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} sur {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedOrientationTest;
