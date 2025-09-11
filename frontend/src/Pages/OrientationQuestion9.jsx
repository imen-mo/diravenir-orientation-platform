import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion9.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion9 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_9');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q9 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_9', selectedAnswer);
      console.log('✅ Réponse Q9 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/10');
    }
  };

  const answers = [
    {
      id: 'security',
      text: 'La sécurité de l\'emploi et la stabilité',
      emoji: '🛡️',
      description: 'Un emploi stable et sécurisé'
    },
    {
      id: 'innovation',
      text: 'La possibilité d\'innover et d\'être à la pointe',
      emoji: '🚀',
      description: 'Innovation et avant-garde technologique'
    },
    {
      id: 'autonomy',
      text: 'L\'autonomie et la liberté de mes décisions',
      emoji: '🎯',
      description: 'Indépendance et prise de décision'
    },
    {
      id: 'salary',
      text: 'Un salaire élevé et de bonnes opportunités financières',
      emoji: '💰',
      description: 'Rémunération attractive et perspectives'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">9</div>
            <h1 className="question-title">QUAND VOUS PENSEZ À VOTRE FUTURE CARRIÈRE, QU'EST-CE QUI EST LE PLUS IMPORTANT POUR VOUS ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/8')}>
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

          <QuestionProgress currentQuestion={9} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion9;
