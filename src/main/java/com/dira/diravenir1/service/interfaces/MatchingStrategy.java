package com.dira.diravenir1.service.interfaces;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;

/**
 * Interface définissant le contrat pour les stratégies de matching
 * entre un profil utilisateur et une majeure.
 * 
 * Respecte le principe OCP (Open/Closed Principle) :
 * - Ouvert à l'extension (nouvelles stratégies)
 * - Fermé à la modification (interface stable)
 */
public interface MatchingStrategy {
    
    /**
     * Exécute l'algorithme de matching et retourne un score de correspondance
     * 
     * @param userProfile Le profil de l'utilisateur
     * @param majorProfile Le profil de la majeure
     * @return Score de correspondance entre 0.0 et 1.0 (0% à 100%)
     */
    double execute(UserProfileDTO userProfile, MajorProfileDTO majorProfile);
    
    /**
     * Retourne le nom de l'algorithme pour l'identification et le logging
     * 
     * @return Nom unique de l'algorithme
     */
    String getAlgorithmName();
    
    /**
     * Retourne la priorité de cette stratégie (plus la priorité est élevée, 
     * plus la stratégie sera utilisée en premier)
     * 
     * @return Priorité de la stratégie (1 = plus haute priorité)
     */
    default int getPriority() {
        return 1;
    }
    
    /**
     * Indique si cette stratégie est activée
     * 
     * @return true si la stratégie est activée, false sinon
     */
    default boolean isEnabled() {
        return true;
    }
}
