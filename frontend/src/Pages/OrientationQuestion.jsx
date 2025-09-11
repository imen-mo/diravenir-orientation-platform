import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import { useTheme } from '../contexts/ThemeContext';
import './OrientationQuestion.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion = () => {
  const { getText } = useTheme();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_1');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q1 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    // Plus de navigation automatique - l'utilisateur doit cliquer sur "Suivant"
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_1', selectedAnswer);
      console.log('✅ Réponse Q1 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/2');
    }
  };

  const answers = [
    {
      id: 'A',
      text: getText('orientationAnswer1A'),
      emoji: '🔨'
    },
    {
      id: 'B',
      text: getText('orientationAnswer1B'),
      emoji: '🔬'
    },
    {
      id: 'C',
      text: getText('orientationAnswer1C'),
      emoji: '🤝'
    },
    {
      id: 'D',
      text: getText('orientationAnswer1D'),
      emoji: '📊'
    },
    {
      id: 'E',
      text: 'Exprimer ma créativité (peindre, écrire, jouer de la musique, faire des vidéos)',
      emoji: '🎨'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">1</div>
            <h1 className="question-title">
              {getText('orientationQuestion1')}
            </h1>
            <p className="question-instruction">({getText('selectOneAnswer')})</p>
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
              </div>
            ))}
          </div>

          <div className="navigation">
            <button className="btn-back" onClick={() => navigate('/orientation/welcome')}>
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

          <QuestionProgress currentQuestion={1} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion;
