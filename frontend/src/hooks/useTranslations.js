import { useState, useEffect } from 'react';

// Traductions par défaut en français
const defaultTranslations = {
  // Hero Section
  guideYourWay: "Guidez votre chemin",
  upToSuccess: "vers le succès",
  withUs: "avec nous",
  getGuidance: "Obtenez des conseils personnalisés pour votre orientation académique et professionnelle",
  searchProgram: "Rechercher un programme...",
  search: "Rechercher",
  cloudComputing: "Cloud Computing",
  cyberSecurity: "Cybersécurité",
  devOps: "DevOps",
  dataScience: "Data Science",
  softwareTesting: "Test Logiciel",

  // AI Sections
  moroccoFirstAI: "Première plateforme IA",
  orientationPlatform: "d'orientation au Maroc",
  aiBasedPrograms: "Programmes basés sur l'IA",
  aiBasedScenarios: "Scénarios basés sur l'IA",
  aiBasedQuizzes: "Quiz/Tests basés sur l'IA",
  aiBasedGamification: "Gamification basée sur l'IA",

  // Career Orientation
  careerOrientationTitle: "Orientation de carrière",
  careerOrientationForAll: "pour tous",

  // How It Works
  howItWorksTitle: "Comment ça marche",
  step1Title: "Inscription",
  step2Title: "Test d'orientation",
  step3Title: "Analyse IA",
  step4Title: "Recommandations",
  step5Title: "Application",
  step6Title: "Suivi",

  // Popular Programs
  popularProgramsTitle: "Programmes populaires",
  startingFrom: "À partir de",
  applyNow: "Postuler maintenant",
  viewAllPrograms: "Voir tous les programmes",
  computerScience: "Informatique",
  technologyEngineering: "Ingénierie technologique",
  businessAdministration: "Administration des affaires",
  businessManagement: "Gestion d'entreprise",
  technologyAnalytics: "Analyse technologique",

  // Achievements
  achievementsTitle: "Nos réalisations",
  studentsAbroad: "Étudiants à l'étranger",
  programsAvailable: "Programmes disponibles",
  studentsSatisfied: "Étudiants satisfaits",

  // Testimonials
  from: "De",
  dreamers: "rêveurs",
  to: "à",
  achievers: "réalisateurs",
  and: "et",
  doors: "portes",
  diravenirScholar: "Boursier Diravenir",
  monthsAgo: "mois",
  scholarshipA: "Bourse A",
  bachelor: "Licence",
  selfSponsor: "Auto-financé",
  master: "Master",
  scholarshipB: "Bourse B",
  languageYear: "Année de langue",
  architecture: "Architecture",
  testimonial1Comment: "Diravenir m'a aidé à réaliser mon rêve d'étudier à l'étranger avec une bourse complète.",
  testimonial2Comment: "L'orientation personnalisée m'a permis de choisir le bon programme en cybersécurité.",
  testimonial3Comment: "Grâce à Diravenir, j'ai pu intégrer une université prestigieuse en architecture.",

  // Destinations
  destinationsTitle: "Nos destinations",
  china: "Chine",
  cyprus: "Chypre",
  romania: "Roumanie"
};

export const useTranslations = () => {
  const [translations, setTranslations] = useState(defaultTranslations);
  const [language, setLanguage] = useState('fr');

  // Fonction pour obtenir une traduction
  const t = (key) => {
    return translations[key] || key;
  };

  // Fonction pour changer de langue
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Ici on pourrait charger les traductions depuis une API ou un fichier
  };

  return {
    t,
    language,
    changeLanguage,
    translations
  };
};
