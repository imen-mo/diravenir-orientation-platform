import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion3.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion3 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_3');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q3 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_3', selectedAnswer);
      console.log('✅ Réponse Q3 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/4');
    }
  };

  const answers = [
    {
      id: 'A',
      text: 'Rayons d\'électronique, gadgets ou outils',
      emoji: '🔧'
    },
    {
      id: 'B',
      text: 'Livres de science, de philosophie ou documentaires',
      emoji: '📚'
    },
    {
      id: 'C',
      text: 'Matériel d\'art, instruments de musique ou objets de décoration',
      emoji: '🎨'
    },
    {
      id: 'D',
      text: 'Livres de développement personnel, jeux de société ou jeux vidéo',
      emoji: '🎮'
    },
    {
      id: 'E',
      text: 'Vêtements, accessoires de mode ou articles de luxe',
      emoji: '👗'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">3</div>
            <h1 className="question-title">IMAGINEZ QUE VOUS ÊTES DANS UN MAGASIN. VERS QUELLE SECTION ÊTES-VOUS NATURELLEMENT ATIRÉ(E) ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/2')}>
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

          <QuestionProgress currentQuestion={3} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion3;
