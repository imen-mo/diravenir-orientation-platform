import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './FrontendPerformanceTest.css';

/**
 * Composant de test de performance frontend ultra-optimisé
 * Mesure les performances côté client et optimise le rendu
 */
const FrontendPerformanceTest = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    domOperations: 0,
    eventHandling: 0,
    animationFPS: 0,
    bundleSize: 0,
  });
  
  const [testResults, setTestResults] = useState({
    isRunning: false,
    progress: 0,
    currentTest: '',
    results: [],
  });
  
  const [optimizations, setOptimizations] = useState({
    virtualScrolling: false,
    lazyLoading: false,
    memoization: false,
    codeSplitting: false,
    imageOptimization: false,
  });

  // Tests de performance optimisés avec useMemo et useCallback
  const performanceTests = useMemo(() => [
    {
      name: 'Rendu DOM',
      description: 'Mesure le temps de rendu des composants',
      test: measureDOMRendering,
      weight: 0.3,
    },
    {
      name: 'Gestion Mémoire',
      description: 'Vérifie l\'utilisation de la mémoire',
      test: measureMemoryUsage,
      weight: 0.2,
    },
    {
      name: 'Opérations DOM',
      description: 'Teste la vitesse des manipulations DOM',
      test: measureDOMOperations,
      weight: 0.25,
    },
    {
      name: 'Gestion Événements',
      description: 'Mesure la réactivité des événements',
      test: measureEventHandling,
      weight: 0.15,
    },
    {
      name: 'Performance Animations',
      description: 'Teste le FPS des animations',
      test: measureAnimationPerformance,
      weight: 0.1,
    },
  ], []);

  // Fonction de test de rendu DOM optimisée
  const measureDOMRendering = useCallback(async () => {
    const startTime = performance.now();
    
    // Création d'une liste de 1000 éléments pour tester le rendu
    const testElements = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Élément de test ${i}`,
      value: Math.random() * 100,
    }));
    
    // Rendu optimisé avec virtualisation
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    
    // Utilisation de DocumentFragment pour optimiser les insertions DOM
    const fragment = document.createDocumentFragment();
    
    testElements.forEach((element, index) => {
      if (index % 10 === 0) { // Rendu par batch de 10
        const div = document.createElement('div');
        div.textContent = element.text;
        div.className = 'test-element';
        fragment.appendChild(div);
      }
    });
    
    container.appendChild(fragment);
    document.body.appendChild(container);
    
    const renderTime = performance.now() - startTime;
    
    // Nettoyage
    document.body.removeChild(container);
    
    return {
      metric: 'renderTime',
      value: renderTime,
      unit: 'ms',
      score: Math.max(0, 100 - (renderTime / 10)), // Score basé sur le temps
    };
  }, []);

  // Fonction de test de mémoire optimisée
  const measureMemoryUsage = useCallback(async () => {
    if ('memory' in performance) {
      const memoryInfo = performance.memory;
      const memoryUsage = memoryInfo.usedJSHeapSize / 1024 / 1024; // MB
      
      return {
        metric: 'memoryUsage',
        value: memoryUsage,
        unit: 'MB',
        score: Math.max(0, 100 - (memoryUsage / 10)), // Score basé sur l'utilisation mémoire
      };
    }
    
    // Fallback si performance.memory n'est pas disponible
    return {
      metric: 'memoryUsage',
      value: 0,
      unit: 'MB',
      score: 50, // Score neutre
    };
  }, []);

  // Fonction de test des opérations DOM optimisée
  const measureDOMOperations = useCallback(async () => {
    const startTime = performance.now();
    const operations = 1000;
    
    // Test des opérations DOM en batch
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);
    
    // Utilisation de requestAnimationFrame pour optimiser les opérations
    const batchSize = 50;
    let currentIndex = 0;
    
    const processBatch = () => {
      const endIndex = Math.min(currentIndex + batchSize, operations);
      
      for (let i = currentIndex; i < endIndex; i++) {
        const element = document.createElement('div');
        element.textContent = `Opération ${i}`;
        element.className = 'dom-test-element';
        container.appendChild(element);
      }
      
      currentIndex = endIndex;
      
      if (currentIndex < operations) {
        requestAnimationFrame(processBatch);
      } else {
        // Test terminé
        const domOperations = performance.now() - startTime;
        document.body.removeChild(container);
        
        return {
          metric: 'domOperations',
          value: domOperations,
          unit: 'ms',
          score: Math.max(0, 100 - (domOperations / 20)),
        };
      }
    };
    
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        processBatch();
        // Timeout de sécurité
        setTimeout(() => {
          if (container.parentNode) {
            document.body.removeChild(container);
          }
          resolve({
            metric: 'domOperations',
            value: 0,
            unit: 'ms',
            score: 0,
          });
        }, 5000);
      });
    });
  }, []);

  // Fonction de test des événements optimisée
  const measureEventHandling = useCallback(async () => {
    const startTime = performance.now();
    const events = 1000;
    
    // Test de gestion d'événements avec debouncing
    let eventCount = 0;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);
    
    const handleEvent = () => {
      eventCount++;
    };
    
    // Ajout d'événements avec gestion optimisée
    for (let i = 0; i < events; i++) {
      container.addEventListener('click', handleEvent, { passive: true });
    }
    
    // Déclenchement des événements
    container.click();
    
    const eventHandling = performance.now() - startTime;
    
    // Nettoyage
    document.body.removeChild(container);
    
    return {
      metric: 'eventHandling',
      value: eventHandling,
      unit: 'ms',
      score: Math.max(0, 100 - (eventHandling / 10)),
    };
  }, []);

  // Fonction de test des animations optimisée
  const measureAnimationPerformance = useCallback(async () => {
    return new Promise((resolve) => {
      let frameCount = 0;
      let lastTime = performance.now();
      const testDuration = 1000; // 1 seconde
      
      const animate = (currentTime) => {
        frameCount++;
        
        if (currentTime - lastTime >= testDuration) {
          const fps = frameCount / (testDuration / 1000);
          const score = Math.min(100, fps);
          
          resolve({
            metric: 'animationFPS',
            value: fps,
            unit: 'FPS',
            score,
          });
        } else {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
  }, []);

  // Exécution de tous les tests de performance
  const runPerformanceTests = useCallback(async () => {
    setTestResults(prev => ({ ...prev, isRunning: true, progress: 0, results: [] }));
    
    const results = [];
    const totalTests = performanceTests.length;
    
    for (let i = 0; i < totalTests; i++) {
      const test = performanceTests[i];
      setTestResults(prev => ({ 
        ...prev, 
        currentTest: test.name,
        progress: ((i + 1) / totalTests) * 100 
      }));
      
      try {
        const result = await test.test();
        results.push(result);
        
        // Mise à jour des métriques en temps réel
        setPerformanceMetrics(prev => ({
          ...prev,
          [result.metric]: result.value,
        }));
        
        // Délai pour permettre la mise à jour de l'UI
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Erreur lors du test ${test.name}:`, error);
        results.push({
          metric: test.name.toLowerCase(),
          value: 0,
          unit: 'ms',
          score: 0,
          error: error.message,
        });
      }
    }
    
    setTestResults(prev => ({ 
      ...prev, 
      isRunning: false, 
      progress: 100,
      results 
    }));
    
    // Calcul du score global
    const globalScore = results.reduce((total, result) => {
      const test = performanceTests.find(t => t.name.toLowerCase() === result.metric);
      return total + (result.score * (test?.weight || 0.2));
    }, 0);
    
    console.log(`🎯 Score de performance global: ${globalScore.toFixed(2)}/100`);
  }, [performanceTests]);

  // Optimisations automatiques
  const applyOptimizations = useCallback(() => {
    const newOptimizations = { ...optimizations };
    
    // Application des optimisations basées sur les métriques
    if (performanceMetrics.renderTime > 100) {
      newOptimizations.virtualScrolling = true;
    }
    
    if (performanceMetrics.memoryUsage > 50) {
      newOptimizations.lazyLoading = true;
    }
    
    if (performanceMetrics.domOperations > 200) {
      newOptimizations.memoization = true;
    }
    
    if (performanceMetrics.eventHandling > 150) {
      newOptimizations.codeSplitting = true;
    }
    
    if (performanceMetrics.animationFPS < 30) {
      newOptimizations.imageOptimization = true;
    }
    
    setOptimizations(newOptimizations);
  }, [performanceMetrics, optimizations]);

  // Calcul du score global
  const globalScore = useMemo(() => {
    if (testResults.results.length === 0) return 0;
    
    return testResults.results.reduce((total, result) => {
      const test = performanceTests.find(t => t.name.toLowerCase() === result.metric);
      return total + (result.score * (test?.weight || 0.2));
    }, 0);
  }, [testResults.results, performanceTests]);

  // Niveau de performance
  const performanceLevel = useMemo(() => {
    if (globalScore >= 90) return { level: 'Excellent', color: '#10b981', emoji: '🚀' };
    if (globalScore >= 75) return { level: 'Bon', color: '#3b82f6', emoji: '✅' };
    if (globalScore >= 60) return { level: 'Moyen', color: '#f59e0b', emoji: '⚠️' };
    return { level: 'À améliorer', color: '#ef4444', emoji: '❌' };
  }, [globalScore]);

  return (
    <div className="frontend-performance-test">
      <div className="test-header">
        <h2>⚡ Test de Performance Frontend</h2>
        <p>Mesure et optimisation des performances côté client</p>
      </div>

      {/* Score global */}
      <div className="global-score" style={{ borderColor: performanceLevel.color }}>
        <div className="score-display">
          <span className="score-emoji">{performanceLevel.emoji}</span>
          <div className="score-info">
            <h3>Score Global: {globalScore.toFixed(1)}/100</h3>
            <p>Niveau: {performanceLevel.level}</p>
          </div>
        </div>
        <div className="score-bar">
          <div 
            className="score-fill" 
            style={{ 
              width: `${globalScore}%`, 
              backgroundColor: performanceLevel.color 
            }}
          />
        </div>
      </div>

      {/* Bouton de test */}
      <div className="test-actions">
        <button 
          onClick={runPerformanceTests}
          disabled={testResults.isRunning}
          className="test-button"
        >
          {testResults.isRunning ? '🔄 Test en cours...' : '🚀 Lancer les Tests'}
        </button>
        
        {testResults.isRunning && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${testResults.progress}%` }}
            />
            <span className="progress-text">
              {testResults.currentTest} - {testResults.progress.toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* Métriques de performance */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">⚡</span>
            <h4>Temps de Rendu</h4>
          </div>
          <div className="metric-value">
            {performanceMetrics.renderTime.toFixed(2)}ms
          </div>
          <div className="metric-score">
            Score: {testResults.results.find(r => r.metric === 'renderTime')?.score?.toFixed(1) || 0}/100
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">💾</span>
            <h4>Utilisation Mémoire</h4>
          </div>
          <div className="metric-value">
            {performanceMetrics.memoryUsage.toFixed(2)}MB
          </div>
          <div className="metric-score">
            Score: {testResults.results.find(r => r.metric === 'memoryUsage')?.score?.toFixed(1) || 0}/100
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">🔧</span>
            <h4>Opérations DOM</h4>
          </div>
          <div className="metric-value">
            {performanceMetrics.domOperations.toFixed(2)}ms
          </div>
          <div className="metric-score">
            Score: {testResults.results.find(r => r.metric === 'domOperations')?.score?.toFixed(1) || 0}/100
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">🎯</span>
            <h4>Gestion Événements</h4>
          </div>
          <div className="metric-value">
            {performanceMetrics.eventHandling.toFixed(2)}ms
          </div>
          <div className="metric-score">
            Score: {testResults.results.find(r => r.metric === 'eventHandling')?.score?.toFixed(1) || 0}/100
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">🎬</span>
            <h4>FPS Animations</h4>
          </div>
          <div className="metric-value">
            {performanceMetrics.animationFPS.toFixed(1)} FPS
          </div>
          <div className="metric-score">
            Score: {testResults.results.find(r => r.metric === 'animationFPS')?.score?.toFixed(1) || 0}/100
          </div>
        </div>
      </div>

      {/* Optimisations recommandées */}
      <div className="optimizations-section">
        <h3>🔧 Optimisations Recommandées</h3>
        <div className="optimizations-grid">
          {Object.entries(optimizations).map(([key, enabled]) => (
            <div key={key} className={`optimization-item ${enabled ? 'enabled' : 'disabled'}`}>
              <span className="optimization-icon">
                {enabled ? '✅' : '⏳'}
              </span>
              <div className="optimization-info">
                <h4>{getOptimizationName(key)}</h4>
                <p>{getOptimizationDescription(key)}</p>
              </div>
              <span className="optimization-status">
                {enabled ? 'Activée' : 'En attente'}
              </span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={applyOptimizations}
          className="optimize-button"
        >
          🚀 Appliquer les Optimisations
        </button>
      </div>

      {/* Résultats détaillés */}
      {testResults.results.length > 0 && (
        <div className="detailed-results">
          <h3>📊 Résultats Détaillés</h3>
          <div className="results-table">
            <div className="table-header">
              <span>Test</span>
              <span>Valeur</span>
              <span>Score</span>
              <span>Poids</span>
            </div>
            {testResults.results.map((result, index) => {
              const test = performanceTests.find(t => t.name.toLowerCase() === result.metric);
              return (
                <div key={index} className="table-row">
                  <span>{test?.name || result.metric}</span>
                  <span>{result.value.toFixed(2)} {result.unit}</span>
                  <span>{result.score.toFixed(1)}/100</span>
                  <span>{(test?.weight * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Fonctions utilitaires
const getOptimizationName = (key) => {
  const names = {
    virtualScrolling: 'Défilement Virtuel',
    lazyLoading: 'Chargement Différé',
    memoization: 'Mémorisation',
    codeSplitting: 'Division du Code',
    imageOptimization: 'Optimisation Images',
  };
  return names[key] || key;
};

const getOptimizationDescription = (key) => {
  const descriptions = {
    virtualScrolling: 'Rendu uniquement des éléments visibles',
    lazyLoading: 'Chargement des composants à la demande',
    memoization: 'Cache des calculs coûteux',
    codeSplitting: 'Division du bundle en chunks',
    imageOptimization: 'Compression et formats modernes',
  };
  return descriptions[key] || 'Description non disponible';
};

export default FrontendPerformanceTest;
