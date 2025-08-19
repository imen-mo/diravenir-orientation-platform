package com.dira.diravenir1.service.strategies;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.strategies.EuclideanMatchingStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitaires complets pour la stratégie de matching euclidienne.
 * 
 * Ces tests valident que la stratégie respecte le principe OCP :
 * - Extensible sans modification
 * - Comportement prévisible et testable
 * - Gestion des erreurs robuste
 * - Calculs de distance euclidienne corrects
 */
@DisplayName("Tests complets de la stratégie de matching euclidienne")
class EuclideanMatchingStrategyTest {
    
    private EuclideanMatchingStrategy strategy;
    private UserProfileDTO userProfile;
    private MajorProfileDTO majorProfile;
    
    @BeforeEach
    void setUp() {
        strategy = new EuclideanMatchingStrategy();
        userProfile = createTestUserProfile();
        majorProfile = createTestInformatiqueMajor();
    }
    
    @Nested
    @DisplayName("Tests de base de la stratégie")
    class BasicTests {
        
        @Test
        @DisplayName("La stratégie doit retourner un nom d'algorithme")
        void testGetAlgorithmName() {
            String algorithmName = strategy.getAlgorithmName();
            assertNotNull(algorithmName);
            assertFalse(algorithmName.isEmpty());
            assertEquals("Euclidean Matching Strategy", algorithmName);
        }
        
        @Test
        @DisplayName("La stratégie doit avoir une priorité définie")
        void testGetPriority() {
            int priority = strategy.getPriority();
            assertTrue(priority > 0);
            assertEquals(1, priority); // Priorité haute selon l'implémentation
        }
        
        @Test
        @DisplayName("La stratégie doit exécuter sans erreur")
        void testExecuteWithoutError() {
            assertDoesNotThrow(() -> {
                double score = strategy.execute(userProfile, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de validation des scores")
    class ScoreValidationTests {
        
        @Test
        @DisplayName("La stratégie doit retourner un score valide entre 0 et 1")
        void testExecuteReturnsValidScore() {
            double score = strategy.execute(userProfile, majorProfile);
            
            // Le score doit être entre 0 et 1 (0% à 100%)
            assertTrue(score >= 0.0, "Le score doit être >= 0");
            assertTrue(score <= 1.0, "Le score doit être <= 1");
            
            // Pour ce profil utilisateur et cette majeure, on s'attend à un bon score
            // car l'utilisateur a des compétences scientifiques et logiques élevées
            assertTrue(score > 0.5, "Le score devrait être > 50% pour ce profil");
        }
        
        @Test
        @DisplayName("La stratégie doit être cohérente entre plusieurs exécutions")
        void testExecuteIsConsistent() {
            double score1 = strategy.execute(userProfile, majorProfile);
            double score2 = strategy.execute(userProfile, majorProfile);
            
            // Les scores doivent être identiques pour les mêmes profils
            assertEquals(score1, score2, 0.001, "Les scores doivent être identiques");
        }
        
        @Test
        @DisplayName("La stratégie doit donner des scores différents pour des profils différents")
        void testExecuteGivesDifferentScores() {
            // Création d'un profil majeure différent (Arts)
            MajorProfileDTO artsMajor = createTestArtsMajor();
            
            double scoreInformatique = strategy.execute(userProfile, majorProfile);
            double scoreArts = strategy.execute(userProfile, artsMajor);
            
            // Les scores doivent être différents car les profils sont très différents
            assertNotEquals(scoreInformatique, scoreArts, 0.1, "Les scores doivent être différents");
            
            // Le score pour l'informatique devrait être plus élevé que pour les arts
            // car l'utilisateur a un profil plus scientifique
            assertTrue(scoreInformatique > scoreArts, 
                "Le score pour l'informatique devrait être plus élevé que pour les arts");
        }
    }
    
    @Nested
    @DisplayName("Tests de calcul de distance euclidienne")
    class EuclideanDistanceTests {
        
        @Test
        @DisplayName("La stratégie doit calculer correctement la distance euclidienne")
        void testEuclideanDistanceCalculation() {
            // Création de profils avec des scores très différents
            UserProfileDTO user1 = createTestUserProfile();
            UserProfileDTO user2 = createTestUserProfile();
            
            // Modification d'un seul score pour tester la sensibilité
            user2.setInteretScientifiqueTech(1); // Très différent de user1 (4)
            
            double score1 = strategy.execute(user1, majorProfile);
            double score2 = strategy.execute(user2, majorProfile);
            
            // Le score de user2 doit être plus faible car plus éloigné de la majeure
            assertTrue(score1 > score2, 
                "Le profil plus proche doit avoir un meilleur score");
        }
        
        @Test
        @DisplayName("La stratégie doit gérer les profils identiques")
        void testIdenticalProfiles() {
            // Création d'un profil majeure identique au profil utilisateur
            MajorProfileDTO identicalMajor = createTestMajorWithSameScores();
            
            double score = strategy.execute(userProfile, identicalMajor);
            
            // Le score doit être très élevé (proche de 1.0) pour des profils identiques
            assertTrue(score > 0.9, 
                "Des profils identiques doivent avoir un score très élevé (> 90%)");
        }
        
        @Test
        @DisplayName("La stratégie doit gérer les profils très différents")
        void testVeryDifferentProfiles() {
            // Création d'un profil majeure très différent
            MajorProfileDTO veryDifferentMajor = createTestArtsMajor();
            
            double score = strategy.execute(userProfile, veryDifferentMajor);
            
            // Le score doit être plus faible pour des profils très différents
            assertTrue(score < 0.7, 
                "Des profils très différents doivent avoir un score plus faible (< 70%)");
        }
    }
    
    @Nested
    @DisplayName("Tests de gestion des erreurs")
    class ErrorHandlingTests {
        
        @Test
        @DisplayName("La stratégie doit gérer les profils null")
        void testExecuteWithNullProfiles() {
            // Test avec profil utilisateur null
            assertDoesNotThrow(() -> {
                double score = strategy.execute(null, majorProfile);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil utilisateur null");
            });
            
            // Test avec profil majeure null
            assertDoesNotThrow(() -> {
                double score = strategy.execute(userProfile, null);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil majeure null");
            });
            
            // Test avec les deux profils null
            assertDoesNotThrow(() -> {
                double score = strategy.execute(null, null);
                assertEquals(0.0, score, "Le score doit être 0 avec les deux profils null");
            });
        }
        
        @Test
        @DisplayName("La stratégie doit gérer les profils avec données invalides")
        void testExecuteWithInvalidData() {
            // Création d'un profil utilisateur avec des scores invalides
            UserProfileDTO invalidUser = createTestUserProfile();
            invalidUser.setInteretScientifiqueTech(-1); // Score invalide
            
            assertDoesNotThrow(() -> {
                double score = strategy.execute(invalidUser, majorProfile);
                // La stratégie doit gérer gracieusement les données invalides
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de différents types de majeures")
    class DifferentMajorTypesTests {
        
        @Test
        @DisplayName("La stratégie doit traiter différents types de majeures")
        void testDifferentMajorTypes() {
            // Test avec majeure informatique
            double scoreInformatique = strategy.execute(userProfile, majorProfile);
            
            // Test avec majeure business
            MajorProfileDTO businessMajor = createTestBusinessMajor();
            double scoreBusiness = strategy.execute(userProfile, businessMajor);
            
            // Test avec majeure médecine
            MajorProfileDTO medecineMajor = createTestMedecineMajor();
            double scoreMedecine = strategy.execute(userProfile, medecineMajor);
            
            // Vérification que tous les scores sont valides
            assertTrue(scoreInformatique >= 0.0 && scoreInformatique <= 1.0);
            assertTrue(scoreBusiness >= 0.0 && scoreBusiness <= 1.0);
            assertTrue(scoreMedecine >= 0.0 && scoreMedecine <= 1.0);
            
            // Les scores doivent être différents (logique)
            assertNotEquals(scoreInformatique, scoreBusiness, 0.05);
            assertNotEquals(scoreInformatique, scoreMedecine, 0.05);
            assertNotEquals(scoreBusiness, scoreMedecine, 0.05);
        }
        
        @Test
        @DisplayName("La stratégie doit être sensible aux différences de scores")
        void testScoreSensitivity() {
            // Création de profils avec des différences subtiles
            UserProfileDTO user1 = createTestUserProfile();
            UserProfileDTO user2 = createTestUserProfile();
            
            // Modification subtile d'un score
            user2.setInteretLogiqueAnalytique(4); // Au lieu de 5
            
            double score1 = strategy.execute(user1, majorProfile);
            double score2 = strategy.execute(user2, majorProfile);
            
            // Les scores doivent être différents mais proches
            assertNotEquals(score1, score2, 0.01);
            assertTrue(Math.abs(score1 - score2) < 0.1, 
                "La différence de score doit être subtile pour des profils similaires");
        }
    }
    
    @Nested
    @DisplayName("Tests de respect du principe OCP")
    class OCPComplianceTests {
        
        @Test
        @DisplayName("La stratégie doit respecter le principe OCP")
        void testRespectsOCP() {
            // Test que la stratégie peut être utilisée polymorphiquement
            assertTrue(strategy instanceof com.dira.diravenir1.service.interfaces.MatchingStrategy);
            
            // Test que l'interface est respectée
            com.dira.diravenir1.service.interfaces.MatchingStrategy interfaceStrategy = strategy;
            double score = interfaceStrategy.execute(userProfile, majorProfile);
            assertTrue(score >= 0.0 && score <= 1.0);
            
            // Test que le nom de l'algorithme est accessible via l'interface
            String algorithmName = interfaceStrategy.getAlgorithmName();
            assertEquals("Euclidean Matching Strategy", algorithmName);
            
            // Test que la priorité est accessible via l'interface
            int priority = interfaceStrategy.getPriority();
            assertEquals(1, priority);
        }
        
        @Test
        @DisplayName("La stratégie doit être extensible sans modification")
        void testExtensibility() {
            // Test que la stratégie peut être étendue via l'interface
            com.dira.diravenir1.service.interfaces.MatchingStrategy baseStrategy = strategy;
            
            // Test que toutes les méthodes de l'interface sont implémentées
            assertDoesNotThrow(() -> {
                double score = baseStrategy.execute(userProfile, majorProfile);
                String name = baseStrategy.getAlgorithmName();
                int priority = baseStrategy.getPriority();
                boolean enabled = baseStrategy.isEnabled();
                
                // Vérification que toutes les méthodes retournent des valeurs valides
                assertTrue(score >= 0.0 && score <= 1.0);
                assertNotNull(name);
                assertTrue(priority > 0);
                assertTrue(enabled); // Par défaut activée
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de performance et robustesse")
    class PerformanceAndRobustnessTests {
        
        @Test
        @DisplayName("La stratégie doit être performante")
        void testPerformance() {
            long startTime = System.currentTimeMillis();
            
            // Exécution multiple pour tester la performance
            for (int i = 0; i < 100; i++) {
                strategy.execute(userProfile, majorProfile);
            }
            
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            // 100 exécutions doivent prendre moins de 1 seconde
            assertTrue(executionTime < 1000, 
                "100 exécutions doivent prendre moins de 1 seconde, temps actuel: " + executionTime + "ms");
        }
        
        @Test
        @DisplayName("La stratégie doit gérer les profils avec des scores extrêmes")
        void testExtremeScores() {
            // Création d'un profil avec des scores extrêmes
            UserProfileDTO extremeUser = createTestUserProfile();
            extremeUser.setInteretScientifiqueTech(5); // Score maximum
            extremeUser.setInteretArtistiqueCreatif(1); // Score minimum
            
            assertDoesNotThrow(() -> {
                double score = strategy.execute(extremeUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
        
        @Test
        @DisplayName("La stratégie doit gérer les profils avec des scores manquants")
        void testMissingScores() {
            // Création d'un profil avec des scores manquants (0)
            UserProfileDTO incompleteUser = createTestUserProfile();
            incompleteUser.setInteretScientifiqueTech(0); // Score manquant
            
            assertDoesNotThrow(() -> {
                double score = strategy.execute(incompleteUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
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
        major.setMajorName("Informatique");
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
        major.setMajorName("Arts");
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
        major.setMajorName("Business Administration");
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
    
    /**
     * Crée un profil majeure médecine de test
     */
    private MajorProfileDTO createTestMedecineMajor() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setMajorName("Médecine");
        major.setInteretScientifiqueTech(4);
        major.setInteretArtistiqueCreatif(2);
        major.setInteretSocialHumain(5);
        major.setInteretBusinessGestion(2);
        major.setInteretLogiqueAnalytique(4);
        major.setCompetenceResolutionProblemes(4);
        major.setCompetenceCommunication(5);
        major.setCompetenceOrganisation(4);
        major.setCompetenceManuelTechnique(4);
        major.setValeurImpactSocietal(5);
        major.setValeurInnovationChallenge(3);
        major.setValeurStabiliteSecurite(4);
        major.setValeurAutonomie(3);
        major.setPrefTravailEquipeCollab(4);
        major.setPrefTravailAutonome(3);
        major.setPrefPratiqueTerrain(5);
        major.setPrefTheorieRecherche(4);
        return major;
    }
    
    /**
     * Crée un profil majeure avec les mêmes scores que le profil utilisateur de test
     */
    private MajorProfileDTO createTestMajorWithSameScores() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setMajorName("Identique");
        major.setInteretScientifiqueTech(4);
        major.setInteretArtistiqueCreatif(2);
        major.setInteretSocialHumain(3);
        major.setInteretBusinessGestion(2);
        major.setInteretLogiqueAnalytique(5);
        major.setCompetenceResolutionProblemes(4);
        major.setCompetenceCommunication(3);
        major.setCompetenceOrganisation(3);
        major.setCompetenceManuelTechnique(4);
        major.setValeurImpactSocietal(3);
        major.setValeurInnovationChallenge(4);
        major.setValeurStabiliteSecurite(2);
        major.setValeurAutonomie(4);
        major.setPrefTravailEquipeCollab(3);
        major.setPrefTravailAutonome(4);
        major.setPrefPratiqueTerrain(4);
        major.setPrefTheorieRecherche(3);
        return major;
    }
}
