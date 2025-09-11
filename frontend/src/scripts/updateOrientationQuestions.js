// Script pour mettre à jour toutes les questions d'orientation
// Ce script liste les modifications à apporter manuellement

const questionsToUpdate = [
  'OrientationQuestion3',
  'OrientationQuestion4', 
  'OrientationQuestion5',
  'OrientationQuestion6',
  'OrientationQuestion7',
  'OrientationQuestion8',
  'OrientationQuestion9',
  'OrientationQuestion10',
  'OrientationQuestion11',
  'OrientationQuestion12',
  'OrientationQuestion14'
];

const requiredChanges = `
Pour chaque question, appliquer les modifications suivantes :

1. AJOUTER LES IMPORTS :
   import QuestionProgress from '../components/QuestionProgress';
   import './OrientationQuestionCommon.css';

2. REMPLACER LA BARRE DE PROGRESSION :
   Remplacer :
   <div className="progress-container">...</div>
   
   Par :
   <QuestionProgress currentQuestion={X} totalQuestions={15} />

3. CORRIGER LA NAVIGATION :
   Dans le CSS, ajouter :
   .navigation {
     width: 100%;
     position: relative;
   }
   
   .btn-back {
     margin-right: auto;
   }
   
   .btn-next {
     margin-left: auto;
   }

4. AGRANDIR LA CARTE MÈRE :
   Dans le CSS, changer :
   .question-content {
     max-width: 1400px; /* au lieu de 1200px */
   }
`;

console.log('Questions à mettre à jour :', questionsToUpdate);
console.log('Modifications requises :', requiredChanges);

export { questionsToUpdate, requiredChanges };
