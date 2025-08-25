import React from 'react';
import './QuestionStatusDebugger.css';

const QuestionStatusDebugger = ({ 
  answers, 
  selectedMultiple, 
  dragOrder, 
  sliderValues, 
  personalInfo,
  currentQuestion 
}) => {
  const getQuestionStatus = (questionId) => {
    switch (questionId) {
      case 1:
        return answers[1] ? '✅ Répondu' : '❌ Non répondu';
      case 2:
        return (selectedMultiple.length > 0 || (answers[2] && Array.isArray(answers[2]) && answers[2].length > 0)) 
               ? `✅ Répondu (${selectedMultiple.length || answers[2]?.length || 0} choix)` 
               : '❌ Non répondu';
      case 3:
        return answers[3] ? '✅ Répondu' : '❌ Non répondu';
      case 4:
        return answers[4] ? '✅ Répondu' : '❌ Non répondu';
      case 5:
        return (dragOrder.length > 0 || (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0))
               ? `✅ Répondu (${dragOrder.length || answers[5]?.length || 0}/3 choix)` 
               : '❌ Non répondu';
      case 6:
        return answers[6] ? '✅ Répondu' : '❌ Non répondu';
      case 7:
        return answers[7] ? '✅ Répondu' : '❌ Non répondu';
      case 8:
        return answers[8] ? '✅ Répondu' : '❌ Non répondu';
      case 9:
        const hasSliderValues = Object.keys(sliderValues).length > 0 && 
                               Object.values(sliderValues).some(value => value !== undefined && value >= 0);
        const hasAnswers9 = answers[9] && typeof answers[9] === 'object' && 
                           Object.keys(answers[9]).length > 0;
        return (hasSliderValues || hasAnswers9) 
               ? `✅ Répondu (${Object.keys(sliderValues).length || Object.keys(answers[9] || {}).length} curseurs)` 
               : '❌ Non répondu';
      case 10:
        return answers[10] ? '✅ Répondu' : '❌ Non répondu';
      case 11:
        return answers[11] ? '✅ Répondu' : '❌ Non répondu';
      case 12:
        return answers[12] ? '✅ Répondu' : '❌ Non répondu';
      case 13:
        return answers[13] ? '✅ Répondu' : '❌ Non répondu';
      case 14:
        return (answers[14] && Array.isArray(answers[14]) && answers[14].length > 0) 
               ? `✅ Répondu (${answers[14].length} matières)` 
               : '❌ Non répondu';
      default:
        return '❓ Inconnu';
    }
  };

  const getTotalAnswered = () => {
    let count = 0;
    
    // Questions simples (1, 3, 4, 6, 7, 8, 10, 11, 12, 13)
    const simpleAnswers = Object.keys(answers).filter(key => ![2, 5, 9, 14].includes(parseInt(key)));
    count += simpleAnswers.length;
    
    // Question 2 (choix multiples)
    if (selectedMultiple.length > 0 || (answers[2] && Array.isArray(answers[2]) && answers[2].length > 0)) {
      count += 1;
    }
    
    // Question 5 (glisser-déposer)
    if (dragOrder.length > 0 || (answers[5] && Array.isArray(answers[5]) && answers[5].length > 0)) {
      count += 1;
    }
    
    // Question 9 (curseurs)
    const hasSliderValues = Object.keys(sliderValues).length > 0 && 
                           Object.values(sliderValues).some(value => value !== undefined && value >= 0);
    const hasAnswers9 = answers[9] && typeof answers[9] === 'object' && 
                       Object.keys(answers[9]).length > 0;
    if (hasSliderValues || hasAnswers9) {
      count += 1;
    }
    
    // Question 14 (matières)
    if (answers[14] && Array.isArray(answers[14]) && answers[14].length > 0) {
      count += 1;
    }
    
    return count;
  };

  const totalAnswered = getTotalAnswered();
  const progressPercentage = (totalAnswered / 14) * 100;

  return (
    <div className="question-status-debugger">
      <div className="debugger-header">
        <h3>🔍 Diagnostic des Questions</h3>
        <div className="progress-summary">
          <span className="progress-text">
            {totalAnswered}/14 questions répondues
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-percentage">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      <div className="questions-grid">
        {Array.from({ length: 14 }, (_, i) => i + 1).map(questionId => (
          <div 
            key={questionId} 
            className={`question-status ${questionId === currentQuestion + 1 ? 'current' : ''}`}
          >
            <div className="question-number">Q{questionId}</div>
            <div className="question-status-text">
              {getQuestionStatus(questionId)}
            </div>
            {questionId === currentQuestion + 1 && (
              <div className="current-indicator">📍 Actuelle</div>
            )}
          </div>
        ))}
      </div>

      <div className="debug-details">
        <div className="detail-section">
          <h4>📊 Détails des États</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Réponses simples:</strong> {Object.keys(answers).filter(key => ![2, 5, 9].includes(parseInt(key))).length}
            </div>
            <div className="detail-item">
              <strong>Choix multiples (Q2):</strong> {selectedMultiple.length > 0 ? `${selectedMultiple.length} choix` : 'Non répondu'}
            </div>
            <div className="detail-item">
              <strong>Glisser-déposer (Q5):</strong> {dragOrder.length > 0 ? `${dragOrder.length}/3 choix` : 'Non répondu'}
            </div>
            <div className="detail-item">
              <strong>Curseurs (Q9):</strong> {Object.keys(sliderValues).length > 0 ? `${Object.keys(sliderValues).length} curseurs` : 'Non répondu'}
            </div>
            <div className="detail-item">
              <strong>Infos personnelles:</strong> {personalInfo.nom && personalInfo.email ? '✅ Complètes' : '❌ Incomplètes'}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h4>🔧 Actions de Correction</h4>
          <div className="action-buttons">
            <button 
              className="action-btn"
              onClick={() => window.location.reload()}
            >
              🔄 Recharger le Test
            </button>
            <button 
              className="action-btn"
              onClick={() => console.log('État complet:', { answers, selectedMultiple, dragOrder, sliderValues, personalInfo })}
            >
              📋 Logs Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionStatusDebugger;
