package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.service.engines.DefaultRecommendationEngine;
import com.dira.diravenir1.service.interfaces.RecommendationEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheConfig;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Service ultra-optimisé de génération de recommandations.
 * 
 * Ce service génère des recommandations avec un cache ultra-performant
 * et une logique de tri optimisée pour une performance maximale.
 * 
 * Responsabilité : Génération rapide de recommandations avec cache intelligent
 */
@Service
@Slf4j
@CacheConfig(cacheNames = "recommendations")
public class RecommendationService {
    
    // Cache ultra-performant pour les recommandations
    private final ConcurrentHashMap<String, List<MajorRecommendationDTO>> recommendationCache = new ConcurrentHashMap<>();
    private final AtomicLong cacheHits = new AtomicLong(0);
    private final AtomicLong cacheMisses = new AtomicLong(0);
    
    // Moteur de recommandation par défaut
    private final DefaultRecommendationEngine defaultEngine;
    
    // Configuration des performances
    private static final int MAX_RECOMMENDATIONS = 10;
    private static final int MAX_CACHE_SIZE = 5000;
    private static final double CACHE_CLEANUP_THRESHOLD = 0.8;
    
    @Autowired
    public RecommendationService(DefaultRecommendationEngine defaultEngine) {
        this.defaultEngine = defaultEngine;
        log.info("🚀 Service de recommandation initialisé avec cache ultra-performant");
    }
    
    /**
     * Génère des recommandations ultra-optimisées avec cache intelligent
     */
    @Cacheable(key = "#matchingResults.hashCode()")
    public List<MajorRecommendationDTO> generateRecommendations(List<MatchingResult> matchingResults) {
        try {
            if (matchingResults == null || matchingResults.isEmpty()) {
                return new ArrayList<>();
            }
            
            // Vérification du cache ultra-rapide
            String cacheKey = generateCacheKey(matchingResults);
            List<MajorRecommendationDTO> cachedRecommendations = recommendationCache.get(cacheKey);
            
            if (cachedRecommendations != null) {
                cacheHits.incrementAndGet();
                return new ArrayList<>(cachedRecommendations); // Copie défensive
            }
            
            cacheMisses.incrementAndGet();
            
            // Génération ultra-optimisée des recommandations
            List<MajorRecommendationDTO> recommendations = generateOptimizedRecommendations(matchingResults);
            
            // Mise en cache avec gestion intelligente
            cacheRecommendations(cacheKey, recommendations);
            
            return recommendations;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération des recommandations : {}", e.getMessage());
            return generateFallbackRecommendations(matchingResults);
        }
    }
    
    /**
     * Génération ultra-optimisée des recommandations
     */
    private List<MajorRecommendationDTO> generateOptimizedRecommendations(List<MatchingResult> matchingResults) {
        // Tri ultra-rapide par score décroissant
            List<MatchingResult> sortedResults = matchingResults.stream()
            .sorted((r1, r2) -> Double.compare(r2.getGlobalScore(), r1.getGlobalScore()))
            .limit(MAX_RECOMMENDATIONS)
                .collect(Collectors.toList());
            
        // Conversion optimisée en recommandations
        List<MajorRecommendationDTO> recommendations = new ArrayList<>(sortedResults.size());
        
        for (MatchingResult result : sortedResults) {
            MajorRecommendationDTO recommendation = createOptimizedRecommendation(result);
                recommendations.add(recommendation);
            }
            
            return recommendations;
    }
    
    /**
     * Création ultra-rapide d'une recommandation
     */
    private MajorRecommendationDTO createOptimizedRecommendation(MatchingResult result) {
        MajorRecommendationDTO recommendation = new MajorRecommendationDTO();
        recommendation.setName(result.getMajorName());
        recommendation.setMatchingScore((int) (result.getGlobalScore() * 100));
        recommendation.setExplanation(generateOptimizedExplanation(result));
        return recommendation;
    }
    
    /**
     * Génération ultra-rapide d'explication
     */
    private String generateOptimizedExplanation(MatchingResult result) {
        double score = result.getGlobalScore();
        
        if (score > 0.8) {
            return "Excellente correspondance - Profil très compatible";
        } else if (score > 0.6) {
            return "Bonne correspondance - Profil compatible";
        } else if (score > 0.4) {
            return "Correspondance moyenne - Profil partiellement compatible";
        } else {
            return "Correspondance limitée - Profil peu compatible";
        }
    }
    
    /**
     * Recommandations de fallback en cas d'erreur
     */
    private List<MajorRecommendationDTO> generateFallbackRecommendations(List<MatchingResult> matchingResults) {
        try {
            // Utilisation du moteur par défaut
            List<com.dira.diravenir1.dto.Recommendation> fallbackRecommendations = defaultEngine.generate(matchingResults);
            
            if (fallbackRecommendations != null && !fallbackRecommendations.isEmpty()) {
                return fallbackRecommendations.stream()
                    .limit(MAX_RECOMMENDATIONS)
                    .map(this::convertRecommendationToMajorRecommendation)
                    .collect(Collectors.toList());
                    }
                    
                } catch (Exception e) {
            log.warn("⚠️ Erreur avec le moteur de fallback : {}", e.getMessage());
        }
        
        // Recommandations minimales en dernier recours
        return matchingResults.stream()
            .limit(3)
            .map(this::createMinimalRecommendation)
            .collect(Collectors.toList());
    }
    
    /**
     * Création d'une recommandation minimale
     */
    private MajorRecommendationDTO createMinimalRecommendation(MatchingResult result) {
        MajorRecommendationDTO recommendation = new MajorRecommendationDTO();
        recommendation.setName(result.getMajorName());
        recommendation.setMatchingScore((int) (result.getGlobalScore() * 100));
        recommendation.setExplanation("Recommandation basée sur le score de correspondance");
        return recommendation;
    }
    
    /**
     * Conversion d'une Recommendation vers MajorRecommendationDTO
     */
    private MajorRecommendationDTO convertRecommendationToMajorRecommendation(com.dira.diravenir1.dto.Recommendation recommendation) {
        MajorRecommendationDTO majorRecommendation = new MajorRecommendationDTO();
        majorRecommendation.setName(recommendation.getMajorName());
        majorRecommendation.setMatchingScore((int) (recommendation.getMatchScore() * 100));
        majorRecommendation.setExplanation(recommendation.getPrimaryReason());
        return majorRecommendation;
    }
    
    /**
     * Génération de clé de cache ultra-rapide
     */
    private String generateCacheKey(List<MatchingResult> matchingResults) {
        // Clé basée sur le hash des scores et noms des majeures
        return matchingResults.stream()
            .mapToInt(result -> Objects.hash(result.getMajorName(), result.getGlobalScore()))
            .sum() + "_" + matchingResults.size();
    }
    
    /**
     * Mise en cache intelligente avec gestion de la taille
     */
    private void cacheRecommendations(String key, List<MajorRecommendationDTO> recommendations) {
        if (recommendationCache.size() >= MAX_CACHE_SIZE) {
            cleanupCache();
        }
        
        recommendationCache.put(key, new ArrayList<>(recommendations)); // Copie défensive
    }
    
    /**
     * Nettoyage intelligent du cache
     */
    private void cleanupCache() {
        if (recommendationCache.size() > MAX_CACHE_SIZE * CACHE_CLEANUP_THRESHOLD) {
            int entriesToRemove = (int) (recommendationCache.size() * 0.3);
            
            recommendationCache.entrySet().stream()
                .limit(entriesToRemove)
                .forEach(entry -> recommendationCache.remove(entry.getKey()));
            
            log.debug("🧹 Cache des recommandations nettoyé, {} entrées supprimées", entriesToRemove);
        }
    }
    
    /**
     * Statistiques de performance du cache
     */
    public String getCacheStats() {
        long hits = cacheHits.get();
        long misses = cacheMisses.get();
        long total = hits + misses;
        double hitRate = total > 0 ? (double) hits / total * 100 : 0;
        
        return String.format("📊 Cache Stats - Hits: %d, Misses: %d, Hit Rate: %.1f%%, Size: %d", 
            hits, misses, hitRate, recommendationCache.size());
    }
    
    /**
     * Vide le cache pour les tests ou maintenance
     */
    public void clearCache() {
        recommendationCache.clear();
        cacheHits.set(0);
        cacheMisses.set(0);
        log.info("🗑️ Cache des recommandations vidé");
    }
    
    /**
     * Vérifie la santé du service
     */
    public boolean isHealthy() {
        try {
            // Test rapide avec des résultats de test
            List<MatchingResult> testResults = createTestMatchingResults();
            List<MajorRecommendationDTO> recommendations = generateRecommendations(testResults);
            
            return recommendations != null && !recommendations.isEmpty();
            
        } catch (Exception e) {
            log.error("❌ Service de recommandation non sain : {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Crée des résultats de test pour la vérification de santé
     */
    private List<MatchingResult> createTestMatchingResults() {
        List<MatchingResult> testResults = new ArrayList<>();
        
        // Création d'un résultat de test
        MatchingResult testResult = MatchingResult.builder()
            .majorName("Test Major")
            .globalScore(0.75)
            .build();
        
        testResults.add(testResult);
        return testResults;
    }
    
    /**
     * Récupère les recommandations du cache (pour debug)
     */
    public Map<String, List<MajorRecommendationDTO>> getCachedRecommendations() {
        return new HashMap<>(recommendationCache);
    }
}
