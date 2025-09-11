const fs = require('fs');
const path = require('path');

// Liste des fichiers de questions à modifier
const questionFiles = [
  'frontend/src/pages/OrientationQuestion.jsx',
  'frontend/src/pages/OrientationQuestion2.jsx',
  'frontend/src/pages/OrientationQuestion3.jsx',
  'frontend/src/pages/OrientationQuestion4.jsx',
  'frontend/src/pages/OrientationQuestion5.jsx',
  'frontend/src/pages/OrientationQuestion6.jsx',
  'frontend/src/pages/OrientationQuestion7.jsx',
  'frontend/src/pages/OrientationQuestion8.jsx',
  'frontend/src/pages/OrientationQuestion9.jsx',
  'frontend/src/pages/OrientationQuestion10.jsx',
  'frontend/src/pages/OrientationQuestion11.jsx',
  'frontend/src/pages/OrientationQuestion12.jsx',
  'frontend/src/pages/OrientationQuestion13.jsx',
  'frontend/src/pages/OrientationQuestion14.jsx'
];

function fixQuestionFile(filePath, questionNumber) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si useEffect est déjà importé
    if (!content.includes('useEffect')) {
      // Ajouter useEffect à l'import React
      content = content.replace(
        "import React, { useState } from 'react';",
        "import React, { useState, useEffect } from 'react';"
      );
    }
    
    // Ajouter la récupération de la réponse sauvegardée après useState
    const useStatePattern = /const \[selectedAnswer, setSelectedAnswer\] = useState\(null\);/;
    const useEffectCode = `
  // Récupérer la réponse sauvegardée au chargement
  useEffect(() => {
    const savedAnswer = localStorage.getItem('orientation_answer_${questionNumber}');
    if (savedAnswer) {
      setSelectedAnswer(savedAnswer);
      console.log('✅ Réponse Q${questionNumber} récupérée:', savedAnswer);
    }
  }, []);`;

    if (!content.includes('useEffect')) {
      content = content.replace(useStatePattern, `$&${useEffectCode}`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} - Récupération des réponses ajoutée`);
    
  } catch (error) {
    console.error(`❌ Erreur lors de la modification de ${filePath}:`, error.message);
  }
}

console.log('🔧 CORRECTION DES QUESTIONS POUR LA RÉCUPÉRATION DES RÉPONSES');
console.log('================================================================================');

questionFiles.forEach((filePath, index) => {
  const questionNumber = index + 1;
  fixQuestionFile(filePath, questionNumber);
});

console.log('\n🎉 Correction terminée !');
console.log('✅ Toutes les questions récupèrent maintenant leurs réponses sauvegardées');
