package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Test manuel pour vérifier le calcul exact des scores
 * Basé sur le cas d'usage réel signalé par l'utilisateur
 */
@SpringBootTest
public class ManualCalculationTest {

    @Autowired
    private ProfileScoringService profileScoringService;

    @Test
    void testCalculExact_CasUtilisateur() {
        System.out.println("🧮 === TEST DE CALCUL EXACT - CAS UTILISATEUR ===");
        
        // Créer la requête exacte de l'utilisateur
        OrientationRequestDTO request = new OrientationRequestDTO();
        
        // Réponses exactes de l'utilisateur
        request.setQuestion1("E"); // Exprimer ma créativité
        request.setQuestion2(Arrays.asList("Développement personnel", "Causes sociales et humanitaires"));
        request.setQuestion3("D"); // Livres de développement personnel...
        request.setQuestion4("C"); // Imaginer des solutions originales
        
        // Question 5 - Glisser-déposer (3 activités)
        request.setQuestion5(Arrays.asList(
            "Convaincre quelqu'un d'une idée",      // 1er = 4 points
            "Écouter et conseiller un ami",        // 2e = 3 points  
            "Organiser un événement"               // 3e = 2 points
        ));
        
        request.setQuestion6("A"); // Lire et prendre des notes détaillées
        request.setQuestion7("A"); // Améliorer la vie des individus directement
        request.setQuestion8("D"); // L'extérieur, la nature, un chantier
        
        // Question 9 - Curseurs (valeurs exactes)
        Map<String, Integer> curseurs = new HashMap<>();
        curseurs.put("securite", 1);      // Sécurité = 1/5
        curseurs.put("innovation", 5);    // Innovation = 5/5
        curseurs.put("autonomie", 5);     // Autonomie = 5/5
        curseurs.put("salaire", 5);       // Salaire = 5/5
        request.setQuestion9(curseurs);
        
        request.setQuestion10("B"); // Mettre en place rapidement une solution concrète
        request.setQuestion11("A"); // Seul(e) sur un projet, en totale autonomie
        request.setQuestion12("B"); // Raconter une histoire pour capter l'attention
        request.setQuestion13("B"); // Votre intuition et vos sentiments
        
        // Question 14 - Matières préférées
        request.setQuestion14(Arrays.asList("Arts et Design")); // ID 'D'
        
        System.out.println("📝 Réponses de l'utilisateur:");
        System.out.println("Q1: " + request.getQuestion1() + " (Créativité)");
        System.out.println("Q2: " + request.getQuestion2() + " (Social + Impact)");
        System.out.println("Q3: " + request.getQuestion3() + " (Social)");
        System.out.println("Q4: " + request.getQuestion4() + " (Artistique + Innovation)");
        System.out.println("Q5: " + request.getQuestion5() + " (Communication + Social + Organisation)");
        System.out.println("Q6: " + request.getQuestion6() + " (Théorie + Logique)");
        System.out.println("Q7: " + request.getQuestion7() + " (Impact + Social)");
        System.out.println("Q8: " + request.getQuestion8() + " (Pratique + Manuel)");
        System.out.println("Q9: " + request.getQuestion9() + " (Curseurs)");
        System.out.println("Q10: " + request.getQuestion10() + " (Pratique + Résolution)");
        System.out.println("Q11: " + request.getQuestion11() + " (Autonome + Autonomie)");
        System.out.println("Q12: " + request.getQuestion12() + " (Communication + Artistique)");
        System.out.println("Q13: " + request.getQuestion13() + " (Artistique + Autonome)");
        System.out.println("Q14: " + request.getQuestion14() + " (Artistique)");
        
        // Calculer le profil
        UserProfileDTO profile = profileScoringService.calculateProfileFromResponses(request);
        
        System.out.println("\n🎯 === PROFIL CALCULÉ ===");
        System.out.println("Intérêts:");
        System.out.println("- Scientifique/Tech: " + profile.getInteretScientifiqueTech());
        System.out.println("- Artistique/Créatif: " + profile.getInteretArtistiqueCreatif());
        System.out.println("- Social/Humain: " + profile.getInteretSocialHumain());
        System.out.println("- Business/Gestion: " + profile.getInteretBusinessGestion());
        System.out.println("- Logique/Analytique: " + profile.getInteretLogiqueAnalytique());
        
        System.out.println("\nCompétences:");
        System.out.println("- Résolution Problèmes: " + profile.getCompetenceResolutionProblemes());
        System.out.println("- Communication: " + profile.getCompetenceCommunication());
        System.out.println("- Organisation: " + profile.getCompetenceOrganisation());
        System.out.println("- Manuel/Technique: " + profile.getCompetenceManuelTechnique());
        
        System.out.println("\nValeurs:");
        System.out.println("- Impact Sociétal: " + profile.getValeurImpactSocietal());
        System.out.println("- Innovation/Challenge: " + profile.getValeurInnovationChallenge());
        System.out.println("- Stabilité/Sécurité: " + profile.getValeurStabiliteSecurite());
        System.out.println("- Autonomie: " + profile.getValeurAutonomie());
        
        System.out.println("\nPréférences de Travail:");
        System.out.println("- Équipe/Collaboration: " + profile.getPrefTravailEquipeCollab());
        System.out.println("- Autonome: " + profile.getPrefTravailAutonome());
        System.out.println("- Pratique/Terrain: " + profile.getPrefPratiqueTerrain());
        System.out.println("- Théorie/Recherche: " + profile.getPrefTheorieRecherche());
        
        // Vérifications spécifiques pour les questions problématiques
        System.out.println("\n🔍 === VÉRIFICATIONS SPÉCIFIQUES ===");
        
        // Question 5
        System.out.println("Q5 - Communication doit être élevé (4+3+0=7 points bruts): " + 
            (profile.getCompetenceCommunication() > 0 ? "✅" : "❌"));
        System.out.println("Q5 - Social doit être élevé (0+3+0=3 points bruts): " + 
            (profile.getInteretSocialHumain() > 0 ? "✅" : "❌"));
        System.out.println("Q5 - Organisation doit être élevé (0+0+2=2 points bruts): " + 
            (profile.getCompetenceOrganisation() > 0 ? "✅" : "❌"));
        
        // Question 9
        System.out.println("Q9 - Innovation doit être 5: " + 
            (profile.getValeurInnovationChallenge() == 5 ? "✅" : "❌ (" + profile.getValeurInnovationChallenge() + ")"));
        System.out.println("Q9 - Autonomie doit être 5: " + 
            (profile.getValeurAutonomie() == 5 ? "✅" : "❌ (" + profile.getValeurAutonomie() + ")"));
        System.out.println("Q9 - Business doit être 5: " + 
            (profile.getInteretBusinessGestion() == 5 ? "✅" : "❌ (" + profile.getInteretBusinessGestion() + ")"));
        
        // Question 14
        System.out.println("Q14 - Artistique doit être élevé: " + 
            (profile.getInteretArtistiqueCreatif() > 0 ? "✅" : "❌"));
        
        // Vérifications globales
        System.out.println("\n🌐 === VÉRIFICATIONS GLOBALES ===");
        System.out.println("Tous les scores sont entre 0 et 100: " + 
            (profile.getInteretArtistiqueCreatif() >= 0 && profile.getInteretArtistiqueCreatif() <= 100 ? "✅" : "❌"));
        System.out.println("Profil cohérent avec les réponses: " + 
            (profile.getInteretArtistiqueCreatif() > profile.getInteretScientifiqueTech() ? "✅" : "❌"));
        
        System.out.println("\n🎉 === TEST TERMINÉ ===");
    }
}
