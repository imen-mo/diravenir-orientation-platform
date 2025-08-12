import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion1 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Store the answer (you'll implement the scoring logic later)
      localStorage.setItem('question1', selectedOption);
      navigate('/test-question/2');
    }
  };

  const options = [
    {
      id: 'A',
      icon: '🏗️',
      title: 'Créer quelque chose de nouveau',
      description: 'Construire, coder, designer'
    },
    {
      id: 'B',
      icon: '🔬',
      title: 'Comprendre comment les choses fonctionnent',
      description: 'Expérimenter, analyser, résoudre des énigmes'
    },
    {
      id: 'C',
      icon: '🤝',
      title: 'Interagir et aider les autres',
      description: 'Conseiller, enseigner, soigner'
    },
    {
      id: 'D',
      icon: '📊',
      title: 'Organiser et gérer des projets',
      description: 'Planifier, diriger, optimiser'
    },
    {
      id: 'E',
      icon: '🎨',
      title: 'Exprimer ma créativité',
      description: 'Peindre, écrire, jouer de la musique, faire des vidéos'
    }
  ];

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '7%' }}></div>
        </div>
        <span className="progress-text">Question 1 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Si le temps et l'argent n'étaient pas un problème, quelle activité choisiriez-vous pour passer votre journée idéale ?
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

export default TestQuestion1;
