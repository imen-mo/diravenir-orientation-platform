import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion5 = () => {
  const [orderedOptions, setOrderedOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    { id: 'budget', icon: '💰', title: 'Gérer un budget', category: 'Finance' },
    { id: 'event', icon: '📅', title: 'Organiser un événement', category: 'Organisation' },
    { id: 'writing', icon: '✍️', title: 'Écrire un texte clair', category: 'Communication' },
    { id: 'repair', icon: '🔧', title: 'Réparer un appareil', category: 'Technique' },
    { id: 'drawing', icon: '🎨', title: 'Dessiner ou peindre', category: 'Créativité' },
    { id: 'equation', icon: '🧮', title: 'Résoudre une équation complexe', category: 'Mathématiques' },
    { id: 'convince', icon: '💬', title: 'Convaincre quelqu\'un d\'une idée', category: 'Persuasion' },
    { id: 'advice', icon: '🤝', title: 'Écouter et conseiller un ami', category: 'Relations' }
  ]);
  const navigate = useNavigate();

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData('text/plain', option.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData('text/plain');
    const option = availableOptions.find(opt => opt.id === optionId);
    
    if (option && orderedOptions.length < 3) {
      const newOrderedOptions = [...orderedOptions];
      newOrderedOptions.splice(targetIndex, 0, option);
      setOrderedOptions(newOrderedOptions);
      
      const newAvailableOptions = availableOptions.filter(opt => opt.id !== optionId);
      setAvailableOptions(newAvailableOptions);
    }
  };

  const removeFromOrder = (index) => {
    const removedOption = orderedOptions[index];
    const newOrderedOptions = orderedOptions.filter((_, i) => i !== index);
    setOrderedOptions(newOrderedOptions);
    setAvailableOptions([...availableOptions, removedOption]);
  };

  const handleNext = () => {
    if (orderedOptions.length === 3) {
      const result = orderedOptions.map((option, index) => ({
        id: option.id,
        rank: index + 1
      }));
      localStorage.setItem('question5', JSON.stringify(result));
      navigate('/test-question/6');
    }
  };

  return (
    <div className="test-question-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '35%' }}></div>
        </div>
        <span className="progress-text">Question 5 sur 14</span>
      </div>

      {/* Question Header */}
      <div className="question-header">
        <h1 className="question-title">
          Parmi ces activités, lesquelles vous viennent le plus naturellement ?
        </h1>
        <p className="question-subtitle">
          Glissez-déposez 3 options dans l'ordre de préférence (1er = préféré)
        </p>
        <div className="selection-counter">
          {orderedOptions.length}/3 classé{orderedOptions.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Drag and Drop Area */}
      <div className="drag-drop-container">
        {/* Ordered Selection */}
        <div className="ordered-selection">
          <h3>Vos préférences (dans l'ordre)</h3>
          <div className="drop-zones">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`drop-zone ${orderedOptions[index] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {orderedOptions[index] ? (
                  <div className="ordered-option">
                    <span className="rank-badge">{index + 1}</span>
                    <span className="option-icon">{orderedOptions[index].icon}</span>
                    <span className="option-title">{orderedOptions[index].title}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromOrder(index)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="drop-placeholder">
                    <span className="placeholder-text">Glissez ici</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Options */}
        <div className="available-options">
          <h3>Options disponibles</h3>
          <div className="options-grid">
            {availableOptions.map((option) => (
              <div
                key={option.id}
                className="option-card draggable"
                draggable
                onDragStart={(e) => handleDragStart(e, option)}
              >
                <div className="option-icon">{option.icon}</div>
                <h3 className="option-title">{option.title}</h3>
                <div className="option-category">{option.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button 
          className="next-button"
          disabled={orderedOptions.length !== 3}
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

export default TestQuestion5;
