import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion8 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem('question8', selectedOption);
      navigate('/test-question/9');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '🧪',
      title: 'Un laboratoire ou un centre de recherche',
      description: 'Environnement scientifique et expérimental'
    },
    {
      id: 'B',
      icon: '🏢',
      title: 'Un bureau ouvert et collaboratif',
      description: 'Espace de travail d\'équipe et de partage'
    },
    {
      id: 'C',
      icon: '🎨',
      title: 'Un atelier ou un studio créatif',
      description: 'Espace d\'expression artistique et de création'
    },
    {
      id: 'D',
      icon: '🌳',
      title: 'L\'extérieur, la nature, un chantier',
      description: 'Environnement naturel et dynamique'
    },
    {
      id: 'E',
      icon: '📚',
      title: 'Un environnement calme et individuel',
      description: 'Bibliothèque, bureau privé, espace de concentration'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '57%' }}></div>
        </div>
        <span className="progress-text">Question 8 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Choisissez l'image qui représente le mieux l'environnement de travail dans lequel vous vous épanouirez le plus.
        </h1>
        <p className="question-subtitle">
          Sélectionnez l'environnement qui vous inspire le plus
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

export default TestQuestion8;
