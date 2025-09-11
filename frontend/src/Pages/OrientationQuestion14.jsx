import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion14.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion14 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_14');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q14 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_14', selectedAnswer);
      console.log('✅ Réponse Q14 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/15');
    }
  };

  const answers = [
    { 
      id: 'sciences', 
      text: 'Sciences (Math, Physique-Chimie, SVT)',
      emoji: '🔬',
      description: 'Mathématiques, physique, chimie, biologie'
    },
    { 
      id: 'literature', 
      text: 'Littérature et Langues (Français, Langues étrangères, Philosophie)',
      emoji: '📚',
      description: 'Littérature, langues, philosophie'
    },
    { 
      id: 'social', 
      text: 'Sciences Sociales et Humaines (Histoire-Géo, SES, Psychologie)',
      emoji: '🌍',
      description: 'Histoire, géographie, sciences sociales'
    },
    { 
      id: 'arts', 
      text: 'Arts et Design (Arts Plastiques, Musique, Design)',
      emoji: '🎨',
      description: 'Arts plastiques, musique, design'
    },
    { 
      id: 'technology', 
      text: 'Technologie et Informatique (NSI, STI2D, Sciences de l\'ingénieur)',
      emoji: '💻',
      description: 'Informatique, technologie, ingénierie'
    },
    { 
      id: 'management', 
      text: 'Gestion et Économie (Management, Droit)',
      emoji: '📊',
      description: 'Gestion, économie, droit'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">14</div>
            <h1 className="question-title">PARMI CES GROUPES DE MATIÈRES, LEQUEL VOUS A LE PLUS PASSIONNÉ(E) DURANT VOTRE PARCOURS SCOLAIRE ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/13')}>
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

          <QuestionProgress currentQuestion={14} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion14;
