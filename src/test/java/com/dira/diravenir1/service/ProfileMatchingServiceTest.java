package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.service.strategies.EuclideanMatchingStrategy;
import com.dira.diravenir1.service.calculators.EuclideanScoreCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitaires pour le ProfileMatchingService
 * 
 * Ces tests vérifient que le service respecte le principe SRP
 * et fonctionne correctement avec les stratégies et calculateurs
 */
@SpringBootTest
@TestPropertySource(locations = "classpath:application-matching.yml")
@DisplayName("ProfileMatchingService - Tests Unitaires")
class ProfileMatchingServiceTest {
    
    private ProfileMatchingService matchingService;
    private UserProfileDTO testUserProfile;
    private List<MajorProfileDTO> testMajorProfiles;
    
    @BeforeEach
    void setUp() {
        // Création du service avec des composants de test
        matchingService = new ProfileMatchingService();
        
        // Création d'un profil utilisateur de test (profil technique)
        testUserProfile = createTechnicalUserProfile();
        
        // Création de profils de majeures de test
        testMajorProfiles = createTestMajorProfiles();
    }
    
    @Test
    @DisplayName("Test de création du service")
    void testServiceCreation() {
        assertNotNull(matchingService, "Le service doit être créé avec succès");
    }
    
    @Test
    @DisplayName("Test de matching avec profil technique")
    void testTechnicalProfileMatching() {
        // Exécution du matching
        List<MatchingResult> results = matchingService.matchAllMajors(testUserProfile, testMajorProfiles);
        
        // Vérifications de base
        assertNotNull(results, "Les résultats ne doivent pas être null");
        assertFalse(results.isEmpty(), "Il doit y avoir des résultats");
        
        // Vérification que les résultats sont triés par score décroissant
        for (int i = 0; i < results.size() - 1; i++) {
            assertTrue(
                results.get(i).getGlobalScore() >= results.get(i + 1).getGlobalScore(),
                "Les résultats doivent être triés par score décroissant"
            );
        }
        
        // Vérification des scores
        for (MatchingResult result : results) {
            assertTrue(
                result.getGlobalScore() >= 0.0 && result.getGlobalScore() <= 1.0,
                "Les scores doivent être entre 0.0 et 1.0"
            );
            
            assertNotNull(result.getMajorName(), "Le nom de la majeure ne doit pas être null");
            assertNotNull(result.getAlgorithmUsed(), "L'algorithme utilisé ne doit pas être null");
        }
        
        System.out.println("✅ Test de matching réussi !");
        System.out.println("📊 Résultats obtenus :");
        for (int i = 0; i < Math.min(3, results.size()); i++) {
            MatchingResult result = results.get(i);
            System.out.printf("   %d. %s : %.1f%%%n", 
                i + 1, 
                result.getMajorName(), 
                result.getGlobalScorePercentage());
        }
    }
    
    @Test
    @DisplayName("Test de validation des profils")
    void testProfileValidation() {
        // Test avec profil utilisateur null
        assertThrows(
            RuntimeException.class,
            () -> matchingService.matchAllMajors(null, testMajorProfiles),
            "Le service doit rejeter un profil utilisateur null"
        );
        
        // Test avec liste de majeures vide
        List<MatchingResult> emptyResults = matchingService.matchAllMajors(testUserProfile, new ArrayList<>());
        assertTrue(emptyResults.isEmpty(), "Le résultat doit être vide pour une liste de majeures vide");
    }
    
    /**
     * Crée un profil utilisateur de test avec des caractéristiques techniques
     */
    private UserProfileDTO createTechnicalUserProfile() {
        UserProfileDTO profile = new UserProfileDTO();
        
        // Piliers d'Intérêts (profil technique)
        profile.setInteretScientifiqueTech(90);
        profile.setInteretArtistiqueCreatif(30);
        profile.setInteretSocialHumain(40);
        profile.setInteretBusinessGestion(50);
        profile.setInteretLogiqueAnalytique(95);
        
        // Piliers de Compétences
        profile.setCompetenceResolutionProblemes(90);
        profile.setCompetenceCommunication(70);
        profile.setCompetenceOrganisation(80);
        profile.setCompetenceManuelTechnique(85);
        
        // Piliers de Valeurs/Motivations
        profile.setValeurImpactSocietal(70);
        profile.setValeurInnovationChallenge(90);
        profile.setValeurStabiliteSecurite(75);
        profile.setValeurAutonomie(80);
        
        // Piliers de Préférence de Travail/Personnalité
        profile.setPrefTravailEquipeCollab(75);
        profile.setPrefTravailAutonome(70);
        profile.setPrefPratiqueTerrain(80);
        profile.setPrefTheorieRecherche(75);
        
        return profile;
    }
    
    /**
     * Crée des profils de majeures de test
     */
    private List<MajorProfileDTO> createTestMajorProfiles() {
        List<MajorProfileDTO> profiles = new ArrayList<>();
        
        // 1. Génie Civil (profil technique - devrait bien correspondre)
        MajorProfileDTO genieCivil = MajorProfileDTO.builder()
            .majorId("GC001")
            .majorName("Génie Civil")
            .majorCategory("TECHNIQUE")
            .interetScientifiqueTech(90)
            .interetArtistiqueCreatif(40)
            .interetSocialHumain(50)
            .interetBusinessGestion(60)
            .interetLogiqueAnalytique(90)
            .competenceResolutionProblemes(90)
            .competenceCommunication(75)
            .competenceOrganisation(90)
            .competenceManuelTechnique(85)
            .valeurImpactSocietal(80)
            .valeurInnovationChallenge(85)
            .valeurStabiliteSecurite(80)
            .valeurAutonomie(70)
            .prefTravailEquipeCollab(80)
            .prefTravailAutonome(60)
            .prefPratiqueTerrain(90)
            .prefTheorieRecherche(60)
            .build();
        
        // 2. Informatique (profil technique - devrait bien correspondre)
        MajorProfileDTO informatique = MajorProfileDTO.builder()
            .majorId("INFO001")
            .majorName("Informatique")
            .majorCategory("TECHNIQUE")
            .interetScientifiqueTech(98)
            .interetArtistiqueCreatif(40)
            .interetSocialHumain(30)
            .interetBusinessGestion(40)
            .interetLogiqueAnalytique(98)
            .competenceResolutionProblemes(98)
            .competenceCommunication(70)
            .competenceOrganisation(80)
            .competenceManuelTechnique(50)
            .valeurImpactSocietal(60)
            .valeurInnovationChallenge(95)
            .valeurStabiliteSecurite(70)
            .valeurAutonomie(85)
            .prefTravailEquipeCollab(70)
            .prefTravailAutonome(80)
            .prefPratiqueTerrain(40)
            .prefTheorieRecherche(80)
            .build();
        
        // 3. Marketing (profil business - devrait moins correspondre)
        MajorProfileDTO marketing = MajorProfileDTO.builder()
            .majorId("MKT001")
            .majorName("Marketing et Management")
            .majorCategory("BUSINESS")
            .interetScientifiqueTech(20)
            .interetArtistiqueCreatif(80)
            .interetSocialHumain(90)
            .interetBusinessGestion(95)
            .interetLogiqueAnalytique(70)
            .competenceResolutionProblemes(80)
            .competenceCommunication(98)
            .competenceOrganisation(90)
            .competenceManuelTechnique(10)
            .valeurImpactSocietal(70)
            .valeurInnovationChallenge(95)
            .valeurStabiliteSecurite(60)
            .valeurAutonomie(70)
            .prefTravailEquipeCollab(95)
            .prefTravailAutonome(50)
            .prefPratiqueTerrain(60)
            .prefTheorieRecherche(50)
            .build();
        
        profiles.add(genieCivil);
        profiles.add(informatique);
        profiles.add(marketing);
        
        return profiles;
    }
}
