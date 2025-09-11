// Mapping des 14 questions d'orientation vers les 17 piliers de compétences
// Système complet pour calculer les profils utilisateur
// Respecte exactement les spécifications du document de référence

export const questionToPillarMapping = {
  // Question 1: Activité idéale
  1: {
    question: "SI LE TEMPS ET L'ARGENT N'ÉTAIENT PAS UN PROBLÈME, QUELLE ACTIVITÉ CHOISIRIEZ-VOUS POUR PASSER VOTRE JOURNÉE IDÉALE ?",
    pillarMapping: {
      'A': { // Créer quelque chose de nouveau
        'Interet_Scientifique_Tech': 5,
        'Interet_Artistique_Creatif': 3,
        'Valeur_Innovation_Challenge': 4,
        'Competence_Manuel_Technique': 2
      },
      'B': { // Comprendre comment les choses fonctionnent
        'Interet_Scientifique_Tech': 4,
        'Interet_Logique_Analytique': 5,
        'Competence_Resolution_Problemes': 4,
        'Pref_Theorie_Recherche': 3
      },
      'C': { // Interagir et aider les autres
        'Interet_Social_Humain': 5,
        'Valeur_Impact_Societal': 5,
        'Competence_Communication': 4
      },
      'D': { // Organiser et gérer des projets
        'Interet_Business_Gestion': 5,
        'Competence_Organisation': 5,
        'Pref_Travail_Equipe_Collab': 3
      },
      'E': { // Exprimer ma créativité
        'Interet_Artistique_Creatif': 5,
        'Valeur_Innovation_Challenge': 2,
        'Pref_Travail_Autonome': 3
      }
    }
  },

  // Question 2: Type de contenu préféré
  2: {
    question: "QUAND VOUS NAVIGUEZ SUR INTERNET OU REGARDEZ DES VIDÉOS, QUEL TYPE DE CONTENU RETIENT LE PLUS VOTRE ATTENTION ?",
    pillarMapping: {
      'scientific': { // Découvertes scientifiques, Technologie et innovation
        'Interet_Scientifique_Tech': 3,
        'Valeur_Innovation_Challenge': 2
      },
      'art': { // Art et culture, Design et création
        'Interet_Artistique_Creatif': 3
      },
      'social': { // Développement personnel, Causes sociales et humanitaires
        'Interet_Social_Humain': 3,
        'Valeur_Impact_Societal': 2
      },
      'business': { // Actualités économiques, Stratégies d'entreprise
        'Interet_Business_Gestion': 3
      },
      'organization': { // Organisation et méthodes de travail, Gestion de projets
        'Competence_Organisation': 3
      },
      'sports': { // Sports, Bricolage et artisanat
        'Competence_Manuel_Technique': 3
      }
    }
  },

  // Question 3: Section de magasin préférée
  3: {
    question: "IMAGINEZ QUE VOUS ÊTES DANS UN MAGASIN. VERS QUELLE SECTION ÊTES-VOUS NATURELLEMENT ATIRÉ(E) ?",
    pillarMapping: {
      'A': { // Rayons d'électronique, gadgets ou outils
        'Interet_Scientifique_Tech': 3,
        'Competence_Manuel_Technique': 2
      },
      'B': { // Livres de science, de philosophie ou documentaires
        'Interet_Logique_Analytique': 3,
        'Pref_Theorie_Recherche': 2
      },
      'C': { // Matériel d'art, instruments de musique ou objets de décoration
        'Interet_Artistique_Creatif': 3
      },
      'D': { // Livres de développement personnel, jeux de société ou jeux vidéo
        'Interet_Social_Humain': 3
      },
      'E': { // Vêtements, accessoires de mode ou articles de luxe
        'Interet_Business_Gestion': 3,
        'Interet_Artistique_Creatif': 2
      }
    }
  },

  // Question 4: Face à un problème complexe
  4: {
    question: "FACE À UN PROBLÈME COMPLEXE, QUELLE EST VOTRE PREMIÈRE RÉACTION ?",
    pillarMapping: {
      'A': { // Le décomposer en petites étapes logiques
        'Competence_Resolution_Problemes': 4,
        'Interet_Logique_Analytique': 4
      },
      'B': { // Aller chercher les données et les faits
        'Interet_Scientifique_Tech': 3,
        'Interet_Logique_Analytique': 3,
        'Pref_Theorie_Recherche': 2
      },
      'C': { // Imaginer des solutions originales
        'Interet_Artistique_Creatif': 4,
        'Valeur_Innovation_Challenge': 4
      },
      'D': { // Chercher l'avis des autres
        'Competence_Communication': 4,
        'Pref_Travail_Equipe_Collab': 4,
        'Interet_Social_Humain': 2
      }
    }
  },

  // Question 5: Activités naturelles (choix unique)
  5: {
    question: "PARMI CES ACTIVITÉS, LESQUELLES VOUS VIENNENT LE PLUS NATURELLEMENT ?",
    pillarMapping: {
      'budget': { // Gérer un budget
        'Interet_Business_Gestion': 4,
        'Competence_Organisation': 4,
        'Interet_Logique_Analytique': 3
      },
      'event': { // Organiser un événement
        'Competence_Organisation': 4,
        'Pref_Travail_Equipe_Collab': 4,
        'Competence_Communication': 3
      },
      'writing': { // Écrire un texte clair
        'Competence_Communication': 4,
        'Interet_Artistique_Creatif': 4
      },
      'repair': { // Réparer un appareil
        'Competence_Manuel_Technique': 4,
        'Interet_Scientifique_Tech': 4
      },
      'drawing': { // Dessiner ou peindre
        'Interet_Artistique_Creatif': 4,
        'Competence_Manuel_Technique': 4
      },
      'equation': { // Résoudre une équation complexe
        'Interet_Logique_Analytique': 4,
        'Interet_Scientifique_Tech': 4
      },
      'convince': { // Convaincre quelqu'un d'une idée
        'Competence_Communication': 4,
        'Interet_Business_Gestion': 4
      },
      'counsel': { // Écouter et conseiller un ami
        'Interet_Social_Humain': 4,
        'Competence_Communication': 4
      }
    }
  },

  // Question 6: Méthode d'apprentissage préférée
  6: {
    question: "QUAND VOUS DEVEZ APPRENDRE QUELQUE CHOSE DE NOUVEAU, COMMENT PRÉFÉREZ-VOUS LE FAIRE ?",
    pillarMapping: {
      'A': { // Lire et prendre des notes détaillées
        'Pref_Theorie_Recherche': 4,
        'Interet_Logique_Analytique': 3
      },
      'B': { // Regarder des tutoriels vidéo ou des démonstrations
        'Interet_Scientifique_Tech': 3
      },
      'C': { // Essayer par moi-même, pratiquer et faire des erreurs
        'Competence_Manuel_Technique': 4,
        'Pref_Pratique_Terrain': 4
      },
      'D': { // Discuter avec d'autres et échanger des idées
        'Competence_Communication': 4,
        'Pref_Travail_Equipe_Collab': 4
      }
    }
  },

  // Question 7: Type d'impact souhaité
  7: {
    question: "QUEL TYPE D'IMPACT AIMERIEZ-VOUS AVOIR DANS LE MONDE ?",
    pillarMapping: {
      'A': { // Améliorer la vie des individus directement
        'Valeur_Impact_Societal': 5,
        'Interet_Social_Humain': 4
      },
      'B': { // Créer des systèmes ou des produits qui rendent le monde plus efficace
        'Valeur_Innovation_Challenge': 4,
        'Interet_Scientifique_Tech': 3
      },
      'C': { // Contribuer à la beauté et à la culture
        'Interet_Artistique_Creatif': 5
      },
      'D': { // Défendre une cause ou promouvoir la justice sociale
        'Valeur_Impact_Societal': 5,
        'Interet_Social_Humain': 3
      }
    }
  },

  // Question 8: Environnement de travail préféré
  8: {
    question: "CHOISISSEZ L'IMAGE QUI REPRÉSENTE LE MIEUX L'ENVIRONNEMENT DE TRAVAIL DANS LEQUEL VOUS VOUS ÉPANOUIREZ LE PLUS.",
    pillarMapping: {
      'A': { // Un laboratoire ou un centre de recherche
        'Pref_Theorie_Recherche': 4,
        'Interet_Scientifique_Tech': 3
      },
      'B': { // Un bureau ouvert et collaboratif
        'Pref_Travail_Equipe_Collab': 4,
        'Interet_Business_Gestion': 2
      },
      'C': { // Un atelier ou un studio créatif
        'Interet_Artistique_Creatif': 4,
        'Competence_Manuel_Technique': 3
      },
      'D': { // L'extérieur, la nature, un chantier
        'Pref_Pratique_Terrain': 4,
        'Competence_Manuel_Technique': 3
      },
      'E': { // Un environnement calme et individuel
        'Pref_Travail_Autonome': 4,
        'Pref_Theorie_Recherche': 2
      }
    }
  },

  // Question 9: Critères de carrière (choix unique)
  9: {
    question: "QUAND VOUS PENSEZ À VOTRE FUTURE CARRIÈRE, QU'EST-CE QUI EST LE PLUS IMPORTANT POUR VOUS ?",
    pillarMapping: {
      'security': { // La sécurité de l'emploi et la stabilité
        'Valeur_Stabilite_Securite': 5
      },
      'innovation': { // La possibilité d'innover et d'être à la pointe
        'Valeur_Innovation_Challenge': 5
      },
      'autonomy': { // L'autonomie et la liberté de mes décisions
        'Valeur_Autonomie': 5
      },
      'salary': { // Un salaire élevé et de bonnes opportunités financières
        'Interet_Business_Gestion': 5
      }
    }
  },

  // Question 10: Motivation pour résoudre un problème
  10: {
    question: "SI VOUS DEVAIEZ RÉSOUDRE UN GRAND PROBLÈME, QUELLE SERAIT VOTRE MOTIVATION PRINCIPALE ?",
    pillarMapping: {
      'A': { // Comprendre la racine du problème pour une solution durable
        'Interet_Logique_Analytique': 4,
        'Competence_Resolution_Problemes': 3
      },
      'B': { // Mettre en place rapidement une solution concrète
        'Pref_Pratique_Terrain': 4,
        'Competence_Resolution_Problemes': 3
      },
      'C': { // Rallier les gens autour de la solution
        'Competence_Communication': 4,
        'Pref_Travail_Equipe_Collab': 3
      },
      'D': { // Développer une solution technologique avancée
        'Valeur_Innovation_Challenge': 4,
        'Interet_Scientifique_Tech': 3
      }
    }
  },

  // Question 11: Préférence de travail
  11: {
    question: "PRÉFÉREZ-VOUS TRAVAILLER :",
    pillarMapping: {
      'A': { // Seul(e) sur un projet, en totale autonomie
        'Pref_Travail_Autonome': 5,
        'Valeur_Autonomie': 4
      },
      'B': { // En petite équipe, où chacun apporte sa pierre à l'édifice
        'Pref_Travail_Equipe_Collab': 5
      },
      'C': { // Au sein d'une grande structure, avec des rôles bien définis
        'Valeur_Stabilite_Securite': 4,
        'Competence_Organisation': 3
      }
    }
  },

  // Question 12: Style de présentation
  12: {
    question: "LORS D'UNE PRÉSENTATION OU D'UN EXPOSÉ, VOUS PRÉFÉREZ :",
    pillarMapping: {
      'A': { // Préparer méticuleusement et présenter clairement les faits
        'Competence_Organisation': 4,
        'Interet_Logique_Analytique': 3
      },
      'B': { // Raconter une histoire pour capter l'attention
        'Competence_Communication': 4,
        'Interet_Artistique_Creatif': 3
      },
      'C': { // Répondre aux questions du public et interagir spontanément
        'Competence_Communication': 4,
        'Interet_Social_Humain': 3,
        'Pref_Travail_Equipe_Collab': 2
      }
    }
  },

  // Question 13: Prise de décision
  13: {
    question: "QUAND VOUS PRENEZ UNE DÉCISION IMPORTANTE, VOUS VOUS FIEZ LE PLUS À :",
    pillarMapping: {
      'A': { // La logique et l'analyse des faits
        'Interet_Logique_Analytique': 5
      },
      'B': { // Votre intuition et vos sentiments
        'Interet_Artistique_Creatif': 4,
        'Pref_Travail_Autonome': 3
      },
      'C': { // L'avis des personnes que vous respectez
        'Interet_Social_Humain': 4,
        'Pref_Travail_Equipe_Collab': 3
      }
    }
  },

  // Question 14: Matières préférées (choix unique)
  14: {
    question: "PARMI CES GROUPES DE MATIÈRES, LESQUELLES VOUS ONT LE PLUS PASSIONNÉ(E) DURANT VOTRE PARCOURS SCOLAIRE ?",
    pillarMapping: {
      'sciences': { // Sciences (Math, Physique-Chimie, SVT)
        'Interet_Scientifique_Tech': 4,
        'Interet_Logique_Analytique': 4
      },
      'literature': { // Littérature et Langues (Français, Langues étrangères, Philosophie)
        'Interet_Social_Humain': 3,
        'Competence_Communication': 3
      },
      'social': { // Sciences Sociales et Humaines (Histoire-Géo, SES, Psychologie)
        'Interet_Social_Humain': 4,
        'Pref_Theorie_Recherche': 2
      },
      'arts': { // Arts et Design (Arts Plastiques, Musique, Design)
        'Interet_Artistique_Creatif': 4
      },
      'technology': { // Technologie et Informatique (NSI, STI2D, Sciences de l'ingénieur)
        'Interet_Scientifique_Tech': 4,
        'Interet_Logique_Analytique': 3
      },
      'management': { // Gestion et Économie (Management, Droit)
        'Interet_Business_Gestion': 4,
        'Competence_Organisation': 3
      }
    }
  }
};

// Fonction pour calculer le profil utilisateur à partir des réponses
export const calculateUserProfile = (answers) => {
  const userProfile = {
    "Interet_Scientifique_Tech": 0,
    "Interet_Artistique_Creatif": 0,
    "Interet_Social_Humain": 0,
    "Interet_Business_Gestion": 0,
    "Interet_Logique_Analytique": 0,
    "Competence_Resolution_Problemes": 0,
    "Competence_Communication": 0,
    "Competence_Organisation": 0,
    "Competence_Manuel_Technique": 0,
    "Valeur_Impact_Societal": 0,
    "Valeur_Innovation_Challenge": 0,
    "Valeur_Stabilite_Securite": 0,
    "Valeur_Autonomie": 0,
    "Pref_Travail_Equipe_Collab": 0,
    "Pref_Travail_Autonome": 0,
    "Pref_Pratique_Terrain": 0,
    "Pref_Theorie_Recherche": 0
  };

  let totalWeight = 0;

  // Traiter chaque réponse
  Object.keys(answers).forEach(questionId => {
    const answer = answers[questionId];
    const questionMapping = questionToPillarMapping[questionId];

    if (questionMapping && answer) {
      // Toutes les questions sont maintenant single-choice
      const mapping = questionMapping.pillarMapping[answer];
      if (mapping) {
        Object.keys(mapping).forEach(pillar => {
          userProfile[pillar] += mapping[pillar];
        });
        totalWeight += 1;
      }
    }
  });

  // Normaliser les scores sur 100
  if (totalWeight > 0) {
    Object.keys(userProfile).forEach(pillar => {
      userProfile[pillar] = Math.round((userProfile[pillar] / totalWeight) * 100);
    });
  }

  return userProfile;
};

// Fonction pour obtenir les questions complètes
export const getQuestionData = (questionId) => {
  return questionToPillarMapping[questionId] || null;
};

// Fonction pour obtenir toutes les questions
export const getAllQuestions = () => {
  return questionToPillarMapping;
};
