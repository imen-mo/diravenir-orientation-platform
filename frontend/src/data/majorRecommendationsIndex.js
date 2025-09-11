// Index des recommandations détaillées pour toutes les majeures
// Combine les données des fichiers majorRecommendations.js et majorRecommendationsPart2.js

import { majorRecommendations } from './majorRecommendations.js';
import { majorRecommendationsPart2 } from './majorRecommendationsPart2.js';

// Combiner toutes les recommandations
export const allMajorRecommendations = {
  ...majorRecommendations,
  ...majorRecommendationsPart2
};

// Fonction pour obtenir les recommandations d'une majeure
export const getMajorRecommendations = (majorCode) => {
  return allMajorRecommendations[majorCode] || null;
};

// Fonction pour formater le texte de recommandation complet
export const formatMajorRecommendation = (majorCode, matchPercentage) => {
  const recommendation = getMajorRecommendations(majorCode);
  if (!recommendation) return null;

  return {
    title: recommendation.title,
    matchText: `Your profile matches ${matchPercentage}% with this major.`,
    description: recommendation.description,
    reasons: recommendation.reasons
  };
};

// Fonction pour obtenir toutes les majeures disponibles
export const getAllAvailableMajors = () => {
  return Object.keys(allMajorRecommendations);
};

// Fonction pour vérifier si une majeure a des recommandations
export const hasRecommendations = (majorCode) => {
  return majorCode in allMajorRecommendations;
};

// Fonction pour obtenir les raisons d'une majeure
export const getMajorReasons = (majorCode) => {
  const recommendation = getMajorRecommendations(majorCode);
  return recommendation ? recommendation.reasons : [];
};

// Fonction pour obtenir la description d'une majeure
export const getMajorDescription = (majorCode) => {
  const recommendation = getMajorRecommendations(majorCode);
  return recommendation ? recommendation.description : '';
};

// Fonction pour obtenir le titre d'une majeure
export const getMajorTitle = (majorCode) => {
  const recommendation = getMajorRecommendations(majorCode);
  return recommendation ? recommendation.title : '';
};
