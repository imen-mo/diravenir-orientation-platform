import React from 'react';
import './QuestionNavigation.css';

const QuestionNavigation = ({ currentQuestion, totalQuestions, onQuestionChange }) => {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="question-navigation">
      <div className="nav-dots">
        {questions.map((questionNum) => (
          <button
            key={questionNum}
            className={`nav-dot ${questionNum === currentQuestion ? 'active' : ''} ${
              questionNum < currentQuestion ? 'completed' : ''
            }`}
            onClick={() => onQuestionChange(questionNum)}
            disabled={questionNum > currentQuestion}
          >
            {questionNum < currentQuestion ? '✓' : questionNum}
          </button>
        ))}
      </div>
      
      <div className="nav-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">{currentQuestion}/{totalQuestions}</span>
      </div>
    </div>
  );
};

export default QuestionNavigation;
