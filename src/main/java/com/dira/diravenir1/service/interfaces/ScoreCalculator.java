package com.dira.diravenir1.service.interfaces;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;

/**
 * Interface définissant le contrat pour les calculateurs de scores
 * entre un profil utilisateur et une majeure.
 * 
 * Respecte le principe OCP (Open/Closed Principle) :
 * - Ouvert à l'extension (nouveaux calculateurs)
 * - Fermé à la modification (interface stable)
 */
public interface ScoreCalculator {
    
    /**
     * Calcule un score spécifique entre un profil utilisateur et une majeure
     * 
     * @param userProfile Le profil de l'utilisateur
     * @param majorProfile Le profil de la majeure
     * @return Score calculé entre 0.0 et 1.0 (0% à 100%)
     */
    double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile);
    
    /**
     * Retourne le poids de ce calculateur dans le score final
     * La somme de tous les poids doit être égale à 1.0
     * 
     * @return Poids du calculateur (0.0 à 1.0)
     */
    double getWeight();
    
    /**
     * Retourne le nom du calculateur pour l'identification et le logging
     * 
     * @return Nom unique du calculateur
     */
    String getCalculatorName();
    
    /**
     * Indique si ce calculateur est activé
     * 
     * @return true si le calculateur est activé, false sinon
     */
    default boolean isEnabled() {
        return true;
    }
    
    /**
     * Retourne la description de ce que calcule ce calculateur
     * 
     * @return Description du calculateur
     */
    default String getDescription() {
        return "Calculateur de score pour " + getCalculatorName();
    }
}
