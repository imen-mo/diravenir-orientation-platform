import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion13.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion13 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_13');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q13 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_13', selectedAnswer);
      console.log('✅ Réponse Q13 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/14');
    }
  };

  const answers = [
    { 
      id: 'A', 
      text: 'La logique et l\'analyse des faits',
      emoji: '🧠'
    },
    { 
      id: 'B', 
      text: 'Votre intuition et vos sentiments',
      emoji: '💭'
    },
    { 
      id: 'C', 
      text: 'L\'avis des personnes que vous respectez',
      emoji: '👥'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">13</div>
            <h1 className="question-title">QUAND VOUS PRENEZ UNE DÉCISION IMPORTANTE, VOUS VOUS FIEZ LE PLUS À :
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/12')}>
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

          <QuestionProgress currentQuestion={13} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion13;
