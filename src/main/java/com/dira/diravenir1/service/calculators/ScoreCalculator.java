package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;

import java.util.List;

/**
 * Interface pour les calculateurs de score de matching
 * selon les spécifications du "Système d'Orientation des Étudiants".
 * 
 * Cette interface définit le contrat pour tous les algorithmes
 * de calcul de correspondance entre profils utilisateur et majeures.
 */
public interface ScoreCalculator {
    
    /**
     * Calcule les scores de matching entre un profil utilisateur
     * et une liste de profils de majeures.
     * 
     * @param userProfile Le profil utilisateur calculé
     * @param majorProfiles La liste des profils de majeures à évaluer
     * @return Liste des résultats de matching triés par score décroissant
     */
    List<MatchingResultDTO> calculateMatchingScores(
        UserProfileDTO userProfile, 
        List<MajorProfileDTO> majorProfiles
    );
    
    /**
     * Calcule le score de matching entre un profil utilisateur
     * et un profil de majeure spécifique.
     * 
     * @param userProfile Le profil utilisateur
     * @param majorProfile Le profil de majeure
     * @return Score de matching (0-100)
     */
    double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile);
    
    /**
     * Retourne le nom de l'algorithme utilisé
     * 
     * @return Nom de l'algorithme
     */
    String getAlgorithmName();
    
    /**
     * Retourne la version de l'algorithme
     * 
     * @return Version de l'algorithme
     */
    String getAlgorithmVersion();
    
    /**
     * Retourne le nom du calculateur
     * 
     * @return Nom du calculateur
     */
    String getCalculatorName();
    
    /**
     * Retourne le poids du calculateur
     * 
     * @return Poids du calculateur
     */
    double getWeight();
    
    /**
     * Retourne la description du calculateur
     * 
     * @return Description du calculateur
     */
    String getDescription();
    
    /**
     * Vérifie si le calculateur est activé
     * 
     * @return true si activé, false sinon
     */
    boolean isEnabled();
}
