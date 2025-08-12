import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion7 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem('question7', selectedOption);
      navigate('/test-question/8');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '❤️',
      title: 'Améliorer la vie des individus directement',
      description: 'Bien-être, santé, éducation'
    },
    {
      id: 'B',
      icon: '⚡',
      title: 'Créer des systèmes ou des produits qui rendent le monde plus efficace',
      description: 'Innovation et optimisation'
    },
    {
      id: 'C',
      icon: '🎭',
      title: 'Contribuer à la beauté et à la culture',
      description: 'Arts, design, histoire'
    },
    {
      id: 'D',
      icon: '⚖️',
      title: 'Défendre une cause ou promouvoir la justice sociale',
      description: 'Équité et changement social'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '50%' }}></div>
        </div>
        <span className="progress-text">Question 7 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Quel type d'impact aimeriez-vous avoir dans le monde ?
        </h1>
        <p className="question-subtitle">
          Choisissez la phrase qui résonne le plus avec vos aspirations
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
          <span>Catégorie 3 : Valeurs et Objectifs</span>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion7;
