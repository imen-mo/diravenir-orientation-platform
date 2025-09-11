import React, { useState, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaChartLine,
  FaTrophy,
  FaStar,
  FaBullseye,
  FaDownload,
  FaShare,
  FaEye
} from 'react-icons/fa';
import './TestSimulation.css';

const TestSimulation = ({ testResults, onStartTest, onViewResults }) => {
  const [activeTest, setActiveTest] = useState(null);
  const [testProgress, setTestProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(14);

  // Tests disponibles avec simulation
  const availableTests = [
    {
      id: 1,
      name: 'Test d\'Orientation Académique',
      description: 'Évaluez vos préférences académiques et vos compétences',
      duration: 45,
      questions: 14,
      difficulty: 'Moyen',
      category: 'Orientation',
      icon: FaBullseye,
      color: 'blue',
      completed: testResults.some(test => test.testName.includes('Orientation'))
    },
    {
      id: 2,
      name: 'Test de Compétences Linguistiques',
      description: 'Mesurez votre niveau en langues étrangères',
      duration: 60,
      questions: 20,
      difficulty: 'Difficile',
      category: 'Langues',
      icon: FaStar,
      color: 'green',
      completed: testResults.some(test => test.testName.includes('Linguistiques'))
    },
    {
      id: 3,
      name: 'Test de Motivation et Projet',
      description: 'Découvrez vos motivations et vos objectifs professionnels',
      duration: 30,
      questions: 12,
      difficulty: 'Facile',
      category: 'Personnel',
      icon: FaTrophy,
      color: 'purple',
      completed: testResults.some(test => test.testName.includes('Motivation'))
    },
    {
      id: 4,
      name: 'Test de Logique et Raisonnement',
      description: 'Évaluez vos capacités d\'analyse et de résolution de problèmes',
      duration: 40,
      questions: 15,
      difficulty: 'Difficile',
      category: 'Logique',
      icon: FaChartLine,
      color: 'orange',
      completed: false
    }
  ];

  // Simulation du test en cours
  useEffect(() => {
    let interval;
    if (isRunning && activeTest) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          const progress = (newTime / (activeTest.duration * 60)) * 100;
          setTestProgress(Math.min(progress, 100));
          
          // Simulation des questions
          const questionProgress = (newTime / (activeTest.duration * 60)) * activeTest.questions;
          setCurrentQuestion(Math.min(Math.ceil(questionProgress), activeTest.questions));
          
          if (newTime >= activeTest.duration * 60) {
            setIsRunning(false);
            setTestProgress(100);
            setCurrentQuestion(activeTest.questions);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, activeTest]);

  const startTest = (test) => {
    setActiveTest(test);
    setTestProgress(0);
    setTimeElapsed(0);
    setCurrentQuestion(1);
    setIsRunning(true);
  };

  const pauseTest = () => {
    setIsRunning(false);
  };

  const resumeTest = () => {
    setIsRunning(true);
  };

  const stopTest = () => {
    setIsRunning(false);
    setActiveTest(null);
    setTestProgress(0);
    setTimeElapsed(0);
    setCurrentQuestion(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'green';
      case 'Moyen': return 'orange';
      case 'Difficile': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Orientation': return FaBullseye;
      case 'Langues': return FaStar;
      case 'Personnel': return FaTrophy;
      case 'Logique': return FaChartLine;
      default: return FaBullseye;
    }
  };

  return (
    <div className="test-simulation">
      <div className="simulation-header">
        <h3>🎯 Simulation des Tests d'Orientation</h3>
        <p>Passez des tests interactifs et découvrez vos résultats en temps réel</p>
      </div>

      {activeTest ? (
        <div className="active-test-container">
          <div className="test-header">
            <div className="test-info">
              <h4>{activeTest.name}</h4>
              <p>{activeTest.description}</p>
            </div>
            <div className="test-controls">
              {!isRunning ? (
                <button className="control-btn play" onClick={resumeTest}>
                  <FaPlay />
                  Reprendre
                </button>
              ) : (
                <button className="control-btn pause" onClick={pauseTest}>
                  <FaPause />
                  Pause
                </button>
              )}
              <button className="control-btn stop" onClick={stopTest}>
                <FaStop />
                Arrêter
              </button>
            </div>
          </div>

          <div className="test-progress-section">
            <div className="progress-info">
              <div className="progress-item">
                <FaClock />
                <span>Temps: {formatTime(timeElapsed)} / {activeTest.duration}:00</span>
              </div>
              <div className="progress-item">
                <FaCheckCircle />
                <span>Question {currentQuestion} / {activeTest.questions}</span>
              </div>
            </div>
            
            <div className="progress-bars">
              <div className="progress-bar-container">
                <label>Temps écoulé</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill time"
                    style={{ width: `${testProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="progress-bar-container">
                <label>Questions</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill questions"
                    style={{ width: `${(currentQuestion / activeTest.questions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="test-simulation-content">
            <div className="question-display">
              <h5>Question {currentQuestion}</h5>
              <p>Quel type d'activité préférez-vous pour votre futur métier ?</p>
              <div className="answer-options">
                <button className="answer-option">A) Travail en équipe</button>
                <button className="answer-option">B) Travail individuel</button>
                <button className="answer-option">C) Travail créatif</button>
                <button className="answer-option">D) Travail analytique</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tests-grid">
          {availableTests.map((test) => {
            const IconComponent = test.icon;
            const completedTest = testResults.find(t => t.testName.includes(test.name.split(' ')[2]));
            
            return (
              <div key={test.id} className={`test-card ${test.color} ${test.completed ? 'completed' : ''}`}>
                <div className="test-card-header">
                  <div className={`test-icon ${test.color}`}>
                    <IconComponent />
                  </div>
                  <div className="test-status">
                    {test.completed ? (
                      <span className="status-badge completed">
                        <FaCheckCircle />
                        Terminé
                      </span>
                    ) : (
                      <span className="status-badge available">
                        <FaPlay />
                        Disponible
                      </span>
                    )}
                  </div>
                </div>

                <div className="test-card-content">
                  <h4>{test.name}</h4>
                  <p>{test.description}</p>
                  
                  <div className="test-details">
                    <div className="detail-item">
                      <FaClock />
                      <span>{test.duration} minutes</span>
                    </div>
                    <div className="detail-item">
                      <FaCheckCircle />
                      <span>{test.questions} questions</span>
                    </div>
                    <div className="detail-item">
                      <span className={`difficulty ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </span>
                    </div>
                  </div>

                  {completedTest && (
                    <div className="test-results">
                      <div className="result-item">
                        <span>Score:</span>
                        <span className="score">{completedTest.score}%</span>
                      </div>
                      <div className="result-item">
                        <span>Durée:</span>
                        <span>{completedTest.duration}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="test-card-actions">
                  {test.completed ? (
                    <>
                      <button 
                        className="action-btn secondary"
                        onClick={() => onViewResults && onViewResults(completedTest)}
                      >
                        <FaEye />
                        Voir Résultats
                      </button>
                      <button 
                        className="action-btn primary"
                        onClick={() => startTest(test)}
                      >
                        <FaPlay />
                        Repasser
                      </button>
                    </>
                  ) : (
                    <button 
                      className="action-btn primary"
                      onClick={() => startTest(test)}
                    >
                      <FaPlay />
                      Commencer
                    </button>
                  )}
                  
                  {test.completed && (
                    <div className="test-actions">
                      <button className="action-btn-icon" title="Télécharger certificat">
                        <FaDownload />
                      </button>
                      <button className="action-btn-icon" title="Partager résultats">
                        <FaShare />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="simulation-footer">
        <div className="footer-info">
          <h4>💡 Conseils pour réussir vos tests</h4>
          <ul>
            <li>Prenez votre temps pour lire chaque question attentivement</li>
            <li>Répondez honnêtement selon vos préférences personnelles</li>
            <li>Ne vous inquiétez pas si vous ne connaissez pas certaines réponses</li>
            <li>Les tests sont conçus pour vous aider à découvrir vos centres d'intérêt</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestSimulation;
