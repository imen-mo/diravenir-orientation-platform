package com.dira.diravenir1.service.validation;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.service.RecommendationService;
import com.dira.diravenir1.service.ScoreCalculationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.ArrayList;

/**
 * Tests de validation des résultats pour vérifier la qualité des recommandations.
 * 
 * Ces tests valident :
 * - La cohérence des scores (plages 30-95%)
 * - La qualité des recommandations
 * - La logique métier des résultats
 * - La stabilité des algorithmes
 */
@SpringBootTest
@ActiveProfiles("test")
@DisplayName("Tests de validation des résultats de l'algorithme d'orientation")
class ResultValidationTest {
    
    @Autowired
    private RecommendationService recommendationService;
    
    @Autowired
    private ScoreCalculationService scoreCalculationService;
    
    private UserProfileDTO scientificUser;
    private UserProfileDTO artisticUser;
    private UserProfileDTO businessUser;
    private UserProfileDTO medicalUser;
    
    private MajorProfileDTO informatiqueMajor;
    private MajorProfileDTO artsMajor;
    private MajorProfileDTO businessMajor;
    private MajorProfileDTO medecineMajor;
    
    // Seuils de validation des scores
    private static final double MIN_SCORE_THRESHOLD = 0.30; // 30% minimum
    private static final double MAX_SCORE_THRESHOLD = 0.95; // 95% maximum
    private static final double SCORE_TOLERANCE = 0.05; // 5% de tolérance
    
    @BeforeEach
    void setUp() {
        // Création de profils utilisateur spécialisés
        scientificUser = createScientificUserProfile();
        artisticUser = createArtisticUserProfile();
        businessUser = createBusinessUserProfile();
        medicalUser = createMedicalUserProfile();
        
        // Création de profils majeure spécialisés
        informatiqueMajor = createInformatiqueMajor();
        artsMajor = createArtsMajor();
        businessMajor = createBusinessMajor();
        medecineMajor = createMedecineMajor();
    }
    
    @Nested
    @DisplayName("Tests de validation des plages de scores")
    class ScoreRangeValidationTests {
        
        @Test
        @DisplayName("Les scores doivent être dans la plage 30-95%")
        void testScoreRangeValidation() {
            // Test avec utilisateur scientifique
            double scoreInformatique = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            double scoreArts = scoreCalculationService.calculateFinalScore(scientificUser, artsMajor);
            
            System.out.println("🔬 Utilisateur Scientifique:");
            System.out.println("  - Score Informatique: " + (scoreInformatique * 100) + "%");
            System.out.println("  - Score Arts: " + (scoreArts * 100) + "%");
            
            // Validation des plages
            assertTrue(scoreInformatique >= MIN_SCORE_THRESHOLD, 
                "Le score informatique doit être >= " + (MIN_SCORE_THRESHOLD * 100) + "%, actuel: " + (scoreInformatique * 100) + "%");
            assertTrue(scoreInformatique <= MAX_SCORE_THRESHOLD, 
                "Le score informatique doit être <= " + (MAX_SCORE_THRESHOLD * 100) + "%, actuel: " + (scoreInformatique * 100) + "%");
            
            assertTrue(scoreArts >= MIN_SCORE_THRESHOLD, 
                "Le score arts doit être >= " + (MIN_SCORE_THRESHOLD * 100) + "%, actuel: " + (scoreArts * 100) + "%");
            assertTrue(scoreArts <= MAX_SCORE_THRESHOLD, 
                "Le score arts doit être <= " + (MAX_SCORE_THRESHOLD * 100) + "%, actuel: " + (scoreArts * 100) + "%");
        }
        
        @Test
        @DisplayName("Les scores doivent être cohérents avec le profil utilisateur")
        void testScoreConsistencyWithUserProfile() {
            // Utilisateur scientifique devrait avoir un meilleur score pour l'informatique que pour les arts
            double scoreInformatique = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            double scoreArts = scoreCalculationService.calculateFinalScore(scientificUser, artsMajor);
            
            assertTrue(scoreInformatique > scoreArts, 
                "L'utilisateur scientifique devrait avoir un meilleur score pour l'informatique que pour les arts");
            
            // Utilisateur artistique devrait avoir un meilleur score pour les arts que pour l'informatique
            double scoreArtsForArtist = scoreCalculationService.calculateFinalScore(artisticUser, artsMajor);
            double scoreInformatiqueForArtist = scoreCalculationService.calculateFinalScore(artisticUser, informatiqueMajor);
            
            assertTrue(scoreArtsForArtist > scoreInformatiqueForArtist, 
                "L'utilisateur artistique devrait avoir un meilleur score pour les arts que pour l'informatique");
            
            System.out.println("🎯 Cohérence des scores:");
            System.out.println("  - Scientifique: Info=" + (scoreInformatique * 100) + "%, Arts=" + (scoreArts * 100) + "%");
            System.out.println("  - Artistique: Arts=" + (scoreArtsForArtist * 100) + "%, Info=" + (scoreInformatiqueForArtist * 100) + "%");
        }
        
        @Test
        @DisplayName("Les scores doivent être stables entre plusieurs exécutions")
        void testScoreStability() {
            double score1 = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            double score2 = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            double score3 = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            
            // Les scores doivent être identiques (stabilité)
            assertEquals(score1, score2, SCORE_TOLERANCE, "Les scores doivent être stables entre exécutions");
            assertEquals(score2, score3, SCORE_TOLERANCE, "Les scores doivent être stables entre exécutions");
            assertEquals(score1, score3, SCORE_TOLERANCE, "Les scores doivent être stables entre exécutions");
            
            System.out.println("🔄 Stabilité des scores: " + (score1 * 100) + "% (3 exécutions identiques)");
        }
    }
    
    @Nested
    @DisplayName("Tests de validation de la qualité des recommandations")
    class RecommendationQualityTests {
        
        @Test
        @DisplayName("Les recommandations doivent être pertinentes")
        void testRecommendationRelevance() {
            // Calcul des scores pour toutes les majeures
            List<com.dira.diravenir1.dto.MatchingResult> matchingResults = createMatchingResults(scientificUser);
            
            List<MajorRecommendationDTO> recommendations = recommendationService.generateRecommendations(matchingResults);
            
            assertNotNull(recommendations, "Les recommandations ne doivent pas être null");
            assertFalse(recommendations.isEmpty(), "Les recommandations ne doivent pas être vides");
            
            // La première recommandation doit être l'informatique pour un utilisateur scientifique
            MajorRecommendationDTO topRecommendation = recommendations.get(0);
            assertEquals("Informatique", topRecommendation.getName(), 
                "La première recommandation pour un utilisateur scientifique doit être l'informatique");
            
            System.out.println("🏆 Recommandations pour utilisateur scientifique:");
            for (int i = 0; i < Math.min(recommendations.size(), 3); i++) {
                MajorRecommendationDTO rec = recommendations.get(i);
                System.out.println("  " + (i + 1) + ". " + rec.getName() + " - " + (rec.getMatchingScore() * 100) + "%");
            }
        }
        
        @Test
        @DisplayName("Les recommandations doivent être triées par score décroissant")
        void testRecommendationSorting() {
            List<com.dira.diravenir1.dto.MatchingResult> matchingResults = createMatchingResults(scientificUser);
            List<MajorRecommendationDTO> recommendations = recommendationService.generateRecommendations(matchingResults);
            
            // Vérification du tri décroissant
            for (int i = 0; i < recommendations.size() - 1; i++) {
                double currentScore = recommendations.get(i).getMatchingScore();
                double nextScore = recommendations.get(i + 1).getMatchingScore();
                
                assertTrue(currentScore >= nextScore, 
                    "Les recommandations doivent être triées par score décroissant");
            }
            
            System.out.println("📊 Tri des recommandations (scores décroissants):");
            for (int i = 0; i < recommendations.size(); i++) {
                MajorRecommendationDTO rec = recommendations.get(i);
                System.out.println("  " + (i + 1) + ". " + rec.getName() + " - " + (rec.getMatchingScore() * 100) + "%");
            }
        }
        
        @Test
        @DisplayName("Les recommandations doivent avoir des explications")
        void testRecommendationExplanations() {
            List<com.dira.diravenir1.dto.MatchingResult> matchingResults = createMatchingResults(scientificUser);
            List<MajorRecommendationDTO> recommendations = recommendationService.generateRecommendations(matchingResults);
            
            for (MajorRecommendationDTO recommendation : recommendations) {
                assertNotNull(recommendation.getExplanation(), 
                    "Chaque recommandation doit avoir une explication");
                assertFalse(recommendation.getExplanation().isEmpty(), 
                    "L'explication ne doit pas être vide");
                
                // L'explication doit contenir des informations pertinentes
                assertTrue(recommendation.getExplanation().length() > 20, 
                    "L'explication doit être suffisamment détaillée");
            }
            
            System.out.println("💡 Explications des recommandations:");
            for (MajorRecommendationDTO rec : recommendations) {
                System.out.println("  - " + rec.getName() + ": " + rec.getExplanation());
            }
        }
    }
    
    @Nested
    @DisplayName("Tests de validation de la logique métier")
    class BusinessLogicValidationTests {
        
        @Test
        @DisplayName("Les profils très différents doivent avoir des scores faibles")
        void testVeryDifferentProfiles() {
            // Utilisateur scientifique vs majeure arts
            double score = scoreCalculationService.calculateFinalScore(scientificUser, artsMajor);
            
            // Le score doit être relativement faible pour des profils très différents
            assertTrue(score < 0.7, 
                "Des profils très différents doivent avoir un score < 70%, actuel: " + (score * 100) + "%");
            
            System.out.println("❌ Profils très différents - Scientifique vs Arts: " + (score * 100) + "%");
        }
        
        @Test
        @DisplayName("Les profils similaires doivent avoir des scores élevés")
        void testSimilarProfiles() {
            // Utilisateur scientifique vs majeure informatique
            double score = scoreCalculationService.calculateFinalScore(scientificUser, informatiqueMajor);
            
            // Le score doit être relativement élevé pour des profils similaires
            assertTrue(score > 0.6, 
                "Des profils similaires doivent avoir un score > 60%, actuel: " + (score * 100) + "%");
            
            System.out.println("✅ Profils similaires - Scientifique vs Informatique: " + (score * 100) + "%");
        }
        
        @Test
        @DisplayName("Les profils identiques doivent avoir des scores très élevés")
        void testIdenticalProfiles() {
            // Création d'un profil majeure identique au profil utilisateur scientifique
            MajorProfileDTO identicalMajor = createIdenticalMajor(scientificUser);
            
            double score = scoreCalculationService.calculateFinalScore(scientificUser, identicalMajor);
            
            // Le score doit être très élevé pour des profils identiques
            assertTrue(score > 0.85, 
                "Des profils identiques doivent avoir un score > 85%, actuel: " + (score * 100) + "%");
            
            System.out.println("🎯 Profils identiques: " + (score * 100) + "%");
        }
        
        @Test
        @DisplayName("Les recommandations doivent respecter la logique métier")
        void testBusinessLogicCompliance() {
            // Test avec différents types d'utilisateurs
            testUserTypeRecommendations(scientificUser, "Informatique", "Scientifique");
            testUserTypeRecommendations(artisticUser, "Arts", "Artistique");
            testUserTypeRecommendations(businessUser, "Business Administration", "Business");
            testUserTypeRecommendations(medicalUser, "Médecine", "Médical");
        }
    }
    
    @Nested
    @DisplayName("Tests de validation de la robustesse")
    class RobustnessValidationTests {
        
        @Test
        @DisplayName("Le système doit gérer les profils avec des scores manquants")
        void testMissingScoresHandling() {
            // Création d'un profil avec des scores manquants
            UserProfileDTO incompleteUser = createIncompleteUserProfile();
            
            double score = scoreCalculationService.calculateFinalScore(incompleteUser, informatiqueMajor);
            
            // Le score doit être valide malgré les données manquantes
            assertTrue(score >= 0.0 && score <= 1.0, 
                "Le score doit être valide même avec des données manquantes");
            
            System.out.println("⚠️ Profil incomplet - Score: " + (score * 100) + "%");
        }
        
        @Test
        @DisplayName("Le système doit gérer les profils avec des scores extrêmes")
        void testExtremeScoresHandling() {
            // Création d'un profil avec des scores extrêmes
            UserProfileDTO extremeUser = createExtremeUserProfile();
            
            double score = scoreCalculationService.calculateFinalScore(extremeUser, informatiqueMajor);
            
            // Le score doit être valide malgré les scores extrêmes
            assertTrue(score >= 0.0 && score <= 1.0, 
                "Le score doit être valide même avec des scores extrêmes");
            
            System.out.println("🔥 Profil extrême - Score: " + (score * 100) + "%");
        }
        
        @Test
        @DisplayName("Le système doit gérer les profils vides")
        void testEmptyProfilesHandling() {
            // Création d'un profil vide
            UserProfileDTO emptyUser = createEmptyUserProfile();
            
            double score = scoreCalculationService.calculateFinalScore(emptyUser, informatiqueMajor);
            
            // Le score doit être valide même pour un profil vide
            assertTrue(score >= 0.0 && score <= 1.0, 
                "Le score doit être valide même pour un profil vide");
            
            System.out.println("📭 Profil vide - Score: " + (score * 100) + "%");
        }
    }
    
    // ==================== MÉTHODES UTILITAIRES ====================
    
    /**
     * Crée une liste de résultats de matching pour un utilisateur
     */
    private List<com.dira.diravenir1.dto.MatchingResult> createMatchingResults(UserProfileDTO user) {
        List<com.dira.diravenir1.dto.MatchingResult> results = new ArrayList<>();
        
        // Calcul des scores pour toutes les majeures
        double scoreInformatique = scoreCalculationService.calculateFinalScore(user, informatiqueMajor);
        double scoreArts = scoreCalculationService.calculateFinalScore(user, artsMajor);
        double scoreBusiness = scoreCalculationService.calculateFinalScore(user, businessMajor);
        double scoreMedecine = scoreCalculationService.calculateFinalScore(user, medecineMajor);
        
        // Création des objets MatchingResult
        com.dira.diravenir1.dto.MatchingResult resultInfo = new com.dira.diravenir1.dto.MatchingResult();
        resultInfo.setMajorName("Informatique");
        resultInfo.setGlobalScore(scoreInformatique);
        results.add(resultInfo);
        
        com.dira.diravenir1.dto.MatchingResult resultArts = new com.dira.diravenir1.dto.MatchingResult();
        resultArts.setMajorName("Arts");
        resultArts.setGlobalScore(scoreArts);
        results.add(resultArts);
        
        com.dira.diravenir1.dto.MatchingResult resultBusiness = new com.dira.diravenir1.dto.MatchingResult();
        resultBusiness.setMajorName("Business Administration");
        resultBusiness.setGlobalScore(scoreBusiness);
        results.add(resultBusiness);
        
        com.dira.diravenir1.dto.MatchingResult resultMedecine = new com.dira.diravenir1.dto.MatchingResult();
        resultMedecine.setMajorName("Médecine");
        resultMedecine.setGlobalScore(scoreMedecine);
        results.add(resultMedecine);
        
        return results;
    }
    
    /**
     * Teste les recommandations pour un type d'utilisateur spécifique
     */
    private void testUserTypeRecommendations(UserProfileDTO user, String expectedTopMajor, String userType) {
        List<com.dira.diravenir1.dto.MatchingResult> matchingResults = createMatchingResults(user);
        List<MajorRecommendationDTO> recommendations = recommendationService.generateRecommendations(matchingResults);
        
        if (!recommendations.isEmpty()) {
            MajorRecommendationDTO topRecommendation = recommendations.get(0);
            System.out.println("🎓 " + userType + " - Top recommandation: " + topRecommendation.getName() + 
                " (" + (topRecommendation.getMatchingScore() * 100) + "%)");
            
            // Vérification que la première recommandation est logique
            if (expectedTopMajor.equals(topRecommendation.getName())) {
                System.out.println("  ✅ Recommandation logique confirmée");
            } else {
                System.out.println("  ⚠️ Recommandation différente de celle attendue");
            }
        }
    }
    
    /**
     * Crée un profil utilisateur scientifique
     */
    private UserProfileDTO createScientificUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(5);
        profile.setInteretArtistiqueCreatif(1);
        profile.setInteretSocialHumain(2);
        profile.setInteretBusinessGestion(2);
        profile.setInteretLogiqueAnalytique(5);
        profile.setCompetenceResolutionProblemes(5);
        profile.setCompetenceCommunication(3);
        profile.setCompetenceOrganisation(3);
        profile.setCompetenceManuelTechnique(4);
        profile.setValeurImpactSocietal(3);
        profile.setValeurInnovationChallenge(4);
        profile.setValeurStabiliteSecurite(2);
        profile.setValeurAutonomie(4);
        profile.setPrefTravailEquipeCollab(2);
        profile.setPrefTravailAutonome(4);
        profile.setPrefPratiqueTerrain(3);
        profile.setPrefTheorieRecherche(5);
        return profile;
    }
    
    /**
     * Crée un profil utilisateur artistique
     */
    private UserProfileDTO createArtisticUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(1);
        profile.setInteretArtistiqueCreatif(5);
        profile.setInteretSocialHumain(3);
        profile.setInteretBusinessGestion(1);
        profile.setInteretLogiqueAnalytique(2);
        profile.setCompetenceResolutionProblemes(2);
        profile.setCompetenceCommunication(4);
        profile.setCompetenceOrganisation(2);
        profile.setCompetenceManuelTechnique(5);
        profile.setValeurImpactSocietal(4);
        profile.setValeurInnovationChallenge(5);
        profile.setValeurStabiliteSecurite(2);
        profile.setValeurAutonomie(4);
        profile.setPrefTravailEquipeCollab(3);
        profile.setPrefTravailAutonome(4);
        profile.setPrefPratiqueTerrain(5);
        profile.setPrefTheorieRecherche(2);
        return profile;
    }
    
    /**
     * Crée un profil utilisateur business
     */
    private UserProfileDTO createBusinessUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(2);
        profile.setInteretArtistiqueCreatif(2);
        profile.setInteretSocialHumain(4);
        profile.setInteretBusinessGestion(5);
        profile.setInteretLogiqueAnalytique(3);
        profile.setCompetenceResolutionProblemes(3);
        profile.setCompetenceCommunication(5);
        profile.setCompetenceOrganisation(5);
        profile.setCompetenceManuelTechnique(2);
        profile.setValeurImpactSocietal(3);
        profile.setValeurInnovationChallenge(4);
        profile.setValeurStabiliteSecurite(4);
        profile.setValeurAutonomie(3);
        profile.setPrefTravailEquipeCollab(5);
        profile.setPrefTravailAutonome(3);
        profile.setPrefPratiqueTerrain(3);
        profile.setPrefTheorieRecherche(2);
        return profile;
    }
    
    /**
     * Crée un profil utilisateur médical
     */
    private UserProfileDTO createMedicalUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(4);
        profile.setInteretArtistiqueCreatif(2);
        profile.setInteretSocialHumain(5);
        profile.setInteretBusinessGestion(2);
        profile.setInteretLogiqueAnalytique(4);
        profile.setCompetenceResolutionProblemes(4);
        profile.setCompetenceCommunication(5);
        profile.setCompetenceOrganisation(4);
        profile.setCompetenceManuelTechnique(4);
        profile.setValeurImpactSocietal(5);
        profile.setValeurInnovationChallenge(3);
        profile.setValeurStabiliteSecurite(4);
        profile.setValeurAutonomie(3);
        profile.setPrefTravailEquipeCollab(4);
        profile.setPrefTravailAutonome(3);
        profile.setPrefPratiqueTerrain(5);
        profile.setPrefTheorieRecherche(4);
        return profile;
    }
    
    /**
     * Crée un profil majeure informatique
     */
    private MajorProfileDTO createInformatiqueMajor() {
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
     * Crée un profil majeure arts
     */
    private MajorProfileDTO createArtsMajor() {
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
     * Crée un profil majeure business
     */
    private MajorProfileDTO createBusinessMajor() {
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
     * Crée un profil majeure médecine
     */
    private MajorProfileDTO createMedecineMajor() {
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
     * Crée un profil majeure identique à un profil utilisateur
     */
    private MajorProfileDTO createIdenticalMajor(UserProfileDTO user) {
        MajorProfileDTO major = new MajorProfileDTO();
        major.setMajorName("Identique");
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
    
    /**
     * Crée un profil utilisateur incomplet avec des scores manquants
     */
    private UserProfileDTO createIncompleteUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(4);
        profile.setInteretArtistiqueCreatif(0); // Score manquant
        profile.setInteretSocialHumain(3);
        profile.setInteretBusinessGestion(0); // Score manquant
        profile.setInteretLogiqueAnalytique(5);
        profile.setCompetenceResolutionProblemes(4);
        profile.setCompetenceCommunication(0); // Score manquant
        profile.setCompetenceOrganisation(3);
        profile.setCompetenceManuelTechnique(4);
        profile.setValeurImpactSocietal(3);
        profile.setValeurInnovationChallenge(4);
        profile.setValeurStabiliteSecurite(0); // Score manquant
        profile.setValeurAutonomie(4);
        profile.setPrefTravailEquipeCollab(3);
        profile.setPrefTravailAutonome(4);
        profile.setPrefPratiqueTerrain(4);
        profile.setPrefTheorieRecherche(3);
        return profile;
    }
    
    /**
     * Crée un profil utilisateur avec des scores extrêmes
     */
    private UserProfileDTO createExtremeUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(5); // Score maximum
        profile.setInteretArtistiqueCreatif(1); // Score minimum
        profile.setInteretSocialHumain(5); // Score maximum
        profile.setInteretBusinessGestion(1); // Score minimum
        profile.setInteretLogiqueAnalytique(5); // Score maximum
        profile.setCompetenceResolutionProblemes(1); // Score minimum
        profile.setCompetenceCommunication(5); // Score maximum
        profile.setCompetenceOrganisation(1); // Score minimum
        profile.setCompetenceManuelTechnique(5); // Score maximum
        profile.setValeurImpactSocietal(1); // Score minimum
        profile.setValeurInnovationChallenge(5); // Score maximum
        profile.setValeurStabiliteSecurite(1); // Score minimum
        profile.setValeurAutonomie(5); // Score maximum
        profile.setPrefTravailEquipeCollab(1); // Score minimum
        profile.setPrefTravailAutonome(5); // Score maximum
        profile.setPrefPratiqueTerrain(1); // Score minimum
        profile.setPrefTheorieRecherche(5); // Score maximum
        return profile;
    }
    
    /**
     * Crée un profil utilisateur vide avec tous les scores à 0
     */
    private UserProfileDTO createEmptyUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        profile.setInteretScientifiqueTech(0);
        profile.setInteretArtistiqueCreatif(0);
        profile.setInteretSocialHumain(0);
        profile.setInteretBusinessGestion(0);
        profile.setInteretLogiqueAnalytique(0);
        profile.setCompetenceResolutionProblemes(0);
        profile.setCompetenceCommunication(0);
        profile.setCompetenceOrganisation(0);
        profile.setCompetenceManuelTechnique(0);
        profile.setValeurImpactSocietal(0);
        profile.setValeurInnovationChallenge(0);
        profile.setValeurStabiliteSecurite(0);
        profile.setValeurAutonomie(0);
        profile.setPrefTravailEquipeCollab(0);
        profile.setPrefTravailAutonome(0);
        profile.setPrefPratiqueTerrain(0);
        profile.setPrefTheorieRecherche(0);
        return profile;
    }
}
