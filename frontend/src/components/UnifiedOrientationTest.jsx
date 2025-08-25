import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orientationService from '../services/orientationService';
import GlobalLayout from './GlobalLayout';
import { API_CONFIG } from '../config/api';
import QuestionStatusDebugger from './QuestionStatusDebugger';
// Supprimé l'import de CountdownPage
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
  const [testStarted, setTestStarted] = useState(false);
  const [showChoice, setShowChoice] = useState(true);
  const navigate = useNavigate();

  // Fonction pour gérer le début du test
  const handleStartTest = () => {
    setShowChoice(false);
    setTestStarted(false); // Ne pas aller directement aux questions, d'abord collecter les infos
  };

  // Fonction pour commencer le test après avoir collecté les infos
  const handleStartTestAfterInfo = () => {
    // Vérifier que les informations personnelles sont remplies
    if (!personalInfo.nom || !personalInfo.email) {
      alert('Veuillez remplir votre nom et email avant de commencer le test.');
      return;
    }
    
    setTestStarted(true); // Maintenant aller aux questions
  };

  // Fonction pour voir les programmes
  const handleViewPrograms = () => {
    navigate('/programs');
  };

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
        { id: 'securite', title: 'La sécurité de l\'emploi et la stabilité' },
        { id: 'innovation', title: 'La possibilité d\'innover et d\'être à la pointe' },
        { id: 'autonomie', title: 'L\'autonomie et la liberté de mes décisions' },
        { id: 'salaire', title: 'Un salaire élevé et de bonnes opportunités financières' }
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
      maxSelections: 3,
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
      const newSelection = prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : prev.length < currentQ.maxSelections 
          ? [...prev, optionId]
          : prev;
      
      // Sauvegarder immédiatement dans answers
      setAnswers(prev => ({ ...prev, [currentQ.id]: newSelection }));
      
      return newSelection;
    });
  };

  const handleDragDrop = (optionId) => {
    // Pour la question 5, limiter à 3 sélections maximum
    if (currentQ.id === 5 && dragOrder.length >= 3 && !dragOrder.includes(optionId)) {
      alert('Vous ne pouvez sélectionner que 3 options maximum. Supprimez une option existante pour en ajouter une nouvelle.');
      return;
    }
    
    if (!dragOrder.includes(optionId)) {
      const newDragOrder = [...dragOrder, optionId];
      setDragOrder(newDragOrder);
      
      // Sauvegarder immédiatement dans answers
      setAnswers(prev => ({ ...prev, [currentQ.id]: newDragOrder }));
    }
  };

  const removeFromDragOrder = (index) => {
    const newDragOrder = dragOrder.filter((_, i) => i !== index);
    setDragOrder(newDragOrder);
    
    // Sauvegarder immédiatement dans answers
    setAnswers(prev => ({ ...prev, [currentQ.id]: newDragOrder }));
  };

  // Fonction pour gérer le drop dans la zone de destination
  const handleDrop = (e) => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData('text/plain');
    if (optionId && !dragOrder.includes(optionId)) {
      const newDragOrder = [...dragOrder, optionId];
      setDragOrder(newDragOrder);
      
      // Sauvegarder immédiatement dans answers
      setAnswers(prev => ({ ...prev, [currentQ.id]: newDragOrder }));
    }
  };

  // Fonction pour permettre le drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSliderChange = (optionId, value) => {
    const newSliderValues = { ...sliderValues, [optionId]: value };
    setSliderValues(newSliderValues);
    
    // Sauvegarder immédiatement dans answers
    setAnswers(prev => ({ ...prev, [currentQ.id]: newSliderValues }));
    
    console.log('🎚️ Curseur modifié:', { optionId, value, newSliderValues });
  };

  // Initialiser les valeurs des curseurs si elles n'existent pas
  useEffect(() => {
    if (currentQ.type === 'sliders' && currentQ.id === 9) {
      const currentSliderValues = sliderValues;
      let hasChanges = false;
      
      currentQ.options.forEach(option => {
        if (currentSliderValues[option.id] === undefined) {
          currentSliderValues[option.id] = 0;
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setSliderValues({ ...currentSliderValues });
        console.log('🎚️ Initialisation des curseurs:', currentSliderValues);
      }
    }
  }, [currentQuestion, currentQ.type, currentQ.id, currentQ.options]);

  // Fonction pour gérer les changements d'informations personnelles
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

  const handleSubmit = () => {
    // Vérifier que toutes les questions ont été répondues avec une validation complète
    const totalAnswered = getTotalAnsweredQuestions();
    if (totalAnswered < 14) {
      alert(`Veuillez répondre à toutes les questions. Vous avez répondu à ${totalAnswered}/14 questions.`);
      return;
    }

    // Transformer les réponses au format attendu par le backend
    const transformedAnswers = transformAnswersForBackend(answers);
    
    // Vérifier que les informations personnelles sont remplies
    if (!personalInfo.email || !personalInfo.nom) {
      alert('Veuillez remplir votre nom et email avant de soumettre le test.');
      return;
    }

    // Envoyer les réponses transformées
    sendAnswersToBackend(transformedAnswers);
  };

  // Fonction pour compter correctement toutes les questions répondues
  const getTotalAnsweredQuestions = () => {
    let count = 0;
    
    // Compter les questions avec réponses simples (1, 3, 4, 6, 7, 8, 10, 11, 12, 13)
    const simpleAnswers = Object.keys(answers).filter(key => ![2, 5, 9, 14].includes(parseInt(key)));
    count += simpleAnswers.length;
    
    // Compter les questions à choix multiples (Question 2)
    if (selectedMultiple.length > 0) {
      count += 1;
    }
    
    // Compter les questions de glisser-déposer (Question 5)
    // Plus flexible : accepter si dragOrder a des éléments OU si answers[5] existe
    if (dragOrder.length > 0 || (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0)) {
      count += 1;
    }
    
    // Compter les questions avec curseurs (Question 9)
    // Plus flexible : accepter si sliderValues a des valeurs OU si answers[9] existe
    const hasSliderValues = Object.keys(sliderValues).length > 0 && 
                           Object.values(sliderValues).some(value => value !== undefined && value >= 0);
    const hasAnswers9 = answers[9] && typeof answers[9] === 'object' && 
                       Object.keys(answers[9]).length > 0;
    
    if (hasSliderValues || hasAnswers9) {
      count += 1;
    }
    
    // Compter la question 14 (sélection multiple de matières)
    if (answers[14] && Array.isArray(answers[14]) && answers[14].length > 0) {
      count += 1;
    }
    
    console.log('📊 Détail du comptage des questions:', {
      simpleAnswers: simpleAnswers.length,
      selectedMultiple: selectedMultiple.length > 0 ? 1 : 0,
      dragOrder: dragOrder.length > 0 ? 1 : 0,
      answers5: (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0) ? 1 : 0,
      sliderValues: hasSliderValues ? 1 : 0,
      answers9: hasAnswers9 ? 1 : 0,
      question14: (answers[14] && Array.isArray(answers[14]) && answers[14].length > 0) ? 1 : 0,
      total: count
    });
    
    return count;
  };

  // Fonction pour transformer les réponses au format backend
  const transformAnswersForBackend = (rawAnswers) => {
    const transformed = {};
    
    // Question 1: String simple
    if (rawAnswers[1]) {
      transformed.question1 = rawAnswers[1];
    }
    
    // Question 2: Array de strings (choix multiples)
    if (selectedMultiple.length > 0) {
      transformed.question2 = selectedMultiple;
    } else if (rawAnswers[2]) {
      transformed.question2 = rawAnswers[2];
    }
    
    // Question 3: String simple
    if (rawAnswers[3]) {
      transformed.question3 = rawAnswers[3];
    }
    
    // Question 4: String simple
    if (rawAnswers[4]) {
      transformed.question4 = rawAnswers[4];
    }
    
    // Question 5: Array de strings (ordre de préférence - glisser-déposer)
    // Transformer les IDs en textes complets pour le backend
    if (dragOrder.length > 0) {
      const question5Texts = dragOrder.map(id => {
        const option = questions.find(q => q.id === 5)?.options.find(opt => opt.id === id);
        return option ? option.title : id;
      });
      transformed.question5 = question5Texts;
      console.log('🔄 Question 5 transformée:', { dragOrder, question5Texts });
    } else if (rawAnswers[5]) {
      transformed.question5 = rawAnswers[5];
    }
    
    // Question 6: String simple
    if (rawAnswers[6]) {
      transformed.question6 = rawAnswers[6];
    }
    
    // Question 7: String simple
    if (rawAnswers[7]) {
      transformed.question7 = rawAnswers[7];
    }
    
    // Question 8: String simple
    if (rawAnswers[8]) {
      transformed.question8 = rawAnswers[8];
    }
    
    // Question 9: Map des curseurs avec clés correctes
    if (Object.keys(sliderValues).length > 0) {
      // S'assurer que les clés correspondent exactement à ce que le backend attend
      const question9Data = {
        securite: sliderValues.securite || 0,
        innovation: sliderValues.innovation || 0,
        autonomie: sliderValues.autonomie || 0,
        salaire: sliderValues.salaire || 0
      };
      transformed.question9 = question9Data;
      console.log('🔄 Question 9 transformée:', { sliderValues, question9Data });
    } else if (rawAnswers[9]) {
      transformed.question9 = rawAnswers[9];
    }
    
    // Question 10: String simple
    if (rawAnswers[10]) {
      transformed.question10 = rawAnswers[10];
    }
    
    // Question 11: String simple
    if (rawAnswers[11]) {
      transformed.question11 = rawAnswers[11];
    }
    
    // Question 12: String simple
    if (rawAnswers[12]) {
      transformed.question12 = rawAnswers[12];
    }
    
    // Question 13: String simple
    if (rawAnswers[13]) {
      transformed.question13 = rawAnswers[13];
    }
    
    // Question 14: Array de strings (matières préférées)
    // Transformer les IDs en textes complets pour le backend
    if (rawAnswers[14] && Array.isArray(rawAnswers[14])) {
      const question14Texts = rawAnswers[14].map(id => {
        const option = questions.find(q => q.id === 14)?.options.find(opt => opt.id === id);
        return option ? option.title : id;
      });
      transformed.question14 = question14Texts;
      console.log('🔄 Question 14 transformée:', { rawAnswers14: rawAnswers[14], question14Texts });
    }
    
    // Ajouter les informations personnelles
    if (personalInfo.nom && personalInfo.email) {
      transformed.personalInfo = {
        nom: personalInfo.nom,
        email: personalInfo.email,
        telephone: personalInfo.telephone || ''
      };
    }
    
    console.log('🔄 Réponses transformées pour le backend:', transformed);
    return transformed;
  };

  const sendAnswersToBackend = async (transformedAnswers) => {
    try {
      console.log('🚀 Début de l\'envoi des réponses au backend');
      console.log('📤 Réponses à envoyer:', transformedAnswers);
      console.log('👤 Informations personnelles:', personalInfo);

      // Utiliser le service d'orientation configuré au lieu de fetch direct
      const result = await orientationService.calculateOrientation(transformedAnswers);
      
      console.log('✅ Résultats reçus du backend:', result);

      // Vérifier que les résultats sont valides
      if (!result || !result.topRecommendations) {
        throw new Error('Réponse invalide du backend: pas de recommandations');
      }

      console.log('🎯 Navigation vers la page de résultats...');

      // Naviguer vers la page de résultats avec toutes les informations
      navigate('/orientation/results', { 
        state: { 
          results: result, 
          personalInfo: personalInfo,
          answers: transformedAnswers,
          timestamp: new Date().toISOString()
        } 
      });

      console.log('✅ Navigation réussie vers /orientation/results');

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des réponses:', error);

      // Afficher un message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de l\'envoi des réponses. ';

      if (error.message.includes('HTTP')) {
        // Erreur de réponse du serveur
        errorMessage += error.message;
      } else {
        // Erreur de configuration ou autre
        errorMessage += error.message;
      }

      alert(errorMessage);

      // En cas d'erreur, on peut quand même essayer de naviguer vers les résultats
      // avec un message d'erreur pour permettre à l'utilisateur de réessayer
      console.log('🔄 Tentative de navigation avec message d\'erreur...');
      navigate('/orientation/results', {
        state: {
          error: errorMessage,
          personalInfo: personalInfo,
          answers: transformedAnswers,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const savePersonalInfo = async (info) => {
    try {
      const response = await orientationService.savePersonalInfo(info);
      console.log('Informations personnelles sauvegardées avec succès');
      return response; // Retourner la réponse pour l'utiliser dans sendAnswersToBackend
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  };

  const renderQuestionContent = () => {
    switch (currentQ.type) {
      case 'single':
        return (
          <div className="options-grid" data-options={currentQ.options.length}>
            {currentQ.options.map((option) => (
              <label key={option.id} className="option-card">
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={option.id}
                  checked={answers[currentQ.id] === option.id}
                  onChange={() => handleSingleAnswer(option.id)}
                />
                <div className="option-card-content">
                  <div className="option-icon">{option.icon}</div>
                  <div className="option-text">
                    <h3 className="option-title">{option.title}</h3>
                    {option.description && (
                      <p className="option-description">{option.description}</p>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="options-grid" data-options={currentQ.options.length}>
            <div className="multiple-instruction">
              <p>🎓 Sélectionnez jusqu'à {currentQ.maxSelections} matière(s) qui vous ont le plus passionné(e) :</p>
            </div>
            {currentQ.options.map((option) => (
              <label key={option.id} className="option-card">
                <input
                  type="checkbox"
                  checked={selectedMultiple.includes(option.id)}
                  onChange={() => handleMultipleAnswer(option.id)}
                />
                <div className="option-card-content">
                  <div className="option-icon">{option.icon}</div>
                  <div className="option-text">
                    <h3 className="option-title">{option.title}</h3>
                    {option.description && (
                      <p className="option-description">{option.description}</p>
                    )}
                  </div>
                </div>
              </label>
            ))}
            <div className="selection-info">
              <p>📊 <strong>Sélection actuelle :</strong> {selectedMultiple.length}/{currentQ.maxSelections} matière(s)</p>
              {selectedMultiple.length > 0 && (
                <p>🎯 <strong>Matières sélectionnées :</strong> 
                  {selectedMultiple.map(id => {
                    const option = currentQ.options.find(opt => opt.id === id);
                    return ` ${option.title}`;
                  })}
                </p>
              )}
              {selectedMultiple.length === 0 && (
                <p className="selection-warning">⚠️ Veuillez sélectionner au moins une matière</p>
              )}
              {selectedMultiple.length === currentQ.maxSelections && (
                <p className="selection-complete">✅ Sélection maximale atteinte</p>
              )}
            </div>
          </div>
        );

      case 'dragdrop':
        return (
          <div className="dragdrop-container">
            <div className="available-options">
              <h4>🎯 Sélectionnez vos 3 activités préférées :</h4>
              <div className={`options-grid ${currentQ.id === 5 ? 'question-5-special' : ''}`} data-options={currentQ.options.length}>
              {currentQ.options.map((option) => (
                  <div
                  key={option.id}
                    className={`drag-option ${dragOrder.includes(option.id) ? 'selected' : ''}`}
                    draggable={!dragOrder.includes(option.id)}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', option.id);
                    }}
                  onClick={() => handleDragDrop(option.id)}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-title">{option.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="selected-order">
              <h4>📋 Vos 3 choix (dans l'ordre de préférence) :</h4>
              <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
              {dragOrder.map((optionId, index) => {
                const option = currentQ.options.find(opt => opt.id === optionId);
                return (
                  <div key={optionId} className="selected-option">
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
                {dragOrder.length === 0 && (
                  <div className="empty-drop-zone">
                    🎯 Cliquez sur 3 options pour les sélectionner
                  </div>
                )}
                {dragOrder.length > 0 && dragOrder.length < 3 && (
                  <div className="selection-hint">
                    ⚠️ Sélectionnez encore {3 - dragOrder.length} option(s)
                  </div>
                )}
                {dragOrder.length === 3 && (
                  <div className="selection-complete">
                    ✅ Sélection complète ! Vous pouvez maintenant passer à la question suivante.
                  </div>
                )}
              </div>
              <div className="dragdrop-summary">
                <p>📊 <strong>Progression :</strong> {dragOrder.length}/3 options sélectionnées</p>
                {dragOrder.length === 3 && (
                  <p>🎯 <strong>Ordre de préférence :</strong> 
                    {dragOrder.map((optionId, index) => {
                      const option = currentQ.options.find(opt => opt.id === optionId);
                      return ` ${index + 1}. ${option.title}`;
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'sliders':
        return (
          <div className="sliders-container">
            <div className="sliders-instruction">
              <p>🎯 Déplacez chaque curseur pour indiquer l'importance de chaque critère dans votre future carrière :</p>
            </div>
            {currentQ.options.map((option) => (
              <div key={option.id} className="slider-group">
                <div className="slider-label">
                  <span className="slider-title">{option.title}</span>
                  <span className={`slider-value ${sliderValues[option.id] === undefined ? 'undefined' : ''}`}>
                    {sliderValues[option.id] !== undefined ? sliderValues[option.id] : '?'}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={sliderValues[option.id] || 0}
                  onChange={(e) => handleSliderChange(option.id, parseInt(e.target.value))}
                  className={`slider-input ${sliderValues[option.id] === undefined ? 'undefined' : ''}`}
                />
                <div className="slider-labels">
                  <span>Pas important</span>
                  <span>Très important</span>
                </div>
                {sliderValues[option.id] === undefined && (
                  <div className="slider-warning">⚠️ Veuillez définir une valeur</div>
                )}
              </div>
            ))}
            <div className="sliders-summary">
              <p>📊 <strong>Résumé :</strong> 
                {Object.keys(sliderValues).length === 4 ? 
                  ` Tous les curseurs sont définis (${Object.values(sliderValues).reduce((a, b) => a + b, 0)}/20 points totaux)` :
                  ` ${Object.keys(sliderValues).length}/4 curseurs définis`
                }
              </p>
            </div>
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
        // Pour la question 5, accepter si au moins une option est sélectionnée
        if (currentQ.id === 5) {
          return dragOrder.length > 0 || (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0);
        }
        return dragOrder.length > 0;
      case 'sliders':
        // Pour la question 9, accepter si au moins un curseur a une valeur
        if (currentQ.id === 9) {
          const hasSliderValues = Object.keys(sliderValues).length > 0 && 
                                 Object.values(sliderValues).some(value => value !== undefined && value >= 0);
          const hasAnswers9 = answers[9] && typeof answers[9] === 'object' && 
                             Object.keys(answers[9]).length > 0;
          
          console.log('🎚️ Validation curseurs Q9:', { 
            sliderValues, 
            hasSliderValues, 
            hasAnswers9,
            canProceed: hasSliderValues || hasAnswers9 
          });
          
          return hasSliderValues || hasAnswers9;
        }
        return Object.keys(sliderValues).length > 0;
      default:
        return true;
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  const testApiConnectivity = async () => {
    try {
      const response = await orientationService.testConnection();
      console.log('API Test Response:', response);
      alert(`API Test: ${response.message || 'Connection successful'}`);
    } catch (error) {
      console.error('API Test Error:', error);
      alert(`API Test Error: ${error.message}`);
    }
  };

  const testNavigationToResults = () => {
    navigate('/orientation/results', { 
      state: { 
        answers: answers,
        timestamp: new Date().toISOString(),
        isTestMode: true
      }
    });
  };

  // Fonction de réinitialisation des états pour corriger les problèmes de synchronisation
  const resetStates = () => {
    console.log('🔄 Réinitialisation des états...');
    
    // Réinitialiser les états locaux
    setDragOrder([]);
    setSliderValues({});
    setSelectedMultiple([]);
    
    // Réinitialiser les réponses problématiques
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[5];
      delete newAnswers[9];
      return newAnswers;
    });
    
    console.log('✅ États réinitialisés');
    debugAnswers();
  };

  // Fonction de diagnostic et correction automatique
  const diagnoseAndFix = () => {
    console.log('🔧 === DIAGNOSTIC ET CORRECTION AUTOMATIQUE ===');
    
    // Vérifier et corriger la question 5
    if (dragOrder.length > 0 && (!answers[5] || !Array.isArray(answers[5]))) {
      console.log('🔧 Correction Q5: Synchronisation dragOrder -> answers[5]');
      setAnswers(prev => ({ ...prev, [5]: dragOrder }));
    }
    
    // Vérifier et corriger la question 9
    if (Object.keys(sliderValues).length > 0 && (!answers[9] || typeof answers[9] !== 'object')) {
      console.log('🔧 Correction Q9: Synchronisation sliderValues -> answers[9]');
      setAnswers(prev => ({ ...prev, [9]: sliderValues }));
    }
    
    // Vérifier et corriger la question 14
    if (answers[14] && Array.isArray(answers[14]) && answers[14].length > 0) {
      console.log('✅ Q14: Déjà correcte');
    }
    
    console.log('🔧 === FIN DIAGNOSTIC ET CORRECTION ===');
    debugAnswers();
  };

  // Fonction de débogage améliorée pour les questions problématiques
  const debugAnswers = () => {
    console.log('🔍 === DIAGNOSTIC DES RÉPONSES ===');
    
    for (let i = 1; i <= 14; i++) {
      const hasAnswer = answers[i] !== undefined;
      const answerType = Array.isArray(answers[i]) ? 'Array' : typeof answers[i];
      const answerValue = answers[i];
      
      // Log spécial pour les questions problématiques
      if (i === 5) {
        console.log(`Q${i} (Glisser-déposer): ${hasAnswer ? '✅' : '❌'} (${answerType}) =`, answerValue);
        console.log(`  - dragOrder:`, dragOrder);
        console.log(`  - dragOrder.length:`, dragOrder.length);
        console.log(`  - answers[5]:`, answers[5]);
        console.log(`  - Validation:`, dragOrder.length > 0 || (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0));
      } else if (i === 9) {
        console.log(`Q${i} (Curseurs): ${hasAnswer ? '✅' : '❌'} (${answerType}) =`, answerValue);
        console.log(`  - sliderValues:`, sliderValues);
        console.log(`  - Object.keys(sliderValues):`, Object.keys(sliderValues));
        console.log(`  - Object.values(sliderValues):`, Object.values(sliderValues));
        console.log(`  - answers[9]:`, answers[9]);
        const hasSliderValues = Object.keys(sliderValues).length > 0 && 
                               Object.values(sliderValues).some(value => value !== undefined && value >= 0);
        const hasAnswers9 = answers[9] && typeof answers[9] === 'object' && 
                           Object.keys(answers[9]).length > 0;
        console.log(`  - hasSliderValues:`, hasSliderValues);
        console.log(`  - hasAnswers9:`, hasAnswers9);
        console.log(`  - Validation:`, hasSliderValues || hasAnswers9);
      } else if (i === 14) {
        console.log(`Q${i} (Matières): ${hasAnswer ? '✅' : '❌'} (${answerType}) =`, answerValue);
        if (Array.isArray(answerValue)) {
          console.log(`  - Array length:`, answerValue.length);
          console.log(`  - Array content:`, answerValue);
        }
      } else {
        console.log(`Q${i}: ${hasAnswer ? '✅' : '❌'} (${answerType}) =`, answerValue);
      }
    }
    
    console.log('📊 ÉTATS GLOBAUX:');
    console.log('  - answers:', answers);
    console.log('  - selectedMultiple:', selectedMultiple);
    console.log('  - dragOrder:', dragOrder);
    console.log('  - sliderValues:', sliderValues);
    console.log('  - Total répondues:', getTotalAnsweredQuestions());
    
    console.log('🔍 === FIN DIAGNOSTIC ===');
  };

  // Appeler debugAnswers à chaque changement d'état
  useEffect(() => {
    debugAnswers();
  }, [answers, selectedMultiple, dragOrder, sliderValues]);

  // Si le choix est affiché, montrer les options
  if (showChoice) {
    return (
      <GlobalLayout activePage="orientation">
        <div className="orientation-home-container">
          <div className="orientation-hero">
            <h1 className="orientation-title">
              <span className="system-title">Système d'Orientation des Étudiants</span>
            </h1>
            <p className="orientation-subtitle">
              Découvrez votre profil unique et trouvez les majeures qui vous correspondent parfaitement
            </p>
          </div>

          <div className="orientation-features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>14 Questions Intelligentes</h3>
              <p>Un parcours personnalisé pour comprendre vos motivations profondes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>5-7 Minutes</h3>
              <p>Un test rapide mais complet pour des résultats précis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Résultats Immédiats</h3>
              <p>Vos recommandations personnalisées avec scores de correspondance</p>
            </div>
          </div>

          {/* Section de choix entre programmes et test */}
          <div className="orientation-choice-section">
            <div className="choice-buttons">
              <button 
                className="choice-btn"
                onClick={handleViewPrograms}
              >
                Voir les Programmes
              </button>
              <button 
                className="choice-btn"
                onClick={handleStartTest}
              >
                Faire le Test d'Orientation
              </button>
            </div>
            <p className="choice-instruction">Choisissez votre option préférée</p>
          </div>

        </div>
      </GlobalLayout>
    );
  }

  // Si le test a commencé, afficher les questions
  if (testStarted) {
    return (
      <GlobalLayout activePage="orientation">
        <div className="test-container">

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
                <button 
                  className="nav-btn back-btn"
                  onClick={handlePrevious}
                >
                  ← Précédent
                </button>
              )}
              
              {currentQuestion < questions.length - 1 ? (
                <button 
                  className="nav-btn next-btn"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Suivant →
                </button>
              ) : (
                <div className="submit-section">
                  <div className="submit-info">
                    <p className="submit-text">🎯 Vous avez répondu à toutes les questions !</p>
                    <p className="submit-subtext">Cliquez sur "Terminer le Test" pour obtenir vos recommandations personnalisées</p>
                  </div>
                  
                  {/* Composant de diagnostic des questions */}
                  <QuestionStatusDebugger
                    answers={answers}
                    selectedMultiple={selectedMultiple}
                    dragOrder={dragOrder}
                    sliderValues={sliderValues}
                    personalInfo={personalInfo}
                    currentQuestion={currentQuestion}
                  />
                  
                  {/* Boutons de diagnostic et correction */}
                  <div className="diagnostic-actions">
                    <button 
                      className="diagnostic-btn"
                      onClick={diagnoseAndFix}
                    >
                      🔧 Diagnostiquer et Corriger
                    </button>
                    <button 
                      className="diagnostic-btn"
                      onClick={resetStates}
                    >
                      🔄 Réinitialiser les États
                    </button>
                    <button 
                      className="diagnostic-btn"
                      onClick={debugAnswers}
                    >
                      📊 Afficher les Logs
                    </button>
                  </div>
                  
                  <button 
                    className="nav-btn submit-btn"
                    onClick={handleSubmit}
                  >
                    🚀 Terminer le Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Si on a choisi de faire le test mais pas encore commencé, afficher la collecte d'infos
  if (!showChoice && !testStarted) {
    return (
      <GlobalLayout activePage="orientation">
        <div className="personal-info-container">
          <div className="personal-info-content">
            <div className="personal-info-header">
              <h1 className="personal-info-title">Informations Personnelles</h1>
              <p className="personal-info-subtitle">
                Avant de commencer le test d'orientation, nous avons besoin de quelques informations
              </p>
            </div>

            <div className="personal-info-form">
              <div className="form-group">
                <label htmlFor="nom">Nom complet *</label>
                <input
                  type="text"
                  id="nom"
                  value={personalInfo.nom}
                  onChange={(e) => handlePersonalInfoChange('nom', e.target.value)}
                  placeholder="Votre nom complet"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  id="telephone"
                  value={personalInfo.telephone}
                  onChange={(e) => handlePersonalInfoChange('telephone', e.target.value)}
                  placeholder="Votre numéro de téléphone"
                />
              </div>

              <div className="form-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowChoice(true)}
                >
                  ← Retour
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleStartTestAfterInfo}
                  disabled={!personalInfo.nom || !personalInfo.email}
                >
                  Commencer le Test →
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Par défaut, afficher la page d'accueil
  return (
    <GlobalLayout activePage="orientation">
      <div className="orientation-home-container">
        <div className="orientation-hero">
          <h1 className="orientation-title">
            <span className="system-title">Système d'Orientation des Étudiants</span>
          </h1>
          <p className="orientation-subtitle">
            Découvrez votre profil unique et trouvez les majeures qui vous correspondent parfaitement
          </p>
        </div>

        <div className="orientation-features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>14 Questions Intelligentes</h3>
            <p>Un parcours personnalisé pour comprendre vos motivations profondes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>5-7 Minutes</h3>
            <p>Un test rapide mais complet pour des résultats précis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Résultats Immédiats</h3>
            <p>Vos recommandations personnalisées avec scores de correspondance</p>
          </div>
        </div>

        {/* Section de choix entre programmes et test */}
        <div className="orientation-choice-section">
          <div className="choice-buttons">
            <button 
              className="choice-btn"
              onClick={handleViewPrograms}
            >
              Voir les Programmes
            </button>
            <button 
              className="choice-btn"
              onClick={handleStartTest}
            >
              Faire le Test d'Orientation
            </button>
          </div>
          <p className="choice-instruction">Choisissez votre option préférée</p>
        </div>

      </div>
    </GlobalLayout>
  );
};

export default UnifiedOrientationTest;
