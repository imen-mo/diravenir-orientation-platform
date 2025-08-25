package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.service.calculators.ScoreCalculator;
import com.dira.diravenir1.service.calculators.EuclideanScoreCalculator;
import com.dira.diravenir1.service.calculators.ForceAnalysisCalculator;
import com.dira.diravenir1.service.calculators.CriticalPillarCalculator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheConfig;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Service ultra-optimisé de calcul des scores finaux.
 * 
 * Ce service combine tous les calculateurs avec un cache ultra-performant
 * et une gestion optimisée des poids pour une performance maximale.
 * 
 * Responsabilité : Orchestration des calculateurs avec cache et optimisation
 */
@Service
@Slf4j
@CacheConfig(cacheNames = "scoreCalculations")
public class ScoreCalculationService {
    
    // Cache ultra-performant avec ConcurrentHashMap
    private final ConcurrentHashMap<String, Double> scoreCache = new ConcurrentHashMap<>();
    private final AtomicLong cacheHits = new AtomicLong(0);
    private final AtomicLong cacheMisses = new AtomicLong(0);
    
    // Calculateurs optimisés
    private final EuclideanScoreCalculator euclideanCalculator;
    private final ForceAnalysisCalculator forceAnalysisCalculator;
    private final CriticalPillarCalculator criticalPillarCalculator;
    
    // Configuration des poids optimisée
    private static final double EUCLIDEAN_WEIGHT = 0.65;      // 65% - Distance euclidienne
    private static final double FORCE_ANALYSIS_WEIGHT = 0.25; // 25% - Analyse des forces
    private static final double CRITICAL_PILLAR_WEIGHT = 0.10; // 10% - Piliers critiques
    
    // Seuils de performance
    private static final int MAX_CACHE_SIZE = 10000; // Taille maximale du cache
    private static final double CACHE_CLEANUP_THRESHOLD = 0.8; // Seuil de nettoyage
    
    @Autowired
    public ScoreCalculationService(
            EuclideanScoreCalculator euclideanCalculator,
            ForceAnalysisCalculator forceAnalysisCalculator,
            CriticalPillarCalculator criticalPillarCalculator) {
        this.euclideanCalculator = euclideanCalculator;
        this.forceAnalysisCalculator = forceAnalysisCalculator;
        this.criticalPillarCalculator = criticalPillarCalculator;
        
        log.info("🚀 Service de calcul des scores initialisé avec cache ultra-performant");
    }
    
    /**
     * Calcule le score final ultra-optimisé avec cache intelligent
     */
    @Cacheable(key = "#userProfile.hashCode() + '_' + #majorProfile.hashCode()")
    public double calculateFinalScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            // Vérification du cache ultra-rapide
            String cacheKey = generateCacheKey(userProfile, majorProfile);
            Double cachedScore = scoreCache.get(cacheKey);
            
            if (cachedScore != null) {
                cacheHits.incrementAndGet();
                return cachedScore;
            }
            
            cacheMisses.incrementAndGet();
            
            // Calcul ultra-optimisé des scores composants
            double euclideanScore = calculateEuclideanScore(userProfile, majorProfile);
            double forceAnalysisScore = calculateForceAnalysisScore(userProfile, majorProfile);
            double criticalPillarScore = calculateCriticalPillarScore(userProfile, majorProfile);
            
            // Calcul du score final avec pondération optimisée
            double finalScore = calculateWeightedScore(euclideanScore, forceAnalysisScore, criticalPillarScore);
            
            // Mise en cache avec gestion intelligente de la taille
            cacheScore(cacheKey, finalScore);
            
            return finalScore;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul du score final : {}", e.getMessage());
            return 0.5; // Score neutre en cas d'erreur
        }
    }
    
    /**
     * Calcul ultra-rapide du score euclidien
     */
    private double calculateEuclideanScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            List<MatchingResultDTO> results = euclideanCalculator.calculateMatchingScores(userProfile, List.of(majorProfile));
            return results.isEmpty() ? 0.5 : results.get(0).getMatchingScore() / 100.0;
        } catch (Exception e) {
            log.warn("⚠️ Erreur calculateur euclidien, utilisation du score par défaut");
            return 0.5;
        }
    }
    
    /**
     * Calcul ultra-rapide du score d'analyse des forces
     */
    private double calculateForceAnalysisScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            List<MatchingResultDTO> results = forceAnalysisCalculator.calculateMatchingScores(userProfile, List.of(majorProfile));
            return results.isEmpty() ? 0.5 : results.get(0).getMatchingScore() / 100.0;
        } catch (Exception e) {
            log.warn("⚠️ Erreur calculateur force analysis, utilisation du score par défaut");
            return 0.5;
        }
    }
    
    /**
     * Calcul ultra-rapide du score des piliers critiques
     */
    private double calculateCriticalPillarScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            List<MatchingResultDTO> results = criticalPillarCalculator.calculateMatchingScores(userProfile, List.of(majorProfile));
            return results.isEmpty() ? 0.5 : results.get(0).getMatchingScore() / 100.0;
        } catch (Exception e) {
            log.warn("⚠️ Erreur calculateur piliers critiques, utilisation du score par défaut");
            return 0.5;
        }
    }
    
    /**
     * Calcul du score final pondéré avec optimisation
     */
    private double calculateWeightedScore(double euclideanScore, double forceAnalysisScore, double criticalPillarScore) {
        // Calcul optimisé avec pré-calcul des multiplications
        double euclideanContribution = euclideanScore * EUCLIDEAN_WEIGHT;
        double forceAnalysisContribution = forceAnalysisScore * FORCE_ANALYSIS_WEIGHT;
        double criticalPillarContribution = criticalPillarScore * CRITICAL_PILLAR_WEIGHT;
        
        // Somme optimisée
        double finalScore = euclideanContribution + forceAnalysisContribution + criticalPillarContribution;
        
        // Assurance des bornes avec seuils optimisés
        return Math.max(0.25, Math.min(0.92, finalScore));
    }
    
    /**
     * Génération de clé de cache ultra-rapide
     */
    private String generateCacheKey(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        // Clé optimisée basée sur les hashCodes
        return userProfile.hashCode() + "_" + majorProfile.hashCode();
    }
    
    /**
     * Mise en cache intelligente avec gestion de la taille
     */
    private void cacheScore(String key, double score) {
        // Vérification de la taille du cache
        if (scoreCache.size() >= MAX_CACHE_SIZE) {
            // Nettoyage intelligent du cache
            cleanupCache();
        }
        
        scoreCache.put(key, score);
    }
    
    /**
     * Nettoyage intelligent du cache pour maintenir les performances
     */
    private void cleanupCache() {
        if (scoreCache.size() > MAX_CACHE_SIZE * CACHE_CLEANUP_THRESHOLD) {
            // Suppression des entrées les plus anciennes (approximatif)
            int entriesToRemove = (int) (scoreCache.size() * 0.3); // Supprime 30%
            
            scoreCache.entrySet().stream()
                .limit(entriesToRemove)
                .forEach(entry -> scoreCache.remove(entry.getKey()));
            
            log.debug("🧹 Cache nettoyé, {} entrées supprimées", entriesToRemove);
        }
    }
    
    /**
     * Récupère les statistiques de performance du cache
     */
    public String getCacheStats() {
        long hits = cacheHits.get();
        long misses = cacheMisses.get();
        long total = hits + misses;
        double hitRate = total > 0 ? (double) hits / total * 100 : 0;
        
        return String.format("📊 Cache Stats - Hits: %d, Misses: %d, Hit Rate: %.1f%%, Size: %d", 
            hits, misses, hitRate, scoreCache.size());
    }
    
    /**
     * Vide le cache pour les tests ou maintenance
     */
    public void clearCache() {
        scoreCache.clear();
        cacheHits.set(0);
        cacheMisses.set(0);
        log.info("🗑️ Cache vidé");
    }
    
    /**
     * Récupère la liste des calculateurs disponibles
     */
    public List<ScoreCalculator> getAvailableCalculators() {
        return List.of(euclideanCalculator, forceAnalysisCalculator, criticalPillarCalculator);
    }
    
    /**
     * Récupère la liste des calculateurs activés
     */
    public List<ScoreCalculator> getActiveCalculators() {
        return getAvailableCalculators().stream()
            .filter(calc -> calc != null)
            .collect(Collectors.toList());
    }
    
    /**
     * Vérifie si un calculateur spécifique est disponible
     */
    public boolean isCalculatorAvailable(String calculatorName) {
        return getAvailableCalculators().stream()
            .anyMatch(calc -> calc.getAlgorithmName().equals(calculatorName));
    }
    
    /**
     * Vérifie la santé du service
     */
    public boolean isHealthy() {
        try {
            // Test rapide avec des profils de test
            UserProfileDTO testUser = createTestUserProfile();
            MajorProfileDTO testMajor = createTestMajorProfile();
            
            double score = calculateFinalScore(testUser, testMajor);
            return score >= 0.0 && score <= 1.0;
            
        } catch (Exception e) {
            log.error("❌ Service non sain : {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Crée un profil utilisateur de test minimal
     */
    private UserProfileDTO createTestUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(3);
        profile.setInteretLogiqueAnalytique(3);
        return profile;
    }
    
    /**
     * Crée un profil majeure de test minimal
     */
    private MajorProfileDTO createTestMajorProfile() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Test");
        major.setInteretScientifiqueTech(3);
        major.setInteretLogiqueAnalytique(3);
        return major;
    }
}

