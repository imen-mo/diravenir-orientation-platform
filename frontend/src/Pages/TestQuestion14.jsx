import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion14 = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const options = [
        {
            id: 'sciences',
            icon: '🔬',
            title: 'Sciences',
            description: 'Maths, Physique-Chimie, SVT'
        },
        {
            id: 'litterature',
            icon: '📚',
            title: 'Littérature et Langues',
            description: 'Français, Langues étrangères, Philosophie'
        },
        {
            id: 'shs',
            icon: '🌍',
            title: 'Sciences Sociales et Humaines',
            description: 'Histoire-Géo, SES, Psychologie'
        },
        {
            id: 'arts',
            icon: '🎨',
            title: 'Arts et Design',
            description: 'Arts Plastiques, Musique, Design'
        },
        {
            id: 'techno',
            icon: '💻',
            title: 'Technologie et Informatique',
            description: 'NSI, STI2D, Sciences de l\'ingénieur'
        },
        {
            id: 'gestion',
            icon: '📊',
            title: 'Gestion et Économie',
            description: 'Management, Droit'
        }
    ];

    const handleOptionToggle = (optionId) => {
        setSelectedOptions(prev => {
            if (prev.includes(optionId)) {
                return prev.filter(id => id !== optionId);
            } else {
                if (prev.length < 3) {
                    return [...prev, optionId];
                }
                return prev;
            }
        });
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            // Store answer in localStorage
            const answers = {
                question14: selectedOptions
            };
            localStorage.setItem('testAnswers', JSON.stringify({
                ...JSON.parse(localStorage.getItem('testAnswers') || '{}'),
                ...answers
            }));
            navigate('/orientation/results');
        }
    };

    return (
        <div className="test-question-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: '100%' }}></div>
                <span className="progress-text">100%</span>
            </div>

            {/* Question Header */}
            <div className="question-header">
                <h1>Question 14</h1>
                <p className="question-text">
                    Parmi ces groupes de matières, lesquels vous ont le plus passionné(e) durant votre parcours scolaire ?
                </p>
                <p className="question-subtitle">
                    Sélectionnez jusqu'à 3 options maximum
                </p>
            </div>

            {/* Selection Counter */}
            <div className="selection-counter">
                {selectedOptions.length}/3 sélectionné(s)
            </div>

            {/* Options */}
            <div className="options-container">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`option-card ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                        onClick={() => handleOptionToggle(option.id)}
                    >
                        <div className="option-icon">{option.icon}</div>
                        <div className="option-content">
                            <h3 className="option-title">{option.title}</h3>
                            <p className="option-description">{option.description}</p>
                        </div>
                        <div className="option-checkbox">
                            {selectedOptions.includes(option.id) && <span className="checkmark">✓</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="navigation-buttons">
                <button 
                    className="nav-btn prev-btn"
                    onClick={() => navigate('/test-question/13')}
                >
                    Précédent
                </button>
                <button 
                    className={`nav-btn next-btn ${selectedOptions.length === 0 ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={selectedOptions.length === 0}
                >
                    Voir mes résultats
                </button>
            </div>
        </div>
    );
};

export default TestQuestion14;
