import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion10.css';

const OrientationQuestion10 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_10');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q10 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_10', selectedAnswer);
      console.log('✅ Réponse Q10 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/11');
    }
  };

  const answers = [
    { 
      id: 'A', 
      text: 'Comprendre la racine du problème pour une solution durable',
      emoji: '🔍'
    },
    { 
      id: 'B', 
      text: 'Mettre en place rapidement une solution concrète',
      emoji: '⚡'
    },
    { 
      id: 'C', 
      text: 'Rallier les gens autour de la solution',
      emoji: '🤝'
    },
    { 
      id: 'D', 
      text: 'Développer une solution technologique avancée',
      emoji: '🚀'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">10</div>
            <h1 className="question-title">SI VOUS DEVIEZ RÉSOUDRE UN GRAND PROBLÈME, QUELLE SERAIT VOTRE MOTIVATION PRINCIPALE ?
            </h1>
            <p className="question-instruction">(SÉLECTIONNEZ UNE SEULE RÉPONSE)</p>
          </div>
          
          <div className="answers-grid">
            {answers.map((answer) => (
              <div
                key={answer.id}
                className={`answer-card ${selectedAnswer === answer.id ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(answer.id)}
              >
                <div className="answer-emoji">{answer.emoji}</div>
                <span className="answer-text">{answer.text}</span>
                <div className="answer-checkbox">
                  {selectedAnswer === answer.id ? (
                    <div className="checkbox-selected">✓</div>
                  ) : (
                    <div className="checkbox-unselected">-</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="navigation">
            <button className="btn-back" onClick={() => navigate('/orientation/question/9')}>
              ← Retour
            </button>
            <button 
              className="btn-next" 
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              Suivant →
            </button>
          </div>

          <div className="progress-container">
            <span className="progress-percentage">67%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '67%' }}></div>
            </div>
            <span className="progress-text">10/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion10;
