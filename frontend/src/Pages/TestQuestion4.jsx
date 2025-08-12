import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion4 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem('question4', selectedOption);
      navigate('/test-question/5');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '🧩',
      title: 'Le décomposer en petites étapes logiques',
      description: 'Pour trouver la solution la plus efficace'
    },
    {
      id: 'B',
      icon: '🔍',
      title: 'Aller chercher les données et les faits',
      description: 'Pour comprendre la situation et trouver une solution'
    },
    {
      id: 'C',
      icon: '💡',
      title: 'Imaginer des solutions originales',
      description: 'Même si elles semblent folles au début'
    },
    {
      id: 'D',
      icon: '🤝',
      title: 'Chercher l\'avis des autres',
      description: 'Pour trouver une solution collective'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '28%' }}></div>
        </div>
        <span className="progress-text">Question 4 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Face à un problème complexe, quelle est votre première réaction ?
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

export default TestQuestion4;
