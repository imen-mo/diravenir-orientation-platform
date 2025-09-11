import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import QuestionProgress from '../components/QuestionProgress';
import './OrientationQuestion2.css';
import './OrientationQuestionCommon.css';

const OrientationQuestion2 = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_2');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q2 récupérée:', savedAnswer);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_2', selectedAnswer);
      console.log('✅ Réponse Q2 sauvegardée:', selectedAnswer);
      navigate('/orientation/question/3');
    }
  };

  const answers = [
    {
      id: 'scientific',
      text: 'Découvertes scientifiques, Technologie et innovation',
      emoji: '🔬',
      description: 'Sciences, innovation, recherche'
    },
    {
      id: 'art',
      text: 'Art et culture, Design et création',
      emoji: '🎨',
      description: 'Créativité, design, arts'
    },
    {
      id: 'social',
      text: 'Développement personnel, Causes sociales et humanitaires',
      emoji: '🌟',
      description: 'Progrès, social, humanitaire'
    },
    {
      id: 'business',
      text: 'Actualités économiques, Stratégies d\'entreprise',
      emoji: '📰',
      description: 'Économie, business, actualités'
    },
    {
      id: 'organization',
      text: 'Organisation et méthodes de travail, Gestion de projets',
      emoji: '📊',
      description: 'Organisation, gestion, projets'
    },
    {
      id: 'sports',
      text: 'Sports, Bricolage et artisanat',
      emoji: '🏆',
      description: 'Sport, DIY, artisanat'
    }
  ];

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">2</div>
            <h1 className="question-title">QUAND VOUS NAVIGUEZ SUR INTERNET OU REGARDEZ DES VIDÉOS, QUEL TYPE DE CONTENU RETIENT LE PLUS VOTRE ATTENTION ?
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
            <button className="btn-back" onClick={() => navigate('/orientation/question/1')}>
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

          <QuestionProgress currentQuestion={2} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default OrientationQuestion2;
