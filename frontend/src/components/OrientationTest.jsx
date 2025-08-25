import React, { useState } from 'react';
import './UnifiedOrientationTest.css';

const OrientationTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "Quelle est votre couleur préférée ?",
      options: ["Rouge", "Bleu", "Vert", "Jaune"]
    },
    {
      id: 2,
      question: "Quel est votre animal préféré ?",
      options: ["Chat", "Chien", "Lion", "Aigle"]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="test-container">
      <div className="test-content">
        <div className="test-header">
          <h1 className="test-title">Test d'Orientation</h1>
          <p className="test-subtitle">Découvrez votre profil avec notre algorithme hybride</p>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span>Question {currentQuestion + 1} sur {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="question-section">
          <div className="question-number">Question {questions[currentQuestion].id}</div>
          <div className="question-text">{questions[currentQuestion].question}</div>
          
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${answers[currentQuestion] === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Précédent
          </button>
          <button 
            className="nav-button" 
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrientationTest;
