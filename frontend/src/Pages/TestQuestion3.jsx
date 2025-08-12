import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion3 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      localStorage.setItem('question3', selectedOption);
      navigate('/test-question/4');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '🔌',
      title: 'Rayons d\'électronique, gadgets ou outils',
      description: 'Technologie et innovation'
    },
    {
      id: 'B',
      icon: '📚',
      title: 'Livres de science, de philosophie ou documentaires',
      description: 'Connaissance et réflexion'
    },
    {
      id: 'C',
      icon: '🎨',
      title: 'Matériel d\'art, instruments de musique ou objets de décoration',
      description: 'Créativité et expression'
    },
    {
      id: 'D',
      icon: '🎮',
      title: 'Livres de développement personnel, jeux de société ou jeux vidéo',
      description: 'Divertissement et interaction'
    },
    {
      id: 'E',
      icon: '👗',
      title: 'Vêtements, accessoires de mode ou articles de luxe',
      description: 'Style et esthétique'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '21%' }}></div>
        </div>
        <span className="progress-text">Question 3 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Imaginez que vous êtes dans un magasin. Vers quelle section êtes-vous naturellement attiré(e) ?
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
          <span>Catégorie 1 : Intérêts et Passions</span>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion3;
