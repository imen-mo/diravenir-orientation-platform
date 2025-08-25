package com.dira.diravenir1.service.integration;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.ScoreCalculationService;
import com.dira.diravenir1.service.calculators.EuclideanScoreCalculator;
import com.dira.diravenir1.service.calculators.ForceAnalysisCalculator;
import com.dira.diravenir1.service.calculators.CriticalPillarCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests d'intégration pour le service de calcul des scores.
 * 
 * Ces tests valident l'intégration complète entre :
 * - Le service de calcul des scores
 * - Tous les calculateurs disponibles
 * - La découverte automatique des composants
 * - La configuration et les poids
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests d'intégration du service de calcul des scores")
class ScoreCalculationServiceIntegrationTest {
    
    @Autowired
    private ScoreCalculationService scoreCalculationService;
    
    @Autowired
    private EuclideanScoreCalculator euclideanCalculator;
    
    @Autowired
    private ForceAnalysisCalculator forceAnalysisCalculator;
    
    @Autowired
    private CriticalPillarCalculator criticalPillarCalculator;
    
    private UserProfileDTO userProfile;
    private MajorProfileDTO majorProfile;
    
    @BeforeEach
    void setUp() {
        userProfile = createTestUserProfile();
        majorProfile = createTestInformatiqueMajor();
    }
    
    @Nested
    @DisplayName("Tests d'intégration de base")
    class BasicIntegrationTests {
        
        @Test
        @DisplayName("Le service doit être correctement injecté")
        void testServiceInjection() {
            assertNotNull(scoreCalculationService, "Le service doit être injecté");
            assertNotNull(euclideanCalculator, "Le calculateur euclidien doit être injecté");
            assertNotNull(forceAnalysisCalculator, "Le calculateur d'analyse des forces doit être injecté");
            assertNotNull(criticalPillarCalculator, "Le calculateur des piliers critiques doit être injecté");
        }
        
        @Test
        @DisplayName("Le service doit découvrir automatiquement tous les calculateurs")
        void testAutomaticDiscovery() {
            var availableCalculators = scoreCalculationService.getAvailableCalculators();
            var activeCalculators = scoreCalculationService.getActiveCalculators();
            
            assertNotNull(availableCalculators, "La liste des calculateurs disponibles ne doit pas être null");
            assertNotNull(activeCalculators, "La liste des calculateurs actifs ne doit pas être null");
            
            // Vérification qu'au moins 3 calculateurs sont disponibles
            assertTrue(availableCalculators.size() >= 3, 
                "Au moins 3 calculateurs doivent être disponibles");
            
            // Vérification qu'au moins 3 calculateurs sont actifs
            assertTrue(activeCalculators.size() >= 3, 
                "Au moins 3 calculateurs doivent être actifs");
        }
        
        @Test
        @DisplayName("Le service doit calculer un score final valide")
        void testFinalScoreCalculation() {
            double finalScore = scoreCalculationService.calculateFinalScore(userProfile, majorProfile);
            
            // Le score final doit être valide
            assertTrue(finalScore >= 0.0, "Le score final doit être >= 0");
            assertTrue(finalScore <= 1.0, "Le score final doit être <= 1");
            
            // Pour ce profil utilisateur et cette majeure, on s'attend à un bon score
            assertTrue(finalScore > 0.4, "Le score final devrait être > 40% pour ce profil");
            
            System.out.println("🎯 Score final calculé : " + (finalScore * 100) + "%");
        }
    }
    
    @Nested
    @DisplayName("Tests de découverte automatique")
    class AutoDiscoveryTests {
        
        @Test
        @DisplayName("Le service doit identifier tous les calculateurs par nom")
        void testCalculatorIdentification() {
            assertTrue(scoreCalculationService.isCalculatorAvailable("Euclidean Score Calculator"),
                "Le calculateur euclidien doit être identifiable");
            assertTrue(scoreCalculationService.isCalculatorAvailable("Force Analysis Calculator"),
                "Le calculateur d'analyse des forces doit être identifiable");
            assertTrue(scoreCalculationService.isCalculatorAvailable("Critical Pillar Calculator"),
                "Le calculateur des piliers critiques doit être identifiable");
        }
        
        @Test
        @DisplayName("Le service doit retourner la liste des calculateurs actifs")
        void testActiveCalculatorsList() {
            var activeCalculators = scoreCalculationService.getActiveCalculators();
            
            // Vérification que tous les calculateurs attendus sont présents
            boolean hasEuclidean = activeCalculators.stream()
                .anyMatch(calc -> calc.getCalculatorName().equals("Euclidean Score Calculator"));
            boolean hasForceAnalysis = activeCalculators.stream()
                .anyMatch(calc -> calc.getCalculatorName().equals("Force Analysis Calculator"));
            boolean hasCriticalPillar = activeCalculators.stream()
                .anyMatch(calc -> calc.getCalculatorName().equals("Critical Pillar Calculator"));
            
            assertTrue(hasEuclidean, "Le calculateur euclidien doit être actif");
            assertTrue(hasForceAnalysis, "Le calculateur d'analyse des forces doit être actif");
            assertTrue(hasCriticalPillar, "Le calculateur des piliers critiques doit être actif");
        }
    }
    
    @Nested
    @DisplayName("Tests de configuration et poids")
    class ConfigurationAndWeightsTests {
        
        @Test
        @DisplayName("Les calculateurs doivent avoir des poids valides")
        void testCalculatorWeights() {
            double euclideanWeight = euclideanCalculator.getWeight();
            double forceWeight = forceAnalysisCalculator.getWeight();
            double criticalWeight = criticalPillarCalculator.getWeight();
            
            // Vérification que tous les poids sont valides
            assertTrue(euclideanWeight > 0.0, "Le poids euclidien doit être > 0");
            assertTrue(forceWeight > 0.0, "Le poids d'analyse des forces doit être > 0");
            assertTrue(criticalWeight > 0.0, "Le poids des piliers critiques doit être > 0");
            
            // Vérification que la somme des poids est proche de 1.0
            double totalWeight = euclideanWeight + forceWeight + criticalWeight;
            assertTrue(Math.abs(totalWeight - 1.0) < 0.1, 
                "La somme des poids doit être proche de 1.0, actuel: " + totalWeight);
            
            System.out.println("⚖️ Poids des calculateurs - Euclidien: " + (euclideanWeight * 100) + 
                "%, Forces: " + (forceWeight * 100) + "%, Critique: " + (criticalWeight * 100) + "%");
        }
        
        @Test
        @DisplayName("Les calculateurs doivent être activés par défaut")
        void testDefaultActivation() {
            assertTrue(euclideanCalculator.isEnabled(), "Le calculateur euclidien doit être activé par défaut");
            assertTrue(forceAnalysisCalculator.isEnabled(), "Le calculateur d'analyse des forces doit être activé par défaut");
            assertTrue(criticalPillarCalculator.isEnabled(), "Le calculateur des piliers critiques doit être activé par défaut");
        }
    }
    
    @Nested
    @DisplayName("Tests de performance et robustesse")
    class PerformanceAndRobustnessTests {
        
        @Test
        @DisplayName("Le service doit être performant")
        void testPerformance() {
            long startTime = System.currentTimeMillis();
            
            // Exécution multiple pour tester la performance
            for (int i = 0; i < 50; i++) {
                scoreCalculationService.calculateFinalScore(userProfile, majorProfile);
            }
            
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            // 50 exécutions doivent prendre moins de 2 secondes
            assertTrue(executionTime < 2000, 
                "50 exécutions doivent prendre moins de 2 secondes, temps actuel: " + executionTime + "ms");
            
            System.out.println("⚡ Performance - 50 exécutions en " + executionTime + "ms");
        }
        
        @Test
        @DisplayName("Le service doit gérer les profils avec des données invalides")
        void testInvalidDataHandling() {
            // Création d'un profil utilisateur avec des scores invalides
            UserProfileDTO invalidUser = createTestUserProfile();
            invalidUser.setInteretScientifiqueTech(-1); // Score invalide
            
            assertDoesNotThrow(() -> {
                double score = scoreCalculationService.calculateFinalScore(invalidUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            }, "Le service doit gérer gracieusement les données invalides");
        }
        
        @Test
        @DisplayName("Le service doit gérer les profils null")
        void testNullProfileHandling() {
            assertDoesNotThrow(() -> {
                double score = scoreCalculationService.calculateFinalScore(null, majorProfile);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil utilisateur null");
            }, "Le service doit gérer gracieusement les profils null");
            
            assertDoesNotThrow(() -> {
                double score = scoreCalculationService.calculateFinalScore(userProfile, null);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil majeure null");
            }, "Le service doit gérer gracieusement les profils null");
        }
    }
    
    @Nested
    @DisplayName("Tests de différents types de majeures")
    class DifferentMajorTypesTests {
        
        @Test
        @DisplayName("Le service doit traiter différents types de majeures")
        void testDifferentMajorTypes() {
            // Test avec majeure informatique
            double scoreInformatique = scoreCalculationService.calculateFinalScore(userProfile, majorProfile);
            
            // Test avec majeure arts
            MajorProfileDTO artsMajor = createTestArtsMajor();
            double scoreArts = scoreCalculationService.calculateFinalScore(userProfile, artsMajor);
            
            // Test avec majeure business
            MajorProfileDTO businessMajor = createTestBusinessMajor();
            double scoreBusiness = scoreCalculationService.calculateFinalScore(userProfile, businessMajor);
            
            // Vérification que tous les scores sont valides
            assertTrue(scoreInformatique >= 0.0 && scoreInformatique <= 1.0);
            assertTrue(scoreArts >= 0.0 && scoreArts <= 1.0);
            assertTrue(scoreBusiness >= 0.0 && scoreBusiness <= 1.0);
            
            // Les scores doivent être différents (logique)
            assertNotEquals(scoreInformatique, scoreArts, 0.05);
            assertNotEquals(scoreInformatique, scoreBusiness, 0.05);
            assertNotEquals(scoreArts, scoreBusiness, 0.05);
            
            System.out.println("🎓 Scores par type de majeure:");
            System.out.println("  - Informatique: " + (scoreInformatique * 100) + "%");
            System.out.println("  - Arts: " + (scoreArts * 100) + "%");
            System.out.println("  - Business: " + (scoreBusiness * 100) + "%");
        }
        
        @Test
        @DisplayName("Le service doit donner des scores cohérents avec le profil utilisateur")
        void testScoreConsistency() {
            // L'utilisateur a un profil scientifique, donc meilleur score pour informatique
            MajorProfileDTO artsMajor = createTestArtsMajor();
            
            double scoreInformatique = scoreCalculationService.calculateFinalScore(userProfile, majorProfile);
            double scoreArts = scoreCalculationService.calculateFinalScore(userProfile, artsMajor);
            
            // Le score pour l'informatique devrait être plus élevé que pour les arts
            assertTrue(scoreInformatique > scoreArts, 
                "L'utilisateur scientifique devrait avoir un meilleur score pour l'informatique");
        }
    }
    
    // ==================== MÉTHODES UTILITAIRES ====================
    
    /**
     * Crée un profil utilisateur de test avec des scores équilibrés
     */
    private UserProfileDTO createTestUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(4);
        profile.setInteretArtistiqueCreatif(2);
        profile.setInteretSocialHumain(3);
        profile.setInteretBusinessGestion(2);
        profile.setInteretLogiqueAnalytique(5);
        profile.setCompetenceResolutionProblemes(4);
        profile.setCompetenceCommunication(3);
        profile.setCompetenceOrganisation(3);
        profile.setCompetenceManuelTechnique(4);
        profile.setValeurImpactSocietal(3);
        profile.setValeurInnovationChallenge(4);
        profile.setValeurStabiliteSecurite(2);
        profile.setValeurAutonomie(4);
        profile.setPrefTravailEquipeCollab(3);
        profile.setPrefTravailAutonome(4);
        profile.setPrefPratiqueTerrain(4);
        profile.setPrefTheorieRecherche(3);
        return profile;
    }
    
    /**
     * Crée un profil majeure informatique de test
     */
    private MajorProfileDTO createTestInformatiqueMajor() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Informatique");
        major.setInteretScientifiqueTech(5);
        major.setInteretArtistiqueCreatif(2);
        major.setInteretSocialHumain(2);
        major.setInteretBusinessGestion(2);
        major.setInteretLogiqueAnalytique(5);
        major.setCompetenceResolutionProblemes(5);
        major.setCompetenceCommunication(3);
        major.setCompetenceOrganisation(3);
        major.setCompetenceManuelTechnique(4);
        major.setValeurImpactSocietal(3);
        major.setValeurInnovationChallenge(4);
        major.setValeurStabiliteSecurite(2);
        major.setValeurAutonomie(4);
        major.setPrefTravailEquipeCollab(2);
        major.setPrefTravailAutonome(4);
        major.setPrefPratiqueTerrain(3);
        major.setPrefTheorieRecherche(4);
        return major;
    }
    
    /**
     * Crée un profil majeure arts de test
     */
    private MajorProfileDTO createTestArtsMajor() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Arts");
        major.setInteretScientifiqueTech(1);
        major.setInteretArtistiqueCreatif(5);
        major.setInteretSocialHumain(3);
        major.setInteretBusinessGestion(1);
        major.setInteretLogiqueAnalytique(2);
        major.setCompetenceResolutionProblemes(2);
        major.setCompetenceCommunication(4);
        major.setCompetenceOrganisation(2);
        major.setCompetenceManuelTechnique(5);
        major.setValeurImpactSocietal(4);
        major.setValeurInnovationChallenge(5);
        major.setValeurStabiliteSecurite(2);
        major.setValeurAutonomie(4);
        major.setPrefTravailEquipeCollab(3);
        major.setPrefTravailAutonome(4);
        major.setPrefPratiqueTerrain(5);
        major.setPrefTheorieRecherche(2);
        return major;
    }
    
    /**
     * Crée un profil majeure business de test
     */
    private MajorProfileDTO createTestBusinessMajor() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Business Administration");
        major.setInteretScientifiqueTech(2);
        major.setInteretArtistiqueCreatif(2);
        major.setInteretSocialHumain(4);
        major.setInteretBusinessGestion(5);
        major.setInteretLogiqueAnalytique(3);
        major.setCompetenceResolutionProblemes(3);
        major.setCompetenceCommunication(5);
        major.setCompetenceOrganisation(5);
        major.setCompetenceManuelTechnique(2);
        major.setValeurImpactSocietal(3);
        major.setValeurInnovationChallenge(4);
        major.setValeurStabiliteSecurite(4);
        major.setValeurAutonomie(3);
        major.setPrefTravailEquipeCollab(5);
        major.setPrefTravailAutonome(3);
        major.setPrefPratiqueTerrain(3);
        major.setPrefTheorieRecherche(2);
        return major;
    }
}
