package com.diravenir.service;

import java.util.Map;

/**
 * Interface pour le service des profils idéaux
 */
public interface IdealProfilesService {
    
    /**
     * Obtenir le profil idéal pour une majeure
     */
    Map<String, Integer> getIdealProfileForMajor(String majorCode);
    
    /**
     * Calculer le score de correspondance entre profils
     */
    double calculateMatchingScore(Map<String, Integer> userProfile, Map<String, Integer> idealProfile);
    
    /**
     * Obtenir tous les profils idéaux
     */
    Map<String, Map<String, Integer>> getAllIdealProfiles();
    
    /**
     * Vérifier si une majeure existe
     */
    boolean majorExists(String majorCode);
}
