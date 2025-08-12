import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion2 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      localStorage.setItem('question2', JSON.stringify(selectedOptions));
      navigate('/test-question/3');
    }
  };

  const options = [
    {
      id: 'scientific',
      icon: '🔬',
      title: 'Découvertes scientifiques',
      category: 'Science'
    },
    {
      id: 'tech',
      icon: '💻',
      title: 'Technologie et innovation',
      category: 'Tech'
    },
    {
      id: 'art',
      icon: '🎨',
      title: 'Art et culture',
      category: 'Culture'
    },
    {
      id: 'design',
      icon: '✨',
      title: 'Design et création',
      category: 'Design'
    },
    {
      id: 'personal',
      icon: '🌟',
      title: 'Développement personnel',
      category: 'Personnel'
    },
    {
      id: 'social',
      icon: '🤝',
      title: 'Causes sociales et humanitaires',
      category: 'Social'
    },
    {
      id: 'economic',
      icon: '📈',
      title: 'Actualités économiques',
      category: 'Économie'
    },
    {
      id: 'business',
      icon: '💼',
      title: 'Stratégies d\'entreprise',
      category: 'Business'
    },
    {
      id: 'organization',
      icon: '📋',
      title: 'Organisation et méthodes de travail',
      category: 'Organisation'
    },
    {
      id: 'projects',
      icon: '📊',
      title: 'Gestion de projets',
      category: 'Gestion'
    },
    {
      id: 'sports',
      icon: '⚽',
      title: 'Sports',
      category: 'Sport'
    },
    {
      id: 'crafts',
      icon: '🔧',
      title: 'Bricolage et artisanat',
      category: 'Artisanat'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '14%' }}></div>
        </div>
        <span className="progress-text">Question 2 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Quand vous naviguez sur internet ou regardez des vidéos, quel type de contenu retient le plus votre attention ?
        </h1>
        <p className="question-subtitle">
          Sélectionnez jusqu'à 3 options qui vous intéressent le plus
        </p>
        <div className="selection-counter">
          {selectedOptions.length}/3 sélectionné{selectedOptions.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Options Grid */}
      <div className="options-grid">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-card ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="option-icon">{option.icon}</div>
            <h3 className="option-title">{option.title}</h3>
            <div className="option-category">{option.category}</div>
            <div className="option-check">
              {selectedOptions.includes(option.id) && <span>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button 
          className="next-button"
          disabled={selectedOptions.length === 0}
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
          <span>Catégorie 1 : Intérêts et Passions</span>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion2;
