import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationQuestion8.css';

const OrientationQuestion8 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_8');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q8 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_8', selectedAnswer);
      console.log('✅ Réponse Q8 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/9');
    }
  };

  const answers = [
    {
      id: 'A',
      text: 'Un laboratoire ou un centre de recherche',
      emoji: '🔬'
    },
    {
      id: 'B',
      text: 'Un bureau ouvert et collaboratif',
      emoji: '🏢'
    },
    {
      id: 'C',
      text: 'Un atelier ou un studio créatif',
      emoji: '🎨'
    },
    {
      id: 'D',
      text: 'L\'extérieur, la nature, un chantier',
      emoji: '🌳'
    },
    {
      id: 'E',
      text: 'Un environnement calme et individuel (bibliothèque, bureau privé)',
      emoji: '📚'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">8</div>
            <h1 className="question-title">CHOISISSEZ L'IMAGE QUI REPRÉSENTE LE MIEUX L'ENVIRONNEMENT DE TRAVAIL DANS LEQUEL VOUS VOUS ÉPANOUIREZ LE PLUS.
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/7')}>
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
            <span className="progress-percentage">53.33%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '53.33%' }}></div>
            </div>
            <span className="progress-text">8/15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion8;
