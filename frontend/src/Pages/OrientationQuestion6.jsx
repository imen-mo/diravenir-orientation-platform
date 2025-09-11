import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion6.css';

const OrientationQuestion6 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_6');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q6 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_6', selectedAnswer);
      console.log('✅ Réponse Q6 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/7');
    }
  };

  const answers = [
    {
      id: 'A',
      text: 'Lire et prendre des notes détaillées',
      emoji: '📚'
    },
    {
      id: 'B',
      text: 'Regarder des tutoriels vidéo ou des démonstrations',
      emoji: '🎥'
    },
    {
      id: 'C',
      text: 'Essayer par moi-même, pratiquer et faire des erreurs',
      emoji: '🔬'
    },
    {
      id: 'D',
      text: 'Discuter avec d\'autres et échanger des idées',
      emoji: '💬'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">6</div>
            <h1 className="question-title">QUAND VOUS DEVEZ APPRENDRE QUELQUE CHOSE DE NOUVEAU, COMMENT PRÉFÉREZ-VOUS LE FAIRE ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/5')}>
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
            <span className="progress-percentage">40%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <span className="progress-text">6/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion6;
