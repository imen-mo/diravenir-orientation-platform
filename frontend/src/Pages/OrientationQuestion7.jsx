import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion7.css';

const OrientationQuestion7 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_7');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q7 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_7', selectedAnswer);
      console.log('✅ Réponse Q7 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/8');
    }
  };

  const answers = [
    {
      id: 'A',
      text: 'Améliorer la vie des individus directement (bien-être, santé, éducation)',
      emoji: '❤️'
    },
    {
      id: 'B',
      text: 'Créer des systèmes ou des produits qui rendent le monde plus efficace',
      emoji: '⚡'
    },
    {
      id: 'C',
      text: 'Contribuer à la beauté et à la culture (arts, design, histoire)',
      emoji: '🎨'
    },
    {
      id: 'D',
      text: 'Défendre une cause ou promouvoir la justice sociale',
      emoji: '⚖️'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">7</div>
            <h1 className="question-title">QUEL TYPE D'IMPACT AIMERIEZ-VOUS AVOIR DANS LE MONDE ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/6')}>
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
            <span className="progress-percentage">46.67%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '46.67%' }}></div>
            </div>
            <span className="progress-text">7/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion7;
