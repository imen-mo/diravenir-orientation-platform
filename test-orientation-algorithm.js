// Test de l'Algorithme d'Orientation Diravenir
// Ce fichier simule le comportement du backend pour tester la logique

console.log("🧪 Test de l'Algorithme d'Orientation Diravenir");
console.log("=" .repeat(60));

// Profils idéaux des majeures (scores sur 100)
const IDEAL_PROFILES = {
    "Civil Engineering": {
        "Interet_Scientifique_Tech": 90, "Interet_Artistique_Creatif": 40, "Interet_Social_Humain": 50,
        "Interet_Business_Gestion": 60, "Interet_Logique_Analytique": 90, "Competence_Resolution_Problemes": 90,
        "Competence_Communication": 75, "Competence_Organisation": 90, "Competence_Manuel_Technique": 85,
        "Valeur_Impact_Societal": 80, "Valeur_Innovation_Challenge": 85, "Valeur_Stabilite_Securite": 80,
        "Valeur_Autonomie": 70, "Pref_Travail_Equipe_Collab": 80, "Pref_Travail_Autonome": 60,
        "Pref_Pratique_Terrain": 90, "Pref_Theorie_Recherche": 60
    },
    "Mechanical Engineering": {
        "Interet_Scientifique_Tech": 95, "Interet_Artistique_Creatif": 30, "Interet_Social_Humain": 20,
        "Interet_Business_Gestion": 50, "Interet_Logique_Analytique": 95, "Competence_Resolution_Problemes": 95,
        "Competence_Communication": 65, "Competence_Organisation": 80, "Competence_Manuel_Technique": 90,
        "Valeur_Impact_Societal": 70, "Valeur_Innovation_Challenge": 90, "Valeur_Stabilite_Securite": 70,
        "Valeur_Autonomie": 80, "Pref_Travail_Equipe_Collab": 75, "Pref_Travail_Autonome": 70,
        "Pref_Pratique_Terrain": 85, "Pref_Theorie_Recherche": 70
    },
    "Architecture": {
        "Interet_Scientifique_Tech": 60, "Interet_Artistique_Creatif": 90, "Interet_Social_Humain": 70,
        "Interet_Business_Gestion": 50, "Interet_Logique_Analytique": 80, "Competence_Resolution_Problemes": 80,
        "Competence_Communication": 85, "Competence_Organisation": 85, "Competence_Manuel_Technique": 85,
        "Valeur_Impact_Societal": 85, "Valeur_Innovation_Challenge": 90, "Valeur_Stabilite_Securite": 60,
        "Valeur_Autonomie": 80, "Pref_Travail_Equipe_Collab": 80, "Pref_Travail_Autonome": 70,
        "Pref_Pratique_Terrain": 70, "Pref_Theorie_Recherche": 60
    },
    "Computer Science": {
        "Interet_Scientifique_Tech": 95, "Interet_Artistique_Creatif": 40, "Interet_Social_Humain": 30,
        "Interet_Business_Gestion": 60, "Interet_Logique_Analytique": 95, "Competence_Resolution_Problemes": 95,
        "Competence_Communication": 70, "Competence_Organisation": 75, "Competence_Manuel_Technique": 60,
        "Valeur_Impact_Societal": 65, "Valeur_Innovation_Challenge": 95, "Valeur_Stabilite_Securite": 70,
        "Valeur_Autonomie": 85, "Pref_Travail_Equipe_Collab": 70, "Pref_Travail_Autonome": 80,
        "Pref_Pratique_Terrain": 75, "Pref_Theorie_Recherche": 80
    }
};

// Simulation des réponses d'un utilisateur (exemple : profil technique)
const userResponses = {
    question1: "B", // Comprendre comment les choses fonctionnent
    question2: ["Découvertes scientifiques, Technologie et innovation", "Technologie et informatique"],
    question3: "A", // Rayons d'électronique
    question4: "A", // Décomposer en étapes logiques
    question5: ["Résoudre une équation complexe", "Réparer un appareil", "Gérer un budget"],
    question6: "A", // Lire et prendre des notes
    question7: "B", // Créer des systèmes efficaces
    question8: "A", // Laboratoire
    question9: { "Innovation": 90, "Autonomie": 80, "Sécurité": 60, "Salaire": 70 },
    question10: "A", // Comprendre la racine du problème
    question11: "A", // Seul sur un projet
    question12: "A", // Préparer méticuleusement
    question13: "A", // Logique et analyse
    question14: ["Sciences", "Technologie et Informatique"]
};

// Fonction de calcul du profil utilisateur
function calculateUserProfile(responses) {
    const profile = {
        interetScientifiqueTech: 0,
        interetArtistiqueCreatif: 0,
        interetSocialHumain: 0,
        interetBusinessGestion: 0,
        interetLogiqueAnalytique: 0,
        competenceResolutionProblemes: 0,
        competenceCommunication: 0,
        competenceOrganisation: 0,
        competenceManuelTechnique: 0,
        valeurImpactSocietal: 0,
        valeurInnovationChallenge: 0,
        valeurStabiliteSecurite: 0,
        valeurAutonomie: 0,
        prefTravailEquipeCollab: 0,
        prefTravailAutonome: 0,
        prefPratiqueTerrain: 0,
        prefTheorieRecherche: 0
    };

    // Question 1
    if (responses.question1 === "B") {
        profile.interetScientifiqueTech += 4;
        profile.interetLogiqueAnalytique += 5;
        profile.competenceResolutionProblemes += 4;
        profile.prefTheorieRecherche += 3;
    }

    // Question 2
    responses.question2.forEach(choice => {
        if (choice.includes("Découvertes scientifiques") || choice.includes("Technologie")) {
            profile.interetScientifiqueTech += 3;
            profile.valeurInnovationChallenge += 2;
        }
        if (choice.includes("Technologie et informatique")) {
            profile.interetScientifiqueTech += 3;
            profile.interetLogiqueAnalytique += 3;
        }
    });

    // Question 3
    if (responses.question3 === "A") {
        profile.interetScientifiqueTech += 3;
        profile.competenceManuelTechnique += 2;
    }

    // Question 4
    if (responses.question4 === "A") {
        profile.competenceResolutionProblemes += 4;
        profile.interetLogiqueAnalytique += 4;
    }

    // Question 5 (drag & drop)
    responses.question5.forEach((choice, index) => {
        const points = 4 - index; // 1er choix = 4 points, 2e = 3, 3e = 2
        
        if (choice.includes("équation")) {
            profile.interetLogiqueAnalytique += points;
            profile.interetScientifiqueTech += points;
        }
        if (choice.includes("Réparer")) {
            profile.competenceManuelTechnique += points;
            profile.interetScientifiqueTech += points;
        }
        if (choice.includes("budget")) {
            profile.interetBusinessGestion += points;
            profile.competenceOrganisation += points;
        }
    });

    // Question 6
    if (responses.question6 === "A") {
        profile.prefTheorieRecherche += 4;
        profile.interetLogiqueAnalytique += 3;
    }

    // Question 7
    if (responses.question7 === "B") {
        profile.valeurInnovationChallenge += 4;
        profile.interetScientifiqueTech += 3;
    }

    // Question 8
    if (responses.question8 === "A") {
        profile.prefTheorieRecherche += 4;
        profile.interetScientifiqueTech += 3;
    }

    // Question 9 (sliders)
    if (responses.question9.Innovation) {
        profile.valeurInnovationChallenge += Math.floor(responses.question9.Innovation / 20);
    }
    if (responses.question9.Autonomie) {
        profile.valeurAutonomie += Math.floor(responses.question9.Autonomie / 20);
    }

    // Question 10
    if (responses.question10 === "A") {
        profile.interetLogiqueAnalytique += 4;
        profile.competenceResolutionProblemes += 3;
    }

    // Question 11
    if (responses.question11 === "A") {
        profile.prefTravailAutonome += 5;
        profile.valeurAutonomie += 4;
    }

    // Question 12
    if (responses.question12 === "A") {
        profile.competenceOrganisation += 4;
        profile.interetLogiqueAnalytique += 3;
    }

    // Question 13
    if (responses.question13 === "A") {
        profile.interetLogiqueAnalytique += 5;
    }

    // Question 14
    responses.question14.forEach(choice => {
        if (choice === "Sciences") {
            profile.interetScientifiqueTech += 4;
            profile.interetLogiqueAnalytique += 4;
        }
        if (choice === "Technologie et Informatique") {
            profile.interetScientifiqueTech += 4;
            profile.interetLogiqueAnalytique += 3;
        }
    });

    return profile;
}

// Fonction de normalisation des scores
function normalizeProfile(profile) {
    const maxScore = Math.max(...Object.values(profile));
    
    if (maxScore > 0) {
        Object.keys(profile).forEach(key => {
            profile[key] = Math.round((profile[key] * 100) / maxScore);
        });
    }
    
    return profile;
}

// Fonction de calcul du score de matching euclidien
function calculateEuclideanMatchingScore(userProfile, idealProfile) {
    let totalWeightedDifference = 0;
    let totalWeight = 0;

    // Mapper les piliers utilisateur vers les piliers idéaux
    const userPillars = {
        "Interet_Scientifique_Tech": userProfile.interetScientifiqueTech,
        "Interet_Artistique_Creatif": userProfile.interetArtistiqueCreatif,
        "Interet_Social_Humain": userProfile.interetSocialHumain,
        "Interet_Business_Gestion": userProfile.interetBusinessGestion,
        "Interet_Logique_Analytique": userProfile.interetLogiqueAnalytique,
        "Competence_Resolution_Problemes": userProfile.competenceResolutionProblemes,
        "Competence_Communication": userProfile.competenceCommunication,
        "Competence_Organisation": userProfile.competenceOrganisation,
        "Competence_Manuel_Technique": userProfile.competenceManuelTechnique,
        "Valeur_Impact_Societal": userProfile.valeurImpactSocietal,
        "Valeur_Innovation_Challenge": userProfile.valeurInnovationChallenge,
        "Valeur_Stabilite_Securite": userProfile.valeurStabiliteSecurite,
        "Valeur_Autonomie": userProfile.valeurAutonomie,
        "Pref_Travail_Equipe_Collab": userProfile.prefTravailEquipeCollab,
        "Pref_Travail_Autonome": userProfile.prefTravailAutonome,
        "Pref_Pratique_Terrain": userProfile.prefPratiqueTerrain,
        "Pref_Theorie_Recherche": userProfile.prefTheorieRecherche
    };

    for (const [pillarName, idealScore] of Object.entries(idealProfile)) {
        const userScore = userPillars[pillarName] || 0;
        const difference = Math.abs(userScore - idealScore);
        
        // Normaliser la différence sur 100 pour éviter les scores trop bas
        const normalizedDifference = (difference / 100) * 100;
        
        // Poids = score idéal du pilier
        const weight = idealScore;
        
        // Différence pondérée au carré
        totalWeightedDifference += Math.pow(normalizedDifference * (weight / 100), 2);
        totalWeight += weight / 100;
    }

    // Score de matching = 100 - racine carrée de la moyenne des différences pondérées
    const matchingScore = 100 - Math.sqrt(totalWeightedDifference / totalWeight);
    
    // S'assurer que le score est entre 0 et 100
    return Math.max(0, Math.min(100, Math.round(matchingScore)));
}

// Test principal
function testOrientationAlgorithm() {
    console.log("📝 Réponses de l'utilisateur:");
    console.log(JSON.stringify(userResponses, null, 2));
    console.log();

    // 1. Calculer le profil utilisateur
    console.log("🔢 Calcul du profil utilisateur...");
    const userProfile = calculateUserProfile(userResponses);
    console.log("Profil brut:", userProfile);
    console.log();

    // 2. Normaliser les scores
    console.log("📊 Normalisation des scores sur 100...");
    const normalizedProfile = normalizeProfile(userProfile);
    console.log("Profil normalisé:", normalizedProfile);
    console.log();

    // 3. Calculer les recommandations
    console.log("🎯 Calcul des recommandations...");
    const recommendations = [];
    
    for (const [majorName, idealProfile] of Object.entries(IDEAL_PROFILES)) {
        const matchingScore = calculateEuclideanMatchingScore(normalizedProfile, idealProfile);
        recommendations.push({
            major: majorName,
            score: matchingScore
        });
    }

    // Trier par score décroissant
    recommendations.sort((a, b) => b.score - a.score);

    console.log("🏆 Top 3 recommandations:");
    recommendations.slice(0, 3).forEach((rec, index) => {
        console.log(`${index + 1}. ${rec.major}: ${rec.score}%`);
    });
    console.log();

    // 4. Analyse détaillée
    console.log("📈 Analyse détaillée du profil:");
    Object.entries(normalizedProfile).forEach(([pillar, score]) => {
        const emoji = score > 70 ? "🟢" : score > 40 ? "🟡" : "🔴";
        console.log(`${emoji} ${pillar}: ${score}/100`);
    });
}

// Exécuter le test
testOrientationAlgorithm();
