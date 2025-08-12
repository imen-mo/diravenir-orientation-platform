import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion6 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem('question6', selectedOption);
      navigate('/test-question/7');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '📖',
      title: 'Lire et prendre des notes détaillées',
      description: 'Apprentissage par la lecture'
    },
    {
      id: 'B',
      icon: '🎥',
      title: 'Regarder des tutoriels vidéo ou des démonstrations',
      description: 'Apprentissage visuel'
    },
    {
      id: 'C',
      icon: '🔧',
      title: 'Essayer par moi-même, pratiquer et faire des erreurs',
      description: 'Apprentissage par la pratique'
    },
    {
      id: 'D',
      icon: '💬',
      title: 'Discuter avec d\'autres et échanger des idées',
      description: 'Apprentissage collaboratif'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '42%' }}></div>
        </div>
        <span className="progress-text">Question 6 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Quand vous devez apprendre quelque chose de nouveau, comment préférez-vous le faire ?
        </h1>
        <p className="question-subtitle">
          Choisissez l'option qui vous ressemble le plus
        </p>
      </div>

      {/* Options Grid */}
      <div className="options-grid">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="option-icon">{option.icon}</div>
            <h3 className="option-title">{option.title}</h3>
            <p className="option-description">{option.description}</p>
            <div className="option-check">
              {selectedOption === option.id && <span>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button 
          className="next-button"
          disabled={!selectedOption}
          onClick={handleNext}
        >
          Continuer
          <span className="arrow">→</span>
        </button>
      </div>

      {/* Question Info */}
      <div className="question-info">
        <div className="info-card">
          <span className="info-icon">💡</span>
          <span>Catégorie 2 : Compétences et Aptitudes</span>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion6;
