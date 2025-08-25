package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests de validation du calcul des scores pour les questions problématiques
 * Q5 (glisser-déposer), Q9 (curseurs), Q14 (matières)
 */
@SpringBootTest
public class ProfileScoringServiceTest {

    @Autowired
    private ProfileScoringService profileScoringService;

    private OrientationRequestDTO testRequest;

    @BeforeEach
    void setUp() {
        testRequest = new OrientationRequestDTO();
        
        // Réponses de base pour les autres questions
        testRequest.setQuestion1("E"); // Créativité
        testRequest.setQuestion2(Arrays.asList("Art et culture", "Développement personnel"));
        testRequest.setQuestion3("C"); // Art
        testRequest.setQuestion4("C"); // Imaginer
        testRequest.setQuestion6("A"); // Lire
        testRequest.setQuestion7("A"); // Améliorer vie
        testRequest.setQuestion8("C"); // Studio
        testRequest.setQuestion10("B"); // Solution concrète
        testRequest.setQuestion11("A"); // Seul
        testRequest.setQuestion12("B"); // Histoire
        testRequest.setQuestion13("B"); // Intuition
    }

    @Test
    void testQuestion5_GlisserDeposer_CalculCorrect() {
        // Test avec les réponses exactes du problème signalé
        testRequest.setQuestion5(Arrays.asList(
            "Convaincre quelqu'un d'une idée",      // 1er choix = 4 points
            "Écouter et conseiller un ami",        // 2e choix = 3 points
            "Organiser un événement"               // 3e choix = 2 points
        ));

        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(testRequest);

        // Vérifier que les scores sont calculés correctement
        assertNotNull(profile);
        
        // Log des scores pour vérification
        System.out.println("=== TEST QUESTION 5 ===");
        System.out.println("Réponses: " + testRequest.getQuestion5());
        System.out.println("Scores calculés:");
        System.out.println("- Communication: " + profile.getCompetenceCommunication());
        System.out.println("- Business: " + profile.getInteretBusinessGestion());
        System.out.println("- Social: " + profile.getInteretSocialHumain());
        System.out.println("- Organisation: " + profile.getCompetenceOrganisation());
        System.out.println("- Équipe: " + profile.getPrefTravailEquipeCollab());
        
        // Vérifications spécifiques
        assertTrue(profile.getCompetenceCommunication() > 0, "Communication doit avoir des points");
        assertTrue(profile.getInteretBusinessGestion() > 0, "Business doit avoir des points");
        assertTrue(profile.getInteretSocialHumain() > 0, "Social doit avoir des points");
        assertTrue(profile.getCompetenceOrganisation() > 0, "Organisation doit avoir des points");
        assertTrue(profile.getPrefTravailEquipeCollab() > 0, "Équipe doit avoir des points");
    }

    @Test
    void testQuestion9_Curseurs_CalculCorrect() {
        // Test avec les valeurs exactes du problème signalé
        Map<String, Integer> curseurs = new HashMap<>();
        curseurs.put("securite", 1);      // Sécurité = 1/5
        curseurs.put("innovation", 5);    // Innovation = 5/5
        curseurs.put("autonomie", 5);     // Autonomie = 5/5
        curseurs.put("salaire", 5);       // Salaire = 5/5
        
        testRequest.setQuestion9(curseurs);

        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(testRequest);

        assertNotNull(profile);
        
        System.out.println("=== TEST QUESTION 9 ===");
        System.out.println("Curseurs: " + curseurs);
        System.out.println("Scores calculés:");
        System.out.println("- Stabilité/Sécurité: " + profile.getValeurStabiliteSecurite());
        System.out.println("- Innovation/Challenge: " + profile.getValeurInnovationChallenge());
        System.out.println("- Autonomie: " + profile.getValeurAutonomie());
        System.out.println("- Business/Gestion: " + profile.getInteretBusinessGestion());
        
        // Vérifications spécifiques
        assertEquals(1, profile.getValeurStabiliteSecurite(), "Sécurité doit être 1");
        assertEquals(5, profile.getValeurInnovationChallenge(), "Innovation doit être 5");
        assertEquals(5, profile.getValeurAutonomie(), "Autonomie doit être 5");
        assertEquals(5, profile.getInteretBusinessGestion(), "Business doit être 5");
    }

    @Test
    void testQuestion14_Matieres_CalculCorrect() {
        // Test avec la réponse exacte du problème signalé
        testRequest.setQuestion14(Arrays.asList("Arts et Design")); // ID 'D'

        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(testRequest);

        assertNotNull(profile);
        
        System.out.println("=== TEST QUESTION 14 ===");
        System.out.println("Matières: " + testRequest.getQuestion14());
        System.out.println("Scores calculés:");
        System.out.println("- Artistique/Créatif: " + profile.getInteretArtistiqueCreatif());
        
        // Vérifications spécifiques
        assertTrue(profile.getInteretArtistiqueCreatif() > 0, "Artistique doit avoir des points");
        
        // Vérifier que les autres piliers ne sont pas affectés par cette réponse
        assertEquals(0, profile.getInteretScientifiqueTech(), "SciTech ne doit pas être affecté");
        assertEquals(0, profile.getInteretLogiqueAnalytique(), "Logique ne doit pas être affecté");
    }

    @Test
    void testIntegration_Questions5_9_14_CalculComplet() {
        // Test d'intégration avec toutes les questions problématiques
        testRequest.setQuestion5(Arrays.asList(
            "Convaincre quelqu'un d'une idée",
            "Écouter et conseiller un ami", 
            "Organiser un événement"
        ));
        
        Map<String, Integer> curseurs = new HashMap<>();
        curseurs.put("securite", 1);
        curseurs.put("innovation", 5);
        curseurs.put("autonomie", 5);
        curseurs.put("salaire", 5);
        testRequest.setQuestion9(curseurs);
        
        testRequest.setQuestion14(Arrays.asList("Arts et Design"));

        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(testRequest);

        assertNotNull(profile);
        
        System.out.println("=== TEST INTÉGRATION COMPLÈTE ===");
        System.out.println("Profil complet calculé:");
        System.out.println("Intérêts:");
        System.out.println("- SciTech: " + profile.getInteretScientifiqueTech());
        System.out.println("- Artistique: " + profile.getInteretArtistiqueCreatif());
        System.out.println("- Social: " + profile.getInteretSocialHumain());
        System.out.println("- Business: " + profile.getInteretBusinessGestion());
        System.out.println("- Logique: " + profile.getInteretLogiqueAnalytique());
        
        System.out.println("Compétences:");
        System.out.println("- Communication: " + profile.getCompetenceCommunication());
        System.out.println("- Organisation: " + profile.getCompetenceOrganisation());
        
        System.out.println("Valeurs:");
        System.out.println("- Impact: " + profile.getValeurImpactSocietal());
        System.out.println("- Innovation: " + profile.getValeurInnovationChallenge());
        System.out.println("- Stabilité: " + profile.getValeurStabiliteSecurite());
        System.out.println("- Autonomie: " + profile.getValeurAutonomie());
        
        System.out.println("Préférences:");
        System.out.println("- Équipe: " + profile.getPrefTravailEquipeCollab());
        System.out.println("- Autonome: " + profile.getPrefTravailAutonome());
        
        // Vérifications d'intégration
        assertTrue(profile.getInteretArtistiqueCreatif() > 0, "Artistique doit être élevé (Q1 + Q14)");
        assertTrue(profile.getCompetenceCommunication() > 0, "Communication doit être élevé (Q5)");
        assertTrue(profile.getValeurInnovationChallenge() > 0, "Innovation doit être élevé (Q9)");
        assertTrue(profile.getValeurAutonomie() > 0, "Autonomie doit être élevé (Q9 + Q11)");
    }

    @Test
    void testNormalisationScores_0a100() {
        // Test que tous les scores sont normalisés entre 0 et 100
        testRequest.setQuestion5(Arrays.asList("Convaincre quelqu'un d'une idée", "Écouter et conseiller un ami"));
        testRequest.setQuestion9(Map.of("innovation", 5, "autonomie", 5));
        testRequest.setQuestion14(Arrays.asList("Arts et Design"));

        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(testRequest);

        assertNotNull(profile);
        
        // Vérifier que tous les scores sont entre 0 et 100
        assertTrue(profile.getInteretArtistiqueCreatif() >= 0 && profile.getInteretArtistiqueCreatif() <= 100);
        assertTrue(profile.getCompetenceCommunication() >= 0 && profile.getCompetenceCommunication() <= 100);
        assertTrue(profile.getValeurInnovationChallenge() >= 0 && profile.getValeurInnovationChallenge() <= 100);
        assertTrue(profile.getValeurAutonomie() >= 0 && profile.getValeurAutonomie() <= 100);
        
        System.out.println("=== TEST NORMALISATION ===");
        System.out.println("Tous les scores sont normalisés entre 0 et 100 ✓");
    }
}
