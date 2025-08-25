package com.dira.diravenir1.service.engines;

import com.dira.diravenir1.dto.Recommendation;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.service.interfaces.RecommendationEngine;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.ArrayList;

/**
 * Moteur de recommandation par défaut qui génère des recommandations basiques
 * basées sur les scores de matching.
 * 
 * Cette implémentation respecte le principe OCP en fournissant une fonctionnalité
 * de base qui peut être étendue par d'autres moteurs.
 */
@Component
@Slf4j
public class DefaultRecommendationEngine implements RecommendationEngine {
    
    @Override
    public List<Recommendation> generate(List<MatchingResult> matchingResults) {
        try {
            log.debug("🔄 Génération des recommandations par défaut pour {} majeures", matchingResults.size());
            
            List<Recommendation> recommendations = new ArrayList<>();
            
            for (int i = 0; i < matchingResults.size(); i++) {
                MatchingResult result = matchingResults.get(i);
                Recommendation recommendation = new Recommendation();
                recommendation.setProgram(result.getProgram());
                recommendation.setCategory(result.getCategory());
                recommendation.setMatchScore(result.getGlobalScore());
                recommendation.setRank(i + 1);
                recommendation.setPrimaryReason("Score de correspondance élevé");
                recommendation.setSecondaryReason("Basé sur l'algorithme de matching");
                recommendation.setStrengths("Correspondance forte avec le profil utilisateur");
                recommendation.setConsiderations("Vérifiez les prérequis spécifiques");
                
                recommendations.add(recommendation);
            }
            
            log.debug("✅ {} recommandations générées par le moteur par défaut", recommendations.size());
            return recommendations;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération des recommandations par défaut : {}", e.getMessage(), e);
            return new ArrayList<>();
        }
    }
    
    @Override
    public String getEngineName() {
        return "Default Recommendation Engine";
    }
    
    @Override
    public String getDescription() {
        return "Moteur de recommandation par défaut basé sur les scores de matching";
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    @Override
    public int getPriority() {
        return 1; // Priorité la plus basse
    }
}
