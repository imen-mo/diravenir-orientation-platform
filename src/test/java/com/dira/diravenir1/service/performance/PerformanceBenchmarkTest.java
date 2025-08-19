package com.dira.diravenir1.service.performance;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.service.ScoreCalculationService;
import com.dira.diravenir1.service.RecommendationService;
import com.dira.diravenir1.service.strategies.HybridMatchingStrategy;
import com.dira.diravenir1.service.strategies.EuclideanMatchingStrategy;
import com.dira.diravenir1.service.strategies.SimpleMatchingStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Tests de performance pour valider les performances de l'algorithme refactorisé.
 * 
 * Ces tests valident :
 * - Les performances des stratégies individuelles
 * - Les performances du service de calcul des scores
 * - Les performances du service de recommandation
 * - La comparaison avec des seuils de performance acceptables
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de performance de l'algorithme d'orientation")
class PerformanceBenchmarkTest {
    
    @Autowired
    private ScoreCalculationService scoreCalculationService;
    
    @Autowired
    private RecommendationService recommendationService;
    
    @Autowired
    private HybridMatchingStrategy hybridStrategy;
    
    @Autowired
    private EuclideanMatchingStrategy euclideanStrategy;
    
    @Autowired
    private SimpleMatchingStrategy simpleStrategy;
    
    private List<UserProfileDTO> testUserProfiles;
    private List<MajorProfileDTO> testMajorProfiles;
    private Random random;
    
    // Seuils de performance (en millisecondes)
    private static final long SINGLE_STRATEGY_THRESHOLD = 10; // 10ms par exécution
    private static final long SCORE_CALCULATION_THRESHOLD = 50; // 50ms par calcul
    private static final long RECOMMENDATION_THRESHOLD = 100; // 100ms par recommandation
    private static final long BULK_OPERATION_THRESHOLD = 1000; // 1s pour 100 opérations
    
    @BeforeEach
    void setUp() {
        random = new Random(42); // Seed fixe pour la reproductibilité
        testUserProfiles = generateTestUserProfiles(100);
        testMajorProfiles = generateTestMajorProfiles(50);
    }
    
    @Nested
    @DisplayName("Tests de performance des stratégies individuelles")
    class IndividualStrategyPerformanceTests {
        
        @Test
        @DisplayName("La stratégie hybride doit être performante")
        void testHybridStrategyPerformance() {
            long totalTime = 0;
            int iterations = 100;
            
            for (int i = 0; i < iterations; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
                
                long startTime = System.nanoTime();
                hybridStrategy.execute(user, major);
                long endTime = System.nanoTime();
                
                totalTime += (endTime - startTime) / 1_000_000; // Conversion en millisecondes
            }
            
            long averageTime = totalTime / iterations;
            
            System.out.println("⚡ Stratégie Hybride - Temps moyen: " + averageTime + "ms");
            System.out.println("⚡ Stratégie Hybride - Temps total: " + totalTime + "ms pour " + iterations + " itérations");
            
            // Vérification que le temps moyen est acceptable
            assertTrue(averageTime < SINGLE_STRATEGY_THRESHOLD, 
                "La stratégie hybride doit être rapide (< " + SINGLE_STRATEGY_THRESHOLD + "ms), actuel: " + averageTime + "ms");
            
            // Vérification que le temps total est acceptable
            assertTrue(totalTime < BULK_OPERATION_THRESHOLD, 
                "100 exécutions doivent être rapides (< " + BULK_OPERATION_THRESHOLD + "ms), actuel: " + totalTime + "ms");
        }
        
        @Test
        @DisplayName("La stratégie euclidienne doit être performante")
        void testEuclideanStrategyPerformance() {
            long totalTime = 0;
            int iterations = 100;
            
            for (int i = 0; i < iterations; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
                
                long startTime = System.nanoTime();
                euclideanStrategy.execute(user, major);
                long endTime = System.nanoTime();
                
                totalTime += (endTime - startTime) / 1_000_000;
            }
            
            long averageTime = totalTime / iterations;
            
            System.out.println("⚡ Stratégie Euclidienne - Temps moyen: " + averageTime + "ms");
            System.out.println("⚡ Stratégie Euclidienne - Temps total: " + totalTime + "ms pour " + iterations + " itérations");
            
            assertTrue(averageTime < SINGLE_STRATEGY_THRESHOLD, 
                "La stratégie euclidienne doit être rapide (< " + SINGLE_STRATEGY_THRESHOLD + "ms), actuel: " + averageTime + "ms");
            assertTrue(totalTime < BULK_OPERATION_THRESHOLD, 
                "100 exécutions doivent être rapides (< " + BULK_OPERATION_THRESHOLD + "ms), actuel: " + totalTime + "ms");
        }
        
        @Test
        @DisplayName("La stratégie simple doit être performante")
        void testSimpleStrategyPerformance() {
            long totalTime = 0;
            int iterations = 100;
            
            for (int i = 0; i < iterations; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
                
                long startTime = System.nanoTime();
                simpleStrategy.execute(user, major);
                long endTime = System.nanoTime();
                
                totalTime += (endTime - startTime) / 1_000_000;
            }
            
            long averageTime = totalTime / iterations;
            
            System.out.println("⚡ Stratégie Simple - Temps moyen: " + averageTime + "ms");
            System.out.println("⚡ Stratégie Simple - Temps total: " + totalTime + "ms pour " + iterations + " itérations");
            
            assertTrue(averageTime < SINGLE_STRATEGY_THRESHOLD, 
                "La stratégie simple doit être rapide (< " + SINGLE_STRATEGY_THRESHOLD + "ms), actuel: " + averageTime + "ms");
            assertTrue(totalTime < BULK_OPERATION_THRESHOLD, 
                "100 exécutions doivent être rapides (< " + BULK_OPERATION_THRESHOLD + "ms), actuel: " + totalTime + "ms");
        }
        
        @Test
        @DisplayName("Comparaison des performances des stratégies")
        void testStrategyPerformanceComparison() {
            long hybridTime = measureStrategyPerformance(hybridStrategy, 50);
            long euclideanTime = measureStrategyPerformance(euclideanStrategy, 50);
            long simpleTime = measureStrategyPerformance(simpleStrategy, 50);
            
            System.out.println("🏁 Comparaison des performances (50 itérations):");
            System.out.println("  - Hybride: " + hybridTime + "ms");
            System.out.println("  - Euclidienne: " + euclideanTime + "ms");
            System.out.println("  - Simple: " + simpleTime + "ms");
            
            // La stratégie simple devrait être la plus rapide
            assertTrue(simpleTime <= euclideanTime, "La stratégie simple devrait être au moins aussi rapide que l'euclidienne");
            assertTrue(euclideanTime <= hybridTime, "La stratégie euclidienne devrait être au moins aussi rapide que l'hybride");
            
            // Vérification que toutes les stratégies respectent le seuil de performance
            assertTrue(simpleTime < BULK_OPERATION_THRESHOLD, "La stratégie simple doit respecter le seuil de performance");
            assertTrue(euclideanTime < BULK_OPERATION_THRESHOLD, "La stratégie euclidienne doit respecter le seuil de performance");
            assertTrue(hybridTime < BULK_OPERATION_THRESHOLD, "La stratégie hybride doit respecter le seuil de performance");
        }
    }
    
    @Nested
    @DisplayName("Tests de performance du service de calcul des scores")
    class ScoreCalculationPerformanceTests {
        
        @Test
        @DisplayName("Le service de calcul des scores doit être performant")
        void testScoreCalculationServicePerformance() {
            long totalTime = 0;
            int iterations = 50;
            
            for (int i = 0; i < iterations; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
                
                long startTime = System.nanoTime();
                scoreCalculationService.calculateFinalScore(user, major);
                long endTime = System.nanoTime();
                
                totalTime += (endTime - startTime) / 1_000_000;
            }
            
            long averageTime = totalTime / iterations;
            
            System.out.println("⚡ Service de Calcul des Scores - Temps moyen: " + averageTime + "ms");
            System.out.println("⚡ Service de Calcul des Scores - Temps total: " + totalTime + "ms pour " + iterations + " itérations");
            
            assertTrue(averageTime < SCORE_CALCULATION_THRESHOLD, 
                "Le service de calcul des scores doit être rapide (< " + SCORE_CALCULATION_THRESHOLD + "ms), actuel: " + averageTime + "ms");
            assertTrue(totalTime < BULK_OPERATION_THRESHOLD, 
                "50 calculs doivent être rapides (< " + BULK_OPERATION_THRESHOLD + "ms), actuel: " + totalTime + "ms");
        }
        
        @Test
        @DisplayName("Le service doit gérer efficacement les gros volumes")
        void testBulkScoreCalculationPerformance() {
            long startTime = System.currentTimeMillis();
            
            // Calcul de scores pour 1000 combinaisons utilisateur-majeure
            for (int i = 0; i < 1000; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
                scoreCalculationService.calculateFinalScore(user, major);
            }
            
            long endTime = System.currentTimeMillis();
            long totalTime = endTime - startTime;
            
            System.out.println("⚡ Gros Volume - 1000 calculs en " + totalTime + "ms");
            
            // 1000 calculs doivent prendre moins de 5 secondes
            assertTrue(totalTime < 5000, 
                "1000 calculs doivent être rapides (< 5s), actuel: " + totalTime + "ms");
        }
    }
    
    @Nested
    @DisplayName("Tests de performance du service de recommandation")
    class RecommendationPerformanceTests {
        
        @Test
        @DisplayName("Le service de recommandation doit être performant")
        void testRecommendationServicePerformance() {
            long totalTime = 0;
            int iterations = 20; // Moins d'itérations car plus coûteux
            
            for (int i = 0; i < iterations; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                
                long startTime = System.nanoTime();
                // Création des MatchingResult à partir des profils
                List<MatchingResult> matchingResults = createMatchingResults(user, testMajorProfiles);
                recommendationService.generateRecommendations(matchingResults);
                long endTime = System.nanoTime();
                
                totalTime += (endTime - startTime) / 1_000_000;
            }
            
            long averageTime = totalTime / iterations;
            
            System.out.println("⚡ Service de Recommandation - Temps moyen: " + averageTime + "ms");
            System.out.println("⚡ Service de Recommandation - Temps total: " + totalTime + "ms pour " + iterations + " itérations");
            
            assertTrue(averageTime < RECOMMENDATION_THRESHOLD, 
                "Le service de recommandation doit être rapide (< " + RECOMMENDATION_THRESHOLD + "ms), actuel: " + averageTime + "ms");
        }
        
        @Test
        @DisplayName("Le service doit gérer efficacement les gros volumes de majeures")
        void testLargeMajorVolumePerformance() {
            // Création d'un grand volume de majeures
            List<MajorProfileDTO> largeMajorList = generateTestMajorProfiles(200);
            
            long startTime = System.currentTimeMillis();
            
            // Génération de recommandations pour 50 utilisateurs avec 200 majeures
            for (int i = 0; i < 50; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                // Création des MatchingResult à partir des profils
                List<MatchingResult> matchingResults = createMatchingResults(user, largeMajorList);
                recommendationService.generateRecommendations(matchingResults);
            }
            
            long endTime = System.currentTimeMillis();
            long totalTime = endTime - startTime;
            
            System.out.println("⚡ Gros Volume de Majeures - 50 recommandations avec 200 majeures en " + totalTime + "ms");
            
            // 50 recommandations avec 200 majeures doivent prendre moins de 10 secondes
            assertTrue(totalTime < 10000, 
                "50 recommandations avec 200 majeures doivent être rapides (< 10s), actuel: " + totalTime + "ms");
        }
    }
    
    @Nested
    @DisplayName("Tests de performance globale")
    class GlobalPerformanceTests {
        
        @Test
        @DisplayName("Le système complet doit être performant")
        void testCompleteSystemPerformance() {
            long startTime = System.currentTimeMillis();
            
            // Simulation d'un flux complet d'orientation
            for (int i = 0; i < 100; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                
                // Calcul des scores pour toutes les majeures
                for (MajorProfileDTO major : testMajorProfiles) {
                    scoreCalculationService.calculateFinalScore(user, major);
                }
                
                // Génération de recommandations
                List<MatchingResult> matchingResults = createMatchingResults(user, testMajorProfiles);
                recommendationService.generateRecommendations(matchingResults);
            }
            
            long endTime = System.currentTimeMillis();
            long totalTime = endTime - startTime;
            
            System.out.println("⚡ Système Complet - 100 utilisateurs, 50 majeures, calculs + recommandations en " + totalTime + "ms");
            
            // Le système complet doit être performant
            assertTrue(totalTime < 15000, 
                "Le système complet doit être performant (< 15s), actuel: " + totalTime + "ms");
        }
        
        @Test
        @DisplayName("Test de charge avec utilisation intensive")
        void testLoadTest() {
            long startTime = System.currentTimeMillis();
            
            // Test de charge : beaucoup d'utilisateurs, beaucoup de majeures
            List<MajorProfileDTO> largeMajorList = generateTestMajorProfiles(300);
            
            for (int i = 0; i < 200; i++) {
                UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
                
                // Calcul de scores pour un sous-ensemble de majeures
                for (int j = 0; j < 100; j++) {
                    MajorProfileDTO major = largeMajorList.get(j);
                    scoreCalculationService.calculateFinalScore(user, major);
                }
            }
            
            long endTime = System.currentTimeMillis();
            long totalTime = endTime - startTime;
            
            System.out.println("⚡ Test de Charge - 200 utilisateurs, 100 majeures en " + totalTime + "ms");
            
            // Le test de charge doit être performant
            assertTrue(totalTime < 20000, 
                "Le test de charge doit être performant (< 20s), actuel: " + totalTime + "ms");
        }
    }
    
    // ==================== MÉTHODES UTILITAIRES ====================
    
    /**
     * Mesure la performance d'une stratégie sur un nombre d'itérations donné
     */
    private long measureStrategyPerformance(com.dira.diravenir1.service.interfaces.MatchingStrategy strategy, int iterations) {
        long totalTime = 0;
        
        for (int i = 0; i < iterations; i++) {
            UserProfileDTO user = testUserProfiles.get(i % testUserProfiles.size());
            MajorProfileDTO major = testMajorProfiles.get(i % testMajorProfiles.size());
            
            long startTime = System.nanoTime();
            strategy.execute(user, major);
            long endTime = System.nanoTime();
            
            totalTime += (endTime - startTime) / 1_000_000;
        }
        
        return totalTime;
    }
    
    /**
     * Génère des profils utilisateur de test
     */
    private List<UserProfileDTO> generateTestUserProfiles(int count) {
        List<UserProfileDTO> profiles = new ArrayList<>();
        
        for (int i = 0; i < count; i++) {
            UserProfileDTO profile = new UserProfileDTO();
            profile.setInteretScientifiqueTech(random.nextInt(5) + 1);
            profile.setInteretArtistiqueCreatif(random.nextInt(5) + 1);
            profile.setInteretSocialHumain(random.nextInt(5) + 1);
            profile.setInteretBusinessGestion(random.nextInt(5) + 1);
            profile.setInteretLogiqueAnalytique(random.nextInt(5) + 1);
            profile.setCompetenceResolutionProblemes(random.nextInt(5) + 1);
            profile.setCompetenceCommunication(random.nextInt(5) + 1);
            profile.setCompetenceOrganisation(random.nextInt(5) + 1);
            profile.setCompetenceManuelTechnique(random.nextInt(5) + 1);
            profile.setValeurImpactSocietal(random.nextInt(5) + 1);
            profile.setValeurInnovationChallenge(random.nextInt(5) + 1);
            profile.setValeurStabiliteSecurite(random.nextInt(5) + 1);
            profile.setValeurAutonomie(random.nextInt(5) + 1);
            profile.setPrefTravailEquipeCollab(random.nextInt(5) + 1);
            profile.setPrefTravailAutonome(random.nextInt(5) + 1);
            profile.setPrefPratiqueTerrain(random.nextInt(5) + 1);
            profile.setPrefTheorieRecherche(random.nextInt(5) + 1);
            
            profiles.add(profile);
        }
        
        return profiles;
    }
    
    /**
     * Génère des profils majeure de test
     */
    private List<MajorProfileDTO> generateTestMajorProfiles(int count) {
        List<MajorProfileDTO> profiles = new ArrayList<>();
        String[] majorTypes = {"Informatique", "Arts", "Business", "Médecine", "Ingénierie", "Sciences", "Lettres", "Droit"};
        
        for (int i = 0; i < count; i++) {
            MajorProfileDTO profile = new MajorProfileDTO();
            profile.setMajorName(majorTypes[i % majorTypes.length] + " " + (i + 1));
            profile.setInteretScientifiqueTech(random.nextInt(5) + 1);
            profile.setInteretArtistiqueCreatif(random.nextInt(5) + 1);
            profile.setInteretSocialHumain(random.nextInt(5) + 1);
            profile.setInteretBusinessGestion(random.nextInt(5) + 1);
            profile.setInteretLogiqueAnalytique(random.nextInt(5) + 1);
            profile.setCompetenceResolutionProblemes(random.nextInt(5) + 1);
            profile.setCompetenceCommunication(random.nextInt(5) + 1);
            profile.setCompetenceOrganisation(random.nextInt(5) + 1);
            profile.setCompetenceManuelTechnique(random.nextInt(5) + 1);
            profile.setValeurImpactSocietal(random.nextInt(5) + 1);
            profile.setValeurInnovationChallenge(random.nextInt(5) + 1);
            profile.setValeurStabiliteSecurite(random.nextInt(5) + 1);
            profile.setValeurAutonomie(random.nextInt(5) + 1);
            profile.setPrefTravailEquipeCollab(random.nextInt(5) + 1);
            profile.setPrefTravailAutonome(random.nextInt(5) + 1);
            profile.setPrefPratiqueTerrain(random.nextInt(5) + 1);
            profile.setPrefTheorieRecherche(random.nextInt(5) + 1);
            
            profiles.add(profile);
        }
        
        return profiles;
    }
    
    /**
     * Crée des MatchingResult à partir d'un profil utilisateur et d'une liste de majeures
     */
    private List<MatchingResult> createMatchingResults(UserProfileDTO user, List<MajorProfileDTO> majors) {
        List<MatchingResult> results = new ArrayList<>();
        
        for (MajorProfileDTO major : majors) {
            // Calcul des scores avec la stratégie hybride par défaut
            double euclideanScore = euclideanStrategy.execute(user, major);
            double forceAnalysisScore = 0.5; // Score par défaut pour les tests
            double criticalPillarScore = 0.5; // Score par défaut pour les tests
            
            // Calcul du score global (moyenne pondérée)
            double globalScore = (euclideanScore * 0.6 + forceAnalysisScore * 0.25 + criticalPillarScore * 0.15);
            
            MatchingResult result = MatchingResult.builder()
                .majorId("TEST_" + major.getMajorName().replace(" ", "_"))
                .majorName(major.getMajorName())
                .majorCategory("Test")
                .globalScore(globalScore)
                .euclideanScore(euclideanScore)
                .forceAnalysisScore(forceAnalysisScore)
                .criticalPillarScore(criticalPillarScore)
                .algorithmUsed("Hybrid")
                .processingTimeMs(0)
                .matchingDate("2025-08-18")
                .build();
                
            results.add(result);
        }
        
        return results;
    }
}
