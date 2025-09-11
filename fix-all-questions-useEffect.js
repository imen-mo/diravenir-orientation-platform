const fs = require('fs');
const path = require('path');

// Liste des fichiers de questions à modifier
const questionFiles = [
  { file: 'frontend/src/pages/OrientationQuestion.jsx', number: 1 },
  { file: 'frontend/src/pages/OrientationQuestion2.jsx', number: 2 },
  { file: 'frontend/src/pages/OrientationQuestion3.jsx', number: 3 },
  { file: 'frontend/src/pages/OrientationQuestion4.jsx', number: 4 },
  { file: 'frontend/src/pages/OrientationQuestion5.jsx', number: 5 },
  { file: 'frontend/src/pages/OrientationQuestion6.jsx', number: 6 },
  { file: 'frontend/src/pages/OrientationQuestion7.jsx', number: 7 },
  { file: 'frontend/src/pages/OrientationQuestion8.jsx', number: 8 },
  { file: 'frontend/src/pages/OrientationQuestion9.jsx', number: 9 },
  { file: 'frontend/src/pages/OrientationQuestion10.jsx', number: 10 },
  { file: 'frontend/src/pages/OrientationQuestion11.jsx', number: 11 },
  { file: 'frontend/src/pages/OrientationQuestion12.jsx', number: 12 },
  { file: 'frontend/src/pages/OrientationQuestion13.jsx', number: 13 },
  { file: 'frontend/src/pages/OrientationQuestion14.jsx', number: 14 }
];

function fixQuestionFile(filePath, questionNumber) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si useEffect est déjà présent dans le code
    if (content.includes('useEffect(() => {')) {
      console.log(`✅ ${filePath} - useEffect déjà présent`);
      return;
    }
    
    // Ajouter useEffect après useState
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

    content = content.replace(useStatePattern, `$&${useEffectCode}`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} - useEffect ajouté`);
    
  } catch (error) {
    console.error(`❌ Erreur lors de la modification de ${filePath}:`, error.message);
  }
}

console.log('🔧 AJOUT DU useEffect POUR LA RÉCUPÉRATION DES RÉPONSES');
console.log('================================================================================');

questionFiles.forEach(({ file, number }) => {
  fixQuestionFile(file, number);
});

console.log('\n🎉 Correction terminée !');
console.log('✅ Toutes les questions récupèrent maintenant leurs réponses sauvegardées');
