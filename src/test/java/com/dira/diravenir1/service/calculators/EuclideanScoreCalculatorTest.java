package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitaires complets pour le calculateur de score euclidien.
 * 
 * Ces tests valident que le calculateur respecte le principe OCP :
 * - Extensible sans modification
 * - Comportement prévisible et testable
 * - Gestion des erreurs robuste
 * - Calculs de distance euclidienne corrects
 */
@DisplayName("Tests complets du calculateur de score euclidien")
class EuclideanScoreCalculatorTest {
    
    private EuclideanScoreCalculator calculator;
    private UserProfileDTO userProfile;
    private MajorProfileDTO majorProfile;
    
    @BeforeEach
    void setUp() {
        calculator = new EuclideanScoreCalculator();
        userProfile = createTestUserProfile();
        majorProfile = createTestInformatiqueMajor();
    }
    
    @Nested
    @DisplayName("Tests de base du calculateur")
    class BasicTests {
        
        @Test
        @DisplayName("Le calculateur doit retourner un nom")
        void testGetCalculatorName() {
            String calculatorName = calculator.getCalculatorName();
            assertNotNull(calculatorName);
            assertFalse(calculatorName.isEmpty());
            assertEquals("Euclidean Score Calculator", calculatorName);
        }
        
        @Test
        @DisplayName("Le calculateur doit avoir un poids défini")
        void testGetWeight() {
            double weight = calculator.getWeight();
            assertTrue(weight > 0.0);
            assertTrue(weight <= 1.0);
            assertEquals(0.6, weight, 0.001); // Poids par défaut selon l'implémentation
        }
        
        @Test
        @DisplayName("Le calculateur doit avoir une description")
        void testGetDescription() {
            String description = calculator.getDescription();
            assertNotNull(description);
            assertFalse(description.isEmpty());
        }
        
        @Test
        @DisplayName("Le calculateur doit être activé par défaut")
        void testIsEnabled() {
            boolean enabled = calculator.isEnabled();
            assertTrue(enabled, "Le calculateur doit être activé par défaut");
        }
        
        @Test
        @DisplayName("Le calculateur doit exécuter sans erreur")
        void testCalculateWithoutError() {
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(userProfile, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de validation des scores")
    class ScoreValidationTests {
        
        @Test
        @DisplayName("Le calculateur doit retourner un score valide entre 0 et 1")
        void testCalculateReturnsValidScore() {
            double score = calculator.calculate(userProfile, majorProfile);
            
            // Le score doit être entre 0 et 1 (0% à 100%)
            assertTrue(score >= 0.0, "Le score doit être >= 0");
            assertTrue(score <= 1.0, "Le score doit être <= 1");
            
            // Pour ce profil utilisateur et cette majeure, on s'attend à un bon score
            // car l'utilisateur a des compétences scientifiques et logiques élevées
            assertTrue(score > 0.5, "Le score devrait être > 50% pour ce profil");
        }
        
        @Test
        @DisplayName("Le calculateur doit être cohérent entre plusieurs exécutions")
        void testCalculateIsConsistent() {
            double score1 = calculator.calculate(userProfile, majorProfile);
            double score2 = calculator.calculate(userProfile, majorProfile);
            
            // Les scores doivent être identiques pour les mêmes profils
            assertEquals(score1, score2, 0.001, "Les scores doivent être identiques");
        }
        
        @Test
        @DisplayName("Le calculateur doit donner des scores différents pour des profils différents")
        void testCalculateGivesDifferentScores() {
            // Création d'un profil majeure différent (Arts)
            MajorProfileDTO artsMajor = createTestArtsMajor();
            
            double scoreInformatique = calculator.calculate(userProfile, majorProfile);
            double scoreArts = calculator.calculate(userProfile, artsMajor);
            
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
        @DisplayName("Le calculateur doit calculer correctement la distance euclidienne")
        void testEuclideanDistanceCalculation() {
            // Création de profils avec des scores très différents
            UserProfileDTO user1 = createTestUserProfile();
            UserProfileDTO user2 = createTestUserProfile();
            
            // Modification d'un seul score pour tester la sensibilité
            user2.setInteretScientifiqueTech(1); // Très différent de user1 (4)
            
            double score1 = calculator.calculate(user1, majorProfile);
            double score2 = calculator.calculate(user2, majorProfile);
            
            // Le score de user2 doit être plus faible car plus éloigné de la majeure
            assertTrue(score1 > score2, 
                "Le profil plus proche doit avoir un meilleur score");
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils identiques")
        void testIdenticalProfiles() {
            // Création d'un profil majeure identique au profil utilisateur
            MajorProfileDTO identicalMajor = createTestMajorWithSameScores();
            
            double score = calculator.calculate(userProfile, identicalMajor);
            
            // Le score doit être très élevé (proche de 1.0) pour des profils identiques
            assertTrue(score > 0.9, 
                "Des profils identiques doivent avoir un score très élevé (> 90%)");
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils très différents")
        void testVeryDifferentProfiles() {
            // Création d'un profil majeure très différent
            MajorProfileDTO veryDifferentMajor = createTestArtsMajor();
            
            double score = calculator.calculate(userProfile, veryDifferentMajor);
            
            // Le score doit être plus faible pour des profils très différents
            assertTrue(score < 0.7, 
                "Des profils très différents doivent avoir un score plus faible (< 70%)");
        }
        
        @Test
        @DisplayName("Le calculateur doit être sensible aux différences de scores")
        void testScoreSensitivity() {
            // Création de profils avec des différences subtiles
            UserProfileDTO user1 = createTestUserProfile();
            UserProfileDTO user2 = createTestUserProfile();
            
            // Modification subtile d'un score
            user2.setInteretLogiqueAnalytique(4); // Au lieu de 5
            
            double score1 = calculator.calculate(user1, majorProfile);
            double score2 = calculator.calculate(user2, majorProfile);
            
            // Les scores doivent être différents mais proches
            assertNotEquals(score1, score2, 0.01);
            assertTrue(Math.abs(score1 - score2) < 0.1, 
                "La différence de score doit être subtile pour des profils similaires");
        }
    }
    
    @Nested
    @DisplayName("Tests de gestion des erreurs")
    class ErrorHandlingTests {
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils null")
        void testCalculateWithNullProfiles() {
            // Test avec profil utilisateur null
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(null, majorProfile);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil utilisateur null");
            });
            
            // Test avec profil majeure null
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(userProfile, null);
                assertEquals(0.0, score, "Le score doit être 0 avec un profil majeure null");
            });
            
            // Test avec les deux profils null
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(null, null);
                assertEquals(0.0, score, "Le score doit être 0 avec les deux profils null");
            });
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils avec données invalides")
        void testCalculateWithInvalidData() {
            // Création d'un profil utilisateur avec des scores invalides
            UserProfileDTO invalidUser = createTestUserProfile();
            invalidUser.setInteretScientifiqueTech(-1); // Score invalide
            
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(invalidUser, majorProfile);
                // Le calculateur doit gérer gracieusement les données invalides
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils avec des scores manquants")
        void testCalculateWithMissingScores() {
            // Création d'un profil avec des scores manquants (0)
            UserProfileDTO incompleteUser = createTestUserProfile();
            incompleteUser.setInteretScientifiqueTech(0); // Score manquant
            
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(incompleteUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de différents types de majeures")
    class DifferentMajorTypesTests {
        
        @Test
        @DisplayName("Le calculateur doit traiter différents types de majeures")
        void testDifferentMajorTypes() {
            // Test avec majeure informatique
            double scoreInformatique = calculator.calculate(userProfile, majorProfile);
            
            // Test avec majeure business
            MajorProfileDTO businessMajor = createTestBusinessMajor();
            double scoreBusiness = calculator.calculate(userProfile, businessMajor);
            
            // Test avec majeure médecine
            MajorProfileDTO medecineMajor = createTestMedecineMajor();
            double scoreMedecine = calculator.calculate(userProfile, medecineMajor);
            
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
        @DisplayName("Le calculateur doit respecter la propriété de symétrie")
        void testSymmetryProperty() {
            // La distance euclidienne doit être symétrique
            double score1 = calculator.calculate(userProfile, majorProfile);
            
            // Création d'un profil utilisateur avec les scores de la majeure pour tester la symétrie
            UserProfileDTO userWithMajorScores = createUserProfileFromMajor(majorProfile);
            // Création d'un profil majeure avec les scores de l'utilisateur pour tester la symétrie
            MajorProfileDTO majorWithUserScores = createMajorProfileFromUser(userProfile);
            double score2 = calculator.calculate(userWithMajorScores, majorWithUserScores);
            
            // Les scores doivent être identiques (symétrie)
            assertEquals(score1, score2, 0.001, "La distance euclidienne doit être symétrique");
        }
    }
    
    @Nested
    @DisplayName("Tests de respect du principe OCP")
    class OCPComplianceTests {
        
        @Test
        @DisplayName("Le calculateur doit respecter le principe OCP")
        void testRespectsOCP() {
            // Test que le calculateur peut être utilisé polymorphiquement
            assertTrue(calculator instanceof com.dira.diravenir1.service.calculators.ScoreCalculator);
            
            // Test que l'interface est respectée
            com.dira.diravenir1.service.calculators.ScoreCalculator interfaceCalculator = calculator;
            double score = interfaceCalculator.calculate(userProfile, majorProfile);
            assertTrue(score >= 0.0 && score <= 1.0);
            
            // Test que le nom du calculateur est accessible via l'interface
            String calculatorName = interfaceCalculator.getCalculatorName();
            assertEquals("Euclidean Score Calculator", calculatorName);
            
            // Test que le poids est accessible via l'interface
            double weight = interfaceCalculator.getWeight();
            assertEquals(0.6, weight, 0.001);
        }
        
        @Test
        @DisplayName("Le calculateur doit être extensible sans modification")
        void testExtensibility() {
            // Test que le calculateur peut être étendu via l'interface
            com.dira.diravenir1.service.calculators.ScoreCalculator baseCalculator = calculator;
            
            // Test que toutes les méthodes de l'interface sont implémentées
            assertDoesNotThrow(() -> {
                double score = baseCalculator.calculate(userProfile, majorProfile);
                String name = baseCalculator.getCalculatorName();
                double weight = baseCalculator.getWeight();
                boolean enabled = baseCalculator.isEnabled();
                String description = baseCalculator.getDescription();
                
                // Vérification que toutes les méthodes retournent des valeurs valides
                assertTrue(score >= 0.0 && score <= 1.0);
                assertNotNull(name);
                assertTrue(weight > 0.0);
                assertTrue(enabled); // Par défaut activé
                assertNotNull(description);
            });
        }
    }
    
    @Nested
    @DisplayName("Tests de performance et robustesse")
    class PerformanceAndRobustnessTests {
        
        @Test
        @DisplayName("Le calculateur doit être performant")
        void testPerformance() {
            long startTime = System.currentTimeMillis();
            
            // Exécution multiple pour tester la performance
            for (int i = 0; i < 100; i++) {
                calculator.calculate(userProfile, majorProfile);
            }
            
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            // 100 exécutions doivent prendre moins de 1 seconde
            assertTrue(executionTime < 1000, 
                "100 exécutions doivent prendre moins de 1 seconde, temps actuel: " + executionTime + "ms");
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils avec des scores extrêmes")
        void testExtremeScores() {
            // Création d'un profil avec des scores extrêmes
            UserProfileDTO extremeUser = createTestUserProfile();
            extremeUser.setInteretScientifiqueTech(5); // Score maximum
            extremeUser.setInteretArtistiqueCreatif(1); // Score minimum
            
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(extremeUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils avec des scores manquants")
        void testMissingScores() {
            // Création d'un profil avec des scores manquants (0)
            UserProfileDTO incompleteUser = createTestUserProfile();
            incompleteUser.setInteretScientifiqueTech(0); // Score manquant
            
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(incompleteUser, majorProfile);
                assertTrue(score >= 0.0 && score <= 1.0);
            });
        }
        
        @Test
        @DisplayName("Le calculateur doit gérer les profils avec des scores négatifs")
        void testNegativeScores() {
            // Création d'un profil avec des scores négatifs
            UserProfileDTO negativeUser = createTestUserProfile();
            negativeUser.setInteretScientifiqueTech(-2); // Score négatif
            
            assertDoesNotThrow(() -> {
                double score = calculator.calculate(negativeUser, majorProfile);
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
    
    /**
     * Crée un profil majeure médecine de test
     */
    private MajorProfileDTO createTestMedecineMajor() {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Médecine");
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
        major.setProgram("Identique");
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
    
    /**
     * Crée un profil utilisateur avec les scores d'une majeure (pour tester la symétrie)
     */
    private UserProfileDTO createUserProfileFromMajor(MajorProfileDTO major) {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(major.getInteretScientifiqueTech());
        profile.setInteretArtistiqueCreatif(major.getInteretArtistiqueCreatif());
        profile.setInteretSocialHumain(major.getInteretSocialHumain());
        profile.setInteretBusinessGestion(major.getInteretBusinessGestion());
        profile.setInteretLogiqueAnalytique(major.getInteretLogiqueAnalytique());
        profile.setCompetenceResolutionProblemes(major.getCompetenceResolutionProblemes());
        profile.setCompetenceCommunication(major.getCompetenceCommunication());
        profile.setCompetenceOrganisation(major.getCompetenceOrganisation());
        profile.setCompetenceManuelTechnique(major.getCompetenceManuelTechnique());
        profile.setValeurImpactSocietal(major.getValeurImpactSocietal());
        profile.setValeurInnovationChallenge(major.getValeurInnovationChallenge());
        profile.setValeurStabiliteSecurite(major.getValeurStabiliteSecurite());
        profile.setValeurAutonomie(major.getValeurAutonomie());
        profile.setPrefTravailEquipeCollab(major.getPrefTravailEquipeCollab());
        profile.setPrefTravailAutonome(major.getPrefTravailAutonome());
        profile.setPrefPratiqueTerrain(major.getPrefPratiqueTerrain());
        profile.setPrefTheorieRecherche(major.getPrefTheorieRecherche());
        return profile;
    }
    
    /**
     * Crée un profil majeure avec les scores d'un utilisateur (pour tester la symétrie)
     */
    private MajorProfileDTO createMajorProfileFromUser(UserProfileDTO user) {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setProgram("Miroir Utilisateur");
        major.setInteretScientifiqueTech(user.getInteretScientifiqueTech());
        major.setInteretArtistiqueCreatif(user.getInteretArtistiqueCreatif());
        major.setInteretSocialHumain(user.getInteretSocialHumain());
        major.setInteretBusinessGestion(user.getInteretBusinessGestion());
        major.setInteretLogiqueAnalytique(user.getInteretLogiqueAnalytique());
        major.setCompetenceResolutionProblemes(user.getCompetenceResolutionProblemes());
        major.setCompetenceCommunication(user.getCompetenceCommunication());
        major.setCompetenceOrganisation(user.getCompetenceOrganisation());
        major.setCompetenceManuelTechnique(user.getCompetenceManuelTechnique());
        major.setValeurImpactSocietal(user.getValeurImpactSocietal());
        major.setValeurInnovationChallenge(user.getValeurInnovationChallenge());
        major.setValeurStabiliteSecurite(user.getValeurStabiliteSecurite());
        major.setValeurAutonomie(user.getValeurAutonomie());
        major.setPrefTravailEquipeCollab(user.getPrefTravailEquipeCollab());
        major.setPrefTravailAutonome(user.getPrefTravailAutonome());
        major.setPrefPratiqueTerrain(user.getPrefPratiqueTerrain());
        major.setPrefTheorieRecherche(user.getPrefTheorieRecherche());
        return major;
    }
}
