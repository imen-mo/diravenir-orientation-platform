// src/components/QuestionCard.jsx
import React from 'react';

const QuestionCard = ({ question, answer, onChange }) => {
    return (
        <div className="question-card">
            <p className="question-text">{question.text}</p>
            <div className="options">
                <label><input type="radio" value="1" checked={answer === '1'} onChange={() => onChange(question.id, '1')} /> Pas du tout d’accord</label>
                <label><input type="radio" value="2" checked={answer === '2'} onChange={() => onChange(question.id, '2')} /> Plutôt pas d’accord</label>
                <label><input type="radio" value="3" checked={answer === '3'} onChange={() => onChange(question.id, '3')} /> Neutre</label>
                <label><input type="radio" value="4" checked={answer === '4'} onChange={() => onChange(question.id, '4')} /> Plutôt d’accord</label>
                <label><input type="radio" value="5" checked={answer === '5'} onChange={() => onChange(question.id, '5')} /> Tout à fait d’accord</label>
            </div>
        </div>
    );
};

export default QuestionCard;
