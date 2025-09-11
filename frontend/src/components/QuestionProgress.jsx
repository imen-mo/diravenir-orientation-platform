import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionProgress.css';

const QuestionProgress = ({ currentQuestion, totalQuestions = 15 }) => {
  const navigate = useNavigate();
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);
  
  // Calculer la largeur du remplissage
  const fillWidth = percentage;
  
  const handleBack = () => {
    if (currentQuestion > 1) {
      navigate(`/orientation/question/${currentQuestion - 1}`);
    } else {
      navigate('/orientation/welcome');
    }
  };
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${fillWidth}%` }}
        ></div>
      </div>
      <span className="progress-text">{currentQuestion}/{totalQuestions}</span>
    </div>
  );
};

export default QuestionProgress;
