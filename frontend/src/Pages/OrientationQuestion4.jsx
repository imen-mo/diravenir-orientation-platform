import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion4.css';

const OrientationQuestion4 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_4');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q4 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_4', selectedAnswer);
      console.log('✅ Réponse Q4 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/5');
    }
  };

  const answers = [
    {
      id: 'A',
      text: 'Le décomposer en petites étapes logiques pour trouver la solution la plus efficace',
      emoji: '🧩'
    },
    {
      id: 'B',
      text: 'Aller chercher les données et les faits pour comprendre la situation et trouver une solution',
      emoji: '📊'
    },
    {
      id: 'C',
      text: 'Imaginer des solutions originales, même si elles semblent folles au début',
      emoji: '💡'
    },
    {
      id: 'D',
      text: 'Chercher l\'avis des autres pour trouver une solution collective',
      emoji: '🤝'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">4</div>
            <h1 className="question-title">FACE À UN PROBLÈME COMPLEXE, QUELLE EST VOTRE PREMIÈRE RÉACTION ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/3')}>
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
            <span className="progress-percentage">26.67%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '26.67%' }}></div>
            </div>
            <span className="progress-text">4/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion4;
