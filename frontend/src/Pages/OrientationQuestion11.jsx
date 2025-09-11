import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion11.css';

const OrientationQuestion11 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_11');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q11 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_11', selectedAnswer);
      console.log('✅ Réponse Q11 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/12');
    }
  };

  const answers = [
    { 
      id: 'A', 
      text: 'Seul(e) sur un projet, en totale autonomie',
      emoji: '👤'
    },
    { 
      id: 'B', 
      text: 'En petite équipe, où chacun apporte sa pierre à l\'édifice',
      emoji: '👥'
    },
    { 
      id: 'C', 
      text: 'Au sein d\'une grande structure, avec des rôles bien définis',
      emoji: '🏢'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">11</div>
            <h1 className="question-title">PRÉFÉREZ-VOUS TRAVAILLER ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/10')}>
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
            <span className="progress-percentage">73%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '73%' }}></div>
            </div>
            <span className="progress-text">11/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion11;
