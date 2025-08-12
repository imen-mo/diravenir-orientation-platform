import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion9 = () => {
    const [values, setValues] = useState({
        security: 50,
        innovation: 50,
        autonomy: 50,
        salary: 50
    });
    const navigate = useNavigate();

    const handleSliderChange = (key, value) => {
        setValues(prev => ({
            ...prev,
            [key]: parseInt(value)
        }));
    };

    const handleNext = () => {
        // Store answers in localStorage
        const answers = {
            question9: {
                security: values.security,
                innovation: values.innovation,
                autonomy: values.autonomy,
                salary: values.salary
            }
        };
        localStorage.setItem('testAnswers', JSON.stringify({
            ...JSON.parse(localStorage.getItem('testAnswers') || '{}'),
            ...answers
        }));
        navigate('/test-question/10');
    };

    const getSliderLabel = (value) => {
        if (value <= 20) return "Pas important";
        if (value <= 40) return "Peu important";
        if (value <= 60) return "Modérément important";
        if (value <= 80) return "Important";
        return "Très important";
    };

    return (
        <div className="test-question-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: '64%' }}></div>
                <span className="progress-text">64%</span>
            </div>

            {/* Question Header */}
            <div className="question-header">
                <h1>Question 9</h1>
                <p className="question-text">
                    Quand vous pensez à votre future carrière, qu'est-ce qui est le plus important pour vous ?
                </p>
            </div>

            {/* Sliders */}
            <div className="sliders-container">
                <div className="slider-item">
                    <label className="slider-label">
                        La sécurité de l'emploi et la stabilité
                        <span className="slider-value">{getSliderLabel(values.security)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={values.security}
                        onChange={(e) => handleSliderChange('security', e.target.value)}
                        className="slider"
                    />
                    <div className="slider-labels">
                        <span>Pas important</span>
                        <span>Très important</span>
                    </div>
                </div>

                <div className="slider-item">
                    <label className="slider-label">
                        La possibilité d'innover et d'être à la pointe
                        <span className="slider-value">{getSliderLabel(values.innovation)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={values.innovation}
                        onChange={(e) => handleSliderChange('innovation', e.target.value)}
                        className="slider"
                    />
                    <div className="slider-labels">
                        <span>Pas important</span>
                        <span>Très important</span>
                    </div>
                </div>

                <div className="slider-item">
                    <label className="slider-label">
                        L'autonomie et la liberté de mes décisions
                        <span className="slider-value">{getSliderLabel(values.autonomy)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={values.autonomy}
                        onChange={(e) => handleSliderChange('autonomy', e.target.value)}
                        className="slider"
                    />
                    <div className="slider-labels">
                        <span>Pas important</span>
                        <span>Très important</span>
                    </div>
                </div>

                <div className="slider-item">
                    <label className="slider-label">
                        Un salaire élevé et de bonnes opportunités financières
                        <span className="slider-value">{getSliderLabel(values.salary)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={values.salary}
                        onChange={(e) => handleSliderChange('salary', e.target.value)}
                        className="slider"
                    />
                    <div className="slider-labels">
                        <span>Pas important</span>
                        <span>Très important</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="navigation-buttons">
                <button 
                    className="nav-btn prev-btn"
                    onClick={() => navigate('/test-question/8')}
                >
                    Précédent
                </button>
                <button 
                    className="nav-btn next-btn"
                    onClick={handleNext}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default TestQuestion9;
