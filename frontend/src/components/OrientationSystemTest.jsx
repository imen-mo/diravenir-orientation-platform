import React, { useState } from 'react';
import orientationService from '../services/orientationService';
import { calculateUserProfile } from '../data/questionToPillarMapping';
import { idealProfilesData } from '../data/idealProfilesData';
import './OrientationSystemTest.css';

const OrientationSystemTest = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questionTestResults, setQuestionTestResults] = useState(null);

  // Réponses de test pour les 14 questions
  const testAnswers = {
    1: 'A', // Créer quelque chose de nouveau
    2: 'C', // Développement personnel, Causes sociales
    3: 'B', // Créatif
    4: 'A', // Résoudre des problèmes complexes
    5: 'C', // Travail en équipe
    6: 'B', // Créativité et innovation
    7: 'A', // Projets pratiques
    8: 'C', // Impact social
    9: { // Sliders pour Q9
      security: 70,
      innovation: 80,
      autonomy: 60,
      salary: 50
    },
    10: 'B', // Apprentissage continu
    11: 'A', // Travail autonome
    12: 'C', // Impact positif
    13: 'B', // Créativité
    14: 'A'  // Sciences et technologie
  };

  // Test complet du système d'orientation
  const runCompleteTest = async () => {
    try {
      setLoading(true);
      setError(null);
      setTestResults(null);

      console.log('🧪 Démarrage du test complet du système d\'orientation...');
      
      // Simuler les réponses dans localStorage
      Object.keys(testAnswers).forEach(questionId => {
        const answer = testAnswers[questionId];
        if (typeof answer === 'object') {
          localStorage.setItem(`orientation_answer_${questionId}`, JSON.stringify(answer));
        } else {
          localStorage.setItem(`orientation_answer_${questionId}`, answer);
        }
      });

      // Traiter l'orientation
      const results = await orientationService.processOrientation(testAnswers);
      
      console.log('✅ Test complet terminé:', results);
      setTestResults(results);
      
    } catch (error) {
      console.error('❌ Erreur lors du test complet:', error);
      setError(`Erreur lors du test complet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Test de calcul frontend uniquement
  const testFrontendCalculation = () => {
    try {
      setError(null);
      setTestResults(null);

      console.log('🧪 Test de calcul frontend...');
      
      const userProfile = calculateUserProfile(testAnswers);
      const recommendations = orientationService.calculateFrontendRecommendations(userProfile);
      
      const results = {
        userProfile,
        recommendations: recommendations.slice(0, 3), // Top 3 seulement
        totalQuestions: 14,
        completedQuestions: Object.keys(testAnswers).length,
        calculationMethod: 'Frontend Only'
      };
      
      console.log('✅ Test frontend terminé:', results);
      setTestResults(results);
      
    } catch (error) {
      console.error('❌ Erreur lors du test frontend:', error);
      setError(`Erreur lors du test frontend: ${error.message}`);
    }
  };

  // Test de l'API backend simulée
  const testBackendAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      setTestResults(null);

      console.log('🧪 Test de l\'API backend...');
      
      const backendRequest = orientationService.prepareBackendRequest(testAnswers);
      const results = await orientationService.getBackendRecommendations(backendRequest.backendRequest);
      
      console.log('✅ Test API backend terminé:', results);
      setTestResults(results);
      
    } catch (error) {
      console.error('❌ Erreur lors du test API backend:', error);
      setError(`Erreur lors du test API backend: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Test de validation des 14 questions
  const test14QuestionsValidation = () => {
    try {
      setError(null);
      setQuestionTestResults(null);

      console.log('🧪 Test de validation des 14 questions...');
      
      const validationResults = {
        totalQuestions: 14,
        answeredQuestions: Object.keys(testAnswers).length,
        isComplete: Object.keys(testAnswers).length === 14,
        questionDetails: []
      };

      // Vérifier chaque question
      for (let i = 1; i <= 14; i++) {
        const answer = testAnswers[i];
        const hasAnswer = answer !== undefined && answer !== null;
        
        validationResults.questionDetails.push({
          questionId: i,
          hasAnswer,
          answerType: typeof answer,
          answerValue: answer
        });
      }

      // Vérifier que chaque question a une seule réponse
      const singleAnswerValidation = validationResults.questionDetails.every(q => {
        if (q.questionId === 9) {
          // Q9 est spéciale (sliders)
          return typeof q.answerValue === 'object' && q.answerValue !== null;
        } else {
          // Les autres questions doivent avoir une seule réponse
          return typeof q.answerValue === 'string' && q.answerValue.length > 0;
        }
      });

      validationResults.allQuestionsHaveSingleAnswer = singleAnswerValidation;
      
      console.log('✅ Test de validation des questions terminé:', validationResults);
      setQuestionTestResults(validationResults);
      
    } catch (error) {
      console.error('❌ Erreur lors du test de validation:', error);
      setError(`Erreur lors du test de validation: ${error.message}`);
    }
  };

  return (
    <div className="orientation-system-test">
      <div className="test-header">
        <h1>🧪 Test du Système d'Orientation</h1>
        <p>Vérification de l'intégration des 14 questions avec les 17 piliers et 44 majeures</p>
      </div>

      <div className="test-controls">
        <button 
          className="test-btn primary" 
          onClick={runCompleteTest}
          disabled={loading}
        >
          {loading ? '⏳ Test en cours...' : '🚀 Test Complet'}
        </button>
        
        <button 
          className="test-btn secondary" 
          onClick={testFrontendCalculation}
          disabled={loading}
        >
          🧮 Test Frontend
        </button>
        
        <button 
          className="test-btn secondary" 
          onClick={testBackendAPI}
          disabled={loading}
        >
          🔌 Test API Backend
        </button>
        
        <button 
          className="test-btn secondary" 
          onClick={test14QuestionsValidation}
          disabled={loading}
        >
          ✅ Validation 14 Questions
        </button>
      </div>

      {error && (
        <div className="error-message">
          <h3>❌ Erreur</h3>
          <p>{error}</p>
        </div>
      )}

      {questionTestResults && (
        <div className="test-results">
          <h3>📋 Validation des 14 Questions</h3>
          <div className="validation-summary">
            <div className="summary-item">
              <span className="label">Questions totales:</span>
              <span className="value">{questionTestResults.totalQuestions}</span>
            </div>
            <div className="summary-item">
              <span className="label">Questions répondues:</span>
              <span className="value">{questionTestResults.answeredQuestions}</span>
            </div>
            <div className="summary-item">
              <span className="label">Test complet:</span>
              <span className={`value ${questionTestResults.isComplete ? 'success' : 'error'}`}>
                {questionTestResults.isComplete ? '✅ OUI' : '❌ NON'}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Une réponse par question:</span>
              <span className={`value ${questionTestResults.allQuestionsHaveSingleAnswer ? 'success' : 'error'}`}>
                {questionTestResults.allQuestionsHaveSingleAnswer ? '✅ OUI' : '❌ NON'}
              </span>
            </div>
          </div>
          
          <div className="question-details">
            <h4>Détails par question:</h4>
            <div className="question-grid">
              {questionTestResults.questionDetails.map(q => (
                <div key={q.questionId} className={`question-item ${q.hasAnswer ? 'answered' : 'unanswered'}`}>
                  <span className="question-id">Q{q.questionId}</span>
                  <span className="question-status">
                    {q.hasAnswer ? '✅' : '❌'}
                  </span>
                  <span className="question-type">
                    {q.questionId === 9 ? 'Sliders' : 'Choix unique'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {testResults && (
        <div className="test-results">
          <h3>🎯 Résultats du Test</h3>
          
          <div className="results-summary">
            <div className="summary-item">
              <span className="label">Méthode de calcul:</span>
              <span className="value">{testResults.calculationMethod || 'Backend + Fallback'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Questions complétées:</span>
              <span className="value">{testResults.completedQuestions}/{testResults.totalQuestions}</span>
            </div>
            <div className="summary-item">
              <span className="label">Recommandations générées:</span>
              <span className="value">{testResults.recommendations?.length || 0}</span>
            </div>
          </div>

          {testResults.userProfile && (
            <div className="user-profile">
              <h4>👤 Profil Utilisateur (Top 5 Piliers)</h4>
              <div className="pillars-grid">
                {Object.entries(testResults.userProfile)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([pillar, score]) => (
                    <div key={pillar} className="pillar-item">
                      <span className="pillar-name">{pillar}</span>
                      <span className="pillar-score">{Math.round(score)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {testResults.recommendations && (
            <div className="recommendations">
              <h4>🎓 Top 3 Majeures Recommandées</h4>
              <div className="recommendations-list">
                {testResults.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="rank">#{index + 1}</div>
                    <div className="major-info">
                      <div className="major-name">{rec.majorName}</div>
                      <div className="major-code">{rec.majorCode}</div>
                    </div>
                    <div className="matching-score">
                      {Math.round(rec.matchingScore)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="system-info">
        <h3>ℹ️ Informations Système</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Questions d'orientation:</span>
            <span className="value">14 questions</span>
          </div>
          <div className="info-item">
            <span className="label">Piliers de compétences:</span>
            <span className="value">17 piliers</span>
          </div>
          <div className="info-item">
            <span className="label">Majeures disponibles:</span>
            <span className="value">44 majeures</span>
          </div>
          <div className="info-item">
            <span className="label">Recommandations affichées:</span>
            <span className="value">Top 3 seulement</span>
          </div>
          <div className="info-item">
            <span className="label">Intégration frontend:</span>
            <span className="value">✅ Complète</span>
          </div>
          <div className="info-item">
            <span className="label">Lien vers programmes:</span>
            <span className="value">✅ Actif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationSystemTest;
