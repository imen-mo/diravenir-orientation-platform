package com.diravenir.service;

import java.util.Map;

/**
 * Interface pour le service de scoring d'orientation
 */
public interface OrientationScoringService {
    
    /**
     * Calculer le profil utilisateur basé sur les réponses
     */
    Map<String, Integer> calculateUserProfile(Map<String, String> answers);
    
    /**
     * Calculer le score pour un pilier spécifique
     */
    int calculatePillarScore(String pillar, Map<String, String> answers);
    
    /**
     * Obtenir le mapping des questions vers les piliers
     */
    Map<String, Map<String, Integer>> getQuestionToPillarMapping();
}
