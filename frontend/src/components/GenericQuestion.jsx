import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from './OrientationHeader';
import QuestionProgress from './QuestionProgress';
import { getQuestionConfig } from '../config/orientationQuestions';
import '../pages/OrientationQuestionCommon.css';

const GenericQuestion = ({ questionId, answers, onAnswerSelect, selectedAnswer }) => {
  const navigate = useNavigate();
  const questionConfig = getQuestionConfig(questionId);

  const handleNext = () => {
    if (selectedAnswer && questionConfig) {
      navigate(questionConfig.nextPath);
    }
  };

  const handleBack = () => {
    if (questionConfig) {
      navigate(questionConfig.backPath);
    }
  };

  if (!questionConfig) {
    return <div>Question non trouvée</div>;
  }

  return (
    <div className="orientation-question">
      <OrientationHeader />
      
      <div className="question-container">
        <div className="question-content">
          <div className="question-header">
            <div className="question-number">{questionId}</div>
            <h1 className="question-title">
              {questionConfig.title}
            </h1>
            <p className="question-instruction">(SÉLECTIONNEZ UNE SEULE RÉPONSE)</p>
          </div>

          <div className="answers-grid">
            {answers.map((answer) => (
              <div
                key={answer.id}
                className={`answer-card ${selectedAnswer === answer.id ? 'selected' : ''}`}
                onClick={() => onAnswerSelect(answer.id)}
              >
                <div className="answer-emoji">{answer.emoji}</div>
                <span className="answer-text">{answer.text}</span>
              </div>
            ))}
          </div>

          <div className="navigation">
            <button className="btn-back" onClick={handleBack}>
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

          <QuestionProgress currentQuestion={questionId} totalQuestions={15} />
        </div>
      </div>
    </div>
  );
};

export default GenericQuestion;
