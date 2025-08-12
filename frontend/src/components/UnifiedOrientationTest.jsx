import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        { id: 'A', icon: '📖', title: 'Lire et prendre des notes détaillées' },
        { id: 'B', icon: '🎥', title: 'Regarder des tutoriels vidéo ou des démonstrations' },
        { id: 'C', icon: '🔄', title: 'Essayer par moi-même, pratiquer et faire des erreurs' },
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
        { id: 'C', icon: '🌟', title: 'Contribuer à la beauté et à la culture', description: 'Arts, design, histoire' },
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
        { id: 'A', icon: '🔬', title: 'Comprendre la racine du problème', description: 'Pour une solution durable' },
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
      maxSelections: 3,
      options: [
        { id: 'A', icon: '🔬', title: 'Sciences', description: 'Maths, Physique-Chimie, SVT' },
        { id: 'B', icon: '📚', title: 'Littérature et Langues', description: 'Français, Langues étrangères, Philosophie' },
        { id: 'C', icon: '🌍', title: 'Sciences Sociales et Humaines', description: 'Histoire-Géo, SES, Psychologie' },
        { id: 'D', icon: '🎨', title: 'Arts et Design', description: 'Arts Plastiques, Musique, Design' },
        { id: 'E', icon: '💻', title: 'Technologie et Informatique', description: 'NSI, STI2D, Sciences de l\'ingénieur' },
        { id: 'F', icon: '📊', title: 'Gestion et Économie', description: 'Management, Droit' }
      ]
    }
  ];

  const currentQ = questions[currentQuestion];

  useEffect(() => {
    // Initialiser les valeurs par défaut
    if (currentQ.type === 'sliders') {
      const defaultValues = {};
      currentQ.options.forEach(option => {
        defaultValues[option.id] = 50;
      });
      setSliderValues(defaultValues);
    }
  }, [currentQuestion]);

  const handleSingleSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleMultipleSelect = (optionId) => {
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

  const removeFromDragOrder = (optionId) => {
    setDragOrder(prev => prev.filter(id => id !== optionId));
  };

  const handleSliderChange = (optionId, value) => {
    setSliderValues(prev => ({ ...prev, [optionId]: value }));
  };

  const handleNext = () => {
    let currentAnswer;
    
    switch (currentQ.type) {
      case 'single':
        currentAnswer = answers[currentQ.id];
        break;
      case 'multiple':
        currentAnswer = selectedMultiple;
        break;
      case 'dragdrop':
        currentAnswer = dragOrder;
        break;
      case 'sliders':
        currentAnswer = sliderValues;
        break;
      default:
        currentAnswer = null;
    }

    if (currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true)) {
      // Sauvegarder la réponse
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentAnswer }));
      
      // Réinitialiser les états temporaires
      setDragOrder([]);
      setSliderValues({});
      setSelectedMultiple([]);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Test terminé, naviguer vers les résultats
        navigate('/orientation-results', { state: { answers: { ...answers, [currentQ.id]: currentAnswer } } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Restaurer la réponse précédente si elle existe
      const prevAnswer = answers[questions[currentQuestion - 1].id];
      if (prevAnswer) {
        if (questions[currentQuestion - 1].type === 'dragdrop') {
          setDragOrder(prevAnswer);
        } else if (questions[currentQuestion - 1].type === 'sliders') {
          setSliderValues(prevAnswer);
        } else if (questions[currentQuestion - 1].type === 'multiple') {
          setSelectedMultiple(prevAnswer);
        }
      }
    }
  };

  const renderQuestionContent = () => {
    switch (currentQ.type) {
      case 'single':
        return (
          <div className="options-grid">
            {currentQ.options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${answers[currentQ.id] === option.id ? 'selected' : ''}`}
                onClick={() => handleSingleSelect(option.id)}
              >
                <div className="option-icon">{option.icon}</div>
                <h3 className="option-title">{option.title}</h3>
                {option.description && <p className="option-description">{option.description}</p>}
                <div className="option-check">
                  {answers[currentQ.id] === option.id && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="options-grid multiple">
            {currentQ.options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${selectedMultiple.includes(option.id) ? 'selected' : ''}`}
                onClick={() => handleMultipleSelect(option.id)}
              >
                <div className="option-icon">{option.icon}</div>
                <h3 className="option-title">{option.title}</h3>
                {option.description && <p className="option-description">{option.description}</p>}
                <div className="option-check">
                  {selectedMultiple.includes(option.id) && <span>✓</span>}
                </div>
              </div>
            ))}
            <div className="selection-info">
              Sélectionnez jusqu'à {currentQ.maxSelections} options ({selectedMultiple.length}/{currentQ.maxSelections})
            </div>
          </div>
        );

      case 'dragdrop':
        return (
          <div className="dragdrop-container">
            <div className="available-options">
              <h4>Options disponibles :</h4>
              <div className="options-grid">
                {currentQ.options.filter(option => !dragOrder.includes(option.id)).map((option) => (
                  <div
                    key={option.id}
                    className="option-card draggable"
                    onClick={() => handleDragDrop(option.id)}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <h3 className="option-title">{option.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="selected-order">
              <h4>Votre ordre de préférence (top 3) :</h4>
              <div className="order-slots">
                {[1, 2, 3].map((position) => (
                  <div key={position} className="order-slot">
                    <span className="position-number">{position}</span>
                    {dragOrder[position - 1] && (
                      <div className="selected-option">
                        <div className="option-icon">
                          {currentQ.options.find(opt => opt.id === dragOrder[position - 1])?.icon}
                        </div>
                        <span className="option-title">
                          {currentQ.options.find(opt => opt.id === dragOrder[position - 1])?.title}
                        </span>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromDragOrder(dragOrder[position - 1])}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'sliders':
        return (
          <div className="sliders-container">
            {currentQ.options.map((option) => (
              <div key={option.id} className="slider-item">
                <div className="slider-header">
                  <h4 className="slider-title">{option.title}</h4>
                  <span className="slider-value">{sliderValues[option.id] || 50}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues[option.id] || 50}
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

      {/* Barre de progression */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} sur {questions.length}
        </span>
      </div>

      {/* Catégorie */}
      <div className="category-badge">
        {currentQ.category}
      </div>

      {/* Question */}
      <div className="question-container">
        <h2 className="question-text">{currentQ.question}</h2>
        
        {/* Contenu de la question selon le type */}
        {renderQuestionContent()}
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button className="nav-button previous" onClick={handlePrevious}>
            <span className="arrow">←</span>
            Précédent
          </button>
        )}
        
        <button 
          className="nav-button next"
          disabled={!canProceed()}
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? 'Terminer le test' : 'Suivant'}
          <span className="arrow">→</span>
        </button>
      </div>

      {/* Indicateur de progression visuel */}
      <div className="progress-indicator">
        <div className="progress-dots">
          {questions.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index <= currentQuestion ? 'active' : ''} ${index === currentQuestion ? 'current' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnifiedOrientationTest;
