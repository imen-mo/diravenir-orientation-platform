import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion5.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion5 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_5');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q5 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_5', selectedAnswer);
      console.log('✅ Réponse Q5 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/6');
    }
  };

  const answers = [
    {
      id: 'budget',
      text: 'Gérer un budget',
      emoji: '💰',
      description: 'Planification financière'
    },
    {
      id: 'event',
      text: 'Organiser un événement',
      emoji: '📅',
      description: 'Coordination et planification'
    },
    {
      id: 'writing',
      text: 'Écrire un texte clair',
      emoji: '✍️',
      description: 'Communication écrite'
    },
    {
      id: 'repair',
      text: 'Réparer un appareil',
      emoji: '🔧',
      description: 'Travail manuel technique'
    },
    {
      id: 'drawing',
      text: 'Dessiner ou peindre',
      emoji: '🎨',
      description: 'Expression artistique'
    },
    {
      id: 'equation',
      text: 'Résoudre une équation complexe',
      emoji: '🧮',
      description: 'Analyse mathématique'
    },
    {
      id: 'convince',
      text: 'Convaincre quelqu\'un d\'une idée',
      emoji: '💬',
      description: 'Persuasion et communication'
    },
    {
      id: 'counsel',
      text: 'Écouter et conseiller un ami',
      emoji: '👂',
      description: 'Écoute et conseil'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">5</div>
            <h1 className="question-title">PARMI CES ACTIVITÉS, LAQUELLE VOUS VIENT LE PLUS NATURELLEMENT ?
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
                <div className="answer-content">
                  <span className="answer-text">{answer.text}</span>
                  <span className="answer-description">{answer.description}</span>
                </div>
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/4')}>
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

          <QuestionProgress currentQuestion={5} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion5;
