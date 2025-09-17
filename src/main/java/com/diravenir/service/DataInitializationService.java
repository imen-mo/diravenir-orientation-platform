package com.diravenir.service;

/**
 * Interface pour le service d'initialisation des données
 */
public interface DataInitializationService {
    
    /**
     * Initialiser les données de base
     */
    void initializeData();
    
    /**
     * Initialiser les profils idéaux
     */
    void initializeIdealProfiles();
    
    /**
     * Initialiser les majeures d'orientation
     */
    void initializeOrientationMajors();
    
    /**
     * Vérifier si les données sont déjà initialisées
     */
    boolean isDataInitialized();
}
