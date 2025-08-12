import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion11 = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const options = [
        {
            id: 'A',
            icon: '👤',
            title: 'Seul(e) sur un projet',
            description: 'En totale autonomie'
        },
        {
            id: 'B',
            icon: '👥',
            title: 'En petite équipe',
            description: 'Où chacun apporte sa pierre à l\'édifice'
        },
        {
            id: 'C',
            icon: '🏢',
            title: 'Au sein d\'une grande structure',
            description: 'Avec des rôles bien définis'
        }
    ];

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleNext = () => {
        if (selectedOption) {
            // Store answer in localStorage
            const answers = {
                question11: selectedOption
            };
            localStorage.setItem('testAnswers', JSON.stringify({
                ...JSON.parse(localStorage.getItem('testAnswers') || '{}'),
                ...answers
            }));
            navigate('/test-question/12');
        }
    };

    return (
        <div className="test-question-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: '78%' }}></div>
                <span className="progress-text">78%</span>
            </div>

            {/* Question Header */}
            <div className="question-header">
                <h1>Question 11</h1>
                <p className="question-text">
                    Préférez-vous travailler :
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
                    onClick={() => navigate('/test-question/10')}
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

export default TestQuestion11;
