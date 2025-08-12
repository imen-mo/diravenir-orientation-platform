// Orientation Test Scoring Service
// This service handles the complete logic for the orientation test system

// Profile Pillars Definition (17 pillars in 4 categories)
export const PROFILE_PILLARS = {
  // Category 1: Interests (5 pillars)
  INTERESTS: {
    SCIENTIFIC_TECH: 'Interet_Scientifique_Tech',
    ARTISTIC_CREATIVE: 'Interet_Artistique_Creatif',
    SOCIAL_HUMAN: 'Interet_Social_Humain',
    BUSINESS_MANAGEMENT: 'Interet_Business_Gestion',
    LOGICAL_ANALYTICAL: 'Interet_Logique_Analytique'
  },
  // Category 2: Competencies (4 pillars)
  COMPETENCIES: {
    PROBLEM_SOLVING: 'Competence_Resolution_Problemes',
    COMMUNICATION: 'Competence_Communication',
    ORGANIZATION: 'Competence_Organisation',
    MANUAL_TECHNICAL: 'Competence_Manuel_Technique'
  },
  // Category 3: Values/Motivations (4 pillars)
  VALUES: {
    SOCIETAL_IMPACT: 'Valeur_Impact_Societal',
    INNOVATION_CHALLENGE: 'Valeur_Innovation_Challenge',
    STABILITY_SECURITY: 'Valeur_Stabilite_Securite',
    AUTONOMY: 'Valeur_Autonomie'
  },
  // Category 4: Work Preferences/Personality (4 pillars)
  WORK_PREFERENCES: {
    TEAM_COLLABORATION: 'Pref_Travail_Equipe_Collab',
    AUTONOMOUS_WORK: 'Pref_Travail_Autonome',
    PRACTICAL_FIELD: 'Pref_Pratique_Terrain',
    THEORY_RESEARCH: 'Pref_Theorie_Recherche'
  }
};

// All pillars array for easy iteration
export const ALL_PILLARS = [
  PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH,
  PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE,
  PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN,
  PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT,
  PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL,
  PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING,
  PROFILE_PILLARS.COMPETENCIES.COMMUNICATION,
  PROFILE_PILLARS.COMPETENCIES.ORGANIZATION,
  PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL,
  PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT,
  PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE,
  PROFILE_PILLARS.VALUES.STABILITY_SECURITY,
  PROFILE_PILLARS.VALUES.AUTONOMY,
  PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION,
  PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK,
  PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD,
  PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH
];

// Score attribution matrix for each question
export const SCORE_MATRIX = {
  question1: {
    A: { // Créer quelque chose de nouveau
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 5,
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 3,
      [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 4,
      [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 2
    },
    B: { // Comprendre comment les choses fonctionnent
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 4,
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 5,
      [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 3
    },
    C: { // Interagir et aider les autres
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 5,
      [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 5,
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4
    },
    D: { // Organiser et gérer des projets
      [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 5,
      [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 5,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 3
    },
    E: { // Exprimer ma créativité
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 5,
      [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 2,
      [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 3
    }
  },
  question2: {
    scientific: { [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3, [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 2 },
    tech: { [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3, [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 2 },
    art: { [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 3 },
    design: { [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 3 },
    personal: { [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3, [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 2 },
    social: { [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3, [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 2 },
    economic: { [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 3 },
    business: { [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 3 },
    organization: { [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 3 },
    projects: { [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 3 },
    sports: { [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 3 },
    crafts: { [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 3 }
  },
  question3: {
    A: { // Électronique
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3,
      [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 2
    },
    B: { // Livres
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 3,
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 2
    },
    C: { // Art
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 3
    },
    D: { // Jeux
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3
    },
    E: { // Mode
      [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 3,
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 2
    }
  },
  question4: {
    A: { // Décomposer
      [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 4,
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 4
    },
    B: { // Chercher faits
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3,
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 3,
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 2
    },
    C: { // Imaginer
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4,
      [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 4
    },
    D: { // Autres
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 4,
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 2
    }
  },
  question5: {
    // Drag and drop with ranking (1st = +4, 2nd = +3, 3rd = +2)
    budget: { [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 4, [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 4, [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 4 },
    event: { [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 4, [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 4, [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4 },
    writing: { [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4, [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4 },
    repair: { [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 4, [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 4 },
    drawing: { [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4, [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 4 },
    equation: { [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 4, [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 4 },
    convince: { [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4, [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 4 },
    advice: { [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 4, [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4 }
  },
  question6: {
    A: { // Lire
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 4,
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 3
    },
    B: { // Vidéo
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3
    },
    C: { // Essayer
      [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 4
    },
    D: { // Discuter
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 4
    }
  },
  question7: {
    A: { // Améliorer vie
      [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 5,
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 4
    },
    B: { // Systèmes efficaces
      [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 4,
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3
    },
    C: { // Beauté
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 5
    },
    D: { // Justice
      [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 5,
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3
    }
  },
  question8: {
    A: { // Labo
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 4,
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3
    },
    B: { // Bureau coll.
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 4,
      [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 2
    },
    C: { // Studio
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4,
      [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 3
    },
    D: { // Chantier
      [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 4,
      [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 3
    },
    E: { // Calme
      [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 2
    }
  },
  question9: {
    // Sliders (score proportional from 0 to 5)
    security: { [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 5 },
    innovation: { [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 5 },
    autonomy: { [PROFILE_PILLARS.VALUES.AUTONOMY]: 5 },
    salary: { [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 5 }
  },
  question10: {
    A: { // Comprendre
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 4,
      [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 3
    },
    B: { // Solution concrète
      [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 4,
      [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 3
    },
    C: { // Rallier gens
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 3
    },
    D: { // Techno avancée
      [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 4,
      [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 3
    }
  },
  question11: {
    A: { // Seul
      [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 5,
      [PROFILE_PILLARS.VALUES.AUTONOMY]: 4
    },
    B: { // Petite équipe
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 5
    },
    C: { // Grande structure
      [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 4,
      [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 3
    }
  },
  question12: {
    A: { // Faits
      [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 4,
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 3
    },
    B: { // Histoire
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4,
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 3
    },
    C: { // Interagir
      [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 4,
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 2
    }
  },
  question13: {
    A: { // Logique
      [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 5
    },
    B: { // Intuition
      [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 3
    },
    C: { // Avis autres
      [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 4,
      [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 3
    }
  },
  question14: {
    // Multiple selection (2-3 max)
    sciences: { [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 4, [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 4 },
    literature: { [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 3, [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 3 },
    shs: { [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 4, [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 2 },
    arts: { [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 4 },
    technology: { [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 4, [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 3 },
    management: { [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 4, [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 3 }
  }
};

// Ideal Major Profiles (sample - you can expand this)
export const IDEAL_MAJOR_PROFILES = {
  'Civil Engineering': {
    [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 90,
    [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 40,
    [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 50,
    [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 60,
    [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 90,
    [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 90,
    [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 75,
    [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 90,
    [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 85,
    [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 80,
    [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 85,
    [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 80,
    [PROFILE_PILLARS.VALUES.AUTONOMY]: 70,
    [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 80,
    [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 60,
    [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 90,
    [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 60
  },
  'Mechanical Engineering': {
    [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 95,
    [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 30,
    [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 20,
    [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 50,
    [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 95,
    [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 95,
    [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 65,
    [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 80,
    [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 90,
    [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 70,
    [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 90,
    [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 70,
    [PROFILE_PILLARS.VALUES.AUTONOMY]: 80,
    [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 75,
    [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 70,
    [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 85,
    [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 70
  },
  'Architecture': {
    [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 60,
    [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 90,
    [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 70,
    [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 50,
    [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 80,
    [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 80,
    [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 85,
    [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 85,
    [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 85,
    [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 85,
    [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 90,
    [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 60,
    [PROFILE_PILLARS.VALUES.AUTONOMY]: 80,
    [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 80,
    [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 70,
    [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 70,
    [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 60
  }
};

// Calculate user profile from answers
export const calculateUserProfile = (answers) => {
  const profile = {};
  
  // Initialize all pillars to 0
  ALL_PILLARS.forEach(pillar => {
    profile[pillar] = 0;
  });

  // Process each answer
  Object.keys(answers).forEach(questionKey => {
    const answer = answers[questionKey];
    const questionMatrix = SCORE_MATRIX[questionKey];
    
    if (!questionMatrix) return;

    if (questionKey === 'question5') {
      // Special handling for drag and drop with ranking
      answer.forEach((item, index) => {
        const rank = index + 1;
        const rankMultiplier = rank === 1 ? 4 : rank === 2 ? 3 : 2;
        const optionScores = questionMatrix[item.id];
        
        if (optionScores) {
          Object.keys(optionScores).forEach(pillar => {
            profile[pillar] += optionScores[pillar] * rankMultiplier;
          });
        }
      });
    } else if (questionKey === 'question9') {
      // Special handling for sliders
      Object.keys(answer).forEach(criteria => {
        const sliderValue = answer[criteria]; // 0-100
        const normalizedValue = (sliderValue / 100) * 5; // Convert to 0-5 scale
        const optionScores = questionMatrix[criteria];
        
        if (optionScores) {
          Object.keys(optionScores).forEach(pillar => {
            profile[pillar] += optionScores[pillar] * normalizedValue;
          });
        }
      });
    } else if (Array.isArray(answer)) {
      // Multiple selection questions
      answer.forEach(selectedOption => {
        const optionScores = questionMatrix[selectedOption];
        if (optionScores) {
          Object.keys(optionScores).forEach(pillar => {
            profile[pillar] += optionScores[pillar];
          });
        }
      });
    } else {
      // Single selection questions
      const optionScores = questionMatrix[answer];
      if (optionScores) {
        Object.keys(optionScores).forEach(pillar => {
          profile[pillar] += optionScores[pillar];
        });
      }
    }
  });

  // Normalize scores to 0-100 scale
  const maxScore = Math.max(...Object.values(profile));
  if (maxScore > 0) {
    Object.keys(profile).forEach(pillar => {
      profile[pillar] = Math.round((profile[pillar] / maxScore) * 100);
    });
  }

  return profile;
};

// Calculate matching score using Weighted Euclidean Distance
export const calculateMatchingScore = (userProfile, majorProfile) => {
  let totalWeightedDifference = 0;
  let totalWeight = 0;

  ALL_PILLARS.forEach(pillar => {
    const userScore = userProfile[pillar] || 0;
    const majorScore = majorProfile[pillar] || 0;
    const weight = majorScore; // Weight is the ideal score for that pillar
    
    const difference = Math.abs(userScore - majorScore);
    totalWeightedDifference += Math.pow(difference * weight, 2);
    totalWeight += weight;
  });

  if (totalWeight === 0) return 0;
  
  const weightedDistance = Math.sqrt(totalWeightedDifference / totalWeight);
  const matchingScore = Math.max(0, 100 - weightedDistance);
  
  return Math.round(matchingScore);
};

// Get top recommendations
export const getTopRecommendations = (userProfile, count = 3) => {
  const recommendations = Object.keys(IDEAL_MAJOR_PROFILES).map(majorName => {
    const majorProfile = IDEAL_MAJOR_PROFILES[majorName];
    const matchingScore = calculateMatchingScore(userProfile, majorProfile);
    
    return {
      majorName,
      matchingScore,
      majorProfile
    };
  });

  // Sort by matching score (highest first)
  recommendations.sort((a, b) => b.matchingScore - a.matchingScore);
  
  return recommendations.slice(0, count);
};

// Generate "Why this major is for you" text
export const generateWhyThisMajorText = (userProfile, majorProfile, majorName) => {
  const topPillars = [];
  
  // Find pillars where both user and major have high scores
  ALL_PILLARS.forEach(pillar => {
    const userScore = userProfile[pillar] || 0;
    const majorScore = majorProfile[pillar] || 0;
    
    if (userScore >= 70 && majorScore >= 70) {
      topPillars.push({ pillar, userScore, majorScore });
    }
  });
  
  // Sort by combined score
  topPillars.sort((a, b) => (b.userScore + b.majorScore) - (a.userScore + a.majorScore));
  
  if (topPillars.length === 0) {
    return `Votre profil présente une correspondance intéressante avec ${majorName}.`;
  }
  
  const topPillar = topPillars[0];
  const pillarNames = {
    [PROFILE_PILLARS.INTERESTS.SCIENTIFIC_TECH]: 'votre passion pour la science et la technologie',
    [PROFILE_PILLARS.INTERESTS.ARTISTIC_CREATIVE]: 'votre créativité artistique',
    [PROFILE_PILLARS.INTERESTS.SOCIAL_HUMAN]: 'votre intérêt pour les relations humaines',
    [PROFILE_PILLARS.INTERESTS.BUSINESS_MANAGEMENT]: 'votre sens des affaires et de la gestion',
    [PROFILE_PILLARS.INTERESTS.LOGICAL_ANALYTICAL]: 'votre esprit logique et analytique',
    [PROFILE_PILLARS.COMPETENCIES.PROBLEM_SOLVING]: 'votre capacité à résoudre des problèmes',
    [PROFILE_PILLARS.COMPETENCIES.COMMUNICATION]: 'vos compétences en communication',
    [PROFILE_PILLARS.COMPETENCIES.ORGANIZATION]: 'votre sens de l\'organisation',
    [PROFILE_PILLARS.COMPETENCIES.MANUAL_TECHNICAL]: 'vos compétences techniques et manuelles',
    [PROFILE_PILLARS.VALUES.SOCIETAL_IMPACT]: 'votre désir d\'avoir un impact sociétal',
    [PROFILE_PILLARS.VALUES.INNOVATION_CHALLENGE]: 'votre goût pour l\'innovation et les défis',
    [PROFILE_PILLARS.VALUES.STABILITY_SECURITY]: 'votre recherche de stabilité et de sécurité',
    [PROFILE_PILLARS.VALUES.AUTONOMY]: 'votre besoin d\'autonomie',
    [PROFILE_PILLARS.WORK_PREFERENCES.TEAM_COLLABORATION]: 'votre préférence pour le travail en équipe',
    [PROFILE_PILLARS.WORK_PREFERENCES.AUTONOMOUS_WORK]: 'votre capacité à travailler en autonomie',
    [PROFILE_PILLARS.WORK_PREFERENCES.PRACTICAL_FIELD]: 'votre goût pour le travail pratique',
    [PROFILE_PILLARS.WORK_PREFERENCES.THEORY_RESEARCH]: 'votre intérêt pour la théorie et la recherche'
  };
  
  const pillarName = pillarNames[topPillar.pillar];
  
  return `Vos fortes compétences en ${pillarName} et votre profil correspondant font de vous un candidat idéal pour ${majorName}.`;
};

// Get all answers from localStorage
export const getAllAnswers = () => {
  const answers = {};
  for (let i = 1; i <= 14; i++) {
    const key = `question${i}`;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        answers[key] = JSON.parse(value);
      } catch {
        answers[key] = value;
      }
    }
  }
  return answers;
};
