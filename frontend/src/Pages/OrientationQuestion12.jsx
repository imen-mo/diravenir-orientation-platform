import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion12.css';

const OrientationQuestion12 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_12');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q12 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_12', selectedAnswer);
      console.log('✅ Réponse Q12 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/13');
    }
  };

  const answers = [
    { 
      id: 'A', 
      text: 'Préparer méticuleusement et présenter clairement les faits',
      emoji: '📋'
    },
    { 
      id: 'B', 
      text: 'Raconter une histoire pour capter l\'attention',
      emoji: '📖'
    },
    { 
      id: 'C', 
      text: 'Répondre aux questions du public et interagir spontanément',
      emoji: '💬'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">12</div>
            <h1 className="question-title">LORS D'UNE PRÉSENTATION OU D'UN EXPOSÉ, VOUS PRÉFÉREZ :
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/11')}>
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
            <span className="progress-percentage">80%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
            <span className="progress-text">12/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion12;
