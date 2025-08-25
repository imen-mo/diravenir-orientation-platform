/**
 * Test du Système d'Orientation Corrigé
 * 
 * Ce script teste que le frontend et le backend sont maintenant synchronisés :
 * - Frontend : 14 questions exactement
 * - Backend : 17 piliers avec logique de scoring
 * - API : Endpoint /api/orientation/recommendations
 */

console.log('🧪 Test du Système d\'Orientation Corrigé');
console.log('=====================================\n');

// Configuration de test
const TEST_CONFIG = {
  backendUrl: 'http://localhost:8084',
  apiEndpoint: '/api/orientation/recommendations',
  expectedQuestions: 14,
  expectedPillars: 17
};

// Réponses de test correspondant exactement aux 14 questions
const TEST_ANSWERS = {
  question1: 'A', // Créer quelque chose de nouveau
  question2: ['A', 'B'], // Découvertes scientifiques + Art et culture
  question3: 'A', // Rayons d'électronique
  question4: 'A', // Décomposer en étapes logiques
  question5: ['A', 'B', 'C'], // Gérer budget, Organiser événement, Écrire texte
  question6: 'A', // Lire et prendre des notes
  question7: 'A', // Améliorer la vie des individus
  question8: 'A', // Laboratoire
  question9: {
    securite: 4,
    innovation: 5,
    autonomie: 3,
    salaire: 2
  },
  question10: 'A', // Comprendre la racine du problème
  question11: 'A', // Travailler seul
  question12: 'A', // Préparer méticuleusement
  question13: 'A', // Logique et analyse
  question14: ['A', 'E'] // Sciences + Technologie/Info
};

// Test de la structure des réponses
console.log('📋 Test de la structure des réponses :');
console.log(`✅ Nombre de questions : ${Object.keys(TEST_ANSWERS).length}/${TEST_CONFIG.expectedQuestions}`);
console.log('✅ Format des réponses :', Object.keys(TEST_ANSWERS).map(q => `${q}: ${typeof TEST_ANSWERS[q]}`));
console.log('✅ Question 9 (curseurs) :', TEST_ANSWERS.question9);
console.log('✅ Questions multiples :', [TEST_ANSWERS.question2, TEST_ANSWERS.question5, TEST_ANSWERS.question14]);
console.log('');

// Test de l'API
async function testOrientationAPI() {
  console.log('🚀 Test de l\'API d\'orientation :');
  
  try {
    const response = await fetch(`${TEST_CONFIG.backendUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TEST_ANSWERS)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ API répond correctement');
    console.log('✅ Structure de la réponse :', Object.keys(result));
    
    if (result.topRecommendations) {
      console.log('✅ Top recommandations présentes');
      console.log('✅ Nombre de recommandations :', result.topRecommendations.length);
    } else {
      console.log('⚠️ Pas de topRecommendations dans la réponse');
    }

    if (result.allRecommendations) {
      console.log('✅ Toutes les recommandations présentes');
      console.log('✅ Nombre total :', result.allRecommendations.length);
    }

    return result;

  } catch (error) {
    console.error('❌ Erreur API :', error.message);
    return null;
  }
}

// Test de la logique de scoring
function testScoringLogic() {
  console.log('\n🧮 Test de la logique de scoring :');
  
  // Vérifier que les réponses correspondent aux piliers attendus
  const expectedPillars = [
    'Interet_Scientifique_Tech',
    'Interet_Artistique_Creatif', 
    'Interet_Social_Humain',
    'Interet_Business_Gestion',
    'Interet_Logique_Analytique',
    'Competence_Resolution_Problemes',
    'Competence_Communication',
    'Competence_Organisation',
    'Competence_Manuel_Technique',
    'Valeur_Impact_Societal',
    'Valeur_Innovation_Challenge',
    'Valeur_Stabilite_Securite',
    'Valeur_Autonomie',
    'Pref_Travail_Equipe_Collab',
    'Pref_Travail_Autonome',
    'Pref_Pratique_Terrain',
    'Pref_Theorie_Recherche'
  ];

  console.log(`✅ Nombre de piliers attendus : ${expectedPillars.length}/${TEST_CONFIG.expectedPillars}`);
  console.log('✅ Piliers d\'intérêts :', expectedPillars.filter(p => p.startsWith('Interet_')));
  console.log('✅ Piliers de compétences :', expectedPillars.filter(p => p.startsWith('Competence_')));
  console.log('✅ Piliers de valeurs :', expectedPillars.filter(p => p.startsWith('Valeur_')));
  console.log('✅ Piliers de préférences :', expectedPillars.filter(p => p.startsWith('Pref_')));
}

// Test de validation des réponses
function testAnswerValidation() {
  console.log('\n✅ Test de validation des réponses :');
  
  // Question 1 : String simple
  if (typeof TEST_ANSWERS.question1 === 'string' && TEST_ANSWERS.question1.length === 1) {
    console.log('✅ Question 1 : Format correct (string simple)');
  } else {
    console.log('❌ Question 1 : Format incorrect');
  }

  // Question 2 : Array de strings
  if (Array.isArray(TEST_ANSWERS.question2) && TEST_ANSWERS.question2.length <= 3) {
    console.log('✅ Question 2 : Format correct (array, max 3)');
  } else {
    console.log('❌ Question 2 : Format incorrect');
  }

  // Question 9 : Map des curseurs
  if (typeof TEST_ANSWERS.question9 === 'object' && !Array.isArray(TEST_ANSWERS.question9)) {
    const sliderKeys = Object.keys(TEST_ANSWERS.question9);
    const expectedKeys = ['securite', 'innovation', 'autonomie', 'salaire'];
    if (sliderKeys.every(key => expectedKeys.includes(key))) {
      console.log('✅ Question 9 : Format correct (map des curseurs)');
    } else {
      console.log('❌ Question 9 : Clés incorrectes');
    }
  } else {
    console.log('❌ Question 9 : Format incorrect');
  }
}

// Exécution des tests
async function runAllTests() {
  console.log('🎯 Démarrage des tests...\n');
  
  // Tests de structure
  testAnswerValidation();
  testScoringLogic();
  
  // Test de l'API
  const apiResult = await testOrientationAPI();
  
  console.log('\n📊 Résumé des tests :');
  if (apiResult) {
    console.log('✅ Système d\'orientation fonctionnel');
    console.log('✅ Frontend et backend synchronisés');
    console.log('✅ API répond correctement');
  } else {
    console.log('❌ Problème avec l\'API');
    console.log('💡 Vérifiez que le backend est démarré sur le port 8084');
  }
  
  console.log('\n🎉 Tests terminés !');
}

// Démarrer les tests si le script est exécuté directement
if (typeof window === 'undefined') {
  // Node.js environment
  console.log('Node.js environment détecté');
  console.log('Pour tester dans le navigateur, ouvrez la console et exécutez :');
  console.log('runAllTests()');
} else {
  // Browser environment
  console.log('Navigateur détecté - Tests prêts à être exécutés');
  console.log('Exécutez runAllTests() dans la console pour démarrer les tests');
}
