// Réponses pour toutes les questions d'orientation
export const orientationAnswers = {
  1: [
    {
      id: 'A',
      text: 'Créer quelque chose de nouveau (construire, coder, designer)',
      emoji: '🔨'
    },
    {
      id: 'B',
      text: 'Comprendre comment les choses fonctionnent (expérimenter, analyser, résoudre des énigmes)',
      emoji: '🔬'
    },
    {
      id: 'C',
      text: 'Interagir et aider les autres (conseiller, enseigner, soigner)',
      emoji: '🤝'
    },
    {
      id: 'D',
      text: 'Organiser et gérer des projets (planifier, diriger, optimiser)',
      emoji: '📊'
    },
    {
      id: 'E',
      text: 'Exprimer ma créativité (peindre, écrire, jouer de la musique, faire des vidéos)',
      emoji: '🎨'
    }
  ],
  2: [
    {
      id: 'A',
      text: 'Découvertes scientifiques, Technologie et innovation',
      emoji: '🔬'
    },
    {
      id: 'B',
      text: 'Art et culture, Design et création',
      emoji: '🎨'
    },
    {
      id: 'C',
      text: 'Développement personnel, Causes sociales et humanitaires',
      emoji: '🌟'
    },
    {
      id: 'D',
      text: 'Actualités économiques, Stratégies d\'entreprise',
      emoji: '📰'
    },
    {
      id: 'E',
      text: 'Organisation et méthodes de travail, Gestion de projets',
      emoji: '📊'
    },
    {
      id: 'F',
      text: 'Sports, Bricolage et artisanat',
      emoji: '🏆'
    }
  ],
  3: [
    {
      id: 'A',
      text: 'Leader - Je prends les décisions et guide l\'équipe',
      emoji: '👑'
    },
    {
      id: 'B',
      text: 'Créatif - Je propose des idées innovantes',
      emoji: '💡'
    },
    {
      id: 'C',
      text: 'Médiateur - Je résous les conflits et harmonise le groupe',
      emoji: '🤝'
    },
    {
      id: 'D',
      text: 'Organisateur - Je planifie et coordonne les tâches',
      emoji: '📋'
    },
    {
      id: 'E',
      text: 'Spécialiste - Je fournis mon expertise technique',
      emoji: '🔧'
    }
  ],
  4: [
    {
      id: 'A',
      text: 'Analyser méthodiquement étape par étape',
      emoji: '🔍'
    },
    {
      id: 'B',
      text: 'Rechercher des solutions créatives et innovantes',
      emoji: '💭'
    },
    {
      id: 'C',
      text: 'Demander conseil et collaborer avec d\'autres',
      emoji: '👥'
    },
    {
      id: 'D',
      text: 'Utiliser des méthodes et outils éprouvés',
      emoji: '📚'
    },
    {
      id: 'E',
      text: 'Expérimenter et tester différentes approches',
      emoji: '🧪'
    }
  ],
  5: [
    {
      id: 'A',
      text: 'Par la pratique et l\'expérience directe',
      emoji: '🔄'
    },
    {
      id: 'B',
      text: 'Par la lecture et l\'étude théorique',
      emoji: '📖'
    },
    {
      id: 'C',
      text: 'Par l\'observation et l\'imitation d\'experts',
      emoji: '👀'
    },
    {
      id: 'D',
      text: 'Par la discussion et le débat avec d\'autres',
      emoji: '💬'
    },
    {
      id: 'E',
      text: 'Par des projets concrets et des défis',
      emoji: '🎯'
    }
  ]
};

export const getAnswersForQuestion = (questionId) => {
  return orientationAnswers[questionId] || [];
};
