// Configuration des questions d'orientation
export const orientationQuestions = [
  {
    id: 1,
    path: '/orientation/questions',
    nextPath: '/orientation/question-2',
    backPath: '/orientation/welcome',
    title: 'SI LE TEMPS ET L\'ARGENT N\'ÉTAIENT PAS UN PROBLÈME, QUELLE ACTIVITÉ CHOISIRIEZ-VOUS POUR PASSER VOTRE JOURNÉE IDÉALE ?'
  },
  {
    id: 2,
    path: '/orientation/question-2',
    nextPath: '/orientation/question-3',
    backPath: '/orientation/questions',
    title: 'QUAND VOUS NAVIGUEZ SUR INTERNET OU REGARDEZ DES VIDÉOS, QUEL TYPE DE CONTENU RETIENT LE PLUS VOTRE ATTENTION ?'
  },
  {
    id: 3,
    path: '/orientation/question-3',
    nextPath: '/orientation/question-4',
    backPath: '/orientation/question-2',
    title: 'DANS UNE SITUATION DE TRAVAIL EN ÉQUIPE, QUEL RÔLE AVEZ-VOUS TENDANCE À ADOPTER ?'
  },
  {
    id: 4,
    path: '/orientation/question-4',
    nextPath: '/orientation/question-5',
    backPath: '/orientation/question-3',
    title: 'QUAND VOUS RENCONTREZ UN PROBLÈME COMPLEXE, COMMENT PROCÉDEZ-VOUS ?'
  },
  {
    id: 5,
    path: '/orientation/question-5',
    nextPath: '/orientation/question-6',
    backPath: '/orientation/question-4',
    title: 'QUELLE EST VOTRE APPROCHE PRÉFÉRÉE POUR APPRENDRE DE NOUVELLES CHOSES ?'
  },
  {
    id: 6,
    path: '/orientation/question-6',
    nextPath: '/orientation/question-7',
    backPath: '/orientation/question-5',
    title: 'DANS VOTRE VIE QUOTIDIENNE, QUELLE ACTIVITÉ VOUS DONNE LE PLUS DE SATISFACTION ?'
  },
  {
    id: 7,
    path: '/orientation/question-7',
    nextPath: '/orientation/question-8',
    backPath: '/orientation/question-6',
    title: 'QUAND VOUS PLANIFIEZ VOTRE AVENIR, SUR QUOI VOUS CONCENTREZ-VOUS LE PLUS ?'
  },
  {
    id: 8,
    path: '/orientation/question-8',
    nextPath: '/orientation/question-9',
    backPath: '/orientation/question-7',
    title: 'DANS UNE SITUATION STRESSANTE, QUELLE EST VOTRE RÉACTION TYPIQUE ?'
  },
  {
    id: 9,
    path: '/orientation/question-9',
    nextPath: '/orientation/question-10',
    backPath: '/orientation/question-8',
    title: 'QUELLE EST VOTRE ATTITUDE ENVERS LE CHANGEMENT ET L\'INNOVATION ?'
  },
  {
    id: 10,
    path: '/orientation/question-10',
    nextPath: '/orientation/question-11',
    backPath: '/orientation/question-9',
    title: 'QUAND VOUS TRAVAILLEZ SUR UN PROJET, QUELLE EST VOTRE PRIORITÉ PRINCIPALE ?'
  },
  {
    id: 11,
    path: '/orientation/question-11',
    nextPath: '/orientation/question-12',
    backPath: '/orientation/question-10',
    title: 'DANS VOS RELATIONS AVEC LES AUTRES, QUELLE EST VOTRE FORCE PRINCIPALE ?'
  },
  {
    id: 12,
    path: '/orientation/question-12',
    nextPath: '/orientation/question-13',
    backPath: '/orientation/question-11',
    title: 'QUAND VOUS PRENEZ DES DÉCISIONS IMPORTANTES, SUR QUOI VOUS BASEZ-VOUS ?'
  },
  {
    id: 13,
    path: '/orientation/question-13',
    nextPath: '/orientation/question-14',
    backPath: '/orientation/question-12',
    title: 'QUELLE EST VOTRE VISION DE L\'AVENIR ET DE VOTRE CARRIÈRE ?'
  },
  {
    id: 14,
    path: '/orientation/question-14',
    nextPath: '/orientation/results',
    backPath: '/orientation/question-13',
    title: 'ENFIN, QUELLE EST LA QUALITÉ QUE VOUS CONSIDÉREZ COMME LA PLUS IMPORTANTE POUR RÉUSSIR ?'
  }
];

export const getQuestionConfig = (questionId) => {
  return orientationQuestions.find(q => q.id === questionId);
};
