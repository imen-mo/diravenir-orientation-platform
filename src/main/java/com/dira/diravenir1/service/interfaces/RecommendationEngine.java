package com.dira.diravenir1.service.interfaces;

import com.dira.diravenir1.dto.Recommendation;
import com.dira.diravenir1.dto.MatchingResult;
import java.util.List;

/**
 * Interface définissant le contrat pour les générateurs de recommandations
 * basés sur les résultats de matching.
 * 
 * Respecte le principe OCP (Open/Closed Principle) :
 * - Ouvert à l'extension (nouveaux moteurs de recommandation)
 * - Fermé à la modification (interface stable)
 */
public interface RecommendationEngine {
    
    /**
     * Génère des recommandations basées sur les résultats de matching
     * 
     * @param matchingResults Liste des résultats de matching triés par score
     * @return Liste des recommandations générées
     */
    List<Recommendation> generate(List<MatchingResult> matchingResults);
    
    /**
     * Retourne le nom du moteur de recommandation
     * 
     * @return Nom unique du moteur
     */
    String getEngineName();
    
    /**
     * Retourne la description de ce que fait ce moteur
     * 
     * @return Description du moteur
     */
    default String getDescription() {
        return "Moteur de recommandation : " + getEngineName();
    }
    
    /**
     * Indique si ce moteur est activé
     * 
     * @return true si le moteur est activé, false sinon
     */
    default boolean isEnabled() {
        return true;
    }
    
    /**
     * Retourne la priorité de ce moteur (plus la priorité est élevée,
     * plus le moteur sera utilisé en premier)
     * 
     * @return Priorité du moteur (1 = plus haute priorité)
     */
    default int getPriority() {
        return 1;
    }
}
