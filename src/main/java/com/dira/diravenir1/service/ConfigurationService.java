package com.dira.diravenir1.service;

import com.dira.diravenir1.config.AlgorithmWeightsConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Service de configuration qui gère tous les paramètres configurables de l'algorithme.
 * 
 * Ce service respecte le principe OCP en étant extensible sans modification :
 * - Charge la configuration depuis les fichiers de propriétés
 * - Fournit des valeurs par défaut pour tous les paramètres
 * - Permet la modification dynamique de la configuration
 * - Centralise toute la logique de configuration
 * 
 * Avantages :
 * - Configuration centralisée et cohérente
 * - Valeurs par défaut robustes
 * - Modification dynamique possible
 * - Facilement testable
 */
@Service
@Slf4j
public class ConfigurationService {
    
    @Autowired
    private AlgorithmWeightsConfig algorithmWeightsConfig;
    
    // Configuration par défaut des stratégies de matching
    private final Map<String, Boolean> defaultStrategyConfig = new HashMap<>();
    
    // Configuration par défaut des calculateurs de scores
    private final Map<String, Boolean> defaultCalculatorConfig = new HashMap<>();
    
    // Configuration par défaut des moteurs de recommandation
    private final Map<String, Boolean> defaultEngineConfig = new HashMap<>();
    
    public ConfigurationService() {
        initializeDefaultConfigurations();
    }
    
    /**
     * Initialise les configurations par défaut
     */
    private void initializeDefaultConfigurations() {
        // Stratégies de matching par défaut
        defaultStrategyConfig.put("EuclideanMatchingStrategy", true);
        defaultStrategyConfig.put("HybridMatchingStrategy", true);
        defaultStrategyConfig.put("SimpleMatchingStrategy", false); // Désactivée par défaut
        
        // Calculateurs de scores par défaut
        defaultCalculatorConfig.put("EuclideanScoreCalculator", true);
        defaultCalculatorConfig.put("ForceAnalysisCalculator", true);
        defaultCalculatorConfig.put("CriticalPillarCalculator", true);
        
        // Moteurs de recommandation par défaut
        defaultEngineConfig.put("Top3RecommendationEngine", true);
        defaultEngineConfig.put("DetailedAnalysisGenerator", true);
    }
    
    /**
     * Retourne la configuration des poids des algorithmes
     */
    public AlgorithmWeightsConfig getAlgorithmWeights() {
        return algorithmWeightsConfig;
    }
    
    /**
     * Retourne le poids d'une stratégie de matching
     */
    public double getMatchingStrategyWeight(String strategyName) {
        if (strategyName == null) return 0.0;
        
        switch (strategyName) {
            case "EuclideanMatchingStrategy":
                return algorithmWeightsConfig.getEuclideanWeight();
            case "HybridMatchingStrategy":
                return algorithmWeightsConfig.getForceAnalysisWeight(); // Utilise le poids des forces
            case "SimpleMatchingStrategy":
                return algorithmWeightsConfig.getCriticalPillarWeight(); // Utilise le poids des piliers
            default:
                log.warn("⚠️ Poids inconnu pour la stratégie : {}", strategyName);
                return 0.0;
        }
    }
    
    /**
     * Retourne le poids d'un calculateur de score
     */
    public double getScoreCalculatorWeight(String calculatorName) {
        if (calculatorName == null) return 0.0;
        
        switch (calculatorName) {
            case "EuclideanScoreCalculator":
                return algorithmWeightsConfig.getEuclideanWeight();
            case "ForceAnalysisCalculator":
                return algorithmWeightsConfig.getForceAnalysisWeight();
            case "CriticalPillarCalculator":
                return algorithmWeightsConfig.getCriticalPillarWeight();
            default:
                log.warn("⚠️ Poids inconnu pour le calculateur : {}", calculatorName);
                return 0.0;
        }
    }
    
    /**
     * Vérifie si une stratégie de matching est activée
     */
    public boolean isMatchingStrategyEnabled(String strategyName) {
        return defaultStrategyConfig.getOrDefault(strategyName, false);
    }
    
    /**
     * Active ou désactive une stratégie de matching
     */
    public void setMatchingStrategyEnabled(String strategyName, boolean enabled) {
        defaultStrategyConfig.put(strategyName, enabled);
        log.info("🔧 Stratégie de matching {} {}", strategyName, enabled ? "activée" : "désactivée");
    }
    
    /**
     * Vérifie si un calculateur de score est activé
     */
    public boolean isScoreCalculatorEnabled(String calculatorName) {
        return defaultCalculatorConfig.getOrDefault(calculatorName, false);
    }
    
    /**
     * Active ou désactive un calculateur de score
     */
    public void setScoreCalculatorEnabled(String calculatorName, boolean enabled) {
        defaultCalculatorConfig.put(calculatorName, enabled);
        log.info("🔧 Calculateur de score {} {}", calculatorName, enabled ? "activé" : "désactivé");
    }
    
    /**
     * Vérifie si un moteur de recommandation est activé
     */
    public boolean isRecommendationEngineEnabled(String engineName) {
        return defaultEngineConfig.getOrDefault(engineName, false);
    }
    
    /**
     * Active ou désactive un moteur de recommandation
     */
    public void setRecommendationEngineEnabled(String engineName, boolean enabled) {
        defaultEngineConfig.put(engineName, enabled);
        log.info("🔧 Moteur de recommandation {} {}", engineName, enabled ? "activé" : "désactivé");
    }
    
    /**
     * Retourne la liste des stratégies de matching configurées
     */
    public List<String> getConfiguredMatchingStrategies() {
        return new ArrayList<>(defaultStrategyConfig.keySet());
    }
    
    /**
     * Retourne la liste des calculateurs de scores configurés
     */
    public List<String> getConfiguredScoreCalculators() {
        return new ArrayList<>(defaultCalculatorConfig.keySet());
    }
    
    /**
     * Retourne la liste des moteurs de recommandation configurés
     */
    public List<String> getConfiguredRecommendationEngines() {
        return new ArrayList<>(defaultEngineConfig.keySet());
    }
    
    /**
     * Retourne la configuration complète actuelle
     */
    public Map<String, Object> getCurrentConfiguration() {
        Map<String, Object> config = new HashMap<>();
        
        // Configuration des poids
        config.put("algorithmWeights", algorithmWeightsConfig);
        
        // Configuration des stratégies
        config.put("matchingStrategies", new HashMap<>(defaultStrategyConfig));
        
        // Configuration des calculateurs
        config.put("scoreCalculators", new HashMap<>(defaultCalculatorConfig));
        
        // Configuration des moteurs
        config.put("recommendationEngines", new HashMap<>(defaultEngineConfig));
        
        return config;
    }
    
    /**
     * Applique une configuration complète
     */
    public void applyConfiguration(Map<String, Object> config) {
        try {
            log.info("🔧 Application d'une nouvelle configuration");
            
            // Application des stratégies
            if (config.containsKey("matchingStrategies")) {
                @SuppressWarnings("unchecked")
                Map<String, Boolean> strategies = (Map<String, Boolean>) config.get("matchingStrategies");
                defaultStrategyConfig.putAll(strategies);
            }
            
            // Application des calculateurs
            if (config.containsKey("scoreCalculators")) {
                @SuppressWarnings("unchecked")
                Map<String, Boolean> calculators = (Map<String, Boolean>) config.get("scoreCalculators");
                defaultCalculatorConfig.putAll(calculators);
            }
            
            // Application des moteurs
            if (config.containsKey("recommendationEngines")) {
                @SuppressWarnings("unchecked")
                Map<String, Boolean> engines = (Map<String, Boolean>) config.get("recommendationEngines");
                defaultEngineConfig.putAll(engines);
            }
            
            log.info("✅ Configuration appliquée avec succès");
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'application de la configuration : {}", e.getMessage(), e);
        }
    }
    
    /**
     * Réinitialise la configuration aux valeurs par défaut
     */
    public void resetToDefaults() {
        log.info("🔄 Réinitialisation de la configuration aux valeurs par défaut");
        initializeDefaultConfigurations();
    }
    
    /**
     * Valide la configuration actuelle
     */
    public boolean validateConfiguration() {
        try {
            // Vérification que les poids des calculateurs somment à 1.0
            double totalWeight = algorithmWeightsConfig.getEuclideanWeight() +
                                algorithmWeightsConfig.getForceAnalysisWeight() +
                                algorithmWeightsConfig.getCriticalPillarWeight();
            
            if (Math.abs(totalWeight - 1.0) > 0.01) {
                log.warn("⚠️ La somme des poids des calculateurs n'est pas égale à 1.0 : {}", totalWeight);
                return false;
            }
            
            // Vérification qu'au moins une stratégie est activée
            boolean hasActiveStrategy = defaultStrategyConfig.values().stream().anyMatch(enabled -> enabled);
            if (!hasActiveStrategy) {
                log.warn("⚠️ Aucune stratégie de matching n'est activée");
                return false;
            }
            
            // Vérification qu'au moins un calculateur est activé
            boolean hasActiveCalculator = defaultCalculatorConfig.values().stream().anyMatch(enabled -> enabled);
            if (!hasActiveCalculator) {
                log.warn("⚠️ Aucun calculateur de score n'est activé");
                return false;
            }
            
            log.info("✅ Configuration validée avec succès");
            return true;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la validation de la configuration : {}", e.getMessage(), e);
            return false;
        }
    }
}
