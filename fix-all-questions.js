const fs = require('fs');
const path = require('path');

// Liste des fichiers de questions à corriger
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
  'frontend/src/pages/OrientationQuestion14.jsx',
  'frontend/src/pages/OrientationQuestion15.jsx'
];

// Fonction pour corriger un fichier de question
function fixQuestionFile(filePath, questionNumber) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Fichier non trouvé: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Chercher la fonction handleNext
    const handleNextRegex = /const handleNext = \(\) => \{[\s\S]*?\};/;
    const match = content.match(handleNextRegex);
    
    if (match) {
      const currentHandleNext = match[0];
      
      // Nouvelle fonction handleNext avec sauvegarde
      const newHandleNext = `const handleNext = () => {
    if (selectedAnswer) {
      // Sauvegarder la réponse dans localStorage
      localStorage.setItem('orientation_answer_${questionNumber}', selectedAnswer);
      console.log('✅ Réponse Q${questionNumber} sauvegardée:', selectedAnswer);
      navigate('/orientation/question/${questionNumber + 1}');
    }
  };`;
      
      // Remplacer la fonction
      content = content.replace(handleNextRegex, newHandleNext);
      
      // Sauvegarder le fichier
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fichier corrigé: ${filePath}`);
    } else {
      console.log(`⚠️ Fonction handleNext non trouvée dans: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
  }
}

// Corriger tous les fichiers
console.log('🔧 Correction de tous les fichiers de questions...');
questionFiles.forEach((filePath, index) => {
  const questionNumber = index + 1;
  fixQuestionFile(filePath, questionNumber);
});

console.log('🎉 Correction terminée !');
