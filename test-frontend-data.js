// Script pour tester les données frontend
console.log('🔍 Test des données frontend...');

// Simuler les données que le backend devrait retourner
const mockBackendResponse = {
  userProfile: {
    "Interet_Scientifique_Tech": 66,
    "Interet_Logique_Analytique": 100,
    "Competence_Resolution_Problemes": 34,
    "Competence_Organisation": 13
  },
  recommendations: [
    {
      majorId: "CS",
      majorCode: "CS", 
      majorName: "Informatique",
      matchingScore: 82.3,
      score: 82.3,
      description: "L'informatique est la science qui révolutionne notre monde numérique, combinant logique, créativité et innovation pour créer des solutions technologiques.",
      whyThisMajor: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique.",
      reasoning: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique."
    },
    {
      majorId: "ELECTRICAL",
      majorCode: "ELECTRICAL",
      majorName: "Génie Électrique", 
      matchingScore: 81.4,
      score: 81.4,
      description: "Le génie électrique est au cœur de l'innovation technologique, couvrant la conception, l'analyse et la fabrication de systèmes électriques.",
      whyThisMajor: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique.",
      reasoning: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique."
    },
    {
      majorId: "CIVIL",
      majorCode: "CIVIL",
      majorName: "Génie Civil",
      matchingScore: 79.8,
      score: 79.8,
      description: "Le génie civil est une discipline qui combine créativité et rigueur technique pour concevoir et construire les infrastructures qui façonnent notre environnement.",
      whyThisMajor: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique, capacité de résolution de problèmes.",
      reasoning: "Vos points forts qui correspondent particulièrement à cette majeure : pensée logique et analytique, capacité de résolution de problèmes."
    }
  ],
  success: true
};

// Simuler le mapping frontend
const userProfile = mockBackendResponse.userProfile || {};
const recommendations = mockBackendResponse.recommendations || [];

const frontendResults = {
  topRecommendations: recommendations.slice(0, 3).map(rec => ({
    majorCode: rec.majorId || rec.majorCode,
    majorName: rec.majorName,
    matchingScore: rec.matchingScore || rec.score || 0,
    matchingPercentage: `${Math.round(rec.matchingScore || rec.score || 0)}%`,
    description: rec.description || '',
    whyThisMajor: rec.whyThisMajor || rec.userDescription || '',
    pillarComparison: rec.pillarComparison || {}
  })),
  userProfile: userProfile,
  personalityProfile: "Profil logique et scientifique",
  testSummary: {
    totalQuestions: 15,
    completedAt: new Date().toISOString(),
    duration: '12 minutes'
  },
  calculationMethod: 'BACKEND'
};

console.log('📊 Données backend simulées:', mockBackendResponse);
console.log('🔄 Mapping frontend:', frontendResults);

// Tester l'affichage
console.log('\n🎯 Top 3 Recommandations:');
frontendResults.topRecommendations.forEach((program, index) => {
  console.log(`${index + 1}. ${program.majorName} - ${program.matchingScore}%`);
  console.log(`   Description: ${program.description}`);
  console.log(`   Why this major: ${program.whyThisMajor}`);
  console.log(`   Matching Score: ${program.matchingScore}`);
  console.log(`   Matching Percentage: ${program.matchingPercentage}`);
  console.log('');
});

// Vérifier que les scores ne sont pas 0
const hasZeroScores = frontendResults.topRecommendations.some(rec => rec.matchingScore === 0);
console.log(`❌ Scores à 0% détectés: ${hasZeroScores ? 'OUI' : 'NON'}`);

// Vérifier que les scores sont dynamiques
const hasDynamicScores = frontendResults.topRecommendations.some(rec => rec.matchingScore > 50);
console.log(`✅ Scores dynamiques (>50%): ${hasDynamicScores ? 'OUI' : 'NON'}`);

console.log('\n🎉 Test terminé !');
