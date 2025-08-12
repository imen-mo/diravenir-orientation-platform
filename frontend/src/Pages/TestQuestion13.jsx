import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion13 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const options = [
        {
            id: 'A',
            icon: '🧠',
            title: 'La logique et l\'analyse',
            description: 'Des faits'
        },
        {
            id: 'B',
            icon: '💭',
            title: 'Votre intuition',
            description: 'Et vos sentiments'
        },
        {
            id: 'C',
            icon: '👥',
            title: 'L\'avis des personnes',
            description: 'Que vous respectez'
        }
    ];

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleNext = () => {
        if (selectedOption) {
            // Store answer in localStorage
            const answers = {
                question13: selectedOption
            };
            localStorage.setItem('testAnswers', JSON.stringify({
                ...JSON.parse(localStorage.getItem('testAnswers') || '{}'),
                ...answers
            }));
            navigate('/test-question/14');
        }
    };

    return (
        <div className="test-question-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: '92%' }}></div>
                <span className="progress-text">92%</span>
            </div>

            {/* Question Header */}
            <div className="question-header">
                <h1>Question 13</h1>
                <p className="question-text">
                    Quand vous prenez une décision importante, vous vous fiez le plus à :
                </p>
            </div>

            {/* Options */}
            <div className="options-container">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(option.id)}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <div className="option-content">
                            <h3 className="option-title">{option.title}</h3>
                            <p className="option-description">{option.description}</p>
                        </div>
                        <div className="option-checkbox">
                            {selectedOption === option.id && <span className="checkmark">✓</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="navigation-buttons">
                <button 
                    className="nav-btn prev-btn"
                    onClick={() => navigate('/test-question/12')}
                >
                    Précédent
                </button>
                <button 
                    className={`nav-btn next-btn ${!selectedOption ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!selectedOption}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default TestQuestion13;
