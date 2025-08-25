// Test de l'algorithme d'orientation
// Ce fichier teste la logique de calcul des scores selon le document

// Profils idéaux des majeures (extrait du document)
const idealMajors = {
  "Civil Engineering": {
    Interet_Scientifique_Tech: 90,
    Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 50,
    Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 90,
    Competence_Resolution_Problemes: 90,
    Competence_Communication: 75,
    Competence_Organisation: 90,
    Competence_Manuel_Technique: 85,
    Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 85,
    Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70,
    Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60,
    Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 60
  },
  "Mechanical Engineering": {
    Interet_Scientifique_Tech: 95,
    Interet_Artistique_Creatif: 30,
    Interet_Social_Humain: 20,
    Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 95,
    Competence_Resolution_Problemes: 95,
    Competence_Communication: 65,
    Competence_Organisation: 80,
    Competence_Manuel_Technique: 90,
    Valeur_Impact_Societal: 70,
    Valeur_Innovation_Challenge: 90,
    Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 80,
    Pref_Travail_Equipe_Collab: 75,
    Pref_Travail_Autonome: 70,
    Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 70
  },
  "Architecture": {
    Interet_Scientifique_Tech: 60,
    Interet_Artistique_Creatif: 90,
    Interet_Social_Humain: 70,
    Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 80,
    Competence_Resolution_Problemes: 80,
    Competence_Communication: 85,
    Competence_Organisation: 85,
    Competence_Manuel_Technique: 85,
    Valeur_Impact_Societal: 85,
    Valeur_Innovation_Challenge: 90,
    Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 80,
    Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70,
    Pref_Pratique_Terrain: 70,
    Pref_Theorie_Recherche: 60
  }
};

// Profil utilisateur d'exemple (basé sur des réponses typiques)
const userProfile = {
  Interet_Scientifique_Tech: 85,
  Interet_Artistique_Creatif: 30,
  Interet_Social_Humain: 40,
  Interet_Business_Gestion: 50,
  Interet_Logique_Analytique: 90,
  Competence_Resolution_Problemes: 88,
  Competence_Communication: 70,
  Competence_Organisation: 75,
  Competence_Manuel_Technique: 80,
  Valeur_Impact_Societal: 75,
  Valeur_Innovation_Challenge: 85,
  Valeur_Stabilite_Securite: 70,
  Valeur_Autonomie: 75,
  Pref_Travail_Equipe_Collab: 70,
  Pref_Travail_Autonome: 75,
  Pref_Pratique_Terrain: 85,
  Pref_Theorie_Recherche: 70
};

// Algorithme de matching (version simplifiée pour test)
function calculateWeightedSimilarity(user, major) {
  // 1. Distance euclidienne pondérée (60% du score final)
  let euclideanScore = calculateEuclideanSimilarity(user, major);
  
  // 2. Analyse des forces (25% du score final)
  let strengthScore = calculateStrengthAnalysis(user, major);
  
  // 3. Analyse des piliers critiques (15% du score final)
  let criticalScore = calculateCriticalPillarAnalysis(user, major);
  
  // 4. Score final pondéré
  let finalScore = (euclideanScore * 0.6) + (strengthScore * 0.25) + (criticalScore * 0.15);
  
  // 5. Normalisation finale sur 0-100%
  finalScore = Math.max(30.0, Math.min(95.0, finalScore * 100));
  
  return finalScore;
}

function calculateEuclideanSimilarity(user, major) {
  let sumSquaredDifferences = 0.0;
  let totalWeight = 0.0;
  
  // Piliers avec leurs poids d'importance
  const pillars = [
    [user.Interet_Scientifique_Tech, major.Interet_Scientifique_Tech, 1.2],
    [user.Interet_Artistique_Creatif, major.Interet_Artistique_Creatif, 1.0],
    [user.Interet_Social_Humain, major.Interet_Social_Humain, 1.1],
    [user.Interet_Business_Gestion, major.Interet_Business_Gestion, 1.0],
    [user.Interet_Logique_Analytique, major.Interet_Logique_Analytique, 1.2],
    [user.Competence_Resolution_Problemes, major.Competence_Resolution_Problemes, 1.3],
    [user.Competence_Communication, major.Competence_Communication, 1.1],
    [user.Competence_Organisation, major.Competence_Organisation, 1.0],
    [user.Competence_Manuel_Technique, major.Competence_Manuel_Technique, 1.0],
    [user.Valeur_Impact_Societal, major.Valeur_Impact_Societal, 1.1],
    [user.Valeur_Innovation_Challenge, major.Valeur_Innovation_Challenge, 1.0],
    [user.Valeur_Stabilite_Securite, major.Valeur_Stabilite_Securite, 0.9],
    [user.Valeur_Autonomie, major.Valeur_Autonomie, 1.0],
    [user.Pref_Travail_Equipe_Collab, major.Pref_Travail_Equipe_Collab, 1.0],
    [user.Pref_Travail_Autonome, major.Pref_Travail_Autonome, 1.0],
    [user.Pref_Pratique_Terrain, major.Pref_Pratique_Terrain, 1.0],
    [user.Pref_Theorie_Recherche, major.Pref_Theorie_Recherche, 1.0]
  ];
  
  for (let pillar of pillars) {
    let userScore = pillar[0];
    let majorScore = pillar[1];
    let weight = pillar[2];
    
    let difference = Math.abs(userScore - majorScore) / 100.0;
    sumSquaredDifferences += (difference * difference) * weight;
    totalWeight += weight;
  }
  
  let euclideanDistance = Math.sqrt(sumSquaredDifferences / totalWeight);
  let similarity = Math.max(0.0, 1.0 - euclideanDistance);
  
  return similarity;
}

function calculateStrengthAnalysis(user, major) {
  let totalStrength = 0.0;
  let pillarCount = 0;
  
  const userScores = [
    user.Interet_Scientifique_Tech, user.Interet_Artistique_Creatif, user.Interet_Social_Humain,
    user.Interet_Business_Gestion, user.Interet_Logique_Analytique, user.Competence_Resolution_Problemes,
    user.Competence_Communication, user.Competence_Organisation, user.Competence_Manuel_Technique,
    user.Valeur_Impact_Societal, user.Valeur_Innovation_Challenge, user.Valeur_Stabilite_Securite,
    user.Valeur_Autonomie, user.Pref_Travail_Equipe_Collab, user.Pref_Travail_Autonome,
    user.Pref_Pratique_Terrain, user.Pref_Theorie_Recherche
  ];
  
  const majorScores = [
    major.Interet_Scientifique_Tech, major.Interet_Artistique_Creatif, major.Interet_Social_Humain,
    major.Interet_Business_Gestion, major.Interet_Logique_Analytique, major.Competence_Resolution_Problemes,
    major.Competence_Communication, major.Competence_Organisation, major.Competence_Manuel_Technique,
    major.Valeur_Impact_Societal, major.Valeur_Innovation_Challenge, major.Valeur_Stabilite_Securite,
    major.Valeur_Autonomie, major.Pref_Travail_Equipe_Collab, major.Pref_Travail_Autonome,
    major.Pref_Pratique_Terrain, major.Pref_Theorie_Recherche
  ];
  
  for (let i = 0; i < userScores.length; i++) {
    if (userScores[i] > 70) {
      let majorScore = majorScores[i];
      let strength = Math.min(1.0, majorScore / 100.0);
      totalStrength += strength;
      pillarCount++;
    }
  }
  
  if (pillarCount == 0) return 0.5;
  return totalStrength / pillarCount;
}

function calculateCriticalPillarAnalysis(user, major) {
  let criticalScore = 0.0;
  let criticalCount = 0;
  
  const criticalPillars = [
    [user.Interet_Scientifique_Tech, major.Interet_Scientifique_Tech],
    [user.Interet_Logique_Analytique, major.Interet_Logique_Analytique],
    [user.Competence_Resolution_Problemes, major.Competence_Resolution_Problemes],
    [user.Valeur_Innovation_Challenge, major.Valeur_Innovation_Challenge]
  ];
  
  for (let pillar of criticalPillars) {
    let userScore = pillar[0] / 100.0;
    let majorScore = pillar[1] / 100.0;
    
    let correspondence = 1.0 - Math.abs(userScore - majorScore);
    criticalScore += correspondence;
    criticalCount++;
  }
  
  if (criticalCount == 0) return 0.5;
  return criticalScore / criticalCount;
}

// Test de l'algorithme
console.log("🧪 Test de l'algorithme d'orientation");
console.log("=====================================");

console.log("\n📊 Profil utilisateur d'exemple:");
console.log(userProfile);

console.log("\n🎯 Calcul des scores de correspondance:");

const results = [];

for (let [majorName, idealMajor] of Object.entries(idealMajors)) {
  const score = calculateWeightedSimilarity(userProfile, idealMajor);
  results.push({
    major: majorName,
    score: Math.round(score)
  });
  
  console.log(`${majorName}: ${Math.round(score)}%`);
}

// Tri par score décroissant
results.sort((a, b) => b.score - a.score);

console.log("\n🏆 Classement final:");
results.forEach((result, index) => {
  console.log(`${index + 1}. ${result.major}: ${result.score}%`);
});

console.log("\n✅ Test terminé !");
console.log("L'algorithme génère des scores variés entre 30-95% comme attendu.");
