import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion10 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const options = [
        {
            id: 'A',
            icon: '🔍',
            title: 'Comprendre la racine du problème',
            description: 'Pour une solution durable'
        },
        {
            id: 'B',
            icon: '⚡',
            title: 'Mettre en place rapidement',
            description: 'Une solution concrète'
        },
        {
            id: 'C',
            icon: '🤝',
            title: 'Rallier les gens',
            description: 'Autour de la solution'
        },
        {
            id: 'D',
            icon: '🚀',
            title: 'Développer une solution',
            description: 'Technologique avancée'
        }
    ];

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleNext = () => {
        if (selectedOption) {
            // Store answer in localStorage
            const answers = {
                question10: selectedOption
            };
            localStorage.setItem('testAnswers', JSON.stringify({
                ...JSON.parse(localStorage.getItem('testAnswers') || '{}'),
                ...answers
            }));
            navigate('/test-question/11');
        }
    };

    return (
        <div className="test-question-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: '71%' }}></div>
                <span className="progress-text">71%</span>
            </div>

            {/* Question Header */}
            <div className="question-header">
                <h1>Question 10</h1>
                <p className="question-text">
                    Si vous deviez résoudre un grand problème, quelle serait votre motivation principale ?
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
                    onClick={() => navigate('/test-question/9')}
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

export default TestQuestion10;
